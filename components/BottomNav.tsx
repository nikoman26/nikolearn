import React from 'react';
import { Home, BookOpen, FlaskConical, ShoppingBag, Users, MoreHorizontal, User } from 'lucide-react';
import { ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface BottomNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentView, setView }) => {
  const { profile } = useAuth();
  const role = profile?.role;
  const isStudent = role === 'student';
  const isTeacher = role === 'teacher';
  const isParent = role === 'parent';

  // Core items (max 4)
  const coreItems = [
    { id: ViewState.Dashboard, icon: Home, label: 'Home', show: true },
    { id: ViewState.LessonPlayer, icon: BookOpen, label: 'Learn', show: isStudent },
    { id: ViewState.TeacherDashboard, icon: User, label: 'Teacher Hub', show: isTeacher },
    { id: ViewState.Family, icon: Users, label: 'Family', show: isParent || isStudent },
    { id: ViewState.ScienceLab, icon: FlaskConical, label: 'Lab', show: isStudent },
    { id: ViewState.Shop, icon: ShoppingBag, label: 'Shop', show: isStudent },
  ].filter(item => item.show).slice(0, 4);

  // Add a 'More' button if the current view is a secondary view (like Profile)
  const isSecondaryView = [ViewState.ProfileManagement, ViewState.ActivityLog, ViewState.FAQ, ViewState.Analytics, ViewState.LifeSkills].includes(currentView);

  // Ensure we have exactly 5 slots (4 core + 1 more/active secondary)
  const items = [
    ...coreItems.slice(0, 4),
    { 
      id: ViewState.ProfileManagement, 
      icon: MoreHorizontal, 
      label: 'More', 
      isMore: true,
      // If a secondary view is active, show 'More' as active
      isActiveOverride: isSecondaryView 
    }
  ];

  const handleItemClick = (id: ViewState, isMore: boolean) => {
    if (isMore) {
      // For 'More', we navigate to the Profile Management page, which acts as the mobile settings hub
      setView(ViewState.ProfileManagement);
    } else {
      setView(id);
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#e0e5ec] border-t border-white/20 px-4 py-2 flex justify-around items-center z-50 shadow-[0_-10px_20px_rgba(163,177,198,0.2)]">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = item.isActiveOverride || currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => handleItemClick(item.id, !!item.isMore)}
            className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
              isActive 
                ? 'text-primary scale-110' 
                : 'text-gray-500 active:scale-95'
            }`}
          >
            <div className={`p-2 rounded-xl ${isActive ? 'shadow-clay-inset bg-white/50' : ''}`}>
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};