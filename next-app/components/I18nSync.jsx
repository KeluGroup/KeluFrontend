'use client'

import { useEffect } from 'react'
import i18n from '../i18n/index'

export default function I18nSync({ locale, children }) {
  useEffect(() => {
    if (locale && i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
    // ← remove: localStorage.setItem('kelu-lang', locale)
  }, [locale])

  if (typeof window === 'undefined' && locale && i18n.language !== locale) {
    i18n.changeLanguage(locale)
  }

  return <>{children}</>
}