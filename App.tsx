import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ViewState } from './types';
import { HeaderNav } from './components/HeaderNav';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ScienceLab } from './components/ScienceLab';
import { MwalimuChat } from './components/MwalimuChat';
import { AuthPage } from './components/AuthPage';
import { LessonPlayer } from './components/LessonPlayer';
import { CBCLessonPlayer } from './components/CBCLessonPlayer';
import { Shop } from './components/Shop';
import { ParentDashboard } from './components/ParentDashboard'; // Renamed from FamilyMode
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
import { LandingPage } from './components/LandingPage';
import { FocusModeIndicator } from './components/FocusModeIndicator';
import { PrivacyConsentModal } from './components/PrivacyConsentModal';
import { MOCK_LESSONS } from './constants';
import { Sparkles, ChevronLeft } from 'lucide-react';

// Main App Content Component
const AppContent: React.FC = () => {
  const { user, profile, loading } = useAuth();
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LandingPage);
  const [isMwalimuOpen, setIsMwalimuOpen] = useState(false);
  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);
  const [isFocusModeActive, setIsFocusModeActive] = useState(true); // Mock state for Focus Mode
  const [showPrivacyModal, setShowPrivacyModal] = useState(true); // Mock state for Privacy Modal

  // Sync currentView with auth state
  useEffect(() => {
    if (!loading) {
      if (user && profile) {
        if (currentView === ViewState.LandingPage || currentView === ViewState.Login) {
          // Redirect based on role after login
          if (profile.role === 'teacher') {
            setCurrentView(ViewState.TeacherDashboard);
          } else if (profile.role === 'parent') {
            setCurrentView(ViewState.Family); // Family is now ParentDashboard
          } else {
            setCurrentView(ViewState.Dashboard);
          }
        }
      } else {
        const publicViews = [ViewState.LandingPage, ViewState.Login, ViewState.FAQ, ViewState.InvestorPitch, ViewState.ParentsOverview];
        if (!publicViews.includes(currentView)) {
          setCurrentView(ViewState.LandingPage);
        }
      }
    }
  }, [user, profile, loading]);

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

  const handleStartLesson = (id: string) => {
    setCurrentLessonId(id);
    if (id.startsWith('cbc-lesson-')) {
      setCurrentView(ViewState.CBCLessonPlayer);
    } else {
      setCurrentView(ViewState.LessonPlayer);
    }
  };

  const handleLessonComplete = () => {
    setCurrentView(ViewState.Dashboard);
    setCurrentLessonId(null);
  };

  const handleLessonProgress = (progress: number) => {
    console.log(`Lesson progress: ${progress}%`);
  };

  const userData = user && profile ? {
    id: user.id,
    name: profile.full_name || 'User',
    role: profile.role,
    coins: 450,
    streak: 5,
    avatarUrl: profile.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
  } : null;

  const renderContent = () => {
    switch (currentView) {
      case ViewState.LandingPage: return <LandingPage setView={setCurrentView} />;
      case ViewState.Login: return <AuthPage />;
      case ViewState.FAQ: return <FAQPage />;
      case ViewState.InvestorPitch: return <InvestorPitchPage />;
      case ViewState.ParentsOverview: return <ParentsOverviewPage />;
      case ViewState.Dashboard: return userData ? <Dashboard user={userData as any} lessons={MOCK_LESSONS} onStartLesson={handleStartLesson} setView={setCurrentView} /> : <LandingPage setView={setCurrentView} />;
      case ViewState.LessonPlayer: return <LessonPlayer />;
      case ViewState.CBCLessonPlayer: return currentLessonId ? <CBCLessonPlayer lessonId={currentLessonId} onComplete={handleLessonComplete} onProgress={handleLessonProgress} /> : (userData ? <Dashboard user={userData as any} lessons={MOCK_LESSONS} onStartLesson={handleStartLesson} setView={setCurrentView} /> : <LandingPage setView={setCurrentView} />);
      case ViewState.ScienceLab: return <ScienceLab />;
      case ViewState.Shop: return <Shop />;
      case ViewState.Family: return <ParentDashboard />; // Parent Dashboard
      case ViewState.VRExperience: return <VRExperience />;
      case ViewState.AROverlay: return <AROverlay />;
      case ViewState.Analytics: return <AnalyticsDashboard />;
      case ViewState.LifeSkills: return <LifeSkillsModule />;
      case ViewState.TeacherDashboard: return <TeacherDashboard />; // Teacher Dashboard
      case ViewState.ProfileManagement: return userData ? <ProfileManager user={userData as any} onUpdateProfile={() => {}} /> : null;
      case ViewState.ActivityLog: return userData ? <ActivityLogger userId={userData.id} /> : null;
      case ViewState.Logout: return <LandingPage setView={setCurrentView} />;
      default: return <LandingPage setView={setCurrentView} />;
    }
  };

  const isPublicView = [ViewState.LandingPage, ViewState.Login, ViewState.FAQ, ViewState.InvestorPitch, ViewState.ParentsOverview].includes(currentView);

  return (
    <div className="min-h-screen bg-[#e0e5ec] font-sans flex flex-col md:flex-row">
      <AccessibilityMode />
      
      {/* Sidebar for Desktop - Only visible for authenticated users on non-public views */}
      {userData && !isPublicView && (
        <Sidebar currentView={currentView} setView={setCurrentView} />
      )}

      <div className="flex-1 flex flex-col relative">
        {/* Top Header */}
        {!isPublicView && userData && (
          <HeaderNav 
            currentView={currentView} 
            setView={setCurrentView} 
            user={userData as any} 
          />
        )}

        {/* Public View Back Button */}
        {isPublicView && currentView !== ViewState.LandingPage && (
          <div className="fixed top-4 left-4 z-[60]">
            <button 
              onClick={() => setCurrentView(ViewState.LandingPage)}
              className="p-3 bg-white rounded-xl shadow-clay hover:text-primary transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
          </div>
        )}
        
        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto ${
          isPublicView && currentView === ViewState.LandingPage 
            ? 'p-0' 
            : 'pt-20 sm:pt-24 pb-24 md:pb-8 px-4 sm:px-6 lg:px-8'
        }`}>
          <div className={`${isPublicView && currentView === ViewState.LandingPage ? '' : 'max-w-6xl mx-auto'}`}>
            {renderContent()}
          </div>
        </main>

        {/* Floating Widgets */}
        
        {/* Focus Mode Indicator (Top Right) */}
        {!isPublicView && userData && (
          <FocusModeIndicator isActive={isFocusModeActive} />
        )}

        {/* Mwalimu Chat Button (Bottom Right) */}
        {(profile?.role === 'student' || profile?.role === 'teacher') && !isMwalimuOpen && !isPublicView && (
          <button
            onClick={() => setIsMwalimuOpen(true)}
            className="fixed bottom-24 md:bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-clay-primary hover:scale-110 active:scale-95 transition-all z-40 group"
          >
            <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
          </button>
        )}
        
        {/* Attention Monitor (Bottom Left) - Z-index increased to z-45 */}
        {user && profile && !isPublicView && (
          <div className="fixed bottom-24 md:bottom-6 left-6 pointer-events-auto" style={{ zIndex: 45 }}>
            <AttentionMonitor />
          </div>
        )}
      </div>

      <MwalimuChat isOpen={isMwalimuOpen} onClose={() => setIsMwalimuOpen(false)} />

      {/* Mobile Bottom Navigation */}
      {!isPublicView && userData && (
        <BottomNav currentView={currentView} setView={setCurrentView} />
      )}

      {/* Privacy Consent Modal (Highest Z-index) */}
      {showPrivacyModal && <PrivacyConsentModal />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;