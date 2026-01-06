import React, { useState } from 'react';
import { User, Lock, Mail, UserPlus, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: 'student' as 'student' | 'parent' | 'teacher' | 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const result = await signIn(formData.email, formData.password);
        if (result.error) {
          setError(result.error);
        }
      } else {
        const result = await signUp(formData.email, formData.password, formData.fullName, formData.role);
        if (result.error) {
          setError(result.error);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-[#e0e5ec] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-clay mx-auto mb-4">
            N
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">NIKOlearn</h1>
          <p className="text-gray-500">Presently Learning</p>
        </div>

        {/* Auth Form */}
        <div className="bg-[#e0e5ec] rounded-3xl shadow-clay p-8">
          
          {/* Toggle Buttons */}
          <div className="flex bg-[#d1d9e6] rounded-2xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                isLogin 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-xl text-sm font-semibold transition-all ${
                !isLogin 
                  ? 'bg-white text-primary shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name (Sign Up Only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-10 pr-4 bg-[#e0e5ec] shadow-clay-inset rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Role Selection (Sign Up Only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">I am a...</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full h-12 pl-4 pr-4 bg-[#e0e5ec] shadow-clay-inset rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-10 pr-4 bg-[#e0e5ec] shadow-clay-inset rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full h-12 pl-10 pr-12 bg-[#e0e5ec] shadow-clay-inset rounded-2xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-2xl text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-primary text-white font-bold rounded-2xl shadow-[8px_8px_16px_rgba(109,93,252,0.4),-8px_-8px_16px_#ffffff] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  {!isLogin && <UserPlus size={18} />}
                </>
              )}
            </button>
          </form>

          {/* Demo Users */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center mb-3">🎯 Ready-to-Demo Accounts:</p>
            <p className="text-xs text-gray-400 text-center mb-4">After database seeding with workingSeed.sql</p>
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    email: 'kamau@nikolearn.ke',
                    password: 'Learny26@#',
                    fullName: '',
                    role: 'student'
                  });
                  setIsLogin(true);
                }}
                className="w-full text-xs py-3 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-left"
              >
                <div className="font-semibold">👨‍🎓 Kamau Maina (Student)</div>
                <div className="text-green-600">Grade 7 • 485 LearnCoins • 7-day streak</div>
                <div className="text-green-500">kamau@nikolearn.ke</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    email: 'nyawira@parent.ke',
                    password: 'Learny26@#',
                    fullName: '',
                    role: 'parent'
                  });
                  setIsLogin(true);
                }}
                className="w-full text-xs py-3 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-left"
              >
                <div className="font-semibold">👩‍👧‍👦 Nyawira Maina (Parent)</div>
                <div className="text-blue-600">Creates & verifies family chores</div>
                <div className="text-blue-500">nyawira@parent.ke</div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({
                    email: 'omari@school.ke',
                    password: 'Learny26@#',
                    fullName: '',
                    role: 'teacher'
                  });
                  setIsLogin(true);
                }}
                className="w-full text-xs py-3 px-4 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-left"
              >
                <div className="font-semibold">👩‍🏫 Mwalimu Omari (Teacher)</div>
                <div className="text-purple-600">KICD Grade 7 curriculum content</div>
                <div className="text-purple-500">omari@school.ke</div>
              </button>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-700">
                <strong>📋 Setup Required:</strong> Run database seeding first with 
                <code className="bg-yellow-100 px-1 rounded">scripts/workingSeed.sql</code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
