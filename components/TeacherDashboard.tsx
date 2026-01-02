import React, { useState } from 'react';
import { BookOpen, Users, TrendingUp, Award, Calendar, Clock, CheckCircle, Plus, BarChart3, FileText, Star, Target, PlayCircle } from 'lucide-react';

interface StudentProgress {
  id: string;
  name: string;
  progress: number;
  lastActive: string;
  streakDays: number;
  masteryLevel: number;
  totalLessonsCompleted: number;
  averageScore: number;
}

interface LessonStats {
  totalLessons: number;
  publishedLessons: number;
  studentEngagement: number;
  avgCompletionRate: number;
}

interface ClassMetrics {
  totalStudents: number;
  activeStudents: number;
  avgProgress: number;
  topPerformers: number;
}

export const TeacherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'students' | 'analytics'>('overview');

  // Mock data - in real app this would come from Supabase
  const [students] = useState<StudentProgress[]>([
    {
      id: 's1',
      name: 'Kamau Otieno',
      progress: 85,
      lastActive: '2025-12-22T10:30:00Z',
      streakDays: 5,
      masteryLevel: 3,
      totalLessonsCompleted: 12,
      averageScore: 87
    },
    {
      id: 's2',
      name: 'Grace Wanjiru',
      progress: 72,
      lastActive: '2025-12-22T14:15:00Z',
      streakDays: 3,
      masteryLevel: 2,
      totalLessonsCompleted: 8,
      averageScore: 75
    },
    {
      id: 's3',
      name: 'David Kimani',
      progress: 91,
      lastActive: '2025-12-22T09:45:00Z',
      streakDays: 7,
      masteryLevel: 4,
      totalLessonsCompleted: 15,
      averageScore: 92
    },
    {
      id: 's4',
      name: 'Sarah Nyambura',
      progress: 68,
      lastActive: '2025-12-22T16:20:00Z',
      streakDays: 2,
      masteryLevel: 2,
      totalLessonsCompleted: 6,
      averageScore: 72
    },
    {
      id: 's5',
      name: 'James Muthomi',
      progress: 79,
      lastActive: '2025-12-22T11:00:00Z',
      streakDays: 4,
      masteryLevel: 3,
      totalLessonsCompleted: 10,
      averageScore: 81
    }
  ]);

  const [lessonStats] = useState<LessonStats>({
    totalLessons: 24,
    publishedLessons: 18,
    studentEngagement: 87,
    avgCompletionRate: 78
  });

  const [classMetrics] = useState<ClassMetrics>({
    totalStudents: 24,
    activeStudents: 21,
    avgProgress: 79,
    topPerformers: 8
  });

  const getMasteryColor = (level: number) => {
    switch (level) {
      case 1: return 'text-red-600 bg-red-100';
      case 2: return 'text-yellow-600 bg-yellow-100';
      case 3: return 'text-blue-600 bg-blue-100';
      case 4: return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="p-6 pb-24 md:pb-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Dashboard</h1>
        <p className="text-gray-500">Manage your classes, lessons, and track student progress</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        {/* Total Students */}
        <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Students</h3>
              <p className="text-sm text-gray-500">Active this week</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{classMetrics.activeStudents}</div>
            <div className="text-sm text-gray-500">of {classMetrics.totalStudents} total</div>
          </div>
        </div>

        {/* Lessons Published */}
        <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Lessons</h3>
              <p className="text-sm text-gray-500">Content published</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{lessonStats.publishedLessons}</div>
            <div className="text-sm text-gray-500">of {lessonStats.totalLessons} total</div>
          </div>
        </div>

        {/* Class Performance */}
        <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Performance</h3>
              <p className="text-sm text-gray-500">Class average</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{classMetrics.avgProgress}%</div>
            <div className="text-sm text-gray-500">avg progress</div>
          </div>
        </div>

        {/* Engagement */}
        <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Award className="text-yellow-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Top Performers</h3>
              <p className="text-sm text-gray-500">Level 4 mastery</p>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-800">{classMetrics.topPerformers}</div>
            <div className="text-sm text-gray-500">students</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview', name: 'Overview', icon: BarChart3 },
          { id: 'lessons', name: 'Lessons', icon: FileText },
          { id: 'students', name: 'Students', icon: Users },
          { id: 'analytics', name: 'Analytics', icon: TrendingUp },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-[#e0e5ec] text-gray-600 hover:bg-primary/10'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm font-medium">{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          
          {/* Recent Activity */}
          <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Class Activity</h3>
            <div className="space-y-4">
              {[
                {
                  title: '5 Students Completed Photosynthesis',
                  description: 'Interactive lesson completed with high engagement',
                  time: '2 hours ago',
                  type: 'lesson'
                },
                {
                  title: 'New Student Registered',
                  description: 'David Kimani joined your class',
                  time: '1 day ago',
                  type: 'student'
                },
                {
                  title: 'Math Quiz Results Available',
                  description: 'Weekly assessment results are ready to review',
                  time: '3 days ago',
                  type: 'assessment'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-[#d1d9e6] rounded-2xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {activity.type === 'lesson' && <CheckCircle size={20} className="text-primary" />}
                    {activity.type === 'student' && <Users size={20} className="text-blue-500" />}
                    {activity.type === 'assessment' && <Award size={20} className="text-yellow-500" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{activity.title}</h4>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Clock size={12} />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center gap-3 p-4 bg-primary text-white rounded-2xl hover:opacity-90 transition-opacity">
                <Plus size={20} />
                <span className="font-semibold">Create Lesson</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-blue-500 text-white rounded-2xl hover:opacity-90 transition-opacity">
                <Target size={20} />
                <span className="font-semibold">Create Assessment</span>
              </button>
              <button className="flex items-center gap-3 p-4 bg-green-500 text-white rounded-2xl hover:opacity-90 transition-opacity">
                <BarChart3 size={20} />
                <span className="font-semibold">View Reports</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'lessons' && (
        <div className="space-y-6">
          
          {/* Lessons Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Your Lessons</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:opacity-90">
              <Plus size={16} />
              Create New Lesson
            </button>
          </div>

          {/* Lessons Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                id: 'l1',
                title: 'Photosynthesis',
                subject: 'Science',
                gradeLevel: 5,
                status: 'published',
                completionRate: 85,
                studentsEnrolled: 24,
                avgScore: 87
              },
              {
                id: 'l2',
                title: 'Introduction to Fractions',
                subject: 'Math',
                gradeLevel: 4,
                status: 'draft',
                completionRate: 0,
                studentsEnrolled: 0,
                avgScore: 0
              },
              {
                id: 'l3',
                title: 'Reading Comprehension',
                subject: 'English',
                gradeLevel: 5,
                status: 'published',
                completionRate: 78,
                studentsEnrolled: 18,
                avgScore: 75
              },
              {
                id: 'l4',
                title: 'Kenyan History',
                subject: 'Social Studies',
                gradeLevel: 5,
                status: 'published',
                completionRate: 92,
                studentsEnrolled: 21,
                avgScore: 83
              }
            ].map((lesson) => (
              <div key={lesson.id} className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay hover:scale-105 transition-transform">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-1">{lesson.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <span>Grade {lesson.gradeLevel}</span>
                      <span>{lesson.subject}</span>
                      <div className={`px-2 py-1 rounded-lg text-xs ${
                        lesson.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {lesson.status}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-2">{lesson.studentsEnrolled} students</div>
                    {lesson.completionRate > 0 && (
                      <div className="text-lg font-bold text-gray-800">{lesson.completionRate}%</div>
                    )}
                    <div className="text-xs text-gray-500">completion</div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600">
                    {lesson.status === 'published' ? 'View Analytics' : 'Publish'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'students' && (
        <div className="space-y-6">
          
          {/* Students Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">Student Progress</h3>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90">
                Export Report
              </button>
            </div>
          </div>

          {/* Students List */}
          <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-600 text-sm">
                    <th className="pb-4">Student</th>
                    <th className="pb-4">Progress</th>
                    <th className="pb-4">Mastery</th>
                    <th className="pb-4">Streak</th>
                    <th className="pb-4">Last Active</th>
                    <th className="pb-4">Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id} className="border-t border-gray-200">
                      <td className="py-4">
                        <div className="font-semibold text-gray-800">{student.name}</div>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary" 
                              style={{ width: `${student.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{student.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getMasteryColor(student.masteryLevel)}`}>
                          Level {student.masteryLevel}
                        </span>
                      </td>
                      <td className="py-4 font-medium text-gray-700">{student.streakDays} days</td>
                      <td className="py-4 text-sm text-gray-500">{formatTimeAgo(student.lastActive)}</td>
                      <td className="py-4 font-bold text-gray-800">{student.averageScore}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="bg-[#e0e5ec] rounded-3xl p-8 shadow-clay flex flex-col items-center justify-center min-h-[400px]">
          <BarChart3 size={48} className="text-primary/40 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Detailed Analytics Coming Soon</h3>
          <p className="text-gray-500 text-center max-w-md">
            We're building advanced performance tracking and predictive learning insights for your classroom.
          </p>
        </div>
      )}
    </div>
  );
};
