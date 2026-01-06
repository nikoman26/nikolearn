import React from 'react';
import { 
  BookOpen, TrendingUp, Star, Coins, Clock, 
  FlaskConical, Glasses, Box, ChevronRight, 
  Target, MessageSquare, Award, Zap, HeartHandshake 
} from 'lucide-react';
import { UserProfile, Lesson, ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface DashboardProps {
  user: UserProfile;
  lessons: Lesson[];
  onStartLesson: (id: string) => void;
  setView: (view: ViewState) => void; // Added setView prop
}

export const Dashboard: React.FC<DashboardProps> = ({ user, lessons, onStartLesson, setView }) => {
  const { profile } = useAuth();
  const isStudent = profile?.role === 'student';

  // Mock data for student-specific stats
  const studentStats = {
    level: 7,
    xpToNextLevel: 150,
    currentXp: 850,
    dailyStreak: 5,
    totalAchievements: 12,
    masterySubjects: ['Science', 'Math'],
  };

  // Filter lessons for recommendations (mock logic)
  const recommendedLessons = lessons.filter(l => l.subject === 'Science' && l.progress < 100).slice(0, 3);
  const assignedLessons = lessons.filter(l => l.subject === 'Math' && l.progress < 100).slice(0, 2);

  const quickAccessModules = [
    { icon: FlaskConical, label: 'Science Lab', view: ViewState.ScienceLab, color: 'bg-green-500' },
    { icon: Glasses, label: 'VR Experience', view: ViewState.VRExperience, color: 'bg-blue-500' },
    { icon: Box, label: 'AR Overlay', view: ViewState.AROverlay, color: 'bg-purple-500' },
    { icon: HeartHandshake, label: 'Life Skills', view: ViewState.LifeSkills, color: 'bg-yellow-500' },
  ];

  const renderLessonCard = (lesson: Lesson, type: 'recommended' | 'assigned') => (
    <div 
      key={lesson.id} 
      className="bg-[#e0e5ec] rounded-3xl p-5 shadow-clay flex flex-col justify-between hover:shadow-clay-inset transition-all cursor-pointer"
      onClick={() => onStartLesson(lesson.id)}
    >
      <div>
        <div className="flex justify-between items-start mb-3">
          <span className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${
            type === 'assigned' ? 'bg-red-100 text-red-700' : 'bg-primary/10 text-primary'
          }`}>
            {type === 'assigned' ? 'Assigned' : 'Recommended'}
          </span>
          <div className="flex items-center gap-1 text-yellow-600 font-bold">
            <Coins size={16} />
            <span>{lesson.reward}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{lesson.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-auto">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Progress</span>
          <span className="font-bold">{lesson.progress}%</span>
        </div>
        <div className="h-2 bg-[#d1d9e6] rounded-full overflow-hidden shadow-clay-inset-sm">
          <div 
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${lesson.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  if (!isStudent) {
    // Fallback for non-student users who somehow land here
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {profile?.role}!</h1>
        <p className="text-gray-600">Please use the dedicated {profile?.role === 'teacher' ? 'Teacher Hub' : 'Family Mode'} for your role.</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24 md:pb-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
        <p className="text-gray-500">Let's continue your learning journey.</p>
      </div>

      {/* Gamification Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        
        {/* Level Card */}
        <div className="bg-[#e0e5ec] rounded-3xl p-5 shadow-clay flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Star className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Level</h3>
              <p className="text-sm text-gray-500">Next: {studentStats.xpToNextLevel} XP</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-primary">{studentStats.level}</div>
        </div>

        {/* Coins Card */}
        <div className="bg-[#e0e5ec] rounded-3xl p-5 shadow-clay flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Coins className="text-yellow-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">LearnCoins</h3>
              <p className="text-sm text-gray-500">Total balance</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-yellow-600">{user.coins}</div>
        </div>

        {/* Streak Card */}
        <div className="bg-[#e0e5ec] rounded-3xl p-5 shadow-clay flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Zap className="text-red-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Streak</h3>
              <p className="text-sm text-gray-500">Days learning</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-red-600">{studentStats.dailyStreak}</div>
        </div>

        {/* Achievements Card */}
        <div className="bg-[#e0e5ec] rounded-3xl p-5 shadow-clay flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Award className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Achievements</h3>
              <p className="text-sm text-gray-500">Badges earned</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600">{studentStats.totalAchievements}</div>
        </div>
      </div>

      {/* Quick Access Modules */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Explore Learning Environments</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickAccessModules.map((module) => (
            <button
              key={module.label}
              onClick={() => setView(module.view)} 
              className={`flex flex-col items-center justify-center p-6 rounded-3xl shadow-clay hover:shadow-clay-inset transition-all ${module.color}/10`}
            >
              <module.icon size={32} className={`${module.color.replace('bg', 'text')}`} />
              <span className="mt-3 text-sm font-bold text-gray-800">{module.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Assigned Lessons (Teacher-driven) */}
      {assignedLessons.length > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Target size={20} className="text-red-600" />
              Mandatory Assignments
            </h2>
            <button className="text-sm font-semibold text-primary hover:underline">View All <ChevronRight size={16} className="inline" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignedLessons.map(lesson => renderLessonCard(lesson, 'assigned'))}
          </div>
        </div>
      )}

      {/* Recommended Lessons (AI-driven) */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <BookOpen size={20} className="text-primary" />
            Personalized Recommendations
          </h2>
          <button className="text-sm font-semibold text-primary hover:underline">Explore More <ChevronRight size={16} className="inline" /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedLessons.map(lesson => renderLessonCard(lesson, 'recommended'))}
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-gray-800">XP Progress to Level {studentStats.level + 1}</h3>
          <span className="text-sm font-bold text-primary">{studentStats.currentXp} / {studentStats.currentXp + studentStats.xpToNextLevel} XP</span>
        </div>
        <div className="h-4 bg-[#d1d9e6] rounded-full overflow-hidden shadow-clay-inset-sm">
          <div 
            className="h-full bg-primary transition-all duration-500 flex items-center justify-end pr-2"
            style={{ width: `${(studentStats.currentXp / (studentStats.currentXp + studentStats.xpToNextLevel)) * 100}%` }}
          >
            <Star size={12} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};