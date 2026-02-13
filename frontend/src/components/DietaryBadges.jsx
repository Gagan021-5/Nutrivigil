import React from 'react';
import { Leaf, Heart, Shield, Wheat, Award } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DietaryBadges = ({ dietary }) => {
  const { theme } = useTheme();

  // Mock dietary attributes if none provided (for demonstration)
  const displayDietary = dietary || ['Organic', 'Non-GMO'];

  // Badge configuration with icons and colors
  const badgeConfig = {
    Vegan: {
      icon: Leaf,
      color: theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-green-100 text-green-700 border-green-300',
    },
    Vegetarian: {
      icon: Leaf,
      color: theme === 'dark' ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-green-100 text-green-700 border-green-300',
    },
    'Gluten-Free': {
      icon: Wheat,
      color: theme === 'dark' ? 'bg-amber-500/20 text-amber-400 border-amber-500/50' : 'bg-amber-100 text-amber-700 border-amber-300',
    },
    Organic: {
      icon: Heart,
      color: theme === 'dark' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-emerald-100 text-emerald-700 border-emerald-300',
    },
    'Non-GMO': {
      icon: Shield,
      color: theme === 'dark' ? 'bg-blue-500/20 text-blue-400 border-blue-500/50' : 'bg-blue-100 text-blue-700 border-blue-300',
    },
    Kosher: {
      icon: Award,
      color: theme === 'dark' ? 'bg-purple-500/20 text-purple-400 border-purple-500/50' : 'bg-purple-100 text-purple-700 border-purple-300',
    },
    Halal: {
      icon: Award,
      color: theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/50' : 'bg-indigo-100 text-indigo-700 border-indigo-300',
    },
    'Dairy-Free': {
      icon: Shield,
      color: theme === 'dark' ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50' : 'bg-cyan-100 text-cyan-700 border-cyan-300',
    },
    'Nut-Free': {
      icon: Shield,
      color: theme === 'dark' ? 'bg-orange-500/20 text-orange-400 border-orange-500/50' : 'bg-orange-100 text-orange-700 border-orange-300',
    },
    Keto: {
      icon: Heart,
      color: theme === 'dark' ? 'bg-pink-500/20 text-pink-400 border-pink-500/50' : 'bg-pink-100 text-pink-700 border-pink-300',
    },
  };

  if (!displayDietary || displayDietary.length === 0) {
    return null;
  }

  return (
    <div className={`rounded-xl p-5 border ${
      theme === 'dark'
        ? 'bg-white/5 border-white/10'
        : 'bg-white border-gray-200'
    }`}>
      <h3 className={`text-lg font-bold mb-4 ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        Dietary & Certifications
      </h3>

      <div className="flex flex-wrap gap-3">
        {displayDietary.map((item, index) => {
          const config = badgeConfig[item] || {
            icon: Award,
            color: theme === 'dark'
              ? 'bg-gray-500/20 text-gray-400 border-gray-500/50'
              : 'bg-gray-100 text-gray-700 border-gray-300',
          };
          const Icon = config.icon;

          return (
            <div
              key={index}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 font-semibold text-sm transition-all duration-200 hover:scale-105 ${config.color}`}
            >
              <Icon className="w-4 h-4" />
              <span>{item}</span>
            </div>
          );
        })}
      </div>

      {/* Certification Info */}
      <div className={`mt-4 pt-4 border-t text-xs ${
        theme === 'dark'
          ? 'border-white/10 text-gray-400'
          : 'border-gray-200 text-gray-600'
      }`}>
        <p className="italic">
          Certifications and dietary labels are verified at the time of product listing.
          Please check the packaging for the most current certification status.
        </p>
      </div>
    </div>
  );
};

export default DietaryBadges;
