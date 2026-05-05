import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { trackCTAClick } from '../utils/analytics'
import { useHashSync } from '../hooks/useHashSync'

export default function Home() {
  useHashSync('section[id], .contact-merged[id], .process-section[id]')
  const { t } = useTranslation()

  return (
    <section id="home" className="section" aria-label="Home">

      {/* ── Background Image ── */}
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          className="hero-video"
          src="/assets/video_sample_tequenos.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
        <div className="hero-video-overlay" />
      </div>

       {/* ── Content ── */}
      <div className="home-inner">

        <div className="home-copy">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true" />
            {t('home.eyebrow')}
          </div>
          <h1 className="hero-heading">
            {t('home.heading')}{' '}
            <span className="hero-heading-span">{t('home.headingSpan')}</span>{' '}
            <em>{t('home.headingEm')}</em>
          </h1>
          <p className="hero-body">{t('home.body')}</p>
          <div className="cta-row">
            <Link to="/products" className="btn-ph btn-ph-primary" onClick={() => trackCTAClick('hero-catalogue')}>
              {t('home.ctaSecond')}
            </Link>
            <Link to="/services" className="btn-ph btn-ph-primary" onClick={() => trackCTAClick('hero-services')}>
              {t('home.cta')}
            </Link>
          </div>

          <div className="hero-trust-row" aria-label="Trust signals">
            <span className="hero-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              {t('home.trustB2b')}
            </span>
            <span className="hero-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              {t('home.trustSwiss')}
            </span>
            <span className="hero-trust-item">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="1" y="3" width="15" height="13" rx="2"/><path d="M16 8h4l3 3v5h-7V8z"/>
                <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              {t('home.trustDelivery')}
            </span>
          </div>

        </div>


      </div>
    </section>
  )
}
