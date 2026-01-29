import React from 'react';
import { motion } from 'framer-motion';
import { User, Heart, Activity, Target, TrendingUp, Award } from 'lucide-react';

const HealthProfile = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-fuchsia-50 dark:from-pink-950 dark:via-slate-900 dark:to-fuchsia-950 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-slate-900 dark:text-white">
            Health <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-fuchsia-600">Profile</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Create your personalized health profile to get tailored nutrition recommendations and track your wellness journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            { icon: User, title: 'Personal Info', desc: 'Age, height, weight, activity level' },
            { icon: Heart, title: 'Health Goals', desc: 'Weight loss, muscle gain, maintenance' },
            { icon: Activity, title: 'Dietary Prefs', desc: 'Vegan, keto, gluten-free, etc.' },
            { icon: Target, title: 'Daily Targets', desc: 'Calorie and macro goals' },
            { icon: TrendingUp, title: 'Progress', desc: 'Track your health journey' },
            { icon: Award, title: 'Achievements', desc: 'Milestones and streaks' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 cursor-pointer group"
            >
              <feature.icon className="w-12 h-12 text-pink-600 dark:text-pink-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-300">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative overflow-hidden p-12 rounded-3xl bg-gradient-to-br from-pink-600 to-fuchsia-700 text-white text-center"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Your Personalized Dashboard</h2>
            <p className="text-lg opacity-90 mb-6">Get AI-powered recommendations based on your unique health profile and goals.</p>
            <button className="px-8 py-4 rounded-xl bg-white text-pink-600 font-bold hover:bg-pink-50 transition-colors">
              Create Your Profile
            </button>
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HealthProfile;
