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
        <img
          className="hero-video"
          src="/hero.png"
          alt=""
          fetchPriority="high"
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
            {t('home.heading').replace(t('home.headingEm'), '')}{' '}
            <em>{t('home.headingEm')}</em>
          </h1>
          <p className="hero-body">{t('home.body')}</p>
          <div className="cta-row">
            <Link to="/benefits" className="btn-ph btn-ph-primary" onClick={() => trackCTAClick('hero-catalogue')}>
              {t('home.ctaSecond')}
            </Link>
            <a href="/#process" className="btn-ph btn-ph-primary" onClick={() => trackCTAClick('hero-contact')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              {t('home.cta')}
            </a>
          </div>
          <div className="scroll-cue" aria-hidden="true">
            <span>{t('home.scroll')}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>


      </div>
    </section>
  )
}
