-- ==========================================================
-- NIKOlearn MVP: ROBUST SCHEMA RESET & REBUILD
-- ==========================================================

-- 1. TEARDOWN (DROP EVERYTHING IN PUBLIC)
-- This clears all existing tables, views, and types to start fresh.
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;

-- Drop existing types if they exist
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP TYPE IF EXISTS public.transaction_type CASCADE;
DROP TYPE IF EXISTS public.quest_status CASCADE;

-- 2. CORE DEFINITIONS (TYPES & ENUMS)
CREATE TYPE public.user_role AS ENUM ('student', 'parent', 'teacher', 'admin');
CREATE TYPE public.transaction_type AS ENUM ('earned', 'spent', 'bonus', 'adjustment');
CREATE TYPE public.quest_status AS ENUM ('assigned', 'pending_verification', 'completed', 'cancelled');

-- 3. UTILITY FUNCTIONS
-- Function to automatically update 'updated_at' timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. PRIMARY TABLES

-- Profiles (Extends Supabase Auth)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT NOT NULL,
    role public.user_role DEFAULT 'student',
    avatar_url TEXT,
    neurodivergent_mode BOOLEAN DEFAULT false,
    grade_level INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Wallets (1:1 with Student Profiles)
CREATE TABLE public.wallets (
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    balance INTEGER DEFAULT 0 CHECK (balance >= 0),
    total_earned INTEGER DEFAULT 0,
    streak_days INTEGER DEFAULT 0,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Curriculum: Subjects
CREATE TABLE public.subjects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Curriculum: Lessons
CREATE TABLE public.lessons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject_id UUID REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    strand TEXT,
    duration_minutes INTEGER DEFAULT 40,
    content JSONB DEFAULT '{}', -- Highly flexible for VR/Video/Text
    is_published BOOLEAN DEFAULT false,
    created_by UUID REFERENCES public.profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Progress Tracking
CREATE TABLE public.student_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage BETWEEN 0 AND 100),
    time_spent_seconds INTEGER DEFAULT 0,
    mastery_score INTEGER,
    last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(student_id, lesson_id)
);

-- Family/Teacher Relationships
CREATE TABLE public.user_relations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    superior_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE, -- Parent/Teacher
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    relation_type TEXT NOT NULL, -- e.g., 'parent-child', 'teacher-student'
    permissions JSONB DEFAULT '{"view_analytics": true}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Economy: Transactions Ledger
CREATE TABLE public.transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    type public.transaction_type NOT NULL,
    source_type TEXT NOT NULL, -- e.g., 'lesson', 'chore', 'shop'
    reference_id UUID, -- Link to lesson_id or chore_id
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chores (Family Mode)
CREATE TABLE public.chores (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    reward_amount INTEGER DEFAULT 0,
    status public.quest_status DEFAULT 'assigned',
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics: Attention Monitoring (High Volume)
CREATE TABLE public.attention_logs (
    id BIGSERIAL PRIMARY KEY, -- Use BigSerial for high volume
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    focus_score INTEGER CHECK (focus_score BETWEEN 0 AND 100),
    captured_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TRIGGERS & AUTOMATION
CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_wallets_modtime BEFORE UPDATE ON public.wallets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_lessons_modtime BEFORE UPDATE ON public.lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chores_modtime BEFORE UPDATE ON public.chores FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6. INDEXING FOR PERFORMANCE
CREATE INDEX idx_student_progress_student ON public.student_progress(student_id);
CREATE INDEX idx_attention_logs_student ON public.attention_logs(student_id);
CREATE INDEX idx_attention_logs_captured ON public.attention_logs(captured_at);
CREATE INDEX idx_lessons_subject ON public.lessons(subject_id);

-- 7. SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chores ENABLE ROW LEVEL SECURITY;

-- Profile Policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- Wallet Policies
CREATE POLICY "Students view own wallet" ON public.wallets FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Parents view child wallet" ON public.wallets FOR SELECT USING (EXISTS (SELECT 1 FROM public.user_relations WHERE superior_id = auth.uid() AND student_id = wallets.student_id));

-- Chore Policies
CREATE POLICY "Parents manage own assigned chores" ON public.chores FOR ALL USING (parent_id = auth.uid());
CREATE POLICY "Students view assigned chores" ON public.chores FOR SELECT USING (student_id = auth.uid());

-- Lesson Policies
CREATE POLICY "Published lessons are public" ON public.lessons FOR SELECT USING (is_published = true);

-- 8. GRANT PERMISSIONS FOR SUPABASE
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated, anon;
GRANT INSERT, UPDATE ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, service_role, authenticated;

-- ==========================================================
-- SCRIPT COMPLETE
-- ==========================================================