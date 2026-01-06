import React from 'react';
import { Brain } from 'lucide-react';

interface FocusModeIndicatorProps {
  isActive: boolean;
}

export const FocusModeIndicator: React.FC<FocusModeIndicatorProps> = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div 
      className="fixed top-20 right-4 z-45 bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-4"
      style={{ zIndex: 45 }} // Explicit z-index to ensure it's above the sidebar (z-40)
    >
      <Brain size={16} aria-hidden="true" />
      Focus Mode Active
    </div>
  );
};