import React, { useState, useEffect } from "react";
import {
  Zap,
  ArrowRight,
  Github,
  Sparkles,
  Scan,
  Brain,
  ShieldCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const HowItWorks = ({ isLight }) => {


   const { t } = useTranslation();

  const steps = [
    {
      icon: <Scan size={28} />,
      title: t("home.steps.scan.title"),
      desc: t("home.steps.scan.desc"),
    },
    {
      icon: <Brain size={28} />,
      title: t("home.steps.analysis.title"),
      desc: t("home.steps.analysis.desc"),
    },
    {
      icon: <ShieldCheck size={28} />,
      title: t("home.steps.security.title"),
      desc: t("home.steps.security.desc"),
    },
  ];
  

  return (
  <section className="relative z-10 max-w-7xl mx-auto px-6 py-32">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">
        {t("home.how.title")}{" "}
          <span className="text-indigo-500">{t("home.how.highlight")}</span>
      </h2>
      <p className="mt-6 text-xl max-w-2xl mx-auto text-slate-500">
         {t("home.how.subtitle")}
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.15 }}
          className={`rounded-3xl p-10 border backdrop-blur-xl transition-all hover:-translate-y-2 ${
            isLight
              ? "bg-white border-slate-200 shadow-xl"
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6">
            {step.icon}
          </div>
          <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
          <p className="text-lg text-slate-500">{step.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);
};





const Home = () => {
   const { t } = useTranslation();
  const [currentTheme, setCurrentTheme] = useState("dark");

  const navigate = useNavigate();

  useEffect(() => {
    const updateTheme = () => {
      const isDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark";
      setCurrentTheme(isDark ? "dark" : "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isLight = currentTheme === "light";

  return (
    <div
      className={`min-h-screen relative flex flex-col items-center justify-center px-6 overflow-hidden transition-colors duration-1000 ${
        isLight ? "bg-[#fcfdff] text-slate-900" : "bg-[#02020a] text-white"
      }`}
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-16 py-20 relative z-10">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center lg:text-left space-y-10"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border ${
              isLight
                ? "bg-indigo-50 border-indigo-100 text-indigo-600"
                : "bg-white/5 border-white/10 text-indigo-400"
            }`}
          >
            <Sparkles size={14} /> {t("home.badge")}
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
            Nutri
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-500 to-purple-500">
              Vigil
            </span>
          </h1>

          <p
            className={`text-xl md:text-2xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed ${
              isLight ? "text-slate-500" : "text-slate-400"
            }`}
          >
            {t("home.heroDesc")}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5">
            <button 
            onClick={() => navigate('/scan')}
              className={`group px-10 py-5 text-lg font-bold rounded-2xl transition-all flex items-center gap-3 shadow-2xl hover:scale-105 active:scale-95 ${
                isLight
                  ? "bg-indigo-600 text-white shadow-indigo-200"
                  : "bg-white text-black hover:bg-indigo-50 shadow-white/5"
              }`}
            >
              {t("home.startScanning")}{" "}
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>

            <button
              className={`px-10 py-5 text-lg font-bold rounded-2xl border transition-all flex items-center gap-2 hover:bg-current/5 ${
                isLight ? "border-slate-200 text-slate-800" : "border-white/10 text-white"
              }`}
            >
              <Github size={20} /> {t("home.openSource")}
            </button>
          </div>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 relative w-full flex justify-center lg:justify-end"
        >
          {/* Main Phone Mockup */}
          <div className="relative w-[300px] h-[550px] md:w-[350px] md:h-[600px]">
            <div
              className={`absolute inset-0 z-20 rounded-[3rem] border-[8px] overflow-hidden shadow-2xl transition-colors ${
                isLight ? "border-slate-900" : "border-slate-800"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                alt="App Interface"
                className="w-full h-full object-cover"
              />
            </div>
            <div
              className={`absolute -right-12 top-20 w-full h-full z-10 rounded-[3rem] border-4 opacity-40 transform rotate-12 transition-colors ${
                isLight ? "bg-white border-slate-100" : "bg-slate-900 border-white/5"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
                alt="Food & Nutrition"
                className="w-full h-full object-cover rounded-[2.5rem]"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl z-30 flex items-center justify-center text-white shadow-xl animate-bounce">
              <Zap size={40} fill="currentColor" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <HowItWorks isLight={isLight} />

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; -webkit-font-smoothing: antialiased; }
      `}} />
    </div>
  );
};

export default Home;
