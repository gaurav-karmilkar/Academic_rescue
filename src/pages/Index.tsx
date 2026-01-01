import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { StatsSection } from '@/components/StatsSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';
import { CTASection } from '@/components/CTASection';
import { StudentForm } from '@/components/StudentForm';
import { RiskDashboard } from '@/components/RiskDashboard';
import { RescuePlan } from '@/components/RescuePlan';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { 
  StudentData, 
  RiskAssessment, 
  RescuePlan as RescuePlanType,
  AIAnalysisResult 
} from '@/lib/riskAnalysis';
import { ArrowLeft, Download, Loader2, CheckCircle, Target } from 'lucide-react';

const Index = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null);
  const [rescuePlan, setRescuePlan] = useState<RescuePlanType | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (data: StudentData) => {
    // Check if user is authenticated before allowing analysis
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to use the AI-powered risk analysis.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    setStudentData(data);
    setIsAnalyzing(true);
    setAssessment(null);
    setRescuePlan(null);

    try {
      const { data: result, error } = await supabase.functions.invoke<AIAnalysisResult>('analyze-risk', {
        body: { studentData: data }
      });

      if (error) {
        throw new Error(error.message || 'Failed to analyze risk');
      }

      if (!result || !result.riskAssessment || !result.rescuePlan) {
        throw new Error('Invalid response from AI analysis');
      }

      setAssessment(result.riskAssessment);
      setRescuePlan(result.rescuePlan);
      
      const riskMessages = {
        Low: { title: "Low Risk Detected", description: "Great job! Keep up the good work." },
        Medium: { title: "Medium Risk Detected", description: "Some areas need attention. Check your rescue plan." },
        High: { title: "High Risk Alert", description: "Immediate intervention recommended. Review your rescue plan carefully." },
      };
      
      toast({
        title: riskMessages[result.riskAssessment.level].title,
        description: riskMessages[result.riskAssessment.level].description,
        variant: result.riskAssessment.level === 'High' ? 'destructive' : 'default',
      });
      
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Failed to analyze student data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setStudentData(null);
    setAssessment(null);
    setRescuePlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAssessment = () => {
    document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection onGetStarted={scrollToAssessment} />
        
        {/* Stats Section */}
        <StatsSection />
        
        {/* Features Section */}
        <FeaturesSection />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Assessment Form */}
        <StudentForm onSubmit={handleFormSubmit} isLoading={isAnalyzing} />
        
        {/* Loading State */}
        {isAnalyzing && (
          <section className="py-20 px-4 bg-secondary/20">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing with AI...</h2>
              <p className="text-muted-foreground">
                Google Gemini is analyzing the academic data and generating a personalized rescue plan.
              </p>
            </div>
          </section>
        )}
        
        {/* Results Section */}
        {assessment && studentData && rescuePlan && !isAnalyzing && (
          <section ref={resultsRef} className="py-24 px-4 bg-gradient-to-b from-secondary/10 via-background to-secondary/20 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
            </div>
            
            <div className="max-w-6xl mx-auto relative">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-primary font-medium mb-4">
                    <CheckCircle className="w-4 h-4" />
                    Analysis Complete
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
                    Your <span className="text-gradient">Results</span>
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-lg">
                    AI-generated risk assessment and personalized rescue plan tailored just for you
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={handleReset} className="group hover:border-primary/50">
                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                    New Assessment
                  </Button>
                  <Button className="group gradient-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
                    <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Export PDF
                  </Button>
                </div>
              </div>
              
              <div className="mb-16">
                <RiskDashboard assessment={assessment} studentData={studentData} />
              </div>
              
              <div className="pt-8 border-t border-border/30">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                    <Target className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground">
                      Your Rescue <span className="text-gradient">Plan</span>
                    </h3>
                    <p className="text-muted-foreground">Step-by-step guidance to improve your academic performance</p>
                  </div>
                </div>
                <RescuePlan plan={rescuePlan} />
              </div>
            </div>
          </section>
        )}
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* CTA Section */}
        <CTASection onGetStarted={scrollToAssessment} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
