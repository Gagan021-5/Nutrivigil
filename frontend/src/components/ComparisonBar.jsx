import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale } from 'lucide-react';
import { useComparison } from '../contexts/ComparisonContext';
import { useTheme } from '../contexts/ThemeContext';

const ComparisonBar = () => {
  const { comparisonProducts, removeFromComparison, clearComparison, openComparisonModal } = useComparison();
  const { theme } = useTheme();

  if (comparisonProducts.length === 0) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className={`fixed bottom-0 left-0 right-0 z-50 ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        } border-t shadow-lg`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left side - Selected products */}
            <div className="flex items-center gap-2 flex-1 overflow-x-auto">
              <Scale
                aria-hidden="true"
                className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'} flex-shrink-0`}
              />
              <span className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'} flex-shrink-0`}>
                Compare ({comparisonProducts.length}/{4})
              </span>

              <div className="flex gap-2 overflow-x-auto">
                {comparisonProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className={`relative flex items-center gap-2 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    } rounded-lg px-3 py-2 flex-shrink-0`}
                  >
                    <img
                      src={product.image || product.imageUrl}
                      alt={product.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <span className={`text-sm ${isDark ? 'text-gray-200' : 'text-gray-800'} max-w-[100px] truncate`}>
                      {product.name}
                    </span>
                    <button
                      onClick={() => removeFromComparison(product.id)}
                      className={`${
                        isDark ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-600'
                      } transition-colors`}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right side - Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={clearComparison}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Clear All
              </button>
              <button
                onClick={openComparisonModal}
                disabled={comparisonProducts.length < 2}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  comparisonProducts.length < 2
                    ? isDark
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : isDark
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Compare Now
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonBar;
