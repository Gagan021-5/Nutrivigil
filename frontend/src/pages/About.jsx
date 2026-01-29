import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Heart, Award } from 'lucide-react';

const About = () => {
  const stats = [
    { value: '500K+', label: 'Active Users' },
    { value: '10M+', label: 'Foods Scanned' },
    { value: '99.2%', label: 'Accuracy Rate' },
    { value: '50+', label: 'Countries' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 dark:from-slate-900 dark:via-gray-900 dark:to-slate-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Us</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            We're on a mission to make healthy eating accessible to everyone through the power of AI technology.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg"
            >
              <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                {stat.value}
              </p>
              <p className="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white">Our Story</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Founded in 2024, NutriVigil started with a simple idea: everyone deserves to know what's in their food. 
              Using cutting-edge AI technology powered by Gemini 2.5, we've made it possible for anyone to make informed 
              dietary decisions instantly.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Today, we're proud to serve hundreds of thousands of users worldwide, helping them navigate the complex 
              world of food nutrition with confidence and ease.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            {[
              { icon: Users, title: 'Team Excellence', desc: 'World-class AI researchers and health experts' },
              { icon: Globe, title: 'Global Impact', desc: 'Operating in over 50 countries worldwide' },
              { icon: Heart, title: 'Health First', desc: 'Dedicated to improving public health' },
              { icon: Award, title: 'Industry Leading', desc: 'Award-winning AI nutrition platform' },
            ].map((value, idx) => (
              <div key={idx} className="flex items-start gap-4 p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg">
                <value.icon className="w-10 h-10 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{value.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300">{value.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
          <p className="text-lg opacity-90">Be part of the health revolution. Together, we can build a healthier future.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
