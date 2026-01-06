import React, { useState, useEffect } from 'react';
import { Move3d, Info, ZoomIn, RotateCcw, FlaskConical, Play, CheckCircle, X, Sliders, ToggleRight, RefreshCw } from 'lucide-react';

interface Experiment {
  id: string;
  title: string;
  subject: string;
  grade: number;
  description: string;
  procedures: string[];
  controls: {
    id: string;
    type: 'slider' | 'toggle' | 'button';
    label: string;
    min?: number;
    max?: number;
    step?: number;
    initialValue: number | boolean;
    unit?: string;
  }[];
}

const mockExperiments: Experiment[] = [
  {
    id: 'photosynthesis_iodine',
    title: 'Starch Test (Photosynthesis)',
    subject: 'Biology',
    grade: 6,
    description: 'Test a leaf for the presence of starch after exposure to light, proving photosynthesis occurred.',
    procedures: [
      'Boil the leaf in water to soften it.',
      'Boil the leaf in alcohol to remove chlorophyll (decolorization).',
      'Wash the leaf in cold water.',
      'Add iodine solution to the leaf.',
      'Observe the color change (blue-black indicates starch).',
    ],
    controls: [
      { id: 'light_intensity', type: 'slider', label: 'Light Intensity', min: 0, max: 100, step: 10, initialValue: 80, unit: '%' },
      { id: 'iodine_amount', type: 'slider', label: 'Iodine Amount', min: 1, max: 5, step: 1, initialValue: 3, unit: 'drops' },
      { id: 'boil_alcohol', type: 'button', label: 'Boil in Alcohol', initialValue: false },
      { id: 'chlorophyll_removed', type: 'toggle', label: 'Chlorophyll Removed', initialValue: false },
    ],
  },
  {
    id: 'acid_base_test',
    title: 'Acid-Base Indicator Test',
    subject: 'Chemistry',
    grade: 5,
    description: 'Use litmus paper to determine the pH of various household substances.',
    procedures: [
      'Prepare samples of lemon juice, soap, and water.',
      'Dip blue litmus paper into lemon juice.',
      'Dip red litmus paper into soap solution.',
      'Record observations.',
    ],
    controls: [
      { id: 'sample_ph', type: 'slider', label: 'Sample pH', min: 1, max: 14, step: 0.5, initialValue: 7 },
      { id: 'litmus_blue', type: 'toggle', label: 'Blue Litmus Ready', initialValue: true },
    ],
  },
];

