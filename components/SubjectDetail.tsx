import React, { useState, useEffect } from 'react';
import { supabase } from '../src/integrations/supabase/client';
import { Play, Clock, ChevronLeft, BookOpen, Lock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  strand: string;
  duration_minutes: number;
  is_published: boolean;
}

interface SubjectDetailProps {
  subjectId: string;
  onBack: () => void;
  onStartLesson: (id: string) => void;
}

export const SubjectDetail: React.FC<SubjectDetailProps> = ({ subjectId, onBack, onStartLesson }) => {
  const [subject, setSubject] = useState<any>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      // Fetch Subject details
      const { data: subData } = await supabase
        .from('subjects')
        .select('*')
        .eq('id', subjectId)
        .single();
      
      if (subData) setSubject(subData);

      // Fetch Lessons for this subject
      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('subject_id', subjectId)
        .order('created_at');

      if (lessonsData) setLessons(lessonsData);
      setLoading(false);
    };

    fetchData();
  }, [subjectId]);

  if (loading) return <div className="p-20 text-center font-bold text-gray-400 animate-pulse">Loading curriculum...</div>;

  return (
    <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-primary font-black hover:underline"
      >
        <ChevronLeft size={20} /> Back to Subjects
      </button>

      <div className="bg-primary p-8 rounded-[40px] text-white shadow-clay-primary relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
              <BookOpen size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              {lessons.length} Lessons Available
            </span>
          </div>
          <h1 className="text-4xl font-black mb-2">{subject?.name}</h1>
          <p className="text-white/70 font-bold max-w-2xl">{subject?.description}</p>
        </div>
        <BookOpen size={180} className="absolute -bottom-10 -right-10 text-white/10 rotate-12" />
      </div>

      <div className="grid gap-6">
        {lessons.map((lesson) => (
          <button 
            key={lesson.id}
            onClick={() => lesson.is_published && onStartLesson(lesson.id)}
            className={`w-full text-left p-6 rounded-[32px] shadow-clay flex items-center justify-between transition-all group ${
              !lesson.is_published ? 'opacity-60 grayscale cursor-not-allowed' : 'bg-white/40 hover:bg-white/60'
            }`}
          >
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#e0e5ec] shadow-clay-inset flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                {lesson.is_published ? <Play size={24} fill="currentColor" /> : <Lock size={24} />}
              </div>
              <div>
                <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{lesson.strand || 'General'}</div>
                <h3 className="text-xl font-black text-gray-800">{lesson.title}</h3>
                <div className="flex items-center gap-4 mt-1 text-gray-400 font-bold text-sm">
                  <span className="flex items-center gap-1"><Clock size={14} /> {lesson.duration_minutes}m</span>
                  <span>•</span>
                  <span>{lesson.is_published ? 'Ready to Start' : 'Coming Soon'}</span>
                </div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-clay-sm">
              <ChevronLeft size={20} className="rotate-180" />
            </div>
          </button>
        ))}

        {lessons.length === 0 && (
          <div className="py-20 text-center border-4 border-dashed border-gray-300 rounded-[40px]">
            <p className="text-gray-400 font-black uppercase tracking-widest">No lessons have been published for this subject yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};