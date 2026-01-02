import React, { useState } from 'react';
import { User, Settings, LogOut, Edit3, Camera, Bell, ChevronRight, Shield, Award, Clock, TrendingUp, BookOpen } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileManagerProps {
  user: UserProfile;
  onUpdateProfile: (updates: Partial<UserProfile>) => void;
}

export const ProfileManager: React.FC<ProfileManagerProps> = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user.name,
    avatarUrl: user.avatarUrl,
    role: user.role,
  });

  const handleSave = () => {
    onUpdateProfile(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role,
    });
    setIsEditing(false);
  };

  const stats = [
    { label: 'Total Lessons', value: 156, icon: BookOpen, color: 'text-blue-600' },
    { label: 'Learning Streak', value: 12, icon: Award, color: 'text-green-600' },
    { label: 'Focus Time', value: '48.5 hrs', icon: Clock, color: 'text-purple-600' },
    { label: 'Achievements', value: 23, icon: TrendingUp, color: 'text-orange-600' },
  ];

  if (isEditing) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
              <input
                type="url"
                value={editForm.avatarUrl}
                onChange={(e) => setEditForm({ ...editForm, avatarUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value as any })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Profile Management</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="p-2 text-primary hover:bg-primary/100 rounded-lg transition-colors"
        >
          <Edit3 size={20} />
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Profile Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
              <p className="text-sm text-gray-600 capitalize">{user.role}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <User className="text-gray-400" size={16} />
              <span className="text-gray-600">ID: {user.id}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="text-yellow-500" size={16} />
              <span className="text-gray-600">Level {user.coins}</span>
            </div>
          </div>
        </div>

        {/* Learning Statistics */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Learning Statistics</h3>
          <div className="space-y-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon className={stat.color} size={20} />
                    <span className="text-gray-700 font-medium">{stat.label}</span>
                  </div>
                  <span className={`text-lg font-bold ${stat.color}`}>{stat.value}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center space-x-2 p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100">
              <Settings size={16} />
              <span>Preferences</span>
            </button>
            <button className="flex items-center space-x-2 p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100">
              <Bell size={16} />
              <span>Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
