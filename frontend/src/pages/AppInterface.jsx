import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Monitor, Tablet, Download } from 'lucide-react';

const AppInterface = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-purple-950 dark:via-slate-900 dark:to-pink-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            App <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">Interface</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Experience NutriVigil across all your devices with our beautifully crafted interfaces.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Smartphone, title: 'Mobile App', desc: 'iOS & Android native apps' },
            { icon: Monitor, title: 'Web Platform', desc: 'Access from any browser' },
            { icon: Tablet, title: 'Tablet Version', desc: 'Optimized for tablets' },
          ].map((platform, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg text-center hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <platform.icon className="w-16 h-16 mx-auto text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{platform.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">{platform.desc}</p>
              <button className="px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors flex items-center gap-2 mx-auto">
                <Download size={20} />
                Download
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-purple-600 to-pink-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Apps Launching Soon</h2>
          <p className="text-lg opacity-90">Native mobile and desktop applications are currently in development.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AppInterface;
