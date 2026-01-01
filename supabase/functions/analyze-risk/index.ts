import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const SubjectSchema = z.object({
  name: z.string().trim().min(1, "Subject name is required").max(100, "Subject name too long"),
  marks: z.number().min(0, "Marks cannot be negative").max(100, "Marks cannot exceed 100"),
  isBacklog: z.boolean()
});

const StudentDataSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name too long"),
  rollNumber: z.string().trim().optional(),
  semester: z.union([z.string(), z.number()]).transform(val => {
    const num = typeof val === 'string' ? parseInt(val, 10) : val;
    if (isNaN(num) || num < 1 || num > 10) throw new Error("Invalid semester");
    return num;
  }),
  branch: z.string().trim().max(100, "Branch too long").optional().default("Engineering"),
  attendance: z.number().min(0, "Attendance cannot be negative").max(100, "Attendance cannot exceed 100"),
  cgpa: z.union([z.string(), z.number(), z.null(), z.undefined()]).optional().transform(val => {
    if (val === null || val === undefined || val === '') return null;
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) return null;
    return num;
  }),
  subjects: z.array(SubjectSchema).min(1, "At least one subject required").max(20, "Too many subjects"),
  studyHours: z.number().min(0, "Study hours cannot be negative").max(24, "Study hours cannot exceed 24"),
  stressLevel: z.number().min(1, "Stress level must be 1-10").max(10, "Stress level must be 1-10"),
  sleepHours: z.number().min(0, "Sleep hours cannot be negative").max(24, "Sleep hours cannot exceed 24")
});

// Sanitize string for AI prompt to prevent prompt injection
function sanitizeForPrompt(input: string): string {
  return input
    .replace(/[<>{}[\]]/g, '') // Remove potential injection characters
    .replace(/\n/g, ' ')       // Remove newlines
    .trim()
    .substring(0, 100);        // Limit length
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header');
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
    
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Authenticated user:', user.id);

    // Parse and validate input
    const body = await req.json();
    const { studentData: rawStudentData } = body;

    if (!rawStudentData) {
      return new Response(JSON.stringify({ error: 'Missing studentData in request body' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate student data using zod schema
    const validationResult = StudentDataSchema.safeParse(rawStudentData);
    
    if (!validationResult.success) {
      console.error('Validation failed:', validationResult.error.errors);
      return new Response(JSON.stringify({ 
        error: 'Invalid input data', 
        details: validationResult.error.errors.map(e => e.message).join(', ')
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const studentData = validationResult.data;
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    console.log('Analyzing student data for user:', user.id);

    // Prepare student data summary for AI with sanitized inputs
    const subjectsSummary = studentData.subjects
      .map((s) => `${sanitizeForPrompt(s.name)}: ${s.marks}/100${s.isBacklog ? ' (BACKLOG)' : ''}`)
      .join('\n');
    
    const backlogCount = studentData.subjects.filter((s) => s.isBacklog).length;
    const avgMarks = studentData.subjects.length > 0 
      ? studentData.subjects.reduce((sum: number, s) => sum + s.marks, 0) / studentData.subjects.length 
      : 0;

    const systemPrompt = `You are an expert academic counselor and risk assessment specialist for engineering colleges. 
Your task is to analyze student academic data and provide:
1. A risk assessment with a score (0-100) and level (Low, Medium, High)
2. Detailed factor breakdown showing contribution of each risk factor
3. A personalized rescue plan with daily targets, subject strategies, motivation tips, and mentor recommendations

Be empathetic but realistic. Focus on actionable advice that helps the student improve.

IMPORTANT: You MUST respond with valid JSON only, no markdown, no code blocks, just pure JSON.`;

    const userPrompt = `Analyze this student's academic situation and provide a comprehensive risk assessment and rescue plan:

**Student Information:**
- Name: ${sanitizeForPrompt(studentData.name)}
- Semester: ${studentData.semester}
- Branch: ${sanitizeForPrompt(studentData.branch)}
- Attendance: ${studentData.attendance}%
- Current CGPA: ${studentData.cgpa || 'Not available'}

**Subject-wise Performance:**
${subjectsSummary}

**Summary Stats:**
- Average Marks: ${avgMarks.toFixed(1)}%
- Total Backlogs: ${backlogCount}

**Self-Assessment:**
- Study Hours per Day: ${studentData.studyHours}
- Stress Level: ${studentData.stressLevel}/10
- Sleep Hours: ${studentData.sleepHours}

Respond with this exact JSON structure:
{
  "riskAssessment": {
    "score": <number 0-100, higher = more at risk>,
    "level": "<Low|Medium|High>",
    "summary": "<2-3 sentence summary of the student's situation>",
    "factors": [
      {"name": "Attendance", "score": <0-100>, "weight": <percentage>},
      {"name": "Academic Performance", "score": <0-100>, "weight": <percentage>},
      {"name": "Backlogs", "score": <0-100>, "weight": <percentage>},
      {"name": "Study Habits", "score": <0-100>, "weight": <percentage>},
      {"name": "Stress & Wellbeing", "score": <0-100>, "weight": <percentage>}
    ]
  },
  "rescuePlan": {
    "dailyTargets": ["<specific daily target 1>", "<target 2>", "<target 3>"],
    "subjectStrategies": [
      {"subject": "<subject name>", "priority": "<High|Medium|Low>", "strategy": "<specific study strategy>", "weeklyHours": <number>}
    ],
    "motivationTips": ["<tip 1>", "<tip 2>", "<tip 3>"],
    "mentorRecommendations": ["<recommendation 1>", "<recommendation 2>", "<recommendation 3>"],
    "shortTermGoals": ["<goal for next 2 weeks>"],
    "longTermGoals": ["<goal for this semester>"]
  }
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No response from AI');
    }

    console.log('AI response received for user:', user.id);

    // Parse the JSON response
    let analysisResult;
    try {
      // Clean up the response - remove any markdown code blocks if present
      let cleanedContent = content.trim();
      if (cleanedContent.startsWith('```json')) {
        cleanedContent = cleanedContent.slice(7);
      }
      if (cleanedContent.startsWith('```')) {
        cleanedContent = cleanedContent.slice(3);
      }
      if (cleanedContent.endsWith('```')) {
        cleanedContent = cleanedContent.slice(0, -3);
      }
      analysisResult = JSON.parse(cleanedContent.trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      throw new Error('Failed to parse AI analysis');
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-risk function:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
