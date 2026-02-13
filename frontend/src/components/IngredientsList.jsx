import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { AlertCircle } from 'lucide-react';

const IngredientsList = ({ ingredients, allergens }) => {
  const { theme } = useTheme();

  // Mock ingredients if none provided (for demonstration)
  const displayIngredients = ingredients || [
    'Enriched Wheat Flour',
    'Water',
    'Sugar',
    'Vegetable Oil',
    'Salt',
    'Yeast',
    'Preservatives (Calcium Propionate)',
  ];

  // Allergen list; default to empty when none provided to avoid false warnings
  const displayAllergens = Array.isArray(allergens) ? allergens : [];

  // Check if an ingredient contains an allergen
  const isAllergen = (ingredient) => {
    return displayAllergens.some((allergen) =>
      ingredient.toLowerCase().includes(allergen.toLowerCase())
    );
  };

  return (
    <div className="space-y-4">
      {/* Ingredients List */}
      <div className={`rounded-xl p-5 border ${
        theme === 'dark'
          ? 'bg-white/5 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <h3 className={`text-lg font-bold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Ingredients
        </h3>
        <div className={`text-sm leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {displayIngredients.map((ingredient, index) => (
            <span key={index}>
              <span
                className={
                  isAllergen(ingredient)
                    ? 'font-bold text-red-500'
                    : ''
                }
              >
                {ingredient}
              </span>
              {index < displayIngredients.length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>

      {/* Allergen Warning */}
      {displayAllergens && displayAllergens.length > 0 && (
        <div className={`rounded-xl p-5 border-2 ${
          theme === 'dark'
            ? 'bg-red-500/10 border-red-500/30'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
              theme === 'dark' ? 'text-red-400' : 'text-red-600'
            }`} />
            <div>
              <h4 className={`font-bold mb-2 ${
                theme === 'dark' ? 'text-red-400' : 'text-red-700'
              }`}>
                Allergen Warning
              </h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-red-300' : 'text-red-800'
              }`}>
                <span className="font-semibold">Contains:</span>{' '}
                {displayAllergens.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Additional Info */}
      <div className={`rounded-xl p-4 text-xs ${
        theme === 'dark'
          ? 'bg-white/5 text-gray-400'
          : 'bg-gray-50 text-gray-600'
      }`}>
        <p className="italic">
          Ingredient information is provided by the product manufacturer. Always check the product label for the most accurate information.
        </p>
      </div>
    </div>
  );
};

export default IngredientsList;
