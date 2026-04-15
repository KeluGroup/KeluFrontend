import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { BRAND_PHONE, BRAND_EMAIL } from '../config'
import { trackCTAClick } from '../utils/analytics'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="section contact-section" aria-label="Contact">

      {/* Atmospheric background */}
      <div className="contact-bg" aria-hidden="true" />

      <div className="section-inner">

        <div className="section-header scroll-animate">
          <span className="section-tag">{t('contact.tag')}</span>
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

        {/* ── Big CTA button ── */}
        <div className="contact-big-cta scroll-animate">
          <Link
            to="/contact"
            className="contact-big-cta-btn"
            onClick={() => trackCTAClick('contact-section')}
          >
            <span>{t('contact.infoTitle')}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
