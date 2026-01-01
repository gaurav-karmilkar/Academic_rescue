export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface Subject {
  name: string;
  marks: number;
  isBacklog: boolean;
}

export interface StudentData {
  name: string;
  rollNumber: string;
  semester: number;
  branch?: string;
  cgpa?: number;
  attendance: number;
  subjects: Subject[];
  stressLevel: number;
  studyHours: number;
  sleepHours: number;
}

export interface RiskFactor {
  name: string;
  score: number;
  weight: number;
}

export interface RiskAssessment {
  score: number;
  level: RiskLevel;
  summary: string;
  factors: RiskFactor[];
}

export interface SubjectStrategy {
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  strategy: string;
  weeklyHours: number;
}

export interface RescuePlan {
  dailyTargets: string[];
  subjectStrategies: SubjectStrategy[];
  motivationTips: string[];
  mentorRecommendations: string[];
  shortTermGoals: string[];
  longTermGoals: string[];
}

export interface AIAnalysisResult {
  riskAssessment: RiskAssessment;
  rescuePlan: RescuePlan;
}
