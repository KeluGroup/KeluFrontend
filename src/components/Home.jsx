import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()

  function handleCTAClick() {
    console.log('CTA clicked')
  }

  return (
    <section id="home" className="section" aria-label="Home">
      <div className="home-inner">

        <div className="home-copy">
          <span className="eyebrow">{t('home.eyebrow')}</span>
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

        <div className="home-visual" aria-hidden="true">
          <div className="ph-block ph-hero-main">
            <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
            </svg>
            <span className="ph-block-label">{t('home.heroLabel')}</span>
          </div>
          <div className="ph-mini-row">
            <div className="ph-block ph-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
              </svg>
              <span className="ph-block-label">{t('home.imgLabel')}</span>
            </div>
            <div className="ph-block ph-mini">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
              <span className="ph-block-label">{t('home.contentLabel')}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
