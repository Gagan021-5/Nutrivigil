import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { TrendingUp, Sparkles, ChevronRight, ChevronLeft } from 'lucide-react';
import { getScoreColor } from '../utils/nutritionScore';
import { findBetterAlternatives, getBetterAlternativeMessage } from '../utils/betterAlternativesAlgorithm';

/**
 * BetterAlternatives Component
 *
 * Displays healthier alternatives to the current product
 * with specific improvements highlighted.
 *
 * @param {Object} currentFood - The currently viewed food item
 * @param {Array} allFoods - All foods in the current category
 * @param {string} category - Category slug
 * @param {Function} onProductClick - Callback when a product is clicked
 */
const BetterAlternatives = ({ currentFood, allFoods, category, onProductClick }) => {
  const { theme } = useTheme();

  // Find better alternatives using the algorithm
  const alternatives = useMemo(() => {
    if (!currentFood || !allFoods) return [];
    return findBetterAlternatives(currentFood, allFoods, category, 5);
  }, [currentFood, allFoods, category]);

  // Scroll carousel left/right
  const scrollCarousel = (direction) => {
    const carousel = document.getElementById('better-alternatives-carousel');
    if (!carousel) return;

    const scrollAmount = carousel.offsetWidth * 0.7;
    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (alternatives.length === 0) {
    return (
      <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Healthier Alternatives
          </h3>
        </div>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Great choice! This product is already one of the healthiest options in this category.
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20' : 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className={`w-5 h-5 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`} />
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Healthier Alternatives
            </h3>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Better nutritional options in this category
          </p>
        </div>

        {/* Navigation Buttons */}
        {alternatives.length > 2 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollCarousel('left')}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-white/10 hover:bg-white/20 text-white'
                  : 'bg-white hover:bg-gray-100 text-gray-900 border border-gray-200'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Alternatives Carousel */}
      <div
        id="better-alternatives-carousel"
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollCarousel('left');
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollCarousel('right');
          }
        }}
      >
        {alternatives.map((alternative, index) => (
          <motion.div
            key={alternative.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex-shrink-0 snap-start"
            style={{ width: 'calc(50% - 8px)', minWidth: '280px' }}
          >
            <div
              onClick={() => onProductClick && onProductClick(alternative)}
              className={`h-full rounded-xl p-4 cursor-pointer transition-all duration-200 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-white/5 hover:bg-white/10 border border-white/10'
                  : 'bg-white hover:shadow-lg border border-gray-200'
              }`}
            >
              {/* Product Image */}
              {alternative.image && (
                <div className="relative mb-3">
                  <img
                    src={alternative.image}
                    alt={alternative.name}
                    className="w-full h-32 object-contain rounded-lg"
                  />
                  {/* Better Badge */}
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    theme === 'dark'
                      ? 'bg-green-500/90 text-white'
                      : 'bg-green-500 text-white'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    +{alternative.scoreImprovement}
                  </div>
                </div>
              )}

              {/* Product Info */}
              <div className="space-y-2">
                <h4 className={`font-semibold text-sm line-clamp-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {alternative.name}
                </h4>

                {alternative.brand && (
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {alternative.brand}
                  </p>
                )}

                {/* Nutrition Score */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Nutrition Score
                  </span>
                  <span className={`text-sm font-bold ${getScoreColor(alternative.nutritionScore).textColor}`}>
                    {alternative.nutritionScore}/100
                  </span>
                </div>

                {/* Key Improvements */}
                <div className={`pt-2 border-t ${
                  theme === 'dark' ? 'border-white/10' : 'border-gray-200'
                }`}>
                  <p className={`text-xs font-medium mb-1 ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    Why it's better:
                  </p>
                  <p className={`text-xs ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {getBetterAlternativeMessage(alternative.improvements, alternative.scoreImprovement)}
                  </p>
                </div>

                {/* Individual Improvements Pills */}
                {Object.keys(alternative.improvements).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Object.values(alternative.improvements).slice(0, 3).map((improvement, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded-full ${
                          theme === 'dark'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {improvement.reduction}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Footer */}
      <div className={`mt-4 pt-4 border-t ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}>
        <p className={`text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <strong>Tip:</strong> Alternatives are selected based on better nutrition scores and specific improvements in sugar, sodium, fat, protein, or fiber content.
        </p>
      </div>
    </div>
  );
};

export default BetterAlternatives;
