import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { calculateNutritionScore } from '../utils/nutritionScore';

const HealthInsights = ({ nutrition, servingSize }) => {
  const { theme } = useTheme();

  if (!nutrition) {
    return null;
  }

  // Calculate nutrition score
  const score = calculateNutritionScore(nutrition);

  // Generate health insights based on nutrition data
  const generateInsights = () => {
    const pros = [];
    const cons = [];
    const recommendations = [];

    // Analyze protein
    if (nutrition.protein >= 10) {
      pros.push('High in protein');
    } else if (nutrition.protein >= 5) {
      pros.push('Good source of protein');
    }

    // Analyze fiber
    if (nutrition.fiber >= 5) {
      pros.push('Excellent source of fiber');
    } else if (nutrition.fiber >= 3) {
      pros.push('Good source of fiber');
    }

    // Analyze fats
    if (nutrition.totalFat <= 3) {
      pros.push('Low in fat');
    }

    if (nutrition.saturatedFat <= 1) {
      pros.push('Low in saturated fat');
    } else if (nutrition.saturatedFat >= 5) {
      cons.push('High in saturated fat');
    }

    if (nutrition.transFat > 0) {
      cons.push('Contains trans fats');
    }

    // Analyze sodium
    if (nutrition.sodium <= 140) {
      pros.push('Low in sodium');
    } else if (nutrition.sodium >= 400) {
      cons.push('High in sodium');
    }

    // Analyze sugar
    if (nutrition.sugar >= 15) {
      cons.push('High in sugar');
    }

    if (nutrition.addedSugars && nutrition.addedSugars > 0) {
      cons.push('Contains added sugars');
    }

    // Analyze calories
    if (nutrition.calories <= 100) {
      pros.push('Low in calories');
    } else if (nutrition.calories >= 400) {
      cons.push('High in calories');
    }

    // Generate recommendations
    if (nutrition.sodium >= 400) {
      recommendations.push('Consider pairing with low-sodium foods');
    }

    if (nutrition.sugar >= 15) {
      recommendations.push('Best consumed in moderation');
    }

    if (nutrition.protein < 5 && nutrition.carbs > 30) {
      recommendations.push('Pair with protein-rich foods for balanced nutrition');
    }

    if (nutrition.fiber < 3) {
      recommendations.push('Add vegetables or whole grains to increase fiber');
    }

    if (score >= 70) {
      recommendations.push('Great choice for a balanced diet');
    }

    return { pros, cons, recommendations };
  };

  const { pros, cons, recommendations } = generateInsights();

  // Get score details (aligned with shared nutrition score bands: Good/Fair/Poor with 70/40 cutoffs)
  const getScoreDetails = () => {
    if (score >= 70) {
      return {
        label: 'Good',
        color: theme === 'dark' ? 'text-green-400' : 'text-green-600',
        bgColor: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100',
        borderColor: theme === 'dark' ? 'border-green-500/50' : 'border-green-300',
      };
    } else if (score >= 40) {
      return {
        label: 'Fair',
        color: theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600',
        bgColor: theme === 'dark' ? 'bg-yellow-500/20' : 'bg-yellow-100',
        borderColor: theme === 'dark' ? 'border-yellow-500/50' : 'border-yellow-300',
      };
    } else {
      return {
        label: 'Poor',
        color: theme === 'dark' ? 'text-red-400' : 'text-red-600',
        bgColor: theme === 'dark' ? 'bg-red-500/20' : 'bg-red-100',
        borderColor: theme === 'dark' ? 'border-red-500/50' : 'border-red-300',
      };
    }
  };

  const scoreDetails = getScoreDetails();

  return (
    <div className="space-y-6">
      {/* Overall Nutrition Score */}
      <div className={`rounded-xl p-6 border-2 ${scoreDetails.bgColor} ${scoreDetails.borderColor}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Overall Nutrition Score
            </h3>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Based on nutritional content analysis
            </p>
          </div>

          {/* Animated Circle */}
          <div className="relative w-24 h-24">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={scoreDetails.color.replace('text-', '')}
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 251.2} 251.2`}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  stroke: score >= 80 ? '#4ade80' : score >= 60 ? '#facc15' : score >= 40 ? '#fb923c' : '#f87171'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-2xl font-black ${scoreDetails.color}`}>
                {score}
              </span>
              <span className={`text-xs font-bold ${scoreDetails.color}`}>
                {scoreDetails.label}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pros Section */}
      {pros.length > 0 && (
        <div className={`rounded-xl p-5 ${
          theme === 'dark' ? 'bg-green-500/10 border border-green-500/30' : 'bg-green-50 border border-green-200'
        }`}>
          <h4 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-700'
          }`}>
            <CheckCircle className="w-5 h-5" />
            Health Benefits
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={index} className={`flex items-start gap-2 text-sm ${
                theme === 'dark' ? 'text-green-300' : 'text-green-800'
              }`}>
                <span className="mt-1">✅</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cons Section */}
      {cons.length > 0 && (
        <div className={`rounded-xl p-5 ${
          theme === 'dark' ? 'bg-orange-500/10 border border-orange-500/30' : 'bg-orange-50 border border-orange-200'
        }`}>
          <h4 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
            theme === 'dark' ? 'text-orange-400' : 'text-orange-700'
          }`}>
            <AlertTriangle className="w-5 h-5" />
            Watch Out For
          </h4>
          <ul className="space-y-2">
            {cons.map((con, index) => (
              <li key={index} className={`flex items-start gap-2 text-sm ${
                theme === 'dark' ? 'text-orange-300' : 'text-orange-800'
              }`}>
                <span className="mt-1">⚠️</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className={`rounded-xl p-5 ${
          theme === 'dark' ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-blue-50 border border-blue-200'
        }`}>
          <h4 className={`text-lg font-bold mb-3 flex items-center gap-2 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-700'
          }`}>
            <Lightbulb className="w-5 h-5" />
            Recommendations
          </h4>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className={`flex items-start gap-2 text-sm ${
                theme === 'dark' ? 'text-blue-300' : 'text-blue-800'
              }`}>
                <span className="mt-1">💡</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HealthInsights;
