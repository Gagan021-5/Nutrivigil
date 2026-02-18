import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslation } from "react-i18next";

// Import flag icons
import flagUS from "../assets/flags/us.svg";
import flagGB from "../assets/flags/gb.svg";
import flagIN from "../assets/flags/in.svg";
import flagPK from "../assets/flags/pk.svg";
import flagID from "../assets/flags/id.svg";
import flagCN from "../assets/flags/cn.svg";
import flagES from "../assets/flags/es.svg";
import flagFR from "../assets/flags/fr.svg";
import flagNL from "../assets/flags/nl.svg";
import flagDE from "../assets/flags/de.svg";
import flagPT from "../assets/flags/pt.svg";
import flagBR from "../assets/flags/br.svg";
import flagSA from "../assets/flags/sa.svg";
import flagRU from "../assets/flags/ru.svg";
import flagJP from "../assets/flags/jp.svg";
import flagKR from "../assets/flags/kr.svg";

const REGION_STORAGE_KEY = "languagePickerRegions";

const regions = [
  {
    id: "english",
    title: "English Variants",
    languages: [
      {
        code: "en",
        name: "English (US)",
        nativeName: "English",
        flag: flagUS
      },
      {
        code: "en",
        name: "English (UK)",
        nativeName: "English",
        flag: flagGB
      }
    ]
  },

  {
    id: "india",
    title: "Indian Languages",
    languages: [
      { code: "hi",   name: "Hindi", nativeName: "हिन्दी (भारत)", flag: flagIN },
      { code: "bn",   name: "Bengali", nativeName: "বাংলা (ভারত)", flag: flagIN },
      { code: "ta",   name: "Tamil", nativeName: "தமிழ் (இந்தியா)", flag: flagIN },
      { code: "te",   name: "Telugu", nativeName: "తెలుగు (భారతదేశం)", flag: flagIN },
      { code: "kn",   name: "Kannada", nativeName: "ಕನ್ನಡ (ಭಾರತ)", flag: flagIN },
      { code: "mr",   name: "Marathi", nativeName: "मराठी (भारत)", flag: flagIN },
      { code: "gu",   name: "Gujarati", nativeName: "ગુજરાતી (ભારત)", flag: flagIN },
      { code: "pa",   name: "Punjabi", nativeName: "ਪੰਜਾਬੀ (ਭਾਰਤ)", flag: flagIN },
      { code: "or",   name: "Odia", nativeName: "ଓଡ଼ିଆ (ଭାରତ)", flag: flagIN },
      { code: "as",   name: "Assamese", nativeName: "অসমীয়া (ভাৰত)", flag: flagIN },
      { code: "ml",   name: "Malayalam", nativeName: "മലയാളം (ഇന്ത്യ)", flag: flagIN }
    ]
  },

  {
    id: "global",
    title: "Global Languages",
    languages: [
      { code: "ur", flag: flagPK, name: "Urdu", nativeName: "اردو"},
      { code: "id", flag: flagID, name: "Indonesian" ,nativeName: "Bahasa Indonesia", },
      { code: "zh", flag: flagCN, name: "Chinese", nativeName: "中文" },
      { code: "es", flag: flagES, name: "Spanish", nativeName: "Español" },
      { code: "fr", flag: flagFR, name: "French", nativeName: "Français" },
      { code: "nl", flag: flagNL, name: "Dutch", nativeName: "Nederlands" },
      { code: "de", flag: flagDE, name: "German", nativeName: "Deutsch" },
      { code: "pt", flag: flagPT, name: "Portuguese", nativeName: "Português" },
      { code: "pt-BR", flag: flagBR, name: "Portuguese (Brazil)", nativeName: "Português" },
      { code: "ar", flag: flagSA, name: "Arabic", nativeName: "العربية" },
      { code: "ru", flag: flagRU, name: "Russian", nativeName: "Русский" },
      { code: "ja", flag: flagJP, name: "Japanese", nativeName: "日本語" },
      { code: "ko", flag: flagKR, name: "Korean", nativeName: "한국어" }
    ]
  }
];

