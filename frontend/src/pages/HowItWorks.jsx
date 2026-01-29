import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Brain, CheckCircle, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      icon: Camera,
      title: 'Capture or Upload',
      desc: 'Take a photo of any packaged food label or upload an image from your gallery.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      icon: Brain,
      title: 'AI Analysis',
      desc: 'Our Gemini 2.5 powered AI instantly analyzes ingredients, nutrients, and additives.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      number: '03',
      icon: CheckCircle,
      title: 'Get Insights',
      desc: 'Receive personalized health scores, warnings, and alternative recommendations.',
      color: 'from-green-500 to-emerald-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 dark:from-cyan-950 dark:via-slate-900 dark:to-blue-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-6">
            <Zap size={16} />
            <span>Simple & Fast</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-600">Works</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Three simple steps to make healthier food choices with AI-powered insights.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-800 dark:via-purple-800 dark:to-green-800 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-3 gap-12 relative">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative"
              >
                <div className="text-center">
                  <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white dark:bg-slate-800 border-4 border-slate-200 dark:border-slate-700 flex items-center justify-center font-bold text-slate-400 dark:text-slate-500 text-sm">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 p-12 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg opacity-90 mb-6">Join thousands of users making healthier food choices every day.</p>
          <button className="px-8 py-4 rounded-xl bg-white text-blue-600 font-bold hover:bg-blue-50 transition-colors">
            Try It Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
