import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

const SafetySignals = () => {
  const signals = [
    { level: 'safe', icon: CheckCircle, title: 'Safe Ingredients', count: 12, color: 'text-green-500' },
    { level: 'caution', icon: AlertTriangle, title: 'Use Caution', count: 3, color: 'text-yellow-500' },
    { level: 'avoid', icon: XCircle, title: 'Avoid', count: 1, color: 'text-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 dark:from-red-950 dark:via-slate-900 dark:to-rose-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm font-semibold mb-6">
            <Shield size={16} />
            <span>Safety First</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            Safety <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-600">Signals</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Real-time alerts about harmful additives, allergens, and ingredients that might affect your health.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {signals.map((signal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <signal.icon className={`w-16 h-16 mx-auto mb-4 ${signal.color}`} />
              <h3 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">{signal.title}</h3>
              <p className="text-4xl font-black mb-2 text-slate-700 dark:text-slate-300">{signal.count}</p>
              <p className="text-sm text-slate-500">ingredients detected</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-10 rounded-2xl bg-white dark:bg-slate-800 shadow-lg mb-12"
        >
          <div className="flex items-start gap-4">
            <Info className="w-8 h-8 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">What We Check</h3>
              <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                <li>✓ Artificial preservatives and colors</li>
                <li>✓ Common allergens (gluten, nuts, dairy, etc.)</li>
                <li>✓ High sodium and sugar content</li>
                <li>✓ Trans fats and harmful additives</li>
                <li>✓ Banned substances in various countries</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="p-12 rounded-3xl bg-gradient-to-br from-red-600 to-rose-700 text-white text-center"
        >
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your Health Guardian</h2>
          <p className="text-lg opacity-90">Get instant warnings about ingredients that don't align with your dietary restrictions.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default SafetySignals;
