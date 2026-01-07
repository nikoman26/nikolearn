-- 1. CBC Curriculum Reference Table
CREATE TABLE IF NOT EXISTS public.cbc_curriculum (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    grade_level INTEGER NOT NULL,
    subject TEXT NOT NULL,
    strand TEXT NOT NULL,
    sub_strand TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enhanced Lessons Table (to support Teacher Architect)
-- Note: 'lessons' table already exists in types, we're adding structure for blocks
CREATE TABLE IF NOT EXISTS public.lesson_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    block_type TEXT NOT NULL CHECK (block_type IN ('video', 'vr_lab', 'quiz', 'text', 'ar_overlay')),
    content JSONB NOT NULL,
    order_index INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Aggregated Focus Logs (for Teacher Heatmaps)
CREATE TABLE IF NOT EXISTS public.aggregated_focus_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
    timestamp_mark INTEGER NOT NULL, -- minute or second mark in lesson
    average_score NUMERIC(5,2) NOT NULL,
    sample_count INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Family Economy: Chores
CREATE TABLE IF NOT EXISTS public.chores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES public.profiles(id),
    student_id UUID REFERENCES public.profiles(id),
    title TEXT NOT NULL,
    description TEXT,
    reward_lc INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL CHECK (status IN ('assigned', 'pending_verification', 'completed')) DEFAULT 'assigned',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Sensory Profiles for Neurodivergent Learners
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS sensory_preferences JSONB DEFAULT '{
    "reduced_motion": false,
    "high_contrast": false,
    "simplified_layout": false,
    "auto_read_aloud": false
}'::jsonb;

-- 6. Add RLS Policies
ALTER TABLE public.chores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aggregated_focus_logs ENABLE ROW LEVEL SECURITY;

-- Parents can see/manage chores for their linked students
CREATE POLICY "Parents manage chores" ON public.chores
    FOR ALL USING (
        auth.uid() = parent_id OR 
        EXISTS (
            SELECT 1 FROM public.family_links 
            WHERE parent_id = auth.uid() AND student_id = chores.student_id
        )
    );

-- Teachers can see aggregated focus for their lessons
CREATE POLICY "Teachers view their lesson focus" ON public.aggregated_focus_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.lessons 
            WHERE id = aggregated_focus_logs.lesson_id AND created_by = auth.uid()
        )
    );