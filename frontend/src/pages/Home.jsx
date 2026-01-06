import { Link } from "react-router-dom";
import { Camera, Brain, Shield, ArrowRight, Activity, CheckCircle2, Zap, Smartphone, ChevronRight, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";
import heroImg from "../assets/nutrivigile.jpeg";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.15 } }
};

function Home() {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDark ? "bg-[#0a0a0c]" : "bg-gray-50"}`}>

      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full blur-[120px] opacity-30 ${isDark ? "bg-blue-600" : "bg-blue-300"}`} />
        <div className={`absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 ${isDark ? "bg-purple-600" : "bg-purple-300"}`} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">

        {/* HERO SECTION */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">

          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6 text-sm font-semibold backdrop-blur-md shadow-sm"
              style={{
                borderColor: isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(37, 99, 235, 0.2)",
                backgroundColor: isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.8)",
                color: isDark ? "#60a5fa" : "#2563eb"
              }}
            >
              <Activity size={14} className="animate-pulse" />
              <span>AI-Powered Health Companion</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className={`text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] ${isDark ? "text-white" : "text-gray-900"}`}>
              Eat Smart. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                Live Healthy.
              </span>
            </motion.h1>

            <motion.p variants={fadeInUp} className={`text-lg lg:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              {t("tagline")}. Instantly analyze nutritional value and get personalized safety scores based on your health profile.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/scan"
                className={`group relative overflow-hidden rounded-xl px-8 py-4 font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl ${isDark ? "bg-blue-600 hover:bg-blue-500 shadow-blue-900/40" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {t("startScanning")}
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <button
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-semibold border transition-all hover:bg-opacity-10 ${isDark ? "border-gray-700 text-gray-300 hover:bg-white" : "border-gray-300 text-gray-700 hover:bg-black"}`}
              >
                How it Works
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeInUp} className="mt-10 flex items-center justify-center lg:justify-start gap-4 text-sm font-medium opacity-80">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold ${isDark ? "border-gray-900 bg-gray-800" : "border-white bg-gray-200"}`}>
                    U{i}
                  </div>
                ))}
              </div>
              <div className={isDark ? "text-gray-400" : "text-gray-600"}>
                Trusted by <span className={isDark ? "text-gray-200" : "text-gray-900"}>1,000+</span> health enthusiasts
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-opacity-50"
              style={{ borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)" }}>
              <img src={heroImg} alt="App Dashboard" className="w-full h-auto object-cover transform transition-transform hover:scale-105 duration-700" />

              {/* Floating Badge */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className={`absolute bottom-6 left-6 px-4 py-3 rounded-2xl flex items-center gap-3 shadow-lg backdrop-blur-md ${isDark ? "bg-black/60 text-white" : "bg-white/80 text-gray-900"}`}
              >
                <div className="bg-green-500 rounded-full p-1.5">
                  <CheckCircle2 size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-xs opacity-70">Safety Score</div>
                  <div className="font-bold">98/100</div>
                </div>
              </motion.div>
            </div>

            {/* Background Blob for Image */}
            <div className={`absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[2.5rem] -z-10 blur-xl opacity-30 animate-pulse`} />
          </motion.div>
        </div>


        {/* FEATURES GRID */}
        <motion.div
          id="features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-5xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
              Advanced Nutrition Intelligence
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDark ? "text-gray-400" : "text-gray-600"}`}>
              Everything you need to make safer, healthier food choices in seconds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <FeatureCard
              isDark={isDark}
              icon={<Camera className="text-purple-500" size={32} />}
              title={t("steps.upload.title")}
              desc={t("steps.upload.desc")}
              delay={0}
            />
            {/* Feature 2 */}
            <FeatureCard
              isDark={isDark}
              icon={<Brain className="text-blue-500" size={32} />}
              title={t("steps.analysis.title")}
              desc={t("steps.analysis.desc")}
              delay={0.1}
            />
            {/* Feature 3 */}
            <FeatureCard
              isDark={isDark}
              icon={<Shield className="text-emerald-500" size={32} />}
              title={t("steps.safety.title")}
              desc={t("steps.safety.desc")}
              delay={0.2}
            />
          </div>
        </motion.div>


        {/* WHY US SECTION */}
        <div className={`rounded-3xl p-10 md:p-16 relative overflow-hidden ${isDark ? "bg-gray-900" : "bg-white"} shadow-2xl`}>
          <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full pointer-events-none`} />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className={`text-3xl font-bold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}>
                Why Trust NutriVigil?
              </h3>
              <div className="space-y-6">
                <BenefitRow isDark={isDark} icon={<Zap size={20} />} text="Instant analysis results in < 2 seconds" />
                <BenefitRow isDark={isDark} icon={<Smartphone size={20} />} text="Works on any device, anywhere" />
                <BenefitRow isDark={isDark} icon={<Heart size={20} />} text="Tailored to your specific health conditions" />
                <BenefitRow isDark={isDark} icon={<Star size={20} />} text="Powered by advanced AI models" />
              </div>

              <div className="mt-8">
                <Link to="/profile" className={`text-blue-500 font-semibold hover:text-blue-400 inline-flex items-center gap-1`}>
                  Customize your profile <ChevronRight size={18} />
                </Link>
              </div>
            </div>

            <div className={`h-80 rounded-2xl flex items-center justify-center ${isDark ? "bg-gray-800" : "bg-gray-100"}`}>
              <div className="text-center">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-400 mb-2">
                  100%
                </div>
                <div className={isDark ? "text-gray-400" : "text-gray-600"}>
                  Focus on Your Health
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Home;
