import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ScanPage from "./pages/ScanPage";
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
        </Routes>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
