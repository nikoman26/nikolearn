"use client";

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Shield, Wifi, Heart, Brain, Users } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      icon: <Wifi className="text-blue-500" />,
      question: "How does the offline mode work?",
      answer: "NIKOlearn uses a smart-caching system. When you have internet, lessons are pre-downloaded to your device. You can then complete these lessons entirely offline. Your progress syncs automatically once you reconnect."
    },
    {
      icon: <Shield className="text-green-500" />,
      question: "Is my child's privacy protected?",
      answer: "Absolutely. We are privacy-centric. Attention monitoring is processed locally on the device and no video is ever uploaded. We follow strict international data protection standards."
    },
    {
      icon: <Heart className="text-red-500" />,
      question: "How is it designed for neurodivergent learners?",
      answer: "We use a low-cognitive-load UI (Claymorphism), avoid bright/harsh colors, and provide multiple modes of interaction (audio, visual, interactive). Students can also toggle sensory preferences in accessibility settings."
    },
    {
      icon: <Brain className="text-purple-500" />,
      question: "What is Mwalimu AI?",
      answer: "Mwalimu AI is a localized tutor that understands the Kenyan CBC curriculum. It explains concepts using familiar analogies like matatus or market stalls, and supports English/Kiswahili code-switching."
    },
    {
      icon: <Users className="text-orange-500" />,
      question: "How can parents get involved?",
      answer: "Through 'Family Mode', parents can assign household chores that reward children with 'LearnCoins'. You also get a dedicated dashboard to monitor progress and celebrate achievements together."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-500 text-lg">Everything you need to know about NIKOlearn</p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="bg-[#e0e5ec] rounded-[32px] shadow-clay overflow-hidden"
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-8 flex items-center justify-between text-left hover:bg-white/30 transition-colors"
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-clay-sm">
                  {faq.icon}
                </div>
                <span className="text-xl font-bold text-gray-800">{faq.question}</span>
              </div>
              <ChevronDown 
                className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                size={24} 
              />
            </button>
            {openIndex === index && (
              <div className="px-8 pb-8 pt-2 text-gray-600 leading-relaxed text-lg border-t border-gray-200/50">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-16 bg-primary p-12 rounded-[48px] shadow-[8px_8px_16px_rgba(109,93,252,0.4)] text-center text-white">
        <HelpCircle size={48} className="mx-auto mb-6 opacity-80" />
        <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
        <p className="mb-8 opacity-90 text-lg">Our team is here to help you get the most out of NIKOlearn.</p>
        <button className="bg-white text-primary px-10 py-4 rounded-2xl font-bold text-lg hover:scale-105 transition-transform">
          Contact Support
        </button>
      </div>
    </div>
  );
};