import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME, BRAND_YEAR } from '../config'


export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="footer-thin" role="contentinfo">
      <div className="footer-thin-inner">

        {/* Top row */}
        <div className="footer-top-row">

          {/* Brand */}
          <div className="footer-thin-brand-block">
            <a href="/#home" className="footer-thin-brand" aria-label="Kelu home">
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
              info@kelugroup.ch
            </address>
          </div>

          {/* Nav + Socials */}
          <div className="footer-right-col">
            <nav className="footer-thin-nav" aria-label="Footer navigation">
              <Link to="/about">{t('nav.about')}</Link>
              <span aria-hidden="true">·</span>
              <Link to="/faq">FAQ</Link>
              <span aria-hidden="true">·</span>
              <Link to="/privacy">{t('footer.privacy')}</Link>
              <span aria-hidden="true">·</span>
              <Link to="/cookies">{t('footer.cookies')}</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms">{t('footer.terms')}</Link>
            </nav>
          </div>

        </div>

        {/* Bottom bar — copyright */}
        <div className="footer-bottom-bar">
          <p className="footer-thin-copy">© {BRAND_YEAR} KeLu GmbH. {t('footer.copy')}</p>
        </div>

      </div>
    </footer>
  )
}