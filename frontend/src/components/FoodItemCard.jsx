import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useComparison } from '../contexts/ComparisonContext';
import { Package } from 'lucide-react';
import { calculateNutritionScore, getScoreColor } from '../utils/nutritionScore';

const FoodItemCard = ({ item, index = 0, onViewDetails }) => {
  const { theme } = useTheme();
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();

  const inComparison = isInComparison(item.id);

  // Calculate nutrition score
  const score = item.nutrition ? calculateNutritionScore(item.nutrition) : null;
  const scoreInfo = score !== null ? getScoreColor(score) : null;

  const handleCardClick = () => {
    // Delegate click handling to parent so it can decide how to show details
    if (typeof onViewDetails === 'function') {
      onViewDetails(item);
    }
  };

  const handleCompareToggle = (e) => {
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(item.id);
    } else {
      addToComparison(item);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ scale: 1.03, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${item.name} by ${item.brand}`}
      className={`group relative rounded-xl border backdrop-blur-xl overflow-hidden cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 focus:ring-offset-gray-900'
          : 'bg-white border-gray-200 hover:border-indigo-300 shadow-lg hover:shadow-2xl focus:ring-offset-white'
      }`}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          // Placeholder when no image is available
          <div className="w-full h-full flex items-center justify-center">
            <Package
              className={`w-16 h-16 ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
              }`}
            />
          </div>
        )}

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Compare Checkbox - Top Left */}
        <div className="absolute top-3 left-3 z-10">
          <button
            onClick={handleCompareToggle}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
              inComparison
                ? 'bg-blue-600 border-2 border-blue-600'
                : theme === 'dark'
                ? 'bg-gray-800/80 border-2 border-gray-600 hover:bg-gray-700/80'
                : 'bg-white/80 border-2 border-gray-300 hover:bg-gray-50/80'
            } backdrop-blur-sm`}
            aria-label={inComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            {inComparison && (
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Nutrition Score Badge - Top Right */}
        {scoreInfo && (
          <div className="absolute top-3 right-3">
            <div className="relative w-16 h-16">
              {/* Circle Background */}
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
                {/* Background circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                  strokeWidth="4"
                />
                {/* Progress circle */}
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  fill="none"
                  stroke={scoreInfo.circleColor}
                  strokeWidth="4"
                  strokeDasharray={`${(score / 100) * 175.93} 175.93`}
                  strokeLinecap="round"
                  className="transition-all duration-500"
                />
              </svg>
              {/* Score Number */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={`text-center ${
                  theme === 'dark' ? 'bg-gray-900/90' : 'bg-white/90'
                } backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center`}>
                  <span className={`text-sm font-bold ${scoreInfo.textColor}`}>
                    {score}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hover Indicator */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
        >
          <div className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-lg">
            <span className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              View Details
            </span>
          </div>
        </motion.div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className={`text-lg font-bold line-clamp-2 min-h-[3.5rem] ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {item.name}
        </h3>

        {/* Brand Name */}
        <p className={`text-sm font-medium ${
          theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
        }`}>
          {item.brand}
        </p>

        {/* Nutrition Quick View */}
        {item.nutrition && (
          <div className={`rounded-lg p-3 space-y-2 ${
            theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'
          }`}>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Calories */}
              <div>
                <span className={`block font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Calories
                </span>
                <span className={`block font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.nutrition.calories}
                </span>
              </div>

              {/* Protein */}
              <div>
                <span className={`block font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Protein
                </span>
                <span className={`block font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.nutrition.protein}g
                </span>
              </div>

              {/* Carbs */}
              <div>
                <span className={`block font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Carbs
                </span>
                <span className={`block font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.nutrition.carbs}g
                </span>
              </div>

              {/* Fat */}
              <div>
                <span className={`block font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Fat
                </span>
                <span className={`block font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.nutrition.totalFat}g
                </span>
              </div>

              {/* Sodium */}
              <div>
                <span className={`block font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Sodium
                </span>
                <span className={`block font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.nutrition.sodium}mg
                </span>
              </div>

              {/* Sugar */}
              <div>
                <span className={`block font-semibold ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Sugar
                </span>
                <span className={`block font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {item.nutrition.sugar}g
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Score Label and Serving Size */}
        <div className="flex items-center justify-between">
          {/* Score Label */}
          {scoreInfo && (
            <div className={`text-xs px-2 py-1 rounded-full font-semibold ${scoreInfo.bgColor} ${scoreInfo.textColor}`}>
              {scoreInfo.label}
            </div>
          )}

          {/* Serving Size */}
          <div className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
            theme === 'dark'
              ? 'bg-white/10 text-gray-300'
              : 'bg-gray-100 text-gray-700'
          }`}>
            {item.servingSize}
          </div>
        </div>
      </div>

      {/* Decorative Corner Accent */}
      <div className={`absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        theme === 'dark' ? 'bg-gradient-to-br from-indigo-500/20' : 'bg-gradient-to-br from-indigo-500/10'
      } rounded-br-full`} />
    </motion.div>
  );
};

// Loading Skeleton for FoodItemCard
export const FoodItemCardSkeleton = () => {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl border overflow-hidden animate-pulse ${
        theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'
      }`}
    >
      {/* Image Skeleton */}
      <div className={`h-48 ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className={`h-4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-4 w-3/4 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
        </div>

        {/* Brand Skeleton */}
        <div className={`h-3 w-1/2 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />

        {/* Nutrition Grid Skeleton */}
        <div className={`rounded-lg p-3 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-1">
                <div className={`h-3 w-12 rounded ${theme === 'dark'? 'bg-white/10' : 'bg-gray-200'}`} />
                <div className={`h-3 w-8 rounded ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row skeleton */}
        <div className="flex items-center justify-between">
          <div className={`h-6 w-16 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
          <div className={`h-6 w-20 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  );
};

export default FoodItemCard;
