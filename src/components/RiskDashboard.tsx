import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RiskAssessment, StudentData } from '@/lib/riskAnalysis';
import { AlertTriangle, CheckCircle, AlertCircle, Brain, TrendingUp, User, Hash, GraduationCap } from 'lucide-react';

interface RiskDashboardProps {
  assessment: RiskAssessment;
  studentData: StudentData;
}

export function RiskDashboard({ assessment, studentData }: RiskDashboardProps) {
  const riskConfig = {
    Low: {
      color: 'text-success',
      bg: 'bg-success/10',
      border: 'border-success/50',
      gradient: 'gradient-success',
      glowClass: 'shadow-[0_0_40px_hsl(160_60%_45%/0.3)]',
      icon: CheckCircle,
      label: 'Low Risk',
      description: 'Student is on track academically',
    },
    Medium: {
      color: 'text-warning',
      bg: 'bg-warning/10',
      border: 'border-warning/50',
      gradient: 'gradient-warning',
      glowClass: 'shadow-[0_0_40px_hsl(38_92%_50%/0.3)]',
      icon: AlertCircle,
      label: 'Medium Risk',
      description: 'Attention needed to prevent decline',
    },
    High: {
      color: 'text-danger',
      bg: 'bg-danger/10',
      border: 'border-danger/50',
      gradient: 'gradient-danger',
      glowClass: 'shadow-[0_0_40px_hsl(4_84%_60%/0.3)]',
      icon: AlertTriangle,
      label: 'High Risk',
      description: 'Immediate intervention required',
    },
  };

  const config = riskConfig[assessment.level];
  const RiskIcon = config.icon;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* AI Badge */}
      <div className="flex items-center justify-center gap-2 text-sm">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 border border-primary/20">
          <Brain className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-foreground font-medium">Powered by Google Gemini AI</span>
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
        </div>
      </div>

      {/* Main Risk Card */}
      <Card className={`border-2 ${config.border} ${config.glowClass} overflow-hidden transition-all duration-500 hover:scale-[1.01]`}>
        <div className={`${config.gradient} p-8 relative overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border border-white/30 rotate-3 hover:rotate-0 transition-transform duration-300">
                  <RiskIcon className="w-10 h-10 text-white drop-shadow-lg" />
                </div>
                {assessment.level === 'High' && (
                  <div className="absolute inset-0 rounded-2xl bg-white/30 animate-pulse-ring" />
                )}
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-3xl font-bold text-white drop-shadow-lg tracking-tight">{config.label}</h3>
                <p className="text-white/90 text-lg mt-1">{config.description}</p>
              </div>
            </div>
            
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-4 border border-white/20">
              <div className="text-6xl font-bold text-white drop-shadow-lg tracking-tighter">{assessment.score}</div>
              <div className="text-white/80 text-sm font-medium flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4" />
                Risk Score
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-8 bg-gradient-to-b from-card to-background">
          <div className="mb-6">
            <h4 className="font-bold text-foreground mb-3 flex items-center gap-2 text-lg">
              <Brain className="w-5 h-5 text-primary" />
              AI Assessment Summary
            </h4>
            <p className="text-muted-foreground leading-relaxed text-base bg-secondary/30 p-4 rounded-xl border border-border/50 italic">
              "{assessment.summary}"
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <User className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">{studentData.name}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-border/50">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{studentData.rollNumber}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/30 border border-accent-foreground/20">
              <GraduationCap className="w-4 h-4 text-accent-foreground" />
              <span className="text-sm font-medium text-foreground">Semester {studentData.semester}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Factor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assessment.factors.map((factor, index) => {
          const statusColor = factor.score >= 70 ? 'text-success' : factor.score >= 45 ? 'text-warning' : 'text-danger';
          const statusBg = factor.score >= 70 ? 'bg-success' : factor.score >= 45 ? 'bg-warning' : 'bg-danger';
          const statusGlow = factor.score >= 70 
            ? 'hover:shadow-[0_0_30px_hsl(160_60%_45%/0.2)]' 
            : factor.score >= 45 
            ? 'hover:shadow-[0_0_30px_hsl(38_92%_50%/0.2)]' 
            : 'hover:shadow-[0_0_30px_hsl(4_84%_60%/0.2)]';
          const statusLabel = factor.score >= 70 ? 'Good' : factor.score >= 45 ? 'Needs Attention' : 'Critical';
          const statusBadgeBg = factor.score >= 70 ? 'bg-success/10' : factor.score >= 45 ? 'bg-warning/10' : 'bg-danger/10';

          return (
            <Card 
              key={index} 
              className={`border border-border/50 ${statusGlow} transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden group`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`h-1 ${statusBg} transition-all duration-500`} />
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  <span className="font-semibold">{factor.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${statusBadgeBg} ${statusColor} font-medium`}>
                    {factor.weight}% weight
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between mb-3">
                  <span className={`text-4xl font-bold ${statusColor} tracking-tight`}>{factor.score}</span>
                  <span className={`text-sm font-semibold ${statusColor} px-3 py-1 rounded-full ${statusBadgeBg}`}>
                    {statusLabel}
                  </span>
                </div>
                <div className="w-full h-3 bg-secondary/50 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full ${statusBg} rounded-full transition-all duration-1000 ease-out group-hover:opacity-90`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}