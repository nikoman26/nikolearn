import React, { useState, useEffect } from 'react';
import { Play, CheckCircle, Clock, BookOpen, Star, Heart, Activity, Award } from 'lucide-react';

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
    }>;
  };
}

interface CBCCurriculumPlayerProps {
  lessonId: string;
  onComplete: () => void;
  onProgress: (progress: number) => void;
}

export const CBCCurriculumPlayer: React.FC<CBCCurriculumPlayerProps> = ({ 
  lessonId, 
  onComplete, 
  onProgress 
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showVR, setShowVR] = useState(false);
  const [showAR, setShowAR] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  // CBC Lesson Content based on the lesson ID
  const getLessonContent = (id: string): CBCLessonContent => {
    switch (id) {
      case 'cbc-lesson-1-body-systems':
        return {
          id: 'cbc-lesson-1-body-systems',
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
              }
            ]
          }
        };
      
      case 'cbc-lesson-2-blood-vessels':
        return {
          id: 'cbc-lesson-2-blood-vessels',
          title: 'Blood and Blood Vessels',
          description: 'Understand the types of blood vessels and how blood moves around the body through arteries, veins, and capillaries.',
          duration: 40,
          subject: 'Science',
          strand: 'Living Things and Their Environment',
          sub_strand: 'Human Body Systems',
          grade_level: 6,
          learning_objectives: [
            'Name types of blood vessels',
            'Describe the function of each blood vessel',
            'Explain the direction of blood flow',
            'Understand how pulse relates to heart activity'
          ],
          prerequisites: ['Basic understanding of the heart', 'Knowledge of body circulation'],
          interactive_elements: {
            vr_experience: {
              type: 'blood_flow_simulation',
              title: 'VR Blood Flow Journey',
              duration: '12 minutes',
              modules: [
                {
                  name: 'Blood Vessel Types',
                  description: 'Explore arteries, veins, and capillaries in 3D',
                  interactions: ['vessel_identification', 'blood_flow_tracking']
                }
              ]
            },
            assessments: [
              {
                type: 'digital_quiz',
                title: 'Blood Vessel Knowledge Check',
                questions: 5
              }
            ]
          }
        };

      case 'cbc-lesson-3-healthy-living':
        return {
          id: 'cbc-lesson-3-healthy-living',
          title: 'Healthy Living & Lifestyle',
          description: 'Learn to identify healthy habits for the heart and understand how daily choices affect our cardiovascular health.',
          duration: 40,
          subject: 'Science',
          strand: 'Living Things and Their Environment',
          sub_strand: 'Human Body Systems',
          grade_level: 6,
          learning_objectives: [
            'Identify healthy habits for the heart',
            'Explain the effects of unhealthy lifestyles',
            'Demonstrate responsibility for personal health',
            'Make informed choices about heart health'
          ],
          prerequisites: ['Understanding of basic nutrition', 'Knowledge of exercise benefits'],
          interactive_elements: {
            vr_experience: {
              type: 'health_scenarios',
              title: 'Healthy vs Unhealthy Choices VR',
              duration: '10 minutes',
              modules: [
                {
                  name: 'Artery Health Simulation',
                  description: 'See blocked vs healthy arteries in VR',
                  interactions: ['artery_comparison', 'health_impact']
                }
              ]
            },
            assessments: [
              {
                type: 'scenario_responses',
                title: 'Health Choice Analysis',
                description: 'Reflection on health scenarios'
              }
            ]
          }
        };

      default:
        throw new Error('Unknown CBC lesson ID');
    }
  };

  const lessonContent = getLessonContent(lessonId);

  const sections = [
    { id: 'introduction', title: 'Introduction', duration: '5 min' },
    { id: 'exploration', title: 'Exploration', duration: '10 min' },
    { id: 'vr_experience', title: 'VR Experience', duration: '12 min' },
    { id: 'application', title: 'Application', duration: '8 min' },
    { id: 'assessment', title: 'Assessment', duration: '5 min' }
  ];

  // Simulate progress tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => {
        const newTime = prev + 1;
        const newProgress = Math.min((newTime / (lessonContent.duration * 60)) * 100, 100);
        setProgress(newProgress);
        onProgress(newProgress);
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lessonContent.duration, onProgress]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSectionComplete = (sectionIndex: number) => {
    if (sectionIndex === sections.length - 1) {
      onComplete();
    }
    setCurrentSection(sectionIndex + 1);
  };

  const handleNextSection = () => {
    handleSectionComplete(currentSection);
  };

  return (
    <div className="h-full flex flex-col bg-[#f8fafc]">
      
      {/* CBC Header with Grade and Strand Info */}
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

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        
        {/* Section Navigation */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-white rounded-2xl p-2 shadow-lg">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                  currentSection === index
                    ? 'bg-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>
        
        {/* Current Section Content */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6 min-h-[400px]">
          {currentSection === 0 && (
            <div className="text-center">
              <BookOpen size={64} className="mx-auto mb-4 text-primary" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction to {lessonContent.title}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-[#e0e5ec] p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-800 mb-2">Learning Objectives</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {lessonContent.learning_objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#e0e5ec] p-4 rounded-2xl">
                  <h3 className="font-bold text-gray-800 mb-2">Prerequisites</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {lessonContent.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Star size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                        {prereq}
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-100 to-pink-100 p-6 rounded-2xl">
                  <Heart size={48} className="text-red-500 mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">Key Concepts</h3>
                  <p className="text-gray-600 text-sm">
                    Explore the fundamental concepts of the human circulatory system through interactive content and real-world examples.
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl">
                  <Activity size={48} className="text-blue-500 mb-4" />
                  <h3 className="font-bold text-gray-800 mb-2">Interactive Elements</h3>
                  <p className="text-gray-600 text-sm">
                    Engage with AR overlays and interactive diagrams to visualize body systems in action.
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentSection === 2 && (
            <div className="text-center">
              <Activity size={64} className="mx-auto mb-4 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">VR Experience: {lessonContent.interactive_elements.vr_experience?.title}</h2>
              <p className="text-gray-600 mb-6">{lessonContent.interactive_elements.vr_experience?.modules[0]?.description}</p>
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
              <p className="text-gray-600 mb-6">Complete the assessment to demonstrate your understanding.</p>
              <button
                onClick={() => setShowAssessment(true)}
                className="px-8 py-4 bg-green-500 text-white rounded-2xl font-bold text-lg hover:bg-green-600 transition-colors flex items-center gap-2 mx-auto"
              >
                <CheckCircle size={24} />
                Start Assessment
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowAR(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-2xl font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <Activity size={20} />
              AR View
            </button>
            
            <button
              onClick={handleNextSection}
              className="px-8 py-3 bg-primary text-white rounded-2xl font-bold hover:opacity-90 transition-colors"
            >
              {currentSection === sections.length - 1 ? 'Complete Lesson' : 'Next Section'}
            </button>
          </div>
        </div>
      </div>

      {/* VR MODAL */}
      {showVR && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-xl text-center">
            <h2 className="text-2xl font-bold mb-2">
              VR Experience
            </h2>
            <p className="text-gray-600 mb-4">
              {lessonContent.interactive_elements.vr_experience?.modules[0].description}
            </p>
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl max-w-xl text-center">
            <Award size={64} className="mx-auto mb-4 text-green-500" />
            <button
              onClick={() => {
                setShowAssessment(false);
                onComplete();
              }}
              className="px-6 py-2 bg-green-500 text-white rounded-xl"
            >
              Finish Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
