"use client";

import React, { useState } from 'react';
import { Eye, MousePointer, Brain, Volume2, Save, Sparkles } from 'lucide-react';

export const SensorySettings: React.FC = () => {
  const [prefs, setPrefs] = useState({
    reduced_motion: false,
    high_contrast: false,
    simplified_layout: true,
    auto_read: false
  });

  const toggle = (key: keyof typeof prefs) => {
    setPrefs({ ...prefs, [key]: !prefs[key] });
  };

  return (
    <div className="bg-[#e0e5ec] p-8 rounded-[40px] shadow-clay border border-white/50">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-clay-sm">
          <Sparkles />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">Sensory Learning Profile</h3>
          <p className="text-sm text-gray-500">Configure your child's visual environment</p>
        </div>
      </div>

      <div className="space-y-4">
        <SettingToggle 
          icon={<MousePointer />} 
          label="Reduced Motion" 
          desc="Minimize animations to prevent sensory overload" 
          active={prefs.reduced_motion} 
          onToggle={() => toggle('reduced_motion')}
        />
        <SettingToggle 
          icon={<Eye />} 
          label="High Contrast" 
          desc="Make text and buttons stand out more" 
          active={prefs.high_contrast} 
          onToggle={() => toggle('high_contrast')}
        />
        <SettingToggle 
          icon={<Brain />} 
          label="Simplified Layout" 
          desc="Hide sidebars and non-essential widgets" 
          active={prefs.simplified_layout} 
          onToggle={() => toggle('simplified_layout')}
        />
        <SettingToggle 
          icon={<Volume2 />} 
          label="Auto Read-Aloud" 
          desc="Automatically read lesson text using AI voice" 
          active={prefs.auto_read} 
          onToggle={() => toggle('auto_read')}
        />
      </div>

      <button className="w-full mt-8 py-4 bg-primary text-white rounded-2xl font-bold shadow-clay-primary flex items-center justify-center gap-2 hover:opacity-90 transition-all">
        <Save size={20} /> Update Learning Profile
      </button>
    </div>
  );
};

const SettingToggle = ({ icon, label, desc, active, onToggle }: any) => (
  <button 
    onClick={onToggle}
    className={`w-full p-6 rounded-3xl flex items-center justify-between transition-all ${active ? 'bg-white/60 shadow-clay-inset border-2 border-primary/20' : 'bg-white/20 shadow-clay hover:bg-white/30'}`}
  >
    <div className="flex items-center gap-4 text-left">
      <div className={`p-3 rounded-xl ${active ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div>
        <div className="font-bold text-gray-800">{label}</div>
        <p className="text-[10px] text-gray-500 font-bold uppercase">{desc}</p>
      </div>
    </div>
    <div className={`w-12 h-6 rounded-full relative transition-colors ${active ? 'bg-primary' : 'bg-gray-300'}`}>
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
    </div>
  </button>
);