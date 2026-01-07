import React from 'react';
import { Play, Clock, Star, Trophy, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';
import { ViewState } from '../types';

interface DashboardProps {
  user: {
    name: string;
    coins: number;
    streak: number;
    avatarUrl: string;
  };
  lessons: Array<{
    id: string;
    title: string;
    subject: string;
    duration: string;
    progress: number;
    image: string;
    isCBC?: boolean;
  }>;
  onStartLesson: (id: string) => void;
  setView: (view: ViewState) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, lessons, onStartLesson, setView }) => {
  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
      {/* Welcome Section - Responsive Flex */}
      <section className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-gray-800 tracking-tight">
            Habari, <span className="text-primary">{user.name.split(' ')[0]}!</span>
          </h1>
          <p className="text-gray-500 font-bold mt-1">Ready for today's learning adventure?</p>
        </div>
        
        {/* Quick Stats - Grid for Mobile */}
        <div className="grid grid-cols-2 sm:flex items-center gap-3 w-full sm:w-auto">
          <StatBadge icon={<Zap size={18} className="text-yellow-500" />} value={`${user.streak}d`} label="Streak" />
          <StatBadge icon={<Trophy size={18} className="text-primary" />} value={user.coins} label="Coins" />
        </div>
      </section>

      {/* Main Grid - Bento Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        
        {/* Left Column: Learning Path */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl md:text-2xl font-black text-gray-800 flex items-center gap-2">
              <BookOpen className="text-primary" size={24} />
              Continue Learning
            </h2>
            <button className="text-primary font-bold text-sm hover:underline flex items-center gap-1">
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {lessons.map((lesson) => (
              <LessonCard key={lesson.id} lesson={lesson} onClick={() => onStartLesson(lesson.id)} />
            ))}
          </div>

          {/* Daily Quest - Full Width on Tablet/Mobile */}
          <div className="bg-primary p-6 md:p-8 rounded-[40px] shadow-clay-primary text-white relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-md">
                <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 inline-block">Daily Quest</span>
                <h3 className="text-2xl md:text-3xl font-black mb-2 leading-tight">Master the Heart System</h3>
                <p className="text-white/80 font-bold text-sm">Finish 3 lessons in Science today to earn a Legendary Chest!</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex-1 h-3 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white rounded-full" style={{ width: '66%' }}></div>
                  </div>
                  <span className="font-black">2/3</span>
                </div>
              </div>
              <button onClick={() => setView(ViewState.ScienceLab)} className="bg-white text-primary px-8 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-transform active:scale-95 whitespace-nowrap">
                Go to Lab
              </button>
            </div>
            {/* Background Decorative Sparkles */}
            <Star className="absolute -bottom-4 -right-4 text-white/10 w-32 h-32 rotate-12" />
          </div>
        </div>

        {/* Right Column: Progress & Friends */}
        <div className="space-y-6 md:space-y-8">
          <div className="bg-white/40 rounded-[40px] p-6 md:p-8 shadow-clay border border-white/50">
            <h3 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
              <Target className="text-red-500" size={20} />
              My Progress
            </h3>
            <div className="space-y-6">
              <ProgressItem label="Science" percent={85} color="bg-green-500" />
              <ProgressItem label="Math" percent={62} color="bg-blue-500" />
              <ProgressItem label="English" percent={94} color="bg-purple-500" />
            </div>
            <button 
              onClick={() => setView(ViewState.Analytics)}
              className="w-full mt-8 py-4 bg-[#e0e5ec] text-gray-500 rounded-2xl font-bold text-sm shadow-clay hover:text-primary transition-all"
            >
              Full Analytics Report
            </button>
          </div>

          <div className="bg-white/40 rounded-[40px] p-6 md:p-8 shadow-clay border border-white/50">
            <h3 className="text-xl font-black text-gray-800 mb-6">Learning Buddies</h3>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Friend${i}`} alt="Friend" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-800">Friend {i}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase">Lv. {10 + i} • Online</div>
                    </div>
                  </div>
                  <div className="text-xs font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity">CHALLENGE</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

const StatBadge = ({ icon, value, label }: any) => (
  <div className="bg-white/60 px-3 py-2 md:px-4 md:py-2.5 rounded-2xl shadow-clay flex items-center gap-3 min-w-0 border border-white/50">
    <div className="flex-shrink-0">{icon}</div>
    <div className="min-w-0">
      <div className="text-sm md:text-base font-black text-gray-800 truncate">{value}</div>
      <div className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider truncate">{label}</div>
    </div>
  </div>
);

const LessonCard = ({ lesson, onClick }: any) => (
  <button 
    onClick={onClick}
    className="bg-white/40 rounded-[32px] overflow-hidden shadow-clay border border-white/50 hover:scale-[1.02] transition-all group flex flex-col text-left"
  >
    <div className="relative h-40 md:h-48 overflow-hidden">
      <img src={lesson.image} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 left-4">
        {lesson.isCBC && (
          <span className="bg-primary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-clay-primary uppercase tracking-widest">
            CBC Core
          </span>
        )}
      </div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
          <Play fill="currentColor" className="text-primary ml-1" size={20} />
        </div>
      </div>
    </div>
    <div className="p-5 md:p-6 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[10px] font-black text-primary uppercase tracking-wider">{lesson.subject}</span>
        <span className="text-gray-300">•</span>
        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase">
          <Clock size={12} /> {lesson.duration}
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-black text-gray-800 mb-4 line-clamp-1 leading-tight">{lesson.title}</h3>
      <div className="mt-auto space-y-2">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <span className="text-gray-400">Your Progress</span>
          <span className="text-primary">{lesson.progress}%</span>
        </div>
        <div className="h-2 bg-[#e0e5ec] rounded-full overflow-hidden shadow-clay-inset">
          <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${lesson.progress}%` }}></div>
        </div>
      </div>
    </div>
  </button>
);

const ProgressItem = ({ label, percent, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[11px] font-black uppercase tracking-widest">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800">{percent}%</span>
    </div>
    <div className="h-2.5 bg-[#e0e5ec] rounded-full overflow-hidden shadow-clay-inset">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);