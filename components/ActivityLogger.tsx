import React, { useState } from 'react';
import { BookOpen, Award, Clock, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface ActivityLog {
  id: string;
  type: 'lesson' | 'achievement' | 'streak' | 'login' | 'error';
  title: string;
  description: string;
  timestamp: Date;
  duration?: number;
  points?: number;
}

interface ActivityLoggerProps {
  userId: string;
}

export const ActivityLogger: React.FC<ActivityLoggerProps> = ({ userId }) => {
  const [logs, setLogs] = useState<ActivityLog[]>([
    {
      id: '1',
      type: 'login',
      title: 'Session Started',
      description: 'User logged in successfully',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    },
    {
      id: '2',
      type: 'lesson',
      title: 'Photosynthesis Completed',
      description: 'Completed interactive lesson on plant energy production',
      timestamp: new Date(Date.now() - 60 * 60 * 1000),
      duration: 25,
      points: 50,
    },
    {
      id: '3',
      type: 'achievement',
      title: 'First Week Streak',
      description: 'Maintained 7-day learning streak',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      points: 100,
    },
  ]);

  const [filter, setFilter] = useState<'all' | 'lessons' | 'achievements' | 'streaks'>('all');

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true;
    if (filter === 'lessons') return log.type === 'lesson';
    if (filter === 'achievements') return log.type === 'achievement';
    if (filter === 'streaks') return log.type === 'streak';
    return false;
  });

  const getActivityIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'lesson': return <BookOpen className="text-blue-600" size={16} />;
      case 'achievement': return <Award className="text-yellow-600" size={16} />;
      case 'streak': return <TrendingUp className="text-green-600" size={16} />;
      case 'login': return <CheckCircle className="text-green-600" size={16} />;
      case 'error': return <AlertCircle className="text-red-600" size={16} />;
      default: return <Clock className="text-gray-600" size={16} />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Activity Logger</h2>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('lessons')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'lessons' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Lessons
          </button>
          <button
            onClick={() => setFilter('achievements')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'achievements' 
                ? 'bg-yellow-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => setFilter('streaks')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'streaks' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Streaks
          </button>
        </div>
      </div>

      {/* Activity Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-blue-600">{logs.filter(l => l.type === 'lesson').length}</div>
          <div className="text-sm text-blue-700">Lessons</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-yellow-600">{logs.filter(l => l.type === 'achievement').length}</div>
          <div className="text-sm text-yellow-700">Achievements</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-green-600">{logs.filter(l => l.type === 'streak').length}</div>
          <div className="text-sm text-green-700">Streaks</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg text-center">
          <div className="text-3xl font-bold text-purple-600">{logs.length}</div>
          <div className="text-sm text-purple-700">Total Activities</div>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <div key={log.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getActivityIcon(log.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-gray-800">{log.title}</h4>
                  <span className="text-sm text-gray-500">{formatDate(log.timestamp)}</span>
                </div>
                <p className="text-gray-700">{log.description}</p>
                {log.duration && (
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock size={14} />
                    <span>{log.duration} minutes</span>
                  </div>
                )}
                {log.points && (
                  <div className="flex items-center space-x-2 text-sm text-green-600 font-medium">
                    <Award size={14} />
                    <span>+{log.points} points</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
