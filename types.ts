export enum UserRole {
  Student = 'student',
  Parent = 'parent',
  Teacher = 'teacher',
  Admin = 'admin'
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  coins: number;
  avatarUrl: string;
  streak: number;
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  strand: string;
  durationMinutes: number;
  isLocked: boolean;
  progress: number; // 0 to 100
  imageUrl: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}

export enum ViewState {
  Dashboard = 'DASHBOARD',
  LessonPlayer = 'LESSON_PLAYER',
  ScienceLab = 'SCIENCE_LAB',
  Shop = 'SHOP',
  Family = 'FAMILY',
  VRExperience = 'VR_EXPERIENCE',
  AROverlay = 'AR_OVERLAY',
  Analytics = 'ANALYTICS',
  LifeSkills = 'LIFE_SKILLS',
  FAQ = 'FAQ',
  InvestorPitch = 'INVESTOR_PITCH',
  ParentsOverview = 'PARENTS_OVERVIEW',
  TeacherDashboard = 'TEACHER_DASHBOARD',
  ProfileManagement = 'PROFILE_MANAGEMENT',
  ActivityLog = 'ACTIVITY_LOG',
  Logout = 'LOGOUT'
}

// New types for Phase 4 & 5 features
export interface AttentionMetrics {
  focusLevel: number;
  timestamp: Date;
  sessionDuration: number;
}

export interface AccessibilityPreferences {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  autoRead: boolean;
  focusMode: boolean;
  colorBlindMode: boolean;
}

export interface AnalyticsData {
  progress: Array<{ name: string; progress: number; time: number; focus: number }>;
  subjects: Array<{ subject: string; score: number; students: number; color: string }>;
  learningStyles: Array<{ name: string; value: number; color: string }>;
  progression: Array<{ month: string; avg: number; target: number }>;
}

export interface LifeSkillLesson {
  id: string;
  title: string;
  duration: string;
  difficulty: string;
  description: string;
  objectives: string[];
  activities: Array<{
    type: string;
    title: string;
    description: string;
  }>;
}

export interface VREnvironment {
  id: string;
  name: string;
  type: 'solar-system' | 'molecules' | 'geometry' | 'physics';
  interactive: boolean;
  educational: boolean;
}

export interface ARObject {
  id: string;
  name: string;
  category: string;
  overlays: string[];
}

export interface ActivityLogEntry {
  id: string;
  type: 'lesson' | 'achievement' | 'streak' | 'login' | 'error' | 'profile_update' | 'logout';
  title: string;
  description: string;
  timestamp: Date;
  duration?: number;
  points?: number;
}
