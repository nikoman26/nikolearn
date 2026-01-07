"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Video, Brain, BookOpen, Layers, Save, CheckCircle, ChevronLeft } from 'lucide-react';

interface ContentBlock {
  id: string;
  type: 'video' | 'vr_lab' | 'quiz' | 'text';
  content: string;
}

export const LessonArchitect: React.FC = () => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [strand, setStrand] = useState('');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: ''
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  return (
    <div className="bg-[#e0e5ec] p-5 md:p-8 rounded-[32px] md:rounded-[40px] shadow-clay animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">CBC Lesson Architect</h2>
          <p className="text-xs md:text-sm text-gray-500">Design interactive learning experiences</p>
        </div>
        <div className="flex gap-4">
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-clay ${step >= 1 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>1</div>
          <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-clay ${step >= 2 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>2</div>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-bold text-gray-600 ml-2">Lesson Title</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Human Circulatory System"
                className="w-full h-12 md:h-14 px-5 bg-[#e0e5ec] shadow-clay-inset rounded-xl md:rounded-2xl focus:outline-none text-sm"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs md:text-sm font-bold text-gray-600 ml-2">KICD Strand</label>
              <div className="relative">
                <select 
                  value={strand}
                  onChange={(e) => setStrand(e.target.value)}
                  className="w-full h-12 md:h-14 px-5 bg-[#e0e5ec] shadow-clay-inset rounded-xl md:rounded-2xl focus:outline-none appearance-none text-sm"
                >
                  <option value="">Select a Strand...</option>
                  <option value="living_things">Living Things and Their Environment</option>
                  <option value="energy">Matter and Energy</option>
                </select>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setStep(2)}
            disabled={!title || !strand}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-clay-primary hover:opacity-90 transition-all disabled:opacity-50 text-sm md:text-base"
          >
            Start Building Content
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Mobile-Friendly Block Types Picker */}
          <div className="flex gap-4 overflow-x-auto pb-6 -mx-2 px-2 scrollbar-hide">
            <BlockTypeButton icon={<Video />} label="Video" color="text-blue-500" onClick={() => addBlock('video')} />
            <BlockTypeButton icon={<Layers />} label="VR Lab" color="text-purple-500" onClick={() => addBlock('vr_lab')} />
            <BlockTypeButton icon={<Brain />} label="Quiz" color="text-green-500" onClick={() => addBlock('quiz')} />
            <BlockTypeButton icon={<BookOpen />} label="Text" color="text-orange-500" onClick={() => addBlock('text')} />
          </div>

          <div className="space-y-6">
            {blocks.map((block, idx) => (
              <div key={block.id} className="p-4 md:p-6 bg-white/40 rounded-2xl md:rounded-3xl shadow-clay flex flex-col sm:flex-row gap-4 items-start border border-white/50">
                <div className="flex items-center justify-between w-full sm:w-auto">
                   <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">{idx + 1}</div>
                   <button onClick={() => removeBlock(block.id)} className="sm:hidden p-2 text-red-400">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex-1 space-y-3 w-full">
                  <h4 className="font-bold text-gray-700 capitalize text-sm">{block.type.replace('_', ' ')} Block</h4>
                  <textarea 
                    placeholder={`Paste ${block.type} content...`}
                    className="w-full h-24 p-4 bg-[#e0e5ec] shadow-clay-inset rounded-xl focus:outline-none text-sm"
                  />
                </div>
                <button onClick={() => removeBlock(block.id)} className="hidden sm:block p-2 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            
            {blocks.length === 0 && (
              <div className="text-center py-10 md:py-16 border-4 border-dashed border-gray-300 rounded-[32px] md:rounded-[40px]">
                <p className="text-gray-400 font-bold px-4 text-sm md:text-base">Your lesson is empty. Tap an icon above to add content.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button onClick={() => setStep(1)} className="order-2 sm:order-1 flex-1 py-4 bg-white text-gray-600 rounded-2xl font-bold shadow-clay text-sm flex items-center justify-center gap-2">
              <ChevronLeft size={18} /> Back
            </button>
            <button className="order-1 sm:order-2 flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-clay-primary flex items-center justify-center gap-2 hover:opacity-90 transition-all text-sm md:text-base">
              <Save size={18} md:size={20} /> Save & Publish Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const BlockTypeButton = ({ icon, label, color, onClick }: any) => (
  <button 
    onClick={onClick} 
    className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-2xl shadow-clay hover:bg-white transition-all min-w-[90px] md:min-w-[100px] flex-shrink-0"
  >
    <div className={color}>{React.cloneElement(icon, { size: 22 })}</div>
    <span className="text-[10px] md:text-xs font-bold">{label}</span>
  </button>
);