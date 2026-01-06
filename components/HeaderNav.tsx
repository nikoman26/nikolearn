import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, ChevronDown, User, LogOut, TrendingUp, Settings, HelpCircle, Globe } from 'lucide-react';
import { ViewState, UserProfile } from '../types';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';

interface HeaderNavProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: UserProfile;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ currentView, setView, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view: ViewState) => {
    if (view === ViewState.Logout) {
      signOut();
    } else {
      setView(view);
    }
    setIsDropdownOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 md:left-auto md:w-[calc(100%-auto)] bg-[#e0e5ec]/80 backdrop-blur-md z-50 shadow-[0_4px_20px_rgba(163,177,198,0.2)] h-16 sm:h-20 transition-all">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Branding (Mobile Only) */}
        <div className="flex md:hidden items-center flex-shrink-0 cursor-pointer" onClick={() => handleNavClick(ViewState.Dashboard)}>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-clay">
            N
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search lessons, topics, or labs..." 
            className="w-full h-11 pl-12 pr-4 bg-[#e0e5ec] shadow-clay-inset rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-gray-400"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Language Switcher Integrated - FIXED STYLING */}
          <div className="hidden sm:block">
            <div className="p-2.5 sm:p-3 rounded-2xl shadow-clay hover:bg-white/30 transition-all active:scale-95 bg-white/20 flex items-center justify-center">
              <LanguageSwitcher />
            </div>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2.5 sm:p-3 rounded-2xl text-gray-500 shadow-clay hover:text-primary transition-all active:scale-95 bg-white/20">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#e0e5ec]"></span>
          </button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-2 p-1.5 sm:p-2 rounded-2xl transition-all ${
                isDropdownOpen ? 'shadow-clay-inset bg-white/50' : 'shadow-clay hover:bg-white/30'
              }`}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-clay-sm border border-white/50 bg-gray-100">
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="hidden lg:block text-left mr-1">
                <div className="text-xs font-bold text-gray-800 truncate max-w-[100px]">{user.name}</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{user.role}</div>
              </div>
              <ChevronDown size={14} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-[#f8f9fb] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-gray-100 mb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center text-[10px] font-bold text-yellow-800">LC</div>
                    <span className="text-sm font-bold text-gray-800">{user.coins} LearnCoins</span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-bold uppercase">Account Balance</div>
                </div>

                <div className="px-2 space-y-1">
                  <DropdownItem icon={<User />} label="My Profile" onClick={() => handleNavClick(ViewState.ProfileManagement)} />
                  <DropdownItem icon={<TrendingUp />} label="Activity Log" onClick={() => handleNavClick(ViewState.ActivityLog)} />
                  <DropdownItem icon={<Settings />} label="Preferences" onClick={() => {}} />
                  <DropdownItem icon={<HelpCircle />} label="Help & Support" onClick={() => handleNavClick(ViewState.FAQ)} />
                  {/* Mobile Language Switcher in dropdown */}
                  <div className="sm:hidden border-t border-gray-100 mt-2 pt-2 px-2">
                    <div className="flex items-center gap-3 px-4 py-3 text-gray-600">
                      <Globe size={18} />
                      <span className="text-sm font-semibold">Language</span>
                      <div className="ml-auto"><LanguageSwitcher /></div>
                    </div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-gray-50 px-2">
                  <DropdownItem icon={<LogOut />} label="Logout" color="text-red-500" onClick={() => handleNavClick(ViewState.Logout)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const DropdownItem = ({ icon, label, onClick, color = "text-gray-600" }: any) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white transition-colors text-left ${color}`}
  >
    {React.cloneElement(icon as React.ReactElement, { size: 18 })}
    <span className="text-sm font-semibold">{label}</span>
  </button>
);