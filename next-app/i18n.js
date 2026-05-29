import { getRequestConfig } from 'next-intl/server'

const VALID_LOCALES = ['de', 'en', 'es', 'fr', 'it']

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  console.log('🌍 requestLocale:', locale)  // ← add this

  if (!locale || !VALID_LOCALES.includes(locale)) {
    locale = 'de'
  }

  console.log('🌍 loading messages for:', locale)  // ← and this

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})