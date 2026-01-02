import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

// Initialize Supabase Admin Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; 

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Error: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const demoUsers = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'kamau@nikolearn.ke',
    password: 'Learny26@#',
    full_name: 'Kamau Maina',
    role: 'student'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'nyawira@parent.ke',
    password: 'Learny26@#',
    full_name: 'Nyawira Maina',
    role: 'parent'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    email: 'omari@school.ke',
    password: 'Learny26@#',
    full_name: 'Mwalimu Omari',
    role: 'teacher'
  }
];

async function createDemoUsers() {
  console.log('🚀 Starting NIKOlearn Auth Seeding...');

  for (const user of demoUsers) {
    console.log(`Processing: ${user.email}...`);

    // 1. Create User in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      id: user.id, // Setting ID manually to match SQL seeder
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { 
        full_name: user.full_name, 
        role: user.role 
      }
    });

    if (authError) {
      if (authError.message.includes('already exists')) {
        console.log(`ℹ️  User ${user.email} already exists in Auth. Skipping...`);
      } else {
        console.error(`❌ Auth Error (${user.email}):`, authError.message);
        continue;
      }
    } else {
      console.log(`✅ Auth created: ${user.email}`);
    }

    // 2. Ensure Profile exists in the public.profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        full_name: user.full_name,
        role: user.role,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.full_name.split(' ')[0]}`
      });

    if (profileError) {
      console.error(`❌ Profile Error (${user.email}):`, profileError.message);
    } else {
      console.log(`✅ Profile synced for ${user.full_name}`);
    }
  }

  console.log('\n✨ Seeding Complete! Demo accounts are ready to use.');
}

createDemoUsers();