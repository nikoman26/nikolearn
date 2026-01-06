import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Maximize, CheckCircle, Clock, BookOpen, Star, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface LessonContent {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  subject: string;
  strand: string;
  sub_strand: string;
  grade_level: number;
  videoUrl?: string;
  audioUrl?: string;
  textContent: string;
  interactiveElements: {
    type: 'quiz' | 'hotspot' | 'simulation' | 'vr_lab' | 'ar_overlay';
    content: any;
  }[];
  learningObjectives: string[];
  prerequisites: string[];
  is_published: boolean;
  created_by: string;
}

interface StudentProgress {
  id: string;
  student_id: string;
  lesson_id: string;
  progress_percentage: number;
  time_spent_minutes: number;
  last_accessed: string;
  completed_at?: string;
  mastery_level?: number;
  evidence_url?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  points: number;
}

export const LessonPlayer: React.FC = () => {
  const { user, profile } = useAuth();
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [lessonContent, setLessonContent] = useState<LessonContent | null>(null);
  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  // Mock lesson content - in real app this would come from Supabase
  const mockLessonContent: LessonContent = {
    id: 'l1',
    title: 'Understanding Photosynthesis',
    description: 'Learn how plants convert sunlight into energy through the amazing process of photosynthesis.',
    duration: 20,
    subject: 'Science',
    strand: 'Living Things',
    sub_strand: 'Plants and Animals',
    grade_level: 5,
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
          correct_answer: 1,
          points: 10
        }
      },
      {
        type: 'hotspot',
        content: {
          title: 'Chloroplast Structure',
          description: 'Click to learn about the part of the cell where photosynthesis occurs'
        }
      },
      {
        type: 'simulation',
        content: {
          title: 'Photosynthesis Process',
          description: 'Interactive simulation of the photosynthesis process'
        }
      }
    ],
    learningObjectives: [
      'Understand the process of photosynthesis',
      'Identify the key components needed for photosynthesis',
      'Explain the importance of photosynthesis for life on Earth'
    ],
    prerequisites: ['Basic understanding of plants', 'Familiarity with chemical equations'],
    is_published: true,
    created_by: 'teacher123'
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
          setProgress((newTime / (mockLessonContent.duration * 60)) * 100);
          return newTime;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, mockLessonContent.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuizAnswer = (selectedOption: number) => {
    setSelectedQuizOption(selectedOption);
    const quiz = mockLessonContent.interactiveElements.find(el => el.type === 'quiz');
    
    if (quiz) {
      const isCorrect = selectedOption === quiz.content.correct_answer;
      
      if (isCorrect) {
        setQuizFeedback({
          correct: true,
          message: 'Correct! Well done. +10 LearnCoins'
        });
        // In a real app, we would update the user's wallet here
      } else {
        setQuizFeedback({
          correct: false,
          message: `Not quite. The correct answer is: ${quiz.content.options[quiz.content.correct_answer]}`
        });
      }
    }
  };

  const resetQuiz = () => {
    setSelectedQuizOption(null);
    setQuizFeedback(null);
    setShowQuiz(false);
  };

  const completeLesson = async () => {
    if (!user || !profile) return;
    
    try {
      // Update progress to 100%
      setProgress(100);
      
      // In a real app, we would update the database here
      console.log('Lesson completed!');
      
      // Show completion message
      alert('Congratulations! You have completed this lesson.');
    } catch (error) {
      console.error('Error completing lesson:', error);
      setError('Failed to complete lesson. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6 bg-red-50 rounded-2xl max-w-md">
          <div className="text-red-500 mb-4">
            <BookOpen size={48} className="mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-red-800 mb-2">Error Loading Lesson</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!lessonContent) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center p-6">
          <BookOpen size={48} className="text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Lesson Not Found</h3>
          <p className="text-gray-600">This lesson is not available.</p>
        </div>
      </div>
    );
  }

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
                    onClick={() => {
                      if (element.type === 'quiz') {
                        setShowQuiz(true);
                        setSelectedQuizOption(null);
                        setQuizFeedback(null);
                      }
                    }}
                    className="p-4 bg-[#e0e5ec] rounded-2xl shadow-clay hover:scale-105 transition-transform text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {element.type === 'quiz' && <CheckCircle size={20} className="text-primary" />}
                        {element.type === 'hotspot' && <Star size={20} className="text-yellow-500" />}
                        {element.type === 'simulation' && <Play size={20} className="text-green-500" />}
                        {element.type === 'vr_lab' && <Maximize size={20} className="text-purple-500" />}
                        {element.type === 'ar_overlay' && <RotateCcw size={20} className="text-blue-500" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 capitalize">{element.type.replace('_', ' ')}</h4>
                        <p className="text-sm text-gray-500">
                          {element.type === 'quiz' ? element.content.question : 
                           element.type === 'hotspot' ? element.content.title : 
                           element.type === 'simulation' ? element.content.title : 
                           'Click to interact'}
                        </p>
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
            
            {quizFeedback ? (
              <div className="text-center py-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  quizFeedback.correct ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {quizFeedback.correct ? (
                    <CheckCircle size={32} className="text-green-500" />
                  ) : (
                    <BookOpen size={32} className="text-red-500" />
                  )}
                </div>
                <p className={`text-lg font-medium mb-4 ${
                  quizFeedback.correct ? 'text-green-700' : 'text-red-700'
                }`}>
                  {quizFeedback.message}
                </p>
                <button 
                  onClick={resetQuiz}
                  className="px-4 py-2 bg-primary text-white rounded-xl font-medium hover:opacity-90"
                >
                  Continue Lesson
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-6">
                  {mockLessonContent.interactiveElements.find(el => el.type === 'quiz')?.content.question}
                </p>
                <div className="space-y-3">
                  {mockLessonContent.interactiveElements.find(el => el.type === 'quiz')?.content.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={selectedQuizOption !== null}
                      className={`w-full p-3 rounded-xl text-left transition-colors ${
                        selectedQuizOption === index
                          ? index === mockLessonContent.interactiveElements.find(el => el.type === 'quiz')?.content.correct_answer
                            ? 'bg-green-100 border-2 border-green-500'
                            : 'bg-red-100 border-2 border-red-500'
                          : 'bg-[#d1d9e6] hover:bg-primary/10'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {selectedQuizOption !== null && (
                  <button 
                    onClick={resetQuiz}
                    className="mt-4 w-full py-2 text-gray-600 hover:text-gray-800"
                  >
                    Try Again
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Lesson Completion Button */}
      {progress >= 100 && (
        <div className="fixed bottom-4 right-4 z-40">
          <button
            onClick={completeLesson}
            className="px-6 py-3 bg-green-500 text-white rounded-2xl font-bold shadow-lg hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <CheckCircle size={20} />
            Complete Lesson
          </button>
        </div>
      )}
    </div>
  );
};