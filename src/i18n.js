import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your JSON files directly
import enTranslations from "@/locales/en/translation.json";
import zhTranslations from "@/locales/zh/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    zh: { translation: zhTranslations },
  },
  // default language
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
