import React, { useState, useEffect } from 'react';
import { supabase } from '../src/integrations/supabase/client';
import SubjectCard from './SubjectCard';
import { LayoutGrid, Loader2 } from 'lucide-react';

interface Subject {
  id: string;
  name: string;
  description: string | null;
}

interface StudentDashboardProps {
  onSubjectSelect: (id: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onSubjectSelect }) => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('subjects')
        .select('id, name, description')
        .order('name');

      if (data) setSubjects(data);
      setLoading(false);
    };

    fetchSubjects();
  }, []);

  if (loading) {
    return (
      <div className="h-[40vh] flex flex-col items-center justify-center text-gray-400 gap-4">
        <Loader2 className="animate-spin" size={32} />
        <p className="font-bold">Fetching your curriculum...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-3 px-2">
        <LayoutGrid className="text-primary" size={28} />
        <h2 className="text-2xl font-black text-gray-800">Your Subjects</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => (
          <SubjectCard 
            key={subject.id}
            id={subject.id}
            name={subject.name}
            description={subject.description}
            onClick={onSubjectSelect}
          />
        ))}
        
        {subjects.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white/20 rounded-[40px] border-4 border-dashed border-gray-300">
            <p className="text-gray-400 font-black uppercase tracking-widest">No subjects assigned yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};