import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME, BRAND_YEAR } from '../config'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <a href="#home" className="footer-brand" aria-label="Kelu home">
          <img
            src="/logo.svg"
            alt={BRAND_NAME}
            width="34"
            height="34"
            aria-hidden="true"
          />
          <span className="logo-wordmark">{BRAND_NAME}</span>
        </a>
        <p className="footer-copy">© {BRAND_YEAR} {BRAND_NAME} Group Gmbh. {t('footer.copy')}</p>
        <ul className="footer-links" role="list">
          <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
          <li><Link to="/terms">{t('footer.terms')}</Link></li>
        </ul>
      </div>
    </footer>
  )
}
