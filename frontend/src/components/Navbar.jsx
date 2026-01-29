import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useThemeTranslation } from "../hooks/useThemeTranslation";
import { useTheme } from "../contexts/ThemeContext";
import { useState } from "react";
import nutrivigile from "../assets/nutrivigile.jpeg";
import LanguagePicker from "./LanguagePicker";

const Navbar = () => {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { t } = useThemeTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItem = (path, label, isMobile = false) => (
    <motion.div
      whileHover={!isMobile ? { scale: 1.05 } : undefined}
      whileTap={!isMobile ? { scale: 0.95 } : undefined}
      onClick={() => isMobile && setIsMobileMenuOpen(false)}
    >
      <Link
        to={path}
        className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer
          ${
            pathname === path
              ? theme === "dark"
                ? "text-blue-400 bg-white/10 border border-white/20"
                : "text-blue-600 bg-blue-50 border border-blue-200"
              : theme === "dark"
              ? "text-gray-300 hover:text-white hover:bg-white/10"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          }
        `}
      >
        {label}
      </Link>
    </motion.div>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300
        ${
          theme === "dark"
            ? "bg-black/30 border-white/10"
            : "bg-white/80 border-gray-200"
        }
      `}
    >
      {/* Navbar Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src={nutrivigile} alt="logo" className="w-8 h-8 rounded" />
            <span className="text-lg font-bold text-[#667eea]">
              {t("appName")}
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItem("/", t("nav.home"))}
          {navItem("/profile", t("nav.profile"))}
          {navItem("/protocol", "Protocol v1.0")}
          {navItem("/app", "App Interface")}
          {navItem("/nutrition", "Food & Nutrition")}
          {navItem("/how-it-works", "How It Works")}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle theme"
            className={`p-2 min-h-[44px] min-w-[44px] rounded-lg border transition-all duration-300 flex items-center justify-center
              ${
                theme === "dark"
                  ? "bg-white/10 hover:bg-white/20 border-white/20"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300"
              }
            `}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-white" />
            ) : (
              <Moon className="w-5 h-5 text-blue-600" />
            )}
          </motion.button>

          {/* Language Picker */}
          <LanguagePicker />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className={`md:hidden p-2 min-h-[44px] min-w-[44px] rounded-lg border transition-all duration-300 flex items-center justify-center
              ${
                theme === "dark"
                  ? "bg-white/10 hover:bg-white/20 border-white/20"
                  : "bg-gray-100 hover:bg-gray-200 border-gray-300"
              }
            `}
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
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`md:hidden overflow-hidden border-t
              ${
                theme === "dark"
                  ? "border-white/10 bg-black/40"
                  : "border-gray-200 bg-white"
              }
            `}
          >  {navItem("/protocol", "Protocol v1.0", true)}
              {navItem("/app", "App Interface", true)}
              {navItem("/nutrition", "Food & Nutrition", true)}
              {navItem("/how-it-works", "How It Works", true)}
            
            <div className="px-4 py-4 flex flex-col gap-2">
              {navItem("/", t("nav.home"), true)}
              {navItem("/profile", t("nav.profile"), true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
