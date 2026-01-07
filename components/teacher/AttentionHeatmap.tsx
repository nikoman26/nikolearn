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
    <div className="bg-[#e0e5ec] p-5 md:p-8 rounded-[32px] md:rounded-[40px] shadow-clay animate-in fade-in duration-700 border border-white/20">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h3 className="text-lg md:text-xl font-black text-gray-800">Class Attention Heatmap</h3>
          <p className="text-xs md:text-sm text-gray-500 font-bold">Aggregate engagement trends across the class</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider">
          <AlertTriangle size={14} className="flex-shrink-0" /> Focus Alert: Drop at 26m
        </div>
      </div>

      {/* Chart Container - Responsive and Fluid */}
      <div className="h-[250px] md:h-[350px] w-full -ml-4 md:ml-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              interval={4} // Reduce number of ticks on X axis for clarity
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 'bold'}}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '9px 9px 16px rgba(163,177,198,0.6)',
                backdropBlur: '10px'
              }}
              labelStyle={{ fontWeight: 'black', color: '#1f2937' }}
              itemStyle={{ fontWeight: 'bold', color: '#6d5dfc' }}
              formatter={(value: any) => [`${Math.round(value)}% Focus`, 'Avg Engagement']}
              labelFormatter={(label) => `Minute ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="focus" 
              stroke="#6d5dfc" 
              strokeWidth={4}
              fillOpacity={1} 
              fill="url(#colorFocus)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-8 p-4 md:p-6 bg-white/40 rounded-2xl md:rounded-[32px] flex flex-col sm:flex-row gap-4 items-center border border-white/50">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary flex-shrink-0">
          <Info size={24} />
        </div>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-bold">
          <span className="text-primary uppercase tracking-widest block mb-1">Mwalimu Insight</span>
          Focus remains high during the VR portion but declines significantly when transitioning to the long-form reading block. Consider breaking the reading into smaller interactive quizzes.
        </p>
      </div>
    </div>
  );
};