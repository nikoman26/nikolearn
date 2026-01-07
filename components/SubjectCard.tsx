import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

interface SubjectCardProps {
  id: string;
  name: string;
  description: string | null;
  onClick: (id: string) => void;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ id, name, description, onClick }) => {
  return (
    <button 
      onClick={() => onClick(id)}
      className="bg-white/40 rounded-[32px] p-6 shadow-clay border border-white/50 hover:scale-[1.02] transition-all group text-left w-full flex flex-col"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4 shadow-clay-sm">
        <BookOpen size={24} />
      </div>
      
      <h3 className="text-xl font-black text-gray-800 mb-2 leading-tight">{name}</h3>
      <p className="text-gray-500 font-bold text-sm line-clamp-2 mb-6 flex-1">
        {description || 'Explore the wonders of ' + name + ' through interactive lessons.'}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100/50">
        <span className="text-[10px] font-black text-primary uppercase tracking-widest">
          Start Learning
        </span>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-clay-sm group-hover:translate-x-1 transition-transform">
          <ArrowRight size={16} />
        </div>
      </div>
    </button>
  );
};

export default SubjectCard;