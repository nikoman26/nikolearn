import React from 'react';
import { 
  Heart, 
  Shield, 
  Users, 
  Target, 
  Wifi, 
  Globe,
  CheckCircle,
  Award,
  BookOpen,
  Clock,
  DollarSign,
  Lightbulb,
  Zap
} from 'lucide-react';

export const ParentsOverviewPage: React.FC = () => {
  const learningFeatures = [
    {
      icon: <BookOpen size={24} />,
      title: "Deep Understanding",
      description: "Help your child understand concepts deeply, not just memorize"
    },
    {
      icon: <Zap size={24} />,
      title: "Stay Engaged",
      description: "Gamified learning keeps motivation high and interest alive"
    },
    {
      icon: <Clock size={24} />,
      title: "Own Pace",
      description: "Learn at their own speed without pressure or stress"
    },
    {
      icon: <Award size={24} />,
      title: "Build Confidence",
      description: "Success in learning builds self-esteem and confidence"
    },
    {
      icon: <Target size={24} />,
      title: "Real-Life Skills",
      description: "Develop practical life skills for future success"
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Early Development",
      description: "Start building essential skills from an early age"
    }
  ];

  const personalizationFeatures = [
    "Learning speed adaptation",
    "Strengths and weaknesses identification",
    "Attention pattern recognition",
    "Preferred content style matching"
  ];

  const safetyFeatures = [
    "No unsafe content",
    "Privacy-first design",
    "Clear screen time boundaries",
    "Parent visibility and controls"
  ];

  const familyModeFeatures = [
    "Real-time learning progress tracking",
    "Positive habit encouragement with rewards",
    "Chore-to-learning incentive linking",
    "Confident homework support",
    "Celebrated progress together"
  ];

  const lifeSkills = [
    "Financial responsibility and money management",
    "Health and wellbeing education",
    "Emergency first aid basics",
    "Digital and legal awareness",
    "Practical life preparation"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-purple-500/5">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Heart className="text-primary" size={48} />
            <h1 className="text-5xl font-bold text-gray-800">For Parents</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            How NIKOlearn Supports Your Child's Learning Journey
          </p>
        </div>

        {/* Learning That Goes Beyond Exams */}
        <section className="mb-16">
          <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-blue-800 mb-6 flex items-center gap-3">
              <BookOpen size={32} />
              Learning That Goes Beyond Exams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm border">
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personalized Learning */}
        <section className="mb-16">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
              <Target size={32} />
              Personalized Learning for Every Child
            </h2>
            <p className="text-green-700 text-lg mb-6 font-medium">
              No two children learn the same way. NIKOlearn adapts to your child's unique needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4">Adaptive Features</h3>
                <ul className="space-y-3">
                  {personalizationFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4">Perfect For</h3>
                <p className="text-gray-700 mb-4">
                  Especially helpful for children who struggle in traditional classrooms or need 
                  extra support to reach their full potential.
                </p>
                <div className="bg-green-100 rounded-lg p-4">
                  <p className="text-green-800 text-sm font-medium">
                    💡 Every child deserves to learn in a way that works best for them
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safe Technology */}
        <section className="mb-16">
          <div className="bg-purple-50 border-l-4 border-purple-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center gap-3">
              <Shield size={32} />
              Safe, Supportive Technology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">Your Child's Safety Matters</h3>
                <ul className="space-y-3">
                  {safetyFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-purple-500 mt-0.5 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="text-center">
                  <Shield className="text-purple-600 mx-auto mb-4" size={48} />
                  <h3 className="font-bold text-gray-800 mb-2">Technology That Helps</h3>
                  <p className="text-gray-600">
                    Technology is used to support learning, not distract from it. 
                    NIKOlearn provides a safe digital environment where your child can focus on growing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Family Mode */}
        <section className="mb-16">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-yellow-800 mb-6 flex items-center gap-3">
              <Users size={32} />
              Family Mode – Learn Together
            </h2>
            <p className="text-yellow-700 text-lg mb-6 font-medium">
              Learning becomes a shared journey, not a struggle.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {familyModeFeatures.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="text-yellow-500 mt-0.5 flex-shrink-0" size={20} />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Life Skills */}
        <section className="mb-16">
          <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center gap-3">
              <Lightbulb size={32} />
              Real-World Life Skills
            </h2>
            <p className="text-indigo-700 mb-6">
              In addition to school subjects, your child learns essential life skills:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lifeSkills.map((skill, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-indigo-700 font-medium">{skill}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-indigo-100 rounded-lg p-4">
              <p className="text-indigo-800 text-sm font-medium text-center">
                📚 These are skills schools rarely teach—but every child needs them for success in life
              </p>
            </div>
          </div>
        </section>

        {/* Offline Capability */}
        <section className="mb-16">
          <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-green-800 mb-6 flex items-center gap-3">
              <Wifi size={32} />
              Works Even Without Internet
            </h2>
            <p className="text-green-700 text-lg mb-6 font-medium">
              NIKOlearn works offline and syncs later, ensuring learning never stops.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <Zap className="text-green-600 mx-auto mb-3" size={32} />
                <h3 className="font-bold text-gray-800 mb-2">Power Outages</h3>
                <p className="text-gray-600 text-sm">Continue learning even when the power goes out</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <Globe className="text-green-600 mx-auto mb-3" size={32} />
                <h3 className="font-bold text-gray-800 mb-2">Rural Areas</h3>
                <p className="text-gray-600 text-sm">Perfect for areas with limited internet connectivity</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
                <DollarSign className="text-green-600 mx-auto mb-3" size={32} />
                <h3 className="font-bold text-gray-800 mb-2">Save Data</h3>
                <p className="text-gray-600 text-sm">Reduce data costs with offline learning</p>
              </div>
            </div>
          </div>
        </section>

        {/* Built for African Homes */}
        <section className="mb-16">
          <div className="bg-orange-50 border-l-4 border-orange-500 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-orange-800 mb-6 flex items-center gap-3">
              <Heart size={32} />
              Built for the African Home
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-800 mb-4">NIKOlearn Understands</h3>
                <ul className="space-y-3">
                  {[
                    "African households and family dynamics",
                    "Local challenges and opportunities",
                    "Cultural context and values",
                    "Parental expectations and concerns"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="text-orange-500 mt-0.5 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <h3 className="font-bold text-gray-800 mb-4 text-center">Our Promise</h3>
                <p className="text-gray-700 text-center">
                  It's not imported tech—it's designed specifically for your reality, 
                  your challenges, and your dreams for your children's future.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Your Child's Growth */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-3">
              <Heart size={32} />
              Your Child's Growth, Supported
            </h2>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              NIKOlearn doesn't replace you as a parent. It gives you better tools to support your child—
              without stress, confusion, or guesswork.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Support Your Child's Learning?</h3>
            <p className="text-gray-600 mb-6">
              Join thousands of families already using NIKOlearn to support their children's education
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors font-medium">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentsOverviewPage;
