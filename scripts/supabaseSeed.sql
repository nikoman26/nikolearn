-- NIKOlearn Database Seeding Script
-- Run this in your Supabase SQL Editor to populate the database with real educational data

-- First, let's insert profiles (students, parents, teachers)
INSERT INTO profiles (id, full_name, role, avatar_url, neurodivergent_mode_enabled, school_id, grade_level, parent_phone, emergency_contact) VALUES
-- Students
('550e8400-e29b-41d4-a716-446655440001', 'Kamau Otieno', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau', false, 'school_001', 5, '+254712345678', '+254798765432'),
('550e8400-e29b-41d4-a716-446655440002', 'Grace Wanjiru', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace', true, 'school_001', 4, '+254723456789', '+254787654321'),
('550e8400-e29b-41d4-a716-446655440003', 'David Kimani', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', false, 'school_001', 5, '+254734567890', '+254776543210'),
('550e8400-e29b-41d4-a716-446655440004', 'Sarah Nyambura', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', false, 'school_001', 4, '+254745678901', '+254765432109'),
('550e8400-e29b-41d4-a716-446655440005', 'James Muthomi', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=James', false, 'school_001', 5, '+254756789012', '+254754321098'),

-- Parents
('550e8400-e29b-41d4-a716-446655440010', 'Mary Otieno', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary', false, 'school_001', null, null, null),
('550e8400-e29b-41d4-a716-446655440011', 'John Wanjiru', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=John', false, 'school_001', null, null, null),
('550e8400-e29b-41d4-a716-446655440012', 'Peter Kimani', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter', false, 'school_001', null, null, null),

-- Teachers
('550e8400-e29b-41d4-a716-446655440020', 'Ms. Grace Nyabera', 'teacher', 'https://api.dicebear.com/7.x/avataaars/svg?seed=GraceT', false, 'school_001', null, null, null),
('550e8400-e29b-41d4-a716-446655440021', 'Mr. Samuel Ochieng', 'teacher', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel', false, 'school_001', null, null, null);

-- Insert lessons
INSERT INTO lessons (id, title, subject, strand, sub_strand, grade_level, duration_minutes, content_url, video_url, interactive_elements, is_published, created_by, description, learning_objectives, prerequisites) VALUES
('lesson_001', 'Understanding Photosynthesis', 'Science', 'Living Things', 'Plants and Animals', 5, 45, 'https://example.com/photosynthesis-content', 'https://example.com/photosynthesis-video.mp4', '{"type": "vr_lab", "content": "chloroplast_exploration"}', true, '550e8400-e29b-41d4-a716-446655440020', 'Learn how plants convert sunlight into energy through the process of photosynthesis', '["Understand the process of photosynthesis", "Identify the key components needed for photosynthesis", "Explain the importance of photosynthesis for life on Earth", "Describe the role of chloroplasts in plant cells"]', '["Basic understanding of plant parts", "Knowledge of sunlight and air"]'),
('lesson_002', 'Introduction to Fractions', 'Mathematics', 'Numbers', 'Fractions and Decimals', 4, 40, 'https://example.com/fractions-content', 'https://example.com/fractions-video.mp4', '{"type": "manipulatives", "content": "fraction_visualizer"}', true, '550e8400-e29b-41d4-a716-446655440021', 'Introduction to basic fractions using visual aids and real-world examples', '["Identify fractions as parts of a whole", "Compare and order simple fractions", "Add and subtract fractions with like denominators", "Apply fractions to real-life situations"]', '["Basic multiplication and division", "Understanding of whole numbers"]'),
('lesson_003', 'Kenyan History: Our Heritage', 'Social Studies', 'Citizenship', 'Kenyan Culture and Heritage', 5, 35, 'https://example.com/kenyan-history', 'https://example.com/kenyan-history-video.mp4', '{"type": "timeline", "content": "historical_events"}', true, '550e8400-e29b-41d4-a716-446655440020', 'Explore the rich history and cultural heritage of Kenya', '["Identify key periods in Kenyan history", "Understand the importance of cultural preservation", "Appreciate Kenya''s diversity and unity", "Connect past events to present-day Kenya"]', '["Basic understanding of time and chronology"]'),
('lesson_004', 'Reading Comprehension: African Folktales', 'English', 'Language', 'Reading and Literature', 5, 50, 'https://example.com/folktales', 'https://example.com/folktales-video.mp4', '{"type": "interactive_story", "content": "folktale_reader"}', true, '550e8400-e29b-41d4-a716-446655440021', 'Develop reading comprehension skills through engaging African folktales', '["Improve reading fluency and comprehension", "Identify story elements (characters, setting, plot)", "Understand moral lessons in folktales", "Express personal opinions about stories"]', '["Basic reading skills", "Vocabulary building exercises"]'),
('lesson_005', 'The Solar System', 'Science', 'Earth and Space', 'The Universe', 4, 40, 'https://example.com/solar-system', 'https://example.com/solar-system-video.mp4', '{"type": "3d_model", "content": "planet_explorer"}', true, '550e8400-e29b-41d4-a716-446655440020', 'Explore the planets and celestial bodies in our solar system', '["Identify the planets in our solar system", "Understand the order of planets from the sun", "Learn basic facts about each planet", "Appreciate the vastness of space"]', '["Basic counting and ordering skills"]');

-- Insert wallets for students
INSERT INTO wallets (student_id, balance, total_earned, total_spent, streak_count, last_activity) VALUES
('550e8400-e29b-41d4-a716-446655440001', 245, 380, 135, 5, '2025-12-22T11:08:00Z'),
('550e8400-e29b-41d4-a716-446655440002', 180, 290, 110, 3, '2025-12-22T16:20:00Z'),
('550e8400-e29b-41d4-a716-446655440003', 320, 450, 130, 7, '2025-12-22T10:27:00Z'),
('550e8400-e29b-41d4-a716-446655440004', 150, 220, 70, 2, '2025-12-22T14:30:00Z'),
('550e8400-e29b-41d4-a716-446655440005', 195, 285, 90, 4, '2025-12-22T12:15:00Z');

-- Insert student progress
INSERT INTO student_progress (student_id, lesson_id, progress_percentage, time_spent_minutes, last_accessed, completed_at, mastery_level, evidence_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'lesson_001', 85, 38, '2025-12-22T10:30:00Z', '2025-12-22T11:08:00Z', 3, 'https://example.com/evidence/kamau_photosynthesis'),
('550e8400-e29b-41d4-a716-446655440001', 'lesson_002', 72, 30, '2025-12-22T14:15:00Z', null, 2, null),
('550e8400-e29b-41d4-a716-446655440002', 'lesson_001', 72, 30, '2025-12-22T14:15:00Z', null, 2, null),
('550e8400-e29b-41d4-a716-446655440003', 'lesson_001', 95, 42, '2025-12-22T09:45:00Z', '2025-12-22T10:27:00Z', 4, 'https://example.com/evidence/david_photosynthesis'),
('550e8400-e29b-41d4-a716-446655440004', 'lesson_003', 88, 32, '2025-12-22T16:20:00Z', '2025-12-22T16:52:00Z', 3, 'https://example.com/evidence/sarah_history'),
('550e8400-e29b-41d4-a716-446655440005', 'lesson_005', 60, 25, '2025-12-22T12:15:00Z', null, 2, null);

-- Insert family links
INSERT INTO family_links (parent_id, student_id, relationship, is_primary, permissions) VALUES
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'Mother', true, '["view_progress", "create_chores", "verify_completion"]'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', 'Father', true, '["view_progress", "create_chores", "verify_completion"]'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440003', 'Father', true, '["view_progress", "create_chores", "verify_completion"]');

-- Insert chores
INSERT INTO chores (id, family_link_id, title, description, reward_lc, difficulty_level, estimated_duration, is_active, created_by) VALUES
('chore_001', '550e8400-e29b-41d4-a716-446655440010', 'Wash the Dishes', 'Clean all plates, cups, and utensils after dinner', 25, 1, 15, true, '550e8400-e29b-41d4-a716-446655440010'),
('chore_002', '550e8400-e29b-41d4-a716-446655440011', 'Clean My Room', 'Organize clothes, make bed, vacuum floor', 40, 2, 30, true, '550e8400-e29b-41d4-a716-446655440011'),
('chore_003', '550e8400-e29b-41d4-a716-446655440012', 'Help with Grocery Shopping', 'Accompany mom to market and help carry bags', 60, 3, 120, true, '550e8400-e29b-41d4-a716-446655440012'),
('chore_004', '550e8400-e29b-41d4-a716-446655440010', 'Feed the Pets', 'Give water and food to the dog and cats', 20, 1, 10, true, '550e8400-e29b-41d4-a716-446655440010'),
('chore_005', '550e8400-e29b-41d4-a716-446655440011', 'Take Out Trash', 'Empty all trash bins and take bags to the main bin', 30, 2, 15, true, '550e8400-e29b-41d4-a716-446655440011');

-- Insert assessments
INSERT INTO assessments (id, lesson_id, title, type, questions, total_points, time_limit_minutes, is_published, created_by) VALUES
('assessment_001', 'lesson_001', 'Photosynthesis Quiz', 'quiz', '{
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "What gas do plants release during photosynthesis?",
      "options": ["Carbon Dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
      "correct_answer": 1,
      "points": 5
    },
    {
      "id": "q2",
      "type": "multiple_choice",
      "question": "Where in the plant cell does photosynthesis occur?",
      "options": ["Nucleus", "Chloroplast", "Mitochondria", "Cell Wall"],
      "correct_answer": 1,
      "points": 5
    },
    {
      "id": "q3",
      "type": "true_false",
      "question": "Plants need sunlight to perform photosynthesis.",
      "correct_answer": true,
      "points": 3
    }
  ],
  "total_points": 13,
  "time_limit": 15
}', 13, 15, true, '550e8400-e29b-41d4-a716-446655440020'),
('assessment_002', 'lesson_002', 'Fractions Assessment', 'quiz', '{
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "What fraction of the circle is shaded? [1/2 shown]",
      "options": ["1/4", "1/2", "1/3", "3/4"],
      "correct_answer": 1,
      "points": 5
    },
    {
      "id": "q2",
      "type": "fill_blank",
      "question": "Fill in the blank: 1/4 = ____/8",
      "correct_answer": "2",
      "points": 5
    }
  ],
  "total_points": 10,
  "time_limit": 20
}', 10, 20, true, '550e8400-e29b-41d4-a716-446655440021');

-- Insert quests
INSERT INTO quests (id, title, description, reward_lc, quest_type, requirements, is_active, start_date, end_date, created_by) VALUES
('quest_001', 'Daily Learning Streak', 'Complete at least one lesson every day for a week', 100, 'daily', '{"type": "streak", "days": 7, "min_lessons_per_day": 1}', true, '2025-12-22T00:00:00Z', '2025-12-29T23:59:59Z', '550e8400-e29b-41d4-a716-446655440020'),
('quest_002', 'Science Explorer', 'Complete all 5 science lessons with 80% or higher', 150, 'special', '{"type": "subject_mastery", "subject": "Science", "min_score": 80, "lessons": ["lesson_001", "lesson_005"]}', true, '2025-12-22T00:00:00Z', '2025-12-31T23:59:59Z', '550e8400-e29b-41d4-a716-446655440020'),
('quest_003', 'Family Helper', 'Complete 3 chores this week and get them verified', 75, 'family', '{"type": "chores", "count": 3, "verified": true}', true, '2025-12-22T00:00:00Z', '2025-12-29T23:59:59Z', null);

-- Insert some completed chore records
INSERT INTO chore_completions (id, chore_id, student_id, completed_at, verified_by, verified_at, rating, feedback) VALUES
('completion_001', 'chore_001', '550e8400-e29b-41d4-a716-446655440001', '2025-12-22T18:30:00Z', '550e8400-e29b-41d4-a716-446655440010', '2025-12-22T18:45:00Z', 5, 'Excellent work! All dishes are clean and organized.'),
('completion_002', 'chore_004', '550e8400-e
