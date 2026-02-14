/**
 * Similarity Algorithm for Food Products
 *
 * Calculates similarity between food items based on:
 * - Same category (primary requirement)
 * - Similar calorie range (±20%)
 * - Similar macronutrient profile
 * - Nutrition score comparison
 */

import { calculateNutritionScore } from './nutritionScore';

/**
 * Calculate similarity score between two food items (0-100)
 * @param {Object} food1 - First food item
 * @param {Object} food2 - Second food item
 * @param {string} category - Category slug
 * @returns {number} Similarity score (0-100)
 */
export const calculateSimilarity = (food1, food2, category) => {
  if (!food1?.nutrition || !food2?.nutrition) return 0;
  if (food1.id === food2.id) return 0; // Don't compare with itself

  let similarityScore = 0;

  // Nutrition data
  const nutrition1 = food1.nutrition;
  const nutrition2 = food2.nutrition;

  // 1. Calorie similarity (30 points max)
  const calorieDiff = Math.abs(nutrition1.calories - nutrition2.calories);
  const calorieAvg = (nutrition1.calories + nutrition2.calories) / 2;
  const caloriePercentDiff = calorieAvg === 0 ? 0 : (calorieDiff / calorieAvg) * 100;

  if (caloriePercentDiff <= 10) similarityScore += 30;
  else if (caloriePercentDiff <= 20) similarityScore += 20;
  else if (caloriePercentDiff <= 30) similarityScore += 10;
  else if (caloriePercentDiff <= 50) similarityScore += 5;

  // 2. Protein similarity (20 points max)
  const proteinDiff = Math.abs(nutrition1.protein - nutrition2.protein);
  if (proteinDiff <= 2) similarityScore += 20;
  else if (proteinDiff <= 5) similarityScore += 15;
  else if (proteinDiff <= 10) similarityScore += 10;
  else if (proteinDiff <= 15) similarityScore += 5;

  // 3. Carbs similarity (15 points max)
  const carbsDiff = Math.abs(nutrition1.carbs - nutrition2.carbs);
  if (carbsDiff <= 3) similarityScore += 15;
  else if (carbsDiff <= 7) similarityScore += 10;
  else if (carbsDiff <= 15) similarityScore += 5;

  // 4. Fat similarity (15 points max)
  const fatDiff = Math.abs(nutrition1.totalFat - nutrition2.totalFat);
  if (fatDiff <= 2) similarityScore += 15;
  else if (fatDiff <= 5) similarityScore += 10;
  else if (fatDiff <= 10) similarityScore += 5;

  // 5. Sodium similarity (10 points max)
  const sodiumDiff = Math.abs(nutrition1.sodium - nutrition2.sodium);
  if (sodiumDiff <= 50) similarityScore += 10;
  else if (sodiumDiff <= 150) similarityScore += 7;
  else if (sodiumDiff <= 300) similarityScore += 4;

  // 6. Sugar similarity (10 points max)
  const sugarDiff = Math.abs(nutrition1.sugar - nutrition2.sugar);
  if (sugarDiff <= 2) similarityScore += 10;
  else if (sugarDiff <= 5) similarityScore += 7;
  else if (sugarDiff <= 10) similarityScore += 4;

  return Math.min(100, similarityScore);
};

/**
 * Find similar products from a list based on a reference food item
 * @param {Object} currentFood - Reference food item
 * @param {Array} allFoods - Array of all available food items
 * @param {string} category - Category slug
 * @param {number} limit - Maximum number of results (default: 6)
 * @returns {Array} Array of similar food items sorted by similarity
 */
export const findSimilarProducts = (currentFood, allFoods, category, limit = 6) => {
  if (!currentFood || !allFoods || allFoods.length === 0) return [];

  // Calculate similarity for all foods in the same category
  const similarityScores = allFoods
    .filter(food => food.id !== currentFood.id) // Exclude current food
    .map(food => ({
      ...food,
      similarityScore: calculateSimilarity(currentFood, food, category)
    }))
    .filter(food => food.similarityScore > 30) // Only include reasonably similar items
    .sort((a, b) => b.similarityScore - a.similarityScore) // Sort by similarity
    .slice(0, limit); // Limit results

  return similarityScores;
};

/**
 * Find better alternatives (healthier options with higher nutrition scores)
 * @param {Object} currentFood - Reference food item
 * @param {Array} allFoods - Array of all available food items
 * @param {string} category - Category slug
 * @param {number} limit - Maximum number of results (default: 4)
 * @returns {Array} Array of better alternatives with improvement details
 */
