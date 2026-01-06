import React from 'react';
import { TrendingUp, Globe, Target, Shield, Users, Award, BarChart3, Zap, MapPin, DollarSign } from 'lucide-react';

export const InvestorPitchPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-24">
      {/* Hero Header */}
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-bold text-sm">
          <TrendingUp size={16} />
          Investment Opportunity: Seed Round
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-800">
          The Future of EdTech <br />in <span className="text-primary">Emerging Markets.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
          NIKOlearn is bridging the digital divide with an offline-first infrastructure designed specifically for Africa's unique educational landscape.
        </p>
      </section>

      {/* Market Opportunity */}
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-gray-800">The Problem</h2>
          <div className="space-y-6">
            <ProblemItem 
              title="connectivity Gap" 
              desc="70% of learners in Sub-Saharan Africa lack reliable high-speed internet access." 
            />
            <ProblemItem 
              title="Curriculum Mismatch" 
              desc="Most EdTech solutions use Western contexts, alienating local learners." 
            />
            <ProblemItem 
              title="Neurodivergent Neglect" 
              desc="Standard classrooms fail to support unique cognitive needs, leading to high dropout rates." 
            />
          </div>
        </div>
        <div className="bg-[#e0e5ec] p-12 rounded-[48px] shadow-clay flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">100M+</div>
            <div className="text-xl font-bold text-gray-500 uppercase tracking-widest">Target Students</div>
            <div className="text-sm text-gray-400">In Sub-Saharan Africa by 2026</div>
          </div>
        </div>
      </section>

      {/* Our Solution - Key Differentiators */}
      <section className="space-y-12">
        <h2 className="text-4xl font-bold text-gray-800 text-center">Key Differentiators</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <DiffCard 
            icon={<Zap />} 
            title="Offline-First Stack" 
            desc="Proprietary caching engine allowing high-quality video & VR without active internet." 
          />
          <DiffCard 
            icon={<Globe />} 
            title="Localized AI" 
            desc="Gemini-powered 'Mwalimu AI' trained on CBC curriculum with Kiswahili support." 
          />
          <DiffCard 
            icon={<Users />} 
            title="Family-Economy" 
            desc="Incentivizing learning through household chores & LearnCoin rewards." 
          />
        </div>
      </section>

      {/* Roadmap/Traction */}
      <section className="bg-gray-800 p-12 rounded-[48px] text-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold">Scalable Business Model</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <DollarSign size={24} />
                </div>
                <p className="text-lg opacity-90">B2B: Licensing to schools & institutions.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <Users size={24} />
                </div>
                <p className="text-lg opacity-90">B2C: Affordable monthly family subscriptions.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <p className="text-lg opacity-90">G2B: Partnerships with Ministry of Education.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatBox label="User Retention" value="92%" />
            <StatBox label="CAC" value="$4.50" />
            <StatBox label="Avg Mastery" value="+40%" />
            <StatBox label="Partnerships" value="12+" />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">Join the Education Revolution</h2>
        <button className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-lg hover:scale-105 transition-transform">
          Request Pitch Deck
        </button>
      </section>
    </div>
  );
};

const ProblemItem = ({ title, desc }: any) => (
  <div className="flex gap-4">
    <div className="mt-1">
      <div className="w-2 h-2 bg-red-500 rounded-full" />
    </div>
    <div>
      <h4 className="font-bold text-gray-800 text-lg">{title}</h4>
      <p className="text-gray-500">{desc}</p>
    </div>
  </div>
);

const DiffCard = ({ icon, title, desc }: any) => (
  <div className="bg-[#e0e5ec] p-8 rounded-[40px] shadow-clay flex flex-col gap-6">
    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-clay-sm">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div className="space-y-2">
      <h3 className="font-bold text-xl text-gray-800">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{desc}</p>
    </div>
  </div>
);

const StatBox = ({ label, value }: any) => (
  <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-md text-center">
    <div className="text-3xl font-bold mb-1">{value}</div>
    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</div>
  </div>
);