import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Heart, Zap, Shield, Users, TrendingUp, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
  const { theme } = useTheme();
  const [allContributors, setAllContributors] = useState([]);

  useEffect(() => {
    // Fetching contributors from the repository
    fetch('https://api.github.com/repos/gagan021-5/nutrivigil/contributors')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAllContributors(data);
        }
      })
      .catch(err => console.error("Error fetching contributors:", err));
  }, []);

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0a0e1a] text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Hero Section */}
      <section className={`relative py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-b from-[#1a1f2e] to-[#0a0e1a]' : 'bg-gradient-to-b from-gray-50 to-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/" 
            className={`inline-flex items-center gap-2 transition-colors mb-8 ${
              theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About NutriVigil
            </h1>
            <p className={`text-xl max-w-3xl mx-auto leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Your Personal AI Health Scanner. Instantly analyze meals to keep your nutrition perfectly aligned with your health goals.
            </p>
          </div>
        </div>
      </section>

      {/* Hall of Contributions Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-[#0a0e1a]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Hall of Contributions</h2>
          <p className={`text-center mb-12 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Recognizing the individuals who actively contribute to the growth and transparency of NutriVigil.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {allContributors.map((contributor) => (
              <motion.div
                key={contributor.id}
                whileHover={{ y: -2 }}
                className={`p-4 rounded-lg border flex items-center gap-4 transition-all duration-300 ${
                  theme === 'dark' 
                    ? 'bg-[#1a1f2e] border-gray-800 hover:border-purple-500/50' 
                    : 'bg-gray-50 border-gray-200 hover:border-purple-400/50'
                }`}
              >
                <img 
                  src={contributor.avatar_url} 
                  alt={contributor.login} 
                  className="w-12 h-12 rounded-full border border-purple-500/20 shrink-0" 
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold truncate text-sm">{contributor.login}</span>
                    <a 
                      href={contributor.html_url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="text-gray-400 hover:text-purple-400 transition-colors shrink-0"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                  <div className={`text-[10px] font-bold uppercase tracking-widest mt-0.5 ${
                    contributor.login.toLowerCase() === 'gagan021-5' ? 'text-purple-400' : 'text-gray-500'
                  }`}>
                    {contributor.login.toLowerCase() === 'gagan021-5' ? 'Project Admin' : 'Contributor'}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-[#1a1f2e]' : 'bg-gray-50'
      }`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {missionCards.map((card, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-purple-400 mb-4 flex justify-center">{card.icon}</div>
                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Start Your Health Journey?</h2>
        <Link 
          to="/scanner" 
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-105"
        >
          <Zap className="w-5 h-5" />
          Try Scanner Now
        </Link>
      </section>
    </div>
  );
};

export default About;
