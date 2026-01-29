import React from 'react';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, Award, Target } from 'lucide-react';

const NutritionDecoded = () => {
  const nutrients = [
    { name: 'Proteins', value: 45, color: 'bg-blue-500' },
    { name: 'Carbs', value: 70, color: 'bg-orange-500' },
    { name: 'Fats', value: 30, color: 'bg-purple-500' },
    { name: 'Fiber', value: 85, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-orange-950 dark:via-slate-900 dark:to-amber-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            Nutrition <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Decoded</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Break down complex nutritional information into simple, actionable insights tailored to your health goals.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg"
          >
            <Activity className="w-12 h-12 text-orange-600 dark:text-orange-400 mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Macro Tracking</h3>
            <div className="space-y-4">
              {nutrients.map((nutrient, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{nutrient.name}</span>
                    <span className="text-slate-500">{nutrient.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${nutrient.value}%` }}
                      transition={{ duration: 1, delay: idx * 0.1 }}
                      className={`h-full ${nutrient.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {[
              { icon: TrendingUp, title: 'Daily Goals', desc: 'Track your nutritional targets' },
              { icon: Award, title: 'Health Score', desc: 'Overall food quality rating' },
              { icon: Target, title: 'Personalized', desc: 'Recommendations based on your profile' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg flex items-start gap-4">
                <item.icon className="w-10 h-10 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                <div>
                  <h4 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-12 rounded-3xl bg-gradient-to-br from-orange-600 to-amber-700 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Understand Every Nutrient</h2>
          <p className="text-lg opacity-90">Get detailed breakdowns of macros, micros, vitamins, and minerals.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default NutritionDecoded;
