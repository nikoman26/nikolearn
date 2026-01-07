import React, { useState } from 'react';
import { 
  Heart, Star, Coins, CheckCircle, Clock, 
  ChevronRight, TrendingUp, BookOpen, 
  Award, Shield, Calendar, Bell, Plus, 
  Activity, Zap, Info
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const ParentDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'chores'>('overview');

  const studentName = "Kamau";
  const focusScore = 82;
  const recentActivities = [
    { id: 1, type: 'lesson', title: 'Finished "Heart Valves"', time: '20m ago', reward: 25 },
    { id: 2, type: 'focus', title: 'High Attention Streak (45 min)', time: '1h ago', reward: 15 },
    { id: 3, type: 'chore', title: 'Completed "Wash Dishes"', time: '3h ago', reward: 30, pending: true },
  ];

  const chores = [
    { id: 'c1', title: 'Wash the Dishes', reward: 30, status: 'pending', date: 'Today' },
    { id: 'c2', title: 'Organize Bookshelf', reward: 50, status: 'verified', date: 'Yesterday' },
    { id: 'c3', title: 'Water the Garden', reward: 20, status: 'assigned', date: 'Every Mon/Wed' },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Family Learning</h1>
          <p className="text-gray-500">Parent Hub for {profile?.full_name?.split(' ')[0] || 'Parent'}</p>
        </div>
        <div className="w-12 h-12 bg-white rounded-2xl shadow-clay flex items-center justify-center text-primary relative">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">2</span>
        </div>
      </div>

      {/* Child Status Overview */}
      <div className="bg-primary p-8 rounded-[40px] shadow-clay-primary text-white flex flex-col md:flex-row gap-8 items-center">
        <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden shadow-lg flex-shrink-0">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Kamau`} alt="Student" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold mb-2">{studentName}'s Today</h2>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <StatusPill icon={<Zap size={14} />} label="Streak" value="5 Days" />
            <StatusPill icon={<Coins size={14} />} label="Earned" value="125 LC" />
            <StatusPill icon={<Activity size={14} />} label="Focus" value={`${focusScore}%`} />
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white text-primary rounded-2xl font-bold text-sm shadow-md hover:scale-105 transition-all">Quick Message</button>
          <button className="px-6 py-3 bg-white/20 text-white rounded-2xl font-bold text-sm backdrop-blur-md hover:bg-white/30 transition-all">Reward Store</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200">
        {['overview', 'progress', 'chores'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`pb-4 px-2 text-sm font-bold capitalize transition-all relative ${
              activeTab === tab ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full animate-in zoom-in-50 duration-300"></div>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'overview' && (
            <>
              {/* Recent Activity Timeline */}
              <div className="bg-white/40 rounded-[32px] p-8 shadow-clay">
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <TrendingUp size={20} className="text-primary" />
                  Activity Timeline
                </h3>
                <div className="space-y-6">
                  {recentActivities.map(act => (
                    <div key={act.id} className="relative pl-8 border-l-2 border-gray-100 last:border-0 pb-6 last:pb-0">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 bg-white rounded-full border-2 border-primary shadow-sm"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-800 text-sm">{act.title}</h4>
                          <span className="text-xs text-gray-500">{act.time}</span>
                        </div>
                        <div className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-bold">
                          <Coins size={12} /> +{act.reward}
                        </div>
                      </div>
                      {act.pending && (
                        <div className="mt-3 flex gap-2">
                          <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90">Verify Task</button>
                          <button className="px-4 py-2 bg-white text-gray-500 rounded-xl text-xs font-bold shadow-clay-sm border border-gray-50">Details</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Insight */}
              <div className="bg-white/40 rounded-[32px] p-8 shadow-clay flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-[24px] flex items-center justify-center text-blue-600 shadow-clay-sm">
                    <Star size={32} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">Insight: Afternoon Focus</h3>
                    <p className="text-sm text-gray-500 max-w-sm">
                      {studentName} is 25% more focused between 2 PM and 4 PM. We've optimized their schedule to include harder Science tasks during this window.
                    </p>
                  </div>
                </div>
                <ChevronRight size={24} className="text-gray-300" />
              </div>
            </>
          )}

          {activeTab === 'progress' && (
            <div className="bg-white/40 rounded-[32px] p-8 shadow-clay space-y-8">
              <h3 className="text-xl font-bold text-gray-800">Academic Mastery</h3>
              <div className="space-y-6">
                <SubjectProgress label="Science" val={88} color="bg-green-500" />
                <SubjectProgress label="Mathematics" val={72} color="bg-blue-500" />
                <SubjectProgress label="English" val={95} color="bg-purple-500" />
                <SubjectProgress label="Life Skills" val={64} color="bg-yellow-500" />
              </div>
              <div className="pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">Total Lessons</div>
                  <div className="text-2xl font-bold text-gray-800">42</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <div className="text-xs font-bold text-gray-400 uppercase mb-1">Avg. Quiz Score</div>
                  <div className="text-2xl font-bold text-gray-800">84%</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chores' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">Family Chore System</h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-clay hover:scale-105 transition-all">
                  <Plus size={18} /> Add New Task
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {chores.map(c => (
                  <div key={c.id} className="bg-white/40 rounded-[32px] p-6 shadow-clay flex flex-col justify-between border border-white/50">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-clay-sm flex items-center justify-center text-primary/40">
                        {c.status === 'verified' ? <CheckCircle className="text-green-500" /> : <Calendar />}
                      </div>
                      <div className="flex items-center gap-1 font-bold text-yellow-600">
                        <Coins size={16} /> {c.reward}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{c.title}</h4>
                    <div className="flex justify-between items-center mt-4">
                      <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                        c.status === 'verified' ? 'bg-green-100 text-green-700' :
                        c.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-500'
                      }`}>{c.status}</span>
                      {c.status === 'pending' && (
                        <button className="text-xs font-bold text-primary hover:underline">Verify Now</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white/40 rounded-[32px] p-8 shadow-clay">
            <h4 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Info size={18} className="text-blue-500" /> Education Advisory
            </h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0"><BookOpen size={18} /></div>
                <div>
                  <div className="text-sm font-bold text-gray-800">New Science Strand</div>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">Grade 6 Science has introduced "Body Systems". Encourage {studentName} to try the VR Lab today.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 flex-shrink-0"><Award size={18} /></div>
                <div>
                  <div className="text-sm font-bold text-gray-800">Mastery Milestone</div>
                  <p className="text-xs text-gray-500 leading-relaxed mt-1">{studentName} is top 5% in English Vocabulary this month!</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 bg-[#e0e5ec] text-gray-600 rounded-2xl font-bold text-xs shadow-clay hover:bg-white/50 transition-all">View All Advice</button>
          </div>

          <div className="bg-[#e0e5ec] rounded-[32px] p-6 shadow-clay-inset text-center border border-white/40">
            <h4 className="font-bold text-gray-800 mb-2">Device Control</h4>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-green-600 mb-4">
              <Shield size={14} /> Safe Search Active
            </div>
            <div className="p-4 bg-white/40 rounded-2xl shadow-clay-sm flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-gray-600">Daily Limit</span>
              <span className="text-sm font-bold text-gray-800">2h 30m</span>
            </div>
            <button className="w-full py-2 text-xs font-bold text-primary hover:underline">Manage Restrictions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusPill = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-2 px-3 py-1.5 bg-white/15 rounded-xl backdrop-blur-md border border-white/10">
    <span className="opacity-70">{icon}</span>
    <span className="text-xs font-bold uppercase tracking-widest opacity-70">{label}:</span>
    <span className="text-sm font-black">{value}</span>
  </div>
);

const SubjectProgress = ({ label, val, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="font-bold text-gray-700">{label}</span>
      <span className="font-bold text-gray-400">{val}%</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${val}%` }}></div>
    </div>
  </div>
);

export default ParentDashboard;