import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translation.json';
import translationYO from './locales/yo/translation.json';
import translationHA from './locales/ha/translation.json';
import translationIG from './locales/ig/translation.json';

import translationCHI from './locales/chi/translation.json';
import translationEBIRA from './locales/ebira/translation.json';
import translationFR from './locales/fr/translation.json';
import translationIDO from './locales/ido/translation.json';
import translationIFK from './locales/ifk/translation.json';
import translationIJAW from './locales/ij/translation.json';
import translationINDIAN from './locales/ind/translation.json';
import translationGHANA from './locales/gh/translation.json';
import translationSOUTHAFRICA from './locales/sa/translation.json';
import translationTANZANIA from './locales/tz/translation.json';
import translationRUSSIA from './locales/ru/translation.json';
import translationKOREA from './locales/kr/translation.json';
import translationGAMBIA from './locales/gb/translation.json';
import translationPIDGIN from './locales/pidgin/translation.json';


i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      yo: { translation: translationYO },
      ha: { translation: translationHA },
      ig: { translation: translationIG },
      chi: { translation: translationCHI },
      fr: { translation: translationFR },
      ido: { translation: translationIDO },
      ifk: { translation: translationIFK },
      ij: { translation: translationIJAW },
      ebira: { translation: translationEBIRA },
      ind: { translation: translationINDIAN },
      gh: { translation: translationGHANA },
      sa: { translation: translationSOUTHAFRICA },
      ru: { translation: translationRUSSIA },
      tz: { translation: translationTANZANIA },
      kr: { translation: translationKOREA },
      gb: { translation: translationGAMBIA },
      pg: { translation: translationPIDGIN },
    },
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
