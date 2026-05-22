'use client'

import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { usePathname } from 'next/navigation'
import { BRAND_NAME, BRAND_YEAR } from '../config'

const VALID_LOCALES = ['de', 'en', 'es', 'fr', 'it']

export default function Footer() {
  const { t } = useTranslation()
  const pathname = usePathname()

  const urlLocale = pathname?.split('/')[1]
  const locale = VALID_LOCALES.includes(urlLocale) ? urlLocale : 'de'

  return (
    <footer className="footer-thin" role="contentinfo">
      <div className="footer-thin-inner">

        {/* Top row */}
        <div className="footer-top-row">

          {/* Brand */}
          <div className="footer-thin-brand-block">
            <a href={`/${locale}#home`} className="footer-thin-brand" aria-label="Kelu home">
              <img
                src="/logo-color.svg"
                alt={BRAND_NAME}
                width="28"
                height="28"
                className="footer-logo-img"
              />
              <span className="footer-thin-wordmark">{BRAND_NAME}</span>
            </a>
            <address className="footer-thin-address">
              KeLu GmbH<br />
              Langfurren 14, 8057 Zürich<br />
              <a href="mailto:info@kelugroup.ch">info@kelugroup.ch</a>
            </address>
          </div>

          {/* Nav */}
          <div className="footer-right-col">
            <nav className="footer-thin-nav" aria-label="Footer navigation">
              <Link href={`/${locale}/about`}>{t('nav.about')}</Link>
              <span aria-hidden="true">·</span>
              <Link href={`/${locale}/faq`}>FAQ</Link>
              <span aria-hidden="true">·</span>
              <Link href={`/${locale}/privacy`}>{t('footer.privacy')}</Link>
              <span aria-hidden="true">·</span>
              <Link href={`/${locale}/cookies`}>{t('footer.cookies')}</Link>
              <span aria-hidden="true">·</span>
              <Link href={`/${locale}/terms`}>{t('footer.terms')}</Link>
            </nav>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom-bar">
          <p className="footer-thin-copy">© {BRAND_YEAR} KeLu GmbH. {t('footer.copy')}</p>
        </div>

      </div>
    </footer>
  )
}