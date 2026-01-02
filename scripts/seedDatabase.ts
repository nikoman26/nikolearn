import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = 'https://ntbdgaqpecsynmhmtobb.supabase.co';
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY_HERE'; // Replace with your actual service role key

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

interface SeedData {
  profiles: Database['public']['Tables']['profiles']['Insert'][];
  lessons: Database['public']['Tables']['lessons']['Insert'][];
  assessments: Database['public']['Tables']['assessments']['Insert'][];
  studentProgress: Database['public']['Tables']['student_progress']['Insert'][];
  wallets: Database['public']['Tables']['wallets']['Insert'][];
  familyLinks: Database['public']['Tables']['family_links']['Insert'][];
  chores: Database['public']['Tables']['chores']['Insert'][];
  quests: Database['public']['Tables']['quests']['Insert'][];
}

const seedData: SeedData = {
  profiles: [
    // Students
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      full_name: 'Kamau Otieno',
      role: 'student',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001',
      grade_level: 5,
      parent_phone: '+254712345678',
      emergency_contact: '+254798765432'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      full_name: 'Grace Wanjiru',
      role: 'student',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
      neurodivergent_mode_enabled: true,
      school_id: 'school_001',
      grade_level: 4,
      parent_phone: '+254723456789',
      emergency_contact: '+254787654321'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      full_name: 'David Kimani',
      role: 'student',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001',
      grade_level: 5,
      parent_phone: '+254734567890',
      emergency_contact: '+254776543210'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      full_name: 'Sarah Nyambura',
      role: 'student',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001',
      grade_level: 4,
      parent_phone: '+254745678901',
      emergency_contact: '+254765432109'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      full_name: 'James Muthomi',
      role: 'student',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001',
      grade_level: 5,
      parent_phone: '+254756789012',
      emergency_contact: '+254754321098'
    },

    // Parents
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      full_name: 'Mary Otieno',
      role: 'parent',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      full_name: 'John Wanjiru',
      role: 'parent',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440012',
      full_name: 'Peter Kimani',
      role: 'parent',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Peter',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    },

    // Teachers
    {
      id: '550e8400-e29b-41d4-a716-446655440020',
      full_name: 'Ms. Grace Nyabera',
      role: 'teacher',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GraceT',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440021',
      full_name: 'Mr. Samuel Ochieng',
      role: 'teacher',
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    }
  ],

  lessons: [
    {
      id: 'lesson_001',
      title: 'Understanding Photosynthesis',
      subject: 'Science',
      strand: 'Living Things',
      sub_strand: 'Plants and Animals',
      grade_level: 5,
      duration_minutes: 45,
      content_url: 'https://example.com/photosynthesis-content',
      video_url: 'https://example.com/photosynthesis-video.mp4',
      interactive_elements: {
        type: 'vr_lab',
        content: 'chloroplast_exploration'
      },
      is_published: true,
      created_by: '550e8400-e29b-41d4-a716-446655440020',
      description: 'Learn how plants convert sunlight into energy through the process of photosynthesis',
      learning_objectives: [
        'Understand the process of photosynthesis',
        'Identify the key components needed for photosynthesis',
        'Explain the importance of photosynthesis for life on Earth',
        'Describe the role of chloroplasts in plant cells'
      ],
      prerequisites: ['Basic understanding of plant parts', 'Knowledge of sunlight and air']
    },
    {
      id: 'lesson_002',
      title: 'Introduction to Fractions',
      subject: 'Mathematics',
      strand: 'Numbers',
      sub_strand: 'Fractions and Decimals',
      grade_level: 4,
      duration_minutes: 40,
      content_url: 'https://example.com/fractions-content',
      video_url: 'https://example.com/fractions-video.mp4',
      interactive_elements: {
        type: 'manipulatives',
        content: 'fraction_visualizer'
      },
      is_published: true,
      created_by: '550e8400-e29b-41d4-a716-446655440021',
      description: 'Introduction to basic fractions using visual aids and real-world examples',
      learning_objectives: [
        'Identify fractions as parts of a whole',
        'Compare and order simple fractions',
        'Add and subtract fractions with like denominators',
        'Apply fractions to real-life situations'
      ],
      prerequisites: ['Basic multiplication and division', 'Understanding of whole numbers']
    },
    {
      id: 'lesson_003',
      title: 'Kenyan History: Our Heritage',
      subject: 'Social Studies',
      strand: 'Citizenship',
      sub_strand: 'Kenyan Culture and Heritage',
      grade_level: 5,
      duration_minutes: 35,
      content_url: 'https://example.com/kenyan-history',
      video_url: 'https://example.com/kenyan-history-video.mp4',
      interactive_elements: {
        type: 'timeline',
        content: 'historical_events'
      },
      is_published: true,
      created_by: '550e8400-e29b-41d4-a716-446655440020',
      description: 'Explore the rich history and cultural heritage of Kenya',
      learning_objectives: [
        'Identify key periods in Kenyan history',
        'Understand the importance of cultural preservation',
        'Appreciate Kenya\'s diversity and unity',
        'Connect past events to present-day Kenya'
      ],
      prerequisites: ['Basic understanding of time and chronology']
    },
    {
      id: 'lesson_004',
      title: 'Reading Comprehension: African Folktales',
      subject: 'English',
      strand: 'Language',
      sub_strand: 'Reading and Literature',
      grade_level: 5,
      duration_minutes: 50,
      content_url: 'https://example.com/folktales',
      video_url: 'https://example.com/folktales-video.mp4',
      interactive_elements: {
        type: 'interactive_story',
        content: 'folktale_reader'
      },
      is_published: true,
      created_by: '550e8400-e29b-41d4-a716-446655440021',
      description: 'Develop reading comprehension skills through engaging African folktales',
      learning_objectives: [
        'Improve reading fluency and comprehension',
        'Identify story elements (characters, setting, plot)',
        'Understand moral lessons in folktales',
        'Express personal opinions about stories'
      ],
      prerequisites: ['Basic reading skills', 'Vocabulary building exercises']
    },
    {
      id: 'lesson_005',
      title: 'The Solar System',
      subject: 'Science',
      strand: 'Earth and Space',
      sub_strand: 'The Universe',
      grade_level: 4,
      duration_minutes: 40,
      content_url: 'https://example.com/solar-system',
      video_url: 'https://example.com/solar-system-video.mp4',
      interactive_elements: {
        type: '3d_model',
        content: 'planet_explorer'
      },
      is_published: true,
      created_by: '550e8400-e29b-41d4-a716-446655440020',
      description: 'Explore the planets and celestial bodies in our solar system',
      learning_objectives: [
        'Identify the planets in our solar system',
        'Understand the order of planets from the sun',
        'Learn basic facts about each planet',
        'Appreciate the vastness of space'
      ],
      prerequisites: ['Basic counting and ordering skills']
    }
  ],

  assessments: [
    {
      id: 'assessment_001',
      lesson_id: 'lesson_001',
      title: 'Photosynthesis Quiz',
      type: 'quiz',
      questions: {
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'What gas do plants release during photosynthesis?',
            options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
            correct_answer: 1,
            points: 5
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'Where in the plant cell does photosynthesis occur?',
            options: ['Nucleus', 'Chloroplast', 'Mitochondria', 'Cell Wall'],
            correct_answer: 1,
            points: 5
          },
          {
            id: 'q3',
            type: 'true_false',
            question: 'Plants need sunlight to perform photosynthesis.',
            correct_answer: true,
            points: 3
          }
        ],
        total_points: 13,
        time_limit: 15
      },
      total_points: 13,
      time_limit_minutes: 15,
      is_published: true,
      created_by: '550e8400-e29b-41d4-a716-446655440020'
    },
    {
      id: 'assessment_002',
      lesson_id: 'lesson_002',
      title: 'Fractions Assessment',
      type: 'quiz',
      questions: {
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'What fraction of the circle is shaded? [1/2 shown]',
            options: ['1/4', '1/2', '1/3', '3/4'],
            correct_answer: 1,
            points: 5
          },
          {
            id: 'q2',
            type: 'fill_blank',
            question: 'Fill in the blank: 1/4 = ____/8',
            correct_answer: '2',
            points: 5
          }
        ],
        total_points: 10,
        time_limit: 20
      },
      total_points: 10,
      time_limit_minutes: 20,
      is_published: true,
      created_by: '550e8400-e29b-41d4-a716-446655440021'
    }
  ],

  studentProgress: [
    {
      student_id: '550e8400-e29b-41d4-a716-446655440001',
      lesson_id: 'lesson_001',
      progress_percentage: 85,
      time_spent_minutes: 38,
      last_accessed: '2025-12-22T10:30:00Z',
      completed_at: '2025-12-22T11:08:00Z',
      mastery_level: 3,
      evidence_url: 'https://example.com/evidence/kamau_photosynthesis'
    },
    {
      student_id: '550e8400-e29b-41d4-a716-446655440001',
      lesson_id: 'lesson_002',
      progress_percentage: 72,
      time_spent_minutes: 30,
      last_accessed: '2025-12-22T14:15:00Z',
      completed_at: null,
      mastery_level: 2,
      evidence_url: null
    },
    {
      student_id: '550e8400-e29b-41d4-a716-446655440003',
      lesson_id: 'lesson_001',
      progress_percentage: 95,
      time_spent_minutes: 42,
      last_accessed: '2025-12-22T09:45:00Z',
      completed_at: '2025-12-22T10:27:00Z',
      mastery_level: 4,
      evidence_url: 'https://example.com/evidence/david_photosynthesis'
    }
  ],

  wallets: [
    {
      student_id: '550e8400-e29b-41d4-a716-446655440001',
      balance: 245,
      total_earned: 380,
      total_spent: 135,
      streak_count: 5,
      last_activity: '2025-12-22T11:08:00Z'
    },
    {
      student_id: '550e8400-e29b-41d4-a716-446655440002',
      balance: 180,
      total_earned: 290,
      total_spent: 110,
      streak_count: 3,
      last_activity: '2025-12-22T16:20:00Z'
    },
    {
      student_id: '550e8400-e29b-41d4-a716-446655440003',
      balance: 320,
      total_earned: 450,
      total_spent: 130,
      streak_count: 7,
      last_activity: '2025-12-22T10:27:00Z'
    }
  ],

  familyLinks: [
    {
      parent_id: '550e8400-e29b-41d4-a716-446655440010',
      student_id: '550e8400-e29b-41d4-a716-446655440001',
      relationship: 'Mother',
      is_primary: true,
      permissions: ['view_progress', 'create_chores', 'verify_completion']
    },
    {
      parent_id: '550e8400-e29b-41d4-a716-446655440011',
      student_id: '550e8400-e29b-41d4-a716-446655440002',
      relationship: 'Father',
      is_primary: true,
      permissions: ['view_progress', 'create_chores', 'verify_completion']
    },
    {
      parent_id: '550e8400-e29b-41d4-a716-446655440012',
      student_id: '550e8400-e29b-41d4-a716-446655440003',
      relationship: 'Father',
      is_primary: true,
      permissions: ['view_progress', 'create_chores', 'verify_completion']
    }
  ],

  chores: [
    {
      id: 'chore_001',
      family_link_id: '550e8400-e29b-41d4-a716-446655440010_550e8400-e29b-41d4-a716-446655440001',
      title: 'Wash the Dishes',
      description: 'Clean all plates, cups, and utensils after dinner',
      reward_lc: 25,
      difficulty_level: 1,
      estimated_duration: 15,
      is_active: true,
      created_by: '550e8400-e29b-41d4-a716-446655440010'
    },
    {
      id: 'chore_002',
      family_link_id: '550e8400-e29b-41d4-a716-446655440010_550e8400-e29b-41d4-a
