import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import { User, Heart, Shield, Check, Info } from "lucide-react";
import { Check, Info, Lock, Sparkles } from "lucide-react";

const HEALTH_CONDITIONS = [
  { 
    id: "diabetes", 
    icon: "🩸", 
    gradient: { dark: "from-red-400 via-pink-400 to-rose-500", light: "from-red-500 via-pink-500 to-rose-600" }, 
    desc: "Blood sugar management",
    benefits: ["Low glycemic index foods", "Carb tracking", "Sugar alternatives"]
  },
  { 
    id: "hypertension", 
    icon: "💓", 
    gradient: { dark: "from-purple-400 via-fuchsia-400 to-pink-500", light: "from-purple-500 via-fuchsia-500 to-pink-600" }, 
    desc: "Blood pressure control",
    benefits: ["Low sodium options", "Heart-healthy fats", "Potassium-rich foods"]
  },
  { 
    id: "heart", 
    icon: "❤️", 
    gradient: { dark: "from-rose-400 via-red-400 to-pink-500", light: "from-rose-500 via-red-500 to-pink-600" }, 
    desc: "Cardiovascular health",
    benefits: ["Omega-3 rich foods", "Low cholesterol", "Anti-inflammatory"]
  },
  { 
    id: "kidney", 
    icon: "🫘", 
    gradient: { dark: "from-amber-400 via-yellow-400 to-orange-500", light: "from-amber-500 via-yellow-500 to-orange-600" }, 
    desc: "Renal function support",
    benefits: ["Low phosphorus", "Protein monitoring", "Fluid balance"]
  },
  { 
    id: "cholesterol", 
    icon: "🧈", 
    gradient: { dark: "from-yellow-400 via-amber-400 to-orange-500", light: "from-yellow-500 via-amber-500 to-orange-600" }, 
    desc: "Lipid management",
    benefits: ["HDL boosting foods", "Low saturated fats", "Fiber-rich options"]
  },
  { 
    id: "celiac", 
    icon: "🌾", 
    gradient: { dark: "from-lime-400 via-green-400 to-emerald-500", light: "from-lime-500 via-green-500 to-emerald-600" }, 
    desc: "Gluten-free diet",
    benefits: ["Gluten-free alternatives", "Safe grains", "Cross-contamination alerts"]
  },
  { 
    id: "lactose", 
    icon: "🥛", 
    gradient: { dark: "from-blue-400 via-cyan-400 to-sky-500", light: "from-blue-500 via-cyan-500 to-sky-600" }, 
    desc: "Dairy alternatives",
    benefits: ["Lactose-free options", "Plant-based milk", "Calcium alternatives"]
  },
  { 
    id: "none", 
    icon: "✨", 
    gradient: { dark: "from-emerald-400 via-teal-400 to-cyan-500", light: "from-emerald-500 via-teal-500 to-cyan-600" }, 
    desc: "General wellness",
    benefits: ["Balanced nutrition", "Macro tracking", "Healthy lifestyle tips"]
  },
];

const STORAGE_KEY = "nutriguard";

