import React from 'react';
import { ViewState } from '../types';
import { ArrowRight, Zap, BookOpen, TrendingUp, Users, Lock, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  setView: (view: ViewState) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ setView }) => {
  return (
    <div className="min-h-screen bg-[#e0e5ec] pt-16 md:pt-0">
      
      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
            The Future of <span className="text-primary">African Education</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            NIKOlearn delivers personalized, gamified, and culturally relevant learning experiences powered by AI.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setView(ViewState.Login)}
              className="px-8 py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-clay-primary hover:bg-primary/90 transition-all active:scale-[0.98] flex items-center gap-2"
            >
              Start Learning Now <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setView(ViewState.InvestorPitch)}
              className="px-8 py-4 bg-[#e0e5ec] text-gray-700 font-bold text-lg rounded-2xl shadow-clay hover:bg-white/50 transition-all active:scale-[0.98]"
            >
              Investor Pitch
            </button>
          </div>
        </div>

        {/* Video Showcase */}
        <div className="h-[500px] w-full max-w-5xl mx-auto">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-[32px] flex items-center justify-center relative overflow-hidden group shadow-2xl">
            {/* 
              NOTE: Ensure Proposal.mp4 is placed in the project's 'public' directory 
              for the root path ('/') to resolve correctly.
              
              ACTION REQUIRED: Please rename 'pexels-ketut-subiyanto-4545780.jpg' to 
              'video-poster.jpg' and place it in the 'public/images/' directory.
            */}
            <video
              src="/Proposal.mp4"
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-[32px]"
              poster="/images/video-poster.jpg" // Using the selected image as the poster
            >
              Your browser does not support the video tag.
            </video>
            {/* Removed placeholder icons */}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#f8f9fb] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">Why NIKOlearn?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <FeatureCard 
              icon={<Zap size={32} />}
              title="AI-Powered Personalization"
              description="Adaptive learning paths that adjust in real-time to the student's pace and style, ensuring maximum retention."
            />
            <FeatureCard 
              icon={<BookOpen size={32} />}
              title="Culturally Relevant Content"
              description="Curriculum aligned with the Competency-Based Curriculum (CBC) and infused with African context and stories."
            />
            <FeatureCard 
              icon={<TrendingUp size={32} />}
              title="Gamified Motivation"
              description="Earn LearnCoins, unlock achievements, and compete on leaderboards to make learning addictive and fun."
            />
          </div>
        </div>
      </section>

      {/* Call to Action for Parents/Teachers */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white p-10 sm:p-16 rounded-3xl shadow-clay flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:max-w-xl mb-8 lg:mb-0">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Empower Your Child's Future</h3>
            <p className="text-lg text-gray-600">
              Parents and educators can monitor progress, access detailed analytics, and engage with the learning community.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setView(ViewState.ParentsOverview)}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-clay-blue hover:bg-blue-600 transition-all flex items-center gap-2 justify-center"
            >
              Parent Overview <ChevronRight size={20} />
            </button>
            <button 
              onClick={() => setView(ViewState.Login)}
              className="px-6 py-3 bg-[#e0e5ec] text-gray-700 font-semibold rounded-xl shadow-clay hover:bg-white/50 transition-all flex items-center gap-2 justify-center"
            >
              Teacher Login
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#e0e5ec] border-t border-white/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} NIKOlearn. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => setView(ViewState.FAQ)} className="hover:text-primary transition-colors">FAQ</button>
            <button onClick={() => setView(ViewState.InvestorPitch)} className="hover:text-primary transition-colors">Careers</button>
            <button onClick={() => setView(ViewState.FAQ)} className="hover:text-primary transition-colors">Privacy Policy</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, description: string }> = ({ icon, title, description }) => (
  <div className="p-8 bg-[#e0e5ec] rounded-3xl shadow-clay text-center hover:shadow-clay-hover transition-shadow duration-300">
    <div className="w-16 h-16 bg-white rounded-2xl shadow-clay-sm text-primary flex items-center justify-center mx-auto mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);