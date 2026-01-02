import React, { useEffect, useState, useRef } from 'react';
import { Eye, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

// Privacy-First Attention Monitoring System
export const AttentionMonitor: React.FC = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [attentionLevel, setAttentionLevel] = useState<number>(100);
  const [isPrivacyMode, setIsPrivacyMode] = useState(true);
  const [breakReminders, setBreakReminders] = useState(true);
  const [userConsent, setUserConsent] = useState<boolean | null>(null);
  
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
    const consent = confirm(
      'NIKOlearn wants to use your camera to monitor your attention level for better learning. ' +
      'Your privacy is protected - no video is stored or shared. You can revoke this permission anytime. ' +
      'Do you consent to camera-based attention monitoring?'
    );
    setUserConsent(consent);
  };

  const startAttentionTracking = async () => {
    try {
      // Request camera access with privacy mode
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

      // Start attention tracking (simulated - in real app use ML)
      attentionIntervalRef.current = setInterval(() => {
        simulateAttentionTracking();
      }, 3000);

    } catch (error) {
      console.error('Camera access denied:', error);
      setIsMonitoring(false);
    }
  };

  const simulateAttentionTracking = () => {
    // Simulate attention level changes (in real app, use computer vision)
    const baseLevel = 85;
    const variation = Math.random() * 30 - 15; // -15 to +15
    const newLevel = Math.max(0, Math.min(100, baseLevel + variation));
    
    setAttentionLevel(newLevel);

    // Show break reminder if attention is low
    if (newLevel < 50 && breakReminders) {
      showBreakReminder();
    }
  };

  const showBreakReminder = () => {
    const shouldBreak = confirm(
      'Your attention level seems low. Would you like to take a 5-minute break? ' +
      'This helps improve learning effectiveness.'
    );
    
    if (shouldBreak) {
      setIsMonitoring(false);
      // In real app, this would trigger a break timer
      setTimeout(() => {
        if (userConsent) setIsMonitoring(true);
      }, 300000); // 5 minutes
    }
  };

  const stopTracking = () => {
    setIsMonitoring(false);
    
    // Stop camera stream
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
    if (attentionLevel >= 80) return <CheckCircle className="text-green-600" size={20} />;
    if (attentionLevel >= 60) return <Eye className="text-yellow-600" size={20} />;
    return <AlertTriangle className="text-red-600" size={20} />;
  };

  if (userConsent === null) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
        <Shield className="text-blue-600 mb-4" size={32} />
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Privacy-First Attention Monitoring</h3>
        <p className="text-blue-700 mb-4 text-sm">
          Help us improve your learning experience with respectful attention tracking. 
          Your privacy is completely protected.
        </p>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <CheckCircle size={16} />
            <span>No video storage or sharing</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <CheckCircle size={16} />
            <span>Real-time processing only</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <CheckCircle size={16} />
            <span>You control everything</span>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setUserConsent(false)}
            className="flex-1 px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-50"
          >
            Decline
          </button>
          <button
            onClick={() => setUserConsent(true)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Accept
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Eye size={20} className="text-primary" />
          Learning Focus Monitor
        </h3>
        
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={breakReminders}
              onChange={(e) => setBreakReminders(e.target.checked)}
              className="rounded"
            />
            Break reminders
          </label>
          
          {!isMonitoring ? (
            <button
              onClick={() => setIsMonitoring(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
            >
              Start
            </button>
          ) : (
            <button
              onClick={stopTracking}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Stop
            </button>
          )}
        </div>
      </div>

      {/* Attention Level Display */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Current Focus Level</span>
          <div className="flex items-center gap-2">
            {getAttentionIcon()}
            <span className={`text-lg font-bold ${getAttentionColor()}`}>
              {Math.round(attentionLevel)}%
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-500 ${
              attentionLevel >= 80 ? 'bg-green-500' :
              attentionLevel >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${attentionLevel}%` }}
          />
        </div>
      </div>

      {/* Privacy Notice */}
      {isPrivacyMode && (
        <div className="bg-green-50 border border-green-200 rounded p-3 mb-4">
          <div className="flex items-center gap-2 text-green-800 text-sm">
            <Shield size={16} />
            <span className="font-medium">Privacy Protected</span>
          </div>
          <p className="text-green-700 text-xs mt-1">
            Your video is processed locally and never stored or shared.
          </p>
        </div>
      )}

      {/* Hidden video element for processing */}
      <video
        ref={videoRef}
        className="hidden"
        width={320}
        height={240}
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        className="hidden"
        width={320}
        height={240}
      />

      {/* Learning Tips */}
      <div className="bg-blue-50 rounded p-3">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Focus Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Take breaks every 20-30 minutes</li>
          <li>• Ensure good lighting for better tracking</li>
          <li>• Maintain eye contact with screen</li>
          <li>• Remove distractions from your environment</li>
        </ul>
      </div>
    </div>
  );
};

export default AttentionMonitor;