function Profile() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const isDark = theme === "dark";

  const [condition, setCondition] = useState("");
  const [saved, setSaved] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCondition = localStorage.getItem(STORAGE_KEY);
    if (savedCondition) setCondition(savedCondition);
  }, []);

  useEffect(() => {
    if (condition) {
      localStorage.setItem(STORAGE_KEY, condition);
      setSaved(true);
      const timer = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  const handleConditionSelect = (condId) => {
    setCondition(condId);
    setIsOpen(false);
  };

  const selectedCondition = HEALTH_CONDITIONS.find(c => c.id === condition);

  return (
    <div className="min-h-screen pt-28 pb-12 px-4 sm:px-6 flex justify-center">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`p-4 rounded-2xl shadow-lg ${theme === 'dark' ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-100"
            }`}>
            <User size={32} />
          </div>
          <div>
            <h1 className={`text-3xl font-bold ${theme === 'dark' ? "text-white" : "text-gray-900"
              }`}>
              {t("profile.title")}
            </h1>
            <p className={`text-sm mt-1 ${theme === 'dark' ? "text-gray-400" : "text-gray-500"
              }`}>
              {t("profile.subtitle")}
            </p>
          </div>
        </div>

        {/* Main Settings Card */}
        <div className={`rounded-3xl p-8 mb-6 shadow-xl backdrop-blur-sm border transition-all ${theme === 'dark'
            ? "bg-[#161625]/90 border-gray-800"
            : "bg-white border-gray-100"
          }`}>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="text-pink-500" size={24} />
            <h2 className={`text-xl font-semibold ${theme === 'dark' ? "text-white" : "text-gray-900"
              }`}>
              Health Profile
            </h2>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? "text-gray-300" : "text-gray-700"
                }`}>
                {t("profile.healthCondition")}
              </label>

              <div className="relative">
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className={`w-full appearance-none px-6 py-4 rounded-xl text-lg font-medium outline-none transition-all cursor-pointer border ${theme === 'dark'
                      ? "bg-[#0f0f1f] border-gray-700 text-white hover:border-blue-500 focus:border-blue-500"
                      : "bg-gray-50 border-gray-200 text-gray-900 hover:border-blue-500 focus:border-blue-500"
                    }`}
                >
                  <option value="" disabled>{t("profile.selectCondition")}</option>
                  {HEALTH_CONDITIONS.map((cond) => (
                    <option key={cond} value={cond} className={theme === 'dark' ? "bg-[#161625]" : ""}>
                      {t(`conditions.${cond}`)}
                    </option>
                  ))}
                </select>

                {/* Custom Chevron */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {saved && (
                  <motion.div
                    className="absolute -right-2 top-0 flex items-center gap-1.5 text-green-500 text-xs font-bold bg-green-500/10 px-3 py-1 rounded-full uppercase tracking-wider"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Check size={12} strokeWidth={3} />
                    {t("profile.saved")}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <p className={`text-sm flex gap-2 p-4 rounded-xl ${theme === 'dark' ? "bg-blue-900/20 text-blue-200" : "bg-blue-50 text-blue-700"
              }`}>
              <Info size={18} className="shrink-0 mt-0.5" />
              This information is stored locally on your device and is used solely to personalize your food analysis results.
            </p>
          </div>
        </div>

        {/* Why This Matters Card */}
        <motion.div
          className={`p-6 rounded-2xl border flex gap-5 ${theme === 'dark'
              ? "bg-[#161625]/50 border-gray-800"
              : "bg-white/60 border-gray-200"
            }`}
          whileHover={{ scale: 1.01 }}
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${theme === 'dark' ? "bg-gray-800 text-blue-400" : "bg-blue-50 text-blue-600"
            }`}>
            <Shield size={24} />
          </div>
          <div>
            <h3 className={`text-base font-semibold mb-1 ${theme === 'dark' ? "text-white" : "text-gray-900"
              }`}>
              {t("profile.whyTitle")}
            </h3>
            <p className={`text-sm leading-relaxed ${theme === 'dark' ? "text-gray-400" : "text-gray-600"
              }`}>
              {t("profile.whyDesc")}
            </p>
          </div>
        </motion.div>

    <div className={`relative min-h-screen pb-24 transition-colors duration-700 ${
      isDark 
        ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" 
        : "bg-gradient-to-b from-slate-50 via-white to-slate-50"
    }`}>
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
            isDark ? "bg-blue-500/10" : "bg-blue-400/20"
          }`}
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] ${
            isDark ? "bg-cyan-500/10" : "bg-cyan-400/20"
          }`}
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        {selectedCondition && (
          <motion.div
            className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[150px] bg-gradient-to-r ${
              selectedCondition.gradient[isDark ? "dark" : "light"]
            } ${isDark ? "opacity-10" : "opacity-15"}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isDark ? 0.1 : 0.15 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        )}
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Header Section */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                className={`absolute w-20 h-20 rounded-full blur-xl ${
                  isDark ? "bg-indigo-500/30" : "bg-indigo-400/30"
                }`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center ${
                isDark 
                  ? "bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30" 
                  : "bg-gradient-to-br from-indigo-100 to-purple-100 border border-indigo-300"
              }`}>
                <span className="text-5xl">🏥</span>
              </div>
            </motion.div>

            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 ${
              isDark
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300"
                : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
            } tracking-tight`}>
              {t("profile.title")}
            </h1>
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}>
              {t("profile.subtitle")}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Selector (Takes 2 columns on large screens) */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Main Selection Card */}
              <div className={`relative h-screen overflow-hidden backdrop-blur-xl rounded-3xl p-8 border transition-all duration-500 ${
                isDark
                  ? "bg-slate-900/50 border-white/10 shadow-2xl"
                  : "bg-white/80 border-gray-200 shadow-xl"
              }`}>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <label className={`text-sm font-bold tracking-wide uppercase flex items-center gap-2 ${
                      isDark ? "text-gray-200" : "text-gray-700"
                    }`}>
                      <Sparkles className={`w-4 h-4 ${isDark ? "text-indigo-400" : "text-indigo-600"}`} />
                      {t("profile.healthCondition")}
                    </label>
                    {selectedCondition && (
                      <motion.span 
                        className={`text-xs px-3 py-1 rounded-full ${
                          isDark 
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" 
                            : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                        }`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        Active
                      </motion.span>
                    )}
                  </div>

                  {/* Custom Dropdown Trigger */}
                  <div className="relative">
                    <motion.button
                      onClick={() => setIsOpen(!isOpen)}
                      className={`w-full px-6 py-6 rounded-2xl border text-left transition-all duration-300 flex items-center justify-between group ${
                        isDark
                          ? "bg-slate-800/50 border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800"
                          : "bg-white border-gray-300 hover:border-indigo-400 hover:shadow-lg"
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        {selectedCondition ? (
                          <>
                            <motion.span 
                              className="text-5xl"
                              animate={{ rotate: [0, -10, 10, 0] }}
                              transition={{ duration: 0.5 }}
                            >
                              {selectedCondition.icon}
                            </motion.span>
                            <div className="flex-1">
                              <p className={`font-bold text-xl mb-1 ${
                                isDark ? "text-white" : "text-gray-900"
                              }`}>
                                {t(`conditions.${selectedCondition.id}`)}
                              </p>
                              <p className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-500"
                              }`}>
                                {selectedCondition.desc}
                              </p>
                            </div>
                          </>
                        ) : (
                          <div className="flex items-center gap-4">
                            <span className="text-4xl">🔍</span>
                            <div>
                              <p className={`font-semibold ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                                {t("profile.selectCondition")}
                              </p>
                              <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                                Choose your primary health focus
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      <motion.svg
                        className={`w-6 h-6 transition-colors ${
                          isDark ? "text-gray-400 group-hover:text-indigo-400" : "text-gray-500 group-hover:text-indigo-600"
                        }`}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          className={`absolute z-50 w-full mt-3 rounded-2xl backdrop-blur-2xl border overflow-hidden ${
                            isDark
                              ? "bg-slate-900/98 border-slate-700 shadow-2xl"
                              : "bg-white/98 border-gray-200 shadow-2xl"
                          }`}
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="p-3 max-h-[450px] overflow-y-auto custom-scrollbar">
                            {HEALTH_CONDITIONS.map((cond, index) => (
                              <motion.button
                                key={cond.id}
                                onClick={() => handleConditionSelect(cond.id)}
                                className={`w-full px-6 py-4 rounded-xl text-left flex items-center gap-4 transition-all duration-200 mb-2 ${
                                  condition === cond.id
                                    ? `bg-gradient-to-r ${cond.gradient[isDark ? "dark" : "light"]} text-white shadow-lg`
                                    : isDark
                                    ? "text-gray-300 hover:bg-slate-800"
                                    : "text-gray-700 hover:bg-gray-50"
                                }`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.03 }}
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span className="text-4xl">{cond.icon}</span>
                                <div className="flex-1">
                                  <p className="font-bold text-base mb-0.5">{t(`conditions.${cond.id}`)}</p>
                                  <p className={`text-xs ${
                                    condition === cond.id ? "text-white/80" : isDark ? "text-gray-500" : "text-gray-500"
                                  }`}>
                                    {cond.desc}
                                  </p>
                                </div>
                                {condition === cond.id && (
                                  <motion.div
                                    className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                  >
                                    <Check className="w-5 h-5" />
                                  </motion.div>
                                )}
                              </motion.button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Success Message */}
                  <AnimatePresence>
                    {saved && condition && (
                      <motion.div
                        className={`px-6 py-4 rounded-xl border flex items-center gap-3 ${
                          isDark
                            ? "bg-emerald-500/10 border-emerald-500/30"
                            : "bg-emerald-50 border-emerald-300"
                        }`}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isDark ? "bg-emerald-500/20" : "bg-emerald-100"
                          }`}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 12 }}
                        >
                          <Check className={`w-5 h-5 ${isDark ? "text-emerald-300" : "text-emerald-700"}`} />
                        </motion.div>
                        <div className="flex-1">
                          <p className={`font-bold text-sm ${
                            isDark ? "text-emerald-300" : "text-emerald-700"
                          }`}>
                            {t("profile.saved")}
                          </p>
                          <p className={`text-xs ${isDark ? "text-emerald-400/70" : "text-emerald-600/70"}`}>
                            Your profile has been updated successfully
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Selected Condition Benefits */}
              <AnimatePresence mode="wait">
                {selectedCondition && (
                  <motion.div
                    key={selectedCondition.id}
                    className={`relative overflow-hidden rounded-3xl p-8 border bg-gradient-to-br ${
                      selectedCondition.gradient[isDark ? "dark" : "light"]
                    } text-white border-white/20`}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                    <div className="relative">
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-5xl">{selectedCondition.icon}</span>
                        <div>
                          <h3 className="text-2xl font-bold mb-1">
                            {t(`conditions.${selectedCondition.id}`)}
                          </h3>
                          <p className="text-sm text-white/80">{selectedCondition.desc}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <p className="font-semibold text-sm uppercase tracking-wide text-white/90">What you'll get:</p>
                        {selectedCondition.benefits.map((benefit, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                              <Check className="w-3 h-3" />
                            </div>
                            <p className="text-sm text-white/90">{benefit}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Right Column - Info Cards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {/* Why This Matters Card */}
              <div
                className={`relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 ${
                  isDark
                    ? "bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border-indigo-500/20"
                    : "bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-indigo-200"
                }`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl ${
                  isDark ? "bg-indigo-400/20" : "bg-indigo-300/30"
                }`} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isDark ? "bg-indigo-500/20" : "bg-indigo-100"
                    }`}>
                      <Info className={`w-5 h-5 ${isDark ? "text-indigo-300" : "text-indigo-600"}`} />
                    </div>
                    <h3 className={`text-lg font-bold ${
                      isDark ? "text-indigo-300" : "text-indigo-700"
                    }`}>
                      {t("profile.whyTitle")}
                    </h3>
                  </div>
                  <p className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {t("profile.whyDesc")}
                  </p>
                </div>
              </div>

              {/* Privacy & Security Card */}
              <div
                className={`relative overflow-hidden rounded-3xl p-6 border ${
                  isDark
                    ? "bg-slate-800/50 border-slate-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDark ? "bg-emerald-500/20" : "bg-emerald-100"
                  }`}>
                    <Lock className={`w-5 h-5 ${isDark ? "text-emerald-400" : "text-emerald-600"}`} />
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm mb-2 ${isDark ? "text-gray-200" : "text-gray-900"}`}>
                      Your Data is Secure
                    </h4>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      All health information is encrypted and stored locally on your device. We never share your personal data with third parties.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div
  className={`rounded-3xl p-6 border ${
    isDark
      ? "bg-slate-800/50 border-slate-700"
      : "bg-white border-gray-200"
  }`}
>
  <h4
    className={`font-semibold text-sm mb-4 ${
      isDark ? "text-gray-200" : "text-gray-900"
    }`}
  >
    Platform Highlights
  </h4>

  <div className="space-y-3">
    {[
      {
        label: "AI-Assisted Insights",
        value: "Automated analysis support"
      },
      {
        label: "Food Reference Data",
        value: "Extensive item coverage"
      },
      {
        label: "Result Confidence",
        value: "Continuously improved models"
      }
    ].map((stat, idx) => (
      <motion.div
        key={idx}
        className="flex items-center justify-between"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 + idx * 0.1 }}
      >
        <span
          className={`text-xs ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {stat.label}
        </span>

        <span
          className={`text-xs font-medium ${
            isDark ? "text-indigo-300" : "text-indigo-600"
          }`}
        >
          {stat.value}
        </span>
      </motion.div>
    ))}
  </div>
</div>

            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isDark ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.25)'};
        }
      `}</style>
    </div>
  );
}

export default Profile;
