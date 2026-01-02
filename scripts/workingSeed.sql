-- NIKOlearn MVP - Working Database Seeding Script
-- Aligned with KICD Grade 7 Rationalized Curriculum 2024/2025
-- Uses proper UUID format and PostgreSQL ARRAY syntax for all primary keys

-- Step 1: Create User Profiles
INSERT INTO profiles (id, full_name, role, avatar_url, neurodivergent_mode_enabled, school_id, grade_level, parent_phone, emergency_contact) VALUES

-- Main Demo Users from Provided Data
('550e8400-e29b-41d4-a716-446655440001', 'Kamau Maina', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau', true, 'nairobi_junior_academy', 7, '+254712345678', '+254798765432'),
('550e8400-e29b-41d4-a716-446655440002', 'Nyawira Maina', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nyawira', false, 'nairobi_junior_academy', null, '+254712345678', '+254798765432'),
('550e8400-e29b-41d4-a716-446655440003', 'Mwalimu Omari', 'teacher', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omari', false, 'nairobi_junior_academy', null, null, null),

-- Additional Students for Class Diversity
('550e8400-e29b-41d4-a716-446655440004', 'Grace Wanjiku', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace', false, 'nairobi_junior_academy', 7, '+254723456789', '+254787654321'),
('550e8400-e29b-41d4-a716-446655440005', 'David Kimani', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', false, 'nairobi_junior_academy', 7, '+254734567890', '+254776543210');

-- Step 2: Create Wallets
INSERT INTO wallets (student_id, balance, total_earned, total_spent, streak_count, last_activity) VALUES
('550e8400-e29b-41d4-a716-446655440001', 485, 720, 235, 7, '2025-12-22T11:08:00Z'),
('550e8400-e29b-41d4-a716-446655440004', 320, 580, 260, 5, '2025-12-22T14:30:00Z'),
('550e8400-e29b-41d4-a716-446655440005', 650, 890, 240, 12, '2025-12-22T09:45:00Z');

-- Step 3: Create Family Links
INSERT INTO family_links (parent_id, student_id, relationship, is_primary, permissions) VALUES
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Mother', true, '["view_progress", "create_chores", "verify_completion"]'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'Mother', true, '["view_progress", "create_chores", "verify_completion"]'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'Mother', true, '["view_progress", "create_chores", "verify_completion"]');

-- Step 4: Create KICD Grade 7 Lessons (FIXED ARRAY SYNTAX)
INSERT INTO lessons (id, title, subject, strand, sub_strand, grade_level, duration_minutes, content_url, video_url, interactive_elements, is_published, created_by, description, learning_objectives, prerequisites) VALUES

('550e8400-e29b-41d4-a716-446655440010', 'Scientific Investigation', 'Integrated Science', 'Scientific Investigation', 'Laboratory Safety', 7, 45, 'https://cdn.nikolearn.ke/lessons/scientific-investigation.html', 'https://cdn.nikolearn.ke/videos/scientific-investigation.mp4', '{"type": "vr_simulation", "content": "laboratory_safety_hazards", "vr_modules": ["Virtual Lab: Safety Hazards Identification"]}', true, '550e8400-e29b-41d4-a716-446655440003', 'Learn laboratory safety and scientific apparatus identification', ARRAY['Identify hazards in a lab', 'Use a Bunsen burner safely', 'Apply first aid for burns and scalds'], ARRAY['Basic safety awareness', 'Curiosity about science']),

('550e8400-e29b-41d4-a716-446655440011', 'Mixtures, Elements and Compounds', 'Integrated Science', 'Mixtures, Elements and Compounds', 'Separation Techniques', 7, 50, 'https://cdn.nikolearn.ke/lessons/mixtures-compounds.html', 'https://cdn.nikolearn.ke/videos/mixtures-compounds.mp4', '{"type": "vr_simulation", "content": "molecular_construction_lab", "vr_modules": ["Molecular Construction Lab"]}', true, '550e8400-e29b-41d4-a716-446655440003', 'Understand classification of substances and separation techniques', ARRAY['Classify substances as homogeneous vs heterogeneous', 'Perform virtual distillation', 'Apply separation techniques like chromatography'], ARRAY['Basic understanding of matter', 'Knowledge of chemical symbols']),

('550e8400-e29b-41d4-a716-446655440012', 'Foundations of Pre-Technical', 'Pre-Technical Studies', 'Foundations of Pre-Technical', 'Introduction to Technical Skills', 7, 40, 'https://cdn.nikolearn.ke/lessons/pretech-foundations.html', 'https://cdn.nikolearn.ke/videos/pretech-foundations.mp4', '{"type": "vr_simulation", "content": "3d_workshop_tour", "vr_modules": ["3D Workshop Tour", "First Aid Simulation"]}', true, '550e8400-e29b-41d4-a716-446655440003', 'Introduction to technical skills and safety in the workshop', ARRAY['State roles of technical studies', 'Apply first aid for burns', 'Use personal protective equipment'], ARRAY['Basic safety awareness', 'Interest in practical skills']),

('550e8400-e29b-41d4-a716-446655440013', 'Computer Hardware Fundamentals', 'Pre-Technical Studies', 'Computer Science Fundamentals', 'Computer Hardware', 7, 45, 'https://cdn.nikolearn.ke/lessons/computer-hardware.html', 'https://cdn.nikolearn.ke/videos/computer-hardware.mp4', '{"type": "interactive_simulation", "content": "pc_assembly_challenge", "vr_modules": ["3D PC Assembly Lab"]}', true, '550e8400-e29b-41d4-a716-446655440003', 'Explore computer hardware and data representation', ARRAY['Identify internal components (CPU, Motherboard, RAM)', 'Understand external peripherals', 'Explain binary representation of data'], ARRAY['Basic mathematics', 'Interest in technology']),

('550e8400-e29b-41d4-a716-446655440014', 'Financial Literacy & Business', 'Pre-Technical Studies', 'Financial Literacy & Business', 'Business and Money Management', 7, 35, 'https://cdn.nikolearn.ke/lessons/financial-literacy.html', 'https://cdn.nikolearn.ke/videos/financial-literacy.mp4', '{"type": "interactive_simulation", "content": "budgeting_tool", "vr_modules": ["Entrepreneurship Simulation"]}', true, '550e8400-e29b-41d4-a716-446655440003', 'Learn money management and entrepreneurship principles', ARRAY['Understand basic entrepreneurship', 'Create personal budgets', 'Distinguish needs vs wants'], ARRAY['Basic mathematics', 'Understanding of trade']);

-- Step 5: Create Student Progress
INSERT INTO student_progress (student_id, lesson_id, progress_percentage, time_spent_minutes, last_accessed, completed_at, mastery_level, evidence_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440010', 95, 45, '2025-12-22T10:30:00Z', '2025-12-22T11:15:00Z', 4, 'https://example.com/evidence/kamau_lab_safety'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', 88, 38, '2025-12-22T14:20:00Z', null, 3, null),
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440010', 82, 42, '2025-12-22T15:30:00Z', '2025-12-22T16:12:00Z', 3, 'https://example.com/evidence/grace_lab_safety'),
('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440010', 92, 40, '2025-12-22T09:45:00Z', '2025-12-22T10:25:00Z', 4, 'https://example.com/evidence/david_lab_safety');

-- Step 6: Create Assessments
INSERT INTO assessments (id, lesson_id, title, type, questions, total_points, time_limit_minutes, is_published, created_by) VALUES

('550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', 'Lab Safety Mastery', 'quiz', '{
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Which piece of apparatus is used to measure a fixed volume of liquid accurately?",
      "options": ["Beaker", "Pipette", "Conical Flask", "Test tube"],
      "correct_answer": "Pipette",
      "points": 5
    },
    {
      "id": "q2",
      "type": "true_false",
      "question": "You should always smell chemicals directly to identify them.",
      "correct_answer": false,
      "points": 3
    }
  ],
  "total_points": 8,
  "time_limit": 15
}', 8, 15, true, '550e8400-e29b-41d4-a716-446655440003');

-- Step 7: Create Quests
INSERT INTO quests (id, title, description, reward_lc, quest_type, requirements, is_active, start_date, end_date, created_by) VALUES
('550e8400-e29b-41d4-a716-446655440030', 'The Rift Valley Expedition', 'VR field trip through Kenya geological wonders', 250, 'special', '{"type": "vr_field_trip", "location": "Rift Valley", "difficulty": "medium"}', true, '2025-12-22T00:00:00Z', '2025-12-31T23:59:59Z', '550e8400-e29b-41d4-a716-446655440003'),
('550e8400-e29b-41d4-a716-446655440031', '7-Day Numeracy Streak', 'Complete 1 math quiz daily for a week', 500, 'daily', '{"type": "streak", "days": 7, "min_lessons_per_day": 1}', true, '2025-12-22T00:00:00Z', '2025-12-29T23:59:59Z', '550e8400-e29b-41d4-a716-446655440003');

-- Step 8: Create Family Link IDs for Chores
-- First, get the family link IDs that were created
DO $$
DECLARE
    family_link_id_kamau UUID;
    family_link_id_grace UUID;
    family_link_id_david UUID;
BEGIN
    SELECT id INTO family_link_id_kamau 
    FROM family_links 
    WHERE parent_id = '550e8400-e29b-41d4-a716-446655440002' 
    AND student_id = '550e8400-e29b-41d4-a716-446655440001';
    
    SELECT id INTO family_link_id_grace 
    FROM family_links 
    WHERE parent_id = '550e8400-e29b-41d4-a716-446655440002' 
    AND student_id = '550e8400-e29b-41d4-a716-446655440004';
    
    SELECT id INTO family_link_id_david 
    FROM family_links 
    WHERE parent_id = '550e8400-e29b-41d4-a716-446655440002' 
    AND student_id = '550e8400-e29b-41d4-a716-446655440005';
    
    -- Step 8: Create Chores
    INSERT INTO chores (id, family_link_id, title, description, reward_lc, difficulty_level, estimated_duration, is_active, created_by) VALUES
    ('550e8400-e29b-41d4-a716-446655440040', family_link_id_kamau, 'Organize School Bookshelf', 'Sort and arrange all school books by subject and grade level', 20, 1, 30, true, '550e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440041', family_link_id_grace, 'Explain Photosynthesis to Younger Sibling', 'Teach your younger brother/sister about how plants make their own food', 50, 2, 20, true, '550e8400-e29b-41d4-a716-446655440002');
END $$;

-- Step 9: Create Chore Completions
INSERT INTO chore_completions (id, chore_id, student_id, completed_at, verified_by, verified_at, rating, feedback) VALUES
('550e8400-e29b-41d4-a716-446655440050', '550e8400-e29b-41d4-a716-446655440040', '550e8400-e29b-41d4-a716-446655440001', '2025-12-22T18:30:00Z', '550e8400-e29b-41d4-a716-446655440002', '2025-12-22T18:45:00Z', 5, 'Excellent organization! All books properly categorized.');

-- Step 10: Create LearnCoin Transactions
INSERT INTO learncoin_transactions (id, student_id, amount, transaction_type, source, description, reference_id, created_at) VALUES
('550e8400-e29b-41d4-a716-446655440060', '550e8400-e29b-41d4-a716-446655440001', 50, 'earned', 'lesson_completion', 'Completed Laboratory Safety lesson', '550e8400-e29b-41d4-a716-446655440010', '2025-12-22T11:15:00Z'),
('550e8400-e29b-41d4-a716-446655440061', '550e8400-e29b-41d4-a716-446655440001', 20, 'earned', 'chore_completion', 'Organized school bookshelf', '550e8400-e29b-41d4-a716-446655440050', '2025-12-22T18:45:00Z'),
('550e8400-e29b-41d4-a716-446655440062', '550e8400-e29b-41d4-a716-446655440001', 15, 'spent', 'shop_purchase', 'Purchased avatar upgrade', 'shop-item-avatar', '2025-12-22T19:00:00Z');

-- Verification Queries
SELECT 'User Profiles Created' as check_name, COUNT(*) as count FROM profiles WHERE id IN ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003')
UNION ALL
SELECT 'Lessons Created' as check_name, COUNT(*) as count FROM lessons WHERE created_by = '550e8400-e29b-41d4-a716-446655440003'
UNION ALL
SELECT 'Quests Active' as check_name, COUNT(*) as count FROM quests WHERE is_active = true
UNION ALL
SELECT 'Chores Created' as check_name, COUNT(*) as count FROM chores WHERE created_by = '550e8400-e29b-41d4-a716-446655440002';
