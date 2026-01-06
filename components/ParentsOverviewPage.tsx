import React from 'react';
import { Shield, Heart, TrendingUp, Users, CheckCircle, Smartphone, Lock, Award, Clock } from 'lucide-react';

export const ParentsOverviewPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-24">
      {/* Header */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-800">
          Partnering in Your <br />Child's <span className="text-primary">Success.</span>
        </h1>
        <p className="text-xl text-gray-500 max-w-3xl mx-auto">
          NIKOlearn gives you the tools to monitor progress, ensure safety, and build positive learning habits at home.
        </p>
      </section>

      {/* Core Features for Parents */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BenefitCard 
          icon={<Shield />} 
          title="Safe Learning" 
          desc="Strict content filtering and privacy-first local monitoring. No ads, ever." 
        />
        <BenefitCard 
          icon={<TrendingUp />} 
          title="Progress Insights" 
          desc="Deep analytics into where your child excels and where they need extra support." 
        />
        <BenefitCard 
          icon={<Heart />} 
          title="Habit Building" 
          desc="Encourage positive learning through our Family Mode chore-and-reward system." 
        />
      </section>

      {/* Family Mode Deep Dive */}
      <section className="bg-[#e0e5ec] p-12 rounded-[56px] shadow-clay grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-gray-800">The NIKO Family Mode</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Link learning to responsibility. Assign household tasks and reward them with LearnCoins that they can spend on avatar items or privileges.
          </p>
          <div className="space-y-4">
            <StepItem step="1" text="Assign a chore (e.g., 'Clean the table')" />
            <StepItem step="2" text="Child completes the task and requests verification" />
            <StepItem step="3" text="You verify through your dashboard" />
            <StepItem step="4" text="They earn LearnCoins to use in the Shop" />
          </div>
        </div>
        <div className="relative">
          <div className="bg-white p-8 rounded-[40px] shadow-clay-sm space-y-6">
            <h4 className="font-bold text-gray-800 border-b pb-4">Pending Verifications</h4>
            <div className="space-y-4">
              <ChoreItem title="Water the Garden" reward="50 LC" />
              <ChoreItem title="Explain Photosynthesis" reward="100 LC" />
            </div>
            <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold">Open Parent Dashboard</button>
          </div>
        </div>
      </section>

      {/* Trust & Safety */}
      <section className="text-center space-y-12">
        <h2 className="text-4xl font-bold text-gray-800">Built on Trust</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <TrustPill icon={<Smartphone />} text="COPPA Compliant" />
          <TrustPill icon={<Lock />} text="Local Processing" />
          <TrustPill icon={<Award />} text="KICD Approved" />
          <TrustPill icon={<Clock />} text="Screen Time Control" />
        </div>
      </section>
    </div>
  );
};

const BenefitCard = ({ icon, title, desc }: any) => (
  <div className="bg-white p-10 rounded-[48px] shadow-clay-sm flex flex-col gap-6 hover:scale-105 transition-transform">
    <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center text-primary">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const StepItem = ({ step, text }: any) => (
  <div className="flex items-center gap-4">
    <div className="w-10 h-10 rounded-full bg-white shadow-clay-sm flex items-center justify-center font-bold text-primary">{step}</div>
    <span className="font-medium text-gray-700">{text}</span>
  </div>
);

const ChoreItem = ({ title, reward }: any) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
    <div>
      <div className="font-bold text-gray-800">{title}</div>
      <div className="text-xs text-primary font-bold">{reward}</div>
    </div>
    <button className="px-4 py-2 bg-green-500 text-white rounded-xl text-xs font-bold">Verify</button>
  </div>
);

const TrustPill = ({ icon, text }: any) => (
  <div className="bg-[#e0e5ec] p-6 rounded-3xl shadow-clay flex flex-col items-center gap-3">
    <div className="text-primary">{React.cloneElement(icon, { size: 28 })}</div>
    <span className="text-sm font-bold text-gray-600">{text}</span>
  </div>
);