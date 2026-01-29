import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Rocket, Heart, Code, Palette } from 'lucide-react';

const Careers = () => {
  const positions = [
    { role: 'Senior AI Engineer', dept: 'Engineering', type: 'Full-time', icon: Code },
    { role: 'Product Designer', dept: 'Design', type: 'Full-time', icon: Palette },
    { role: 'Growth Marketing Lead', dept: 'Marketing', type: 'Full-time', icon: Rocket },
  ];

  const benefits = [
    { icon: Heart, title: 'Health Coverage', desc: 'Comprehensive medical, dental, and vision' },
    { icon: Users, title: 'Team Culture', desc: 'Collaborative and inclusive environment' },
    { icon: Rocket, title: 'Growth', desc: 'Professional development opportunities' },
    { icon: Briefcase, title: 'Work-Life Balance', desc: 'Flexible hours and remote options' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-violet-950 dark:via-slate-900 dark:to-purple-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-semibold mb-6">
            <Briefcase size={16} />
            <span>Join Our Team</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-600">Careers</span> at NutriVigil
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Build the future of health technology with a passionate team dedicated to making a real impact on people's lives.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Open Positions</h2>
          <div className="space-y-4">
            {positions.map((job, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <job.icon className="w-7 h-7 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{job.role}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{job.dept} • {job.type}</p>
                  </div>
                </div>
                <button className="px-6 py-3 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">Why Join Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg text-center"
              >
                <benefit.icon className="w-10 h-10 mx-auto text-violet-600 dark:text-violet-400 mb-4" />
                <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">{benefit.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="p-12 rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Don't See Your Role?</h2>
          <p className="text-lg opacity-90 mb-6">We're always looking for talented individuals. Send us your resume!</p>
          <button className="px-8 py-4 rounded-xl bg-white text-violet-600 font-bold hover:bg-violet-50 transition-colors">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
