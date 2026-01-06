import React, { useEffect, useState, useRef } from 'react';
import { Eye, Shield, AlertTriangle, CheckCircle, ChevronDown, ChevronUp, Brain } from 'lucide-react';

// Privacy-First Attention Monitoring System
export const AttentionMonitor: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [attentionLevel, setAttentionLevel] = useState<number>(100);
  const [isPrivacyMode, setIsPrivacyMode] = useState(true);
  const [breakReminders, setBreakReminders] = useState(true);
  const [userConsent, setUserConsent] = useState<boolean | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to collapsed for better UX
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const attentionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (userConsent === false) {
      setIsMonitoring(false);
      return;
    }

    if (isMonitoring && userConsent === true) {
      startAttentionTracking();
    }

    return () => {
      if (attentionIntervalRef.current) {
        clearInterval(attentionIntervalRef.current);
      }
    };
  }, [isMonitoring, userConsent]);

  const requestConsent = () => {
    setUserConsent(true);
  };

  const startAttentionTracking = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 320 },
          height: { ideal: 240 }
        } 
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }

      attentionIntervalRef.current = setInterval(() => {
        simulateAttentionTracking();
      }, 3000);

    } catch (error) {
      console.error('Camera access denied:', error);
      setIsMonitoring(false);
    }
  };

  const simulateAttentionTracking = () => {
    const baseLevel = 85;
    const variation = Math.random() * 30 - 15;
    const newLevel = Math.max(0, Math.min(100, baseLevel + variation));
    
    setAttentionLevel(newLevel);

    if (newLevel < 50 && breakReminders) {
      // In real app, avoid native confirm if possible, use UI toast
      console.log('Low attention detected');
    }
  };

  const stopTracking = () => {
    setIsMonitoring(false);
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    if (attentionIntervalRef.current) {
      clearInterval(attentionIntervalRef.current);
    }
  };

  const getAttentionColor = () => {
    if (attentionLevel >= 80) return 'text-green-600';
    if (attentionLevel >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttentionIcon = () => {
    if (attentionLevel >= 80) return <CheckCircle className="text-green-600" size={18} />;
    if (attentionLevel >= 60) return <Eye className="text-yellow-600" size={18} />;
    return <AlertTriangle className="text-red-600" size={18} />;
  };

  if (userConsent === null) {
    return (
      <div className="bg-white border-2 border-primary/20 rounded-3xl p-5 shadow-clay max-w-[320px] sm:max-w-md">
        <div className="flex items-center gap-3 mb-3">
          <Shield className="text-primary" size={24} />
          <h3 className="font-bold text-gray-800">Privacy-First Focus</h3>
        </div>
        <p className="text-gray-600 mb-4 text-xs leading-relaxed">
          NIKOlearn uses respectful camera tracking to help you stay focused. 
          No video is stored.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setUserConsent(false)}
            className="flex-1 px-3 py-2 text-xs font-bold text-gray-500 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={() => setUserConsent(true)}
            className="flex-1 px-3 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-clay-sm hover:scale-105 transition-transform"
          >
            Accept
          </button>
        </div>
      </div>
    );
  }

  // Collapsed View (Mini Badge)
  if (isCollapsed) {
    return (
      <button 
        onClick={() => setIsCollapsed(false)}
        className="bg-white rounded-2xl shadow-clay border border-primary/10 p-3 flex items-center gap-3 hover:scale-105 transition-all group"
      >
        <div className={`p-2 rounded-xl bg-[#e0e5ec] ${isMonitoring ? 'text-primary' : 'text-gray-400'}`}>
          <Brain size={20} className={isMonitoring ? 'animate-pulse' : ''} />
        </div>
        <div className="flex flex-col items-start pr-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider leading-none">Focus</span>
          <span className={`text-sm font-bold ${getAttentionColor()}`}>{Math.round(attentionLevel)}%</span>
        </div>
        <ChevronUp size={16} className="text-gray-400 group-hover:text-primary" />
      </button>
    );
  }

  // Expanded View
  return (
    <div className="bg-[#e0e5ec] rounded-3xl p-5 shadow-clay border border-primary/5 w-[280px] sm:w-[320px] transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
          <Brain size={18} className="text-primary" />
          Focus Monitor
        </h3>
        <button 
          onClick={() => setIsCollapsed(true)}
          className="p-1 hover:bg-white/50 rounded-lg text-gray-400 hover:text-primary transition-colors"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Status & Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isMonitoring ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-xs font-bold text-gray-600">{isMonitoring ? 'Monitoring' : 'Inactive'}</span>
          </div>
          <button
            onClick={() => isMonitoring ? stopTracking() : setIsMonitoring(true)}
            className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
              isMonitoring ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'
            }`}
          >
            {isMonitoring ? 'Stop' : 'Start'}
          </button>
        </div>

        {/* Level Display */}
        <div className="bg-white/50 rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Attention Score</span>
            <div className="flex items-center gap-1">
              {getAttentionIcon()}
              <span className={`text-sm font-bold ${getAttentionColor()}`}>{Math.round(attentionLevel)}%</span>
            </div>
          </div>
          <div className="w-full bg-[#d1d9e6] rounded-full h-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                attentionLevel >= 80 ? 'bg-green-500' :
                attentionLevel >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${attentionLevel}%` }}
            />
          </div>
        </div>

        {/* Settings Toggle */}
        <label className="flex items-center gap-2 cursor-pointer group">
          <input
            type="checkbox"
            checked={breakReminders}
            onChange={(e) => setBreakReminders(e.target.checked)}
            className="w-4 h-4 rounded-lg border-2 border-primary/20 checked:bg-primary transition-all cursor-pointer"
          />
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider group-hover:text-primary transition-colors">Break Reminders</span>
        </label>
      </div>

      {/* Hidden processing elements */}
      <video ref={videoRef} className="hidden" width={320} height={240} autoPlay muted />
      <canvas ref={canvasRef} className="hidden" width={320} height={240} />
    </div>
  );
};

export default AttentionMonitor;