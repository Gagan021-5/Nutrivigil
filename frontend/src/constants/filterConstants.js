// Centralized filter definitions to ensure UI and filtering logic stay in sync

export const FILTER_DEFINITIONS = {
  dietary: {
    label: 'Dietary Preferences',
    options: [
      { id: 'vegan', label: 'Vegan' },
      { id: 'vegetarian', label: 'Vegetarian' },
      { id: 'gluten-free', label: 'Gluten-Free' },
      { id: 'organic', label: 'Organic' },
      { id: 'low-carb', label: 'Low Carb' },
      { id: 'high-protein', label: 'High Protein' },
    ],
  },
  scoreRange: {
    label: 'Nutrition Score',
    options: [
      { id: 'excellent', label: 'Excellent (70-100)', min: 70, max: 100 },
      { id: 'good', label: 'Good (50-69)', min: 50, max: 69 },
      { id: 'fair', label: 'Fair (30-49)', min: 30, max: 49 },
      { id: 'poor', label: 'Poor (0-29)', min: 0, max: 29 },
    ],
  },
  allergens: {
    label: 'Allergen-Free',
    options: [
      { id: 'nuts', label: 'Nuts' },
      { id: 'dairy', label: 'Dairy' },
      { id: 'gluten', label: 'Gluten' },
      { id: 'soy', label: 'Soy' },
      { id: 'eggs', label: 'Eggs' },
    ],
  },
  calorieRange: {
    label: 'Calorie Range',
    options: [
      { id: 'very-low', label: 'Very Low (0-100)', min: 0, max: 100 },
      { id: 'low', label: 'Low (101-200)', min: 101, max: 200 },
      { id: 'medium', label: 'Medium (201-400)', min: 201, max: 400 },
      { id: 'high', label: 'High (401-600)', min: 401, max: 600 },
      { id: 'very-high', label: 'Very High (600+)', min: 601, max: 9999 },
    ],
  },
};

// Helper function to get label for a filter option
export const getFilterLabel = (category, optionId) => {
  const categoryDef = FILTER_DEFINITIONS[category];
  if (!categoryDef) return optionId;

  const option = categoryDef.options.find((opt) => opt.id === optionId);
  return option ? option.label : optionId;
};

// Helper to get range definition
export const getFilterRange = (category, optionId) => {
  const categoryDef = FILTER_DEFINITIONS[category];
  if (!categoryDef) return null;

  const option = categoryDef.options.find((opt) => opt.id === optionId);
  if (option && option.min !== undefined && option.max !== undefined) {
    return { min: option.min, max: option.max };
  }
  return null;
};

// Default empty filter state
export const DEFAULT_FILTERS = {
  dietary: [],
  scoreRange: [],
  allergens: [],
  calorieRange: [],
};

// Validate filter object structure
export const validateFilters = (filters) => {
  if (!filters || typeof filters !== 'object') {
    return DEFAULT_FILTERS;
  }

  return {
    dietary: Array.isArray(filters.dietary) ? filters.dietary : [],
    scoreRange: Array.isArray(filters.scoreRange) ? filters.scoreRange : [],
    allergens: Array.isArray(filters.allergens) ? filters.allergens : [],
    calorieRange: Array.isArray(filters.calorieRange) ? filters.calorieRange : [],
  };
};
