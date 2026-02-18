import { useMemo, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./LanguageModal.css";
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


const languageRegions = [
  {
    region: "English",
    items: [
      {
        code: "en",
        flag: flagUS,
        native: "English",
        english: "English (US)"
      },
      {
        code: "en",
        flag: flagGB,
        native: "English",
        english: "English (UK)"
      }
    ]
  },

  {
    region: "India",
    items: [
      { code: "hi", flag: flagIN, native: "हिन्दी", english: "Hindi" },
      { code: "bn", flag: flagIN, native: "বাংলা", english: "Bengali" },
      { code: "ta", flag: flagIN, native: "தமிழ்", english: "Tamil" },
      { code: "te", flag: flagIN, native: "తెలుగు", english: "Telugu" },
      { code: "kn", flag: flagIN, native: "ಕನ್ನಡ", english: "Kannada" },
      { code: "mr", flag: flagIN, native: "मराठी", english: "Marathi" },
      { code: "gu", flag: flagIN, native: "ગુજરાતી", english: "Gujarati" },
      { code: "pa", flag: flagIN, native: "ਪੰਜਾਬੀ", english: "Punjabi" },
      { code: "or", flag: flagIN, native: "ଓଡ଼ିଆ", english: "Odia" },
      { code: "as", flag: flagIN, native: "অসমীয়া", english: "Assamese" },
      { code: "ml", flag: flagIN, native: "മലയാളം", english: "Malayalam" }
    ]
  },

  {
    region: "Global",
    items: [
      { code: "ur", locale: "ur-PK", flag: flagPK, native: "اردو", english: "Urdu (Pakistan)" },
      { code: "id",  locale: "id-ID", flag: flagID, native: "Bahasa Indonesia", english: "Indonesian (Indonesia)" },
      { code: "zh", locale: "zh-CN", flag: flagCN, native: "中文", english: "Chinese (China)" },
      { code: "es", locale: "es-ES", flag: flagES, native: "Español", english: "Spanish (Spain)" },
      { code: "fr", locale: "fr-FR", flag: flagFR, native: "Français", english: "French (France)" },
      { code: "nl", locale: "nl-NL", flag: flagNL, native: "Nederlands", english: "Dutch (Netherlands)" },
      { code: "de", locale: "de-DE", flag: flagDE, native: "Deutsch", english: "German (Germany)" },
      { code: "pt", locale: "pt-PT", flag: flagPT, native: "Português", english: "Portuguese (Portugal)" },
      { code: "pt", locale: "pt-BR", flag: flagBR, native: "Português", english: "Portuguese (Brazil)" },
      { code: "ar", locale: "ar-SA", flag: flagSA, native: "العربية", english: "Arabic (Saudi Arabia)" },
      { code: "ru", locale: "ru-RU", flag: flagRU, native: "Русский", english: "Russian (Russia)" },
      { code: "ja", locale: "ja-JP", flag: flagJP, native: "日本語", english: "Japanese (Japan)" },
      { code: "ko", locale: "ko-KR", flag: flagKR, native: "한국어", english: "Korean (SouthKorea)" }
    ]
  }
];

const LanguageModal = ({ onClose }) => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  const [search, setSearch] = useState("");

  const allLanguages = useMemo(() => {
    return languageRegions.flatMap((group) =>
      group.items.map((item) => ({ ...item, region: group.region }))
    );
  }, []);

  const filteredRegions = useMemo(() => {
    if (!search.trim()) return languageRegions;

    const q = search.toLowerCase();

    const filtered = allLanguages.filter(
      (l) =>
        l.native.toLowerCase().includes(q) ||
        l.english.toLowerCase().includes(q) ||
        l.region.toLowerCase().includes(q)
    );

    const grouped = {};
    filtered.forEach((lang) => {
      if (!grouped[lang.region]) grouped[lang.region] = [];
      grouped[lang.region].push(lang);
    });

    return Object.keys(grouped).map((region) => ({
      region,
      items: grouped[region]
    }));
  }, [search, allLanguages]);

  const handleSelect = (lang) => {
    i18n.changeLanguage(lang.code); //  synced with LanguagePicker
    localStorage.setItem("language", lang.code);
    localStorage.setItem("languageSelected", "true");
    onClose();
  };

  return (
    <div className="lang-backdrop">
      <div className={`lang-modal lang-animate ${theme === "light" ? "light" : ""}`}>
        <div className="lang-title">Select your region / language</div>

        <div className="lang-search">
          <input
            placeholder="Search language or region..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="lang-list">
          {filteredRegions.map((group) => (
            <div key={group.region} className="lang-region">
              <div className="lang-region-title">{group.region}</div>

              {group.items.map((lang, idx) => (
                <div
                  key={`${lang.code}-${idx}`}
                  className="lang-item"
                  onClick={() => handleSelect(lang)}
                >
                  <div className="lang-native">
                    <img
                      className="lang-flag-img"
                      src={lang.flag}
                      alt={`${lang.english} flag`}
                      loading="lazy"
                    />
                    {lang.native}
                  </div>

                  <div className="lang-english">{lang.english}</div>
                </div>
              ))}
            </div>
          ))}

          {filteredRegions.length === 0 && (
            <div className="lang-empty">No language found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
