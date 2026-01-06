import React, { useState } from 'react';
import { DollarSign, Heart, Shield, Users, Smartphone, BookOpen, ChevronRight, CheckCircle } from 'lucide-react';

export const LifeSkillsModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { 
      id: 'finance', 
      title: 'Financial Literacy', 
      icon: <DollarSign />, 
      color: 'bg-green-100 text-green-600',
      description: 'Budgeting, saving, and entrepreneurship basics for the local economy.'
    },
    { 
      id: 'health', 
      title: 'Health & Wellness', 
      icon: <Heart />, 
      color: 'bg-red-100 text-red-600',
      description: 'Understanding nutrition, first aid, and emotional wellbeing.'
    },
    { 
      id: 'safety', 
      title: 'Emergency Response', 
      icon: <Shield />, 
      color: 'bg-orange-100 text-orange-600',
      description: 'What to do in emergencies and basic community safety.'
    },
    { 
      id: 'digital', 
      title: 'Digital Citizenship', 
      icon: <Smartphone />, 
      color: 'bg-blue-100 text-blue-600',
      description: 'Safe internet usage and building a positive digital footprint.'
    }
  ];

  const lessons = [
    { category: 'finance', title: 'Managing Pocket Money', duration: '15 min' },
    { category: 'finance', title: 'Starting a Shamba Business', duration: '25 min' },
    { category: 'health', title: 'Basic First Aid: Cuts & Scrapes', duration: '12 min' },
    { category: 'safety', title: 'Fire Safety at Home', duration: '10 min' },
    { category: 'digital', title: 'Protecting Your Privacy', duration: '20 min' },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 pb-24 md:pb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Life Skills Education</h1>
        <p className="text-gray-500">Developing essential skills for a thriving future</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <button 
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`text-left p-6 rounded-[32px] shadow-clay transition-all hover:scale-105 ${
              selectedCategory === cat.id ? 'bg-primary text-white shadow-clay-inset' : 'bg-[#e0e5ec] text-gray-800'
            }`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-sm ${
              selectedCategory === cat.id ? 'bg-white/20' : cat.color
            }`}>
              {React.cloneElement(cat.icon, { size: 24 })}
            </div>
            <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
            <p className={`text-xs leading-relaxed ${selectedCategory === cat.id ? 'text-white/80' : 'text-gray-500'}`}>
              {cat.description}
            </p>
          </button>
        ))}
      </div>

      <div className="bg-[#e0e5ec] p-8 rounded-[40px] shadow-clay">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen size={24} className="text-primary" />
          {selectedCategory ? `${categories.find(c => c.id === selectedCategory)?.title} Lessons` : 'All Life Skills Lessons'}
        </h2>
        
        <div className="space-y-4">
          {lessons
            .filter(l => !selectedCategory || l.category === selectedCategory)
            .map((lesson, i) => (
            <div 
              key={i}
              className="group bg-white/50 p-6 rounded-3xl flex items-center justify-between hover:bg-white transition-all cursor-pointer shadow-clay-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <PlayIcon />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{lesson.title}</h4>
                  <div className="text-xs text-gray-500 font-bold uppercase">{lesson.duration}</div>
                </div>
              </div>
              <ChevronRight className="text-gray-400 group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-400/20 to-blue-500/20 p-8 rounded-[40px] border border-white/40 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-white rounded-[28px] shadow-clay flex items-center justify-center text-green-500">
            <CheckCircle size={40} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Milestone Reached!</h3>
            <p className="text-gray-600">You've completed 80% of the Financial Literacy basics.</p>
          </div>
        </div>
        <button className="px-8 py-4 bg-white text-gray-800 rounded-2xl font-bold shadow-clay hover:scale-105 transition-transform">
          Claim Badge
        </button>
      </div>
    </div>
  );
};

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 3l14 9-14 9V3z" />
  </svg>
);