/**
 * Nutrition Score Calculator
 *
 * Calculates a nutrition score (0-100) for food items based on:
 * - Negative factors: saturated fat, sodium, added sugar, trans fat
 * - Positive factors: fiber, protein, vitamins, minerals
 *
 * Score Ranges:
 * - 70-100 (Green): "Good" - Nutritious choice
 * - 40-69 (Yellow): "Fair" - Moderate nutrition
 * - 0-39 (Red): "Poor" - Consider healthier alternatives
 */

/**
 * Calculate nutrition score for a food item
 * @param {Object} nutrition - Nutrition information object
 * @param {number} nutrition.calories - Calories per serving
 * @param {number} nutrition.protein - Protein in grams
 * @param {number} nutrition.carbs - Total carbohydrates in grams
 * @param {number} nutrition.totalFat - Total fat in grams
 * @param {number} nutrition.saturatedFat - Saturated fat in grams
 * @param {number} nutrition.transFat - Trans fat in grams (optional)
 * @param {number} nutrition.sodium - Sodium in milligrams
 * @param {number} nutrition.sugar - Sugar in grams
 * @param {number} nutrition.fiber - Dietary fiber in grams (optional)
 * @returns {number} Score from 0-100
 */
export const calculateNutritionScore = (nutrition) => {
  if (!nutrition) return 0;

  let score = 50; // Start with neutral score

  // POSITIVE FACTORS (increase score)

  // Protein bonus (up to +20 points)
  // More protein is generally beneficial
  if (nutrition.protein) {
    if (nutrition.protein >= 20) score += 20;
    else if (nutrition.protein >= 15) score += 15;
    else if (nutrition.protein >= 10) score += 10;
    else if (nutrition.protein >= 5) score += 5;
  }

  // Fiber bonus (up to +15 points)
  // High fiber is very beneficial
  if (nutrition.fiber) {
    if (nutrition.fiber >= 8) score += 15;
    else if (nutrition.fiber >= 5) score += 10;
    else if (nutrition.fiber >= 3) score += 5;
  }

  // Low calorie bonus (up to +10 points)
  // Lower calories can be beneficial (but not always)
  if (nutrition.calories) {
    if (nutrition.calories <= 100) score += 10;
    else if (nutrition.calories <= 200) score += 5;
  }

  // NEGATIVE FACTORS (decrease score)

  // Saturated fat penalty (up to -15 points)
  if (nutrition.saturatedFat) {
    if (nutrition.saturatedFat >= 10) score -= 15;
    else if (nutrition.saturatedFat >= 7) score -= 10;
    else if (nutrition.saturatedFat >= 5) score -= 7;
    else if (nutrition.saturatedFat >= 3) score -= 3;
  }

  // Trans fat penalty (up to -20 points)
  // Trans fat is particularly harmful
  if (nutrition.transFat) {
    if (nutrition.transFat > 0.5) score -= 20;
    else if (nutrition.transFat > 0) score -= 10;
  }

  // Sodium penalty (up to -20 points)
  if (nutrition.sodium) {
    if (nutrition.sodium >= 800) score -= 20;
    else if (nutrition.sodium >= 600) score -= 15;
    else if (nutrition.sodium >= 400) score -= 10;
    else if (nutrition.sodium >= 200) score -= 5;
  }

  // Sugar penalty (up to -20 points)
  if (nutrition.sugar) {
    if (nutrition.sugar >= 25) score -= 20;
    else if (nutrition.sugar >= 20) score -= 15;
    else if (nutrition.sugar >= 15) score -= 10;
    else if (nutrition.sugar >= 10) score -= 5;
  }

  // High calorie penalty (only for very high calorie items)
  if (nutrition.calories && nutrition.calories >= 500) {
    score -= Math.min(15, Math.floor((nutrition.calories - 500) / 100) * 3);
  }

  // Ensure score is within 0-100 range
  return Math.max(0, Math.min(100, score));
};

/**
 * Get color code for nutrition score
 * @param {number} score - Nutrition score (0-100)
 * @returns {Object} Color information
 */
export const getScoreColor = (score) => {
  if (score >= 70) {
    return {
      label: 'Good',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      textColor: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      borderColor: 'border-green-500',
      circleColor: '#10b981' // green-500
    };
  } else if (score >= 40) {
    return {
      label: 'Fair',
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500',
      textColor: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      borderColor: 'border-yellow-500',
      circleColor: '#eab308' // yellow-500
    };
  } else {
    return {
      label: 'Poor',
      color: 'red',
      gradient: 'from-red-500 to-rose-500',
      textColor: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-900/20',
      borderColor: 'border-red-500',
      circleColor: '#ef4444' // red-500
    };
  }
};

export default calculateNutritionScore;
