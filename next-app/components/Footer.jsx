'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { BRAND_NAME, BRAND_YEAR } from '../config'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

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
              KeLu GmbH · UID CHE-189.376.134<br />
              Langfurren 14, 8057 Zürich<br />
              <a href="tel:+41446880284">+41 44 688 02 84</a><br />
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
            <div className="footer-thin-socials">
              <a
                href="https://www.instagram.com/kelugroup"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-thin-social"
                aria-label="Instagram @kelugroup"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.linkedin.com/in/kelu-gmbh-339753414/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-thin-social"
                aria-label="LinkedIn Kelu GmbH"
              >
                <LinkedInIcon />
              </a>
            </div>
          </div>

        </div>

        <div className="footer-bottom-bar">
          <p className="footer-thin-copy">© {BRAND_YEAR} KeLu GmbH. {t('footer.copy')}</p>
        </div>

      </div>
    </footer>
  )
}
