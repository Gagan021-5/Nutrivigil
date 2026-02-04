import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Heart, Zap, Shield, Users, TrendingUp } from 'lucide-react';

const About = () => {
  const missionCards = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Accurate Analysis",
      description: "Powered by cutting-edge Gemini v2.5 AI for precise nutritional insights tailored to your health conditions."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health First",
      description: "Personalized recommendations based on your specific health conditions like diabetes, hypertension, and more."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Results",
      description: "Get comprehensive nutrition analysis in seconds, not hours. Upload, scan, and receive detailed insights instantly."
    }
  ];

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safety Signals",
      description: "Color-coded traffic light system (Green/Yellow/Red) for quick health safety assessment."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Multi-Condition Support",
      description: "Supports diabetes, hypertension, kidney disease, heart conditions, and many more health concerns."
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Real-Time Analysis",
      description: "Analyze food through images or text with our advanced AI-powered scanner technology."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Hero Content */}
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About NutriVigil
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Your Personal AI Health Scanner. Instantly analyze meals with cutting-edge Gemini v2.5 AI 
              to keep your nutrition perfectly aligned with your health goals.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Our Mission
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {missionCards.map((card, index) => (
              <div 
                key={index}
                className="bg-[#1a1f2e] p-8 rounded-xl border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-6 bg-[#0a0e1a] rounded-lg border border-gray-800 hover:border-purple-500/50 transition-all"
              >
                <div className="text-purple-400 mt-1">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8 sm:p-12 border border-purple-500/20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
              Powered by Advanced AI
            </h2>
            <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto leading-relaxed mb-8">
              NutriVigil leverages <span className="text-purple-400 font-semibold">Google's Gemini 2.5 AI</span>, 
              one of the most advanced multimodal AI systems, to provide accurate nutritional analysis. 
              Our platform is HIPAA compliant, SOC 2 Type II certified, and uses end-to-end encryption 
              to ensure your health data remains private and secure.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <span className="bg-[#1a1f2e] px-4 py-2 rounded-full border border-gray-700">
                HIPAA Compliant
              </span>
              <span className="bg-[#1a1f2e] px-4 py-2 rounded-full border border-gray-700">
                SOC 2 Certified
              </span>
              <span className="bg-[#1a1f2e] px-4 py-2 rounded-full border border-gray-700">
                500K+ Food Database
              </span>
              <span className="bg-[#1a1f2e] px-4 py-2 rounded-full border border-gray-700">
                99.2% Accuracy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 50,000+ health enthusiasts who trust NutriVigil for their nutrition analysis.
          </p>
          <Link 
            to="/scanner" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
          >
            <Zap className="w-5 h-5" />
            Try Scanner Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
