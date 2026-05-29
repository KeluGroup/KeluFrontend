// hooks/useLocale.js
import { usePathname } from 'next/navigation'

const VALID_LOCALES = ['de', 'en', 'es', 'fr', 'it']

export function useLocale() {
  const pathname = usePathname()
  const urlLocale = pathname?.split('/')[1]
  return VALID_LOCALES.includes(urlLocale) ? urlLocale : 'de'
}