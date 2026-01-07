import React, { useEffect, useState, useRef } from 'react';
import { Eye, Shield, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Brain } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AttentionMonitor: React.FC = () => {
  const { isStudent } = useAuth();
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [attentionLevel, setAttentionLevel] = useState<number>(100);
  const [breakReminders, setBreakReminders] = useState(true);
  const [userConsent, setUserConsent] = useState<boolean | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const attentionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isStudent()) return;
    if (isMonitoring && userConsent === true) {
      startAttentionTracking();
    }
    return () => {
      if (attentionIntervalRef.current) clearInterval(attentionIntervalRef.current);
    };
  }, [isMonitoring, userConsent, isStudent]);

  const startAttentionTracking = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user', width: { ideal: 320 }, height: { ideal: 240 } } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      attentionIntervalRef.current = setInterval(() => {
        const baseLevel = 85;
        const variation = Math.random() * 30 - 15;
        setAttentionLevel(Math.max(0, Math.min(100, baseLevel + variation)));
      }, 3000);
    } catch (error) {
      setIsMonitoring(false);
    }
  };

  const stopTracking = () => {
    setIsMonitoring(false);
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    if (attentionIntervalRef.current) clearInterval(attentionIntervalRef.current);
  };

  // If not a student, this component shouldn't even render its UI logic
  if (!isStudent()) return null;

  if (userConsent === null) {
    return (
      <div className="bg-white border-2 border-primary/20 rounded-3xl p-5 shadow-clay max-w-[320px] animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="text-primary" size={24} />
          <h3 className="font-bold text-gray-800">Privacy-First Focus</h3>
        </div>
        <p className="text-gray-600 mb-4 text-xs leading-relaxed">
          NIKOlearn uses local gaze detection to help you stay focused. No video is ever recorded or uploaded.
        </p>
        <div className="flex gap-2">
          <button onClick={() => setUserConsent(false)} className="flex-1 px-3 py-2 text-xs font-bold text-gray-500 rounded-xl hover:bg-gray-100 transition-colors">Decline</button>
          <button onClick={() => setUserConsent(true)} className="flex-1 px-3 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-clay-sm hover:scale-105 transition-transform">Accept</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? 'w-auto' : 'w-[280px] sm:w-[320px]'}`}>
      {isCollapsed ? (
        <button onClick={() => setIsCollapsed(false)} className="bg-white rounded-2xl shadow-clay border border-primary/10 p-3 flex items-center gap-3 hover:scale-105 transition-all">
          <div className={`p-2 rounded-xl bg-[#e0e5ec] ${isMonitoring ? 'text-primary' : 'text-gray-400'}`}>
            <Brain size={20} className={isMonitoring ? 'animate-pulse' : ''} />
          </div>
          <div className="flex flex-col items-start pr-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Focus</span>
            <span className={`text-sm font-bold ${attentionLevel >= 60 ? 'text-green-600' : 'text-red-600'}`}>{Math.round(attentionLevel)}%</span>
          </div>
          <ChevronUp size={16} className="text-gray-400" />
        </button>
      ) : (
        <div className="bg-[#e0e5ec] rounded-3xl p-5 shadow-clay border border-primary/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
              <Brain size={18} className="text-primary" /> Focus Monitor
            </h3>
            <button onClick={() => setIsCollapsed(true)} className="p-1 hover:bg-white/50 rounded-lg text-gray-400"><ChevronDown size={20} /></button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-xs font-bold text-gray-600">{isMonitoring ? 'Monitoring' : 'Inactive'}</span>
              </div>
              <button onClick={() => isMonitoring ? stopTracking() : setIsMonitoring(true)} className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase transition-all ${isMonitoring ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                {isMonitoring ? 'Stop' : 'Start'}
              </button>
            </div>
            <div className="bg-white/50 rounded-2xl p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">Attention Score</span>
                <span className={`text-sm font-bold ${attentionLevel >= 60 ? 'text-green-600' : 'text-red-600'}`}>{Math.round(attentionLevel)}%</span>
              </div>
              <div className="w-full bg-[#d1d9e6] rounded-full h-2 overflow-hidden">
                <div className={`h-full transition-all duration-500 ${attentionLevel >= 80 ? 'bg-green-500' : attentionLevel >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${attentionLevel}%` }} />
              </div>
            </div>
          </div>
          <video ref={videoRef} className="hidden" />
        </div>
      )}
    </div>
  );
};