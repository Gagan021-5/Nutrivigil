import { Link } from "react-router-dom";
import { Camera, Brain, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

function Home() {
  const { theme } = useTheme();
  const staggerParent = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const stepCard = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, y: -5, transition: { duration: 0.25 } },
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center py-12 px-5 relative">
      <motion.div
        className="text-center max-w-[600px] mb-20"
        initial="hidden"
        animate="visible"
        variants={staggerParent}
      >
        <motion.h1
          className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-4 flex flex-wrap justify-center drop-shadow-xl transition-colors ${
            theme === 'dark' ? "text-white" : "text-gray-900"
          }`}
          variants={staggerParent}
        >
          {"NutriVigil".split(" ").map((word, i) => (
            <motion.span key={i} className="mr-3" variants={fadeUp}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className={`text-lg md:text-xl mb-8 drop-shadow-md transition-colors ${
            theme === 'dark' ? "text-white/90" : "text-blue-800"
          }`}
          variants={fadeUp}
        >
          Your Personal AI Health Scanner
        </motion.p>

        <motion.div variants={fadeUp}>
          <Link
            to="/scan"
            className={`inline-block px-12 py-4 backdrop-blur-2xl focus:border-b-blue-800 focus:ring border text-lg font-semibold rounded-xl shadow-xl hover:shadow-3xl transition-all duration-300 hover:scale-105 ${
              theme === 'dark'
                ? "bg-[#3b3b49]/30 border-white/20 text-white"
                : "bg-white/80 border-gray-300 text-indigo-600 hover:bg-white"
            }`}
          >
            Start Scanning
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className={`max-w-[900px] w-full rounded-3xl p-12 shadow-2xl border transition-colors ${
          theme === 'dark'
            ? "bg-[#161625] border-gray-800"
            : "bg-white/90 border-gray-200"
        }`}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2
          className={`text-center text-3xl md:text-4xl font-bold mb-10 transition-colors ${
            theme === 'dark' ? "text-white" : "text-gray-900"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          How it Works
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerParent}
        >
          {[
            {
              icon: <Camera size={32} className="text-indigo-400" />,
              title: "1. Snap Photo",
              desc: "Take a picture of your food",
            },
            {
              icon: <Brain size={32} className="text-indigo-400" />,
              title: "2. AI Analysis",
              desc: "Our AI identifies nutrition",
            },
            {
              icon: <Shield size={32} className="text-indigo-400" />,
              title: "3. Safety Score",
              desc: "Instant health recommendations",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              className={`text-center p-8 rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg ${
                theme === 'dark'
                  ? "bg-[#1e1e2e] border-gray-700 hover:border-blue-500/60 hover:bg-[#25253a]"
                  : "bg-gray-50 border-gray-200 hover:border-blue-400 hover:bg-white"
              }`}
              variants={stepCard}
              whileHover="hover"
            >
              <motion.div
                className={`w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center shadow-inner border transition-colors ${
                  theme === 'dark'
                    ? "bg-[#0f0f1f] border-gray-600"
                    : "bg-gray-100 border-gray-300"
                }`}
                whileHover={{ scale: 1.15, rotate: 6 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {step.icon}
              </motion.div>

              <h3 className={`text-lg font-semibold mb-2 transition-colors ${
                theme === 'dark' ? "text-white" : "text-gray-900"
              }`}>
                {step.title}
              </h3>
              <p className={`text-sm leading-relaxed transition-colors ${
                theme === 'dark' ? "text-gray-400" : "text-gray-600"
              }`}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
