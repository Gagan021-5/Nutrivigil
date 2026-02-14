import { createContext, useContext, useState, useCallback } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [comparisonProducts, setComparisonProducts] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const MAX_COMPARISON_PRODUCTS = 4;

  const addToComparison = useCallback((product) => {
    setComparisonProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      if (prev.length >= MAX_COMPARISON_PRODUCTS) {
        alert(`You can only compare up to ${MAX_COMPARISON_PRODUCTS} products at once.`);
        return prev;
      }
      return [...prev, product];
    });
  }, []);

  const removeFromComparison = useCallback((productId) => {
    setComparisonProducts((prev) => prev.filter((p) => p.id !== productId));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonProducts([]);
  }, []);

  const isInComparison = useCallback(
    (productId) => {
      return comparisonProducts.some((p) => p.id === productId);
    },
    [comparisonProducts]
  );

  const openComparisonModal = useCallback(() => {
    setIsComparisonModalOpen(true);
  }, []);

  const closeComparisonModal = useCallback(() => {
    setIsComparisonModalOpen(false);
  }, []);

  const value = {
    comparisonProducts,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    isComparisonModalOpen,
    openComparisonModal,
    closeComparisonModal,
    MAX_COMPARISON_PRODUCTS,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};
