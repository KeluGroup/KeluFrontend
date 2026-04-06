import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME, BRAND_YEAR } from '../config'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <a href="#home" className="footer-brand" aria-label="Kelu home">
          <svg width="24" height="24" viewBox="0 0 34 34" fill="none" aria-hidden="true">
            <rect width="34" height="34" rx="9" fill="rgba(255,255,255,0.12)"/>
            <path d="M17 7C17 7 9 13 9 20C9 24.4 12.7 28 17 28C21.3 28 25 24.4 25 20C25 13 17 7 17 7Z" fill="#9DB59F"/>
            <circle cx="17" cy="20" r="2.5" fill="white"/>
          </svg>
          <span className="footer-wordmark">Kelu</span>
        </a>
        <p className="footer-copy">© {BRAND_YEAR} {BRAND_NAME} Gmbh. {t('footer.copy')}</p>
        <ul className="footer-links" role="list">
          <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
          <li><Link to="/terms">{t('footer.terms')}</Link></li>
        </ul>
      </div>
    </footer>
  )
}
