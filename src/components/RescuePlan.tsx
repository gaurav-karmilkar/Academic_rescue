import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RescuePlan as RescuePlanType } from '@/lib/riskAnalysis';
import { Target, Calendar, BookOpen, Users, Sparkles, Flag, Clock, ArrowRight, Zap, Heart, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface RescuePlanProps {
  plan: RescuePlanType;
}

export function RescuePlan({ plan }: RescuePlanProps) {
  const priorityConfig = {
    High: { 
      bg: 'bg-danger/10', 
      text: 'text-danger', 
      border: 'border-danger/30',
      glow: 'hover:shadow-[0_0_20px_hsl(4_84%_60%/0.15)]',
      indicator: 'bg-danger'
    },
    Medium: { 
      bg: 'bg-warning/10', 
      text: 'text-warning', 
      border: 'border-warning/30',
      glow: 'hover:shadow-[0_0_20px_hsl(38_92%_50%/0.15)]',
      indicator: 'bg-warning'
    },
    Low: { 
      bg: 'bg-success/10', 
      text: 'text-success', 
      border: 'border-success/30',
      glow: 'hover:shadow-[0_0_20px_hsl(160_60%_45%/0.15)]',
      indicator: 'bg-success'
    },
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Goals Overview - Premium Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 overflow-hidden group hover:shadow-[0_0_40px_hsl(37_92%_50%/0.15)] transition-all duration-300 hover:-translate-y-1">
          <div className="h-1 gradient-primary" />
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
                <Flag className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-foreground">Short-term Goals</span>
                <p className="text-xs text-muted-foreground font-normal mt-0.5">Next 2 weeks</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.shortTermGoals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-primary/30 transition-colors group/item">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-primary-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent-foreground/30 bg-gradient-to-br from-accent/10 via-transparent to-accent/20 overflow-hidden group hover:shadow-[0_0_40px_hsl(47_100%_96%/0.3)] transition-all duration-300 hover:-translate-y-1">
          <div className="h-1 bg-gradient-to-r from-accent-foreground to-primary" />
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-foreground flex items-center justify-center shadow-lg">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="text-foreground">Long-term Goals</span>
                <p className="text-xs text-muted-foreground font-normal mt-0.5">This semester</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {plan.longTermGoals.map((goal, index) => (
                <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-background/50 border border-border/30 hover:border-accent-foreground/30 transition-colors group/item">
                  <div className="w-6 h-6 rounded-full bg-accent-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ArrowRight className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors">{goal}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Daily Targets & Mentor Recommendations */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Daily Targets */}
        <Card className="border border-border/50 bg-gradient-to-br from-card to-background overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-border/30 bg-secondary/20">
            <CardTitle className="text-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              Daily Targets
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-4">
              {plan.dailyTargets.map((target, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <span className="text-sm font-bold text-primary-foreground">{index + 1}</span>
                    </div>
                    {index < plan.dailyTargets.length - 1 && (
                      <div className="absolute top-12 left-1/2 w-0.5 h-6 bg-border -translate-x-1/2" />
                    )}
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/20 transition-colors">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{target}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Mentor Recommendations */}
        <Card className="border border-border/50 bg-gradient-to-br from-card to-background overflow-hidden hover:shadow-lg transition-all duration-300">
          <CardHeader className="border-b border-border/30 bg-secondary/20">
            <CardTitle className="text-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Users className="w-5 h-5 text-primary" />
              </div>
              Mentor Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-4">
              {plan.mentorRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-4 group">
                  <div className="w-3 h-3 rounded-full gradient-primary mt-2 flex-shrink-0 group-hover:scale-125 transition-transform shadow-sm" />
                  <div className="flex-1 p-3 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/20 transition-colors">
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">{rec}</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Subject Strategies - Premium Design */}
      <Card className="border border-border/50 overflow-hidden bg-gradient-to-br from-card via-card to-secondary/10">
        <CardHeader className="border-b border-border/30 bg-gradient-to-r from-secondary/30 to-transparent">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span>Subject-Wise Strategies</span>
              <p className="text-sm text-muted-foreground font-normal mt-0.5">Personalized study plans for each subject</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-5">
            {plan.subjectStrategies.map((strategy, index) => {
              const config = priorityConfig[strategy.priority];
              return (
                <div
                  key={index}
                  className={`relative p-5 rounded-2xl ${config.bg} border ${config.border} ${config.glow} transition-all duration-300 hover:-translate-y-1 group overflow-hidden`}
                >
                  {/* Priority indicator bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 ${config.indicator}`} />
                  
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${config.bg} border ${config.border} flex items-center justify-center`}>
                        <Zap className={`w-5 h-5 ${config.text}`} />
                      </div>
                      <h4 className="font-bold text-foreground text-lg">{strategy.subject}</h4>
                    </div>
                    <Badge className={`${config.bg} ${config.text} border ${config.border} font-semibold shadow-sm`}>
                      {strategy.priority}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className={`w-4 h-4 ${config.text}`} />
                    <span className={`text-sm font-semibold ${config.text}`}>{strategy.weeklyHours} hours/week</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {strategy.strategy}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Tips - Inspiring Design */}
      <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 overflow-hidden shadow-[0_0_40px_hsl(37_92%_50%/0.1)]">
        <CardHeader className="border-b border-primary/10">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-lg animate-pulse">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="text-foreground">Stay Motivated</span>
              <p className="text-sm text-muted-foreground font-normal mt-0.5">Daily inspiration to keep you going</p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.motivationTips.map((tip, index) => (
              <div
                key={index}
                className="relative p-5 rounded-2xl bg-background/80 backdrop-blur-sm border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
              >
                <div className="absolute top-4 right-4">
                  {index % 3 === 0 && <Heart className="w-5 h-5 text-danger/50 group-hover:text-danger transition-colors" />}
                  {index % 3 === 1 && <Lightbulb className="w-5 h-5 text-warning/50 group-hover:text-warning transition-colors" />}
                  {index % 3 === 2 && <Sparkles className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed italic pr-8 group-hover:text-foreground transition-colors">
                  "{tip}"
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}