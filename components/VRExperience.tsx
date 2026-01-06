import React, { useState } from 'react';
import { X, Play, Pause, RotateCcw, Volume2, Activity, Star, CheckCircle, Clock, Award, ChevronRight, Move3d } from 'lucide-react';

interface VRModule {
  id: string;
  name: string;
  description: string;
  type: 'solar-system' | 'molecules' | 'geometry' | 'biology';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'new' | 'in-progress' | 'completed';
  objectives: string[];
  interactions: string[];
}

const mockVRModules: VRModule[] = [
  {
    id: 'solar-system',
    name: 'Solar System Explorer',
    description: 'Journey through our solar system and learn about planets, moons, and celestial bodies.',
    type: 'solar-system',
    duration: '15 mins',
    difficulty: 'beginner',
    status: 'completed',
    objectives: [
      'Identify the 8 planets in our solar system',
      'Understand the relative sizes of planets',
      'Learn about planetary orbits and distances'
    ],
    interactions: ['Planet Rotation', 'Size Comparison', 'Orbital Paths', 'Space Facts']
  },
  {
    id: 'heart_tour',
    name: 'VR Heart Tour',
    description: 'An immersive, microscopic tour inside the human heart to understand blood flow and chambers.',
    type: 'biology',
    duration: '10 mins',
    difficulty: 'intermediate',
    status: 'in-progress',
    objectives: [
      'Identify the four chambers of the heart',
      'Trace the path of blood through the circulatory system',
      'Understand the function of valves'
    ],
    interactions: ['Chamber Identification', 'Blood Flow Simulation', 'Valve Interaction']
  },
  {
    id: 'geometry',
    name: '3D Geometry Lab',
    description: 'Visualize and manipulate 3D geometric shapes to understand their properties.',
    type: 'geometry',
    duration: '12 mins',
    difficulty: 'beginner',
    status: 'new',
    objectives: [
      'Identify 3D geometric shapes',
      'Understand properties of shapes',
      'Calculate surface area and volume'
    ],
    interactions: ['Shape Rotation', 'Dimension Adjustment', 'Property Measurement', 'Formula Application']
  }
];

export const VRExperience: React.FC = () => {
  const [isVRActive, setIsVRActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedModule, setSelectedModule] = useState<VRModule | null>(null);

  const getDifficultyColor = (difficulty: VRModule['difficulty']) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500 text-white';
      case 'intermediate': return 'bg-yellow-500 text-gray-800';
      case 'advanced': return 'bg-red-500 text-white';
    }
  };

  const getStatusColor = (status: VRModule['status']) => {
    switch (status) {
      case 'completed': return 'text-green-500';
      case 'in-progress': return 'text-blue-500';
      case 'new': return 'text-gray-500';
    }
  };

  const renderModuleSelection = () => (
    <div className="h-full flex flex-col p-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Virtual Reality Hub</h2>
        <p className="text-gray-500">Step into immersive 3D learning environments.</p>
      </div>

      {/* Achievement Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard icon={<Award />} label="Modules Completed" value={mockVRModules.filter(m => m.status === 'completed').length} color="text-green-600" />
        <MetricCard icon={<Clock />} label="Time in VR" value="4.5 hrs" color="text-blue-600" />
        <MetricCard icon={<Star />} label="VR Mastery Level" value="3" color="text-yellow-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto custom-scrollbar">
        {/* Module List */}
        <div className="lg:col-span-2 space-y-4">
          {mockVRModules.map((module) => (
            <div 
              key={module.id} 
              className={`bg-[#e0e5ec] rounded-3xl p-6 shadow-clay flex items-center justify-between transition-all cursor-pointer ${
                selectedModule?.id === module.id ? 'shadow-clay-inset border-2 border-primary' : 'hover:bg-white/50'
              }`}
              onClick={() => setSelectedModule(module)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-clay-sm ${getStatusColor(module.status)} bg-white`}>
                  {module.status === 'completed' ? <CheckCircle size={24} /> : <Move3d size={24} />}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{module.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{module.duration}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getDifficultyColor(module.difficulty)}`}>
                      {module.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          ))}
        </div>

        {/* Module Details / Launch Panel */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {selectedModule ? (
            <div className="bg-white rounded-3xl p-6 shadow-clay flex-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4">{selectedModule.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedModule.description}</p>
              
              <div className="space-y-3 mb-6">
                <DetailPill label="Environment" value={selectedModule.type} />
                <DetailPill label="Status" value={selectedModule.status} color={getStatusColor(selectedModule.status)} />
                <DetailPill label="Duration" value={selectedModule.duration} />
              </div>

              <h4 className="font-semibold text-gray-800 mb-2">Key Interactions:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600 mb-6">
                {selectedModule.interactions.map((i, index) => <li key={index}>{i}</li>)}
              </ul>

              <button
                onClick={() => setIsVRActive(true)}
                className="w-full py-3 bg-primary text-white rounded-2xl font-bold text-lg shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <Play size={20} />
                Launch VR
              </button>
            </div>
          ) : (
            <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay flex-1 flex items-center justify-center text-center text-gray-500">
              <p>Select a module to view details and launch the experience.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderVRView = () => (
    <div className="fixed inset-0 bg-black text-white flex flex-col z-[100]">
      {/* VR Header */}
      <div className="p-4 flex justify-between items-center bg-black/60 backdrop-blur-sm">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Move3d size={24} />
          {selectedModule?.name} Simulation
        </h2>
        <button 
          onClick={() => setIsVRActive(false)} 
          className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Simulated VR Environment */}
      <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gray-900">
        <div className="text-center">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center mb-8 mx-auto animate-pulse">
            <Activity size={64} className="text-primary" />
          </div>
          <h3 className="text-4xl font-bold mb-4">VR Session Active</h3>
          <p className="text-xl text-gray-400 mb-12">Exploring {selectedModule?.name}</p>
          
          {/* VR Controls */}
          <div className="flex justify-center gap-6">
            <button 
              onClick={() => setIsPlaying(!isPlaying)} 
              className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            >
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </button>
            <button 
              onClick={() => console.log('Resetting VR view')} 
              className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-transform"
            >
              <RotateCcw size={32} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Status Footer */}
      <div className="p-4 bg-black/40 backdrop-blur-md flex justify-between items-center">
        <div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Current Interaction</div>
          <div className="text-lg font-bold">{selectedModule?.interactions[0] || 'Loading...'}</div>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <span className="text-xs font-bold text-green-500 uppercase">Live Simulation</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-full">
      {isVRActive ? renderVRView() : renderModuleSelection()}
    </div>
  );
};

const MetricCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) => (
  <div className="bg-[#e0e5ec] p-6 rounded-3xl shadow-clay flex items-center gap-4">
    <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-clay-sm ${color}`}>
      {React.cloneElement(icon as React.ReactElement, { size: 24 })}
    </div>
    <div className="flex-1">
      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
      <div className="text-xl font-bold text-gray-800">{value}</div>
    </div>
  </div>
);

const DetailPill = ({ label, value, color }: { label: string, value: string, color?: string }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-gray-500">{label}:</span>
    <span className={`font-bold capitalize ${color || 'text-gray-800'}`}>{value}</span>
  </div>
);