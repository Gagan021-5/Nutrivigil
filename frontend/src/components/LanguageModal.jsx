import { useMemo, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import "./LanguageModal.css";
import { useTranslation } from "react-i18next";


const languageRegions = [
  {
    region: "English",
    items: [
      {
        code: "en",
        flag: "/src/assets/flags/us.svg",
        native: "English",
        english: "English (US)"
      },
      {
        code: "en",
        flag: "/src/assets/flags/gb.svg",
        native: "English",
        english: "English (UK)"
      }
    ]
  },

  {
    region: "India",
    items: [
      { code: "hi", flag: "/src/assets/flags/in.svg", native: "हिन्दी", english: "Hindi" },
      { code: "bn", flag: "/src/assets/flags/in.svg", native: "বাংলা", english: "Bengali" },
      { code: "ta", flag: "/src/assets/flags/in.svg", native: "தமிழ்", english: "Tamil" },
      { code: "te", flag: "/src/assets/flags/in.svg", native: "తెలుగు", english: "Telugu" },
      { code: "kn", flag: "/src/assets/flags/in.svg", native: "ಕನ್ನಡ", english: "Kannada" },
      { code: "mr", flag: "/src/assets/flags/in.svg", native: "मराठी", english: "Marathi" },
      { code: "gu", flag: "/src/assets/flags/in.svg", native: "ગુજરાતી", english: "Gujarati" },
      { code: "pa", flag: "/src/assets/flags/in.svg", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
      { code: "or", flag: "/src/assets/flags/in.svg", native: "ଓଡ଼ିଆ", english: "Odia" },
      { code: "as", flag: "/src/assets/flags/in.svg", native: "অসমীয়া", english: "Assamese" },
      { code: "ml", flag: "/src/assets/flags/in.svg", native: "മലയാളം", english: "Malayalam" }
    ]
  },

  {
    region: "Global",
    items: [
      { code: "ur", locale: "ur-PK", flag: "/src/assets/flags/pk.svg", native: "اردو", english: "Urdu (Pakistan)" },
      { code: "id",  locale: "id-ID", flag: "/src/assets/flags/id.svg", native: "Bahasa Indonesia", english: "Indonesian (Indonesia)" },
      { code: "zh", locale: "zh-CN", flag: "src/assets/flags/cn.svg", native: "中文", english: "Chinese (China)" },
      { code: "es", locale: "es-ES", flag: "src/assets/flags/es.svg", native: "Español", english: "Spanish (Spain)" },
      { code: "fr", locale: "fr-FR", flag: "src/assets/flags/fr.svg", native: "Français", english: "French (France)" },
      { code: "nl", locale: "nl-NL", flag: "src/assets/flags/nl.svg", native: "Nederlands", english: "Dutch (Netherlands)" },
      { code: "de", locale: "de-DE", flag: "src/assets/flags/de.svg", native: "Deutsch", english: "German (Germany)" },
      { code: "pt", locale: "pt-PT", flag: "src/assets/flags/pt.svg", native: "Português", english: "Portuguese (Portugal)" },
      { code: "pt", locale: "pt-BR", flag: "src/assets/flags/br.svg", native: "Português", english: "Portuguese (Brazil)" },
      { code: "ar", locale: "ar-SA", flag: "src/assets/flags/sa.svg", native: "العربية", english: "Arabic (Saudi Arabia)" },
      { code: "ru", locale: "ru-RU", flag: "src/assets/flags/ru.svg", native: "Русский", english: "Russian (Russia)" },
      { code: "ja", locale: "ja-JP", flag: "src/assets/flags/jp.svg", native: "日本語", english: "Japanese (Japan)" },
      { code: "ko", locale: "ko-KR", flag: "src/assets/flags/kr.svg", native: "한국어", english: "Korean (SouthKorea)" }
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
