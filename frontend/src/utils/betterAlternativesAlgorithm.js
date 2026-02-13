import { calculateNutritionScore } from './nutritionScore';

/**
 * Find better alternatives for a given food product
 *
 * Better alternatives are products that:
 * 1. Are in the same category
 * 2. Have a significantly better nutrition score
 * 3. Are comparable in type/purpose (same subcategory if available)
 * 4. Have lower amounts of unhealthy components (sugar, sodium, saturated fat)
 *
 * @param {Object} currentFood - The current food item
 * @param {Array} allFoods - All available foods in the category
 * @param {string} category - Category slug
 * @param {number} limit - Maximum number of alternatives to return
 * @returns {Array} Array of better alternative products with improvement data
 */
export function findBetterAlternatives(currentFood, allFoods, category, limit = 5) {
  if (!currentFood || !allFoods || allFoods.length === 0) {
    return [];
  }

  const currentScore = currentFood.nutrition ? calculateNutritionScore(currentFood.nutrition) : 0;
  const currentNutrition = currentFood.nutrition || {};

  // Filter out the current product and calculate alternatives
  const alternatives = allFoods
    .filter(food => {
      const sameCategory =
        !category ||
        food.category === category ||
        food.categorySlug === category ||
        (food.category && typeof food.category === 'object' && food.category.slug === category);

      return food.id !== currentFood.id && sameCategory;
    })
    .map(food => {
      const foodScore = food.nutrition ? calculateNutritionScore(food.nutrition) : 0;
      const foodNutrition = food.nutrition || {};

      // Calculate score improvement
      const scoreImprovement = foodScore - currentScore;

      // Only consider products with better nutrition scores (at least 10 points better)
      if (scoreImprovement < 10) {
        return null;
      }

      // Calculate improvements in key nutritional areas
      const improvements = calculateImprovements(currentNutrition, foodNutrition);

      // Calculate overall improvement score
      const improvementScore = calculateImprovementScore(
        scoreImprovement,
        improvements,
        currentFood,
        food
      );

      return {
        ...food,
        nutritionScore: foodScore,
        scoreImprovement,
        improvements,
        improvementScore
      };
    })
    .filter(alt => alt !== null) // Remove products that don't qualify
    .sort((a, b) => b.improvementScore - a.improvementScore) // Sort by improvement score
    .slice(0, limit);

  return alternatives;
}

/**
 * Calculate improvements in key nutritional areas
 */
function calculateImprovements(currentNutrition, alternativeNutrition) {
  const improvements = {};

  // Check sugar reduction
  const currentSugar = parseFloat(currentNutrition.sugars) || 0;
  const altSugar = parseFloat(alternativeNutrition.sugars) || 0;
  if (currentSugar > 5 && altSugar < currentSugar) {
    const reduction = ((currentSugar - altSugar) / currentSugar) * 100;
    if (reduction >= 20) {
      improvements.sugar = {
        label: 'Lower Sugar',
        reduction: `${reduction.toFixed(0)}% less`,
        current: `${currentSugar}g`,
        alternative: `${altSugar}g`
      };
    }
  }

  // Check sodium reduction
  const currentSodium = parseFloat(currentNutrition.sodium) || 0;
  const altSodium = parseFloat(alternativeNutrition.sodium) || 0;
  if (currentSodium > 200 && altSodium < currentSodium) {
    const reduction = ((currentSodium - altSodium) / currentSodium) * 100;
    if (reduction >= 20) {
      improvements.sodium = {
        label: 'Lower Sodium',
        reduction: `${reduction.toFixed(0)}% less`,
        current: `${currentSodium}mg`,
        alternative: `${altSodium}mg`
      };
    }
  }

  // Check saturated fat reduction
  const currentSatFat = parseFloat(currentNutrition.saturatedFat) || 0;
  const altSatFat = parseFloat(alternativeNutrition.saturatedFat) || 0;
  if (currentSatFat > 3 && altSatFat < currentSatFat) {
    const reduction = ((currentSatFat - altSatFat) / currentSatFat) * 100;
    if (reduction >= 20) {
      improvements.saturatedFat = {
        label: 'Lower Saturated Fat',
        reduction: `${reduction.toFixed(0)}% less`,
        current: `${currentSatFat}g`,
        alternative: `${altSatFat}g`
      };
    }
  }

  // Check protein increase
  const currentProtein = parseFloat(currentNutrition.protein) || 0;
  const altProtein = parseFloat(alternativeNutrition.protein) || 0;
  if (currentProtein < 10 && altProtein > currentProtein) {
    const increase = ((altProtein - currentProtein) / (currentProtein || 1)) * 100;
    if (increase >= 30) {
      improvements.protein = {
        label: 'Higher Protein',
        reduction: `${increase.toFixed(0)}% more`,
        current: `${currentProtein}g`,
        alternative: `${altProtein}g`
      };
    }
  }

  // Check fiber increase
  const currentFiber = parseFloat(currentNutrition.fiber) || 0;
  const altFiber = parseFloat(alternativeNutrition.fiber) || 0;
  if (currentFiber < 5 && altFiber > currentFiber) {
    const increase = ((altFiber - currentFiber) / (currentFiber || 1)) * 100;
    if (increase >= 30) {
      improvements.fiber = {
        label: 'Higher Fiber',
        reduction: `${increase.toFixed(0)}% more`,
        current: `${currentFiber}g`,
        alternative: `${altFiber}g`
      };
    }
  }

  // Check calorie reduction
  const currentCalories = parseFloat(currentNutrition.calories) || 0;
  const altCalories = parseFloat(alternativeNutrition.calories) || 0;
  if (currentCalories > 200 && altCalories < currentCalories) {
    const reduction = ((currentCalories - altCalories) / currentCalories) * 100;
    if (reduction >= 15) {
      improvements.calories = {
        label: 'Lower Calories',
        reduction: `${reduction.toFixed(0)}% less`,
        current: `${currentCalories} cal`,
        alternative: `${altCalories} cal`
      };
    }
  }

  return improvements;
}

/**
 * Calculate overall improvement score
 */
function calculateImprovementScore(scoreImprovement, improvements, currentFood, alternativeFood) {
  let score = scoreImprovement * 2; // Base score from nutrition score improvement

  // Add bonus points for each type of improvement
  score += Object.keys(improvements).length * 15;

  // Bonus for same brand (user might prefer to stick with brands they know)
  if (currentFood.brand && alternativeFood.brand === currentFood.brand) {
    score += 10;
  }

  // Bonus for similar dietary tags (vegan alternative to vegan, etc.)
  if (currentFood.dietary && alternativeFood.dietary) {
    const currentDietary = Object.keys(currentFood.dietary).filter(k => currentFood.dietary[k]);
    const altDietary = Object.keys(alternativeFood.dietary).filter(k => alternativeFood.dietary[k]);
    const commonTags = currentDietary.filter(tag => altDietary.includes(tag));
    score += commonTags.length * 5;
  }

  return score;
}

/**
 * Get a user-friendly message about why this is a better alternative
 */
export function getBetterAlternativeMessage(improvements, scoreImprovement) {
  const improvementCount = Object.keys(improvements).length;

  if (improvementCount === 0) {
    return `${scoreImprovement} points better nutrition score`;
  }

  const improvementTypes = Object.values(improvements)
    .map(imp => imp.label)
    .slice(0, 3); // Show max 3

  if (improvementCount <= 2) {
    return improvementTypes.join(' & ');
  }

  return `${improvementTypes.slice(0, 2).join(', ')} & ${improvementCount - 2} more`;
}
