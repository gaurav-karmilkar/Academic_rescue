import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { StudentData, Subject } from '@/lib/riskAnalysis';
import { User, BookOpen, Brain, ArrowRight, Plus, Trash2 } from 'lucide-react';

interface StudentFormProps {
  onSubmit: (data: StudentData) => void;
  isLoading?: boolean;
}

const defaultSubjects: Subject[] = [
  { name: 'Mathematics', marks: 50, isBacklog: false },
  { name: 'Physics', marks: 50, isBacklog: false },
  { name: 'Programming', marks: 50, isBacklog: false },
];

export function StudentForm({ onSubmit, isLoading = false }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentData>({
    name: '',
    rollNumber: '',
    semester: 3,
    attendance: 75,
    subjects: defaultSubjects,
    stressLevel: 5,
    studyHours: 3,
    sleepHours: 7,
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = <K extends keyof StudentData>(key: K, value: StudentData[K]) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const updateSubject = (index: number, field: keyof Subject, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.map((subject, i) => 
        i === index ? { ...subject, [field]: value } : subject
      ),
    }));
  };

  const addSubject = () => {
    setFormData(prev => ({
      ...prev,
      subjects: [...prev.subjects, { name: '', marks: 50, isBacklog: false }],
    }));
  };

  const removeSubject = (index: number) => {
    if (formData.subjects.length > 1) {
      setFormData(prev => ({
        ...prev,
        subjects: prev.subjects.filter((_, i) => i !== index),
      }));
    }
  };

  const avgMarks = formData.subjects.length > 0 
    ? Math.round(formData.subjects.reduce((sum, s) => sum + s.marks, 0) / formData.subjects.length)
    : 0;

  const backlogCount = formData.subjects.filter(s => s.isBacklog).length;

  return (
    <section id="assessment" className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Student <span className="text-gradient">Assessment</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Enter your academic details for AI-powered risk analysis
          </p>
        </div>

        <Card className="border-2 border-border/50 shadow-xl">
          <CardHeader className="border-b border-border/50 bg-secondary/20">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Assessment Form</CardTitle>
                <CardDescription>Step {step} of 3</CardDescription>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`w-10 h-2 rounded-full transition-colors ${
                      s <= step ? 'gradient-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <User className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Basic Information</h3>
                      <p className="text-sm text-muted-foreground">Your personal details</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rollNumber">Roll Number</Label>
                      <Input
                        id="rollNumber"
                        placeholder="e.g., 21CS101"
                        value={formData.rollNumber}
                        onChange={(e) => updateField('rollNumber', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Current Semester: {formData.semester}</Label>
                    <Slider
                      value={[formData.semester]}
                      onValueChange={([value]) => updateField('semester', value)}
                      min={1}
                      max={8}
                      step={1}
                      className="py-4"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1st</span>
                      <span>8th</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label>Attendance Percentage</Label>
                      <span className={`font-semibold ${formData.attendance >= 75 ? 'text-success' : 'text-danger'}`}>
                        {formData.attendance}%
                      </span>
                    </div>
                    <Slider
                      value={[formData.attendance]}
                      onValueChange={([value]) => updateField('attendance', value)}
                      min={0}
                      max={100}
                      step={1}
                      className="py-4"
                    />
                    {formData.attendance < 75 && (
                      <p className="text-xs text-danger">Below minimum required attendance (75%)</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Subject Details */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Subject-wise Performance</h3>
                      <p className="text-sm text-muted-foreground">Enter marks for each subject</p>
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-lg">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${avgMarks >= 50 ? 'text-success' : 'text-danger'}`}>
                        {avgMarks}%
                      </div>
                      <div className="text-xs text-muted-foreground">Average Marks</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${backlogCount === 0 ? 'text-success' : 'text-danger'}`}>
                        {backlogCount}
                      </div>
                      <div className="text-xs text-muted-foreground">Backlogs</div>
                    </div>
                  </div>

                  {/* Subject List */}
                  <div className="space-y-4">
                    {formData.subjects.map((subject, index) => (
                      <div key={index} className="p-4 border border-border rounded-lg bg-card">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Subject Name</Label>
                                <Input
                                  placeholder="e.g., Data Structures"
                                  value={subject.name}
                                  onChange={(e) => updateSubject(index, 'name', e.target.value)}
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <Label>Obtained Marks</Label>
                                  <span className={`text-sm font-semibold ${subject.marks >= 50 ? 'text-success' : 'text-danger'}`}>
                                    {subject.marks}%
                                  </span>
                                </div>
                                <Slider
                                  value={[subject.marks]}
                                  onValueChange={([value]) => updateSubject(index, 'marks', value)}
                                  min={0}
                                  max={100}
                                  step={1}
                                />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`backlog-${index}`}
                                checked={subject.isBacklog}
                                onCheckedChange={(checked) => updateSubject(index, 'isBacklog', !!checked)}
                              />
                              <Label 
                                htmlFor={`backlog-${index}`} 
                                className={`text-sm cursor-pointer ${subject.isBacklog ? 'text-danger' : 'text-muted-foreground'}`}
                              >
                                This subject has a backlog
                              </Label>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSubject(index)}
                            disabled={formData.subjects.length <= 1}
                            className="text-muted-foreground hover:text-danger"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSubject}
                    className="w-full"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Another Subject
                  </Button>
                </div>
              )}

              {/* Step 3: Self Assessment */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                      <Brain className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Self Assessment</h3>
                      <p className="text-sm text-muted-foreground">Your wellbeing indicators</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Stress Level</Label>
                        <span className={`font-semibold ${formData.stressLevel <= 4 ? 'text-success' : formData.stressLevel <= 7 ? 'text-warning' : 'text-danger'}`}>
                          {formData.stressLevel}/10
                        </span>
                      </div>
                      <Slider
                        value={[formData.stressLevel]}
                        onValueChange={([value]) => updateField('stressLevel', value)}
                        min={1}
                        max={10}
                        step={1}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low stress</span>
                        <span>High stress</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Daily Study Hours</Label>
                        <span className="font-semibold text-foreground">{formData.studyHours} hrs</span>
                      </div>
                      <Slider
                        value={[formData.studyHours]}
                        onValueChange={([value]) => updateField('studyHours', value)}
                        min={0}
                        max={10}
                        step={0.5}
                        className="py-4"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Daily Sleep Hours</Label>
                        <span className={`font-semibold ${formData.sleepHours >= 7 ? 'text-success' : 'text-warning'}`}>
                          {formData.sleepHours} hrs
                        </span>
                      </div>
                      <Slider
                        value={[formData.sleepHours]}
                        onValueChange={([value]) => updateField('sleepHours', value)}
                        min={3}
                        max={12}
                        step={0.5}
                        className="py-4"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(prev => Math.max(1, prev - 1))}
                  disabled={step === 1}
                >
                  Previous
                </Button>

                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(prev => prev + 1)}
                    disabled={step === 1 && (!formData.name || !formData.rollNumber)}
                    className="group"
                  >
                    Next
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                ) : (
                  <Button type="submit" variant="hero" className="group" disabled={isLoading}>
                    {isLoading ? 'Analyzing...' : 'Analyze Risk'}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
