-- CBC Science Curriculum - Remaining Steps (8-10)
-- Continue from Step 8: Create CBC Badge Achievements

-- Step 8: Create CBC Badge Achievements (COMPLETED)
INSERT INTO badges (id, title, description, icon_url, criteria, reward_lc, is_active, created_by) VALUES
('cbc-badge-heart-expert', 'Heart Expert', 'Master the human circulatory system through VR exploration', 'https://cdn.nikolearn.ke/badges/heart-expert.svg', '{"type": "lesson_completion", "lessons": ["cbc-lesson-1-body-systems", "cbc-lesson-2-blood-vessels"], "min_score": 80}', 25, true, 'cbc-grade6-student'),
('cbc-badge-healthy-lifestyle', 'Healthy Lifestyle Champion', 'Complete healthy living assessment with reflection', 'https://cdn.nikolearn.ke/badges/healthy-lifestyle.svg', '{"type": "lesson_completion", "lessons": ["cbc-lesson-3-healthy-living"], "min_score": 75}', 30, true, 'cbc-grade6-student'),
('cbc-badge-family-health-advocate', 'Family Health Advocate', 'Complete family health engagement activities', 'https://cdn.nikolearn.ke/badges/family-health.svg', '{"type": "family_chores", "chore_count": 2}', 20, true, 'cbc-grade6-student');

-- Step 9: Complete CBC Student Quest Progress
INSERT INTO quest_progress (id, student_id, quest_id, progress_percentage, started_at, completed_at, is_completed) VALUES
('cbc-quest-progress-1', 'cbc-grade6-student', 'cbc-quest-circulatory', 66, '2025-12-25T10:30:00Z', null, false),
('cbc-quest-progress-2', 'cbc-grade6-student', 'cbc-quest-family-health', 33, '2025-12-25T16:20:00Z', null, false);

-- Step 10: Create CBC Badge Earned Records
INSERT INTO badge_earned (id, student_id, badge_id, earned_at, evidence_url) VALUES
('cbc-badge-earned-1', 'cbc-grade6-student', 'cbc-badge-heart-expert', '2025-12-25T11:05:00Z', 'https://example.com/evidence/heart-expert'),
('cbc-badge-earned-2', 'cbc-grade6-student', 'cbc-badge-healthy-lifestyle', '2025-12-25T16:45:00Z', 'https://example.com/evidence/healthy-lifestyle');

-- Step 11: Create CBC Lesson Dependencies
INSERT INTO lesson_dependencies (id, lesson_id, prerequisite_lesson_id, dependency_type, is_required) VALUES
('cbc-dep-1', 'cbc-lesson-2-blood-vessels', 'cbc-lesson-1-body-systems', 'prerequisite', true),
('cbc-dep-2', 'cbc-lesson-3-healthy-living', 'cbc-lesson-2-blood-vessels', 'prerequisite', true);

-- Step 12: Create CBC Teacher Resources
INSERT INTO teacher_resources (id, lesson_id, title, resource_type, content_url, description, is_published) VALUES
('cbc-teacher-resource-1', 'cbc-lesson-1-body-systems', 'Heart Anatomy Poster', 'visual_aid', 'https://cdn.nikolearn.ke/resources/heart-anatomy-poster.pdf', 'Visual reference for heart chamber identification', true),
('cbc-teacher-resource-2', 'cbc-lesson-2-blood-vessels', 'Blood Vessel Models Guide', 'physical_resource', 'https://cdn.nikolearn.ke/resources/blood-vessel-models.pdf', 'Instructions for using 3D blood vessel models', true),
('cbc-teacher-resource-3', 'cbc-lesson-3-healthy-living', 'Healthy Living Assessment Rubric', 'assessment_tool', 'https://cdn.nikolearn.ke/resources/healthy-living-rubric.pdf', 'Rubric for evaluating student reflections on healthy lifestyle choices', true);

-- Step 13: Create CBC Learning Analytics Events
INSERT INTO learning_analytics (id, student_id, lesson_id, event_type, event_data, timestamp, duration_seconds) VALUES
('cbc-analytics-1', 'cbc-grade6-student', 'cbc-lesson-1-body-systems', 'vr_experience_started', '{"module": "heart_chambers", "interaction_type": "click"}', '2025-12-25T10:35:00Z', 0),
('cbc-analytics-2', 'cbc-grade6-student', 'cbc-lesson-1-body-systems', 'vr_experience_completed', '{"module": "heart_chambers", "score": 85}', '2025-12-25T10:45:00Z', 600),
('cbc-analytics-3', 'cbc-grade6-student', 'cbc-lesson-1-body-systems', 'assessment_completed', '{"assessment_id": "cbc-assessment-1", "score": 8, "time_taken": 12}', '2025-12-25T11:00:00Z', 1800),
('cbc-analytics-4', 'cbc-grade6-student', 'cbc-lesson-2-blood-vessels', 'vr_experience_started', '{"module": "blood_vessel_types", "interaction_type": "exploration"}', '2025-12-25T14:20:00Z', 0),
('cbc-analytics-5', 'cbc-grade6-student', 'cbc-lesson-2-blood-vessels', 'interactive_element_completed', '{"element": "vessel_matching", "attempts": 2, "success": true}', '2025-12-25T14:35:00Z', 900);

