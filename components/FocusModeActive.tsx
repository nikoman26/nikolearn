import React from 'react';
import { Zap, X } from 'lucide-react';

interface FocusModeActiveProps {
  onDisable: () => void;
}

export const FocusModeActive: React.FC<FocusModeActiveProps> = ({ onDisable }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="bg-yellow-500 text-white p-3 rounded-xl shadow-xl flex items-center space-x-3 transform transition-transform duration-300 hover:scale-[1.02]">
        <Zap size={20} className="animate-pulse" />
        <span className="font-semibold text-sm whitespace-nowrap">Focus Mode Active</span>
        <button 
          onClick={onDisable}
          className="p-1 rounded-full bg-yellow-600 hover:bg-yellow-700 transition-colors"
          aria-label="Disable Focus Mode"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};