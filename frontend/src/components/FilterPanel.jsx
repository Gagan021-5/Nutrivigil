import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  Leaf,
  Award,
  AlertCircle,
  Flame,
} from 'lucide-react';

// Filter options data
const FILTER_OPTIONS = {
  dietary: {
    label: 'Dietary Preferences',
    icon: Leaf,
    color: 'green',
    options: [
      { id: 'vegan', label: 'Vegan' },
      { id: 'vegetarian', label: 'Vegetarian' },
      { id: 'gluten-free', label: 'Gluten-Free' },
      { id: 'organic', label: 'Organic' },
      { id: 'low-carb', label: 'Low Carb' },
      { id: 'high-protein', label: 'High Protein' },
    ],
  },
  scoreRange: {
    label: 'Nutrition Score',
    icon: Award,
    color: 'indigo',
    options: [
      { id: 'excellent', label: 'Excellent (70-100)', min: 70, max: 100 },
      { id: 'good', label: 'Good (50-69)', min: 50, max: 69 },
      { id: 'fair', label: 'Fair (30-49)', min: 30, max: 49 },
      { id: 'poor', label: 'Poor (0-29)', min: 0, max: 29 },
    ],
  },
  allergens: {
    label: 'Allergen-Free',
    icon: AlertCircle,
    color: 'amber',
    options: [
      { id: 'nuts', label: 'Nuts' },
      { id: 'dairy', label: 'Dairy' },
      { id: 'gluten', label: 'Gluten' },
      { id: 'soy', label: 'Soy' },
      { id: 'eggs', label: 'Eggs' },
    ],
  },
  calorieRange: {
    label: 'Calorie Range',
    icon: Flame,
    color: 'red',
    options: [
      { id: 'very-low', label: 'Very Low (0-100)', min: 0, max: 100 },
      { id: 'low', label: 'Low (101-200)', min: 101, max: 200 },
      { id: 'medium', label: 'Medium (201-400)', min: 201, max: 400 },
      { id: 'high', label: 'High (401-600)', min: 401, max: 600 },
      { id: 'very-high', label: 'Very High (600+)', min: 601, max: 9999 },
    ],
  },
};

const FilterPanel = ({ filters, onFilterChange, isOpen, onClose, isMobile }) => {
  const { theme } = useTheme();
  const [expandedSections, setExpandedSections] = useState({
    dietary: true,
    scoreRange: true,
    allergens: true,
    calorieRange: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (category, value) => {
    const currentValues = filters[category] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    onFilterChange({
      ...filters,
      [category]: newValues,
    });
  };

  const isChecked = (category, value) => {
    return (filters[category] || []).includes(value);
  };

  const renderFilterSection = (categoryKey, categoryData) => {
    const Icon = categoryData.icon;
    const isExpanded = expandedSections[categoryKey];

    return (
      <div
        key={categoryKey}
        className={`border-b last:border-b-0 ${
          theme === 'dark' ? 'border-white/10' : 'border-gray-200'
        }`}
      >
        {/* Section Header */}
        <button
          onClick={() => toggleSection(categoryKey)}
          className={`w-full flex items-center justify-between p-4 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ${
            theme === 'dark'
              ? 'hover:bg-white/5'
              : 'hover:bg-gray-50'
          }`}
          aria-expanded={isExpanded}
          aria-label={`Toggle ${categoryData.label} section`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`} />
            <span className={`font-semibold text-sm ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {categoryData.label}
            </span>
            {filters[categoryKey] && filters[categoryKey].length > 0 && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                theme === 'dark'
                  ? 'bg-indigo-500/20 text-indigo-400'
                  : 'bg-indigo-100 text-indigo-600'
              }`}>
                {filters[categoryKey].length}
              </span>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {/* Section Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-2">
                {categoryData.options.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-white/5'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked(categoryKey, option.id)}
                      onChange={() => handleCheckboxChange(categoryKey, option.id)}
                      className={`w-4 h-4 rounded border-2 transition-all cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-white/10 border-white/20 checked:bg-indigo-500 checked:border-indigo-500'
                          : 'bg-white border-gray-300 checked:bg-indigo-600 checked:border-indigo-600'
                      }`}
                    />
                    <span className={`text-sm flex-1 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Mobile: Bottom drawer
  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`fixed bottom-0 left-0 right-0 rounded-t-3xl border-t max-h-[80vh] overflow-hidden z-50 ${
                theme === 'dark'
                  ? 'bg-gray-900 border-white/10'
                  : 'bg-white border-gray-200 shadow-2xl'
              }`}
            >
              {/* Drawer Header */}
              <div className={`sticky top-0 z-10 border-b backdrop-blur-xl ${
                theme === 'dark'
                  ? 'bg-gray-900/95 border-white/10'
                  : 'bg-white/95 border-gray-200'
              }`}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-2">
                    <Filter className={`w-5 h-5 ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`} />
                    <h2 className={`font-bold text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      Filters
                    </h2>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className={`p-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      theme === 'dark'
                        ? 'hover:bg-white/10'
                        : 'hover:bg-gray-100'
                    }`}
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="overflow-y-auto max-h-[calc(80vh-73px)]">
                {Object.entries(FILTER_OPTIONS).map(([key, data]) =>
                  renderFilterSection(key, data)
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Desktop: Side panel
  return (
    <div className={`rounded-xl border backdrop-blur-xl overflow-hidden sticky top-24 ${
      theme === 'dark'
        ? 'bg-white/5 border-white/10'
        : 'bg-white border-gray-200 shadow-lg'
    }`}>
      {/* Panel Header */}
      <div className={`p-4 border-b ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <div className="flex items-center gap-2">
          <Filter className={`w-5 h-5 ${
            theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
          }`} />
          <h2 className={`font-bold text-lg ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Filters
          </h2>
        </div>
      </div>

      {/* Panel Content */}
      <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
        {Object.entries(FILTER_OPTIONS).map(([key, data]) =>
          renderFilterSection(key, data)
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
