import React, { useState } from 'react';
import { Users, Plus, CheckCircle, Clock, Coins, Heart, Star, MessageCircle, Calendar, Award, TrendingUp, ChevronRight, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface FamilyLink {
  id: string;
  parentName: string;
  studentName: string;
  relationship: string;
  isVerified: boolean;
  permissions: string[];
}

interface Chore {
  id: string;
  title: string;
  description: string;
  rewardLc: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedDuration: string;
  isActive: boolean;
  isCompleted: boolean;
  completedAt?: string;
  verifiedBy?: string;
}

interface ProgressUpdate {
  id: string;
  type: 'lesson_completed' | 'achievement' | 'streak_milestone';
  title: string;
  description: string;
  timestamp: string;
  rewardLc?: number;
}

export const ParentDashboard: React.FC = () => {
  const { profile, user, isStudent, isParent } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'chores' | 'progress' | 'chat'>('overview');

  // Mock data - in real app this would come from Supabase, filtered by parent_id
  const [familyLinks] = useState<FamilyLink[]>([
    {
      id: 'fl1',
      parentName: profile?.full_name || 'Parent',
      studentName: 'Kamau Otieno',
      relationship: 'Child',
      isVerified: true,
      permissions: ['view_progress', 'create_chores', 'verify_completion']
    }
  ]);

  const [chores, setChores] = useState<Chore[]>([
    {
      id: 'c1',
      title: 'Wash Dishes',
      description: 'Clean all plates, cups, and utensils after dinner',
      rewardLc: 25,
      difficulty: 'easy',
      estimatedDuration: '15 minutes',
      isActive: true,
      isCompleted: false
    },
    {
      id: 'c2',
      title: 'Clean My Room',
      description: 'Organize clothes, make bed, vacuum floor',
      rewardLc: 40,
      difficulty: 'medium',
      estimatedDuration: '30 minutes',
      isActive: true,
      isCompleted: true,
      completedAt: '2025-12-22T14:30:00Z',
      verifiedBy: 'parent'
    },
  ]);

  const [progressUpdates] = useState<ProgressUpdate[]>([
    {
      id: 'p1',
      type: 'lesson_completed',
      title: 'Photosynthesis Mastered!',
      description: 'Completed interactive lesson on plant energy production',
      timestamp: '2025-12-22T10:15:00Z',
      rewardLc: 50
    },
    {
      id: 'p2',
      type: 'achievement',
      title: '5-Day Learning Streak',
      description: 'Maintained consistent daily learning for a full week',
      timestamp: '2025-12-22T08:00:00Z',
      rewardLc: 25
    },
  ]);

  const pendingVerificationCount = chores.filter(c => c.isCompleted && !c.verifiedBy).length;

  const handleVerifyChore = (choreId: string) => {
    setChores(prev => prev.map(c => 
      c.id === choreId ? { ...c, verifiedBy: profile?.full_name || 'Parent', completedAt: new Date().toISOString() } : c
    ));
    // In a real app, trigger LearnCoin payment here
    console.log(`Chore ${choreId} verified and paid!`);
  };

  const renderChoreButton = (chore: Chore) => {
    if (chore.isCompleted && chore.verifiedBy) {
      return (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle size={16} />
          <span className="text-sm font-medium">Verified & Paid</span>
        </div>
      );
    }
    if (chore.isCompleted && !chore.verifiedBy && isParent()) {
      return (
        <button 
          onClick={() => handleVerifyChore(chore.id)}
          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold shadow-md hover:opacity-90"
        >
          Verify & Pay
        </button>
      );
    }
    if (!chore.isCompleted && isStudent()) {
      return (
        <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600">
          Mark Complete
        </button>
      );
    }
    return <span className="text-sm text-gray-500">Waiting for completion</span>;
  };

  return (
    <div className="p-6 pb-24 md:pb-6">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {isStudent() ? 'Family Learning Hub' : 'Parent Dashboard'}
        </h1>
        <p className="text-gray-500">
          {isStudent() 
            ? 'Connect with your family and earn coins from chores!' 
            : `Monitoring ${familyLinks[0]?.studentName}'s progress and managing incentives.`}
        </p>
      </div>

      {/* Quick Actions / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Student Link Card */}
        <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Linked Student</h3>
              <p className="text-sm text-gray-500">{familyLinks[0]?.studentName}</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        {/* Pending Verification (Parent Only) */}
        {isParent() && (
          <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-yellow-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Pending Chores</h3>
                <p className="text-sm text-gray-500">Awaiting your approval</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-yellow-600">{pendingVerificationCount}</div>
          </div>
        )}
        
        {/* Weekly Progress Summary */}
        <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">Weekly Progress</h3>
              <p className="text-sm text-gray-500">3 Lessons Completed</p>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600">+15%</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { id: 'overview', name: 'Overview', icon: TrendingUp },
          { id: 'chores', name: isStudent() ? 'My Chores' : 'Chore Management', icon: CheckCircle },
          { id: 'progress', name: 'Learning Progress', icon: Star },
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
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity ({familyLinks[0]?.studentName})</h3>
            <div className="space-y-4">
              {progressUpdates.map((update) => (
                <div key={update.id} className="flex items-start gap-4 p-4 bg-[#d1d9e6] rounded-2xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {update.type === 'lesson_completed' && <BookOpen size={20} className="text-primary" />}
                    {update.type === 'achievement' && <Award size={20} className="text-yellow-500" />}
                    {update.type === 'streak_milestone' && <Star size={20} className="text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{update.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{update.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>2 hours ago</span>
                      {update.rewardLc && (
                        <div className="flex items-center gap-1">
                          <Coins size={12} className="text-yellow-600" />
                          <span>+{update.rewardLc} coins</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'chores' && (
        <div className="space-y-6">
          {isParent() && (
            <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 shadow-md">
              <Plus size={16} />
              Create New Chore
            </button>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chores.map((chore) => (
              <div
                key={chore.id}
                className={`bg-[#e0e5ec] rounded-3xl p-6 shadow-clay ${
                  chore.isCompleted ? 'opacity-90 border-l-4 border-green-500' : ''
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">{chore.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{chore.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{chore.estimatedDuration}</span>
                      </div>
                      <div className="px-2 py-1 rounded-lg bg-blue-100 text-blue-700">
                        {chore.difficulty}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-yellow-600 font-bold">
                      <Coins size={16} />
                      <span>{chore.rewardLc}</span>
                    </div>
                    <div className="text-xs text-gray-500">LearnCoins</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {renderChoreButton(chore)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="bg-[#e0e5ec] rounded-3xl p-6 shadow-clay">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Learning Progress ({familyLinks[0]?.studentName})</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Subject Performance */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Subject Performance</h4>
              <div className="space-y-3">
                {[
                  { subject: 'Science', progress: 85, color: 'bg-green-500' },
                  { subject: 'Math', progress: 72, color: 'bg-blue-500' },
                  { subject: 'English', progress: 90, color: 'bg-purple-500' },
                  { subject: 'Social Studies', progress: 68, color: 'bg-orange-500' },
                ].map((subject) => (
                  <div key={subject.subject}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{subject.subject}</span>
                      <span className="text-gray-500">{subject.progress}%</span>
                    </div>
                    <div className="h-2 bg-[#d1d9e6] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${subject.color} transition-all duration-500`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Streaks */}
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Learning Streaks</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#d1d9e6] rounded-2xl">
                  <div>
                    <div className="font-bold text-gray-800">Daily Learning</div>
                    <div className="text-sm text-gray-600">5 days consecutive</div>
                  </div>
                  <div className="text-2xl font-bold text-primary">5</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#d1d9e6] rounded-2xl">
                  <div>
                    <div className="font-bold text-gray-800">Weekly Goal</div>
                    <div className="text-sm text-gray-600">Lessons completed</div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">12/15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};