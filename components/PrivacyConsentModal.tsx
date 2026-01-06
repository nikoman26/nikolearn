import React, { useState } from 'react';
import { Lock, X } from 'lucide-react';

export const PrivacyConsentModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ zIndex: 60 }} // Highest z-index for modal overlay
    >
      <div className="bg-[#f8f9fb] rounded-3xl p-8 w-full max-w-md shadow-2xl border border-white/50 animate-in zoom-in-95 duration-300">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto mb-4">
          <Lock size={24} />
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">Privacy & Data Consent</h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          We use secure, anonymized data to personalize your learning experience. Please review our updated privacy policy.
        </p>
        
        <div className="space-y-3">
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-clay-primary hover:bg-primary/90 transition-all active:scale-[0.98]"
          >
            Accept & Continue
          </button>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-gray-600 font-semibold rounded-xl hover:bg-white/50 transition-colors"
          >
            Review Policy
          </button>
        </div>
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};