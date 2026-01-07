-- ==========================================================
-- NIKOlearn MVP: COMPLETE ROBUST DATA SEED
-- ==========================================================

-- 1. INITIALIZE SUBJECTS
-- These generate the UUIDs that the lessons will point to.
INSERT INTO public.subjects (id, name, code, description) VALUES
('s1000000-0000-0000-0000-000000000001', 'Science and Technology', 'SCI-G6', 'Kenyan CBC Grade 6 Science Curriculum focusing on Living Things and Environment.'),
('s1000000-0000-0000-0000-000000000002', 'Mathematics', 'MAT-G6', 'Grade 6 Mathematics covering Fractions, Decimals, and Logic.')
ON CONFLICT (id) DO NOTHING;

-- 2. CREATE DEMO PROFILES
-- Note: These UUIDs should match your Supabase Auth IDs for full functionality.
-- Replace with actual IDs if needed.
INSERT INTO public.profiles (id, full_name, role, avatar_url, grade_level) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Kamau Maina', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau', 6),
('550e8400-e29b-41d4-a716-446655440002', 'Nyawira Maina', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nyawira', NULL),
('550e8400-e29b-41d4-a716-446655440003', 'Mwalimu Omari', 'teacher', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omari', NULL)
ON CONFLICT (id) DO UPDATE SET full_name = EXCLUDED.full_name;

-- 3. INITIALIZE WALLETS (For Students)
INSERT INTO public.wallets (student_id, balance, total_earned, streak_days) VALUES
('550e8400-e29b-41d4-a716-446655440001', 485, 1200, 7)
ON CONFLICT (student_id) DO NOTHING;

-- 4. ESTABLISH FAMILY/TEACHER RELATIONS
-- This link enables the Parent Dashboard to see Student data.
INSERT INTO public.user_relations (superior_id, student_id, relation_type) VALUES
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'parent-child'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'teacher-student')
ON CONFLICT DO NOTHING;

-- 5. SEED CURRICULUM LESSONS (Grade 6 Science)
-- Using JSONB to house flexible interactive metadata.
INSERT INTO public.lessons (id, subject_id, title, strand, duration_minutes, is_published, content) VALUES
('cbc-lesson-1-body-systems', 's1000000-0000-0000-0000-000000000001', 'Human Body Systems: The Heart', 'Living Things', 40, true, '{
    "type": "vr_interactive",
    "video_url": "https://example.com/heart_intro.mp4",
    "vr_asset": "assets/vrschool/science/heart_v2.glb",
    "interactive_hotspots": [
        {"id": "lv", "label": "Left Ventricle", "desc": "Pumps oxygenated blood to the body."},
        {"id": "ra", "label": "Right Atrium", "desc": "Receives deoxygenated blood from the body."}
    ],
    "quiz_preview": [
        {"q": "How many chambers does the human heart have?", "options": ["2", "3", "4", "5"], "a": 2}
    ]
}'),
('cbc-lesson-2-blood-vessels', 's1000000-0000-0000-0000-000000000001', 'Blood and Blood Vessels', 'Living Things', 40, true, '{
    "type": "ar_overlay",
    "ar_marker": "markers/veins.png",
    "desc": "Use your tablet camera to see the circulatory system overlay."
}'),
('cbc-lesson-math-fractions', 's1000000-0000-0000-0000-000000000002', 'Understanding Parts of a Whole', 'Numbers', 30, true, '{
    "type": "logic_puzzle",
    "difficulty": "medium",
    "puzzles": 5
}')
ON CONFLICT (id) DO NOTHING;

-- 6. INITIAL LEDGER (Transaction History)
-- This proves the wallet balance is supported by a history of earnings.
INSERT INTO public.transactions (student_id, amount, type, source_type, description) VALUES
('550e8400-e29b-41d4-a716-446655440001', 50, 'earned', 'lesson', 'Completed: The Human Heart'),
('550e8400-e29b-41d4-a716-446655440001', 25, 'earned', 'chore', 'Washed the Dishes'),
('550e8400-e29b-41d4-a716-446655440001', -10, 'spent', 'shop', 'Bought: Blue Avatar Cap');

-- 7. INITIAL PROGRESS
INSERT INTO public.student_progress (student_id, lesson_id, completion_percentage, mastery_score) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'cbc-lesson-1-body-systems', 85, 3)
ON CONFLICT (student_id, lesson_id) DO NOTHING;

-- ==========================================================
-- SEED COMPLETE
-- ==========================================================