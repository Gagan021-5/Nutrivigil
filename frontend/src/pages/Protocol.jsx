import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Cpu, Shield, Zap } from 'lucide-react';

const Protocol = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6">
            <Sparkles size={16} />
            <span>Intelligence Protocol v1.0</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            AI Intelligence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Protocol</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Our proprietary AI system powered by Gemini 2.5, designed to analyze food nutrition with unparalleled accuracy and speed.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Cpu, title: 'Neural Processing', desc: 'Advanced deep learning models trained on millions of food products' },
            { icon: Shield, title: 'Privacy First', desc: 'All processing happens on-device, your data never leaves your phone' },
            { icon: Zap, title: 'Real-time Analysis', desc: 'Get instant nutrition insights in under 2 seconds' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
          <p className="text-lg opacity-90">Full technical documentation and API specifications will be available here.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Protocol;
