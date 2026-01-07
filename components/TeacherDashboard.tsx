import React, { useState } from 'react';
import { 
  BookOpen, Users, TrendingUp, Award, Calendar, 
  Plus, BarChart3, FileText, Target, 
  MessageSquare, Settings, Eye, AlertCircle, 
  MoreHorizontal, Download, Filter
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LessonArchitect } from './teacher/LessonArchitect';
import { AttentionHeatmap } from './teacher/AttentionHeatmap';

export const TeacherDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'class' | 'content' | 'analytics'>('overview');
  const [showArchitect, setShowArchitect] = useState(false);

  const students = [
    { id: '1', name: 'Kamau Otieno', focus: 92, progress: 85, status: 'active', lastActive: '10m ago', alerts: 0 },
    { id: '2', name: 'Grace Wanjiru', focus: 45, progress: 72, status: 'distracted', lastActive: '2m ago', alerts: 2 },
    { id: '3', name: 'David Kimani', focus: 88, progress: 91, status: 'active', lastActive: '5m ago', alerts: 0 },
    { id: '4', name: 'Sarah Nyambura', focus: 75, progress: 68, status: 'idle', lastActive: '1h ago', alerts: 1 },
    { id: '5', name: 'James Muthomi', focus: 82, progress: 79, status: 'active', lastActive: '15m ago', alerts: 0 },
  ];

  const lessons = [
    { id: 'l1', title: 'Human Circulatory System', grade: 6, status: 'Published', views: 45, completion: 78 },
    { id: 'l2', title: 'Soil Fertility & Management', grade: 5, status: 'Draft', views: 0, completion: 0 },
    { id: 'l3', title: 'Introduction to Algebra', grade: 6, status: 'Published', views: 32, completion: 65 },
  ];

  if (showArchitect) {
    return (
      <div className="space-y-6">
        <button onClick={() => setShowArchitect(false)} className="text-primary font-bold hover:underline mb-4 flex items-center gap-2">
          ← Back to Hub
        </button>
        <LessonArchitect />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teacher Hub</h1>
          <p className="text-gray-500">Mwalimu {profile?.full_name?.split(' ')[1] || 'Teacher'}, here is your class overview.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-clay text-sm font-bold text-gray-600 hover:bg-white/50 transition-all">
            <Download size={18} /> Reports
          </button>
          <button 
            onClick={() => setShowArchitect(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl shadow-clay text-sm font-bold hover:scale-105 transition-all"
          >
            <Plus size={18} /> New Lesson
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard icon={<Users />} label="Total Students" value="24" trend="+2 this week" />
        <MetricCard icon={<Eye />} label="Avg. Class Focus" value="78%" trend="-5% from yesterday" color="text-orange-500" />
        <MetricCard icon={<Target />} label="Curriculum Completion" value="64%" trend="On Track" />
        <MetricCard icon={<AlertCircle />} label="Attention Alerts" value="3" trend="Needs Action" color="text-red-500" />
      </div>

      {/* Tabs */}
      <div className="flex bg-[#d1d9e6] p-1 rounded-2xl w-full max-w-2xl overflow-x-auto scrollbar-hide">
        {['overview', 'class', 'content', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 px-6 rounded-xl text-sm font-bold capitalize transition-all whitespace-nowrap ${
              activeTab === tab ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Class Status */}
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white/40 rounded-[32px] p-6 shadow-clay border border-white/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Live Attention Monitor</h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Real-time Data
                  </div>
                </div>
                <div className="space-y-4">
                  {students.slice(0, 4).map(s => (
                    <div key={s.id} className="flex items-center justify-between p-4 bg-white/60 rounded-2xl shadow-clay-sm">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {s.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{s.name}</div>
                          <div className="text-xs text-gray-500">{s.lastActive} • {s.status}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className={`text-sm font-bold ${s.focus < 50 ? 'text-red-500' : 'text-green-600'}`}>
                            {s.focus}% Focus
                          </div>
                          <div className="w-20 h-1.5 bg-gray-200 rounded-full mt-1 overflow-hidden">
                            <div className={`h-full ${s.focus < 50 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${s.focus}%` }}></div>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MessageSquare size={18} className="text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 py-3 text-sm font-bold text-primary hover:underline" onClick={() => setActiveTab('class')}>
                  View Full Roster
                </button>
              </div>

              {/* Aggregated Heatmap View */}
              <AttentionHeatmap />
            </div>

            {/* Quick Stats sidebar */}
            <div className="space-y-6">
              <div className="bg-primary p-6 rounded-[32px] shadow-clay-primary text-white">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Award size={20} /> Today's Goal
                </h4>
                <p className="text-sm opacity-90 mb-4">Target: 80% class mastery on "Blood Vessels" quiz.</p>
                <div className="flex items-end justify-between">
                  <div className="text-3xl font-bold">18/24</div>
                  <div className="text-xs font-bold bg-white/20 px-2 py-1 rounded">75% Done</div>
                </div>
              </div>
              
              <div className="bg-white/40 rounded-[32px] p-6 shadow-clay">
                <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-blue-500" /> Upcoming
                </h4>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-xl border-l-4 border-blue-500">
                    <div className="text-sm font-bold text-gray-800">Grade 6 Science Lab</div>
                    <div className="text-xs text-gray-500">Tomorrow, 10:00 AM</div>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-xl border-l-4 border-purple-500">
                    <div className="text-sm font-bold text-gray-800">Parent Meeting (Kamau)</div>
                    <div className="text-xs text-gray-500">Friday, 3:30 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'class' && (
          <div className="bg-white/40 rounded-[40px] p-8 shadow-clay">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800">Student Roster</h3>
              <div className="flex gap-2">
                <button className="p-2 shadow-clay rounded-xl bg-white"><Filter size={20} /></button>
                <button className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold">Add Student</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs text-gray-400 uppercase tracking-widest border-b border-gray-100">
                    <th className="pb-4 font-bold">Student Name</th>
                    <th className="pb-4 font-bold">Focus Avg</th>
                    <th className="pb-4 font-bold">Mastery</th>
                    <th className="pb-4 font-bold">Status</th>
                    <th className="pb-4 font-bold">Alerts</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {students.map(s => (
                    <tr key={s.id} className="group hover:bg-white/20 transition-all">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 text-xs">{s.name[0]}</div>
                          <span className="font-bold text-gray-800">{s.name}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`text-sm font-bold ${s.focus > 80 ? 'text-green-600' : 'text-orange-500'}`}>{s.focus}%</span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${s.progress}%` }}></div>
                          </div>
                          <span className="text-xs font-bold text-gray-500">{s.progress}%</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-lg ${
                          s.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>{s.status}</span>
                      </td>
                      <td className="py-4 text-center">
                        {s.alerts > 0 ? (
                          <span className="w-6 h-6 flex items-center justify-center bg-red-100 text-red-600 rounded-full text-xs font-bold">{s.alerts}</span>
                        ) : '-'}
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity"><MoreHorizontal size={20} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lessons.map(l => (
              <div key={l.id} className="bg-white/40 rounded-[32px] p-6 shadow-clay border border-white/50 group hover:shadow-clay-inset transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                    l.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>{l.status}</div>
                  <BookOpen size={20} className="text-primary/40" />
                </div>
                <h4 className="font-bold text-gray-800 text-lg mb-2">{l.title}</h4>
                <div className="text-sm text-gray-500 mb-6">Grade {l.grade} • {l.views} views</div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-gray-200" />
                    ))}
                    <div className="text-[10px] text-gray-400 flex items-center ml-4 font-bold">{l.completion}% Mastery</div>
                  </div>
                  <button className="text-primary font-bold text-sm hover:underline">Edit</button>
                </div>
              </div>
            ))}
            <button 
              onClick={() => setShowArchitect(true)}
              className="bg-[#e0e5ec] rounded-[32px] border-4 border-dashed border-gray-300 flex flex-col items-center justify-center p-6 text-gray-400 hover:text-primary hover:border-primary transition-all group"
            >
              <Plus size={40} className="mb-2 group-hover:scale-110 transition-transform" />
              <span className="font-bold">New CBC Lesson</span>
            </button>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <AttentionHeatmap />
            <div className="bg-white/40 rounded-[40px] p-12 shadow-clay text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-primary/10 rounded-[28px] flex items-center justify-center text-primary mb-6 shadow-clay-sm">
                <BarChart3 size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Class Performance Deep Dive</h3>
              <p className="text-gray-500 max-w-lg mb-8">
                Generate reports based on specific CBC Strands to see how well the class is meeting expectations.
              </p>
              <div className="flex gap-4">
                <button className="px-8 py-3 bg-primary text-white rounded-2xl font-bold shadow-clay hover:opacity-90">Generate Weekly Report</button>
                <button className="px-8 py-3 bg-white text-gray-600 rounded-2xl font-bold shadow-clay border border-gray-100">Export CSV</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const MetricCard = ({ icon, label, value, trend, color = "text-primary" }: any) => (
  <div className="bg-[#e0e5ec] p-6 rounded-[32px] shadow-clay flex items-center gap-4">
    <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center ${color} shadow-clay-sm`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div className="flex-1">
      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</div>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold text-gray-800">{value}</div>
        <div className="text-[10px] font-bold text-gray-400">{trend}</div>
      </div>
    </div>
  </div>
);

export default TeacherDashboard;