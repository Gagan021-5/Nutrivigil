import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, Share2, Crown, TrendingUp, TrendingDown } from 'lucide-react';
import { useComparison } from '../contexts/ComparisonContext';
import { useTheme } from '../contexts/ThemeContext';
import { calculateNutritionScore, getScoreColor } from '../utils/nutritionScore';
import { useRef } from 'react';

const ComparisonModal = () => {
  const { comparisonProducts, isComparisonModalOpen, closeComparisonModal, clearComparison } = useComparison();
  const { theme } = useTheme();
  const comparisonTableRef = useRef(null);

  if (!isComparisonModalOpen) return null;

  const isDark = theme === 'dark';

  // Calculate nutrition scores for all products
  const productsWithScores = comparisonProducts.map(product => ({
    ...product,
    score: product.nutrition ? calculateNutritionScore(product.nutrition) : 0
  }));

  // Find best product (highest score)
  const bestProduct = productsWithScores.reduce((best, current) =>
    current.score > best.score ? current : best
  , productsWithScores[0]);

  // Nutrition attributes to compare
  const nutritionAttributes = [
    { key: 'calories', label: 'Calories', unit: '', lower_is_better: true },
    { key: 'protein', label: 'Protein', unit: 'g', lower_is_better: false },
    { key: 'carbs', label: 'Carbs', unit: 'g', lower_is_better: false },
    { key: 'totalFat', label: 'Total Fat', unit: 'g', lower_is_better: true },
    { key: 'saturatedFat', label: 'Saturated Fat', unit: 'g', lower_is_better: true },
    { key: 'transFat', label: 'Trans Fat', unit: 'g', lower_is_better: true },
    { key: 'cholesterol', label: 'Cholesterol', unit: 'mg', lower_is_better: true },
    { key: 'sodium', label: 'Sodium', unit: 'mg', lower_is_better: true },
    { key: 'fiber', label: 'Fiber', unit: 'g', lower_is_better: false },
    { key: 'sugar', label: 'Sugar', unit: 'g', lower_is_better: true },
    { key: 'addedSugar', label: 'Added Sugar', unit: 'g', lower_is_better: true },
  ];

  // Get best and worst values for each attribute
  const getAttributeExtremes = (attr) => {
    const values = productsWithScores
      .map(p => p.nutrition?.[attr.key])
      .filter(v => v !== undefined && v !== null);

    if (values.length === 0) return { best: null, worst: null };

    const best = attr.lower_is_better ? Math.min(...values) : Math.max(...values);
    const worst = attr.lower_is_better ? Math.max(...values) : Math.min(...values);

    return { best, worst };
  };

  // Get cell color based on value
  const getCellColor = (value, attr) => {
    if (value === undefined || value === null) return '';

    const { best, worst } = getAttributeExtremes(attr);

    if (best === worst) return '';
    if (value === best) return isDark ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-800';
    if (value === worst) return isDark ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-800';

    return '';
  };

  // Download as image
  const handleDownloadImage = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(comparisonTableRef.current, {
        backgroundColor: isDark ? '#111827' : '#ffffff',
        scale: 2,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `product-comparison-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  // Print comparison
  const handlePrint = () => {
    window.print();
  };

  // Share comparison
  const handleShare = async () => {
    const shareText = `Product Comparison - ${comparisonProducts.map(p => p.name).join(' vs ')}`;
    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Product Comparison - NutriVigil',
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        alert('Comparison link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        alert('Failed to copy link. Please copy manually.');
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-colors duration-300"
        style={{ background: isDark ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.45)' }}
        onClick={closeComparisonModal}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
          className={`relative w-full max-w-7xl max-h-[90vh] overflow-auto rounded-2xl shadow-2xl transition-colors duration-300 ${
            isDark
              ? 'bg-gray-900 text-white ring-1 ring-white/10'
              : 'bg-white text-gray-900 ring-1 ring-gray-200'
          }`}
        >
          {/* Gradient accent line at top — consistent with other modals */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-t-2xl z-20" />
          {/* Header */}
          <div className={`sticky top-0 z-10 backdrop-blur-xl border-b p-6 transition-colors duration-300 ${
            isDark
              ? 'bg-gray-900/95 border-gray-800'
              : 'bg-white/95 border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Product Comparison
              </h2>
              <button
                onClick={closeComparisonModal}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleDownloadImage}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Download className="w-4 h-4" />
                Download Image
              </button>
              <button
                onClick={handlePrint}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleShare}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => {
                  clearComparison();
                  closeComparisonModal();
                }}
                className={`ml-auto px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'text-red-400 hover:bg-red-900/20'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                Clear All
              </button>
            </div>
          </div>

          {/* Comparison Table */}
          <div ref={comparisonTableRef} className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className={`sticky left-0 z-10 p-4 text-left font-bold transition-colors duration-300 ${
                      isDark ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm'
                    }`}>
                      Attribute
                    </th>
                    {productsWithScores.map((product) => (
                      <th key={product.id} className="p-4 text-center min-w-[200px]">
                        <div className="space-y-3">
                          {/* Winner Crown */}
                          {product.id === bestProduct.id && (
                            <div className="flex justify-center">
                              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                                <Crown className="w-4 h-4" />
                                Best Choice
                              </div>
                            </div>
                          )}

                          {/* Product Image */}
                          <img
                            src={product.imageUrl || product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-lg mx-auto"
                          />

                          {/* Product Name */}
                          <div className="font-bold text-sm">{product.name}</div>

                          {/* Brand */}
                          <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {product.brand}
                          </div>

                          {/* Nutrition Score */}
                          <div className="flex items-center justify-center gap-2">
                            <span className={`text-2xl font-bold ${getScoreColor(product.score).textColor}`}>
                              {product.score}
                            </span>
                            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                              /100
                            </span>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full font-semibold inline-block ${
                            getScoreColor(product.score).bgColor
                          } ${getScoreColor(product.score).textColor}`}>
                            {getScoreColor(product.score).label}
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {/* Serving Size */}
                  <tr className={`transition-colors duration-150 ${
                    isDark
                      ? 'border-t border-gray-800 hover:bg-white/[0.03]'
                      : 'border-t border-gray-100 hover:bg-indigo-50/50'
                  }`}>
                    <td className={`sticky left-0 p-4 font-semibold transition-colors duration-300 ${
                      isDark ? 'bg-gray-900' : 'bg-white'
                    }`}>
                      Serving Size
                    </td>
                    {productsWithScores.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.servingSize}
                      </td>
                    ))}
                  </tr>

                  {/* Nutrition Attributes */}
                  {nutritionAttributes.map((attr) => (
                    <tr key={attr.key} className={`transition-colors duration-150 ${
                      isDark
                        ? 'border-t border-gray-800 hover:bg-white/[0.03]'
                        : 'border-t border-gray-100 hover:bg-indigo-50/50'
                    }`}>
                      <td className={`sticky left-0 p-4 font-semibold transition-colors duration-300 ${
                        isDark ? 'bg-gray-900' : 'bg-white'
                      }`}>
                        <div className="flex items-center gap-2">
                          {attr.label}
                          {attr.lower_is_better ? (
                            <TrendingDown className="w-4 h-4 text-green-500" title="Lower is better" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-blue-500" title="Higher is better" />
                          )}
                        </div>
                      </td>
                      {productsWithScores.map((product) => {
                        const value = product.nutrition?.[attr.key];
                        const cellColor = getCellColor(value, attr);
                        return (
                          <td
                            key={product.id}
                            className={`p-4 text-center font-bold ${cellColor}`}
                          >
                            {value !== undefined && value !== null
                              ? `${value}${attr.unit}`
                              : 'N/A'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className={`mt-6 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="font-bold mb-2">Legend:</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${isDark ? 'bg-green-900/30' : 'bg-green-100'}`} />
                  <span>Best value</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${isDark ? 'bg-red-900/30' : 'bg-red-100'}`} />
                  <span>Worst value</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-green-500" />
                  <span>Lower is better</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span>Higher is better</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonModal;
