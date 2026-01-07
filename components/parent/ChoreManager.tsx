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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Family Economy</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-clay hover:scale-105 transition-all">
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {chores.map(chore => (
          <div key={chore.id} className="bg-white/40 rounded-[32px] p-6 shadow-clay flex flex-col justify-between border border-white/50 group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-clay-sm ${chore.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-white text-primary/40'}`}>
                {chore.status === 'completed' ? <CheckCircle /> : <Clock />}
              </div>
              <div className="flex items-center gap-1 font-bold text-yellow-600">
                <Coins size={16} /> {chore.reward}
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-gray-800 mb-1">{chore.title}</h4>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{chore.status.replace('_', ' ')}</p>
            </div>

            <div className="mt-6 flex gap-2">
              {chore.status === 'pending' ? (
                <button 
                  onClick={() => verifyChore(chore.id)}
                  className="flex-1 py-3 bg-green-500 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90"
                >
                  Verify & Reward
                </button>
              ) : (
                <div className="flex-1 py-3 bg-gray-100 text-gray-400 rounded-xl text-xs font-bold text-center">
                  {chore.status === 'completed' ? 'Reward Sent' : 'Awaiting Child'}
                </div>
              )}
              <button className="p-3 text-gray-300 hover:text-red-400 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};