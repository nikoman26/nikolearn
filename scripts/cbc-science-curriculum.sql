-- NIKOlearn CBC Grade 6 Science Curriculum
-- Human Circulatory System & Healthy Living
-- Based on official KICD/MoE lesson plans

-- Step 1: Create Grade 6 Student Profile (if not exists)
INSERT INTO profiles (id, full_name, role, avatar_url, neurodivergent_mode_enabled, school_id, grade_level, parent_phone, emergency_contact) VALUES
('cbc-grade6-student', 'Grade 6 Student', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grade6Student', false, 'demo_school', 6, '+254700000000', '+254700000001')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  grade_level = EXCLUDED.grade_level;

-- Step 2: Create CBC Grade 6 Science Lessons
INSERT INTO lessons (id, title, subject, strand, sub_strand, grade_level, duration_minutes, content_url, video_url, interactive_elements, is_published, created_by, description, learning_objectives, prerequisites) VALUES

-- Lesson 1: Introduction to Body Systems (CBC-Aligned)
(
  'cbc-lesson-1-body-systems',
  'Introduction to Body Systems',
  'Science',
  'Living Things and Their Environment',
  'Human Body Systems',
  6,
  40,
  '/content/cbc-lesson-1-body-systems.html',
  'https://cdn.nikolearn.ke/videos/cbc-body-systems.mp4',
  '{
    "vr_experience": {
      "type": "heart_journey",
      "title": "VR Heart Tour",
      "duration": "10 minutes",
      "modules": [
        {
          "name": "Heart Chambers",
          "description": "Explore right atrium, right ventricle, left atrium, left ventricle",
          "interactions": ["click_heart_parts", "blood_flow_simulation"]
        },
        {
          "name": "Blood Movement",
          "description": "Follow blood as it travels through the heart",
          "interactions": ["blood_tracking", "flow_direction"]
        }
      ]
    },
    "ar_overlay": {
      "type": "body_systems",
      "title": "AR Body Systems Display",
      "features": ["heart_location", "circulation_overlay", "organ_highlighting"]
    },
    "assessments": [
      {
        "type": "oral_questions",
        "title": "Heart Identification",
        "questions": ["Where is the heart located?", "What happens when heart stops?", "Name heart parts"]
      },
      {
        "type": "interactive_quiz",
        "title": "Body Systems Check",
        "questions": 5
      }
    ]
  }',
  true,
  'cbc-grade6-student',
  'Learn to identify major parts of the human circulatory system and understand the importance of the heart for human survival.',
  ARRAY[
    'Identify the major parts of the human circulatory system',
    'Describe the functions of the heart and blood vessels', 
    'Appreciate the importance of the circulatory system in daily life',
    'Understand why the heart is important for human survival'
  ],
  ARRAY['Basic understanding of the human body', 'Curiosity about how the body works']
),

-- Lesson 2: Blood and Blood Vessels (CBC-Aligned)
(
  'cbc-lesson-2-blood-vessels',
  'Blood and Blood Vessels',
  'Science',
  'Living Things and Their Environment', 
  'Human Body Systems',
  6,
  40,
  '/content/cbc-lesson-2-blood-vessels.html',
  'https://cdn.nikolearn.ke/videos/cbc-blood-vessels.mp4',
  '{
    "vr_experience": {
      "type": "blood_flow_simulation",
      "title": "VR Blood Flow Journey",
      "duration": "12 minutes", 
      "modules": [
        {
          "name": "Blood Vessel Types",
          "description": "Explore arteries, veins, and capillaries in 3D",
          "interactions": ["vessel_identification", "blood_flow_tracking"]
        },
        {
          "name": "Oxygen Transport",
          "description": "See how oxygenated and deoxygenated blood moves",
          "interactions": ["oxygen_tracking", "color_coding"]
        }
      ]
    },
    "ar_features": {
      "type": "pulse_detection",
      "title": "AR Pulse Measurement",
      "features": ["real_pulse_detection", "heart_rate_display", "stress_indicators"]
    },
    "interactive_elements": [
      {
        "type": "vessel_matching",
        "title": "Match Vessels to Functions",
        "description": "Drag and drop to match arteries, veins, capillaries to their functions"
      }
    ],
    "assessments": [
      {
        "type": "digital_quiz",
        "title": "Blood Vessel Knowledge Check",
        "questions": 5,
        "question_types": ["multiple_choice", "drag_drop"]
      },
      {
        "type": "oral_explanation",
        "title": "Explain Blood Flow",
        "description": "Student explains blood flow direction in their own words"
      }
    ]
  }',
  true,
  'cbc-grade6-student',
  'Understand the types of blood vessels and how blood moves around the body through arteries, veins, and capillaries.',
  ARRAY[
    'Name types of blood vessels',
    'Describe the function of each blood vessel',
    'Explain the direction of blood flow',
    'Understand how pulse relates to heart activity'
  ],
  ARRAY['Basic understanding of the heart', 'Knowledge of body circulation']
),

