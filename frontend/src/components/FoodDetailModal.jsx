import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Scale, Flag } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import NutritionFactsTable from './NutritionFactsTable';
import HealthInsights from './HealthInsights';
import IngredientsList from './IngredientsList';
import DietaryBadges from './DietaryBadges';
import SimilarProducts from './SimilarProducts';
import BetterAlternatives from './BetterAlternatives';
import { calculateNutritionScore } from '../utils/nutritionScore';
import './FoodDetailModal.css';

const FoodDetailModal = ({ food, onClose, allFoods = [], currentIndex = -1, onNavigate, category, onProductSelect }) => {
  const { theme } = useTheme();

  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allFoods.length - 1;

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onNavigate) {
        onNavigate('previous');
      } else if (e.key === 'ArrowRight' && hasNext && onNavigate) {
        onNavigate('next');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate, currentIndex, allFoods.length]);

  if (!food) return null;

  const nutritionScore = food.nutrition ? calculateNutritionScore(food.nutrition) : 0;

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: food.name,
      text: `Check out ${food.name} by ${food.brand} on NutriVigil`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancelled or error occurred
        if (err.name !== 'AbortError') {
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard!');
        }
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Handle compare
  const handleCompare = () => {
    alert('Compare feature coming soon! This will allow you to compare this product with similar items.');
  };

  // Handle view alternatives
  const handleViewAlternatives = () => {
    // Scroll to the Better Alternatives section
    const alternativesSection = document.getElementById('better-alternatives-section');
    if (alternativesSection) {
      alternativesSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // Handle report
  const handleReport = () => {
    alert('Report feature coming soon! You can report incorrect nutrition information here.');
  };

  // Handle similar product click
  const handleSimilarProductClick = (product) => {
    // If onProductSelect callback is provided, use it to directly set the product
    if (onProductSelect) {
      onProductSelect(product);
    } else {
      // Fallback navigation via repeated timeouts has been removed to avoid
      // inefficient and unreliable behavior. If needed, provide an onProductSelect
      // callback to handle direct product selection.
    }
  };

  return (
    <div
      className="food-modal-backdrop"
      onClick={handleBackdropClick}
    >
      <div
        className={`food-modal ${theme === 'light' ? 'light' : ''} food-modal-animate`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Previous Button */}
        {hasPrevious && onNavigate && (
          <button
            onClick={() => onNavigate('previous')}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800/90 hover:bg-gray-700 text-white'
                : 'bg-white/90 hover:bg-gray-100 text-gray-900'
            } backdrop-blur-sm shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            aria-label="Previous food item"
            title="Previous (← key)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && onNavigate && (
          <button
            onClick={() => onNavigate('next')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800/90 hover:bg-gray-700 text-white'
                : 'bg-white/90 hover:bg-gray-100 text-gray-900'
            } backdrop-blur-sm shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            aria-label="Next food item"
            title="Next (→ key)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`food-modal-close ${theme === 'dark' ? 'text-white hover:bg-white/10' : 'text-gray-900 hover:bg-gray-100'}`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="food-modal-scroll">
          {/* Header Section */}
          <div className="food-modal-header">
            {/* Product Image */}
            {food.image && (
              <div className="food-modal-image-container">
                <img
                  src={food.image}
                  alt={food.name}
                  className="food-modal-image"
                />
              </div>
            )}

            {/* Product Info */}
            <div className="food-modal-info">
              <h2
                id="modal-title"
                className={`text-3xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {food.name}
              </h2>
              {food.brand && (
                <p className={`text-lg mb-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {food.brand}
                </p>
              )}

              {/* Nutrition Score Badge */}
              <div className="flex items-center gap-3">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold ${
                    theme === 'dark'
                      ? 'bg-white/10 text-gray-300'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>Nutrition Score:</span>
                  <span className={getScoreColor(nutritionScore)}>
                    {nutritionScore}/100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className={`my-6 border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`} />

          {/* Nutrition Facts Table */}
          <div className="food-modal-nutrition">
            <NutritionFactsTable
              nutrition={food.nutrition}
              servingSize={food.servingSize}
            />
          </div>

          {/* Divider */}
          <div className={`my-6 border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`} />

          {/* Health Insights */}
          <div className="mb-6">
            <h3 className={`text-2xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Health Insights
            </h3>
            <HealthInsights
              nutrition={food.nutrition}
              servingSize={food.servingSize}
            />
          </div>

          {/* Divider */}
          <div className={`my-6 border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`} />

          {/* Dietary Badges */}
          <div className="mb-6">
            <DietaryBadges dietary={food.dietary} />
          </div>

          {/* Divider */}
          <div className={`my-6 border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`} />

          {/* Ingredients List */}
          <div className="mb-6">
            <IngredientsList
              ingredients={food.ingredients}
              allergens={food.allergens}
            />
          </div>

          {/* Divider */}
          <div className={`my-6 border-t ${
            theme === 'dark' ? 'border-white/10' : 'border-gray-200'
          }`} />

          {/* Similar Products */}
          {category && allFoods.length > 1 && (
            <>
              <div className="mb-6">
                <SimilarProducts
                  currentFood={food}
                  allFoods={allFoods}
                  category={category}
                  onProductClick={handleSimilarProductClick}
                />
              </div>

              {/* Divider */}
              <div className={`my-6 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`} />

              {/* Better Alternatives */}
              <div id="better-alternatives-section" className="mb-6">
                <BetterAlternatives
                  currentFood={food}
                  allFoods={allFoods}
                  category={category}
                  onProductClick={handleSimilarProductClick}
                />
              </div>

              {/* Divider */}
              <div className={`my-6 border-t ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`} />
            </>
          )}

          {/* Action Buttons */}
          <div className="mb-6">
            <h3 className={`text-xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Share Button */}
              <button
                onClick={handleShare}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>

              {/* Compare Button */}
              <button
                onClick={handleCompare}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/50'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                <Scale className="w-5 h-5" />
                Compare
              </button>

              {/* Report Button */}
              <button
                onClick={handleReport}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/50'
                    : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              >
                <Flag className="w-5 h-5" />
                Report
              </button>
            </div>

            {/* View Healthier Alternatives Button - Full Width */}
            <button
              onClick={handleViewAlternatives}
              className={`mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/50'
                  : 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
              } focus:outline-none focus:ring-2 focus:ring-green-500`}
            >
              View Healthier Alternatives
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailModal;
