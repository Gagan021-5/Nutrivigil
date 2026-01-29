import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Lock,
      title: 'Data Collection',
      content: 'We collect minimal information necessary to provide our services. All scans are processed on-device and no food images are stored on our servers.'
    },
    {
      icon: Eye,
      title: 'Information Usage',
      content: 'Your data is used solely to improve your experience and provide personalized recommendations. We never sell your personal information to third parties.'
    },
    {
      icon: Database,
      title: 'Data Storage',
      content: 'Health profiles are encrypted and stored securely. You maintain full control over your data and can delete it at any time from your account settings.'
    },
    {
      icon: ShieldCheck,
      title: 'Your Rights',
      content: 'You have the right to access, modify, or delete your personal data. We comply with GDPR, CCPA, and other privacy regulations.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 dark:from-emerald-950 dark:via-slate-900 dark:to-teal-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-6">
            <ShieldCheck size={16} />
            <span>Last Updated: January 2026</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Policy</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Your privacy is our top priority. Learn how we protect and handle your data.
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
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                  <section.icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
          className="p-8 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
          <p className="text-lg opacity-90 mb-6">Contact our privacy team at privacy@nutrivigil.com</p>
          <button className="px-6 py-3 rounded-lg bg-white text-emerald-600 font-semibold hover:bg-emerald-50 transition-colors">
            Contact Privacy Team
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 p-6 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            This privacy policy is effective as of January 2026. We may update this policy from time to time. 
            Any changes will be posted on this page with an updated revision date. Your continued use of our 
            services after any modifications indicates your acceptance of the updated terms.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
