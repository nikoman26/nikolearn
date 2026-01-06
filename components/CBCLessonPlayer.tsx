import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, BookOpen, Star, Heart, Activity, Users, Award, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface CBCLessonContent {
  id: string;
  title: string;
  description: string;
  duration: number;
  subject: string;
  strand: string;
  sub_strand: string;
  grade_level: number;
  learning_objectives: string[];
  prerequisites: string[];
  content_url?: string;
  video_url?: string;
  interactive_elements: {
    vr_experience?: {
      type: string;
      title: string;
      duration: string;
      modules: Array<{
        name: string;
        description: string;
        interactions: string[];
      }>;
    };
    ar_overlay?: {
      type: string;
      title: string;
      features: string[];
    };
    assessments: Array<{
      type: string;
      title: string;
      questions?: number;
      description?: string;
      quiz_data?: QuizQuestion[]; // Added quiz data structure
    }>;
  };
  is_published: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
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
  correct_answer_index: number; // Index of the correct option
  points: number;
}

export const CBCLessonPlayer: React.FC<{ 
  lessonId: string; 
  onComplete: () => void; 
  onProgress: (progress: number) => void; 
}> = ({ lessonId, onComplete, onProgress }) => {
  const { user, profile } = useAuth();
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showVR, setShowVR] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [lessonContent, setLessonContent] = useState<CBCLessonContent | null>(null);
  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ correct: boolean; message: string } | null>(null);

  // Mock quiz data for the assessment section
  const mockQuizData: QuizQuestion[] = [
    {
      id: 'q1',
      question: 'What is the main function of the heart in the circulatory system?',
      options: [
        'To filter waste from the blood',
        'To pump blood throughout the body',
        'To produce oxygen for the body',
        'To store nutrients for the body'
      ],
      correct_answer_index: 1,
      points: 10
    }
  ];

  // Fetch lesson content from Supabase (Mocked)
  useEffect(() => {
    const fetchLessonContent = async () => {
      try {
        setLoading(true);
        
        // Mock lesson data based on the CBC plan
        const mockLesson: CBCLessonContent = {
          id: lessonId,
          title: 'Introduction to Body Systems',
          description: 'Learn to identify major parts of the human circulatory system and understand the importance of the heart for human survival.',
          duration: 40,
          subject: 'Science',
          strand: 'Living Things and Their Environment',
          sub_strand: 'Human Body Systems',
          grade_level: 6,
          learning_objectives: [
            'Identify the major parts of the human circulatory system',
            'Describe the functions of the heart and blood vessels',
            'Appreciate the importance of the circulatory system in daily life',
            'Understand why the heart is important for human survival'
          ],
          prerequisites: ['Basic understanding of the human body', 'Curiosity about how the body works'],
          interactive_elements: {
            vr_experience: {
              type: 'heart_journey',
              title: 'VR Heart Tour',
              duration: '10 minutes',
              modules: [
                {
                  name: 'Heart Chambers',
                  description: 'Explore right atrium, right ventricle, left atrium, left ventricle',
                  interactions: ['click_heart_parts', 'blood_flow_simulation']
                }
              ]
            },
            ar_overlay: {
              type: 'body_systems',
              title: 'AR Body Systems Display',
              features: ['heart_location', 'circulation_overlay', 'organ_highlighting']
            },
            assessments: [
              {
                type: 'oral_questions',
                title: 'Heart Identification',
                description: 'Interactive questioning session'
              },
              {
                type: 'digital_quiz',
                title: 'Body Systems Check',
                questions: 5,
                quiz_data: mockQuizData
              }
            ]
          },
          is_published: true,
          created_by: 'teacher123',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setLessonContent(mockLesson);
        
        // Fetch student progress if user is logged in
        if (user && profile?.role === 'student') {
          // Mock progress fetch
          const mockProgress: StudentProgress = {
            id: 'progress1',
            student_id: user.id,
            lesson_id: lessonId,
            progress_percentage: 0,
            time_spent_minutes: 0,
            last_accessed: new Date().toISOString()
          };
          
          setStudentProgress(mockProgress);
          setProgress(mockProgress.progress_percentage);
        }
      } catch (err) {
        console.error('Error fetching lesson content:', err);
        setError('Failed to load lesson content. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchLessonContent();
  }, [lessonId, user, profile]);

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'exploration', title: 'Exploration', icon: Heart },
    { id: 'vr_experience', title: 'VR Experience', icon: Activity },
    { id: 'application', title: 'Application', icon: Users },
    { id: 'assessment', title: 'Assessment', icon: Award }
  ];

  // Simulate progress tracking
  useEffect(() => {
    if (!isPlaying || !lessonContent) return;
    
    const interval = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        const newProgress = Math.min((newTime / (lessonContent.duration * 60)) * 100, 100);
        setProgress(newProgress);
        onProgress(newProgress);
        
        // Update student progress in database (mocked)
        if (user && profile?.role === 'student') {
          console.log(`Progress updated: ${newProgress}%`);
        }
        
        if (newProgress >= 100) {
          onComplete();
        }
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, lessonContent, onProgress, onComplete, user, profile]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleQuizAnswer = (selectedOption: number) => {
    setSelectedQuizOption(selectedOption);
    
    const quiz = lessonContent?.interactive_elements.assessments.find(a => a.type === 'digital_quiz');
    const question = quiz?.quiz_data?.[0];

    if (question) {
      const isCorrect = selectedOption === question.correct_answer_index;
      
      if (isCorrect) {
        setQuizFeedback({
          correct: true,
          message: `Vizuri sana! Correct. You earned ${question.points} LearnCoins.`
        });
      } else {
        setQuizFeedback({
          correct: false,
          message: `Pole sana (So sorry). The correct answer is option ${question.correct_answer_index + 1}. Try reviewing the lesson!`
        });
      }
    }
  };

  const resetQuiz = () => {
    setSelectedQuizOption(null);
    setQuizFeedback(null);
    setShowAssessment(false);
  };

  const completeLesson = async () => {
    if (!user || !profile || !lessonContent) return;
    
    try {
      // Update progress to 100%
      setProgress(100);
      
      // In a real app, we would update the database
      console.log('Lesson completed!');
      
      // Show completion message
      alert('Hongera! You have completed this lesson.');
      
      // Call onComplete callback
      onComplete();
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
    <div className="h-full flex flex-col bg-[#f8fafc]">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 rounded-t-3xl text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                Grade {lessonContent.grade_level} | {lessonContent.subject}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold">
                {lessonContent.strand}
              </span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{lessonContent.title}</h1>
            <p className="text-red-100 text-lg">{lessonContent.description}</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Clock size={20} />
              <span>{lessonContent.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star size={20} className="text-yellow-300" />
              <span>CBC-Aligned</span>
            </div>
          </div>
        </div>
        
        {/* CBC Progress Bar */}
        <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-500 ease-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-red-100 mt-2">
          <span>{formatTime(timeSpent)} elapsed</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Sections Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-2xl p-2 shadow-lg overflow-x-auto">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setCurrentSection(index)}
                  className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 whitespace-nowrap ${
                    currentSection === index 
                      ? 'bg-red-500 text-white shadow-md' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={16} />
                  {section.title}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Section Content */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 min-h-[400px]">
          {currentSection === 0 && (
            <div className="text-center">
              <BookOpen size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction to {lessonContent.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#e0e5ec] p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-800 mb-2">Learning Objectives</h3>
                  <ul className="text-sm text-gray-600 space-y-1 text-left">
                    {lessonContent.learning_objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-800 mb-2">Prerequisites</h3>
                  <ul className="text-sm text-gray-600 space-y-1 text-left">
                    {lessonContent.prerequisites.map((pr, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Star size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                        {pr}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {currentSection === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Exploration Phase</h2>
              <p className="text-gray-600 mb-6">
                Engage with AR overlays and interactive diagrams to visualize the concepts in action.
              </p>
              
              {lessonContent.interactive_elements.ar_overlay && (
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity size={32} className="text-blue-500" />
                    <h3 className="text-xl font-bold text-gray-800">
                      {lessonContent.interactive_elements.ar_overlay.title}
                    </h3>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Features: {lessonContent.interactive_elements.ar_overlay.features.join(', ')}
                  </p>
                  <button 
                    className="px-6 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 transition-colors"
                    onClick={() => setShowAR(true)}
                  >
                    Launch AR Experience
                  </button>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 p-6 rounded-2xl">
                  <Heart size={48} className="text-red-500 mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">Key Concepts</h3>
                  <p className="text-gray-600 text-sm">
                    Explore the fundamental concepts of the human circulatory system through interactive content and real-world examples.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-2xl">
                  <Activity size={48} className="text-purple-500 mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">Interactive Elements</h3>
                  <p className="text-gray-600 text-sm">
                    Engage with simulations and activities to reinforce your understanding.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {currentSection === 2 && lessonContent.interactive_elements.vr_experience && (
            <div className="text-center">
              <Activity size={64} className="mx-auto mb-4 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                VR Experience: {lessonContent.interactive_elements.vr_experience.title}
              </h2>
              <p className="text-gray-600 mb-6">
                {lessonContent.interactive_elements.vr_experience.modules[0]?.description}
              </p>
              <button 
                onClick={() => setShowVR(true)}
                className="px-8 py-4 bg-purple-500 text-white rounded-2xl font-bold text-lg hover:bg-purple-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <Play size={24} />
                Start VR Experience
              </button>
            </div>
          )}
          
          {currentSection === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Application & Real-World Connections</h2>
              <div className="space-y-4">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                  <h3 className="font-bold text-yellow-800 mb-2">Real-World Question</h3>
                  <p className="text-yellow-700">
                    {lessonId === 'cbc-lesson-1-body-systems' && "Why is the heart important for human survival?"}
                    {lessonId === 'cbc-lesson-2-blood-vessels' && "How does blood move around the body?"}
                    {lessonId === 'cbc-lesson-3-healthy-living' && "How can our daily choices affect our heart?"}
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <h3 className="font-bold text-blue-800 mb-2">Family Connection</h3>
                  <p className="text-blue-700">
                    Share your learning with family members and discuss how this knowledge applies to daily life.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {currentSection === 4 && (
            <div className="text-center">
              <Award size={64} className="mx-auto mb-4 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment & Reflection</h2>
              <p className="text-gray-600 mb-6">
                Complete the assessment to demonstrate your understanding of {lessonContent.title}.
              </p>
              <button 
                onClick={() => setShowAssessment(true)}
                className="px-8 py-4 bg-green-500 text-white rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <CheckCircle size={24} />
                Start Assessment
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {lessonContent.interactive_elements.assessments.map((assessment, i) => (
                  <div key={i} className="bg-green-50 p-4 rounded-2xl">
                    <h3 className="font-bold text-green-800 mb-2">{assessment.title}</h3>
                    <p className="text-green-700 text-sm">
                      {assessment.description || `${assessment.questions || 0} questions`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors flex items-center gap-2"
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <div className="flex gap-4">
            {lessonContent.interactive_elements.ar_overlay && (
              <button 
                onClick={() => setShowAR(true)}
                className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Activity size={20} />
                AR View
              </button>
            )}
            
            <button
              onClick={() => {
                if (currentSection === sections.length - 1) {
                  completeLesson();
                } else {
                  setCurrentSection(currentSection + 1);
                }
              }}
              className="px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-colors flex items-center gap-2"
            >
              {currentSection === sections.length - 1 ? (
                <>
                  <CheckCircle size={20} />
                  Complete Lesson
                </>
              ) : (
                <>
                  Next
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* VR MODAL */}
      {showVR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-2">VR Experience</h2>
            <p className="text-gray-600 mb-4">
              {lessonContent.interactive_elements.vr_experience?.modules[0].description}
            </p>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
            <button 
              onClick={() => setShowVR(false)}
              className="px-6 py-2 bg-purple-500 text-white rounded-xl"
            >
              Exit VR
            </button>
          </div>
        </div>
      )}
      
      {/* AR MODAL */}
      {showAR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-4">AR View</h2>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4" />
            <button 
              onClick={() => setShowAR(false)}
              className="px-6 py-2 bg-blue-500 text-white rounded-xl"
            >
              Exit AR
            </button>
          </div>
        </div>
      )}
      
      {/* ASSESSMENT MODAL */}
      {showAssessment && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment: Body Systems Check</h2>
            
            {quizFeedback ? (
              <div className="text-center py-4">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  quizFeedback.correct ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {quizFeedback.correct ? (
                    <CheckCircle size={32} className="text-green-500" />
                  ) : (
                    <X size={32} className="text-red-500" />
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
                  Continue
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-700 mb-6">
                  {mockQuizData[0].question}
                </p>
                <div className="space-y-3">
                  {mockQuizData[0].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={selectedQuizOption !== null}
                      className={`w-full p-3 rounded-xl text-left transition-colors ${
                        selectedQuizOption === index
                          ? index === mockQuizData[0].correct_answer_index
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
                    Close Assessment
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