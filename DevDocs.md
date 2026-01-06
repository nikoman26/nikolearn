# NikoLearn - Complete Developer Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Feature Documentation](#feature-documentation)
4. [Data Structure & Models](#data-structure--models)
5. [UI/UX Design System](#uiux-design-system)
6. [Database Schema](#database-schema)
7. [API Integration](#api-integration)
8. [Setup & Development](#setup--development)
9. [Component Library](#component-library)
10. [Cultural Context](#cultural-context)
11. [Accessibility Features](#accessibility-features)
12. [Performance & Optimization](#performance--optimization)
13. [Deployment Guide](#deployment-guide)

---

## Project Overview

### Vision & Mission
NikoLearn is an **offline-first, privacy-centric learning platform** designed specifically for neurodivergent students and aligned with the **Kenyan CBC (Competency-Based Curriculum)**. The platform combines traditional education with modern technology, AI tutoring, and gamification to create an engaging, accessible learning environment.

### Target Audience
- **Primary**: Grade 4-6 students (ages 9-12) in Kenyan schools
- **Secondary**: Parents, teachers, and educational institutions
- **Special Focus**: Neurodivergent learners requiring accessibility accommodations

### Educational Philosophy
- **Competency-Based Learning**: Focus on mastery rather than time-based progression
- **Cultural Relevance**: Integration of Kenyan context, languages, and examples
- **Accessibility First**: Designed for neurodivergent learners with multiple accessibility modes
- **Family Integration**: Strong emphasis on parent and community involvement
- **Holistic Development**: Academic, social, emotional, and life skills development

---

## System Architecture

### Technology Stack

#### Frontend
- **Framework**: React 19.2.3 with TypeScript
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS with custom claymorphism design system
- **Icons**: Lucide React
- **Charts**: Chart.js with react-chartjs-2
- **3D/VR**: React Three Fiber (@react-three/fiber, @react-three/drei)
- **Animations**: Tailwind transitions (Framer Motion ready)

#### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime subscriptions
- **File Storage**: Supabase Storage
- **API**: Supabase REST API with TypeScript types

#### AI & Machine Learning
- **AI Service**: Google Gemini 2.0 Flash
- **Model**: gemini-3-flash-preview
- **Context**: CBC curriculum with Kenyan cultural integration

#### Development Tools
- **Package Manager**: npm
- **Type System**: TypeScript 5.8.2
- **Linting**: ESLint (configured via Vite)
- **PWA**: Workbox webpack plugin for offline capabilities

### Architecture Patterns

#### Component Architecture
```
src/
├── components/          # Reusable UI components
│   ├── Dashboard.tsx   # Main dashboard view
│   ├── MwalimuChat.tsx # AI tutoring interface
│   ├── ScienceLab.tsx  # VR/AR learning experiences
│   ├── Shop.tsx        # Gamification economy
│   └── ...
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication state management
├── lib/               # Utility libraries
│   └── supabase.ts    # Database client configuration
├── services/          # External API integrations
│   └── geminiService.ts # AI service integration
├── types/             # TypeScript type definitions
│   ├── types.ts       # Application types
│   └── database.ts    # Database schema types
└── constants.ts       # Application constants
```

#### State Management
- **React Context**: For global state (authentication, user profile)
- **Local State**: useState for component-level state
- **Real-time Updates**: Supabase subscriptions for live data

#### Data Flow
```
User Action → Component → Context/Service → Supabase → Real-time Updates → UI Update
```

---

## Feature Documentation

### 1. Multi-Role Authentication System

#### User Roles
- **Student**: Access to learning content, gamification, AI tutor
- **Parent**: Family dashboard, progress monitoring, chore management
- **Teacher**: Content creation, student analytics, class management
- **Admin**: System administration, user management, analytics

#### Authentication Flow
```typescript
// components/AuthPage.tsx handles:
// - User registration with role selection
// - Email/password authentication
// - Profile creation and wallet initialization
// - Role-based access control
```

#### Profile Management
```typescript
interface UserProfile {
  id: string;
  full_name: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  avatar_url: string;
  neurodivergent_mode_enabled: boolean;
  school_id?: string;
  grade_level?: number;
  parent_phone?: string;
  emergency_contact?: string;
}
```

### 2. Mwalimu AI - Intelligent Tutoring System

#### Features
- **Curriculum Integration**: CBC-aligned responses and explanations
- **Cultural Context**: Kenyan examples, Kiswahili integration
- **Personalized Learning**: Adapts to student level and preferences
- **Interactive Chat**: Real-time conversation with streaming responses
- **Multi-language Support**: English and Kiswahili code-switching

#### Implementation
```typescript
// services/geminiService.ts
const MWALIMU_SYSTEM_INSTRUCTION = `
You are NIKOlearn's Mwalimu AI.
Tone: Encouraging, patient, uniquely Kenyan.
Curriculum: CBC (Competency Based Curriculum).
Audience: Primary school students (Grade 4-6).
Constraints: 
1. Keep answers under 3 sentences unless asked for a story.
2. Mix English with basic friendly Swahili terms
3. Use local analogies (e.g., 'jiko', 'matatu', 'shamba')
4. Always end with a curious question
`;
```

#### AI Features
- **Context Awareness**: Understands current lesson context
- **Adaptive Responses**: Adjusts complexity based on student level
- **Error Handling**: Graceful degradation with helpful messages
- **Streaming Responses**: Real-time message generation

### 3. Gamification & LearnCoin Economy

#### LearnCoin System
- **Virtual Currency**: Earned through learning activities, chore completion
- **Wallet Management**: Balance tracking, transaction history
- **Earning Sources**:
  - Lesson completion: 25-100 coins
  - Quiz performance: 10-50 coins
  - Chore completion: 15-75 coins
  - Streak bonuses: 2x multiplier
  - Perfect scores: Bonus rewards

#### Quest System
```typescript
interface Quest {
  id: string;
  title: string;
  description: string;
  reward_lc: number;
  quest_type: 'daily' | 'weekly' | 'special' | 'family';
  requirements: any;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
}
```

#### Shop Integration
- **Avatar Customization**: Cultural and academic themes
- **Privileges**: Extra time, homework passes, lesson choices
- **Themes**: Interface customization with cultural motifs
- **Rewards**: Family activities, special privileges

### 4. VR/AR Learning Experiences

#### Virtual Science Lab
```typescript
// components/ScienceLab.tsx
// Features:
- 3D interactive plant model for photosynthesis
- CSS-based 3D simulations (WebXR ready)
- Hotspot interactions with educational content
- VR mode toggle for immersive experiences
- Contextual information panels
```

#### VR Environments
- **Solar System Exploration**: Interactive planetary models
- **Molecular Construction**: Chemistry concepts visualization
- **Laboratory Safety**: Hazard identification training
- **Kenyan Geography**: Virtual field trips

#### AR Features
- **Nutrient Identification**: Camera-based food analysis
- **3D Model Overlay**: Real-world object recognition
- **Interactive Annotations**: Point-and-learn functionality

### 5. Family Integration System

#### Parent-Student Links
```typescript
interface FamilyLink {
  parent_id: string;
  student_id: string;
  relationship: string;
  is_primary: boolean;
  permissions: string[];
}
```

#### Chore Management
- **Task Creation**: Parents create household tasks
- **Reward System**: LearnCoin incentives for completion
- **Verification Process**: Parent approval with ratings
- **Progress Tracking**: Completion history and analytics

#### Family Dashboard
- **Progress Monitoring**: Real-time learning analytics
- **Activity Timeline**: Recent learning activities
- **Communication**: Parent-student messaging
- **Achievement Sharing**: Celebrating milestones

### 6. Curriculum-Aligned Content

#### CBC Structure
```typescript
interface Lesson {
  id: string;
  title: string;
  subject: string;        // Science, Math, English, etc.
  strand: string;         // Learning area category
  sub_strand: string;     // Specific topic
  grade_level: number;    // CBC grade (1-9)
  duration_minutes: number;
  content_url?: string;
  video_url?: string;
  interactive_elements?: any;
  learning_objectives?: string[];
  prerequisites?: string[];
}
```

#### Assessment System
- **Quiz Engine**: Multiple choice, true/false, short answer
- **Project-Based**: Photo uploads, presentations
- **VR Simulations**: Immersive assessment experiences
- **Competency Tracking**: Mastery level progression

### 7. Analytics & Progress Tracking

#### Student Analytics
```typescript
interface AnalyticsData {
  progress: Array<{ name: string; progress: number; time: number; focus: number }>;
  subjects: Array<{ subject: string; score: number; students: number; color: string }>;
  learningStyles: Array<{ name: string; value: number; color: string }>;
  progression: Array<{ month: string; avg: number; target: number }>;
}
```

#### Attention Monitoring
- **Focus Tracking**: Real-time attention level measurement
- **Distraction Detection**: Background activity monitoring
- **Engagement Metrics**: Interaction patterns and time spent
- **Adaptive Content**: Difficulty adjustment based on attention

#### Teacher Dashboard
- **Class Overview**: Student progress visualization
- **Content Management**: Lesson creation and editing
- **Assessment Tools**: Quiz builder and grading system
- **Parent Communication**: Progress reports and messaging

### 8. Accessibility Features

#### Neurodivergent Support
```typescript
interface AccessibilityPreferences {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  autoRead: boolean;
  focusMode: boolean;
  colorBlindMode: boolean;
}
```

#### Implementation Features
- **High Contrast Mode**: Enhanced visibility for visual processing
- **Large Text Options**: Scalable font sizes
- **Reduced Motion**: Minimized animations for vestibular sensitivity
- **Auto-read Aloud**: Text-to-speech functionality
- **Focus Mode**: Distraction-free learning environment
- **Color Blind Support**: Alternative color schemes

### 9. Offline-First Architecture

#### PWA Capabilities
- **Service Worker**: Caching strategy for offline access
- **Background Sync**: Queue actions when offline
- **Local Storage**: User preferences and progress
- **Content Pre-download**: Lessons available offline

#### Offline Features
- **Lesson Access**: Downloaded content available offline
- **Progress Sync**: Automatic synchronization when online
- **Family Tasks**: Offline chore management
- **Achievement Queue**: Offline activity logging

---

## Data Structure & Models

### Core Data Models

#### User Profiles
```typescript
// Database: profiles table
interface Profile {
  id: string;                    // UUID, references auth.users
  full_name: string;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  avatar_url?: string;
  neurodivergent_mode_enabled: boolean;
  school_id?: string;
  grade_level?: number;          // For students
  parent_phone?: string;
  emergency_contact?: string;
  created_at: string;
  updated_at: string;
}
```

#### Learning Content
```typescript
// Database: lessons table
interface Lesson {
  id: string;
  title: string;
  subject: string;               // CBC subject area
  strand: string;                // CBC strand
  sub_strand: string;            // CBC sub-strand
  grade_level: number;           // CBC grade level
  duration_minutes: number;
  content_url?: string;          // HTML content
  video_url?: string;            // Video content
  interactive_elements?: any;    // VR/AR components
  is_published: boolean;
  created_by: string;            // Teacher ID
  description?: string;
  learning_objectives?: string[];
  prerequisites?: string[];
  created_at: string;
  updated_at: string;
}
```

#### Progress Tracking
```typescript
// Database: student_progress table
interface StudentProgress {
  id: string;
  student_id: string;            // Profile ID
  lesson_id: string;             // Lesson ID
  progress_percentage: number;   // 0-100
  time_spent_minutes: number;
  last_accessed: string;
  completed_at?: string;
  mastery_level?: number;        // 1-4 competency level
  evidence_url?: string;         // Assessment evidence
  created_at: string;
  updated_at: string;
}
```

#### Gamification
```typescript
// Database: wallets table
interface Wallet {
  student_id: string;
  balance: number;               // Current LearnCoin balance
  total_earned: number;          // Lifetime earnings
  total_spent: number;           // Lifetime spending
  streak_count: number;          // Learning streak
  last_activity: string;
  created_at: string;
  updated_at: string;
}

// Database: learncoin_transactions table
interface LearnCoinTransaction {
  id: string;
  student_id: string;
  amount: number;                // Positive=earned, negative=spent
  transaction_type: 'earned' | 'spent' | 'bonus' | 'penalty';
  source: string;                // lesson_completion, chore_completion, etc.
  description?: string;
  reference_id?: string;         // Related lesson/chore ID
  created_at: string;
}
```

#### Family System
```typescript
// Database: family_links table
interface FamilyLink {
  parent_id: string;
  student_id: string;
  relationship?: string;         // "Mother", "Father", etc.
  is_primary: boolean;
  permissions?: string[];        // ["view_progress", "create_chores"]
  created_at: string;
}

// Database: chores table
interface Chore {
  id: string;
  family_link_id: string;        // Links to family relationship
  title: string;
  description?: string;
  reward_lc: number;             // LearnCoin reward
  difficulty_level: number;      // 1-5 scale
  estimated_duration?: number;   // Minutes
  is_active: boolean;
  created_by: string;            // Parent ID
  created_at: string;
  updated_at: string;
}
```

### Database Relationships

```
profiles (1) ←→ (n) student_progress
profiles (1) ←→ (1) wallets
wallets (1) ←→ (n) learncoin_transactions
profiles (1) ←→ (n) family_links
family_links (1) ←→ (n) chores
chores (1) ←→ (n) chore_completions
lessons (1) ←→ (n) assessments
lessons (1) ←→ (n) student_progress
assessments (1) ←→ (n) assessment_results
```

---

## UI/UX Design System

### Soma-UI Design Principles

#### Claymorphism Aesthetic
- **Visual Style**: Soft shadows, rounded corners, layered depth
- **Colors**: Muted, calming palette with high contrast options
- **Typography**: Clear, readable fonts with size scaling
- **Layout**: Bento grid system with organized information cards

#### Color Palette
```css
/* Primary Colors */
--primary: #6d5dfc;           /* Purple accent */
--background: #e0e5ec;        /* Light gray background */
--card-bg: #d1d9e6;           /* Medium gray for cards */
--text-primary: #2d3748;      /* Dark gray for text */
--text-secondary: #718096;    /* Medium gray for secondary text */

/* Semantic Colors */
--success: #48bb78;           /* Green for success states */
--warning: #ed8936;           /* Orange for warnings */
--error: #f56565;             /* Red for errors */
--info: #4299e1;              /* Blue for information */

/* Accessibility Colors */
--high-contrast-bg: #000000;
--high-contrast-text: #ffffff;
--focus-ring: #6d5dfc;
```

#### Shadow System
```css
/* Claymorphism Shadows */
.shadow-clay {
  box-shadow: 8px 8px 16px rgba(109, 93, 252, 0.1), 
              -8px -8px 16px rgba(255, 255, 255, 0.8);
}

.shadow-clay-inset {
  box-shadow: inset 8px 8px 16px rgba(109, 93, 252, 0.1), 
              inset -8px -8px 16px rgba(255, 255, 255, 0.8);
}
```

### Component
