import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BRAND_PHONE, BRAND_EMAIL } from '../config'
import { trackCTAClick } from '../utils/analytics'

const InstagramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)
const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
  </svg>
)

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">

      {/* Atmospheric background */}
      <div className="contact-bg" aria-hidden="true" />

      <div className="section-inner">

        <div className="section-header scroll-animate">
          <span className="section-tag">{t('contact.tag')}</span>
          <h2 className="section-title">{t('contact.infoTitle')}</h2>
          <p className="section-sub">{t('contact.subtitle')}</p>
        </div>

        {/* ── Info cards ── */}
        <div className="contact-info-grid scroll-animate">

          <a href={`tel:${BRAND_PHONE}`} className="contact-info-card">
            <div className="contact-info-card-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.6 2.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <div>
              <div className="contact-info-card-label">{t('contact.phone')}</div>
              <div className="contact-info-card-value">{BRAND_PHONE}</div>
            </div>
          </a>

          <a href={`mailto:${BRAND_EMAIL}`} className="contact-info-card">
            <div className="contact-info-card-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <div>
              <div className="contact-info-card-label">{t('contact.email')}</div>
              <div className="contact-info-card-value">{BRAND_EMAIL}</div>
            </div>
          </a>

          <div className="contact-info-card contact-info-card--plain">
            <div className="contact-info-card-icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div className="contact-info-card-label">{t('contact.address')}</div>
              <div className="contact-info-card-value">Zürich, Switzerland</div>
            </div>
          </div>

        </div>

        {/* ── CTA to full form page ── */}
        <div className="contact-cta-block scroll-animate">
          <Link to="/contact" className="btn-ph btn-ph-primary btn-ph--xl" onClick={() => trackCTAClick('contact')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            {t('contact.ctaBtn')}
          </Link>
          <p className="contact-cta-note">— {t('contact.followUs')} —</p>
          <div className="contact-socials">
            <a href="https://www.instagram.com/kelugroup" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="contact-social-btn">
              <InstagramIcon />
            </a>
            <a href="https://www.tiktok.com/@kelugmbh" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="contact-social-btn">
              <TikTokIcon />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
