import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import de from './locales/de.json'
import es from './locales/es.json'

// Read saved language on init, fallback to browser language, then 'en'
const savedLang = localStorage.getItem('kelu-lang')
  || navigator.language.slice(0, 2)
  || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, de: { translation: de }, es: { translation: es } },
    lng: savedLang,          // ← use saved value on startup
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  })

export default i18n