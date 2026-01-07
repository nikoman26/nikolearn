import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Sparkles, GraduationCap, ShieldCheck, Heart, UserCircle, Users, BookOpen } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student' | 'parent' | 'teacher'>('student');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e?: React.FormEvent, manualEmail?: string, manualPass?: string) => {
    if (e) e.preventDefault();
    setLoading(true);
    
    const targetEmail = manualEmail || email;
    const targetPass = manualPass || password;

    try {
      if (isLogin || manualEmail) {
        await signIn(targetEmail, targetPass);
      } else {
        await signUp(targetEmail, targetPass, fullName, role);
      }
    } catch (error) {
      console.error('Auth error:', error);
      alert('Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { label: 'Student', email: 'kamau@nikolearn.ke', icon: <UserCircle size={16} />, color: 'bg-blue-50 text-blue-700' },
    { label: 'Parent', email: 'nyawira@parent.ke', icon: <Users size={16} />, color: 'bg-green-50 text-green-700' },
    { label: 'Teacher', email: 'omari@school.ke', icon: <BookOpen size={16} />, color: 'bg-purple-50 text-purple-700' },
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-clay">
      {/* Visual Side */}
      <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8">
            <Sparkles size={32} />
          </div>
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Empowering the <br />Next Generation
          </h1>
          <p className="text-white/80 text-lg mb-8">
            Access world-class CBC education through immersive VR and gamified learning.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>
              <span className="text-sm">Verified CBC Curriculum</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Heart size={18} />
              </div>
              <span className="text-sm">Child-Safe Learning Environment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="md:w-1/2 p-8 md:p-12 bg-[#f8fafc] flex flex-col">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <p className="text-gray-500 mt-2">
            {isLogin ? 'Log in to continue your quest' : 'Start your learning adventure today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-xl">
                {(['student', 'parent', 'teacher'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                      role === r 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              placeholder="Email Address"
              required
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              placeholder="Password"
              required
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-primary text-white rounded-xl font-bold shadow-clay-primary hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <GraduationCap size={20} />
                {isLogin ? 'Log In' : 'Sign Up'}
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-primary font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </p>
        </div>

        {/* Demo Accounts Section */}
        {isLogin && (
          <div className="mt-auto pt-8">
            <div className="relative flex py-4 items-center">
              <div className="flex-grow border-t border-gray-100"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-black uppercase tracking-widest">Quick Demo Access</span>
              <div className="flex-grow border-t border-gray-100"></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.label}
                  onClick={() => handleSubmit(undefined, account.email, 'Learny26@#')}
                  disabled={loading}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-clay-sm ${account.color}`}
                >
                  {account.icon}
                  <span className="text-[10px] font-black uppercase">{account.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};