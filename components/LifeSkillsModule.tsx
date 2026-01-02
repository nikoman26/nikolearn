import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Users, 
  Shield, 
  Briefcase, 
  Home, 
  Globe,
  CheckCircle,
  Clock,
  Star,
  Award,
  BookOpen,
  Target
} from 'lucide-react';

// Life Skills Education Modules
export const LifeSkillsModule: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('emotional');
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [currentLesson, setCurrentLesson] = useState<any>(null);

  const lifeSkillCategories = [
    {
      id: 'emotional',
      name: 'Emotional Intelligence',
      icon: <Heart size={24} />,
      color: 'bg-pink-500',
      description: 'Understanding and managing emotions'
    },
    {
      id: 'social',
      name: 'Social Skills',
      icon: <Users size={24} />,
      color: 'bg-blue-500',
      description: 'Building relationships and communication'
    },
    {
      id: 'safety',
      name: 'Personal Safety',
      icon: <Shield size={24} />,
      color: 'bg-green-500',
      description: 'Staying safe in different environments'
    },
    {
      id: 'career',
      name: 'Career Readiness',
      icon: <Briefcase size={24} />,
      color: 'bg-purple-500',
      description: 'Preparing for future careers'
    },
    {
      id: 'financial',
      name: 'Financial Literacy',
      icon: <Target size={24} />,
      color: 'bg-yellow-500',
      description: 'Managing money and financial decisions'
    },
    {
      id: 'digital',
      name: 'Digital Citizenship',
      icon: <Globe size={24} />,
      color: 'bg-indigo-500',
      description: 'Responsible use of technology'
    }
  ];

  const lessonData = {
    emotional: [
      {
        id: 'e1',
        title: 'Understanding Emotions',
        duration: '15 min',
        difficulty: 'Beginner',
        description: 'Learn to identify and name different emotions',
        objectives: [
          'Recognize basic emotions in yourself and others',
          'Understand how emotions affect behavior',
          'Practice emotional vocabulary'
        ],
        activities: [
          {
            type: 'interactive',
            title: 'Emotion Recognition Game',
            description: 'Match facial expressions with emotions'
          },
          {
            type: 'reflection',
            title: 'Daily Emotion Journal',
            description: 'Track your emotions throughout the day'
          }
        ]
      },
      {
        id: 'e2',
        title: 'Managing Stress',
        duration: '20 min',
        difficulty: 'Intermediate',
        description: 'Develop healthy coping strategies for stress',
        objectives: [
          'Identify personal stress triggers',
          'Learn breathing and relaxation techniques',
          'Create a personal stress management plan'
        ],
        activities: [
          {
            type: 'practice',
            title: 'Deep Breathing Exercise',
            description: 'Guided breathing techniques'
          },
          {
            type: 'planning',
            title: 'Stress Management Plan',
            description: 'Create your personal toolkit'
          }
        ]
      }
    ],
    social: [
      {
        id: 's1',
        title: 'Effective Communication',
        duration: '25 min',
        difficulty: 'Beginner',
        description: 'Learn to express yourself clearly and listen actively',
        objectives: [
          'Practice active listening skills',
          'Use clear and respectful language',
          'Understand non-verbal communication'
        ],
        activities: [
          {
            type: 'roleplay',
            title: 'Conversation Practice',
            description: 'Practice different conversation scenarios'
          },
          {
            type: 'quiz',
            title: 'Communication Styles',
            description: 'Discover your communication preferences'
          }
        ]
      }
    ],
    safety: [
      {
        id: 'sa1',
        title: 'Online Safety',
        duration: '18 min',
        difficulty: 'Beginner',
        description: 'Stay safe while using the internet and social media',
        objectives: [
          'Recognize online threats and risks',
          'Protect personal information',
          'Report inappropriate content'
        ],
        activities: [
          {
            type: 'scenario',
            title: 'What Would You Do?',
            description: 'Make safe choices in online situations'
          },
          {
            type: 'checklist',
            title: 'Safety Checklist',
            description: 'Create your personal safety rules'
          }
        ]
      }
    ],
    career: [
      {
        id: 'c1',
        title: 'Career Exploration',
        duration: '30 min',
        difficulty: 'Intermediate',
        description: 'Discover different career paths and your interests',
        objectives: [
          'Explore various career options',
          'Identify personal strengths and interests',
          'Set realistic career goals'
        ],
        activities: [
          {
            type: 'assessment',
            title: 'Career Interest Survey',
            description: 'Discover what careers match your interests'
          },
          {
            type: 'research',
            title: 'Career Investigation',
            description: 'Research a career that interests you'
          }
        ]
      }
    ],
    financial: [
      {
        id: 'f1',
        title: 'Money Basics',
        duration: '22 min',
        difficulty: 'Beginner',
        description: 'Learn fundamental concepts about money and budgeting',
        objectives: [
          'Understand different types of money',
          'Learn about earning and spending',
          'Create a simple budget'
        ],
        activities: [
          {
            type: 'simulation',
            title: 'Budget Builder',
            description: 'Practice creating a monthly budget'
          },
          {
            type: 'quiz',
            title: 'Money Math',
            description: 'Solve real-world money problems'
          }
        ]
      }
    ],
    digital: [
      {
        id: 'd1',
        title: 'Digital Footprint',
        duration: '20 min',
        difficulty: 'Intermediate',
        description: 'Understand how your online actions create a digital reputation',
        objectives: [
          'Understand what a digital footprint is',
          'Learn to manage your online reputation',
          'Practice responsible posting'
        ],
        activities: [
          {
            type: 'reflection',
            title: 'Digital Footprint Audit',
            description: 'Review your current online presence'
          },
          {
            type: 'planning',
            title: 'Positive Digital Presence',
            description: 'Plan how to build a good online reputation'
          }
        ]
      }
    ]
  };

  const getLessonsForCategory = (categoryId: string) => {
    return lessonData[categoryId as keyof typeof lessonData] || [];
  };

  const startLesson = (lesson: any) => {
    setCurrentLesson(lesson);
  };

  const completeLesson = (lessonId: string) => {
    setCompletedLessons([...completedLessons, lessonId]);
    setCurrentLesson(null);
  };

  const getProgress = () => {
    const totalLessons = Object.values(lessonData).flat().length;
    return Math.round((completedLessons.length / totalLessons) * 100);
  };

  if (currentLesson) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Lesson Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentLesson(null)}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to Life Skills
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              {currentLesson.duration}
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {currentLesson.title}
          </h1>
          
          <p className="text-gray-600 mb-6">
            {currentLesson.description}
          </p>

          {/* Learning Objectives */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Learning Objectives</h2>
            <ul className="space-y-2">
              {currentLesson.objectives.map((objective: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 mt-0.5" size={20} />
                  <span className="text-gray-700">{objective}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.activities.map((activity: any, index: number) => (
                <div key={index} className="p-4 border-2 border-gray-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-primary text-white text-xs rounded">
                      {activity.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{activity.title}</h3>
                  <p className="text-gray-600 text-sm">{activity.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Lesson Button */}
          <div className="flex justify-center">
            <button
              onClick={() => completeLesson(currentLesson.id)}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <CheckCircle size={20} />
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Life Skills Education</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Develop essential life skills that will help you succeed in school, work, and personal relationships.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Progress</h2>
            <p className="text-gray-600">Life Skills Learning Journey</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{getProgress()}%</div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary h-3 rounded-full transition-all duration-500"
            style={{ width: `${getProgress()}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>{completedLessons.length} lessons completed</span>
          <span>{Object.values(lessonData).flat().length - completedLessons.length} remaining</span>
        </div>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lifeSkillCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-6 rounded-xl border-2 transition-all text-left ${
              selectedCategory === category.id
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-4 mb-3">
              <div className={`p-3 rounded-lg text-white ${category.color}`}>
                {category.icon}
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lessons for Selected Category */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          {lifeSkillCategories.find(c => c.id === selectedCategory)?.icon}
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {lifeSkillCategories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="text-gray-600">
              {lifeSkillCategories.find(c => c.id === selectedCategory)?.description}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {getLessonsForCategory(selectedCategory).map((lesson) => (
            <div
              key={lesson.id}
              className={`p-6 border-2 rounded-lg ${
                completedLessons.includes(lesson.id)
                  ? 'border-green-200 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">{lesson.title}</h3>
                    {completedLessons.includes(lesson.id) && (
                      <CheckCircle className="text-green-500" size={20} />
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      {lesson.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} />
                      {lesson.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} />
                      {lesson.objectives.length} objectives
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => startLesson(lesson)}
                  className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                    completedLessons.includes(lesson.id)
                      ? 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {completedLessons.includes(lesson.id) ? 'Review' : 'Start Lesson'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievement Badges */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" size={24} />
          Achievements
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First Steps', desc: 'Complete your first lesson', earned: completedLessons.length >= 1 },
            { name: 'Life Learner', desc: 'Complete 5 lessons', earned: completedLessons.length >= 5 },
            { name: 'Skill Builder', desc: 'Complete 10 lessons', earned: completedLessons.length >= 10 },
            { name: 'Life Master', desc: 'Complete all lessons', earned: completedLessons.length >= Object.values(lessonData).flat().length }
          ].map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 text-center ${
                achievement.earned
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <Award
                className={`mx-auto mb-2 ${
                  achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                }`}
                size={32}
              />
              <h3 className={`font-semibold ${
                achievement.earned ? 'text-yellow-800' : 'text-gray-500'
              }`}>
                {achievement.name}
              </h3>
              <p className={`text-xs ${
                achievement.earned ? 'text-yellow-700' : 'text-gray-400'
              }`}>
                {achievement.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LifeSkillsModule;
