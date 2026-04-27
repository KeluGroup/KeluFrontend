import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME, BRAND_YEAR } from '../config'

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer-thin" role="contentinfo">
      <div className="footer-thin-inner">

        {/* Left — brand + address */}
        <div className="footer-thin-brand-block">
          <a href="/#home" className="footer-thin-brand" aria-label="Kelu home">
            <img
              src="/logo.svg"
              alt={BRAND_NAME}
              width="28"
              height="28"
              style={{ background: '#fff', borderRadius: '6px', padding: '2px' }}
            />
            <span className="footer-thin-wordmark">{BRAND_NAME}</span>
          </a>
          <address className="footer-thin-address">
            Kelu GmbH<br />
            Langfurren 14, 8057 Zürich
          </address>
        </div>

        {/* Center — copyright (swapped) */}
        <p className="footer-thin-copy">© {BRAND_YEAR} Kelu GmbH. {t('footer.copy')}</p>

        {/* Right — nav + Instagram (swapped) */}
        <div className="footer-thin-right">
          <nav className="footer-thin-nav" aria-label="Footer navigation">
            <Link to="/about">{t('nav.about')}</Link>
            <span aria-hidden="true">·</span>
            <Link to="/faq">FAQ</Link>
            <span aria-hidden="true">·</span>
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <span aria-hidden="true">·</span>
            <Link to="/cookies">{t('footer.cookies')}</Link>  {/* ← add this */}
            <span aria-hidden="true">·</span>
            <Link to="/terms">{t('footer.terms')}</Link>
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
              href="https://www.tiktok.com/@kelugmbh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-thin-social"
              aria-label="TikTok @kelugmbh"
            >
              <TikTokIcon />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}