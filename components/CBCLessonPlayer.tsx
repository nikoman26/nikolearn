import React, { useState, useEffect } from 'react';
import { 
  Play, CheckCircle, Clock, BookOpen, 
  Star, Heart, Activity, Users, 
  Award, ChevronLeft, ChevronRight, X,
  Maximize2, Camera, Brain
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../src/integrations/supabase/client';

interface CBCLessonPlayerProps {
  lessonId: string;
  onComplete: () => void;
  onProgress: (progress: number) => void;
}

export const CBCLessonPlayer: React.FC<CBCLessonPlayerProps> = ({ 
  lessonId, 
  onComplete, 
  onProgress 
}) => {
  const { user, profile } = useAuth();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(0);
  const [showInteractive, setShowInteractive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0); // Added time tracking

  useEffect(() => {
    const fetchLesson = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('lessons')
        .select('*, subjects(name)')
        .eq('id', lessonId)
        .single();

      if (data) {
        setLesson(data);
        // Track that the student started the lesson
        if (user) {
          // Fetch existing progress or create new
          const { data: progressData } = await supabase.from('student_progress')
            .select('progress_percentage, time_spent_minutes')
            .match({ student_id: user.id, lesson_id: lessonId })
            .single();

          const initialProgress = progressData?.progress_percentage || 0;
          const initialTime = progressData?.time_spent_minutes || 0;
          
          setProgress(initialProgress);
          setTimeSpent(initialTime * 60); // Convert minutes to seconds

          await supabase.from('student_progress').upsert({
            student_id: user.id,
            lesson_id: lessonId,
            last_accessed: new Date().toISOString(),
            progress_percentage: initialProgress,
            time_spent_minutes: initialTime,
          }, { onConflict: 'student_id, lesson_id' });
        }
      }
      setLoading(false);
    };

    fetchLesson();
  }, [lessonId, user]);

  // Simulate progress tracking based on time spent
  useEffect(() => {
    if (!lesson || progress >= 100) return;

    const totalDurationSeconds = lesson.duration_minutes * 60;

    const interval = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        // Calculate progress based on time, but cap at 99% until manually completed
        const newProgress = Math.min((newTime / totalDurationSeconds) * 100, 99);
        setProgress(newProgress);
        onProgress(newProgress);
        
        // Update database progress every 30 seconds (for persistence)
        if (newTime % 30 === 0 && user) {
          supabase.from('student_progress').update({
            progress_percentage: Math.round(newProgress),
            time_spent_minutes: Math.round(newTime / 60),
            last_accessed: new Date().toISOString()
          }).match({ student_id: user.id, lesson_id: lessonId }).then(({ error }) => {
            if (error) console.error("Failed to save progress:", error);
          });
        }
        
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lesson, progress, onProgress, user, lessonId]);

  const formatTime = (seconds: number) => {
    const totalMinutes = Math.floor(seconds / 60);
    const mins = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    
    if (hours > 0) return `${hours}h ${mins}m`;
    return `${mins} min`;
  };

  if (loading) return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (!lesson) return <div className="p-8 text-center bg-red-100 rounded-3xl text-red-700 font-bold shadow-clay">Lesson not found.</div>;

  const content = lesson.interactive_elements || {};
  const sections = [
    { title: 'Overview', icon: <BookOpen size={18} /> },
    { title: 'Interactive Lab', icon: <Activity size={18} />, type: content.type },
    { title: 'Assessment', icon: <Award size={18} /> }
  ];

  const handleComplete = async () => {
    if (user) {
      // 1. Update Progress to 100%
      await supabase.from('student_progress').upsert({
        student_id: user.id,
        lesson_id: lessonId,
        progress_percentage: 100,
        completed_at: new Date().toISOString(),
        time_spent_minutes: Math.round(timeSpent / 60)
      }, { onConflict: 'student_id, lesson_id' });

      // 2. Award LearnCoin (Transaction Ledger)
      const rewardAmount = 50;
      await supabase.from('learncoin_transactions').insert({
        student_id: user.id,
        amount: rewardAmount,
        transaction_type: 'earned',
        source: 'lesson',
        description: `Completed: ${lesson.title}`
      });

      // 3. Update Wallet Balance (This relies on the database trigger/function or useRobustData hook)
      // We rely on the database transaction above and the useRobustData hook for eventual consistency.
    }
    setProgress(100);
    onComplete();
  };

  return (
    <div className="bg-white rounded-[40px] shadow-clay overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
      {/* Dynamic Header */}
      <div className="bg-primary p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Brain size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              {lesson.subjects?.name || lesson.subject} • Grade {lesson.grade_level}
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1">
              <Clock size={12} /> {lesson.duration_minutes} min
            </span>
          </div>
          <h1 className="text-3xl font-black mb-2">{lesson.title}</h1>
          <p className="text-white/70 font-bold">{lesson.strand}</p>
        </div>
      </div>

      {/* Content Navigator */}
      <div className="p-6 md:p-10">
        <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {sections.map((s, idx) => (
            <button 
              key={idx}
              onClick={() => setCurrentSection(idx)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all whitespace-nowrap ${
                currentSection === idx 
                  ? 'bg-primary text-white shadow-clay-primary scale-105' 
                  : 'bg-[#e0e5ec] text-gray-500 hover:bg-white/50'
              }`}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          {currentSection === 0 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-[#e0e5ec] p-8 rounded-3xl shadow-clay-inset">
                <h3 className="text-xl font-black text-gray-800 mb-4">Learning Objectives</h3>
                <ul className="space-y-3">
                  {(lesson.learning_objectives || []).map((obj: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600 font-bold">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 mt-1 flex-shrink-0">
                        <CheckCircle size={14} />
                      </div>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-gray-500 leading-relaxed font-bold px-4">
                {lesson.description || "Start this lesson to explore the fascinating world of science."}
              </p>
            </div>
          )}

          {currentSection === 1 && (
            <div className="animate-in zoom-in-95 duration-500">
              <div className="relative aspect-video bg-gray-900 rounded-[32px] shadow-2xl flex flex-col items-center justify-center text-white overflow-hidden group">
                {content.type === 'vr_interactive' && (
                  <>
                    <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1200')] bg-cover"></div>
                    <Activity size={64} className="text-primary animate-pulse mb-4 relative z-10" />
                    <h3 className="text-2xl font-black relative z-10">{content.title || 'Virtual Lab'}</h3>
                    <p className="text-white/60 mb-8 relative z-10">3D Interaction Active</p>
                    <button 
                      onClick={() => setShowInteractive(true)}
                      className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:scale-110 transition-transform relative z-10 flex items-center gap-2"
                    >
                      <Maximize2 size={20} /> Enter Fullscreen Lab
                    </button>
                  </>
                )}
                {content.ar_overlay && (
                  <div className="absolute bottom-4 right-4 p-3 bg-blue-500/80 rounded-xl backdrop-blur-sm text-white flex items-center gap-2 text-sm font-bold">
                    <Camera size={16} /> AR Overlay Available
                  </div>
                )}
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="text-center py-10 animate-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-yellow-100 rounded-[28px] flex items-center justify-center text-yellow-600 mx-auto mb-6 shadow-clay-sm">
                <Star size={40} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-2">Final Mastery Check</h3>
              <p className="text-gray-500 font-bold mb-8">Complete this quiz to earn 50 LearnCoins!</p>
              
              <div className="max-w-md mx-auto space-y-4">
                {(content.quiz_preview || []).map((q: any, i: number) => (
                  <div key={i} className="bg-[#f8f9fb] p-6 rounded-3xl shadow-clay text-left border border-white/50">
                    <p className="font-black text-gray-800 mb-4">{q.q}</p>
                    <div className="grid gap-2">
                      {q.options.map((opt: string, j: number) => (
                        <button key={j} className="w-full text-left px-4 py-3 rounded-xl bg-white border border-gray-100 font-bold text-sm text-gray-500 hover:border-primary hover:text-primary transition-all">
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
          <button 
            disabled={currentSection === 0}
            onClick={() => setCurrentSection(s => s - 1)}
            className="flex items-center gap-2 font-black text-gray-400 hover:text-primary disabled:opacity-30 transition-colors"
          >
            <ChevronLeft size={20} /> Previous
          </button>

          {currentSection < sections.length - 1 ? (
            <button 
              onClick={() => setCurrentSection(s => s + 1)}
              className="px-10 py-4 bg-[#e0e5ec] text-primary rounded-2xl font-black shadow-clay hover:bg-white transition-all flex items-center gap-2"
            >
              Next Step <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleComplete}
              className="px-10 py-4 bg-green-500 text-white rounded-2xl font-black shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              <CheckCircle size={20} /> Claim Rewards
            </button>
          )}
        </div>
      </div>

      {/* Fullscreen Interactive Modal */}
      {showInteractive && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="p-4 flex justify-between items-center bg-white/5 backdrop-blur-md">
            <h2 className="text-white font-black flex items-center gap-2"><Activity size={18} /> {lesson.title} - Virtual Lab</h2>
            <button onClick={() => setShowInteractive(false)} className="p-2 text-white/50 hover:text-white transition-colors"><X size={24} /></button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="w-32 h-32 rounded-full border-4 border-primary border-t-transparent animate-spin mb-6"></div>
             <p className="text-white/60 font-black animate-pulse">Initializing VR Rendering Engine for {content.title || 'Lab'}...</p>
          </div>
          <div className="p-8 bg-white/5 backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4">
             {(content.interactive_hotspots || []).map((h: any) => (
               <button key={h.id} className="p-4 rounded-2xl bg-white/10 text-white text-left hover:bg-white/20 transition-all border border-white/10 group">
                 <div className="text-[10px] font-black text-primary uppercase mb-1">Hotspot</div>
                 <div className="font-bold text-sm group-hover:translate-x-1 transition-transform">{h.label}</div>
               </button>
             ))}
          </div>
        </div>
      )}
    </div>
  );
};