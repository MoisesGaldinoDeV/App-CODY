export type CodeFileType = 'html' | 'css' | 'javascript' | 'markdown';

export interface CodeFile {
  id: string;
  name: string;
  language: CodeFileType;
  content: string;
}

export interface CodeDiagnostic {
  file: 'html' | 'css' | 'js';
  line: number;
  message: string;
  severity: 'error' | 'warning' | 'info';
  fixSuggestion?: string;
}

export interface CodeObjective {
  id: string;
  description: string;
  hint: string;
  type: 'html' | 'css' | 'js' | 'runtime';
  // Check identifier for the validator engine
  checkKey: string;
}

export interface CourseStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  instructions: string[];
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  objectives: CodeObjective[];
  explanation: string;
  xpReward: number;
}

export interface CourseProject {
  id: string;
  title: string;
  description: string;
  levelRequired: number;
  levelBadge: string;
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado';
  category: 'HTML & CSS' | 'CSS Flexbox' | 'JavaScript DOM' | 'Lógica & Interatividade' | 'Portfólio Full';
  estimatedMinutes: number;
  totalXp: number;
  steps: CourseStep[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  xpBonus: number;
  unlockedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  provider: 'google' | 'local';
  xp: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  lastActiveDate: string;
  badges: string[]; // Badge IDs
  completedStepIds: string[];
  completedProjectIds: string[];
  githubUsername?: string;
  githubToken?: string;
}

export interface ConsoleEntry {
  id: string;
  type: 'log' | 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  count?: number;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';
