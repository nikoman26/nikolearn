# NIKOlearn MVP - Complete Setup Guide

## 🚀 Quick Start for Investor Demo

This guide will help you set up NIKOlearn with real educational data for your investor presentation.

## 📋 Prerequisites

- Supabase project already created
- Node.js 18+ installed
- Access to your Supabase SQL Editor

## 🗄️ Step 1: Database Setup

### 1.1 Seed Your Database with Real Educational Data

1. **Go to your Supabase Dashboard**
   - Navigate to your project: `https://ntbdgaqpecsynmhmtobb.supabase.co`
   - Click on "SQL Editor" in the left sidebar

2. **Run the Database Seeding Script**
   - Copy the contents of `scripts/supabaseSeed.sql`
   - Paste it into your SQL Editor
   - Click "Run" to execute

3. **Verify Data Import**
   - Check that all tables have data in the "Table Editor"
   - You should see:
     - 10 profiles (5 students, 3 parents, 2 teachers)
     - 5 lessons with real CBC curriculum content
     - Student progress data
     - Wallets with LearnCoin balances
     - Family links and chores
     - Assessment questions

### 1.2 What Data Was Created

**Students:**
- Kamau Otieno (Grade 5, 245 LearnCoins)
- Grace Wanjiru (Grade 4, neurodivergent-friendly, 180 LearnCoins)
- David Kimani (Grade 5, top performer, 320 LearnCoins)
- Sarah Nyambura (Grade 4, 150 LearnCoins)
- James Muthomi (Grade 5, 195 LearnCoins)

**Parents:**
- Mary Otieno (Kamau's mother)
- John Wanjiru (Grace's father)
- Peter Kimani (David's father)

**Teachers:**
- Ms. Grace Nyabera (Science, Social Studies)
- Mr. Samuel Ochieng (Mathematics, English)

**Lessons:**
1. Understanding Photosynthesis (Science, Grade 5)
2. Introduction to Fractions (Math, Grade 4)
3. Kenyan History: Our Heritage (Social Studies, Grade 5)
4. Reading Comprehension: African Folktales (English, Grade 5)
5. The Solar System (Science, Grade 4)

## 💻 Step 2: Application Setup

### 2.1 Install Dependencies

```bash
npm install
```

### 2.2 Configure Environment

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ntbdgaqpecsynmhmtobb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 2.3 Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## 🎯 Step 3: Test User Accounts

### 3.1 Create Demo Accounts

You can test different user roles by creating accounts in the app:

**Student Login:**
- Email: `kamau@nikolearn.ke`
- Role: Student
- Features: Lessons, Shop, Family Mode, Mwalimu AI

**Parent Login:**
- Email: `mary@nikolearn.ke`
- Role: Parent
- Features: Family Dashboard, Chore Management, Progress Monitoring

**Teacher Login:**
- Email: `grace@nikolearn.ke`
- Role: Teacher
- Features: Teacher Dashboard, Content Management, Student Analytics

## 🏆 Key Features to Demo

### For Students:
1. **Interactive Lessons**: Try the Photosynthesis lesson with VR elements
2. **LearnCoin Economy**: Visit the Shop to see rewards and purchases
3. **Family Chores**: Complete and verify household tasks for coins
4. **Mwalimu AI**: Ask questions about lessons in English/Kiswahili

### For Parents:
1. **Progress Monitoring**: View child's learning analytics
2. **Chore Management**: Create and verify tasks
3. **Family Connections**: Link with student accounts

### For Teachers:
1. **Content Creation**: Manage lessons and assessments
2. **Student Analytics**: Track class performance
3. **Real-time Monitoring**: See student progress

## 📊 Database Schema Overview

The application uses these main tables:

- `profiles` - User accounts (students, parents, teachers)
- `lessons` - Educational content with CBC alignment
- `student_progress` - Learning analytics and mastery tracking
- `wallets` - LearnCoin balances and transaction history
- `family_links` - Parent-student relationships
- `chores` - Household tasks with coin rewards
- `assessments` - Quizzes and evaluations
- `quests` - Achievement and challenge system

## 🎨 UI/UX Features

### Design System:
- **Claymorphism**: Soft shadows and tactile buttons
- **Bento Layout**: Organized information cards
- **Responsive**: Works on tablets and mobile devices
- **Accessibility**: Neurodivergent-friendly modes
- **Cultural**: Kenyan context and local examples

### Color Scheme:
- Primary: Purple (#6d5dfc)
- Background: Light gray (#e0e5ec)
- Cards: Medium gray (#d1d9e6)

## 🚀 Demo Scenarios

### Scenario 1: Student Learning Journey
1. Login as Kamau Otieno
2. Start "Photosynthesis" lesson
3. Complete interactive activities
4. Take assessment quiz
5. Earn LearnCoins and shop rewards

### Scenario 2: Family Involvement
1. Login as Mary Otieno (parent)
2. Create a new chore for Kamau
3. Verify completed task
4. Monitor learning progress

### Scenario 3: Teacher Management
1. Login as Ms. Grace Nyabera
2. View class dashboard
3. Check student progress
4. Create new lesson content

## 🔧 Troubleshooting

### Common Issues:

**Database Connection Error:**
- Verify your Supabase URL and API keys
- Check that RLS policies allow access

**Authentication Not Working:**
- Ensure profiles are created in auth.users
- Check that role-based permissions are set

**Data Not Loading:**
- Run the SQL seeding script again
- Verify table relationships and foreign keys

## 📈 Performance Optimization

- **PWA Ready**: Service worker for offline functionality
- **Image Optimization**: Lazy loading for lesson content
- **Real-time Updates**: Supabase subscriptions for live data
- **Mobile First**: Responsive design for tablets

## 🎯 Investor Demo Checklist

- [ ] Database populated with realistic data
- [ ] All user roles functional (student, parent, teacher)
- [ ] Lesson content with CBC curriculum alignment
- [ ] LearnCoin economy working
- [ ] Family mode with chore verification
- [ ] Mwalimu AI integration active
- [ ] Mobile-responsive design
- [ ] Authentication system secure
- [ ] Real-time progress tracking
- [ ] Offline capabilities demonstrated

## 🔗 Useful Links

- **Supabase Dashboard**: https://supabase.com/dashboard/project/ntbdgaqpecsynmhmtobb
- **Project Repository**: Local development environment
- **Live Demo**: https://your-domain.vercel.app (when deployed)

---

## 💡 Next Steps for Production

1. **Content Expansion**: Add more CBC curriculum lessons
2. **VR Integration**: Implement WebXR for immersive experiences
3. **Mobile App**: Build React Native version for offline use
4. **Analytics**: Advanced reporting for schools and parents
5. **AI Enhancement**: Improve Mwalimu with more local context

## 📞 Support

For technical issues or questions about the implementation, refer to:
- Supabase documentation
- Next.js community resources
- React documentation

---

**Ready to impress investors with NIKOlearn! 🎓✨**
