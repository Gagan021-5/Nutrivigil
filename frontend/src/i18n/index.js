import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import ar from "./locales/ar.json";
import as from "./locales/as.json";
import bn from "./locales/bn.json";
import de from "./locales/de.json";
import en from "./locales/en.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import gu from "./locales/gu.json";
import hi from "./locales/hi.json";
import id from "./locales/id.json";
import ja from "./locales/ja.json";
import kn from "./locales/kn.json";
import ko from "./locales/ko.json";
import ml from "./locales/ml.json";
import mr from "./locales/mr.json";
import nl from "./locales/nl.json";
import or from "./locales/or.json";
import pa from "./locales/pa.json";
import pt from "./locales/pt.json";
import pt_BR from "./locales/pt_BR.json";
import ru from "./locales/ru.json";
import ta from "./locales/ta.json";
import te from "./locales/te.json";
import ur from "./locales/ur.json";
import zh from "./locales/zh.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: {translation : ar},
      as: {translation : as},
      bn: { translation: bn },
      de: { translation: de},
      en: { translation: en },
      es: {translation:  es},
      fr: {translation: fr},
      gu: {translation: gu },
      hi: {translation: hi },
      id: {translation: id},
      ja: {translation: ja},
      kn: {translation: kn},
      ko: {translation: ko},
      ml: {translation: ml},
      mr: {translation: mr},
      nl: {translation: nl},
      or: {translation: or},
      pa: {translation: pa},
      pt: {translation: pt},
      pt_BR: {translation: pt_BR},
      ru: {translation: ru},
      ta: {translation: ta},
      te: {translation: te},
      ur: {translation: ur},
      zh: {translation: zh},
    },

    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
