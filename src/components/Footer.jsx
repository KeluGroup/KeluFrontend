import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME, BRAND_YEAR } from '../config'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">

        <a href="#home" className="footer-brand" aria-label="Kelu home">
          <img src="/logo.svg" alt={BRAND_NAME} width="34" height="34" aria-hidden="true" />
          <span className="logo-wordmark">{BRAND_NAME}</span>
        </a>

        <p className="footer-copy">© {BRAND_YEAR} {BRAND_NAME} Group GmbH. {t('footer.copy')}</p>

        <div className="footer-social">
          <a
            href="https://www.instagram.com/kelugroup"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="Instagram @kelugroup"
          >
            <InstagramIcon />
            <span>@kelugroup</span>
          </a>
          <a
            href="https://www.tiktok.com/@kelugmbh"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-btn"
            aria-label="TikTok @kelugmbh"
          >
            <TikTokIcon />
            <span>@kelugmbh</span>
          </a>
        </div>

        <ul className="footer-links" role="list">
          <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
          <li><Link to="/terms">{t('footer.terms')}</Link></li>
        </ul>

      </div>
    </footer>
  )
}
