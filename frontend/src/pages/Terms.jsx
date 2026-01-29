import React from 'react';
import { motion } from 'framer-motion';
import { Scale, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      icon: CheckCircle,
      title: 'Acceptance of Terms',
      content: 'By accessing and using NutriVigil, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.'
    },
    {
      icon: FileText,
      title: 'Use of Service',
      content: 'NutriVigil provides AI-powered nutritional analysis for informational purposes only. Our service is not a substitute for professional medical advice, diagnosis, or treatment.'
    },
    {
      icon: Scale,
      title: 'User Responsibilities',
      content: 'You are responsible for maintaining the confidentiality of your account and for all activities under your account. You must be at least 13 years old to use our services.'
    },
    {
      icon: AlertCircle,
      title: 'Limitations of Liability',
      content: 'NutriVigil is provided "as is" without warranties. We are not liable for any damages resulting from the use or inability to use our services.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-yellow-50 dark:from-amber-950 dark:via-slate-900 dark:to-yellow-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-sm font-semibold mb-6">
            <Scale size={16} />
            <span>Effective: January 2026</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">Service</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Please read these terms carefully before using NutriVigil services.
          </p>
        </motion.div>

        <div className="space-y-8 mb-16">
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{section.title}</h2>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-6"
        >
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Intellectual Property</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              All content, features, and functionality of NutriVigil are owned by NutriVigil Inc. and are protected 
              by international copyright, trademark, and other intellectual property laws.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Modifications to Service</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We reserve the right to modify or discontinue the service at any time with or without notice. 
              We shall not be liable to you or any third party for any modification or discontinuance of the service.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-700 text-white">
            <h3 className="text-2xl font-bold mb-4">Have Questions?</h3>
            <p className="text-lg opacity-90 mb-6">Contact our legal team for clarification on any terms.</p>
            <button className="px-6 py-3 rounded-lg bg-white text-amber-600 font-semibold hover:bg-amber-50 transition-colors">
              Contact Legal Team
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 p-6 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            These Terms of Service were last updated in January 2026. We reserve the right to update these terms 
            at any time. Material changes will be notified to users via email or prominent notice on our website.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
