import React, { useState } from 'react';
import { Move3d, Info, ZoomIn, RotateCcw } from 'lucide-react';

export const ScienceLab: React.FC = () => {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  return (
    <div className="h-full w-full flex flex-col p-4 pb-24 md:pb-4 overflow-hidden">
      
      {/* VR Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Virtual Science Lab</h2>
          <p className="text-sm text-gray-500">Subject: Photosynthesis (Grade 5)</p>
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-clay hover:scale-105 transition-transform flex items-center gap-2">
          <Move3d size={16} />
          Enter VR Mode
        </button>
      </div>

      {/* Main Viewport (Simulating 3D Canvas) */}
      <div className="flex-1 rounded-[32px] bg-[#d1d9e6] shadow-clay-inset relative overflow-hidden flex items-center justify-center group">
        
        {/* Simulated 3D Environment Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-green-100 opacity-50"></div>
        <div className="absolute bottom-0 w-full h-1/3 bg-[#a5b4c9] opacity-30 blur-xl transform scale-150 rotate-3"></div>

        {/* The "3D" Object - Using CSS Transforms to simulate a Plant Pot */}
        <div className="relative w-64 h-80 transition-transform duration-700 hover:scale-110 cursor-grab active:cursor-grabbing">
          
          {/* Plant Leaves (CSS Art) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40">
             <div className="absolute top-10 left-0 w-20 h-20 bg-green-500 rounded-full rounded-tr-none rotate-45 shadow-lg transform origin-bottom-right hover:rotate-[50deg] transition-transform"></div>
             <div className="absolute top-10 right-0 w-20 h-20 bg-green-600 rounded-full rounded-tl-none -rotate-45 shadow-lg transform origin-bottom-left hover:-rotate-[50deg] transition-transform"></div>
             <div className="absolute -top-4 left-10 w-20 h-20 bg-green-400 rounded-full rounded-br-none rotate-12 shadow-lg z-10"></div>
          </div>
          
          {/* Stem */}
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-4 h-24 bg-green-800 rounded-full shadow-inner"></div>

          {/* Pot */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-32 bg-orange-700 rounded-b-3xl rounded-t-lg shadow-2xl flex items-center justify-center overflow-hidden">
            <div className="w-full h-4 bg-orange-900 absolute top-0 opacity-50"></div>
            <div className="text-white/20 font-bold text-4xl rotate-90 opacity-20">NIKO</div>
          </div>
          
          {/* Interaction Hotspot */}
          <div 
             className="absolute top-10 left-10 w-8 h-8 bg-white rounded-full shadow-xl animate-pulse flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors"
             onClick={() => setActiveTool('chloroplast')}
          >
            <Info size={16} />
          </div>

        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-lg flex gap-4">
          <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors" title="Rotate">
            <RotateCcw size={20} className="text-gray-700" />
          </button>
          <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors" title="Zoom">
             <ZoomIn size={20} className="text-gray-700" />
          </button>
        </div>
      </div>

      {/* Info Panel (Contextual) */}
      <div className={`
        fixed right-4 top-24 bottom-24 w-64 bg-[#e0e5ec] rounded-3xl shadow-clay p-6 transform transition-transform duration-500 z-20
        ${activeTool ? 'translate-x-0' : 'translate-x-[120%]'}
      `}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800">Chloroplast</h3>
          <button onClick={() => setActiveTool(null)} className="p-1 rounded-full hover:bg-gray-200">
            <XIcon />
          </button>
        </div>
        <div className="h-32 bg-green-100 rounded-xl mb-4 flex items-center justify-center">
          <div className="w-16 h-16 bg-green-500 rounded-full animate-pulse opacity-50"></div>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">
          This is where photosynthesis happens! It captures sunlight and turns it into energy (sugar) for the plant.
        </p>
        <button className="mt-4 w-full py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-md hover:opacity-90">
          Ask Mwalimu More
        </button>
      </div>

    </div>
  );
};

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
