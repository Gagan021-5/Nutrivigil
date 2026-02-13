import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Share2, Package } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const FoodDetailModal = ({ isOpen, onClose, foodItem, categoryName }) => {
  const { theme } = useTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle swipe down to close on mobile
  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    setTouchEndY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    // If swiped down more than 100px, close modal
    if (touchStartY && touchEndY && touchStartY - touchEndY < -100) {
      onClose();
    }
    setTouchStartY(0);
    setTouchEndY(0);
  };

  // Handle favorite toggle
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // TODO: Integrate with favorites system
  };

  // Handle share
  const handleShare = async () => {
    const shareData = {
      title: foodItem.name,
      text: `Check out ${foodItem.name} by ${foodItem.brand} on NutriVigil`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(window.location.href);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(
            new CustomEvent('clipboard:copied', {
              detail: { url: window.location.href },
            }),
          );
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      if (typeof window !== 'undefined') {
        window.dispatchEvent(
          new CustomEvent('clipboard:copied', {
            detail: { url: window.location.href },
          }),
        );
      }
    }
  };

  if (!foodItem) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-4xl my-8 rounded-2xl shadow-2xl overflow-hidden ${
                theme === 'dark'
                  ? 'bg-gray-900/95 border border-white/10'
                  : 'bg-white border border-gray-200'
              } backdrop-blur-xl`}
              style={{ maxHeight: 'calc(100vh - 4rem)' }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="food-detail-modal-title"
            >
              {/* Accessible title for screen readers */}
              <h2 id="food-detail-modal-title" className="sr-only">
                {foodItem.name}
              </h2>
              {/* Swipe Indicator for Mobile */}
              <div className="md:hidden flex justify-center pt-2 pb-1">
                <div className={`w-12 h-1 rounded-full ${
                  theme === 'dark' ? 'bg-white/20' : 'bg-gray-300'
                }`} />
              </div>

              {/* Close Button - Top Right */}
              <button
                onClick={onClose}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800/90 hover:bg-gray-700 text-white'
                    : 'bg-white/90 hover:bg-gray-100 text-gray-900'
                } backdrop-blur-sm shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content - Two Column Layout */}
              <div className="flex flex-col md:flex-row overflow-hidden" style={{ maxHeight: 'calc(100vh - 8rem)' }}>
                {/* Left Panel - Product Image & Basic Info (40%) */}
                <div className={`md:w-2/5 p-6 flex flex-col gap-4 ${
                  theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-800/50 to-gray-900/50'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  {/* Product Image */}
                  <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 aspect-square">
                    {foodItem.image ? (
                      <img
                        src={foodItem.image}
                        alt={foodItem.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Package
                          className={`w-24 h-24 ${
                            theme === 'dark' ? 'text-gray-600' : 'text-gray-300'
                          }`}
                        />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    {/* Product Name */}
                    <h2 className={`text-2xl font-bold leading-tight ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {foodItem.name}
                    </h2>

                    {/* Brand Name */}
                    <p className={`text-lg font-medium ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`}>
                      {foodItem.brand}
                    </p>

                    {/* Serving Size */}
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Serving Size:
                      </span>
                      <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-white/10 text-white'
                          : 'bg-gray-200 text-gray-900'
                      }`}>
                        {foodItem.servingSize}
                      </span>
                    </div>

                    {/* Category Badge */}
                    {categoryName && (
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          Category:
                        </span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                          theme === 'dark'
                            ? 'bg-indigo-500/20 text-indigo-400'
                            : 'bg-indigo-100 text-indigo-700'
                        }`}>
                          {categoryName}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto pt-4">
                    {/* Favorite Button */}
                    <button
                      onClick={handleToggleFavorite}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        isFavorite
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : theme === 'dark'
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      <span className="hidden sm:inline">
                        {isFavorite ? 'Favorited' : 'Favorite'}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button
                      onClick={handleShare}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                        theme === 'dark'
                          ? 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                      }`}
                      aria-label="Share this food item"
                    >
                      <Share2 className="w-5 h-5" />
                      <span className="hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>

                {/* Right Panel - Detailed Information (60%) */}
                <div className={`md:w-3/5 p-6 overflow-y-auto ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {/* Placeholder for Phase 2, 3, 4 content */}
                  <div className="space-y-6">
                    <div>
                      <h3 className={`text-xl font-bold mb-4 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        Nutrition Information
                      </h3>
                      <p className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        Detailed nutrition facts will be displayed here in Phase 2.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FoodDetailModal;
