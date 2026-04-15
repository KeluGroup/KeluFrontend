import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BRAND_NAME, BRAND_YEAR, BRAND_PHONE, BRAND_EMAIL } from '../config'

const InstagramIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner-new">

        {/* ── Main 3-col grid: brand | socials | nav ── */}
        <div className="footer-main-grid">

          {/* Col 1 — Brand + address + contact */}
          <div className="footer-brand-block">
            <a href="/#home" className="footer-brand" aria-label="Kelu home">
              <img src="/logo.svg" alt={BRAND_NAME} width="34" height="34" aria-hidden="true" />
              <span className="logo-wordmark">{BRAND_NAME}</span>
            </a>
            <address className="footer-address">
              Kelu GmbH<br />
              Langfurren 14<br />
              8057 Zürich, Switzerland
            </address>
            <div className="footer-contact-mini">
              <a href={`tel:${BRAND_PHONE}`} className="footer-contact-line">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                {BRAND_PHONE}
              </a>
              <a href={`mailto:${BRAND_EMAIL}`} className="footer-contact-line">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                {BRAND_EMAIL}
              </a>
            </div>
          </div>

          {/* Col 2 — Social media (centre) */}
          <div className="footer-social-col">
            <p className="footer-social-label">{t('contact.followUs')}</p>
            <a
              href="https://www.instagram.com/kelugroup"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-card"
              aria-label="Instagram @kelugroup"
            >
              <InstagramIcon />
              <span>
                <span className="footer-social-card-name">Instagram</span>
                <span className="footer-social-card-handle">@kelugroup</span>
              </span>
            </a>
            <a
              href="https://www.tiktok.com/@kelugmbh"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-card"
              aria-label="TikTok @kelugmbh"
            >
              <TikTokIcon />
              <span>
                <span className="footer-social-card-name">TikTok</span>
                <span className="footer-social-card-handle">@kelugmbh</span>
              </span>
            </a>
          </div>

          {/* Col 3 — Nav + legal */}
          <div className="footer-nav-group">
            <ul className="footer-links" role="list">
              <li><a href="/#home">{t('nav.home')}</a></li>
              <li><a href="/#solution">{t('nav.solution')}</a></li>
              <li><a href="/#process">{t('nav.process')}</a></li>
              <li><Link to="/benefits">{t('nav.benefits')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
            <ul className="footer-links footer-links--legal" role="list">
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/privacy">{t('footer.privacy')}</Link></li>
              <li><Link to="/terms">{t('footer.terms')}</Link></li>
            </ul>
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p className="footer-copy">© {BRAND_YEAR} Kelu GmbH. {t('footer.copy')}</p>
        </div>

      </div>
    </footer>
  )
}
