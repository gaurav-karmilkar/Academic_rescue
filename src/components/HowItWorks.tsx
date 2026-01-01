import { CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Enter Academic Data',
    description: 'Students input their attendance, subject-wise marks, backlogs, and self-assessment details through our simple form.',
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Google Gemini AI analyzes the data to predict risk levels and identify areas of concern with high accuracy.',
  },
  {
    number: '03',
    title: 'Get Rescue Plan',
    description: 'Receive a personalized academic rescue plan with daily targets, subject strategies, and mentor recommendations.',
  },
  {
    number: '04',
    title: 'Track Progress',
    description: 'Mentors monitor student progress and adjust intervention strategies based on improvement metrics.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A simple 4-step process to identify at-risk students and provide personalized academic support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
              
              <div className="text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4 shadow-glow">
                  <span className="text-xl font-bold text-primary-foreground">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
