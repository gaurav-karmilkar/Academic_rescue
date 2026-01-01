import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  const { user } = useAuth();

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Powered by Google Gemini AI</span>
        </div>
        
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Ready to Transform <span className="text-gradient">Academic Outcomes</span>?
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join colleges across India using AI-powered early detection to prevent academic failures and support student success.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            variant="hero" 
            size="xl" 
            onClick={onGetStarted}
            className="group"
          >
            Start Free Assessment
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          {!user && (
            <Link to="/auth">
              <Button variant="outline" size="lg">
                Create Account
              </Button>
            </Link>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mt-6">
          No credit card required • Instant AI analysis • Personalized rescue plans
        </p>
      </div>
    </section>
  );
}
