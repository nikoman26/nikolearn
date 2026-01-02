import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Shield, Users, Smartphone, Award } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqCategories = [
    {
      title: "About NIKOlearn",
      icon: <BookOpen size={20} />,
      color: "bg-blue-500",
      questions: [
        {
          question: "What is NIKOlearn?",
          answer: "NIKOlearn is a holistic, AI-powered learning platform designed for African learners. It combines academic curriculum learning with immersive experiences (VR/AR), personalized AI support, gamified motivation, family participation, and real-world life skills such as financial literacy, health, and emergency preparedness."
        },
        {
          question: "Who is NIKOlearn designed for?",
          answer: "NIKOlearn is built for: Students (primary to secondary level), Neurodivergent learners, Parents and families, Teachers and schools, Homeschooling households. The platform adapts to different learning styles, speeds, and needs."
        },
        {
          question: "Is NIKOlearn aligned with the Kenyan curriculum?",
          answer: "Yes. NIKOlearn is aligned with the Kenyan Competency-Based Curriculum (CBC) and is designed to support current and future KICD requirements. The platform can also be adapted to other curricula where needed."
        }
      ]
    },
    {
      title: "For Teachers & Schools",
      icon: <Users size={20} />,
      color: "bg-green-500",
      questions: [
        {
          question: "Does NIKOlearn replace teachers?",
          answer: "No. NIKOlearn is designed to support and empower teachers, not replace them. It reduces workload through automated marking, analytics, and AI assistance, allowing teachers to focus more on guidance, mentorship, and classroom engagement."
        }
      ]
    },
    {
      title: "Accessibility & Support",
      icon: <HelpCircle size={20} />,
      color: "bg-purple-500",
      questions: [
        {
          question: "How does NIKOlearn support neurodivergent learners?",
          answer: "NIKOlearn includes: Adjustable sensory settings, Flexible pacing and lesson chunking, Multiple content formats (visual, audio, interactive), AI-guided personalization, Reduced cognitive overload design. Learners can engage in ways that suit them best."
        }
      ]
    },
    {
      title: "Technical Requirements",
      icon: <Smartphone size={20} />,
      color: "bg-orange-500",
      questions: [
        {
          question: "Does NIKOlearn require constant internet access?",
          answer: "No. NIKOlearn is offline-first. Learners can download lessons and continue learning without internet. Progress syncs automatically once connectivity is restored. This makes it suitable for rural and low-connectivity environments."
        },
        {
          question: "What devices does NIKOlearn work on?",
          answer: "NIKOlearn works on: Tablets, Laptops, Smartphones, Low-cost VR headsets (optional). It is optimized for tablets used in schools and homes."
        }
      ]
    },
    {
      title: "Privacy & Safety",
      icon: <Shield size={20} />,
      color: "bg-red-500",
      questions: [
        {
          question: "Is my child's data safe?",
          answer: "Yes. Child safety and privacy are core to NIKOlearn's design. Data is encrypted, Role-based access is enforced, No raw camera footage is stored, Parents have full visibility and control."
        }
      ]
    },
    {
      title: "Gamification & Rewards",
      icon: <Award size={20} />,
      color: "bg-yellow-500",
      questions: [
        {
          question: "How does the reward system work?",
          answer: "Learners earn LearnCoins for: Completing lessons, Maintaining learning streaks, Participating in challenges, Completing approved household tasks (Family Mode). LearnCoins are used for in-app rewards and learning incentives, not real money."
        },
        {
          question: "How can parents be involved?",
          answer: "Parents can: Track learning progress, Support homework, Set learning goals, Link chores to rewards, View family progress dashboards. NIKOlearn encourages positive, supportive parental involvement, not pressure."
        },
        {
          question: "Is NIKOlearn affordable?",
          answer: "NIKOlearn is designed to be accessible. Pricing options include family plans, school subscriptions, and institutional partnerships to ensure broad access across different income levels."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-purple-500/5">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="text-primary" size={40} />
            <h1 className="text-4xl font-bold text-gray-800">Frequently Asked Questions</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about NIKOlearn's AI-powered learning platform
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Category Header */}
              <div className={`${category.color} text-white p-6`}>
                <div className="flex items-center gap-3">
                  {category.icon}
                  <h2 className="text-2xl font-bold">{category.title}</h2>
                </div>
              </div>

              {/* Questions */}
              <div className="divide-y divide-gray-200">
                {category.questions.map((item, questionIndex) => {
                  const globalIndex = categoryIndex * 10 + questionIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={questionIndex}>
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full text-left p-6 hover:bg-gray-50 transition-colors focus:outline-none focus:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-800 pr-4">
                            {item.question}
                          </h3>
                          {isOpen ? (
                            <ChevronUp className="text-gray-400 flex-shrink-0" size={20} />
                          ) : (
                            <ChevronDown className="text-gray-400 flex-shrink-0" size={20} />
                          )}
                        </div>
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you get the most out of NIKOlearn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
              Contact Support
            </button>
            <button className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
