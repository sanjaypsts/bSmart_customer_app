import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import TRANSLATION_EN from './en.json';
import TRANSLATION_DE from './fr.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        lng: 'en',
        compatibilityJSON: 'v3',
        resources:{
            en:{
                translations : TRANSLATION_EN
            },
            de:{
                translations :TRANSLATION_DE
            },

        },
        ns: ['translations'],
        defaultNS: 'translations'
    });

i18n.languages = ['en', 'de'];
export default i18n;

