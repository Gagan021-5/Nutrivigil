import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ArrowUpAZ,
  ArrowDownAZ,
  TrendingUp,
  TrendingDown,
  Flame,
} from 'lucide-react';

const SORT_OPTIONS = [
  {
    id: 'name-asc',
    label: 'Name (A-Z)',
    icon: ArrowUpAZ,
    description: 'Sort alphabetically from A to Z',
  },
  {
    id: 'name-desc',
    label: 'Name (Z-A)',
    icon: ArrowDownAZ,
    description: 'Sort alphabetically from Z to A',
  },
  {
    id: 'score-high',
    label: 'Score (High to Low)',
    icon: TrendingUp,
    description: 'Best nutrition score first',
  },
  {
    id: 'score-low',
    label: 'Score (Low to High)',
    icon: TrendingDown,
    description: 'Lowest nutrition score first',
  },
  {
    id: 'calories-low',
    label: 'Calories (Low to High)',
    icon: Flame,
    description: 'Lowest calorie items first',
  },
  {
    id: 'calories-high',
    label: 'Calories (High to Low)',
    icon: Flame,
    description: 'Highest calorie items first',
  },
  {
    id: 'brand-asc',
    label: 'Brand Name (A-Z)',
    icon: ArrowUpAZ,
    description: 'Sort by brand name alphabetically',
  },
];

const SortDropdown = ({ currentSort, onSortChange }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const selectedOption = SORT_OPTIONS.find((opt) => opt.id === currentSort) || SORT_OPTIONS[0];

  const handleSortSelect = (sortId) => {
    onSortChange(sortId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          theme === 'dark'
            ? 'bg-white/10 hover:bg-white/15 text-white border border-white/20 focus:ring-offset-gray-900'
            : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200 shadow-sm focus:ring-offset-white'
        }`}
        aria-label="Sort options"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <ArrowUpDown className="w-4 h-4" />
        <span className="text-sm">Sort: {selectedOption.label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-2 w-72 rounded-xl border backdrop-blur-xl shadow-2xl z-50 overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-900/95 border-white/10'
                : 'bg-white/95 border-gray-200'
            }`}
            role="menu"
            aria-orientation="vertical"
          >
            {/* Header */}
            <div className={`px-4 py-3 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <h3 className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Sort Products
              </h3>
            </div>

            {/* Sort Options */}
            <div className="py-2 max-h-96 overflow-y-auto">
              {SORT_OPTIONS.map((option) => {
                const Icon = option.icon;
                const isSelected = currentSort === option.id;

                return (
                  <motion.button
                    key={option.id}
                    onClick={() => handleSortSelect(option.id)}
                    whileHover={{ x: 4 }}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left transition-colors duration-150 ${
                      isSelected
                        ? theme === 'dark'
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-indigo-50 text-indigo-600'
                        : theme === 'dark'
                        ? 'hover:bg-white/5 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                    }`}
                    role="menuitem"
                    aria-label={option.label}
                  >
                    {/* Icon */}
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />

                    {/* Label and Description */}
                    <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">{option.label}</div>
                    <div className={`text-xs mt-0.5 ${
                      isSelected
                        ? (theme === 'dark' ? 'text-indigo-300' : 'text-indigo-500')
                        : 'text-gray-500'
                    }`}>
                      {option.description}
                    </div>
                    </div>

                    {/* Check Icon */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                      >
                        <Check className="w-5 h-5 flex-shrink-0" />
                      </motion.div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortDropdown;
