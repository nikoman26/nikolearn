-- NIKOlearn MVP - Focused Curriculum-Based Seeding Script
-- Uses your specific user accounts and KICD Grade 7 curriculum data
-- Default password for all accounts: "Learny26@#"

-- Step 1: Create User Profiles from Provided Data
INSERT INTO profiles (id, full_name, role, avatar_url, neurodivergent_mode_enabled, school_id, grade_level, parent_phone, emergency_contact) VALUES

-- Main Demo Users from Your Data
('u1-student-kamau', 'Kamau Maina', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau', true, 'nairobi_junior_academy', 7, '+254712345678', '+254798765432'),
('u2-parent-nyawira', 'Nyawira Maina', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nyawira', false, 'nairobi_junior_academy', null, '+254712345678', '+254798765432'),
('u3-teacher-mwalimu', 'Mwalimu Omari', 'teacher', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omari', false, 'nairobi_junior_academy', null, null, null);

-- Step 2: Create Wallets
INSERT INTO wallets (student_id, balance, total_earned, total_spent, streak_count, last_activity) VALUES
('u1-student-kamau', 485, 720, 235, 7, '2025-12-22T11:08:00Z');

-- Step 3: Create Family Links
INSERT INTO family_links (parent_id, student_id, relationship, is_primary, permissions) VALUES
('u2-parent-nyawira', 'u1-student-kamau', 'Mother', true, '["view_progress", "create_chores", "verify_completion", "manage_assignments"]');

-- Step 4: Create KICD Grade 7 Rationalized Curriculum Lessons
INSERT INTO lessons (id, title, subject, strand, sub_strand, grade_level, duration_minutes, content_url, video_url, interactive_elements, is_published, created_by, description, learning_objectives, prerequisites) VALUES

-- INTEGRATED SCIENCE STRAND 1: Scientific Investigation
('lesson-scientific-investigation', 'Scientific Investigation', 'Integrated Science', 'Scientific Investigation', 'Laboratory Safety', 7, 45, 'https://cdn.nikolearn.ke/lessons/scientific-investigation.html', 'https://cdn.nikolearn.ke/videos/scientific-investigation.mp4', '{"type": "vr_simulation", "content": "laboratory_safety_hazards", "vr_modules": ["Virtual Lab: Safety Hazards Identification", "Apparatus Match-up 3D"]}', true, 'u3-teacher-mwalimu', 'Learn laboratory safety and scientific apparatus identification', '["Identify hazards in a lab", "Use a Bunsen burner safely", "Apply first aid for burns and scalds", "Identify laboratory apparatus and their uses"]', '["Basic safety awareness", "Curiosity about science"]'),

-- INTEGRATED SCIENCE STRAND 2: Mixtures, Elements and Compounds
('lesson-mixtures-compounds', 'Mixtures, Elements and Compounds', 'Integrated Science', 'Mixtures, Elements and Compounds', 'Separation Techniques', 7, 50, 'https://cdn.nikolearn.ke/lessons/mixtures-compounds.html', 'https://cdn.nikolearn.ke/videos/mixtures-compounds.mp4', '{"type": "vr_simulation", "content": "molecular_construction_lab", "vr_modules": ["Molecular Construction Lab"]}', true, 'u3-teacher-mwalimu', 'Understand classification of substances and separation techniques', '["Classify substances as homogeneous vs heterogeneous", "Perform virtual distillation", "Apply separation techniques like chromatography", "Understand molecular structure"]', '["Basic understanding of matter", "Knowledge of chemical symbols"]'),

-- PRE-TECHNICAL STUDIES STRAND 1: Foundations
('lesson-pretech-foundations', 'Foundations of Pre-Technical', 'Pre-Technical Studies', 'Foundations of Pre-Technical', 'Introduction to Technical Skills', 7, 40, 'https://cdn.nikolearn.ke/lessons/pretech-foundations.html', 'https://cdn.nikolearn.ke/videos/pretech-foundations.mp4', '{"type": "vr_simulation", "content": "3d_workshop_tour", "vr_modules": ["3D Workshop Tour", "First Aid Simulation"]}', true, 'u3-teacher-mwalimu', 'Introduction to technical skills and safety in the workshop', '["State roles of technical studies", "Apply first aid for burns", "Use personal protective equipment", "Understand safety protocols"]', '["Basic safety awareness", "Interest in practical skills"]'),

-- PRE-TECHNICAL STUDIES STRAND 2: Computer Science
('lesson-computer-hardware', 'Computer Hardware Fundamentals', 'Pre-Technical Studies', 'Computer Science Fundamentals', 'Computer Hardware', 7, 45, 'https://cdn.nikolearn.ke/lessons/computer-hardware.html', 'https://cdn.nikolearn.ke/videos/computer-hardware.mp4', '{"type": "interactive_simulation", "content": "pc_assembly_challenge", "vr_modules": ["3D PC Assembly Lab"]}', true, 'u3-teacher-mwalimu', 'Explore computer hardware and data representation', '["Identify internal components (CPU, Motherboard, RAM)", "Understand external peripherals", "Explain binary representation of data", "Build a computer using drag-and-drop interface"]', '["Basic mathematics", "Interest in technology"]'),

-- PRE-TECHNICAL STUDIES STRAND 3: Financial Literacy
('lesson-financial-literacy', 'Financial Literacy & Business', 'Pre-Technical Studies', 'Financial Literacy & Business', 'Business and Money Management', 7, 35, 'https://cdn.nikolearn.ke/lessons/financial-literacy.html', 'https://cdn.nikolearn.ke/videos/financial-literacy.mp4', '{"type": "interactive_simulation", "content": "budgeting_tool", "vr_modules": ["Entrepreneurship Simulation"]}', true, 'u3-teacher-mwalimu', 'Learn money management and entrepreneurship principles', '["Understand basic entrepreneurship", "Create personal budgets", "Distinguish needs vs wants", "Make informed financial decisions"]', '["Basic mathematics", "Understanding of trade"]');

-- Step 5: Create Assessments
INSERT INTO assessments (id, lesson_id, title, type, questions, total_points, time_limit_minutes, is_published, created_by) VALUES

-- Lab Safety Quiz (from your provided data)
('assessment-lab-safety', 'lesson-scientific-investigation', 'Lab Safety Mastery', 'quiz', '{
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
}', 8, 15, true, 'u3-teacher-mwalimu');

-- Step 6: Create Student Progress
INSERT INTO student_progress (student_id, lesson_id, progress_percentage, time_spent_minutes, last_accessed, completed_at, mastery_level, evidence_url) VALUES
('u1-student-kamau', 'lesson-scientific-investigation', 85, 38, '2025-12-22T10:30:00Z', '2025-12-22T11:08:00Z', 3, 'https://example.com/evidence/kamau_lab_safety'),
('u1-student-kamau', 'lesson-mixtures-compounds', 72, 30, '2025-12-22T14:15:00Z', null, 2, null);

-- Step 7: Create Quests (from your gamification data)
INSERT INTO quests (id, title, description, reward_lc, quest_type, requirements, is_active, start_date, end_date, created_by) VALUES
('quest-explorer', 'The Rift Valley Expedition', 'VR field trip through Kenya''s geological wonders', 250, 'special', '{"type": "vr_field_trip", "location": "Rift Valley", "difficulty": "medium"}', true, '2025-12-22T00:00:00Z', '2025-12-31T23:59:59Z', 'u3-teacher-mwalimu'),
('quest-daily-math', '7-Day Numeracy Streak', 'Complete 1 math quiz daily for a week', 500, 'daily', '{"type": "streak", "days": 7, "min_lessons_per_day": 1}', true, '2025-12-22T00:00:00Z', '2025-12-29T23:59:59Z', 'u3-teacher-mwalimu');

-- Step 8: Create Chores Market (from your provided data)
INSERT INTO chores (id, family_link_id, title, description, reward_lc, difficulty_level, estimated_duration, is_active, created_by) VALUES
('chore-organize-books', 'u2-parent-nyawira', 'Organize School Bookshelf', 'Sort and arrange all school books by subject and grade level', 20, 1, 30, true, 'u2-parent-nyawira'),
('chore-explain-photosynthesis', 'u2-parent-nyawira', 'Explain Photosynthesis to Younger Sibling', 'Teach your younger brother/sister about how plants make their own food', 50, 2, 20, true, 'u2-parent-nyawira');

-- Step 9: Create Chore Completions
INSERT INTO chore_completions (id, chore_id, student_id, completed_at, verified_by, verified_at, rating, feedback) VALUES
('completion-books', 'chore-organize-books', 'u1-student-kamau', '2025-12-22T18:30:00Z', 'u2-parent-nyawira', '2025-12-22T18:45:00Z', 5, 'Excellent organization! All books properly categorized.');

-- Step 10: Create Assignment (from your data)
INSERT INTO assessments (id, lesson_id, title, type, questions, total_points, time_limit_minutes, is_published, created_by) VALUES
('assignment-nutrition', 'lesson-financial-literacy', 'Home Science: Nutrient Balanced Meal', 'assignment', '{
  "description": "Snap a photo of your dinner and use the AR overlay to identify Carbohydrates, Proteins, and Vitamins.",
  "competency_tagged": "Health Education",
  "submission_type": "photo_upload",
  "rubric": {
    "photo_quality": 20,
    "nutrient_identification": 40,
    "meal_balance": 40
  }
}', 100, null, true, 'u3-teacher-mwalimu');

-- Step 11: Create LearnCoin Transactions
INSERT INTO learncoin_transactions (id, student_id, amount, transaction_type, source, description, reference_id, created_at) VALUES
('txn-1', 'u1-student-kamau', 50, 'earned', 'lesson_completion', 'Completed Laboratory Safety lesson', 'lesson-scientific-investigation', '2025-12-22T11:08:00Z'),
('txn-2', 'u1-student-kamau', 20, 'earned', 'chore_completion', 'Organized school bookshelf', 'completion-books', '2025-12-22T18:45:00Z'),
('txn-3', 'u1-student-kamau', 15, 'spent', 'shop_purchase', 'Purchased avatar upgrade', 'shop-item-avatar', '2025-12-22T19:00:00Z');

-- Step 12: Create Analytics Data (from your mock data)
INSERT INTO student_progress (student_id, lesson_id, progress_percentage, time_spent_minutes, last_accessed, completed_at, mastery_level, evidence_url) VALUES
('u1-student-kamau', 'lesson-pretech-foundations', 90, 35, '2025-12-22T15:20:00Z', '2025-12-22T15:55:00Z', 4, 'https://example.com/evidence/kamau_pretech');

-- Step 13: Create Attention Session Data
INSERT INTO attention_sessions (id, student_id, session_start, session_end, attention_scores, distraction_events, engagement_level, activities_performed, created_at) VALUES
('attn-session-1', 'u1-student-kamau', '2025-12-22T10:30:00Z', '2025-12-22T11:15:00Z', '[0.85, 0.88, 0.82, 0.90, 0.87]', 1, 'high', '["lesson_viewing", "quiz_completion", "note_taking"]', '2025-12-22T10:30:00Z');

-- Verification: Check data consistency
-- This ensures the foreign key relationships are valid
SELECT 
  'User Profiles Created' as check_name,
  COUNT(*) as count
FROM profiles
WHERE id IN ('u1-student-kamau', 'u2-parent-nyawira', 'u3-teacher-mwalimu')

UNION ALL

SELECT 
  'Lessons Created' as check_name,
  COUNT(*) as count
FROM lessons
WHERE created_by = 'u3-teacher-mwalimu'

UNION ALL

SELECT 
  'Quests Active' as check_name,
  COUNT(*) as count
FROM quests
WHERE is_active = true

UNION ALL

SELECT 
  'Chores Created' as check_name,
  COUNT(*) as count
FROM chores
WHERE created_by = 'u2-parent-nyawira';
