import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, LayoutDashboard, 
  FlaskConical, Box, Glasses, LineChart, 
  HeartHandshake, Users, ShoppingBag, 
  Settings, HelpCircle, Info, User,
  BookOpen, Activity, Target
} from 'lucide-react';
import { ViewState } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { profile, isStudent, isParent, isTeacher } = useAuth();

  const menuItems = [
    // Common items
    { id: ViewState.Dashboard, icon: LayoutDashboard, label: 'Dashboard', show: isStudent() },
    { id: ViewState.TeacherDashboard, icon: User, label: 'Teacher Hub', show: isTeacher() },
    { id: ViewState.Family, icon: Users, label: 'Family Hub', show: isParent() || isStudent() },
    
    // Student exclusive
    { id: ViewState.ScienceLab, icon: FlaskConical, label: 'Science Lab', show: isStudent() },
    { id: ViewState.VRExperience, icon: Glasses, label: 'VR Hub', show: isStudent() },
    { id: ViewState.AROverlay, icon: Box, label: 'AR Lessons', show: isStudent() },
    { id: ViewState.LifeSkills, icon: HeartHandshake, label: 'Life Skills', show: isStudent() },
    { id: ViewState.Shop, icon: ShoppingBag, label: 'Reward Shop', show: isStudent() },
    
    // Teacher exclusive/modified
    { id: ViewState.Analytics, icon: LineChart, label: 'Class Analytics', show: isTeacher() },
    
    // Shared with different labels/context
    { id: ViewState.Analytics, icon: Activity, label: 'My Progress', show: isStudent() },
    { id: ViewState.Analytics, icon: Target, label: 'Family Insights', show: isParent() },
  ].filter(item => item.show);

  const secondaryItems = [
    { id: ViewState.ParentsOverview, icon: Info, label: 'For Parents', show: !isParent() },
    { id: ViewState.InvestorPitch, icon: Info, label: 'Vision', show: true },
    { id: ViewState.FAQ, icon: HelpCircle, label: 'Help Center', show: true },
  ];

  return (
    <aside 
      className={`hidden md:flex flex-col h-screen sticky top-0 bg-[#e0e5ec] border-r border-white/20 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="h-20 flex items-center justify-between px-6 mb-4">
        {!isCollapsed && (
          <span className="text-xl font-black text-primary tracking-tighter">NIKOlearn</span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl shadow-clay hover:text-primary transition-all active:scale-95 mx-auto"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar pb-6">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <SidebarItem 
              key={item.id + item.label}
              icon={<item.icon size={22} />}
              label={item.label}
              active={currentView === item.id}
              onClick={() => setView(item.id)}
              collapsed={isCollapsed}
            />
          ))}
        </div>

        <div className="pt-6 border-t border-white/20">
          {!isCollapsed && <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-4 mb-3">Resources</p>}
          <div className="space-y-1">
            {secondaryItems.map((item) => (
              <SidebarItem 
                key={item.id}
                icon={<item.icon size={22} />}
                label={item.label}
                active={currentView === item.id}
                onClick={() => setView(item.id)}
                collapsed={isCollapsed}
                small
              />
            ))}
          </div>
        </div>
      </nav>

      <div className="p-4 mt-auto">
        <div className={`bg-white/30 rounded-2xl p-3 flex items-center gap-3 shadow-clay-inset ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <Settings size={18} />
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-gray-700 truncate">App Settings</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">v1.2.0</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

const SidebarItem = ({ icon, label, active, onClick, collapsed, small = false }: any) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 rounded-2xl transition-all group ${
      small ? 'py-2.5' : 'py-3.5'
    } ${
      active 
        ? 'bg-primary text-white shadow-clay-primary scale-[1.02]' 
        : 'text-gray-500 hover:bg-white/50 hover:text-primary'
    }`}
  >
    <div className={`flex-shrink-0 transition-transform ${active ? '' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    {!collapsed && (
      <span className={`text-sm font-bold truncate ${active ? 'text-white' : 'text-gray-600'}`}>
        {label}
      </span>
    )}
    {!collapsed && active && (
      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
    )}
  </button>
);