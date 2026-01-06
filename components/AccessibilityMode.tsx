import React, { useState, useEffect } from 'react';
import { 
  Eye, 
  Volume2, 
  VolumeX, 
  Type, 
  Palette, 
  MousePointer, 
  Brain, 
  Settings,
  CheckCircle,
  X
} from 'lucide-react';

// Neurodivergent-Friendly Learning Modes
export const AccessibilityMode: React.FC = () => {
  const [isAccessibilityMode, setIsAccessibilityMode] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Load saved preferences
  useEffect(() => {
    const saved = localStorage.getItem('nikolearn-accessibility');
    if (saved) {
      const prefs = JSON.parse(saved);
      setHighContrast(prefs.highContrast);
      setLargeText(prefs.largeText);
      setReducedMotion(prefs.reducedMotion);
      setAutoRead(prefs.autoRead);
      setFocusMode(prefs.focusMode);
      setColorBlindMode(prefs.colorBlindMode);
      setIsAccessibilityMode(prefs.isAccessibilityMode);
    }
  }, []);

  // Apply accessibility styles
  useEffect(() => {
    const root = document.documentElement;
    
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    if (reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    if (focusMode) {
      root.classList.add('focus-mode');
    } else {
      root.classList.remove('focus-mode');
    }

    if (colorBlindMode) {
      root.classList.add('colorblind-friendly');
    } else {
      root.classList.remove('colorblind-friendly');
    }
  }, [highContrast, largeText, reducedMotion, focusMode, colorBlindMode]);

  // Save preferences
  const savePreferences = () => {
    const prefs = {
      highContrast,
      largeText,
      reducedMotion,
      autoRead,
      focusMode,
      colorBlindMode,
      isAccessibilityMode
    };
    localStorage.setItem('nikolearn-accessibility', JSON.stringify(prefs));
  };

  const resetAll = () => {
    setHighContrast(false);
    setLargeText(false);
    setReducedMotion(false);
    setAutoRead(false);
    setFocusMode(false);
    setColorBlindMode(false);
    setIsAccessibilityMode(false);
    localStorage.removeItem('nikolearn-accessibility');
  };

  const accessibilityFeatures = [
    {
      id: 'high-contrast',
      name: 'High Contrast Mode',
      description: 'Enhanced contrast for better visibility',
      icon: <Palette size={20} />,
      enabled: highContrast,
      onChange: setHighContrast
    },
    {
      id: 'large-text',
      name: 'Large Text',
      description: 'Increase font size for easier reading',
      icon: <Type size={20} />,
      enabled: largeText,
      onChange: setLargeText
    },
    {
      id: 'reduced-motion',
      name: 'Reduced Motion',
      description: 'Minimize animations and transitions',
      icon: <MousePointer size={20} />,
      enabled: reducedMotion,
      onChange: setReducedMotion
    },
    {
      id: 'auto-read',
      name: 'Auto Read Aloud',
      description: 'Automatically read content aloud',
      icon: <Volume2 size={20} />,
      enabled: autoRead,
      onChange: setAutoRead
    },
    {
      id: 'focus-mode',
      name: 'Focus Mode',
      description: 'Hide distractions, show only essential content',
      icon: <Brain size={20} />,
      enabled: focusMode,
      onChange: setFocusMode
    },
    {
      id: 'colorblind',
      name: 'Colorblind Friendly',
      description: 'Use patterns and textures instead of colors',
      icon: <Eye size={20} />,
      enabled: colorBlindMode,
      onChange: setColorBlindMode
    }
  ];

  const hasAnyFeatureEnabled = accessibilityFeatures.some(feature => feature.enabled);

  return (
    <>
      {/* Accessibility Toggle Button */}
      <button
        onClick={() => {
          setIsAccessibilityMode(!isAccessibilityMode);
          if (!isAccessibilityMode) {
            setShowSettings(true);
          }
        }}
        className={`fixed top-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all ${
          hasAnyFeatureEnabled || isAccessibilityMode
            ? 'bg-primary text-white' 
            : 'bg-white text-gray-600 hover:bg-gray-100'
        }`}
        title="Accessibility Settings"
      >
        <Settings size={20} />
      </button>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center gap-3">
                <Brain className="text-primary" size={24} />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Accessibility Settings</h2>
                  <p className="text-sm text-gray-600">Customize your learning experience</p>
                </div>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Features Grid */}
            <div className="p-6 space-y-4">
              {accessibilityFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    feature.enabled 
                      ? 'border-primary bg-primary/5' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-lg ${
                        feature.enabled ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {feature.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{feature.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      </div>
                    </div>
                    
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={feature.enabled}
                        onChange={(e) => {
                          feature.onChange(e.target.checked);
                          savePreferences();
                        }}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3 p-6 border-t bg-gray-50">
              <button
                onClick={resetAll}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                Reset All
              </button>
              <button
                onClick={() => {
                  savePreferences();
                  setShowSettings(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Focus Mode Indicator */}
      {focusMode && (
        <div className="fixed top-16 right-4 z-40 bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
          <Brain size={16} />
          Focus Mode Active
        </div>
      )}

      {/* Auto Read Indicator */}
      {autoRead && (
        <div className="fixed bottom-4 right-4 z-40 bg-green-600 text-white p-3 rounded-full">
          <Volume2 size={20} />
        </div>
      )}

      {/* CSS Classes for Dynamic Styling */}
      <style jsx>{`
        :global(.high-contrast) {
          filter: contrast(150%) brightness(110%);
        }
        
        :global(.high-contrast *) {
          border-color: #000 !important;
        }
        
        :global(.large-text) {
          font-size: 1.25em;
        }
        
        :global(.large-text h1) {
          font-size: 2.5em;
        }
        
        :global(.large-text h2) {
          font-size: 2em;
        }
        
        :global(.large-text h3) {
          font-size: 1.75em;
        }
        
        :global(.reduced-motion *) {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        :global(.focus-mode .sidebar) {
          display: none;
        }
        
        :global(.focus-mode .nav) {
          display: none;
        }
        
        :global(.colorblind-friendly .text-primary) {
          background: repeating-linear-gradient(
            45deg,
            #3b82f6,
            #3b82f6 10px,
            #1e40af 10px,
            #1e40af 20px
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        :global(.colorblind-friendly .bg-primary) {
          background: repeating-linear-gradient(
            45deg,
            #3b82f6,
            #3b82f6 10px,
            #1e40af 10px,
            #1e40af 20px
          ) !important;
        }
      `}</style>
    </>
  );
};

export default AccessibilityMode;
