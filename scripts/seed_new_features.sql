-- Seed Curriculum
INSERT INTO public.cbc_curriculum (grade_level, subject, strand, sub_strand) VALUES
(6, 'Science', 'Living Things and Their Environment', 'Human Body Systems'),
(6, 'Science', 'Living Things and Their Environment', 'Plants'),
(6, 'Mathematics', 'Numbers', 'Fractions'),
(6, 'Mathematics', 'Measurement', 'Area and Volume');

-- Mock Chores for Kamau
INSERT INTO public.chores (parent_id, student_id, title, reward_lc, status) VALUES
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'Explain Photosynthesis to Grandma', 50, 'assigned'),
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'Water the kitchen garden', 20, 'pending_verification');

-- Mock Aggregated Focus Data for Lesson 1
INSERT INTO public.aggregated_focus_logs (lesson_id, timestamp_mark, average_score, sample_count)
SELECT 
    'cbc-lesson-1-body-systems', 
    gs, 
    80 + (RANDOM() * 20 - 10), 
    12
FROM generate_series(0, 40) gs;