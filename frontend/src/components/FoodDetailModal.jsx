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
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNavigate, currentIndex, allFoods.length]);

  if (!food) return null;

  const nutritionScore = food.nutrition ? calculateNutritionScore(food.nutrition) : 0;

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    if (score >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

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

  const handleCompare = () => {
    alert('Compare feature coming soon! This will allow you to compare this product with similar items.');
  };

  const handleViewAlternatives = () => {
    const alternativesSection = document.getElementById('better-alternatives-section');
    if (alternativesSection) {
      alternativesSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleReport = () => {
    alert('Report feature coming soon! You can report incorrect nutrition information here.');
  };

  const handleSimilarProductClick = (product) => {
    if (onProductSelect) {
      onProductSelect(product);
    }
  };

  // Reusable divider with tighter margins
  const Divider = () => (
    <div
      className={`food-modal-divider border-t ${
        theme === 'dark' ? 'border-white/10' : 'border-gray-200'
      }`}
    />
  );

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
            className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800/90 hover:bg-gray-700 text-white'
                : 'bg-white/90 hover:bg-gray-100 text-gray-900'
            } backdrop-blur-sm shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            aria-label="Previous food item"
            title="Previous (← key)"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Button */}
        {hasNext && onNavigate && (
          <button
            onClick={() => onNavigate('next')}
            className={`absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full transition-all duration-200 ${
              theme === 'dark'
                ? 'bg-gray-800/90 hover:bg-gray-700 text-white'
                : 'bg-white/90 hover:bg-gray-100 text-gray-900'
            } backdrop-blur-sm shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            aria-label="Next food item"
            title="Next (→ key)"
          >
            <ChevronRight className="w-5 h-5" />
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

          {/* Header — image + info side-by-side */}
          <div className="food-modal-header">
            {food.image && (
              <div className="food-modal-image-container">
                <img
                  src={food.image}
                  alt={food.name}
                  className="food-modal-image"
                />
              </div>
            )}

            <div className="food-modal-info">
              <h2
                id="modal-title"
                className={`text-xl font-bold mb-1 leading-snug ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {food.name}
              </h2>

              {food.isVegetarian !== undefined && food.isVegetarian !== null && (
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`flex items-center justify-center w-4 h-4 border-2 rounded-sm bg-white ${
                      food.isVegetarian ? 'border-green-600' : 'border-red-600'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      food.isVegetarian ? 'bg-green-600' : 'bg-red-600'
                    }`} />
                  </div>
                  <span className={`text-xs font-bold tracking-wide ${
                    food.isVegetarian ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {food.isVegetarian ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
                  </span>
                </div>
              )}

              {food.brand && (
                <p className={`text-sm mb-2 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {food.brand}
                </p>
              )}

              {/* Nutrition Score Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
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

          <Divider />

          {/* Nutrition Facts Table */}
          <div className="food-modal-nutrition">
            <NutritionFactsTable
              nutrition={food.nutrition}
              servingSize={food.servingSize}
            />
          </div>

          <Divider />

          {/* Health Insights */}
          <div className="mb-3">
            <h3 className={`text-lg font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Health Insights
            </h3>
            <HealthInsights
              nutrition={food.nutrition}
              servingSize={food.servingSize}
            />
          </div>

          <Divider />

          {/* Dietary Badges */}
          <div className="mb-3">
            <DietaryBadges dietary={food.dietary} />
          </div>

          <Divider />

          {/* Ingredients List */}
          <div className="mb-3">
            <IngredientsList
              ingredients={food.ingredients}
              allergens={food.allergens}
            />
          </div>

          {/* Similar Products + Better Alternatives */}
          {category && allFoods.length > 1 && (
            <>
              <Divider />
              <div className="mb-3">
                <SimilarProducts
                  currentFood={food}
                  allFoods={allFoods}
                  category={category}
                  onProductClick={handleSimilarProductClick}
                />
              </div>

              <Divider />

              <div id="better-alternatives-section" className="mb-3">
                <BetterAlternatives
                  currentFood={food}
                  allFoods={allFoods}
                  category={category}
                  onProductClick={handleSimilarProductClick}
                />
              </div>
            </>
          )}

          <Divider />

          {/* Action Buttons */}
          <div className="mb-3">
            <h3 className={`text-base font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
              <button
                onClick={handleShare}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/50'
                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>

              <button
                onClick={handleCompare}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 border border-purple-500/50'
                    : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
              >
                <Scale className="w-4 h-4" />
                Compare
              </button>

              <button
                onClick={handleReport}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 border border-orange-500/50'
                    : 'bg-orange-50 text-orange-700 hover:bg-orange-100 border border-orange-200'
                } focus:outline-none focus:ring-2 focus:ring-orange-500`}
              >
                <Flag className="w-4 h-4" />
                Report
              </button>
            </div>

            <button
              onClick={handleViewAlternatives}
              className={`mt-2.5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
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
