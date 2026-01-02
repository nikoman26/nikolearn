import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize, CheckCircle, Clock, BookOpen, Star } from 'lucide-react';

interface LessonContent {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  videoUrl?: string;
  audioUrl?: string;
  textContent: string;
  interactiveElements: {
    type: 'quiz' | 'hotspot' | 'simulation';
    content: any;
  }[];
  learningObjectives: string[];
  prerequisites: string[];
}

export const LessonPlayer: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);

  // Mock lesson content - in real app this would come from Supabase
  const lessonContent: LessonContent = {
    id: 'l1',
    title: 'Understanding Photosynthesis',
    description: 'Learn how plants convert sunlight into energy through the amazing process of photosynthesis.',
    duration: 20,
    videoUrl: 'https://example.com/photosynthesis-video.mp4',
    textContent: `
      <h2>What is Photosynthesis?</h2>
      <p>Photosynthesis is the process by which green plants use sunlight to synthesize foods with the aid of chlorophyll.</p>
      
      <h3>The Chemical Equation</h3>
      <p class="highlight">6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ + 6O₂</p>
      
      <h3>Key Components</h3>
      <ul>
        <li><strong>Chlorophyll:</strong> The green pigment that captures light</li>
        <li><strong>Carbon Dioxide:</strong> From the air we breathe</li>
        <li><strong>Water:</strong> Absorbed through plant roots</li>
        <li><strong>Sunlight:</strong> Provides the energy needed</li>
      </ul>
      
      <h3>Why is Photosynthesis Important?</h3>
      <p>Photosynthesis is crucial for life on Earth because it:</p>
      <ul>
        <li>Produces oxygen that all animals need to breathe</li>
        <li>Creates food for plants and ultimately all living things</li>
        <li>Removes carbon dioxide from the atmosphere</li>
      </ul>
    `,
    interactiveElements: [
      {
        type: 'quiz',
        content: {
          question: 'What gas do plants release during photosynthesis?',
          options: ['Carbon Dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'],
          correct: 1
        }
      },
      {
        type: 'hotspot',
        content: {
          title: 'Chloroplast Structure',
          description: 'Click to learn about the part of the cell where photosynthesis occurs'
        }
      }
    ],
    learningObjectives: [
      'Understand the process of photosynthesis',
      'Identify the key components needed for photosynthesis',
      'Explain the importance of photosynthesis for life on Earth'
    ],
    prerequisites: ['Basic understanding of plants', 'Familiarity with chemical equations']
  };

  const sections = [
    { id: 'intro', title: 'Introduction', duration: '3 min' },
    { id: 'process', title: 'The Process', duration: '8 min' },
    { id: 'importance', title: 'Why It Matters', duration: '5 min' },
    { id: 'quiz', title: 'Quick Quiz', duration: '4 min' }
  ];

  // Simulate progress tracking
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setTimeSpent(prev => {
          const newTime = prev + 1;
          setProgress((newTime / (lessonContent.duration * 60)) * 100);
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, lessonContent.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuizAnswer = (selectedOption: number) => {
    const quiz = lessonContent.interactiveElements.find(el => el.type === 'quiz');
    if (quiz && selectedOption === quiz.content.correct) {
      // Award LearnCoins for correct answer
      console.log('Correct! +10 LearnCoins');
    }
    setShowQuiz(false);
  };

  return (
    <div className="h-full flex flex-col">
      
      {/* Header */}
      <div className="bg-[#e0e5ec] p-6 rounded-t-3xl shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{lessonContent.title}</h1>
            <p className="text-gray-500 mt-1">{lessonContent.description}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{lessonContent.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={16} className="text-yellow-500" />
              <span>Beginner</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#d1d9e6] rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{formatTime(timeSpent)} elapsed</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Video/Content Section */}
        <div className="flex-1 p-6">
          <div className="bg-[#d1d9e6] rounded-3xl aspect-video mb-6 flex items-center justify-center relative overflow-hidden">
            {lessonContent.videoUrl ? (
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <Play size={64} className="mx-auto mb-4 opacity-80" />
                  <p className="text-lg font-semibold">Photosynthesis Animation</p>
                  <p className="text-sm opacity-80">Interactive 3D visualization</p>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <BookOpen size={48} className="mx-auto mb-4 text-gray-500" />
                <p className="text-gray-600">Lesson Content</p>
              </div>
            )}
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                </button>
                <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <SkipBack size={16} />
                </button>
                <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <SkipForward size={16} />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
            <div 
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: lessonContent.textContent }}
            />
          </div>

          {/* Interactive Elements */}
          {lessonContent.interactiveElements.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Interactive Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonContent.interactiveElements.map((element, index) => (
                  <button
                    key={index}
                    onClick={() => element.type === 'quiz' && setShowQuiz(true)}
                    className="p-4 bg-[#e0e5ec] rounded-2xl shadow-clay hover:scale-105 transition-transform text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {element.type === 'quiz' && <CheckCircle size={20} className="text-primary" />}
                        {element.type === 'hotspot' && <Star size={20} className="text-yellow-500" />}
                        {element.type === 'simulation' && <Play size={20} className="text-green-500" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 capitalize">{element.type}</h4>
                        <p className="text-sm text-gray-500">Click to interact</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-[#e0e5ec] p-6 overflow-y-auto">
          
          {/* Learning Objectives */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Learning Objectives</h3>
            <ul className="space-y-2">
              {lessonContent.learningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lesson Sections */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">Lesson Sections</h3>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`w-full p-3 rounded-2xl text-left transition-all ${
                    currentSection === index 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-[#d1d9e6] hover:bg-primary/10'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{section.title}</span>
                    <span className="text-xs opacity-75">{section.duration}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mwalimu AI Help */}
          <div className="bg-gradient-to-br from-primary/10 to-purple-100 p-4 rounded-2xl">
            <h4 className="font-bold text-gray-800 mb-2">Need Help?</h4>
            <p className="text-sm text-gray-600 mb-3">Ask Mwalimu AI anything about photosynthesis!</p>
            <button className="w-full py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
              Ask Mwalimu
            </button>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#e0e5ec] rounded-3xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Quiz</h3>
            <p className="text-gray-700 mb-6">
              {lessonContent.interactiveElements.find(el => el.type === 'quiz')?.content.question}
            </p>
            <div className="space-y-3">
              {lessonContent.interactiveElements.find(el => el.type === 'quiz')?.content.options.map((option: string, index: number) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(index)}
                  className="w-full p-3 bg-[#d1d9e6] rounded-xl text-left hover:bg-primary/10 transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setShowQuiz(false)}
              className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
