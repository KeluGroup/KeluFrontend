import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  function handleCTAClick() {
    console.log('CTA clicked')
  }

  return (
    <section id="home" className="section" aria-label="Home">

      {/* ── Background Video ── */}
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          className="hero-video"
          src="https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/hero-compressed.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
            <a href="#contact" className="btn-ph btn-ph-primary" onClick={handleCTAClick}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              {t('home.cta')}
            </a>
            <div className="btn-ph btn-ph-ghost">{t('home.ctaSecond')}</div>
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
