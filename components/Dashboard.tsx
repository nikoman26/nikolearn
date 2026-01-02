import React from 'react';
import { Play, Star, Clock, Trophy, Target } from 'lucide-react';
import { Lesson, UserProfile, ViewState } from '../types';

interface DashboardProps {
  user: UserProfile;
  lessons: Lesson[];
  onStartLesson: (lessonId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, lessons, onStartLesson }) => {
  return (
    <div className="p-6 md:p-8 space-y-8 pb-24 md:pb-8">
      
      {/* Welcome Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Jambo, <span className="text-primary">{user.name.split(' ')[0]}</span>! 👋
          </h1>
          <p className="text-gray-500 mt-1 font-medium">Ready to learn something new?</p>
        </div>
        
        {/* Coins / Wallet Widget */}
        <div className="h-12 px-4 rounded-2xl bg-[#e0e5ec] shadow-clay flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-yellow-800 text-xs font-bold border-2 border-yellow-200">
            $
          </div>
          <span className="font-bold text-gray-700">{user.coins}</span>
        </div>
      </div>

      {/* Stats Row (Bento) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#e0e5ec] p-4 rounded-3xl shadow-clay flex flex-col items-center justify-center gap-2">
          <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-500 flex items-center justify-center">
            <Trophy size={20} />
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{user.streak}</div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Day Streak</div>
          </div>
        </div>
        
        <div className="bg-[#e0e5ec] p-4 rounded-3xl shadow-clay flex flex-col items-center justify-center gap-2">
           <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center">
            <Target size={20} />
          </div>
           <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">85%</div>
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Mastery</div>
          </div>
        </div>

        {/* Big CTA on Desktop, Full Width on Mobile */}
        <div className="col-span-2 bg-primary text-white p-5 rounded-3xl shadow-[8px_8px_16px_#b8b9be,-8px_-8px_16px_#ffffff] relative overflow-hidden group cursor-pointer" onClick={() => onStartLesson(lessons[0].id)}>
          <div className="relative z-10">
            <div className="text-xs font-bold uppercase opacity-80 mb-1">Continue Learning</div>
            <h3 className="text-xl font-bold leading-tight mb-2">The Solar System</h3>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Clock size={14} />
              <span>15 mins left</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>
          <div className="absolute right-4 bottom-4 w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <Play size={20} fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Curriculum Strands */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4 ml-2">Today's Lessons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div 
              key={lesson.id}
              className="bg-[#e0e5ec] p-4 rounded-3xl shadow-clay hover:scale-[1.02] transition-transform duration-300 cursor-pointer flex flex-col h-full"
              onClick={() => onStartLesson(lesson.id)}
            >
              {/* Image Area */}
              <div className="h-32 w-full rounded-2xl bg-gray-200 mb-4 overflow-hidden relative">
                <img src={lesson.imageUrl} alt={lesson.title} className="w-full h-full object-cover" />
                {lesson.isLocked && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white/90 p-2 rounded-full shadow-lg">
                      <Clock size={20} className="text-gray-600" />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold tracking-wider text-primary uppercase bg-primary/10 px-2 py-1 rounded-lg">
                    {lesson.subject}
                  </span>
                  <div className="flex text-yellow-500">
                     {[...Array(3)].map((_, i) => (
                       <Star key={i} size={12} fill="currentColor" className="opacity-80" />
                     ))}
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-800 text-lg mb-1">{lesson.title}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{lesson.strand}</p>
                
                {/* Progress Bar */}
                <div className="mt-auto">
                  <div className="flex justify-between text-xs font-semibold text-gray-400 mb-1">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <div className="h-3 w-full bg-[#d1d9e6] rounded-full shadow-inner overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