-- Step 14: Create CBC Accessibility Accommodations
INSERT INTO accessibility_accommodations (id, student_id, lesson_id, accommodation_type, description, is_enabled) VALUES
('cbc-acc-1', 'cbc-grade6-student', 'cbc-lesson-1-body-systems', 'reduced_stimuli', 'Disable flashing animations in VR experience', false),
('cbc-acc-2', 'cbc-grade6-student', 'cbc-lesson-2-blood-vessels', 'extended_time', 'Allow additional time for assessment completion', false),
('cbc-acc-3', 'cbc-grade6-student', 'cbc-lesson-3-healthy-living', 'voice_responses', 'Enable voice input for reflection questions', false);

-- Step 15: Create CBC Parent Communication Logs
INSERT INTO parent_communications (id, parent_id, student_id, communication_type, subject, message, timestamp, is_read) VALUES
('cbc-parent-com-1', 'demo-parent', 'cbc-grade6-student', 'progress_update', 'CBC Lesson Progress Update', 'Your child has completed Introduction to Body Systems with 85% mastery. Next: Blood and Blood Vessels.', '2025-12-25T11:10:00Z', true),
('cbc-parent-com-2', 'demo-parent', 'cbc-grade6-student', 'achievement', 'New Badge Earned!', 'Congratulations! Your child earned the "Heart Expert" badge for mastering circulatory system concepts.', '2025-12-25T11:15:00Z', false);

-- Step 16: Create CBC Curriculum Alignment Records
INSERT INTO curriculum_alignment (id, lesson_id, standard_code, standard_description, learning_outcome_mapping, assessment_criteria) VALUES
('cbc-align-1', 'cbc-lesson-1-body-systems', 'S.6.LSE.1.1', 'Identify major parts of the human body systems', '["Identify major parts of human circulatory system", "Understand importance of circulatory system"]', 'Student can name and locate heart chambers correctly'),
('cbc-align-2', 'cbc-lesson-2-blood-vessels', 'S.6.LSE.1.2', 'Describe functions of body system components', '["Name types of blood vessels", "Describe function of each blood vessel", "Explain blood flow direction"]', 'Student can match vessel types to functions with 80% accuracy'),
('cbc-align-3', 'cbc-lesson-3-healthy-living', 'S.6.LSE.1.3', 'Relate body systems to health practices', '["Identify healthy habits for the heart", "Explain effects of unhealthy lifestyles", "Demonstrate personal health responsibility"]', 'Student can create and commit to a personal health plan');

-- Step 17: Create CBC VR/AR Session Logs
INSERT INTO vr_ar_sessions (id, student_id, lesson_id, session_type, module_name, start_time, end_time, interaction_count, completion_score) VALUES
('cbc-vr-session-1', 'cbc-grade6-student', 'cbc-lesson-1-body-systems', 'vr', 'heart_chambers', '2025-12-25T10:35:00Z', '2025-12-25T10:45:00Z', 12, 85),
('cbc-vr-session-2', 'cbc-grade6-student', 'cbc-lesson-2-blood-vessels', 'vr', 'blood_vessel_types', '2025-12-25T14:20:00Z', '2025-12-25T14:32:00Z', 8, 75),
('cbc-ar-session-1', 'cbc-grade6-student', 'cbc-lesson-1-body-systems', 'ar', 'body_systems_overlay', '2025-12-25T10:32:00Z', '2025-12-25T10:35:00Z', 5, 90);

-- Step 18: Create CBC Learning Pathways
INSERT INTO learning_pathways (id, student_id, pathway_name, current_lesson, completed_lessons, pathway_progress, recommended_next) VALUES
('cbc-pathway-1', 'cbc-grade6-student', 'CBC Circulatory System Mastery', 'cbc-lesson-3-healthy-living', '["cbc-lesson-1-body-systems", "cbc-lesson-2-blood-vessels"]', 66, 'cbc-lesson-3-healthy-living');

-- Step 19: Create CBC Competency Progress Tracking
INSERT INTO competency_progress (id, student_id, competency_area, skill_level, evidence_url, assessed_by, assessment_date) VALUES
('cbc-comp-1', 'cbc-grade6-student', 'Critical Thinking', 3, 'https://example.com/evidence/critical-thinking-cbc', 'cbc-grade6-student', '2025-12-25T11:05:00Z'),
('cbc-comp-2', 'cbc-grade6-student', 'Communication', 2, 'https://example.com/evidence/communication-cbc', 'cbc-grade6-student', '2025-12-25T14:43:00Z'),
('cbc-comp-3', 'cbc-grade6-student', 'Digital Literacy', 3, 'https://example.com/evidence/digital-literacy-cbc', 'cbc-grade6-student', '2025-12-25T14:43:00Z');

-- Step 20: Final CBC Curriculum Setup Summary
-- Insert summary record
INSERT INTO curriculum_setup_logs (id, setup_type, lessons_created, assessments_created, quests_created, badges_created, setup_status, completion_date) VALUES
('cbc-setup-summary', 'CBC Grade 6 Science Curriculum', 3, 3, 2, 3, 'completed', '2025-12-25T17:00:00Z');

-- CBC Curriculum Setup Complete
-- Total: 3 lessons, 3 assessments, 3 quests, 3 badges, plus comprehensive supporting data
-- Ready for dashboard integration and student access

-- Additional Notes:
-- - All timestamps use UTC format for consistency
-- - Demo data shows realistic progress scenarios
-- - Badge criteria aligned with lesson completion and performance
-- - Family integration through chores and communication logs
-- - VR/AR session tracking for analytics and improvement
-- - Accessibility accommodations framework in place
-- - CBC curriculum alignment documented for compliance
-- - Teacher resources prepared for classroom implementation
