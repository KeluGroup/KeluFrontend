'use client'

import '../i18n/index'  // ← initialize i18next (adjust path if needed)
import 'flag-icons/css/flag-icons.min.css'  // ← if not in global CSS
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'

const VALID_LOCALES = ['de', 'en', 'es', 'fr', 'it']

export default function NotFound() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const urlLocale = pathname?.split('/')[1]
  const locale = VALID_LOCALES.includes(urlLocale) ? urlLocale : 'de'

  return (
    <main className="not-found-main">
      <div className="not-found-inner">
        <span className="not-found-code">404</span>
        <h1 className="not-found-title">{t('notFound.title', { defaultValue: 'Page not found' })}</h1>
        <p className="not-found-body">
          {t('notFound.body', { defaultValue: "The page you're looking for doesn't exist or has been moved." })}
        </p>
        <div className="not-found-actions">
          <Link href={`/${locale}`} className="not-found-btn not-found-btn--primary">
            {t('notFound.home', { defaultValue: 'Back to Home' })}
          </Link>
          <Link href={`/${locale}/products`} className="not-found-btn not-found-btn--ghost">
            {t('notFound.products', { defaultValue: 'Our Products' })}
          </Link>
          <Link href={`/${locale}/contact`} className="not-found-btn not-found-btn--ghost">
            {t('notFound.contact', { defaultValue: 'Contact Us' })}
          </Link>
        </div>
      </div>
    </main>
  )
}