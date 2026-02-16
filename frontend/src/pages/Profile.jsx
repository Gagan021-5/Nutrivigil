import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { Check, Info, Lock, Sparkles, Search, X, ChevronDown } from "lucide-react";

const HEALTH_CONDITIONS = [
  { id: "diabetes", icon: "🩸", category: "metabolic", gradient: { dark: "from-red-400 to-rose-500", light: "from-red-500 to-rose-600" }, descKey: "health.desc.diabetes", benefitKeys: ["health.benefits.diabetes.lowGlycemic", "health.benefits.diabetes.carbTracking", "health.benefits.diabetes.sugarAlternatives"] },
  { id: "hypertension", icon: "💓", category: "cardiac", gradient: { dark: "from-purple-400 to-pink-500", light: "from-purple-500 to-pink-600" }, descKey: "health.desc.hypertension", benefitKeys: ["health.benefits.hypertension.lowSodium", "health.benefits.hypertension.heartHealthyFats", "health.benefits.hypertension.potassiumRichFoods"] },
  { id: "heart", icon: "❤️", category: "cardiac", gradient: { dark: "from-rose-400 to-pink-500", light: "from-rose-500 to-pink-600" }, descKey: "health.desc.heart", benefitKeys: ["health.benefits.heart.omega3RichFoods", "health.benefits.heart.lowCholesterol", "health.benefits.heart.antiInflammatory"] },
  { id: "kidney", icon: "🫘", category: "specialized", gradient: { dark: "from-amber-400 to-orange-500", light: "from-amber-500 to-orange-600" }, descKey: "health.desc.kidney", benefitKeys: ["health.benefits.kidney.lowPhosphorus", "health.benefits.kidney.proteinMonitoring", "health.benefits.kidney.fluidBalance"] },
  { id: "cholesterol", icon: "🧈", category: "cardiac", gradient: { dark: "from-yellow-400 to-orange-500", light: "from-yellow-500 to-orange-600" }, descKey: "health.desc.cholesterol", benefitKeys: ["health.benefits.cholesterol.hdlBoostingFoods", "health.benefits.cholesterol.lowSaturatedFats", "health.benefits.cholesterol.fiberRichOptions"] },
  { id: "celiac", icon: "🌾", category: "digestive", gradient: { dark: "from-lime-400 to-emerald-500", light: "from-lime-500 to-emerald-600" }, descKey: "health.desc.celiac", benefitKeys: ["health.benefits.celiac.glutenFreeAlternatives", "health.benefits.celiac.safeGrains", "health.benefits.celiac.crossContaminationAlerts"] },
  { id: "lactose", icon: "🥛", category: "digestive", gradient: { dark: "from-blue-400 to-sky-500", light: "from-blue-500 to-sky-600" }, descKey: "health.desc.lactose", benefitKeys: ["health.benefits.lactose.lactoseFreeOptions", "health.benefits.lactose.plantBasedMilk", "health.benefits.lactose.calciumAlternatives"] },
  { id: "none", icon: "✨", category: "life", gradient: { dark: "from-emerald-400 to-cyan-500", light: "from-emerald-500 to-cyan-600" }, descKey: "health.desc.none", benefitKeys: ["health.benefits.none.balancedNutrition", "health.benefits.none.macroTracking", "health.benefits.none.healthyLifestyleTips"] }
];

const STORAGE_KEY = "nutriguard_v2";

