import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "../src/locale/en/Translation.json";
import translationAR from "../src/locale/ar/Translation.json";

// the translations
const resources = {
 en: {
  translation: translationEN,
 },
 ar: {
  translation: translationAR,
 },
};

i18n
 .use(initReactI18next) // passes i18n down to react-i18next
 .init({
  resources,
  lng: localStorage.getItem('i18nextLng') || "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
  // if you're using a language detector, do not define the lng option
  // ns:['en','ar'],
  // defaultNS:'ar',
  debug: false,
  fallbackLng: "en",
  interpolation: {
   escapeValue: false, // react already safes from xss
  },
 });

export default i18n;
