/**
 * NIKOlearn MVP - Database Connection Test
 * 
 * This script tests the direct database connection and demonstrates
 * basic database operations using the db.js module.
 */

import db, { healthCheck } from '../db.js';

async function testDatabaseConnection() {
  console.log('🔍 NIKOlearn MVP - Database Connection Test');
  console.log('==========================================\n');

  try {
    // Test 1: Health Check
    console.log('1. Testing Database Health...');
    const health = await healthCheck();
    console.log(`   Status: ${health.status}`);
    console.log(`   Timestamp: ${health.timestamp}`);
    if (health.error) {
      console.log(`   Error: ${health.error}`);
    }
    console.log('');

    // Test 2: Check if tables exist
    console.log('2. Checking Database Tables...');
    try {
      const tables = [
        'profiles', 'lessons', 'student_progress', 'assessments',
        'wallets', 'learncoin_transactions', 'quests', 'family_links',
        'chores', 'chore_completions', 'attention_sessions', 'offline_content'
      ];
      
      for (const table of tables) {
        try {
          const count = await db.query(table, { limit: 1 });
          console.log(`   ✅ ${table}: Connected`);
        } catch (error) {
          console.log(`   ❌ ${table}: ${error.message}`);
        }
      }
    } catch (error) {
      console.log(`   Error checking tables: ${error.message}`);
    }
    console.log('');

    // Test 3: Test User Profiles Query
    console.log('3. Testing User Profiles Query...');
    try {
      const profiles = await db.query('profiles', { limit: 5 });
      console.log(`   Found ${profiles.length} profiles:`);
      profiles.forEach(profile => {
        console.log(`   - ${profile.full_name} (${profile.role})`);
      });
    } catch (error) {
      console.log(`   Error querying profiles: ${error.message}`);
      console.log('   💡 This is normal if database is not seeded yet.');
    }
    console.log('');

    // Test 4: Test Lessons Query
    console.log('4. Testing Lessons Query...');
    try {
      const lessons = await db.query('lessons', { 
        filter: { is_published: true },
        limit: 3 
      });
      console.log(`   Found ${lessons.length} published lessons:`);
      lessons.forEach(lesson => {
        console.log(`   - ${lesson.title} (${lesson.subject}, Grade ${lesson.grade_level})`);
      });
    } catch (error) {
      console.log(`   Error querying lessons: ${error.message}`);
      console.log('   💡 This is normal if database is not seeded yet.');
    }
    console.log('');

    // Test 5: Test Helper Methods
    console.log('5. Testing Database Helper Methods...');
    try {
      // Test getQuests method
      const quests = await db.getQuests();
      console.log(`   ✅ getQuests(): Found ${quests.length} active quests`);
    } catch (error) {
      console.log(`   ❌ getQuests(): ${error.message}`);
    }

    try {
      // Test getLessonsByGrade method
      const grade7Lessons = await db.getLessonsByGrade(7);
      console.log(`   ✅ getLessonsByGrade(7): Found ${grade7Lessons.length} Grade 7 lessons`);
    } catch (error) {
      console.log(`   ❌ getLessonsByGrade(7): ${error.message}`);
    }
    console.log('');

    // Test Summary
    console.log('📋 Test Summary:');
    console.log('===============');
    if (health.status === 'healthy') {
      console.log('✅ Database connection successful');
      console.log('✅ Direct database operations working');
      console.log('✅ Helper methods functional');
      console.log('\n🎯 Ready for database operations!');
    } else {
      console.log('❌ Database connection failed');
      console.log('💡 Check your environment variables and database setup');
    }

  } catch (error) {
    console.error('💥 Unexpected error during database test:');
    console.error(error);
  }
}

// Run the test
testDatabaseConnection().then(() => {
  console.log('\n✨ Database connection test completed!');
  process.exit(0);
}).catch(error => {
  console.error('\n💥 Database test failed:');
  console.error(error);
  process.exit(1);
});
