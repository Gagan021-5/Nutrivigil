import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { X } from 'lucide-react';
import FilterChip from './FilterChip';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const { theme } = useTheme();

  // Convert filters object to array of filter items
  const activeFilters = [];

  // Dietary filters
  if (filters.dietary && filters.dietary.length > 0) {
    filters.dietary.forEach((diet) => {
      activeFilters.push({
        id: `dietary-${diet}`,
        label: diet,
        category: 'dietary',
        value: diet,
        color: 'green',
      });
    });
  }

  // Score range filters
  if (filters.scoreRange && filters.scoreRange.length > 0) {
    filters.scoreRange.forEach((range) => {
      activeFilters.push({
        id: `score-${range}`,
        label: range,
        category: 'scoreRange',
        value: range,
        color: 'indigo',
      });
    });
  }

  // Allergen filters
  if (filters.allergens && filters.allergens.length > 0) {
    filters.allergens.forEach((allergen) => {
      activeFilters.push({
        id: `allergen-${allergen}`,
        label: `No ${allergen}`,
        category: 'allergens',
        value: allergen,
        color: 'amber',
      });
    });
  }

  // Calorie range filters
  if (filters.calorieRange && filters.calorieRange.length > 0) {
    filters.calorieRange.forEach((range) => {
      activeFilters.push({
        id: `calorie-${range}`,
        label: `${range} Calories`,
        category: 'calorieRange',
        value: range,
        color: 'red',
      });
    });
  }

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`rounded-xl border p-4 backdrop-blur-xl ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white border-gray-200 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className={`text-sm font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Active Filters ({activeFilters.length})
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClearAll}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            theme === 'dark'
              ? 'text-red-400 hover:bg-red-500/20 focus:ring-offset-gray-900'
              : 'text-red-600 hover:bg-red-50 focus:ring-offset-white'
          }`}
          aria-label="Clear all filters"
        >
          <div className="flex items-center gap-1.5">
            <X className="w-3.5 h-3.5" />
            Clear All
          </div>
        </motion.button>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <FilterChip
              key={filter.id}
              label={filter.label}
              color={filter.color}
              onRemove={() => onRemoveFilter(filter.category, filter.value)}
            />
          ))}
        </div>
      </AnimatePresence>
    </motion.div>
  );
};

export default ActiveFilters;