const LanguagePicker = () => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(0);

  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const [openRegions, setOpenRegions] = useState(() => {
    const raw = localStorage.getItem(REGION_STORAGE_KEY);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return { english: true, india: true, global: true };
      }
    }
    return { english: true, india: true, global: true };
  });

  useEffect(() => {
    localStorage.setItem(REGION_STORAGE_KEY, JSON.stringify(openRegions));
  }, [openRegions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // focus search on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setFocusedIndex(0);
    } else {
      setSearchQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    setFocusedIndex(0);
  }, [searchQuery]);

  const selectedLanguage = useMemo(() => {
    const all = regions.flatMap((r) => r.languages);
    return all.find((l) => l.code === i18n.language) || all[0];
  }, [i18n.language]);

  useEffect(() => {
  const handleShortcut = (e) => {
    // Alt + L
    const isAltL =
      e.altKey &&
      !e.ctrlKey &&
      !e.metaKey &&
      e.key.toLowerCase() === "l";

    if (!isAltL) return;

    e.preventDefault();

    setIsOpen((prev) => {
      const next = !prev;

      if (!prev && inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 0);
      }

      return next;
    });
  };

  window.addEventListener("keydown", handleShortcut);
  return () => window.removeEventListener("keydown", handleShortcut);
}, []);

  // filter per region
  const filteredRegions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    // if no search, return full regions
    if (!q) return regions;

    // if search exists, auto-open all regions so results are visible
    return regions
      .map((region) => ({
        ...region,
        languages: region.languages.filter((lang) => {
          return (
            lang.name.toLowerCase().includes(q) ||
            lang.nativeName.toLowerCase().includes(q) ||
            lang.code.toLowerCase().includes(q) ||
            (lang.locale && lang.locale.toLowerCase().includes(q))
          );
        })
      }))
      .filter((r) => r.languages.length > 0);
  }, [searchQuery]);

  // flat list for keyboard navigation (only visible items)
  const visibleLanguagesFlat = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return filteredRegions.flatMap((region) => {
      const isRegionOpen = q ? true : openRegions[region.id];
      if (!isRegionOpen) return [];
      return region.languages.map((lang) => ({
        ...lang,
        regionId: region.id
      }));
    });
  }, [filteredRegions, openRegions, searchQuery]);

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang.code);

    // ✅ preserve your existing usage
    localStorage.setItem("language", lang.code);

    // ✅ store locale too (useful later)
    if (lang.locale) localStorage.setItem("languageLocale", lang.locale);

    localStorage.setItem("languageSelected", "true");
    setIsOpen(false);
  };

  const toggleRegion = (regionId) => {
    setOpenRegions((prev) => ({
      ...prev,
      [regionId]: !prev[regionId]
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < visibleLanguagesFlat.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (visibleLanguagesFlat.length > 0) {
        handleLanguageSelect(visibleLanguagesFlat[focusedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const HighlightedText = ({ text, highlight }) => {
    if (!highlight.trim()) return <span>{text}</span>;
    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);
    return (
      <span>
        {parts.map((part, idx) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={idx}
              className="bg-yellow-200 text-black rounded-sm px-0.5"
            >
              {part}
            </span>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <>
      
      <style>
        {`
          .lang-scroll::-webkit-scrollbar { width: 6px; }
          .lang-scroll::-webkit-scrollbar-track { background: transparent; }
          .lang-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.15);
            border-radius: 10px;
          }
          .lang-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.25);
          }
          body.light .lang-scroll::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.2);
          }
          body.light .lang-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.3);
          }
        `}
      </style>

      <div className="relative" ref={dropdownRef}>
        {/* Trigger button */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors ${
            theme === "dark"
              ? "bg-[#1e1e2e] text-white border-white/20 hover:bg-white/10"
              : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
          }`}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          {/* ✅ show selected flag too */}
          <img
            src={selectedLanguage.flag}
            alt=""
            className="w-5 h-5 rounded-full object-cover border border-white/10"
          />
          <span>{selectedLanguage.code.toUpperCase()}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute right-0 mt-2 w-80 rounded-xl shadow-xl border overflow-hidden z-50 ${
                theme === "dark"
                  ? "bg-[#1e1e2e] border-white/10"
                  : "bg-white border-gray-200"
              }`}
            >
              {/* Search */}
              <div
                className={`p-2 border-b ${
                  theme === "dark" ? "border-white/10" : "border-gray-100"
                }`}
              >
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${
                    theme === "dark"
                      ? "bg-black/20 border-white/10"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <Search
                    className={`w-4 h-4 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search language..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full bg-transparent border-none outline-none text-sm placeholder-gray-500 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>

              {/* Region Lists */}
              <div className="max-h-72 overflow-y-auto py-2 lang-scroll">
                {filteredRegions.length === 0 ? (
                  <div
                    className={`px-4 py-3 text-center text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    No languages found
                  </div>
                ) : (
                  filteredRegions.map((region) => {
                    const q = searchQuery.trim().toLowerCase();
                    const isRegionOpen = q ? true : openRegions[region.id];
                    const regionContentId = `region-${region.id}-content`;

                    return (
                      <div key={region.id} className="px-2">
                        {/* ✅ Region header toggle */}
                        <button
                          type="button"
                          onClick={() => toggleRegion(region.id)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold ${
                            theme === "dark"
                              ? "text-white/90 hover:bg-white/5"
                              : "text-gray-800 hover:bg-gray-50"
                          }`}
                          aria-expanded={isRegionOpen}
                          aria-controls={regionContentId}
                        >
                          <span>{region.title}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isRegionOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* ✅ Animated region content */}
                        <AnimatePresence initial={false}>
                          {isRegionOpen && (
                            <motion.div
                              id={regionContentId}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22, ease: "easeOut" }}
                              style={{ overflow: "hidden" }}
                            >
                              <div className="pb-2">
                                {region.languages.map((lang) => {
                                  const isSelected = i18n.language === lang.code;

                                  return (
                                    <button
                                      key={`${lang.code}-${lang.flag}`}
                                      onClick={() => handleLanguageSelect(lang)}
                                      className={`w-full px-4 py-2 text-left flex items-center justify-between text-sm transition-colors rounded-lg ${
                                        theme === "dark"
                                          ? "text-gray-200 hover:bg-white/10"
                                          : "text-gray-700 hover:bg-gray-100"
                                      } ${
                                        isSelected
                                          ? theme === "dark"
                                            ? "text-blue-400"
                                            : "text-blue-600"
                                          : ""
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <img
                                          src={lang.flag}
                                          alt=""
                                          className={`w-7 h-7 rounded-full object-cover border ${
                                            theme === "dark"
                                              ? "border-white/10 shadow-md shadow-black/30"
                                              : "border-black/10 shadow-sm"
                                          }`}
                                          loading="lazy"
                                        />

                                        <div className="flex flex-col">
                                          <span className="font-medium">
                                            <HighlightedText
                                              text={lang.nativeName}
                                              highlight={searchQuery}
                                            />
                                          </span>
                                          <span
                                            className={`text-xs ${
                                              theme === "dark"
                                                ? "text-gray-400"
                                                : "text-gray-500"
                                            }`}
                                          >
                                            <HighlightedText
                                              text={lang.name}
                                              highlight={searchQuery}
                                            />
                                            {lang.locale ? ` • ${lang.locale}` : ""}
                                          </span>
                                        </div>
                                      </div>

                                      {isSelected && <Check className="w-4 h-4" />}
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LanguagePicker;
