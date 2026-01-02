-- NIKOlearn MVP - Comprehensive Database Seeding Script
-- Aligned with KICD Grade 7 Rationalized Curriculum 2024/2025
-- Uses default password: "Learny26@#"

-- Step 1: Create user accounts in auth.users with profiles
-- Note: In production, these should be created through the app registration flow
-- For demo purposes, we'll insert the profile data directly

-- Insert User Profiles
INSERT INTO profiles (id, full_name, role, avatar_url, neurodivergent_mode_enabled, school_id, grade_level, parent_phone, emergency_contact) VALUES

-- Student: Kamau Maina (Grade 7, Neurodivergent-friendly)
('u1-student-kamau', 'Kamau Maina', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau', true, 'nairobi_junior_academy', 7, '+254712345678', '+254798765432'),

-- Parent: Nyawira Maina (Kamau's mother)
('u2-parent-nyawira', 'Nyawira Maina', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nyawira', false, 'nairobi_junior_academy', null, '+254712345678', '+254798765432'),

-- Teacher: Mwalimu Omari
('u3-teacher-mwalimu', 'Mwalimu Omari', 'teacher', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Omari', false, 'nairobi_junior_academy', null, null, null),

-- Additional students for class diversity
('u4-student-grace', 'Grace Wanjiku', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace', false, 'nairobi_junior_academy', 7, '+254723456789', '+254787654321'),
('u5-student-david', 'David Kimani', 'student', 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', false, 'nairobi_junior_academy', 7, '+254734567890', '+254776543210'),

-- Additional parents
('u6-parent-mary', 'Mary Wanjiku', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary', false, 'nairobi_junior_academy', null, '+254723456789', '+254787654321'),
('u7-parent-peter', 'Peter Kimani', 'parent', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter', false, 'nairobi_junior_academy', null, '+254734567890', '+254776543210');

-- Step 2: Create Wallets for Students
INSERT INTO wallets (student_id, balance, total_earned, total_spent, streak_count, last_activity) VALUES
('u1-student-kamau', 485, 720, 235, 7, '2025-12-22T11:08:00Z'),
('u4-student-grace', 320, 580, 260, 5, '2025-12-22T14:30:00Z'),
('u5-student-david', 650, 890, 240, 12, '2025-12-22T09:45:00Z');

-- Step 3: Create Family Links
INSERT INTO family_links (parent_id, student_id, relationship, is_primary, permissions) VALUES
('u2-parent-nyawira', 'u1-student-kamau', 'Mother', true, '["view_progress", "create_chores", "verify_completion", "manage_assignments"]'),
('u6-parent-mary', 'u4-student-grace', 'Mother', true, '["view_progress", "create_chores", "verify_completion"]'),
('u7-parent-peter', 'u5-student-david', 'Father', true, '["view_progress", "create_chores", "verify_completion"]');

-- Step 4: Create KICD Grade 7 Curriculum Lessons

-- INTEGRATED SCIENCE STRAND 1: Scientific Investigation
INSERT INTO lessons (id, title, subject, strand, sub_strand, grade_level, duration_minutes, content_url, video_url, interactive_elements, is_published, created_by, description, learning_objectives, prerequisites) VALUES

-- 1.1 Introduction to Integrated Science
('lesson-integrated-science-intro', 'Introduction to Integrated Science', 'Integrated Science', 'Scientific Investigation', 'Introduction to Integrated Science', 7, 45, 'https://cdn.nikolearn.ke/lessons/integrated-science-intro.html', 'https://cdn.nikolearn.ke/videos/integrated-science-intro.mp4', '{"type": "interactive_simulation", "content": "scientific_method_flowchart", "vr_modules": ["VR Lab: Scientific Method Practice"]}', true, 'u3-teacher-mwalimu', 'Learn fundamental scientific skills and their career applications in medicine, engineering, and technology', '["Apply scientific skills (observing, measuring, classifying) in real contexts", "Identify career paths that use scientific skills", "Understand the scientific method", "Practice systematic observation techniques"]', '["Basic mathematics", "Curiosity about natural phenomena"]'),

-- 1.2 Laboratory Safety
('lesson-lab-safety', 'Laboratory Safety Essentials', 'Integrated Science', 'Scientific Investigation', 'Laboratory Safety', 7, 50, 'https://cdn.nikolearn.ke/lessons/lab-safety.html', 'https://cdn.nikolearn.ke/videos/lab-safety.mp4', '{"type": "vr_simulation", "content": "hazard_identification_challenge", "vr_modules": ["VR Lab: Safety Hazards Identification", "Virtual First Aid Training"]}', true, 'u3-teacher-mwalimu', 'Master laboratory safety protocols and emergency response procedures', '["Identify common laboratory hazards (Flammable, Corrosive, Toxic, Carcinogenic, Radioactive)", "Apply first aid for burns, scalds, cuts, and chemical ingestion", "Demonstrate safe laboratory practices", "Use personal protective equipment correctly"]', '["Understanding of basic safety principles"]'),

-- INTEGRATED SCIENCE STRAND 2: Mixtures, Elements and Compounds
('lesson-mixtures-elements', 'Mixtures, Elements and Compounds', 'Integrated Science', 'Mixtures, Elements and Compounds', 'Pure and Impure Substances', 7, 55, 'https://cdn.nikolearn.ke/lessons/mixtures-elements.html', 'https://cdn.nikolearn.ke/videos/mixtures-elements.mp4', '{"type": "vr_simulation", "content": "molecular_construction_lab", "vr_modules": ["Molecular Construction Lab", "AR Chromatography Demo"]}', true, 'u3-teacher-mwalimu', 'Understand pure substances, mixtures, and separation techniques', '["Distinguish between pure and impure substances", "Determine purity through boiling and melting points", "Apply separation techniques (fractional distillation, paper chromatography, crystallization)", "Classify substances as elements, compounds, or mixtures"]', '["Basic understanding of matter", "Knowledge of states of matter"]'),

-- PRE-TECHNICAL STUDIES STRAND 1: Foundations
('lesson-pretech-foundations', 'Foundations of Pre-Technical Studies', 'Pre-Technical Studies', 'Foundations of Pre-Technical Studies', 'Introduction to Technical Skills', 7, 40, 'https://cdn.nikolearn.ke/lessons/pretech-foundations.html', 'https://cdn.nikolearn.ke/videos/pretech-foundations.mp4', '{"type": "interactive_simulation", "content": "workshop_safety_check", "vr_modules": ["3D Workshop Tour", "First Aid Simulation", "PPE Fitting Challenge"]}', true, 'u3-teacher-mwalimu', 'Introduction to technical skills, safety protocols, and materials', '["State the roles of technical studies in society", "Apply first aid procedures for workshop accidents", "Identify and use personal protective equipment", "Understand properties of metals and non-metals"]', '["Basic safety awareness", "Interest in practical skills"]'),

-- PRE-TECHNICAL STUDIES STRAND 2: Computer Science
('lesson-computer-fundamentals', 'Computer Science Fundamentals', 'Pre-Technical Studies', 'Computer Science Fundamentals', 'Computer Hardware', 7, 45, 'https://cdn.nikolearn.ke/lessons/computer-fundamentals.html', 'https://cdn.nikolearn.ke/videos/computer-fundamentals.mp4', '{"type": "interactive_simulation", "content": "pc_assembly_challenge", "vr_modules": ["3D PC Assembly Lab", "Data Representation Visualizer"]}', true, 'u3-teacher-mwalimu', 'Explore computer hardware, data representation, and digital literacy', '["Identify internal computer components (CPU, Motherboard, RAM)", "Understand external peripherals and their functions", "Explain binary representation of data", "Build a computer using drag-and-drop 3D interface"]', '["Basic mathematics", "Interest in technology"]'),

-- PRE-TECHNICAL STUDIES STRAND 3: Financial Literacy
('lesson-financial-literacy', 'Financial Literacy & Business Basics', 'Pre-Technical Studies', 'Financial Literacy & Business', 'Business and Money Management', 7, 35, 'https://cdn.nikolearn.ke/lessons/financial-literacy.html', 'https://cdn.nikolearn.ke/videos/financial-literacy.mp4', '{"type": "interactive_simulation", "content": "budgeting_tool", "vr_modules": ["Entrepreneurship Simulation", "Budget Planning VR"]}', true, 'u3-teacher-mwalimu', 'Learn money management, entrepreneurship, and economic decision-making', '["Understand basic entrepreneurship principles", "Create and manage a personal budget", "Distinguish between needs and wants", "Make informed financial decisions using LearnCoins"]', '["Basic mathematics", "Understanding of trade and exchange"]'),

-- SOCIAL STUDIES STRAND 1: Earth and Solar System
('lesson-earth-solar-system', 'The Earth and the Solar System', 'Social Studies', 'The Earth and the Solar System', 'Maps and Coordinates', 7, 50, 'https://cdn.nikolearn.ke/lessons/earth-solar-system.html', 'https://cdn.nikolearn.ke/videos/earth-solar-system.mp4', '{"type": "vr_simulation", "content": "solar_system_explorer", "vr_modules": ["VR Voyager: Mission to Mars", "3D Earth Coordinate System"]}', true, 'u3-teacher-mwalimu', 'Explore Earth''s position in space and coordinate systems', '["Use latitudes (Equator, Tropics) and longitudes to locate places", "Identify the Sun, eight planets, and the Moon", "Navigate through space using VR technology", "Understand scale and distance in space"]', '["Basic geography", "Understanding of directions"]'),

-- SOCIAL STUDIES STRAND 2: History and Citizenship
('lesson-kenyan-citizenship', 'Kenyan History and Citizenship', 'Social Studies', 'History and Citizenship', 'National Identity', 7, 45, 'https://cdn.nikolearn.ke/lessons/kenyan-citizenship.html', 'https://cdn.nikolearn.ke/videos/kenyan-citizenship.mp4', '{"type": "interactive_simulation", "content": "national_symbols_quiz", "vr_modules": ["Virtual Kenya Heritage Tour", "Constitution Explorer"]}', true, 'u3-teacher-mwalimu', 'Understand Kenyan national identity and civic responsibilities', '["Identify Kenyan national symbols (National Anthem, Flag, Coat of Arms)", "Understand basic human rights of a child", "Appreciate the Constitution of Kenya", "Develop civic pride and responsibility"]', '["Basic knowledge of Kenya", "Understanding of community"]'),

-- AGRICULTURE AND NUTRITION STRAND 1: Conservation
('lesson-resource-conservation', 'Conservation of Resources', 'Agriculture and Nutrition', 'Conservation of Resources', 'Soil and Water Conservation', 7, 40, 'https://cdn.nikolearn.ke/lessons/resource-conservation.html', 'https://cdn.nikolearn.ke/videos/resource-conservation.mp4', '{"type": "ar_simulation", "content": "garden_builder_game", "vr_modules": ["Garden Builder AR", "Water Conservation Simulator"]}', true, 'u3-teacher-mwalimu', 'Learn environmental conservation and sustainable practices', '["Control soil pollution through safe disposal methods", "Practice organic farming techniques", "Construct water retention systems", "Apply mulching for water conservation"]', '["Basic understanding of environment", "Interest in gardening"]'),

-- AGRICULTURE AND NUTRITION STRAND 2: Food and Nutrition
('lesson-food-nutrition', 'Food Production & Nutrition', 'Agriculture and Nutrition', 'Food Production & Nutrition', 'Nutrients in Food', 7, 45, 'https://cdn.nikolearn.ke/lessons/food-nutrition.html', 'https://cdn.nikolearn.ke/videos/food-nutrition.mp4', '{"type": "ar_simulation", "content": "meal_analyzer", "vr_modules": ["AR Meal Analysis", "Virtual Kitchen Lab"]}', true, 'u3-teacher-mwalimu', 'Understand nutrients, food sources, and healthy eating', '["Identify sources of Carbohydrates, Proteins, Vitamins, and Minerals", "Plan nutritious meals using local foods", "Understand crop management basics", "Practice food safety principles"]', '["Basic knowledge of food groups", "Interest in cooking"]'),

-- CREATIVE ARTS AND SPORTS STRAND 1: Foundations
('lesson-arts-sports-foundations', 'Foundations of Arts and Sports', 'Creative Arts and Sports', 'Foundations of Arts and Sports', 'Components of Fitness', 7, 35, 'https://cdn.nikolearn.ke/lessons/arts-sports-foundations.html', 'https://cdn.nikolearn.ke/videos/arts-sports-foundations.mp4', '{"type": "interactive_simulation", "content": "rhythm_trainer", "vr_modules": ["VR Fitness Challenge", "AI Rhythm Trainer"]}', true, 'u3-teacher-mwalimu', 'Explore fitness components, music elements, and artistic expression', '["Understand flexibility, strength, and endurance components", "Learn rhythm elements (semiquavers, quavers), pitch, and melody", "Practice basic athletic movements", "Appreciate cultural arts and performance"]', '["Basic physical coordination", "Interest in music and arts"]');

-- Step 5: Create Assessments aligned with lessons

-- Laboratory Safety Quiz
INSERT INTO assessments (id, lesson_id, title, type, questions, total_points, time_limit_minutes, is_published, created_by) VALUES
('assessment-lab-safety', 'lesson-lab-safety', 'Laboratory Safety Mastery Assessment', 'quiz', '{
  "questions": [
    {
      "id": "q1",
      "type": "multiple_choice",
      "question": "Which piece of laboratory apparatus is used to measure a fixed volume of liquid accurately?",
      "options": ["Beaker", "Pipette", "Conical Flask", "Test tube"],
      "correct_answer": "Pipette",
      "points": 5,
      "explanation": "A pipette is designed to deliver an exact, predetermined volume of liquid."
    },
    {
      "id": "q2",
      "type": "true_false",
      "question": "You should always smell chemicals directly to identify them.",
      "correct_answer": false,
      "points": 3,
      "explanation": "Never smell chemicals directly. Wave your hand over the opening to detect odors safely."
    },
    {
      "id": "q3",
      "type": "multiple_choice",
      "question": "What should you do first if someone gets a chemical burn?",
      "options": ["Apply ointment immediately", "Rinse with water for 15-20 minutes", "Cover with bandage", "Give them water to drink"],
      "correct_answer": "Rinse with water for 15-20 minutes",
      "points": 7,
      "explanation": "Immediate and prolonged rinsing with water is crucial for chemical burns."
    },
    {
      "id": "q4",
      "type": "drag_drop",
      "question": "Match the hazard symbols with their meanings:",
      "pairs": [
        {"hazard": "🔥", "meaning": "Flammable"},
        {"hazard": "☠️", "meaning": "Toxic"},
        {"hazard": "☢️", "meaning": "Radioactive"},
        {"hazard": "⚗️", "meaning": "Corrosive"}
      ],
      "points": 10
    }
  ],
  "total_points": 25,
  "time_limit": 20
}', 25, 20, true, 'u3-teacher-mwalimu'),

-- Computer Fundamentals Assessment
('assessment-computer-fundamentals', 'lesson-computer-fundamentals', 'Computer Hardware Knowledge Check', 'quiz', '{
  "questions": [
    {
      "id": "q1",
      "type": "interactive_build",
      "question": "Build a computer by dragging components to their correct locations:",
      "components": ["CPU", "Motherboard", "RAM", "Power Supply", "Hard Drive"],
      "drop_zones": ["Processor Socket", "Main Circuit Board", "Memory Slots", "Power Connection", "Storage Bay"],
      "points": 15
    },
    {
      "id": "q2",
      "type": "binary_converter",
      "question": "Convert decimal number 25 to binary:",
      "correct_answer": "11001",
      "points": 5,
      "hints": ["Remember to divide by
