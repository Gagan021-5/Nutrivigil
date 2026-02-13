import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NutritionFactsTable = ({ nutrition, servingSize }) => {
  const { theme } = useTheme();

  if (!nutrition) {
    return (
      <div className={`text-center py-8 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
      }`}>
        No nutrition information available
      </div>
    );
  }

  // Helper function to calculate % Daily Value
  // Based on FDA's 2,000 calorie reference diet
  const calculateDV = (nutrient, amount) => {
    const dailyValues = {
      totalFat: 78, // grams
      saturatedFat: 20, // grams
      cholesterol: 300, // mg
      sodium: 2300, // mg
      carbs: 275, // grams
      fiber: 28, // grams
      addedSugars: 50, // grams
      protein: 50, // grams
      vitaminD: 20, // mcg
      calcium: 1300, // mg
      iron: 18, // mg
      potassium: 4700, // mg
    };

    if (!dailyValues[nutrient] || !amount) return 0;
    return Math.round((amount / dailyValues[nutrient]) * 100);
  };

  // Extract nutrition values with fallbacks
  const {
    calories = 0,
    totalFat = 0,
    saturatedFat = 0,
    transFat = 0,
    cholesterol = 0,
    sodium = 0,
    carbs = 0,
    fiber = 0,
    sugar = 0,
    addedSugars = 0,
    protein = 0,
    vitaminD = 0,
    calcium = 0,
    iron = 0,
    potassium = 0,
  } = nutrition;

  return (
    <div className={`rounded-xl border-2 p-4 font-sans ${
      theme === 'dark'
        ? 'bg-white/5 border-white/20'
        : 'bg-white border-gray-900'
    }`}>
      {/* Header */}
      <div className={`border-b-8 pb-2 mb-2 ${
        theme === 'dark' ? 'border-white/30' : 'border-gray-900'
      }`}>
        <h3 className={`text-3xl font-black ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Nutrition Facts
        </h3>
      </div>

      {/* Serving Size */}
      <div className={`text-sm border-b-4 pb-2 mb-1 ${
        theme === 'dark' ? 'border-white/20 text-white' : 'border-gray-900 text-gray-900'
      }`}>
        <div className="font-bold">Serving size</div>
        <div className="font-bold text-base">{servingSize || 'N/A'}</div>
      </div>

      {/* Calories */}
      <div className={`border-b-8 py-2 mb-2 ${
        theme === 'dark' ? 'border-white/30' : 'border-gray-900'
      }`}>
        <div className="flex justify-between items-baseline">
          <span className={`text-2xl font-black ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Calories
          </span>
          <span className={`text-4xl font-black ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {calories}
          </span>
        </div>
      </div>

      {/* % Daily Value Header */}
      <div className={`text-xs text-right font-bold border-b-4 pb-1 mb-2 ${
        theme === 'dark' ? 'border-white/20 text-white' : 'border-gray-900 text-gray-900'
      }`}>
        % Daily Value*
      </div>

      {/* Nutrients List */}
      <div className="space-y-0">
        {/* Total Fat */}
        <NutrientRow
          label="Total Fat"
          amount={`${totalFat}g`}
          dv={calculateDV('totalFat', totalFat)}
          isBold={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Saturated Fat - Indented */}
        <NutrientRow
          label="Saturated Fat"
          amount={`${saturatedFat}g`}
          dv={calculateDV('saturatedFat', saturatedFat)}
          isIndented={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Trans Fat - Indented */}
        <NutrientRow
          label="Trans Fat"
          amount={`${transFat}g`}
          isIndented={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Cholesterol */}
        <NutrientRow
          label="Cholesterol"
          amount={`${cholesterol}mg`}
          dv={calculateDV('cholesterol', cholesterol)}
          isBold={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Sodium */}
        <NutrientRow
          label="Sodium"
          amount={`${sodium}mg`}
          dv={calculateDV('sodium', sodium)}
          isBold={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Total Carbohydrates */}
        <NutrientRow
          label="Total Carbohydrate"
          amount={`${carbs}g`}
          dv={calculateDV('carbs', carbs)}
          isBold={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Dietary Fiber - Indented */}
        <NutrientRow
          label="Dietary Fiber"
          amount={`${fiber}g`}
          dv={calculateDV('fiber', fiber)}
          isIndented={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Total Sugars - Indented */}
        <NutrientRow
          label="Total Sugars"
          amount={`${sugar}g`}
          isIndented={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Added Sugars - Double Indented */}
        <NutrientRow
          label="Includes Added Sugars"
          amount={`${addedSugars}g`}
          dv={calculateDV('addedSugars', addedSugars)}
          isDoubleIndented={true}
          hasBorder={true}
          theme={theme}
        />

        {/* Protein */}
        <NutrientRow
          label="Protein"
          amount={`${protein}g`}
          dv={calculateDV('protein', protein)}
          isBold={true}
          hasBorder={true}
          isThickBorder={true}
          theme={theme}
        />
      </div>

      {/* Vitamins and Minerals */}
      <div className={`mt-4 pt-4 space-y-2 border-t-8 ${
        theme === 'dark' ? 'border-white/30' : 'border-gray-900'
      }`}>
        <MicronutrientRow
          label="Vitamin D"
          amount={`${vitaminD}mcg`}
          dv={calculateDV('vitaminD', vitaminD)}
          theme={theme}
        />
        <MicronutrientRow
          label="Calcium"
          amount={`${calcium}mg`}
          dv={calculateDV('calcium', calcium)}
          theme={theme}
        />
        <MicronutrientRow
          label="Iron"
          amount={`${iron}mg`}
          dv={calculateDV('iron', iron)}
          theme={theme}
        />
        <MicronutrientRow
          label="Potassium"
          amount={`${potassium}mg`}
          dv={calculateDV('potassium', potassium)}
          theme={theme}
        />
      </div>

      {/* Footer Note */}
      <div className={`text-xs mt-4 pt-4 border-t-4 ${
        theme === 'dark' ? 'border-white/20 text-gray-400' : 'border-gray-900 text-gray-600'
      }`}>
        * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
        2,000 calories a day is used for general nutrition advice.
      </div>
    </div>
  );
};

// Sub-component for main nutrient rows
const NutrientRow = ({
  label,
  amount,
  dv,
  isBold = false,
  isIndented = false,
  isDoubleIndented = false,
  hasBorder = false,
  isThickBorder = false,
  theme
}) => {
  const paddingLeft = isDoubleIndented ? 'pl-8' : isIndented ? 'pl-4' : '';
  const fontWeight = isBold ? 'font-bold' : 'font-normal';
  const borderClass = hasBorder
    ? isThickBorder
      ? `border-b-8 ${theme === 'dark' ? 'border-white/30' : 'border-gray-900'}`
      : `border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-300'}`
    : '';

  return (
    <div className={`flex justify-between items-baseline py-1 text-sm ${paddingLeft} ${borderClass} ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <div className={fontWeight}>
        {label} <span className={fontWeight}>{amount}</span>
      </div>
      {dv !== undefined && dv !== null && (
        <div className={`${fontWeight} text-right`}>
          <span className="font-bold">{dv}%</span>
        </div>
      )}
    </div>
  );
};

// Sub-component for micronutrient rows (vitamins/minerals)
const MicronutrientRow = ({ label, amount, dv, theme }) => {
  return (
    <div className={`flex justify-between items-baseline text-sm ${
      theme === 'dark' ? 'text-white' : 'text-gray-900'
    }`}>
      <div>
        {label} {amount}
      </div>
      <div className="font-bold">{dv}%</div>
    </div>
  );
};

export default NutritionFactsTable;