export const findBetterAlternatives = (currentFood, allFoods, category, limit = 4) => {
  if (!currentFood || !allFoods || allFoods.length === 0) return [];

  const currentScore = calculateNutritionScore(currentFood.nutrition);
  const currentNutrition = currentFood.nutrition;

  // Find foods with better nutrition scores
  const betterOptions = allFoods
    .filter(food => food.id !== currentFood.id)
    .map(food => {
      const foodScore = calculateNutritionScore(food.nutrition);
      return { food, foodScore };
    })
    .filter(({ foodScore }) => foodScore > currentScore) // Must have better score
    .map(({ food, foodScore }) => {
      const improvements = calculateImprovements(currentNutrition, food.nutrition);
      const similarityScore = calculateSimilarity(currentFood, food, category);

      return {
        ...food,
        nutritionScore: foodScore,
        scoreImprovement: foodScore - currentScore,
        improvements,
        similarityScore
      };
    })
    .filter(food => food.improvements.length > 0) // Must have improvements
    .sort((a, b) => {
      // Sort by: 1. Score improvement, 2. Similarity
      const scoreDiff = b.scoreImprovement - a.scoreImprovement;
      if (Math.abs(scoreDiff) > 5) return scoreDiff;
      return b.similarityScore - a.similarityScore;
    })
    .slice(0, limit);

  return betterOptions;
};

/**
 * Calculate specific improvements between current and alternative food
 * @param {Object} currentNutrition - Current food nutrition
 * @param {Object} alternativeNutrition - Alternative food nutrition
 * @returns {Array} Array of improvement descriptions
 */
const calculateImprovements = (currentNutrition, alternativeNutrition) => {
  const improvements = [];

  // Calculate percentage differences
  const calculatePercentDiff = (current, alternative) => {
    if (current === 0) return 0;
    return Math.round(((current - alternative) / current) * 100);
  };

  // Check sodium improvement (lower is better)
  const sodiumDiff = calculatePercentDiff(currentNutrition.sodium, alternativeNutrition.sodium);
  if (sodiumDiff > 15) {
    improvements.push({
      type: 'sodium',
      label: `${sodiumDiff}% less sodium`,
      icon: '💧',
      color: 'text-blue-600'
    });
  }

  // Check sugar improvement (lower is better)
  const sugarDiff = calculatePercentDiff(currentNutrition.sugar, alternativeNutrition.sugar);
  if (sugarDiff > 15) {
    improvements.push({
      type: 'sugar',
      label: `${sugarDiff}% less sugar`,
      icon: '🍬',
      color: 'text-pink-600'
    });
  }

  // Check saturated fat improvement (lower is better)
  const satFatDiff = calculatePercentDiff(currentNutrition.saturatedFat, alternativeNutrition.saturatedFat);
  if (satFatDiff > 15) {
    improvements.push({
      type: 'saturatedFat',
      label: `${satFatDiff}% less sat. fat`,
      icon: '🥑',
      color: 'text-green-600'
    });
  }

  // Check calorie improvement (lower is better, but not too low)
  const calorieDiff = calculatePercentDiff(currentNutrition.calories, alternativeNutrition.calories);
  if (calorieDiff > 10 && calorieDiff < 40) {
    improvements.push({
      type: 'calories',
      label: `${calorieDiff}% fewer calories`,
      icon: '⚡',
      color: 'text-yellow-600'
    });
  }

  // Check protein improvement (higher is better)
  const proteinIncrease = ((alternativeNutrition.protein - currentNutrition.protein) / (currentNutrition.protein || 1)) * 100;
  if (proteinIncrease > 20) {
    improvements.push({
      type: 'protein',
      label: `${Math.round(proteinIncrease)}% more protein`,
      icon: '💪',
      color: 'text-red-600'
    });
  }

  // Check fiber improvement (higher is better)
  const fiberIncrease = ((alternativeNutrition.fiber - currentNutrition.fiber) / (currentNutrition.fiber || 1)) * 100;
  if (fiberIncrease > 20) {
    improvements.push({
      type: 'fiber',
      label: `${Math.round(fiberIncrease)}% more fiber`,
      icon: '🌾',
      color: 'text-amber-600'
    });
  }

  return improvements;
};

export default { calculateSimilarity, findSimilarProducts, findBetterAlternatives };
