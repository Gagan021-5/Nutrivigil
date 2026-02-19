import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

/**
 * Flag thresholds for values that should show a warning colour.
 * Only "limit" nutrients are flagged — beneficial ones are always neutral.
 */
const WARN = {
  sodium:       { caution: 600,  danger: 1000 },   // mg
  totalFat:     { caution: 15,   danger: 25   },   // g
  saturatedFat: { caution: 5,    danger: 10   },   // g
  sugar:        { caution: 12,   danger: 20   },   // g
  cholesterol:  { caution: 100,  danger: 200  },   // mg
};

const getValColor = (key, rawVal, isDark) => {
  const t = key && WARN[key];
  const n = parseFloat(rawVal);
  if (!t || !n || n === 0) return isDark ? 'text-white' : 'text-gray-900';
  if (n >= t.danger)  return 'text-red-400';
  if (n >= t.caution) return 'text-orange-400';
  return isDark ? 'text-white' : 'text-gray-900';
};

// ─── NutritionFactsTable ────────────────────────────────────────────────────
const NutritionFactsTable = ({ nutrition, servingSize }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!nutrition) {
    return (
      <div className={`text-center py-4 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        No nutrition information available
      </div>
    );
  }

  const {
    calories     = 0,
    totalFat     = 0,
    saturatedFat = 0,
    transFat     = 0,
    cholesterol  = 0,
    sodium       = 0,
    carbs        = 0,
    fiber        = 0,
    sugar        = 0,
    addedSugars  = 0,
    protein      = 0,
    vitaminD     = 0,
    calcium      = 0,
    iron         = 0,
    potassium    = 0,
  } = nutrition;

  // 6 rows × 2 columns. Each cell: { label, value, key? }
  const rows = [
    [
      { label: 'Protein',     value: `${protein}g`,                      key: null           },
      { label: 'Carbs',       value: `${carbs}g`,                        key: null           },
    ],
    [
      { label: 'Sugar',       value: `${sugar}g`,                        key: 'sugar'        },
      { label: 'Fiber',       value: `${fiber}g`,                        key: null           },
    ],
    [
      { label: 'Total Fat',   value: `${totalFat}g`,                     key: 'totalFat'     },
      { label: 'Sat. Fat',    value: `${saturatedFat}g`,                 key: 'saturatedFat' },
    ],
    [
      { label: 'Cholesterol', value: `${cholesterol}mg`,                 key: 'cholesterol'  },
      { label: 'Sodium',      value: `${sodium}mg`,                      key: 'sodium'       },
    ],
    [
      { label: 'Calcium',     value: calcium    ? `${calcium}mg`    : '--', key: null        },
      { label: 'Iron',        value: iron       ? `${iron}mg`       : '--', key: null        },
    ],
    [
      { label: 'Vit. A/D',   value: vitaminD   ? `${vitaminD}mcg`  : '--', key: null        },
      { label: 'Potassium',   value: potassium  ? `${potassium}mg`  : '--', key: null        },
    ],
  ];

  /* ── colours ── */
  const labelCls   = isDark ? 'text-gray-400'         : 'text-gray-500';
  const rowDivider = isDark ? 'border-white/8'         : 'border-gray-100';
  const headerBg   = isDark ? 'bg-white/[0.06]'        : 'bg-white';
  const bodyBg     = isDark ? 'bg-white/[0.03]'        : 'bg-gray-50';
  const cardBorder = isDark ? 'border-white/[0.12]'    : 'border-gray-200';
  const calColor   = isDark ? 'text-white'             : 'text-gray-900';

  return (
    <div className={`rounded-2xl border overflow-hidden font-sans ${cardBorder}`}>

      {/* ── Header row: "Nutrition Facts" label + serving + calories ── */}
      <div className={`${headerBg} flex items-center justify-between px-4 py-2.5 border-b ${cardBorder}`}>
        <div className="flex flex-col">
          <span
            className={`text-xs font-black uppercase tracking-widest ${
              isDark ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            Nutrition Facts
          </span>
          {servingSize && (
            <span className={`text-xs mt-0.5 ${labelCls}`}>
              per serving · {servingSize}
            </span>
          )}
        </div>

        <div className="text-right leading-none">
          <span className={`font-black ${calColor}`} style={{ fontSize: '1.5rem' }}>
            {calories}
          </span>
          <span className={`text-xs ml-1 ${labelCls}`}>cal</span>
        </div>
      </div>

      {/* ── Nutrient grid ── */}
      <div className={`${bodyBg} px-4 py-2`}>
        {rows.map((pair, ri) => (
          <div
            key={ri}
            className={`grid grid-cols-2 gap-x-6 py-1 ${
              ri < rows.length - 1 ? `border-b ${rowDivider}` : ''
            }`}
          >
            {pair.map(({ label, value, key }) => (
              <div key={label} className="flex justify-between items-baseline min-w-0">
                <span className={`text-xs shrink-0 ${labelCls}`}>{label}</span>
                <span
                  className={`text-xs font-semibold ml-2 ${getValColor(key, value, isDark)}`}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        ))}

        {/* Added sugars as a compact footnote if non-zero */}
        {addedSugars > 0 && (
          <div className={`pt-1 mt-0.5 border-t ${rowDivider}`}>
            <span className={`text-xs ${labelCls}`}>
              Incl. Added Sugars&nbsp;
              <span className={`font-semibold ${getValColor('sugar', addedSugars, isDark)}`}>
                {addedSugars}g
              </span>
              {transFat > 0 && (
                <span className="ml-3">
                  Trans Fat&nbsp;
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {transFat}g
                  </span>
                </span>
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionFactsTable;
