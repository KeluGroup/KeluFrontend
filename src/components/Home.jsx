import { useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { trackCTAClick } from '../utils/analytics'
import { useHashSync } from '../hooks/useHashSync'

export default function Home() {
  useHashSync('section[id], .contact-merged[id], .process-section[id]')
  const { t } = useTranslation()
  const videoRef = useRef(null)

  // React SSR/SSG drops the `muted` attribute from the serialised HTML, so
  // browsers block autoplay on the initial page load. Setting muted and
  // calling play() imperatively after hydration restores expected behaviour.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  return (
    <section id="home" className="section hero-section" aria-label="Home">

      {/* ── Background Image ── */}
      <div className="hero-video-wrap" aria-hidden="true">
        <video
          ref={videoRef}
          className="hero-video"
          src="https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/video_sample_tequenos.mp4"
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



        </div>


      </div>
    </section>
  )
}
