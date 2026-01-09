import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Check } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const languages = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "es", name: "Spanish", nativeName: "Español" },
    { code: "fr", name: "French", nativeName: "Français" },
];

const LanguagePicker = () => {
    const { i18n } = useTranslation();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    const selectedLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setFocusedIndex(0); // Reset focus when opening
        } else {
            setSearchQuery(""); // Clear search when closing
        }
    }, [isOpen]);

    // Reset focus when search query changes
    useEffect(() => {
        setFocusedIndex(0);
    }, [searchQuery]);


    const filteredLanguages = languages.filter((lang) => {
        const query = searchQuery.toLowerCase();
        return (
            lang.name.toLowerCase().includes(query) ||
            lang.nativeName.toLowerCase().includes(query) ||
            lang.code.toLowerCase().includes(query)
        );
    });

    const handleLanguageSelect = (langCode) => {
        i18n.changeLanguage(langCode);
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setFocusedIndex((prev) => (prev < filteredLanguages.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredLanguages.length > 0) {
                handleLanguageSelect(filteredLanguages[focusedIndex].code);
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
        }
    };

    // Helper to highlight text
    const HighlightedText = ({ text, highlight }) => {
        if (!highlight.trim()) {
            return <span>{text}</span>;
        }
        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} className="bg-yellow-200 text-black rounded-sm px-0.5">
                            {part}
                        </span>
                    ) : (
                        <span key={index}>{part}</span>
                    )
                )}
            </span>
        );
    };


    return (
            <div className="relative w-full sm:w-auto" ref={dropdownRef}>

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-2 min-h-[44px] rounded-lg text-sm border transition-colors ${theme === "dark"
                    ? "bg-[#1e1e2e] text-white border-white/20 hover:bg-white/10"
                    : "bg-white text-gray-900 border-gray-300 hover:bg-gray-50"
                    }`}
            >
                <span>{selectedLanguage.code.toUpperCase()}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute sm:right-0 left-0 sm:left-auto mt-2 w-full sm:w-64 max-w-[90vw] rounded-xl shadow-xl border overflow-hidden z-50 ${theme === "dark"
                            ? "bg-[#1e1e2e] border-white/10"
                            : "bg-white border-gray-200"
                            }`}
                    >
                        <div className={`p-2 border-b ${theme === "dark" ? "border-white/10" : "border-gray-100"}`}>
                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${theme === "dark" ? "bg-black/20 border-white/10" : "bg-gray-50 border-gray-200"
                                }`}>
                                <Search className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Search language..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full bg-transparent border-none outline-none text-base sm:text-sm placeholder-gray-500 ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                        </div>

                        <div className="max-h-[60vh] sm:max-h-60 overflow-y-auto py-1">
                            {filteredLanguages.length > 0 ? (
                                filteredLanguages.map((lang, index) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => handleLanguageSelect(lang.code)}
                                        onMouseEnter={() => setFocusedIndex(index)}
                                        className={`w-full px-4 py-2 min-h-[44px] text-left flex items-center justify-between text-sm transition-colors cursor-pointer ${theme === "dark"
                                                ? "text-gray-200"
                                                : "text-gray-700"
                                            } ${index === focusedIndex
                                                ? theme === "dark"
                                                    ? "bg-white/10"
                                                    : "bg-gray-100"
                                                : ""
                                            } ${i18n.language === lang.code ? (theme === "dark" ? "text-blue-400" : "text-blue-600") : ""}`}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                <HighlightedText text={lang.nativeName} highlight={searchQuery} />
                                            </span>
                                            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                                <HighlightedText text={lang.name} highlight={searchQuery} />
                                            </span>
                                        </div>
                                        {i18n.language === lang.code && <Check className="w-4 h-4" />}
                                    </button>
                                ))
                            ) : (
                                <div className={`px-4 py-3 text-center text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                                    No languages found
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguagePicker;
