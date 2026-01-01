import { Card, CardContent } from '@/components/ui/card';
import { Brain, Shield, TrendingUp, Users, Clock, Target } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Google Gemini analyzes attendance, marks, backlogs, and stress indicators to predict academic risk levels accurately.',
  },
  {
    icon: Shield,
    title: 'Early Detection',
    description: 'Identify at-risk students before academic failure occurs, enabling timely intervention and support.',
  },
  {
    icon: Target,
    title: 'Personalized Plans',
    description: 'Get customized rescue strategies with daily targets, subject-wise approaches, and mentor recommendations.',
  },
  {
    icon: Users,
    title: 'Mentor Dashboard',
    description: 'Faculty and mentors can track student progress and coordinate intervention efforts effectively.',
  },
  {
    icon: Clock,
    title: 'Real-time Insights',
    description: 'Instant risk assessment and rescue plan generation powered by advanced AI technology.',
  },
  {
    icon: TrendingUp,
    title: 'Progress Tracking',
    description: 'Monitor improvement over time with historical data and progress analytics.',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient">AcademicRescue</span>?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our AI-powered system helps Tier-3 engineering colleges prevent academic failures through early detection and personalized intervention.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="border border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
