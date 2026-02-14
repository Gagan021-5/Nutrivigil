import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Package, ChevronRight, ChevronLeft } from 'lucide-react';
import { calculateNutritionScore, getScoreColor } from '../utils/nutritionScore';
import { findSimilarProducts } from '../utils/similarityAlgorithm';

/**
 * SimilarProducts Component
 *
 * Displays a horizontal scrollable carousel of similar food items
 * from the same category based on nutrition similarity.
 *
 * @param {Object} currentFood - The currently viewed food item
 * @param {Array} allFoods - All foods in the current category
 * @param {string} category - Category slug
 * @param {Function} onProductClick - Callback when a product is clicked
 */
const SimilarProducts = ({ currentFood, allFoods, category, onProductClick }) => {
  const { theme } = useTheme();

  // Find similar products using the similarity algorithm
  const similarProducts = useMemo(() => {
    if (!currentFood || !allFoods) return [];
    return findSimilarProducts(currentFood, allFoods, category, 6);
  }, [currentFood, allFoods, category]);

  // Scroll carousel left/right
  const scrollCarousel = (direction) => {
    const carousel = document.getElementById('similar-products-carousel');
    if (!carousel) return;

    const scrollAmount = carousel.offsetWidth * 0.7;
    carousel.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  if (similarProducts.length === 0) {
    return null; // Don't render if no similar products
  }

  return (
    <div className={`rounded-xl p-6 ${theme === 'dark' ? 'bg-white/5' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Similar Products
          </h3>
          <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Products with similar nutritional profiles
          </p>
        </div>

        {/* Navigation Buttons */}
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
      </div>

      {/* Scrollable Carousel */}
      <div
        id="similar-products-carousel"
        className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
        style={{
          scrollbarWidth: 'thin',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        {similarProducts.map((product, index) => (
          <SimilarProductCard
            key={product.id}
            product={product}
            index={index}
            theme={theme}
            onClick={() => onProductClick && onProductClick(product)}
          />
        ))}
      </div>
    </div>
  );
};

/**
 * Individual Similar Product Card
 */
const SimilarProductCard = ({ product, index, theme, onClick }) => {
  const score = product.nutrition ? calculateNutritionScore(product.nutrition) : null;
  const scoreInfo = score !== null ? getScoreColor(score) : null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className={`flex-shrink-0 w-48 rounded-xl border cursor-pointer transition-all ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
          : 'bg-white border-gray-200 hover:border-indigo-300 shadow-md hover:shadow-xl'
      }`}
    >
      {/* Product Image */}
      <div className="relative h-32 overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        {product.image ? (
          <img
            src={product.image}
            alt={`Product image of ${product.name}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package
              aria-hidden="true"
              className={`w-12 h-12 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`}
            />
          </div>
        )}

        {/* Score Badge */}
        {scoreInfo && (
          <div className="absolute top-2 right-2">
            <div
              className={`text-xs font-bold px-2 py-1 rounded-full ${scoreInfo.bgColor} ${scoreInfo.textColor}`}
            >
              {score}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {/* Brand */}
        <p className={`text-xs font-medium ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`}>
          {product.brand}
        </p>

        {/* Name */}
        <h4
          className={`text-sm font-bold line-clamp-2 min-h-[2.5rem] ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          {product.name}
        </h4>

        {/* Quick Stats */}
        {product.nutrition && (
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Cal:</span>
              <span className={`ml-1 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {product.nutrition.calories}
              </span>
            </div>
            <div>
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>Protein:</span>
              <span className={`ml-1 font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {product.nutrition.protein}g
              </span>
            </div>
          </div>
        )}

        {/* Similarity Badge */}
        {product.similarityScore && (
          <div
            className={`text-xs px-2 py-1 rounded-full text-center ${
              theme === 'dark' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-100 text-indigo-700'
            }`}
          >
            {Math.round(product.similarityScore)}% similar
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SimilarProducts;
