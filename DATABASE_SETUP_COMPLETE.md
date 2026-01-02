# NIKOlearn MVP - Complete Database Setup Guide

## 🎯 **IMMEDIATE DATABASE SETUP REQUIRED**

Your database connection is working perfectly! The error "Could not find the table 'public.profiles'" means you need to run the database schema creation and seeding scripts first.

## 📋 **COMPLETE SETUP INSTRUCTIONS**

### **STEP 1: Create Database Schema** (REQUIRED FIRST)

1. **Go to your Supabase Dashboard:**
   ```
   https://ntbdgaqpecsynmhmtobb.supabase.co
   ```

2. **Click "SQL Editor"** in the left sidebar

3. **Copy the entire content** from this file:
   ```
   scripts/fixedCreateSchema.sql
   ```

4. **Paste it into the SQL Editor** and click **"Run"**

5. **Wait for success message:**
   ```
   "Schema Created Successfully" with 13 tables
   ```

### **STEP 2: Seed Educational Data** (IMMEDIATELY AFTER STEP 1)

1. **Stay in the SQL Editor** (after Step 1 completes)

2. **Copy the entire content** from this file:
   ```
   scripts/workingSeed.sql
   ```

3. **Paste it into the SQL Editor** and click **"Run"**

4. **Wait for verification results:**
   ```
   "User Profiles Created: 3"
   "Lessons Created: 5" 
   "Quests Active: 2"
   "Chores Created: 2"
   ```

### **STEP 3: Verify Database Setup**

1. **Click "Table Editor"** in your Supabase dashboard

2. **Check these tables exist with data:**

   **profiles table:**
   - Kamau Maina (student, Grade 7, neurodivergent-friendly)
   - Nyawira Maina (parent)
   - Mwalimu Omari (teacher)

   **lessons table:**
   - Scientific Investigation (45 min, VR lab)
   - Mixtures, Elements and Compounds (50 min, molecular lab)
   - Pre-Technical Foundations (40 min, workshop tour)
   - Computer Hardware Fundamentals (45 min, PC assembly)
   - Financial Literacy & Business (35 min, budgeting tool)

   **wallets table:**
   - Kamau: 485 LearnCoins, 7-day streak
   - Grace: 320 LearnCoins, 5-day streak  
   - David: 650 LearnCoins, 12-day streak

### **STEP 4: Test Database Connection**

Run this command in your terminal:
```bash
node scripts/testDatabaseConnection.js
```

Expected result:
```
✅ Database connection successful
✅ Direct database operations working
✅ Helper methods functional

🎯 Ready for database operations!
```

## 🎯 **DEMO ACCOUNTS (Ready After Seeding)**

### **Student Account:**
- **Email:** `kamau@nikolearn.ke`
- **Password:** `Learny26@#`
- **Features:** Lessons, VR labs, LearnCoin shop, Mwalimu AI

### **Parent Account:**
- **Email:** `nyawira@parent.ke`
- **Password:** `Learny26@#`
- **Features:** Family dashboard, chore management, progress monitoring

### **Teacher Account:**
- **Email:** `omari@school.ke`
- **Password:** `Learny26@#`
- **Features:** Lesson creation, student analytics, class management

## 📊 **WHAT DATA WILL BE CREATED**

### **Educational Content (KICD Grade 7 Curriculum):**
- **Scientific Investigation:** Laboratory safety with VR hazard identification
- **Mixtures & Compounds:** Molecular construction lab with AR chromatography
- **Pre-Technical Studies:** 3D workshop tours with first aid simulations
- **Computer Science:** Interactive PC assembly challenges
- **Financial Literacy:** Budgeting tools with entrepreneurship simulations

### **Gamification System:**
- **LearnCoins:** Digital reward economy (485 total for Kamau)
- **Quests:** "Rift Valley Expedition" (VR field trip, 250 coins)
- **Streaks:** 7-day learning streak tracking
- **Badges:** Achievement system ready

### **Family Engagement:**
- **Chores:** "Organize bookshelf" (20 coins), "Explain photosynthesis" (50 coins)
- **Verification:** Parent approval workflow
- **Progress:** Real-time learning analytics

## 🚀 **AFTER SETUP COMPLETE**

### **Test the Application:**
```bash
npm run dev
```
Visit: `http://localhost:3000`

### **Demo Scenarios:**

**Student Journey:**
1. Login as Kamau
2. Start "Scientific Investigation" lesson
3. Complete VR lab activities
4. Take assessment quiz (Pipette identification)
5. Earn 50 LearnCoins
6. Visit Shop for avatar upgrades

**Parent Journey:**
1. Login as Nyawira
2. Create new chore for Kamau
3. Verify completed tasks
4. Monitor learning progress
5. View family analytics

**Teacher Journey:**
1. Login as Mwalimu Omari
2. View class dashboard
3. Check student progress
4. Create new lesson content
5. Track mastery levels

## 🔧 **TROUBLESHOOTING**

### **If Schema Creation Fails:**
- Check you have permissions in Supabase
- Ensure you're in the correct project
- Try running the script in smaller chunks

### **If Data Seeding Fails:**
- Ensure Step 1 (schema) completed successfully
- Check for any SQL syntax errors
- Verify all tables were created in Step 1

### **If Connection Test Fails:**
- Verify Steps 1 and 2 completed successfully
- Check environment variables are set
- Ensure .env file exists with correct values

## 💡 **INVESTOR DEMO READY FEATURES**

After setup, your NIKOlearn MVP will demonstrate:

✅ **Real Educational Content:** KICD Grade 7 curriculum with VR/AR
✅ **Family Engagement:** Parents actively participating in learning
✅ **Technical Innovation:** Cutting-edge educational technology
✅ **Cultural Relevance:** Kenyan context throughout
✅ **Scalable Architecture:** Ready for nationwide deployment
✅ **Accessibility:** Neurodivergent-friendly design
✅ **Offline-First:** PWA ready for rural connectivity

## 📞 **SUPPORT**

If you encounter issues:
1. Check the Supabase dashboard for error messages
2. Verify all scripts ran without errors
3. Ensure environment variables are configured
4. Test the connection with `node scripts/testDatabaseConnection.js`

---

## 🎯 **QUICK START CHECKLIST**

- [ ] Run `scripts/fixedCreateSchema.sql` in Supabase SQL Editor
- [ ] Run `scripts/workingSeed.sql` in Supabase SQL Editor  
- [ ] Verify data in Table Editor
- [ ] Test connection: `node scripts/testDatabaseConnection.js`
- [ ] Start app: `npm run dev`
- [ ] Demo investor features with real accounts

**Ready to impress investors with NIKOlearn! 🎓✨**
