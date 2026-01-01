import { GraduationCap, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export function HeroSection({ onGetStarted }: HeroSectionProps) {
  const { user } = useAuth();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Academic Support</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up leading-tight">
            Student Drop-Risk &{' '}
            <span className="text-gradient">Academic Rescue</span>{' '}
            System
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up animation-delay-100 leading-relaxed">
            Early detection of academic risks using AI analysis. Personalized rescue plans 
            to prevent student dropouts and improve academic performance in engineering colleges.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-200">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onGetStarted}
              className="group"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            {!user ? (
              <Link to="/auth">
                <Button variant="outline" size="xl">
                  Sign In / Register
                </Button>
              </Link>
            ) : (
              <Button variant="outline" size="xl" onClick={onGetStarted}>
                <Play className="w-4 h-4 mr-2" />
                View Demo
              </Button>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 animate-slide-up animation-delay-300">
            <p className="text-sm text-muted-foreground mb-4">Trusted by engineering colleges across India</p>
            <div className="flex items-center justify-center gap-8 opacity-60">
              <div className="text-lg font-semibold text-muted-foreground">ABC Engineering</div>
              <div className="text-lg font-semibold text-muted-foreground">XYZ Institute</div>
              <div className="text-lg font-semibold text-muted-foreground">DEF College</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="hsl(var(--secondary))"
            fillOpacity="0.3"
          />
        </svg>
      </div>
    </section>
  );
}
