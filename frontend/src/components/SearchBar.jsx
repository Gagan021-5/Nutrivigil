import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Search, X, Clock } from 'lucide-react';

const MAX_RECENT_SEARCHES = 5;

const SearchBar = ({ value, onChange, placeholder = 'Search products...' }) => {
  const { theme } = useTheme();
  const [localValue, setLocalValue] = useState(value || '');
  const [showRecent, setShowRecent] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('nutrivigil-recent-searches');
    return saved ? JSON.parse(saved) : [];
  });
  const searchRef = useRef(null);
  const debounceTimer = useRef(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('nutrivigil-recent-searches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Debounced search - call onChange after 300ms of no typing
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (onChange && localValue !== value) {
        onChange(localValue);

        // Save to recent searches if query is not empty
        if (localValue.trim() && localValue.length >= 2) {
          const updated = [
            localValue,
            ...recentSearches.filter((s) => s !== localValue),
          ].slice(0, MAX_RECENT_SEARCHES);

          setRecentSearches(updated);
          localStorage.setItem('nutrivigil-recent-searches', JSON.stringify(updated));
        }
      }
    }, 300);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [localValue, onChange, value, recentSearches]);

  // Click outside to close recent searches
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowRecent(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setLocalValue(e.target.value);
  };

  const handleClear = () => {
    setLocalValue('');
    if (onChange) {
      onChange('');
    }
  };

  const handleRecentClick = (search) => {
    setLocalValue(search);
    if (onChange) {
      onChange(search);
    }
    setShowRecent(false);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('nutrivigil-recent-searches');
  };

  return (
    <div className="relative" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search className={`w-5 h-5 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>

        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          onFocus={() => setShowRecent(true)}
          placeholder={placeholder}
          className={`w-full pl-11 pr-10 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            theme === 'dark'
              ? 'bg-white/10 border-white/20 text-white placeholder-gray-400 hover:bg-white/15 focus:bg-white/15'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 hover:border-gray-300 focus:border-indigo-500'
          }`}
          aria-label="Search products"
        />

        {localValue && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              theme === 'dark'
                ? 'hover:bg-white/10'
                : 'hover:bg-gray-100'
            }`}
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* Recent Searches Dropdown */}
      <AnimatePresence>
        {showRecent && recentSearches.length > 0 && !localValue && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-10 w-full mt-2 rounded-lg border backdrop-blur-xl shadow-xl overflow-hidden ${
              theme === 'dark'
                ? 'bg-gray-900/95 border-white/10'
                : 'bg-white/95 border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-4 py-2 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}>
              <span className={`text-xs font-semibold ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Recent Searches
              </span>
              <button
                onClick={handleClearRecent}
                className={`text-xs px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  theme === 'dark'
                    ? 'text-red-400 hover:bg-red-500/20'
                    : 'text-red-600 hover:bg-red-50'
                }`}
                aria-label="Clear recent searches"
              >
                Clear
              </button>
            </div>

            {/* Recent Search Items */}
            <div className="py-1">
              {recentSearches.map((search, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  onClick={() => handleRecentClick(search)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-white/5 text-gray-300'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <Clock className={`w-4 h-4 flex-shrink-0 ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <span className="flex-1 truncate">{search}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
