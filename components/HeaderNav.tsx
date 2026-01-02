import React, { useState, useEffect, useRef } from 'react';
import { Home, BookOpen, FlaskConical, ShoppingBag, Users, Menu, Eye, Monitor, User, TrendingUp, LogOut, X, ChevronDown } from 'lucide-react';
import { ViewState, UserProfile } from '../types';

interface HeaderNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: UserProfile;
  accessibleViews: ViewState[];
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ currentView, setView, user, accessibleViews }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu when view changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentView]);

  const handleNavClick = (view: ViewState) => {
    setView(view);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  // Primary navigation items (shown on desktop)
  const primaryNavItems = navItems.slice(0, 6);
  // Secondary navigation items (shown in dropdown)
  const secondaryNavItems = navItems.slice(6);

  return (
    <>
      {/* Header Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-[#e0e5ec] z-50 shadow-[0_4px_20px_rgba(163,177,198,0.3)]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-clay">
                N
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800 hidden sm:block">NIKOlearn</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {primaryNavItems.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'text-primary shadow-clay-inset scale-95 bg-white/50'
                        : 'text-gray-600 shadow-clay hover:scale-105 hover:text-primary hover:bg-white/30'}
                    `}
                    aria-label={item.label}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}

              {/* More Items Dropdown */}
              {secondaryNavItems.length > 0 && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300
                      ${isDropdownOpen
                        ? 'text-primary shadow-clay-inset scale-95 bg-white/50'
                        : 'text-gray-600 shadow-clay hover:scale-105 hover:text-primary hover:bg-white/30'}
                    `}
                    aria-label="More options"
                  >
                    <span className="text-sm font-medium">More</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden">
                      {secondaryNavItems.map((item) => {
                        const isActive = currentView === item.id;
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id)}
                            className={`
                              w-full flex items-center gap-3 px-4 py-3 transition-colors
                              ${isActive
                                ? 'bg-primary/10 text-primary'
                                : 'text-gray-700 hover:bg-gray-50'}
                            `}
                          >
                            <Icon size={18} />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* User Avatar & Name */}
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shadow-clay border-2 border-gray-100">
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-medium text-gray-700 hidden lg:block">{user.name}</span>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-white/30 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-[#e0e5ec]">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-300
                      ${isActive
                        ? 'text-primary shadow-clay-inset scale-95 bg-white/50'
                        : 'text-gray-600 shadow-clay hover:scale-105 hover:text-primary hover:bg-white/30'}
                    `}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent content from being hidden under header */}
      <div className="h-16"></div>
    </>
  );
};
