import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import de from './locales/de.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'

const savedLang =
  typeof window !== 'undefined'
    ? localStorage.getItem('kelu-lang')
    : null

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      de: { translation: de },
      es: { translation: es },
      fr: { translation: fr },
      it: { translation: it },
    },
    lng: savedLang ?? 'de',
    fallbackLng: 'de',
    interpolation: { escapeValue: false },
  })

export default i18n