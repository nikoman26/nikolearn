-- NIKOlearn MVP - Complete Database Schema Creation
-- This script creates all necessary tables for the NIKOlearn educational platform

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user roles enum
CREATE TYPE user_role AS ENUM ('student', 'parent', 'teacher', 'admin');
CREATE TYPE quest_type AS ENUM ('daily', 'weekly', 'special', 'family');
CREATE TYPE transaction_type AS ENUM ('earned', 'spent', 'bonus', 'penalty');
CREATE TYPE assessment_type AS ENUM ('quiz', 'assignment', 'project', 'vr_simulation');
CREATE TYPE engagement_level AS ENUM ('high', 'medium', 'low');
CREATE TYPE content_type AS ENUM ('lesson', 'video', 'assessment', 'vr_asset');

-- Create profiles table (users: students, parents, teachers)
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT,
  role user_role NOT NULL,
  avatar_url TEXT,
  neurodivergent_mode_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  school_id TEXT,
  grade_level INTEGER,
  parent_phone TEXT,
  emergency_contact TEXT
);

-- Create lessons table (educational content)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  strand TEXT NOT NULL,
  sub_strand TEXT NOT NULL,
  grade_level INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  content_url TEXT,
  video_url TEXT,
  interactive_elements JSONB,
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  description TEXT,
  learning_objectives TEXT[],
  prerequisites TEXT[]
);

-- Create student progress table
CREATE TABLE student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  lesson_id UUID REFERENCES lessons(id),
  progress_percentage INTEGER DEFAULT 0,
  time_spent_minutes INTEGER DEFAULT 0,
  last_accessed TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  mastery_level INTEGER CHECK (mastery_level BETWEEN 1 AND 4),
  evidence_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create assessments table
CREATE TABLE assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id),
  title TEXT NOT NULL,
  type assessment_type NOT NULL,
  questions JSONB NOT NULL,
  total_points INTEGER NOT NULL,
  time_limit_minutes INTEGER,
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create assessment results table
CREATE TABLE assessment_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessments(id),
  student_id UUID REFERENCES profiles(id),
  answers JSONB NOT NULL,
  score INTEGER NOT NULL,
  max_score INTEGER NOT NULL,
  time_taken_minutes INTEGER NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create wallets table (LearnCoin balances)
CREATE TABLE wallets (
  student_id UUID PRIMARY KEY REFERENCES profiles(id),
  balance INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,
  total_spent INTEGER DEFAULT 0,
  streak_count INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create LearnCoin transactions table
CREATE TABLE learncoin_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  amount INTEGER NOT NULL,
  transaction_type transaction_type NOT NULL,
  source TEXT NOT NULL,
  description TEXT,
  reference_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create quests table (gamification challenges)
CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  reward_lc INTEGER NOT NULL,
  quest_type quest_type NOT NULL,
  requirements JSONB,
  is_active BOOLEAN DEFAULT true,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create family links table (parent-student relationships)
CREATE TABLE family_links (
  parent_id UUID REFERENCES profiles(id),
  student_id UUID REFERENCES profiles(id),
  relationship TEXT,
  is_primary BOOLEAN DEFAULT true,
  permissions JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (parent_id, student_id)
);

-- Create chores table (family tasks with rewards)
CREATE TABLE chores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_link_id UUID REFERENCES family_links(parent_id),
  title TEXT NOT NULL,
  description TEXT,
  reward_lc INTEGER NOT NULL,
  difficulty_level INTEGER DEFAULT 1,
  estimated_duration INTEGER,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chore completions table
CREATE TABLE chore_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chore_id UUID REFERENCES chores(id),
  student_id UUID REFERENCES profiles(id),
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  verified_by UUID REFERENCES profiles(id),
  verified_at TIMESTAMPTZ,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create attention sessions table (focus monitoring)
CREATE TABLE attention_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES profiles(id),
  session_start TIMESTAMPTZ DEFAULT NOW(),
  session_end TIMESTAMPTZ,
  attention_scores NUMERIC[],
  distraction_events INTEGER DEFAULT 0,
  engagement_level engagement_level DEFAULT 'medium',
  activities_performed TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create offline content table (PWA functionality)
CREATE TABLE offline_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_type content_type NOT NULL,
  content_id TEXT NOT NULL,
  file_url TEXT,
  local_path TEXT,
  file_size INTEGER,
  downloaded_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  is_cached BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_school ON profiles(school_id);
CREATE INDEX idx_lessons_grade ON lessons(grade_level);
CREATE INDEX idx_lessons_subject ON lessons(subject);
CREATE INDEX idx_lessons_published ON lessons(is_published);
CREATE INDEX idx_student_progress_student ON student_progress(student_id);
CREATE INDEX idx_student_progress_lesson ON student_progress(lesson_id);
CREATE INDEX idx_wallets_student ON wallets(student_id);
CREATE INDEX idx_learncoin_transactions_student ON learncoin_transactions(student_id);
CREATE INDEX idx_family_links_parent ON family_links(parent_id);
CREATE INDEX idx_family_links_student ON family_links(student_id);
CREATE INDEX idx_chores_family_link ON chores(family_link_id);
CREATE INDEX idx_chore_completions_student ON chore_completions(student_id);
CREATE INDEX idx_attention_sessions_student ON attention_sessions(student_id);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lessons_updated_at BEFORE UPDATE ON lessons
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_progress_updated_at BEFORE UPDATE ON student_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quests_updated_at BEFORE UPDATE ON quests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chores_updated_at BEFORE UPDATE ON chores
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_offline_content_updated_at BEFORE UPDATE ON offline_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE learncoin_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE chores ENABLE ROW LEVEL SECURITY;
ALTER TABLE chore_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE attention_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE offline_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for lessons (published lessons are viewable by all)
CREATE POLICY "Published lessons are viewable by all" ON lessons
    FOR SELECT USING (is_published = true);

CREATE POLICY "Teachers can manage their own lessons" ON lessons
    FOR ALL USING (auth.uid() = created_by);

-- RLS Policies for student progress (students can view their own progress)
CREATE POLICY "Students can view their own progress" ON student_progress
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Teachers can view progress for their students" ON student_progress
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.id = auth.uid()
            AND profiles.role = 'teacher'
        )
    );

-- RLS Policies for wallets (students can view their own wallet)
CREATE POLICY "Students can view their own wallet" ON wallets
    FOR SELECT USING (auth.uid() = student_id);

-- RLS Policies for family links
CREATE POLICY "Parents can view their family links" ON family_links
    FOR SELECT USING (auth.uid() = parent_id);

CREATE POLICY "Students can view their family links" ON family_links
    FOR SELECT USING (auth.uid() = student_id);

-- RLS Policies for chores
CREATE POLICY "Parents can manage their chores" ON chores
    FOR ALL USING (auth.uid() = created_by);

CREATE POLICY "Students can view their chores" ON chores
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM family_links
            WHERE family_links.parent_id = chores.created_by
            AND family_links.student_id = auth.uid()
        )
    );

-- RLS Policies for chore completions
CREATE POLICY "Students can view their completions" ON chore_completions
    FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Parents can verify completions" ON chore_completions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM family_links
            WHERE family_links.parent_id = auth.uid()
            AND family_links.student_id = chore_completions.student_id
        )
    );

-- Verification query to confirm schema creation
SELECT 
  'Schema Created Successfully' as status,
  COUNT(*) as table_count
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'profiles', 'lessons', 'student_progress', 'assessments', 'assessment_results',
  'wallets', 'learncoin_transactions', 'quests', 'family_links', 'chores',
  'chore_completions', 'attention_sessions', 'offline_content'
);
