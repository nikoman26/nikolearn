import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ViewState } from './types';
import { HeaderNav } from './components/HeaderNav';
import { Dashboard } from './components/Dashboard';
import { ScienceLab } from './components/ScienceLab';
import { MwalimuChat } from './components/MwalimuChat';
import { AuthPage } from './components/AuthPage';
import { LessonPlayer } from './components/LessonPlayer';
import { Shop } from './components/Shop';
import { FamilyMode } from './components/FamilyMode';
import { TeacherDashboard } from './components/TeacherDashboard';
import { VRExperience } from './components/VRExperience';
import { AROverlay } from './components/AROverlay';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { ProfileManager } from './components/ProfileManager';
import { ActivityLogger } from './components/ActivityLogger';
import { LifeSkillsModule } from './components/LifeSkillsModule';
import { FAQPage } from './components/FAQPage';
import { InvestorPitchPage } from './components/InvestorPitchPage';
import { ParentsOverviewPage } from './components/ParentsOverviewPage';
import { AttentionMonitor } from './components/AttentionMonitor';
import { AccessibilityMode } from './components/AccessibilityMode';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { MOCK_USER, MOCK_LESSONS } from './constants';
import { Sparkles } from 'lucide-react';

// Main App Content Component
const AppContent: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.Dashboard);
  const [isMwalimuOpen, setIsMwalimuOpen] = useState(false);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading NIKOlearn...</p>
        </div>
      </div>
    );
  }

  // Show authentication page if user is not logged in
  if (!user || !profile) {
    return <AuthPage />;
  }

  // Map user data to component format
  const userData = {
    id: user.id,
    name: profile.full_name || 'Student',
    role: profile.role,
    coins: 450, // This will be fetched from wallet
    streak: 5,
    avatarUrl: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
  };

  const handleStartLesson = (id: string) => {
    const lesson = MOCK_LESSONS.find(l => l.id === id);
    if (lesson?.title === 'Photosynthesis') {
      setCurrentView(ViewState.ScienceLab);
    } else {
      setCurrentView(ViewState.LessonPlayer);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case ViewState.Dashboard:
        return (
          <Dashboard 
            user={userData} 
            lessons={MOCK_LESSONS} 
            onStartLesson={handleStartLesson} 
          />
        );
      case ViewState.LessonPlayer:
        return <LessonPlayer />;
      case ViewState.ScienceLab:
        return <ScienceLab />;
      case ViewState.Shop:
        return <Shop />;
      case ViewState.Family:
        return <FamilyMode />;
      // case ViewState.VRExperience:
      //   return <VRExperience />;
      // case ViewState.AROverlay:
      //   return <AROverlay />;
      // case ViewState.Analytics:
      //   return <AnalyticsDashboard />;
      case ViewState.LifeSkills:
        return <LifeSkillsModule />;
      case ViewState.FAQ:
        return <FAQPage />;
      case ViewState.InvestorPitch:
        return <InvestorPitchPage />;
      case ViewState.ParentsOverview:
        return <ParentsOverviewPage />;
      case ViewState.TeacherDashboard:
        return <TeacherDashboard />;
      case ViewState.ProfileManagement:
        return <ProfileManager user={userData as any} onUpdateProfile={(updates) => console.log('Update:', updates)} />;
      case ViewState.ActivityLog:
        return <ActivityLogger userId={userData.id} />;
      case ViewState.Logout:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-white rounded-3xl shadow-clay">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ready to take a break?</h2>
            <p className="text-gray-600 mb-8">Logging out will end your current learning session.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-red-500 text-white rounded-2xl font-bold shadow-lg hover:bg-red-600 transition-colors"
            >
              Confirm Logout
            </button>
          </div>
        );
      default:
        return <Dashboard user={userData} lessons={MOCK_LESSONS} onStartLesson={handleStartLesson} />;
    }
  };

  // Role-based view adjustments
  const getAccessibleViews = () => {
    const baseViews = [ViewState.Dashboard, ViewState.ProfileManagement, ViewState.ActivityLog, ViewState.Logout];
    
    if (profile.role === 'student') {
      return [...baseViews, ViewState.LessonPlayer, ViewState.ScienceLab, ViewState.Shop, ViewState.Family, ViewState.VRExperience, ViewState.AROverlay, ViewState.Analytics, ViewState.LifeSkills];
    } else if (profile.role === 'parent') {
      return [...baseViews, ViewState.Family, ViewState.Analytics, ViewState.LifeSkills];
    } else if (profile.role === 'teacher') {
      return [...baseViews, ViewState.TeacherDashboard, ViewState.LessonPlayer, ViewState.Analytics];
    }
    
    return baseViews;
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] font-sans">
      {/* Accessibility Mode Component */}
      <AccessibilityMode />
      
      {/* Header Navigation */}
      <HeaderNav 
        currentView={currentView} 
        setView={setCurrentView} 
        user={userData as any}
        accessibleViews={getAccessibleViews()}
      />

      {/* Language Switcher - Top Right */}
      <div className="fixed top-20 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Main Content Area */}
      <main className="overflow-y-auto min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderContent()}
        </div>
      </main>

      {/* Floating Mwalimu Button - Only for students and teachers */}
      {(profile.role === 'student' || profile.role === 'teacher') && !isMwalimuOpen && (
        <button
          onClick={() => setIsMwalimuOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-[8px_8px_16px_rgba(109,93,252,0.4),-8px_-8px_16px_#ffffff] hover:scale-110 active:scale-95 transition-all z-40 group"
          title="Ask Mwalimu"
        >
          <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-12 right-0 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Ask Mwalimu!
          </span>
        </button>
      )}

      {/* Mwalimu AI Overlay */}
      <MwalimuChat 
        isOpen={isMwalimuOpen} 
        onClose={() => setIsMwalimuOpen(false)} 
      />

      {/* Attention Monitor - For authenticated users */}
      {user && profile && (
        <div className="fixed bottom-4 left-4 z-30 max-w-sm">
          <AttentionMonitor />
        </div>
      )}
    </div>
  );
};

// Main App Component with Auth Provider
const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
