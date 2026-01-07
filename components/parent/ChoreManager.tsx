"use client";

import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, Coins, Star, Trash2 } from 'lucide-react';

interface Chore {
  id: string;
  title: string;
  reward: number;
  status: 'assigned' | 'pending' | 'completed';
}

export const ChoreManager: React.FC = () => {
  const [chores, setChores] = useState<Chore[]>([
    { id: '1', title: 'Clean the dishes', reward: 30, status: 'pending' },
    { id: '2', title: 'Explain the circulatory system to Grandma', reward: 50, status: 'assigned' }
  ]);

  const verifyChore = (id: string) => {
    setChores(chores.map(c => c.id === id ? { ...c, status: 'completed' } : c));
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">Family Economy</h3>
          <p className="text-gray-500 text-xs md:text-sm font-bold">Reward real-world helpfulness with LearnCoins</p>
        </div>
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-black shadow-clay hover:scale-105 transition-all">
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {chores.map(chore => (
          <div key={chore.id} className="bg-white/40 rounded-[32px] p-6 shadow-clay flex flex-col justify-between border border-white/50 group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-clay-sm ${chore.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-white text-primary/40'}`}>
                {chore.status === 'completed' ? <CheckCircle size={28} /> : <Clock size={28} />}
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 font-black text-yellow-600 text-lg">
                  <Coins size={18} /> {chore.reward}
                </div>
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1">Reward Value</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-black text-gray-800 text-lg md:text-xl leading-tight mb-2">{chore.title}</h4>
              <div className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                chore.status === 'completed' ? 'bg-green-100 text-green-700' : 
                chore.status === 'pending' ? 'bg-orange-100 text-orange-700 animate-pulse' : 
                'bg-gray-100 text-gray-500'
              }`}>
                {chore.status.replace('_', ' ')}
              </div>
            </div>

            <div className="flex gap-2">
              {chore.status === 'pending' ? (
                <button 
                  onClick={() => verifyChore(chore.id)}
                  className="flex-1 py-4 bg-green-500 text-white rounded-2xl text-xs md:text-sm font-black shadow-lg hover:opacity-90 active:scale-95 transition-all"
                >
                  Verify & Send LC
                </button>
              ) : (
                <div className="flex-1 py-4 bg-gray-100/50 text-gray-400 rounded-2xl text-xs md:text-sm font-black text-center border border-white/50">
                  {chore.status === 'completed' ? 'Task Successfully Completed' : 'Awaiting Student Action'}
                </div>
              )}
              <button className="p-4 text-gray-300 hover:text-red-400 transition-colors bg-white/40 rounded-2xl">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};