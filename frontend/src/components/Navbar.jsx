import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useThemeTranslation } from "../hooks/useThemeTranslation";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";
import nutrivigile from "../assets/nutrivigile.jpeg";
import LanguagePicker from "./LanguagePicker";

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useThemeTranslation();

  const navItem = (path, label, isMobile = false) => (
    <motion.div
      whileHover={!isMobile ? { scale: 1.05 } : {}}
      whileTap={!isMobile ? { scale: 0.95 } : {}}
      onClick={() => isMobile && setIsMobileMenuOpen(false)}
    >
      <Link
        to={path}
        className={`text-sm sm:text-[15px] font-medium px-4 py-2 rounded-lg transition-all duration-300 no-underline block ${
          pathname === path
            ? theme === "dark"
              ? "text-blue-400 bg-white/10 border border-white/20"
              : "text-blue-600 bg-blue-50 border border-blue-200"
            : theme === "dark"
            ? "text-gray-300 hover:text-white hover:bg-white/10"
            : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
        }`}
      >
        {label}
      </Link>
    </motion.div>
  );

  return (
    <motion.nav
      className={`backdrop-blur-xl shadow-lg sticky top-0 z-50 border-b transition-colors duration-300 ${
        theme === "dark"
          ? "bg-black/20 border-white/10"
          : "bg-white/80 border-gray-200"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="no-underline">
            <div
              className={`flex items-center gap-2 sm:gap-3 truncate ${
                theme === "dark" ? "text-[#667eea]" : "text-black"
              }`}
            >
              <img src={nutrivigile} alt="logo" className="w-8 h-8" />
              <span className="text-xl font-bold">{t("appName")}</span>
            </div>
          </Link>
        </motion.div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-4 lg:gap-6">
            {navItem("/", t("nav.home"))}
            {navItem("/profile", t("nav.profile"))}
          </div>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className={`p-2 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-300 flex items-center justify-center border ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 border-white/20"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-white/90" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </motion.button>

          {/* Language Picker */}
          <div className="ml-1 sm:ml-2">
            <LanguagePicker />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 min-h-[44px] min-w-[44px] rounded-lg transition-all duration-300 flex items-center justify-center border ${
              theme === "dark"
                ? "bg-white/10 hover:bg-white/20 border-white/20"
                : "bg-gray-100 hover:bg-gray-200 border-gray-300"
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden border-t ${
            theme === "dark" ? "border-white/10" : "border-gray-200"
          }`}
        >
          <div className="px-4 py-4 flex flex-col gap-2">
            {navItem("/", t("nav.home"), true)}
            {navItem("/profile", t("nav.profile"), true)}
          </div>
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
