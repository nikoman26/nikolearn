import React, { useState } from 'react';
import { Home, BookOpen, FlaskConical, ShoppingBag, Users, Menu, Eye, Monitor, User, TrendingUp, LogOut } from 'lucide-react';
import { ViewState, UserProfile } from '../types';

interface NavBarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: UserProfile;
  accessibleViews: ViewState[]; // Add this prop
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, setView, user, accessibleViews }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: ViewState.Dashboard, icon: Home, label: 'Home', roles: ['student', 'parent', 'teacher', 'admin'] },
    { id: ViewState.LessonPlayer, icon: BookOpen, label: 'Learn', roles: ['student', 'teacher'] },
    { id: ViewState.ScienceLab, icon: FlaskConical, label: 'Lab', roles: ['student'] },
    { id: ViewState.Shop, icon: ShoppingBag, label: 'Shop', roles: ['student'] },
    { id: ViewState.Family, icon: Users, label: 'Family', roles: ['student', 'parent'] },
    { id: ViewState.TeacherDashboard, icon: Users, label: 'Teachers', roles: ['teacher'] },
    { id: ViewState.Analytics, icon: Monitor, label: 'Analytics', roles: ['student', 'parent', 'teacher'] },
    { id: ViewState.VRExperience, icon: Eye, label: 'VR', roles: ['student'] },
    { id: ViewState.AROverlay, icon: Eye, label: 'AR', roles: ['student'] },
    { id: ViewState.ProfileManagement, icon: User, label: 'Profile', roles: ['student', 'parent', 'teacher', 'admin'] },
    { id: ViewState.ActivityLog, icon: TrendingUp, label: 'Activity', roles: ['student', 'parent', 'teacher', 'admin'] },
    { id: ViewState.Logout, icon: LogOut, label: 'Logout', roles: ['student', 'parent', 'teacher', 'admin'] },
  ].filter(item => accessibleViews.includes(item.id) && item.roles.includes(user.role as any));

  return (
    <div className="fixed bottom-0 left-0 right-0 md:left-0 md:top-0 md:bottom-0 md:w-24 bg-[#e0e5ec] z-50 flex md:flex-col items-center justify-between p-4 md:py-8 shadow-[0_-10px_20px_rgba(255,255,255,0.5)] md:shadow-[10px_0_20px_rgba(163,177,198,0.2)]">
      
      {/* Logo Area (Hidden on mobile small screens to save space, visible on tablet/desktop) */}
      <div className="hidden md:flex flex-col items-center mb-8">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-clay">
          N
        </div>
      </div>

      {/* Nav Items */}
      {/* Hamburger menu for mobile */}
      <div className="md:hidden">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-600">
          <Menu size={28} />
        </button>
      </div>

      {/* Nav Items */}
      <div className={`fixed inset-0 bg-[#e0e5ec] z-50 flex flex-col items-center justify-start pt-16 pb-4 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:static md:flex md:flex-col md:w-full md:justify-center md:gap-8 md:translate-x-0 md:overflow-y-auto md:max-h-full scrollbar-hide`}>
        <button onClick={() => setIsMenuOpen(false)} className="absolute top-4 right-4 text-gray-600 md:hidden z-10">
          <Menu size={28} />
        </button>
        <div className="flex flex-col items-center space-y-6 overflow-y-auto flex-1 px-4 md:px-0 md:space-y-8 md:overflow-visible scrollbar-hide">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => { setView(item.id); setIsMenuOpen(false); }}
                className={`
                  relative flex items-center justify-start w-full max-w-xs md:w-14 md:h-14 md:justify-center rounded-2xl transition-all duration-300 p-3 md:p-0
                  ${isActive
                    ? 'text-primary shadow-clay-inset scale-95 bg-white/50'
                    : 'text-gray-500 shadow-clay hover:scale-105 hover:text-primary hover:bg-white/30'}
                `}
                aria-label={item.label}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
                <span className="ml-3 text-sm font-medium md:hidden">{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-2 md:bottom-auto md:left-16 bg-primary text-white text-xs px-2 py-1 rounded-lg opacity-0 md:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* User Avatar (Mobile: Right side, Desktop: Bottom) */}
      <div className="md:mt-auto flex items-center gap-2">
        {/* Actual User Avatar */}
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden shadow-clay border-2 border-gray-100">
           <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};
