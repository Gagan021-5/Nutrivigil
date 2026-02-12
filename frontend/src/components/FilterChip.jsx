import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { X } from 'lucide-react';

const FilterChip = ({ label, onRemove, color = 'indigo' }) => {
  const { theme } = useTheme();

  // Color variants for different filter types
  const colorVariants = {
    indigo: {
      light: 'bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200',
      dark: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30',
    },
    green: {
      light: 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200',
      dark: 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30',
    },
    amber: {
      light: 'bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-200',
      dark: 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30',
    },
    red: {
      light: 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200',
      dark: 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
    },
    purple: {
      light: 'bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200',
      dark: 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
    },
  };

  const colors = colorVariants[color] || colorVariants.indigo;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        theme === 'dark' ? colors.dark : colors.light
      }`}
    >
      <span>{label}</span>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className={`p-0.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          theme === 'dark'
            ? 'hover:bg-white/10 focus:ring-white/20'
            : 'hover:bg-black/10 focus:ring-black/20'
        }`}
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3.5 h-3.5" />
      </motion.button>
    </motion.div>
  );
};

export default FilterChip;