-- Lesson 3: Healthy Living & Lifestyle (CBC-Aligned)
(
  'cbc-lesson-3-healthy-living',
  'Healthy Living & Lifestyle',
  'Science',
  'Living Things and Their Environment',
  'Human Body Systems', 
  6,
  40,
  '/content/cbc-lesson-3-healthy-living.html',
  'https://cdn.nikolearn.ke/videos/cbc-healthy-living.mp4',
  '{
    "vr_experience": {
      "type": "health_scenarios",
      "title": "Healthy vs Unhealthy Choices VR",
      "duration": "10 minutes",
      "modules": [
        {
          "name": "Artery Health Simulation", 
          "description": "See blocked vs healthy arteries in VR",
          "interactions": ["artery_comparison", "health_impact"]
        },
        {
          "name": "Lifestyle Impact",
          "description": "Experience consequences of different lifestyle choices",
          "interactions": ["choice_consequences", "health_outcomes"]
        }
      ]
    },
    "ar_scenarios": {
      "type": "decision_trees",
      "title": "AR Health Decision Scenarios",
      "scenarios": [
        "Junk food vs balanced meal",
        "Exercise vs sedentary lifestyle", 
        "Smoking vs healthy breathing"
      ]
    },
    "family_integration": {
      "type": "health_pledge",
      "title": "Personal Health Pledge",
      "features": ["pledge_creation", "family_sharing", "progress_tracking"]
    },
    "assessments": [
      {
        "type": "scenario_responses",
        "title": "Health Choice Analysis",
        "scenarios": 3,
        "response_format": "reflection"
      },
      {
        "type": "participation_observation",
        "title": "Active Participation Check",
        "criteria": ["question_answering", "scenario_discussion"]
      }
    ]
  }',
  true,
  'cbc-grade6-student',
  'Learn to identify healthy habits for the heart and understand how daily choices affect our cardiovascular health.',
  ARRAY[
    'Identify healthy habits for the heart',
    'Explain the effects of unhealthy lifestyles', 
    'Demonstrate responsibility for personal health',
    'Make informed choices about heart health'
  ],
  ARRAY['Understanding of basic nutrition', 'Knowledge of exercise benefits']
);

-- Step 3: Create Assessments for CBC Lessons
INSERT INTO assessments (id, lesson_id, title, type, questions, total_points, time_limit_minutes, is_published, created_by) VALUES

-- Assessment for Lesson 1
(
  'cbc-assessment-1',
  'cbc-lesson-1-body-systems',
  'Circulatory System Knowledge Check',
  'quiz',
  '{
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Where is the heart located in the human body?",
        "options": ["Head", "Chest", "Abdomen", "Arms"],
        "correct_answer": "Chest",
        "points": 2,
        "learning_outcome": "Identify major parts of circulatory system"
      },
      {
        "id": "q2", 
        "type": "multiple_choice",
        "question": "What happens when the heart stops beating?",
        "options": ["Nothing", "Blood stops flowing", "We sleep", "We eat more"],
        "correct_answer": "Blood stops flowing",
        "points": 2,
        "learning_outcome": "Appreciate importance of circulatory system"
      },
      {
        "id": "q3",
        "type": "identification",
        "question": "Name the four chambers of the heart",
        "correct_answers": ["Right atrium", "Right ventricle", "Left atrium", "Left ventricle"],
        "points": 4,
        "learning_outcome": "Identify parts of the heart"
      },
      {
        "id": "q4",
        "type": "true_false",
        "question": "The heart is important for human survival",
        "correct_answer": true,
        "points": 2,
        "learning_outcome": "Appreciate heart importance"
      }
    ],
    "total_points": 10,
    "time_limit": 15,
    "assessment_type": "formative"
  }',
  10,
  15,
  true,
  'cbc-grade6-student'
),

-- Assessment for Lesson 2
(
  'cbc-assessment-2',
  'cbc-lesson-2-blood-vessels', 
  'Blood Vessels Function Check',
  'quiz',
  '{
    "questions": [
      {
        "id": "q1",
        "type": "multiple_choice",
        "question": "Which blood vessel carries blood away from the heart?",
        "options": ["Veins", "Arteries", "Capillaries", "All of the above"],
        "correct_answer": "Arteries",
        "points": 2,
        "learning_outcome": "Name types of blood vessels"
      },
      {
        "id": "q2",
        "type": "drag_drop",
        "question": "Match each blood vessel type to its function",
        "items": [
          {"type": "artery", "function": "carries blood away from heart"},
          {"type": "vein", "function": "carries blood to heart"},
          {"type": "capillary", "function": "connects arteries and veins"}
        ],
        "points": 3,
        "learning_outcome": "Describe function of each blood vessel"
      },
      {
        "id": "q3",
        "type": "multiple_choice", 
        "question": "What color is oxygenated blood in our diagrams?",
        "options": ["Blue", "Red", "Green", "Yellow"],
        "correct_answer": "Red",
        "points": 2,
        "learning_outcome": "Understand blood types"
      }
    ],
    "total_points": 7,
    "time_limit": 12,
    "assessment_type": "formative"
  }',
  7,
  12,
  true,
  'cbc-grade6-student'
),

