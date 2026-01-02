/**
 * NIKOlearn MVP - Complete Database Setup Script
 * 
 * This script provides step-by-step guidance for setting up the database
 * schema and seeding with educational data for the NIKOlearn MVP.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class DatabaseSetup {
  constructor() {
    this.rootDir = path.join(__dirname, '..');
    this.schemaScript = path.join(this.rootDir, 'scripts', 'fixedCreateSchema.sql');
    this.seedScript = path.join(this.rootDir, 'scripts', 'workingSeed.sql');
    this.testScript = path.join(this.rootDir, 'scripts', 'testDatabaseConnection.js');
  }

  async run() {
    console.log('🚀 NIKOlearn MVP - Complete Database Setup');
    console.log('==========================================\n');

    try {
      // Step 1: Verify scripts exist
      await this.verifyScripts();
      
      // Step 2: Show setup instructions
      await this.showSetupInstructions();
      
      // Step 3: Test connection after setup
      await this.offerConnectionTest();
      
    } catch (error) {
      console.error('💥 Setup script error:', error);
    }
  }

  async verifyScripts() {
    console.log('1. Verifying Setup Scripts...');
    
    const scripts = [
      { name: 'Schema Creation', path: this.schemaScript },
      { name: 'Data Seeding', path: this.seedScript },
      { name: 'Connection Test', path: this.testScript }
    ];
    
    for (const script of scripts) {
      if (fs.existsSync(script.path)) {
        const stats = fs.statSync(script.path);
        console.log(`   ✅ ${script.name}: ${Math.round(stats.size / 1024)}KB`);
      } else {
        console.log(`   ❌ ${script.name}: File not found`);
      }
    }
    console.log('');
  }

  async showSetupInstructions() {
    console.log('2. Database Setup Instructions');
    console.log('===============================\n');

    console.log('📋 STEP 1: Create Database Schema');
    console.log('---------------------------------');
    console.log('1. Go to your Supabase Dashboard: https://ntbdgaqpecsynmhmtobb.supabase.co');
    console.log('2. Click "SQL Editor" in the left sidebar');
    console.log('3. Copy the contents of: scripts/fixedCreateSchema.sql');
    console.log('4. Paste into SQL Editor and click "Run"');
    console.log('5. Wait for "Schema Created Successfully" message');
    console.log('');

    console.log('📋 STEP 2: Seed Educational Data');
    console.log('---------------------------------');
    console.log('1. In the same SQL Editor (after Step 1 completes)');
    console.log('2. Copy the contents of: scripts/workingSeed.sql');
    console.log('3. Paste into SQL Editor and click "Run"');
    console.log('4. Wait for verification queries showing data counts');
    console.log('');

    console.log('📋 STEP 3: Verify Setup');
    console.log('------------------------');
    console.log('1. Check "Table Editor" in Supabase dashboard');
    console.log('2. You should see these tables with data:');
    console.log('   - profiles (3+ users: Kamau, Nyawira, Mwalimu)');
    console.log('   - lessons (5 KICD Grade 7 lessons)');
    console.log('   - wallets (LearnCoin balances)');
    console.log('   - family_links (parent-student relationships)');
    console.log('   - chores (household tasks)');
    console.log('   - quests (gamification challenges)');
    console.log('');

    console.log('🔗 Quick Copy Links:');
    console.log('---------------------');
    console.log(`Schema Script: file://${this.schemaScript}`);
    console.log(`Seed Script: file://${this.seedScript}`);
    console.log('');
  }

  async offerConnectionTest() {
    console.log('📋 STEP 4: Test Database Connection');
    console.log('------------------------------------');
    console.log('After completing Steps 1-3, run this command:');
    console.log('');
    console.log('    node scripts/testDatabaseConnection.js');
    console.log('');
    console.log('Expected result: "Database connection successful"');
    console.log('');
    
    console.log('🎯 Demo Accounts (after seeding):');
    console.log('----------------------------------');
    console.log('Student: kamau@nikolearn.ke (Grade 7, 485 LearnCoins)');
    console.log('Parent: nyawira@parent.ke (Creates and verifies chores)');
    console.log('Teacher: omari@school.ke (KICD curriculum content)');
    console.log('');
    console.log('Default password for all accounts: "Learny26@"');
    console.log('');
  }

  // Method to read and display script contents
  async displayScriptContent(scriptName) {
    const scriptMap = {
      'schema': this.schemaScript,
      'seed': this.seedScript
    };
    
    const scriptPath = scriptMap[scriptName];
    if (fs.existsSync(scriptPath)) {
      const content = fs.readFileSync(scriptPath, 'utf8');
      console.log(`\n📄 ${scriptName.toUpperCase()} SCRIPT CONTENT:`);
      console.log('='.repeat(50));
      console.log(content);
      console.log('='.repeat(50));
    }
  }

  // Method to create a .env.local file
  async createEnvLocal() {
    const envLocalPath = path.join(this.rootDir, '.env.local');
    const envContent = `# NIKOlearn MVP - Local Environment
# Copy this file to .env.local for local development

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ntbdgaqpecsynmhmtobb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_tbueIop0A49myiEA_vJbTA_Y88Q1viV

# Application
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# AI Services (Optional)
OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
`;

    if (!fs.existsSync(envLocalPath)) {
      fs.writeFileSync(envLocalPath, envContent);
      console.log(`✅ Created .env.local file`);
    } else {
      console.log(`⚠️  .env.local already exists`);
    }
  }
}

// Main execution
async function main() {
  const setup = new DatabaseSetup();
  
  // Create .env.local if it doesn't exist
  await setup.createEnvLocal();
  
  // Run setup instructions
  await setup.run();
  
  // Offer to display script contents
  console.log('\n💡 TIP: To see the actual SQL content, run:');
  console.log('   setup.displayScriptContent("schema")');
  console.log('   setup.displayScriptContent("seed")');
  console.log('');
  
  console.log('✨ Database setup guide complete!');
  console.log('🎯 Follow the instructions above to set up your database.');
}

// Export for potential external use
export { DatabaseSetup };
export default DatabaseSetup;

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