export const ScienceLab: React.FC = () => {
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [controlsState, setControlsState] = useState<Record<string, number | boolean>>({});
  const [simulationOutput, setSimulationOutput] = useState<string[]>([]);

  useEffect(() => {
    if (selectedExperiment) {
      // Initialize controls state
      const initialControls: Record<string, number | boolean> = {};
      selectedExperiment.controls.forEach(control => {
        initialControls[control.id] = control.initialValue;
      });
      setControlsState(initialControls);
      setCurrentStep(0);
      setSimulationOutput([`Experiment '${selectedExperiment.title}' loaded. Ready to start.`]);
    }
  }, [selectedExperiment]);

  const handleExperimentSelect = (experiment: Experiment) => {
    setSelectedExperiment(experiment);
  };

  const handleControlChange = (id: string, value: number | boolean) => {
    setControlsState(prev => ({ ...prev, [id]: value }));
    
    // Simulate output based on control change
    if (selectedExperiment) {
      const control = selectedExperiment.controls.find(c => c.id === id);
      if (control?.type === 'slider') {
        setSimulationOutput(prev => [...prev, `[Control] ${control.label} set to ${value}${control.unit || ''}.`]);
      } else if (control?.type === 'toggle') {
        setSimulationOutput(prev => [...prev, `[Control] ${control.label} toggled ${value ? 'ON' : 'OFF'}.`]);
      } else if (control?.type === 'button') {
        setSimulationOutput(prev => [...prev, `[Action] Executing: ${control.label}.`]);
        // Reset button state immediately after action
        setTimeout(() => setControlsState(prev => ({ ...prev, [id]: false })), 100);
      }
    }
  };

  const handleNextStep = () => {
    if (!selectedExperiment) return;
    
    // Simulate procedure execution and output
    const stepText = selectedExperiment.procedures[currentStep];
    setSimulationOutput(prev => [...prev, `[Procedure ${currentStep + 1}] Executing: ${stepText}`]);
    
    // Simulate result/feedback
    if (selectedExperiment.id === 'photosynthesis_iodine' && currentStep === 4) {
      const intensity = controlsState['light_intensity'] as number;
      const chlorophyllRemoved = controlsState['chlorophyll_removed'] as boolean;
      
      if (intensity > 50 && chlorophyllRemoved) {
        setSimulationOutput(prev => [...prev, `[Result] Observation: Leaf turned blue-black. Starch is present! (Success)`]);
      } else {
        setSimulationOutput(prev => [...prev, `[Result] Observation: Leaf remained brown/yellow. Starch is absent. (Check controls)`]);
      }
    }

    if (currentStep < selectedExperiment.procedures.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setSimulationOutput(prev => [...prev, `[Experiment Complete] Final results recorded.`]);
    }
  };

  const handleReset = () => {
    if (selectedExperiment) {
      handleExperimentSelect(selectedExperiment); // Re-initialize
    } else {
      setCurrentStep(0);
      setControlsState({});
      setSimulationOutput([]);
    }
  };

  const renderControl = (control: Experiment['controls'][0]) => {
    const value = controlsState[control.id];
    
    if (control.type === 'slider') {
      return (
        <div key={control.id} className="p-4 bg-[#d1d9e6] rounded-2xl shadow-clay-inset">
          <label className="text-sm font-bold text-gray-700 block mb-2">{control.label}</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={value as number}
              onChange={(e) => handleControlChange(control.id, parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer range-lg"
            />
            <span className="text-sm font-bold text-primary whitespace-nowrap">
              {value}{control.unit}
            </span>
          </div>
        </div>
      );
    }

    if (control.type === 'toggle') {
      return (
        <div key={control.id} className="p-4 bg-[#d1d9e6] rounded-2xl shadow-clay-inset flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700">{control.label}</label>
          <button
            onClick={() => handleControlChange(control.id, !value)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              value ? 'bg-green-500' : 'bg-gray-400'
            }`}
          >
            <span
              className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                value ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      );
    }
    
    if (control.type === 'button') {
      return (
        <button
          key={control.id}
          onClick={() => handleControlChange(control.id, true)}
          disabled={value as boolean}
          className={`w-full py-3 rounded-2xl font-bold text-sm transition-all shadow-clay ${
            value 
              ? 'bg-gray-400 text-white cursor-not-allowed' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {control.label}
        </button>
      );
    }
    return null;
  };

  return (
    <div className="h-full w-full flex flex-col p-4 pb-24 md:pb-4 overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Virtual Science Lab</h2>
          <p className="text-sm text-gray-500">Interactive experiments aligned with CBC curriculum</p>
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-clay hover:scale-105 transition-transform flex items-center gap-2">
          <Move3d size={16} />
          Enter VR Mode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        
        {/* Column 1: Experiment Selection & Procedure */}
        <div className="lg:col-span-1 flex flex-col space-y-6 overflow-y-auto custom-scrollbar">
          
          {/* Experiment Selector */}
          <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FlaskConical size={20} className="text-primary" />
              Select Experiment
            </h3>
            <div className="space-y-3">
              {mockExperiments.map(exp => (
                <button
                  key={exp.id}
                  onClick={() => handleExperimentSelect(exp)}
                  className={`w-full p-4 rounded-2xl text-left transition-all ${
                    selectedExperiment?.id === exp.id
                      ? 'bg-primary text-white shadow-clay-inset'
                      : 'bg-[#d1d9e6] text-gray-700 shadow-clay hover:bg-white/50'
                  }`}
                >
                  <span className="font-bold block">{exp.title}</span>
                  <span className="text-xs opacity-80">{exp.subject} (Grade {exp.grade})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Procedure Guide */}
          {selectedExperiment && (
            <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                Procedure Steps
              </h3>
              <ol className="space-y-3 list-decimal pl-5">
                {selectedExperiment.procedures.map((step, index) => (
                  <li 
                    key={index} 
                    className={`text-sm font-medium transition-all ${
                      index === currentStep 
                        ? 'text-primary font-bold' 
                        : index < currentStep 
                          ? 'text-green-600 line-through' 
                          : 'text-gray-600'
                    }`}
                  >
                    {step}
                  </li>
                ))}
              </ol>
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={handleNextStep}
                  disabled={currentStep >= selectedExperiment.procedures.length}
                  className="flex-1 py-3 bg-primary text-white rounded-2xl font-bold text-sm shadow-md hover:opacity-90 disabled:opacity-50"
                >
                  {currentStep >= selectedExperiment.procedures.length ? 'Finished' : `Next Step (${currentStep + 1}/${selectedExperiment.procedures.length})`}
                </button>
                <button
                  onClick={handleReset}
                  className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-clay hover:bg-red-200"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Column 2: Simulation Viewport */}
        <div className="lg:col-span-2 flex flex-col space-y-6 overflow-hidden">
          
          {/* Main Viewport (Simulating 3D Canvas) */}
          <div className="flex-1 rounded-[32px] bg-[#d1d9e6] shadow-clay-inset relative overflow-hidden flex items-center justify-center group min-h-[300px]">
            {selectedExperiment ? (
              <div className="text-center p-8">
                <FlaskConical size={64} className="mx-auto mb-4 text-primary/50" />
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedExperiment.title} Simulation
                </h3>
                <p className="text-gray-600">
                  Adjust controls and click 'Next Step' to run the procedure.
                </p>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <FlaskConical size={64} className="mx-auto mb-4" />
                <p className="text-lg">Select an experiment to begin.</p>
              </div>
            )}
          </div>

          {/* Simulation Controls */}
          {selectedExperiment && (
            <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Sliders size={20} className="text-blue-500" />
                Experiment Controls
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedExperiment.controls.map(renderControl)}
              </div>
            </div>
          )}
        </div>
        
        {/* Column 3 (Hidden on small screens): Output Console */}
        <div className="lg:col-span-3 xl:col-span-1 flex flex-col space-y-6 overflow-y-auto custom-scrollbar">
          {/* Output Console */}
          <div className="bg-gray-800 rounded-3xl p-6 shadow-2xl text-white flex flex-col h-48 lg:h-full">
            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
              <Play size={18} />
              Simulation Output
            </h3>
            <div className="flex-1 overflow-y-auto text-xs space-y-1 font-mono custom-scrollbar">
              {simulationOutput.map((line, index) => (
                <p key={index} className={line.includes('[Result]') ? 'text-yellow-300' : 'text-gray-300'}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};