function Profile() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    setSelectedIds(Array.isArray(savedData) ? savedData : []);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
    if (selectedIds.length > 0) {
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedIds]);

  const toggleCondition = (id) => {
    if (id === "none") return setSelectedIds(["none"]);
    setSelectedIds(prev => {
      const filtered = prev.filter(i => i !== "none");
      if (filtered.includes(id)) {
        return filtered.filter(item => item !== id);
      } else {
        if (filtered.length >= 3) return filtered;
        return [...filtered, id];
      }
    });
  };

  const groupedConditions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = HEALTH_CONDITIONS.filter(c => t(`conditions.${c.id}`).toLowerCase().includes(query));
    const groups = {};
    filtered.forEach(c => {
      if (!groups[c.category]) groups[c.category] = [];
      groups[c.category].push(c);
    });
    return groups;
  }, [searchQuery, t]);

  const activeConditions = HEALTH_CONDITIONS.filter(c => selectedIds.includes(c.id));
  const primaryCond = activeConditions.find(c => c.id !== "none") || activeConditions[0];

  const stats = [
    { labelKey: "profile.stats.insights.label", valueKey: "profile.stats.insights.value" },
    { labelKey: "profile.stats.foodData.label", valueKey: "profile.stats.foodData.value" },
    { labelKey: "profile.stats.confidence.label", valueKey: "profile.stats.confidence.value" }
  ];

  return (
    <div className={`relative min-h-screen pb-24 transition-colors duration-700 ${isDark ? "bg-slate-950" : "bg-slate-50"}`}>
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${isDark ? "bg-blue-500/10" : "bg-blue-400/20"}`} animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity }} />
        {primaryCond && (
          <motion.div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-r ${primaryCond.gradient[isDark ? "dark" : "light"]} opacity-10`} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1.5 }} />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}>
          <header className="text-center mb-16">
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>{t("profile.title")}</h1>
            <p className={`text-lg max-w-2xl mx-auto ${isDark ? "text-slate-400" : "text-slate-500"}`}>{t("profile.subtitle")}</p>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* FIXED: Added z-40 and relative to ensure dropdown is visible above other cards */}
              <div className={`relative z-40 backdrop-blur-xl rounded-[2.5rem] p-8 border ${isDark ? "bg-slate-900/50 border-white/10" : "bg-white border-slate-200 shadow-2xl"}`}>
                <div className="flex items-center justify-between mb-8">
                  <span className="flex items-center gap-2 font-bold uppercase text-xs tracking-[0.2em] text-indigo-500">
                    <Sparkles className="w-4 h-4" /> {t("profile.healthCondition")}
                  </span>
                  <AnimatePresence>
                    {saved && (
                      <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-emerald-500 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3" /> {t("profile.saved")}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>

                <div className="relative">
                  <div 
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full min-h-[80px] p-4 rounded-3xl border cursor-pointer flex flex-wrap gap-2 items-center transition-all ${isDark ? "bg-slate-800/50 border-slate-700 hover:border-indigo-500/50" : "bg-slate-100/50 border-slate-200 hover:border-indigo-300"}`}
                  >
                    {selectedIds.length === 0 ? (
                      <span className="text-slate-500 ml-2">{t("profile.selectCondition")}</span>
                    ) : (
                      activeConditions.map(c => (
                        <motion.span layoutId={c.id} key={c.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r ${c.gradient[isDark ? "dark" : "light"]} text-white shadow-lg`}>
                          {c.icon} {t(`conditions.${c.id}`)}
                          <X className="w-3.5 h-3.5 cursor-pointer hover:scale-125" onClick={(e) => { e.stopPropagation(); toggleCondition(c.id); }} />
                        </motion.span>
                      ))
                    )}
                    <ChevronDown className={`ml-auto w-5 h-5 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className={`absolute z-50 w-full mt-3 p-5 rounded-3xl border shadow-2xl backdrop-blur-2xl ${isDark ? "bg-slate-900 border-slate-700 shadow-slate-950/50" : "bg-white border-slate-200 shadow-slate-200/50"}`}>
                        <div className="relative mb-6">
                          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                          <input autoFocus placeholder={t("profile.searchPlaceholder")} className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all ${isDark ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                        <div className="max-h-[350px] overflow-y-auto space-y-6 pr-2 custom-scrollbar">
                          {Object.entries(groupedConditions).map(([cat, items]) => (
                            <div key={cat} className="space-y-3">
                              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 px-2">{t(`profile.categories.${cat}`)}</h3>
                              <div className="grid sm:grid-cols-2 gap-2">
                                {items.map(cond => (
                                  <button key={cond.id} onClick={() => toggleCondition(cond.id)} className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${selectedIds.includes(cond.id) ? `bg-gradient-to-r ${cond.gradient[isDark ? 'dark' : 'light']} text-white border-transparent` : isDark ? "hover:bg-slate-800 border-slate-800 text-slate-300" : "hover:bg-slate-50 border-slate-100 text-slate-700"}`}>
                                    <span className="text-2xl">{cond.icon}</span>
                                    <div className="flex-1">
                                      <p className="font-bold text-sm">{t(`conditions.${cond.id}`)}</p>
                                      <p className={`text-[10px] opacity-70 ${selectedIds.includes(cond.id) ? "text-white" : ""}`}>{t(cond.descKey)}</p>
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Dynamic Benefit Cards */}
              <AnimatePresence mode="popLayout">
                {activeConditions.filter(c => c.id !== "none").map(cond => (
                  <motion.div key={cond.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className={`relative z-10 overflow-hidden rounded-[2.5rem] p-8 border bg-gradient-to-br ${cond.gradient[isDark ? "dark" : "light"]} text-white shadow-xl`}>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-5xl">{cond.icon}</span>
                      <div>
                        <h3 className="text-2xl font-bold">{t(`conditions.${cond.id}`)}</h3>
                        <p className="text-sm text-white/80">{t(cond.descKey)}</p>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {cond.benefitKeys.map(k => (
                        <div key={k} className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                          <Check className="w-4 h-4 shrink-0" />
                          <p className="text-sm font-medium">{t(k)}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Column Sidebars */}
            <div className="space-y-6">
              <div className={`p-8 rounded-[2rem] border ${isDark ? "bg-slate-900/30 border-white/5" : "bg-white border-slate-100 shadow-sm"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-indigo-500/20" : "bg-indigo-100"}`}>
                    <Info className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h3 className="font-bold">{t("profile.whyTitle")}</h3>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">{t("profile.whyDesc")}</p>
              </div>

              <div className={`p-8 rounded-[2rem] border ${isDark ? "bg-slate-900/30 border-white/5" : "bg-white border-slate-100 shadow-sm"}`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? "bg-emerald-500/20" : "bg-emerald-100"}`}>
                    <Lock className="w-5 h-5 text-emerald-500" />
                  </div>
                  <h3 className="font-bold">{t("profile.securityTitle")}</h3>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">{t("profile.securityDesc")}</p>
              </div>

              <div className={`p-8 rounded-[2rem] border ${isDark ? "bg-slate-900/30 border-white/5" : "bg-white border-slate-100 shadow-sm"}`}>
                <h4 className="font-bold text-sm mb-6 uppercase tracking-widest text-slate-500">{t("profile.platformHighlights")}</h4>
                <div className="space-y-4">
                  {stats.map(stat => (
                    <div key={stat.labelKey} className="flex justify-between items-center text-xs">
                      <span className="opacity-60">{t(stat.labelKey)}</span>
                      <span className="font-bold text-indigo-500">{t(stat.valueKey)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { 
          background: ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}; 
          border-radius: 10px; 
        }
      `}</style>
    </div>
  );
}

export default Profile;
