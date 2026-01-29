import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Compass, Lightbulb } from 'lucide-react';

const Mission = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 dark:from-teal-950 dark:via-slate-900 dark:to-cyan-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 text-sm font-semibold mb-6">
            <Compass size={16} />
            <span>Our Purpose</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-600">Mission</span>
          </h1>
          <p className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed">
            To empower every individual with instant, accurate nutritional intelligence, making healthy eating effortless and accessible to all.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-10 rounded-3xl bg-white dark:bg-slate-800 shadow-xl"
          >
            <Target className="w-16 h-16 text-teal-600 dark:text-teal-400 mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Our Mission</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We believe everyone deserves to understand what they're eating. By combining cutting-edge AI with comprehensive 
              nutritional databases, we're democratizing access to health information one scan at a time.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-10 rounded-3xl bg-white dark:bg-slate-800 shadow-xl"
          >
            <Eye className="w-16 h-16 text-cyan-600 dark:text-cyan-400 mb-6" />
            <h2 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Our Vision</h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              A world where every person has the tools and knowledge to make informed dietary choices, leading to healthier 
              lives and communities. We envision a future free from diet-related diseases.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-slate-900 dark:text-white">Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: 'Innovation', desc: 'Pioneering AI technology for health' },
              { icon: Target, title: 'Accuracy', desc: '99.2% precision in nutritional analysis' },
              { icon: Eye, title: 'Transparency', desc: 'Clear, honest information always' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200 dark:border-teal-800"
              >
                <value.icon className="w-12 h-12 mx-auto text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{value.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="p-12 rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Join Us in Our Mission</h2>
          <p className="text-lg opacity-90">Together, we can create a healthier world for future generations.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Mission;
