import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Bot, Brain, BookOpen, Target, Trophy } from 'lucide-react';
import { ChatMessage } from '../types';
import { useAuth } from '../contexts/AuthContext';

// Enhanced Mwalimu AI with streaming and CBC curriculum context
const MWALIMU_SYSTEM_PROMPTS = {
  photosynthesis: {
    context: "You are teaching photosynthesis in the Kenyan CBC curriculum. Focus on Grade 5-6 level understanding. Use local examples like maize plants, matatus, or market stalls.",
    keyPoints: ["Chlorophyll captures sunlight", "Carbon dioxide + water + sunlight = glucose + oxygen", "Plants are producers", "Importance for food chains"]
  },
  general: {
    context: "You are Mwalimu AI, a Kenyan teacher expert in CBC curriculum. Use relatable local analogies and support English/Kiswahili code-switching.",
    keyPoints: ["Make complex concepts simple", "Use local examples", "Encourage curiosity", "End with questions"]
  }
};

export const MwalimuChat: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  lessonContext?: string; // e.g., "photosynthesis", "algebra", etc.
}> = ({ isOpen, onClose, lessonContext = 'general' }) => {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: `Jambo ${profile?.full_name?.split(' ')[0] || 'Student'}! 👋 I am Mwalimu AI, your CBC learning companion. I know all about Kenyan curriculum topics like Science, Math, English, and Social Studies. What would you like to learn about today?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentStreamingMessage, setCurrentStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Mock streaming response (in real app, this would use actual AI streaming)
  const streamResponse = async (fullResponse: string) => {
    setIsStreaming(true);
    setCurrentStreamingMessage('');

    const words = fullResponse.split(' ');
    let currentText = '';

    for (let i = 0; i < words.length; i++) {
      currentText += words[i] + ' ';
      setCurrentStreamingMessage(currentText);
      await new Promise(resolve => setTimeout(resolve, 50)); // Simulate streaming delay
    }

    setIsStreaming(false);
    const botMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'model',
      text: fullResponse,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, botMsg]);
    setCurrentStreamingMessage('');
  };

  const generateResponse = (userMessage: string): string => {
    const context = MWALIMU_SYSTEM_PROMPTS[lessonContext as keyof typeof MWALIMU_SYSTEM_PROMPTS] || MWALIMU_SYSTEM_PROMPTS.general;

    // Simple keyword-based response generation (in real app, use actual AI)
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('photosynthesis') || lowerMessage.includes('plant')) {
      return `Ah, photosynthesis! 🌱 This is one of my favorite topics in CBC Science. Let me explain it simply:

In photosynthesis, plants act like tiny factories. They take:
• Carbon dioxide (CO₂) from the air we breathe out
• Water (H₂O) from the soil through their roots
• Sunlight energy from the sun

Using a special green chemical called chlorophyll, they make:
• Glucose (sugar) for the plant to grow
• Oxygen (O₂) that we breathe!

Just like how a matatu needs petrol to run, plants need sunlight as their "fuel." Without photosynthesis, there would be no food for animals or oxygen for us to breathe!

Can you tell me what color chlorophyll makes leaves?`;
    }

    if (lowerMessage.includes('math') || lowerMessage.includes('fraction')) {
      return `Mathematics in CBC helps us understand patterns in the world around us! 📐

In Kenyan markets, we use fractions all the time. If you buy ½ kg of tomatoes and ¼ kg of onions, how much do you have total?

Let me show you: ½ + ¼ = ¾ kg of vegetables!

Fractions are just parts of a whole. Like when you share a chapati equally among friends.

What fraction of a day is 6 hours?`;
    }

    if (lowerMessage.includes('english') || lowerMessage.includes('story')) {
      return `English in CBC helps us communicate and understand stories from around the world! 📚

Let me tell you a quick story: Once there was a clever hyena who wanted to eat all the food in the village. But the wise monkey said, "If you eat everything, what will you eat tomorrow?"

The hyena learned that greed doesn't pay. Just like in Kenya, we share what we have!

What's your favorite story? Can you tell me why you like it?`;
    }

    // Default helpful response
    return `That's an interesting question! 🤔 In CBC curriculum, we learn that understanding comes from asking good questions and making connections.

${userMessage.includes('?') ? 'You asked a great question!' : 'I love that you\'re curious about this topic!'}

Let me help you understand this better. Could you tell me:
1. What grade are you in?
2. What subject is this for?
3. What do you already know about this topic?

That way I can explain it perfectly for your level!`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || isStreaming) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = generateResponse(input);
      await streamResponse(response);
    } catch (error) {
      console.error('Mwalimu AI Error:', error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Pole sana (Sorry)! I\'m having trouble connecting right now. Can you try asking again?',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    "What's photosynthesis?",
    "Help with fractions",
    "Tell me a story",
    "Explain multiplication",
    "Why do we learn Science?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
      <div className="w-full max-w-md h-[85vh] bg-[#e0e5ec] rounded-[32px] shadow-2xl flex flex-col overflow-hidden relative border-4 border-[#e0e5ec]">

        {/* Enhanced Header */}
        <div className="p-4 flex items-center justify-between bg-[#e0e5ec] shadow-sm z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-clay relative">
              <Bot size={28} />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">Mwalimu AI</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Online
                </div>
                {lessonContext !== 'general' && (
                  <div className="flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg">
                    <BookOpen size={12} />
                    {lessonContext}
                  </div>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full shadow-clay flex items-center justify-center text-gray-500 hover:text-red-500 active:shadow-clay-inset transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Learning Context Banner */}
        {lessonContext !== 'general' && (
          <div className="px-4 py-2 bg-gradient-to-r from-primary/10 to-purple-100 border-b border-primary/20">
            <div className="flex items-center gap-2 text-sm text-primary font-medium">
              <Target size={16} />
              Learning about: <span className="capitalize font-bold">{lessonContext}</span>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#e0e5ec]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed
                  ${msg.role === 'user'
                    ? 'bg-primary text-white shadow-[5px_5px_10px_rgba(109,93,252,0.4),-5px_-5px_10px_#ffffff] rounded-tr-none'
                    : msg.isError
                      ? 'bg-red-100 text-red-700 shadow-clay rounded-tl-none'
                      : 'bg-[#e0e5ec] text-gray-700 shadow-clay rounded-tl-none'}
                `}
              >
                {msg.text}
                {msg.role === 'model' && (
                  <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                    <Brain size={12} />
                    CBC Curriculum Expert
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Streaming Message */}
          {isStreaming && (
            <div className="flex justify-start">
              <div className="bg-[#e0e5ec] p-4 rounded-2xl rounded-tl-none shadow-clay max-w-[85%]">
                <div className="text-gray-700 leading-relaxed">
                  {currentStreamingMessage}
                  <span className="animate-pulse">|</span>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs opacity-70">
                  <Sparkles size={12} className="animate-spin" />
                  Thinking...
                </div>
              </div>
            </div>
          )}

          {/* Loading Indicator */}
          {isLoading && !isStreaming && (
            <div className="flex justify-start">
              <div className="bg-[#e0e5ec] p-4 rounded-2xl rounded-tl-none shadow-clay flex gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {!isLoading && !isStreaming && (
          <div className="px-4 py-2 bg-[#d1d9e6] border-t">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInput(question)}
                  className="flex-shrink-0 px-3 py-1 bg-white/70 rounded-lg text-xs text-gray-700 hover:bg-white transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-[#e0e5ec]">
          <div className="relative flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Uliza swali (Ask a question)..."
              className="w-full h-12 pl-4 pr-14 rounded-2xl bg-[#e0e5ec] shadow-clay-inset text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder-gray-400"
              disabled={isLoading || isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={isLoading || isStreaming || !input.trim()}
              className="absolute right-2 top-2 bottom-2 w-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-md disabled:opacity-50 hover:scale-105 transition-transform"
            >
              {isLoading || isStreaming ? <Sparkles size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>

          {/* CBC Curriculum Reminder */}
          <div className="mt-2 text-xs text-gray-500 text-center">
            Powered by Kenyan CBC Curriculum • Ask in English or Kiswahili
          </div>
        </div>
      </div>
    </div>
  );
};
