export interface AnalysisResult {
  rootCause: string;
  quickFix: string;
  newHabit: string;
  mindsetShift: string;
  longTermAdvice: string;
}

export interface SessionWithAnalysis {
  id: number;
  userId: number;
  title: string;
  problem: string;
  duration: string;
  impact: string;
  rootCause: string;
  quickFix: string;
  newHabit: string;
  mindsetShift: string;
  longTermAdvice: string;
  createdAt: Date;
  date?: string;
}

export interface JournalEntryType {
  id: number;
  userId: number;
  content: string;
  reflection: string | null;
  microAdvice: string | null;
  createdAt: Date;
  date?: string;
}

export interface NudgeType {
  id: number;
  message: string;
  category: string;
  createdAt: Date;
  date?: string;
}

export type TabType = 'analyze' | 'journal' | 'history' | 'nudges';
