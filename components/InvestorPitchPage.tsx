import React from 'react';
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Shield,
  Award,
  BarChart3,
  Lightbulb,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

/* --------------------------------
   Shared Icon Props
-------------------------------- */
type IconProps = {
  size: number;
};

/* --------------------------------
   Custom Icons (Consistent Style)
-------------------------------- */
const VRHeadset = ({ size }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4 7c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h3.5c.7 0 1.3-.4 1.6-1l.9-1.8c.3-.6.9-1 1.6-1s1.3.4 1.6 1l.9 1.8c.3.6.9 1 1.6 1H20c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H4zm5 5H5V9h4v3zm10 0h-4V9h4v3z" />
  </svg>
);

const Brain = ({ size }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M9 2a4 4 0 0 0-4 4v.3A3.5 3.5 0 0 0 3 9.5c0 1.3.7 2.4 1.8 3A3.5 3.5 0 0 0 8 17h1v-2H8a1.5 1.5 0 0 1 0-3H7V9h1a2 2 0 0 0 2-2V2zm6 0h-1v5a2 2 0 0 0 2 2h1v3h-1a1.5 1.5 0 0 1 0 3h-1v2h1a3.5 3.5 0 0 0 3.2-4.5 3.5 3.5 0 0 0-1.8-6.2V6a4 4 0 0 0-4-4z" />
  </svg>
);

const BookOpen = ({ size }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3 4c0-1.1.9-2 2-2h6c1.7 0 3 1.3 3 3v15c-.9-.6-2-.9-3-.9H5c-1.1 0-2-.9-2-2V4zm16-2h-6c-1.7 0-3 1.3-3 3v15c.9-.6 2-.9 3-.9h6c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
  </svg>
);

const Wifi = ({ size }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 4C7.6 4 3.7 5.8 1 8.5l1.4 1.4C4.7 7.6 8.2 6 12 6s7.3 1.6 9.6 3.9L23 8.5C20.3 5.8 16.4 4 12 4z" />
    <path d="M12 8c-2.9 0-5.4 1.1-7.4 3.1l1.4 1.4C7.6 10.9 9.7 10 12 10s4.4.9 6 2.5l1.4-1.4C17.4 9.1 14.9 8 12 8z" />
    <path d="M12 12c-1.5 0-2.8.6-3.8 1.6l1.4 1.4c.6-.6 1.4-1 2.4-1s1.8.4 2.4 1l1.4-1.4c-1-1-2.3-1.6-3.8-1.6z" />
    <circle cx="12" cy="18" r="1.5" />
  </svg>
);

/* --------------------------------
   Investor Pitch Page
-------------------------------- */
export const InvestorPitchPage: React.FC = () => {
  const solutionFeatures = [
    {
      icon: <BookOpen size={24} />,
      title: "Curriculum-Aligned Learning",
      description: "Directly aligned with Kenyan CBC and adaptable to other curricula"
    },
    {
      icon: <Brain size={24} />,
      title: "AI-Driven Personalization",
      description: "Mwalimu AI adapts to each student's learning style and pace"
    },
    {
      icon: <VRHeadset size={24} />,
      title: "Immersive VR/AR Experiences",
      description: "Virtual labs and simulations for hands-on learning"
    },
    {
      icon: <Award size={24} />,
      title: "Gamified Motivation",
      description: "LearnCoins system keeps students engaged"
    },
    {
      icon: <Users size={24} />,
      title: "Family Participation",
      description: "Family Mode brings parents into the learning journey"
    },
    {
      icon: <Wifi size={24} />,
      title: "Offline-First Infrastructure",
      description: "Works reliably in low-connectivity environments"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-purple-500/5">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <TrendingUp size={48} className="text-primary" />
            <h1 className="text-5xl font-bold text-gray-800">For Investors</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            NIKOlearn is transforming education across Africa using AI, immersive learning, and holistic skill development.
          </p>
        </div>

        {/* Solution */}
        <section className="mb-16">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-8 flex items-center gap-3">
              <Lightbulb size={32} />
              The Solution
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutionFeatures.map((feature, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
              <Target size={32} />
              Vision
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto">
              To become Africa’s most trusted learning infrastructure, empowering learners with knowledge, confidence, and life-ready skills.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
