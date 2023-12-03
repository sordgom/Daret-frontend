import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

import translationEN from './locales/en/translation.json';
import translationFR from './locales/fr/translation.json';

i18n.use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      fr: { translation: translationFR },
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
  });

export default i18n;
