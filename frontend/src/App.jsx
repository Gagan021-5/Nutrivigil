import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ScanPage from "./pages/ScanPage";
import LanguageModal from "./components/LanguageModal";
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
        </Routes>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
