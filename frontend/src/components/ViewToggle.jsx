import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Grid3x3, List, LayoutGrid } from 'lucide-react';

const VIEW_MODES = [
  {
    id: 'grid',
    label: 'Grid View',
    icon: Grid3x3,
    description: '3-4 columns',
  },
  {
    id: 'list',
    label: 'List View',
    icon: List,
    description: '1 column, horizontal cards',
  },
  {
    id: 'compact',
    label: 'Compact View',
    icon: LayoutGrid,
    description: '5-6 columns, smaller',
  },
];

const ViewToggle = ({ currentView, onViewChange }) => {
  const { theme } = useTheme();

  return (
    <div className={`inline-flex rounded-lg border p-1 ${
      theme === 'dark'
        ? 'bg-white/5 border-white/10'
        : 'bg-gray-100 border-gray-200'
    }`}>
      {VIEW_MODES.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentView === mode.id;

        return (
          <motion.button
            key={mode.id}
            onClick={() => onViewChange(mode.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative px-3 py-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isActive
                ? theme === 'dark'
                  ? 'bg-white/10 text-white shadow-lg'
                  : 'bg-white text-gray-900 shadow-md'
                : theme === 'dark'
                ? 'text-gray-400 hover:text-white hover:bg-white/5'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-label={mode.label}
            aria-pressed={isActive}
            title={`${mode.label} - ${mode.description}`}
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        );
      })}
    </div>
  );
};

export default ViewToggle;
