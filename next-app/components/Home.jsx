'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { trackCTAClick } from '../utils/analytics'

export default function Home() {
  const t      = useTranslations()
  const locale = useLocale()

  return (
    <section id="home" className="section" aria-label="Home">

      <div className="hero-video-wrap" aria-hidden="true">
        <video
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
            <Link href={`/${locale}/products`} className="btn-ph btn-ph-primary" onClick={() => trackCTAClick('hero-catalogue')}>
              {t('home.ctaSecond')}
            </Link>
            <Link href={`/${locale}/services`} className="btn-ph btn-ph-primary" onClick={() => trackCTAClick('hero-services')}>
              {t('home.cta')}
            </Link>
            {/* Recipes section hidden (route still live at /:locale/recetas) — restore this link to show it again.
            <Link href={`/${locale}/recetas`} className="btn-ph btn-ph-ghost" onClick={() => trackCTAClick('hero-recetas')}>
              {t('recepts.ctaBtn')}
            </Link>
            */}
          </div>
        </div>
      </div>

    </section>
  )
}