import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Eye, Shield } from 'lucide-react';

const Cookies = () => {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      desc: 'Required for basic website functionality and security',
      required: true
    },
    {
      icon: Eye,
      title: 'Analytics Cookies',
      desc: 'Help us understand how visitors interact with our website',
      required: false
    },
    {
      icon: Settings,
      title: 'Preference Cookies',
      desc: 'Remember your settings and preferences',
      required: false
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50 dark:from-rose-950 dark:via-slate-900 dark:to-pink-950 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-sm font-semibold mb-6">
            <Cookie size={16} />
            <span>Updated: January 2026</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 text-slate-900 dark:text-white">
            Cookie <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">Policy</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Learn about how we use cookies to improve your experience on NutriVigil.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">What Are Cookies?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Cookies are small text files that are placed on your device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and 
            understanding how you use our services.
          </p>
        </motion.div>

        <div className="space-y-6 mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Types of Cookies We Use</h2>
          {cookieTypes.map((cookie, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
                    <cookie.icon className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{cookie.title}</h3>
                    <p className="text-slate-600 dark:text-slate-300">{cookie.desc}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  cookie.required 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                    : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                }`}>
                  {cookie.required ? 'Required' : 'Optional'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-6 mb-12"
        >
          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Managing Cookies</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              You can control and manage cookies in various ways. Most browsers allow you to refuse or 
              accept cookies. You can also delete cookies that have already been set.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              Please note that if you choose to block cookies, some features of our website may not 
              function properly.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Third-Party Cookies</h3>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              We may use third-party services that also set cookies. These include analytics providers 
              and advertising networks. These cookies are governed by the respective third parties' privacy policies.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="p-8 rounded-2xl bg-gradient-to-br from-rose-600 to-pink-700 text-white"
        >
          <h3 className="text-2xl font-bold mb-4">Cookie Preferences</h3>
          <p className="text-lg opacity-90 mb-6">Manage your cookie preferences from your account settings.</p>
          <button className="px-6 py-3 rounded-lg bg-white text-rose-600 font-semibold hover:bg-rose-50 transition-colors">
            Manage Preferences
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-12 p-6 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            This Cookie Policy was last updated in January 2026. We may update this policy to reflect 
            changes to our practices or for other operational, legal, or regulatory reasons.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Cookies;
