"use client";

import React, { useState } from 'react';
import { Plus, Trash2, Video, Brain, BookOpen, Layers, Save, CheckCircle } from 'lucide-react';

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
    <div className="bg-[#e0e5ec] p-8 rounded-[40px] shadow-clay animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">CBC Lesson Architect</h2>
          <p className="text-gray-500">Design interactive learning experiences</p>
        </div>
        <div className="flex gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-clay ${step >= 1 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>1</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-clay ${step >= 2 ? 'bg-primary text-white' : 'bg-white text-gray-400'}`}>2</div>
        </div>
      </div>

      {step === 1 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-2">Lesson Title</label>
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Human Circulatory System"
                className="w-full h-14 px-6 bg-[#e0e5ec] shadow-clay-inset rounded-2xl focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-600 ml-2">KICD Strand</label>
              <select 
                value={strand}
                onChange={(e) => setStrand(e.target.value)}
                className="w-full h-14 px-6 bg-[#e0e5ec] shadow-clay-inset rounded-2xl focus:outline-none appearance-none"
              >
                <option value="">Select a Strand...</option>
                <option value="living_things">Living Things and Their Environment</option>
                <option value="energy">Matter and Energy</option>
              </select>
            </div>
          </div>
          <button 
            onClick={() => setStep(2)}
            disabled={!title || !strand}
            className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-clay-primary hover:opacity-90 transition-all disabled:opacity-50"
          >
            Start Building Content
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            <button onClick={() => addBlock('video')} className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-2xl shadow-clay hover:bg-white transition-all min-w-[100px]">
              <Video className="text-blue-500" />
              <span className="text-xs font-bold">Video</span>
            </button>
            <button onClick={() => addBlock('vr_lab')} className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-2xl shadow-clay hover:bg-white transition-all min-w-[100px]">
              <Layers className="text-purple-500" />
              <span className="text-xs font-bold">VR Lab</span>
            </button>
            <button onClick={() => addBlock('quiz')} className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-2xl shadow-clay hover:bg-white transition-all min-w-[100px]">
              <Brain className="text-green-500" />
              <span className="text-xs font-bold">Quiz</span>
            </button>
            <button onClick={() => addBlock('text')} className="flex flex-col items-center gap-2 p-4 bg-white/50 rounded-2xl shadow-clay hover:bg-white transition-all min-w-[100px]">
              <BookOpen className="text-orange-500" />
              <span className="text-xs font-bold">Text</span>
            </button>
          </div>

          <div className="space-y-4">
            {blocks.map((block, idx) => (
              <div key={block.id} className="p-6 bg-white/40 rounded-3xl shadow-clay flex gap-4 items-start border border-white/50">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">{idx + 1}</div>
                <div className="flex-1 space-y-4">
                  <h4 className="font-bold text-gray-700 capitalize">{block.type.replace('_', ' ')} Block</h4>
                  <textarea 
                    placeholder={`Paste ${block.type} URL or content here...`}
                    className="w-full h-24 p-4 bg-[#e0e5ec] shadow-clay-inset rounded-xl focus:outline-none text-sm"
                  />
                </div>
                <button onClick={() => removeBlock(block.id)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
            
            {blocks.length === 0 && (
              <div className="text-center py-12 border-4 border-dashed border-gray-300 rounded-[40px]">
                <p className="text-gray-400 font-bold">Your lesson is empty. Add blocks above to begin.</p>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="flex-1 py-4 bg-white text-gray-600 rounded-2xl font-bold shadow-clay">Back</button>
            <button className="flex-[2] py-4 bg-primary text-white rounded-2xl font-bold shadow-clay-primary flex items-center justify-center gap-2">
              <Save size={20} /> Save & Publish Lesson
            </button>
          </div>
        </div>
      )}
    </div>
  );
};