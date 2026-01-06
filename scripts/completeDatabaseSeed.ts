import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = 'https://ntbdgaqpecsynmhmtobb.supabase.co';
const supabaseServiceKey = 'YOUR_SERVICE_ROLE_KEY_HERE'; // Replace with your actual service role key

const supabase = createClient<Database>(supabaseUrl, supabaseServiceKey);

interface SeedResult {
  success: boolean;
  message: string;
  data?: any;
  error?: any;
}

const seedData = {
  // Users/Profiles
  profiles: [
    // Students
    {
      id: '550e8400-e29b-41d4-a716-446655440001',
      full_name: 'Kamau Otieno',
      role: 'student' as const,
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
      role: 'student' as const,
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
      role: 'student' as const,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001',
      grade_level: 5,
      parent_phone: '+254734567890',
      emergency_contact: '+254776543210'
    },

    // Parents
    {
      id: '550e8400-e29b-41d4-a716-446655440010',
      full_name: 'Mary Otieno',
      role: 'parent' as const,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mary',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440011',
      full_name: 'John Wanjiru',
      role: 'parent' as const,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    },

    // Teachers
    {
      id: '550e8400-e29b-41d4-a716-446655440020',
      full_name: 'Ms. Grace Nyabera',
      role: 'teacher' as const,
      avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GraceT',
      neurodivergent_mode_enabled: false,
      school_id: 'school_001'
    }
  ],

  // Lessons
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
      created_by: '550e8400-e29b-41d4-a716-446655440020',
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
    }
  ],

  // Student Progress
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
      student_id: '550e8400-e29b-41d4-a716-446655440002',
      lesson_id: 'lesson_001',
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

  // Wallets
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

  // Family Links
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
    }
  ],

  // Chores
  chores: [
    {
      id: 'chore_001',
      family_link_id: '550e8400-e29b-41d4-a716-446655440010',
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
      family_link_id: '550e8400-e29b-41d4-a716-446655440011',
      title: 'Clean My Room',
      description: 'Organize clothes, make bed, vacuum floor',
      reward_lc: 40,
      difficulty_level: 2,
      estimated_duration: 30,
      is_active: true,
      created_by: '550e8400-e29b-41d4-a716-446655440011'
    }
  ]
};

async function seedDatabase(): Promise<SeedResult[]> {
  const results: SeedResult[] = [];

  try {
    // Seed profiles
    console.log('Seeding profiles...');
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .insert(seedData.profiles)
      .select();

    if (profileError) {
      results.push({
        success: false,
        message: 'Failed to seed profiles',
        error: profileError
      });
    } else {
      results.push({
        success: true,
        message: 'Successfully seeded profiles',
        data: profileData
      });
    }

    // Seed lessons
    console.log('Seeding lessons...');
    const { data: lessonData, error: lessonError } = await supabase
      .from('lessons')
      .insert(seedData.lessons)
      .select();

    if (lessonError) {
      results.push({
        success: false,
        message: 'Failed to seed lessons',
        error: lessonError
      });
    } else {
      results.push({
        success: true,
        message: 'Successfully seeded lessons',
        data: lessonData
      });
    }

    // Seed wallets
    console.log('Seeding wallets...');
    const { data: walletData, error: walletError } = await supabase
      .from('wallets')
      .insert(seedData.wallets)
      .select();

    if (walletError) {
      results.push({
        success: false,
        message: 'Failed to seed wallets',
        error: walletError
      });
    } else {
      results.push({
        success: true,
        message: 'Successfully seeded wallets',
        data: walletData
      });
    }

    // Seed student progress
    console.log('Seeding student progress...');
    const { data: progressData, error: progressError } = await supabase
      .from('student_progress')
      .insert(seedData.studentProgress)
      .select();

    if (progressError) {
      results.push({
        success: false,
        message: 'Failed to seed student progress',
        error: progressError
      });
    } else {
      results.push({
        success: true,
        message: 'Successfully seeded student progress',
        data: progressData
      });
    }

    // Seed family links
    console.log('Seeding family links...');
    const { data: familyData, error: familyError } = await supabase
      .from('family_links')
      .insert(seedData.familyLinks)
      .select();

    if (familyError) {
      results.push({
        success: false,
        message: 'Failed to seed family links',
        error: familyError
      });
    } else {
      results.push({
        success: true,
        message: 'Successfully seeded family links',
        data: familyData
      });
    }

    // Seed chores
    console.log('Seeding chores...');
    const { data: choreData, error: choreError } = await supabase
      .from('chores')
      .insert(seedData.chores)
      .select();

    if (choreError) {
      results.push({
        success: false,
        message: 'Failed to seed chores',
        error: choreError
      });
    } else {
      results.push({
        success: true,
        message: 'Successfully seeded chores',
        data: choreData
      });
    }

  } catch (error) {
    results.push({
      success: false,
      message: 'Unexpected error during seeding',
      error
    });
  }

  return results;
}

// Export for use in other files
export { seedDatabase, seedData };

// If running directly
if (require.main === module) {
  seedDatabase()
    .then((results) => {
      console.log('\n=== Database Seeding Results ===');
      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.message}: ${result.success ? 'SUCCESS' : 'FAILED'}`);
        if (!result.success) {
          console.log('Error:', result.error);
        }
      });
      
      const successCount = results.filter(r => r.success).length;
      const totalCount = results.length;
      console.log(`\nOverall: ${successCount}/${totalCount} operations successful`);
      
      process.exit(successCount === totalCount ? 0 : 1);
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
