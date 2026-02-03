import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ScanPage from "./pages/ScanPage";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Protocol from "./pages/Protocol";
import AppInterface from "./pages/AppInterface";
import Nutrition from "./pages/Nutrition";
import HowItWorks from "./pages/HowItWorks";
import Scanner from "./pages/Scanner";
import NutritionDecoded from "./pages/NutritionDecoded";
import SafetySignals from "./pages/SafetySignals";
import HealthProfile from "./pages/HealthProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Footer from "./components/Footer";

function App() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // ✅ Mouse ribbon logic + cleanup
  useEffect(() => {
    const handleMouseMove = (e) => {
      const ribbon = document.getElementById("liquid-ribbon");
      if (ribbon) {
        ribbon.style.left = `${e.clientX}px`;
        ribbon.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ Show language modal only if language not selected
  useEffect(() => {
    const lang = localStorage.getItem("language");
    const selected = localStorage.getItem("languageSelected");

    if (!lang || !selected) {
      setShowLanguageModal(true);
    }
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden">
        {/* ✅ Language Modal */}
        {showLanguageModal && (
          <LanguageModal onClose={() => setShowLanguageModal(false)} />
        )}

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/app" element={<AppInterface />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/nutrition-decoded" element={<NutritionDecoded />} />
          <Route path="/safety-signals" element={<SafetySignals />} />
          <Route path="/health-profile" element={<HealthProfile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<Cookies />} />
        </Routes>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
