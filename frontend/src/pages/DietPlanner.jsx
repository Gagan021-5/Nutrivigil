import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Trash2, 
  Calculator, 
  Target, 
  Utensils, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; //

const DietPlanner = () => {
  const { theme } = useTheme(); // Correctly access the theme from context
  const isDark = theme === 'dark'; //

  // Initialize with Dummy Data for Frontend-only mode
  const [plan, setPlan] = useState({
    profile: {
      condition: "Weight Management",
      lastUpdated: new Date().toLocaleDateString()
    },
    dailyTargets: {
      calories: 2200,
      protein: 120,
      carbs: 250,
      fats: 70
    },
    meals: [
      { id: 1, foodName: "Oatmeal with Blueberries", type: "Breakfast", calories: 350, protein: 12, carbs: 60, fats: 8 },
      { id: 2, foodName: "Grilled Chicken Salad", type: "Lunch", calories: 550, protein: 45, carbs: 15, fats: 22 }
    ]
  });

  const [newMeal, setNewMeal] = useState({ foodName: '', type: 'Breakfast', calories: '', protein: '', carbs: '', fats: '' });

  // Calculation Logic
  const stats = useMemo(() => {
    const totals = plan.meals.reduce((acc, meal) => ({
      calories: acc.calories + (Number(meal.calories) || 0),
      protein: acc.protein + (Number(meal.protein) || 0),
      carbs: acc.carbs + (Number(meal.carbs) || 0),
      fats: acc.fats + (Number(meal.fats) || 0),
    }), { calories: 0, protein: 0, carbs: 0, fats: 0 });

    return {
      totals,
      remaining: Math.max(0, plan.dailyTargets.calories - totals.calories),
      percent: Math.min((totals.calories / plan.dailyTargets.calories) * 100, 100)
    };
  }, [plan]);

  const addMeal = () => {
    if (!newMeal.foodName || !newMeal.calories) return;
    const mealToAdd = { ...newMeal, id: Date.now(), calories: Number(newMeal.calories) };
    setPlan(prev => ({ ...prev, meals: [mealToAdd, ...prev.meals] }));
    setNewMeal({ foodName: '', type: 'Breakfast', calories: '', protein: '', carbs: '', fats: '' });
  };

  const removeMeal = (id) => setPlan(prev => ({ ...prev, meals: prev.meals.filter(m => m.id !== id) }));

  return (
    /* ✅ bg-transparent allows the global body gradients from index.css to show.
      ✅ Text color and layout adjust based on the 'isDark' boolean derived from theme context.
    */
    <div className={`min-h-screen bg-transparent transition-colors duration-300 p-4 md:p-10 pt-28 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      <div className="max-w-7xl mx-auto">
        
        {/* Dashboard Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">Smart Diet Planner</h1>
            <p className={`${isDark ? 'text-slate-400' : 'text-slate-500'} mt-1 flex items-center gap-2`}>
              <TrendingUp size={16} className="text-green-500" /> Goal: <span className="font-semibold italic">{plan.profile.condition}</span>
            </p>
          </div>
          <div className={`${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-200 shadow-sm'} backdrop-blur-md p-3 rounded-2xl border flex items-center gap-3 pr-6`}>
            <div className="bg-green-100 p-2 rounded-xl text-green-600"><CheckCircle2 size={24} /></div>
            <p className="text-sm font-bold tracking-tight">Personalized Targets Active</p>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Sidebar: Goals */}
          <div className="lg:col-span-4 space-y-6">
            <div className={`${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 shadow-xl'} backdrop-blur-md rounded-[2rem] p-8 border`}>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target className="text-indigo-500" /> Target Daily Macros
              </h2>
              <div className="space-y-4">
                {Object.entries(plan.dailyTargets).map(([key, val]) => (
                  <div key={key}>
                    <label className="text-[10px] font-black opacity-40 uppercase mb-1 block ml-1">{key}</label>
                    <input
                      type="number"
                      value={val}
                      onChange={(e) => setPlan(p => ({ ...p, dailyTargets: { ...p.dailyTargets, [key]: Number(e.target.value) } }))}
                      className={`w-full border-2 border-transparent focus:border-indigo-500 rounded-2xl p-4 outline-none font-bold transition-all ${isDark ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Panel: Planner */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Dynamic Progress Dashboard */}
            <div className={`${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 shadow-xl'} backdrop-blur-md rounded-[2rem] p-10 border relative overflow-hidden`}>
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full -rotate-90">
                      {/* Grey background circle */}
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className={isDark ? 'text-slate-700' : 'text-slate-100'} />
                      <motion.circle 
                        cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" 
                        strokeDasharray={440}
                        animate={{ strokeDashoffset: 440 - (440 * stats.percent) / 100 }}
                        className="text-green-500" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-black">{stats.percent.toFixed(0)}%</span>
                      <span className="text-[8px] font-bold opacity-40 uppercase">Consumed</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="opacity-40 font-bold uppercase tracking-widest text-xs mb-1">Calories Remaining</h3>
                    <p className="text-7xl font-black tracking-tighter">{stats.remaining}</p>
                    <p className="opacity-40 text-sm mt-2">Target: {plan.dailyTargets.calories} kcal</p>
                  </div>
               </div>
               <Calculator className="absolute top-0 right-0 p-8 opacity-5 text-current" size={160} />
            </div>

            {/* Quick Log Form */}
            <div className={`${isDark ? 'bg-indigo-900/20 border-indigo-500/30' : 'bg-indigo-50 border-indigo-100'} p-8 rounded-[2rem] border`}>
              <h2 className={`text-xl font-bold mb-6 flex items-center gap-2 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                <Utensils size={20} /> Add to Today's Plan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  placeholder="What are you eating?"
                  value={newMeal.foodName}
                  onChange={e => setNewMeal({...newMeal, foodName: e.target.value})}
                  className={`p-4 rounded-2xl outline-none border border-transparent focus:border-indigo-500 font-medium ${isDark ? 'bg-slate-900 text-white' : 'bg-white shadow-sm'}`}
                />
                <input
                  type="number"
                  placeholder="Kcal"
                  value={newMeal.calories}
                  onChange={e => setNewMeal({...newMeal, calories: e.target.value})}
                  className={`p-4 rounded-2xl outline-none border border-transparent focus:border-indigo-500 font-medium ${isDark ? 'bg-slate-900 text-white' : 'bg-white shadow-sm'}`}
                />
                <button onClick={addMeal} className="bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20">
                  <Plus size={20} /> Log Meal
                </button>
              </div>
            </div>

            {/* Timeline List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black ml-2">Today's Timeline</h2>
              <AnimatePresence initial={false}>
                {plan.meals.map((meal) => (
                  <motion.div
                    key={meal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`${isDark ? 'bg-slate-800/50 border-slate-700' : 'bg-white/80 border-slate-100 shadow-sm'} backdrop-blur-md p-6 rounded-3xl border flex items-center justify-between group hover:border-indigo-500/50 transition-all`}
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-black text-xl">
                        {meal.type ? meal.type[0] : 'M'}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold">{meal.foodName}</h4>
                        <span className="text-xs font-black text-green-500 uppercase">{meal.calories} kcal</span>
                      </div>
                    </div>
                    <button onClick={() => removeMeal(meal.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DietPlanner;