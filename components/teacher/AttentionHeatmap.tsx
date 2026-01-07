"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Info, AlertTriangle } from 'lucide-react';

const mockData = Array.from({ length: 40 }, (_, i) => ({
  minute: i,
  focus: 70 + Math.random() * 25 - (i > 25 ? 20 : 0) // Drop off after 25 mins
}));

export const AttentionHeatmap: React.FC = () => {
  return (
    <div className="bg-[#e0e5ec] p-8 rounded-[40px] shadow-clay">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Class Attention Heatmap</h3>
          <p className="text-sm text-gray-500">Aggregated engagement across 12 students</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-xs font-bold">
          <AlertTriangle size={14} /> Drop-off at 26m
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData}>
            <defs>
              <linearGradient id="colorFocus" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6d5dfc" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#6d5dfc" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1d9e6" />
            <XAxis 
              dataKey="minute" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
              label={{ value: 'Lesson Duration (Minutes)', position: 'insideBottom', offset: -5, fontSize: 10, fontWeight: 'bold', fill: '#94a3b8' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '9px 9px 16px rgba(163,177,198,0.6)' }}
            />
            <Area 
              type="monotone" 
              dataKey="focus" 
              stroke="#6d5dfc" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorFocus)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 p-4 bg-white/40 rounded-2xl flex gap-3 items-center border border-white/50">
        <Info size={18} className="text-primary" />
        <p className="text-xs text-gray-600 leading-relaxed font-medium">
          <strong>Insight:</strong> Focus remains high during the VR portion (min 10-20) but declines significantly when transitioning to the long-form reading block at minute 26.
        </p>
      </div>
    </div>
  );
};