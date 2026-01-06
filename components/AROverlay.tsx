import React, { useState } from 'react';
import { X, Camera, RotateCcw, ZoomIn, ZoomOut, Download, BookOpen, Target, Activity } from 'lucide-react';

interface ARModel {
  id: string;
  name: string;
  subject: string;
  description: string;
  complexity: 'low' | 'medium' | 'high';
  imageUrl: string;
  downloadSizeMB: number;
}

const mockARModels: ARModel[] = [
  {
    id: 'human_heart',
    name: 'Human Heart',
    subject: 'Biology',
    description: 'A detailed 3D model of the human heart, showing chambers, valves, and major vessels.',
    complexity: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1584820927498-4000232f918d?auto=format&fit=crop&q=80&w=400',
    downloadSizeMB: 15.2,
  },
  {
    id: 'photosynthesis_cell',
    name: 'Chloroplast',
    subject: 'Biology',
    description: 'Visualize the internal structure of a chloroplast where photosynthesis occurs.',
    complexity: 'high',
    imageUrl: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&q=80&w=400',
    downloadSizeMB: 8.5,
  },
  {
    id: 'fraction_cube',
    name: 'Fraction Cube',
    subject: 'Mathematics',
    description: 'An interactive cube to visualize fractions and their equivalents in 3D space.',
    complexity: 'low',
    imageUrl: 'https://images.unsplash.com/photo-1582719478252-65e7b54291da?auto=format&fit=crop&q=80&w=400',
    downloadSizeMB: 3.1,
  },
];

export const AROverlay: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ARModel | null>(null);
  const [isARActive, setIsARActive] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);

  const getComplexityColor = (complexity: ARModel['complexity']) => {
    switch (complexity) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-red-100 text-red-700';
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      if (direction === 'in') return Math.min(prev + 0.2, 3);
      return Math.max(prev - 0.2, 0.5);
    });
  };

  const handleRotate = (direction: 'left' | 'right') => {
    setRotationAngle(prev => (direction === 'right' ? prev + 15 : prev - 15));
  };

  const renderModelSelection = () => (
    <div className="h-full flex flex-col p-4">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">AR Learning Hub</h2>
        <p className="text-gray-500">Select a 3D model to overlay onto your real-world environment.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar">
        {mockARModels.map(model => (
          <div 
            key={model.id} 
            className={`bg-[#e0e5ec] rounded-3xl p-6 shadow-clay flex flex-col justify-between transition-all cursor-pointer ${
              selectedModel?.id === model.id ? 'shadow-clay-inset border-2 border-primary' : 'hover:scale-[1.02]'
            }`}
            onClick={() => setSelectedModel(model)}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary shadow-clay-sm">
                <Activity size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{model.name}</h3>
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded-lg ${getComplexityColor(model.complexity)}`}>
                  {model.complexity}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{model.description}</p>
            
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{model.subject}</span>
              <span>{model.downloadSizeMB} MB</span>
            </div>
          </div>
        ))}
      </div>

      {/* Model Details Panel */}
      {selectedModel && (
        <div className="mt-8 bg-white rounded-3xl p-6 shadow-clay flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img 
              src={selectedModel.imageUrl} 
              alt={selectedModel.name} 
              className="w-24 h-24 object-cover rounded-2xl shadow-clay-sm"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800">{selectedModel.name} Ready</h3>
              <p className="text-sm text-gray-600">Tap 'Launch AR' to start the experience.</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsARActive(true)}
            className="px-8 py-4 bg-primary text-white rounded-2xl font-bold text-lg shadow-md hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Camera size={20} />
            Launch AR
          </button>
        </div>
      )}
    </div>
  );

  const renderARView = () => (
    <div className="fixed inset-0 bg-black text-white flex flex-col z-[100]">
      {/* AR Header */}
      <div className="p-4 flex justify-between items-center bg-black/60 backdrop-blur-sm">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Camera size={24} />
          {selectedModel?.name} AR Overlay
        </h2>
        <button 
          onClick={() => setIsARActive(false)} 
          className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Simulated Camera View */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-gray-900">
        {/* Mock Camera Feed Background */}
        <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url(${selectedModel?.imageUrl})` }}></div>
        
        {/* AR Model Placeholder */}
        <div 
          className="relative w-64 h-64 bg-white/10 border-4 border-white/50 rounded-3xl flex items-center justify-center transition-all duration-300"
          style={{ 
            transform: `scale(${zoomLevel}) rotateY(${rotationAngle}deg)`,
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.5)'
          }}
        >
          <BookOpen size={48} className="text-white" />
          <span className="absolute bottom-4 text-sm font-bold">{selectedModel?.name}</span>
        </div>
        
        {/* AR Controls */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 p-4 bg-black/50 rounded-3xl">
          <ControlButton icon={<ZoomIn size={20} />} onClick={() => handleZoom('in')} label="Zoom In" />
          <ControlButton icon={<ZoomOut size={20} />} onClick={() => handleZoom('out')} label="Zoom Out" />
          <ControlButton icon={<RotateCcw size={20} />} onClick={() => handleRotate('left')} label="Rotate Left" />
          <ControlButton icon={<RotateCcw size={20} className="transform scale-x-[-1]" />} onClick={() => handleRotate('right')} label="Rotate Right" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-full">
      {isARActive ? renderARView() : renderModelSelection()}
    </div>
  );
};

const ControlButton = ({ icon, onClick, label }: { icon: React.ReactNode, onClick: () => void, label: string }) => (
  <button
    onClick={onClick}
    className="p-3 bg-white/20 rounded-xl text-white hover:bg-white/30 transition-colors"
    aria-label={label}
  >
    {icon}
  </button>
);