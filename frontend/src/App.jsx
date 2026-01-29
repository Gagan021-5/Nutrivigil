import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ScanPage from "./pages/ScanPage";
import Protocol from "./pages/Protocol";
import AppInterface from "./pages/AppInterface";
import Nutrition from "./pages/Nutrition";
import HowItWorks from "./pages/HowItWorks";
import Scanner from "./pages/Scanner";
import NutritionDecoded from "./pages/NutritionDecoded";
import SafetySignals from "./pages/SafetySignals";
import HealthProfile from "./pages/HealthProfile";
import About from "./pages/About";
import Mission from "./pages/Mission";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      const ribbon = document.getElementById("liquid-ribbon");
      if (ribbon) {
        ribbon.style.left = `${e.clientX}px`;
        ribbon.style.top = `${e.clientY}px`;
      }
    });
  }, []);

  return (
    <ThemeProvider>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/scan" element={<ScanPage />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/app" element={<AppInterface />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/nutrition-decoded" element={<NutritionDecoded />} />
          <Route path="/safety-signals" element={<SafetySignals />} />
          <Route path="/health-profile" element={<HealthProfile />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
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