-- Assessment for Lesson 3
(
  'cbc-assessment-3',
  'cbc-lesson-3-healthy-living',
  'Healthy Lifestyle Reflection',
  'assignment',
  '{
    "questions": [
      {
        "id": "q1",
        "type": "reflection",
        "question": "What healthy habit will you practice to keep your heart healthy?",
        "response_type": "text",
        "max_words": 100,
        "points": 3,
        "learning_outcome": "Demonstrate responsibility for personal health"
      },
      {
        "id": "q2", 
        "type": "scenario_analysis",
        "question": "A child eats junk food every day. What might happen to their heart health?",
        "response_type": "text", 
        "max_words": 80,
        "points": 3,
        "learning_outcome": "Explain effects of unhealthy lifestyle"
      },
      {
        "id": "q3",
        "type": "action_plan",
        "question": "Create a simple daily plan to keep your heart healthy",
        "response_type": "checklist",
        "points": 4,
        "learning_outcome": "Identify healthy habits for the heart"
      }
    ],
    "total_points": 10,
    "time_limit": null,
    "assessment_type": "summative"
  }',
  10,
  null,
  true,
  'cbc-grade6-student'
);

-- Step 4: Create Student Progress for Demo
INSERT INTO student_progress (student_id, lesson_id, progress_percentage, time_spent_minutes, last_accessed, completed_at, mastery_level, evidence_url) VALUES
('cbc-grade6-student', 'cbc-lesson-1-body-systems', 85, 35, '2025-12-25T10:30:00Z', '2025-12-25T11:05:00Z', 3, 'https://example.com/evidence/cbc-lesson-1'),
('cbc-grade6-student', 'cbc-lesson-2-blood-vessels', 72, 28, '2025-12-25T14:15:00Z', null, 2, null),
('cbc-grade6-student', 'cbc-lesson-3-healthy-living', 45, 18, '2025-12-25T16:20:00Z', null, 1, null);

-- Step 5: Create LearnCoin Rewards for CBC Lessons
INSERT INTO learncoin_transactions (id, student_id, amount, transaction_type, source, description, reference_id, created_at) VALUES
('cbc-txn-1', 'cbc-grade6-student', 30, 'earned', 'lesson_completion', 'Completed Introduction to Body Systems', 'cbc-lesson-1-body-systems', '2025-12-25T11:05:00Z'),
('cbc-txn-2', 'cbc-grade6-student', 25, 'earned', 'assessment_completion', 'Scored 85% on Circulatory System Quiz', 'cbc-assessment-1', '2025-12-25T11:10:00Z'),
('cbc-txn-3', 'cbc-grade6-student', 20, 'earned', 'lesson_completion', 'Completed Blood and Blood Vessels lesson', 'cbc-lesson-2-blood-vessels', '2025-12-25T14:43:00Z');

-- Step 6: Create CBC Family Mode Chores
INSERT INTO family_links (parent_id, student_id, relationship, is_primary, permissions) VALUES
('demo-parent', 'cbc-grade6-student', 'Guardian', true, '["view_progress", "create_chores", "verify_completion", "view_assessments"]')
ON CONFLICT (parent_id, student_id) DO NOTHING;

INSERT INTO chores (id, family_link_id, title, description, reward_lc, difficulty_level, estimated_duration, is_active, created_by) VALUES
('cbc-chore-1', 'demo-parent', 'Explain Heart Function to Family', 'Teach family members about how the heart pumps blood', 40, 2, 15, true, 'demo-parent'),
('cbc-chore-2', 'demo-parent', 'Heart-Healthy Meal Planning', 'Help plan a nutritious meal that supports heart health', 35, 2, 20, true, 'demo-parent'),
('cbc-chore-3', 'demo-parent', 'Pulse Rate Monitoring', 'Measure and record family members pulse rates at rest and after exercise', 30, 1, 25, true, 'demo-parent');

-- Step 7: Create CBC Quests
INSERT INTO quests (id, title, description, reward_lc, quest_type, requirements, is_active, start_date, end_date, created_by) VALUES
('cbc-quest-circulatory', 'CBC Circulatory System Master', 'Complete all 3 CBC Circulatory System lessons with 80%+ scores', 150, 'special', '{"type": "lesson_sequence", "lessons": ["cbc-lesson-1-body-systems", "cbc-lesson-2-blood-vessels", "cbc-lesson-3-healthy-living"], "min_score": 80}', true, '2025-12-25T00:00:00Z', '2025-12-31T23:59:59Z', 'cbc-grade6-student'),
('cbc-quest-family-health', 'Family Health Advocate', 'Complete 2 family health chores and share learning with family', 100, 'family', '{"type": "family_engagement", "chore_count": 2, "sharing_required": true}', true, '2025-12-25T00:00:00Z', '2025-12-31T23:59:59Z', 'cbc-grade6-student');

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
