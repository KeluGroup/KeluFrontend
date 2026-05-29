'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { BRAND_NAME, BRAND_YEAR } from '../config'

export default function Footer() {
  const t      = useTranslations()
  const locale = useLocale()

  return (
    <footer className="footer-thin" role="contentinfo">
      <div className="footer-thin-inner">

        <div className="footer-top-row">

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

        <div className="footer-bottom-bar">
          <p className="footer-thin-copy">© {BRAND_YEAR} KeLu GmbH. {t('footer.copy')}</p>
        </div>

      </div>
    </footer>
  )
}