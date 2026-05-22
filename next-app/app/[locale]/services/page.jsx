'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useLocale } from '../../../hooks/useLocale' 

const SERVICES = [
  {
    key: 'one',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=70&auto=format&fit=crop',
    imgPos: 'center 50%',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    key: 'two',
    img: '/products/catering-spread.jpg',
    imgPos: 'center 50%',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20"/>
        <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>
      </svg>
    ),
  },
  {
    key: 'three',
    img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/events.jpg',
    imgPos: 'center center',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
  },
  {
    key: 'four',
    img: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&q=70&auto=format&fit=crop',
    imgPos: 'center 30%',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"/>
        <line x1="6" y1="17" x2="18" y2="17"/>
      </svg>
    ),
  },
  {
    key: 'five',
    featured: true,
    img: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1200&q=70&auto=format&fit=crop',
    imgPos: 'center 40%',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
]

export default function ServicesPage() {
  const { t } = useTranslation()
  const locale = useLocale() 

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => io.observe(el))
    }, 100)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  return (
    <main className="services-main">

      {/* ══ HERO ═══════════════════════════════════════════════════ */}
      <section className="services-section services-section--header" aria-label="Services header">
        <div className="section-inner">
          <div className="section-header scroll-animate">
            <h1 className="section-title">{t('services.title')}</h1>
            <p className="section-sub">{t('services.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* ══ CARDS ══════════════════════════════════════════════════ */}
      <section className="services-section" aria-label="Our Services">
        <div className="section-inner">
          <div className="services-grid">
            {SERVICES.map((s, i) => {
              if (s.featured) {
                return (
                  <article
                    key={s.key}
                    className="service-card service-card--featured"
                    style={{ '--card-delay': `${i * 90}ms` }}
                  >
                    <div className="service-card-img-wrap service-card-img-wrap--featured">
                      <img src={s.img} alt="" aria-hidden="true" className="service-card-img"
                        style={{ objectPosition: s.imgPos }} loading="lazy" fetchPriority="high" />
                      <div className="service-card-img-overlay" aria-hidden="true" />
                      <div className="service-card-icon-badge">{s.icon}</div>
                    </div>
                    <div className="service-card-body service-card-body--featured">
                      <h2 className="service-card-title">{t(`services.${s.key}`)}</h2>
                      <div className="service-card-detail-inner">
                        {t(`services.${s.key}Detail`).split(' · ').map((item, idx) => (
                          <div key={idx} className="service-detail-item">
                            <span className="service-detail-dot" aria-hidden="true" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                )
              }
              return (
                <article
                  key={s.key}
                  className="service-card"
                  style={{ '--card-delay': `${i * 90}ms` }}
                >
                  <div className="service-card-img-wrap">
                    <img src={s.img} alt="" aria-hidden="true" className="service-card-img"
                      style={{ objectPosition: s.imgPos }} loading="lazy" />
                    <div className="service-card-img-overlay" aria-hidden="true" />
                    <div className="service-card-icon-badge">{s.icon}</div>
                  </div>
                  <div className="service-card-body">
                    <h2 className="service-card-title">{t(`services.${s.key}`)}</h2>
                    <div className="service-card-detail-inner">
                      {t(`services.${s.key}Detail`).split(' · ').map((item, idx) => (
                        <div key={idx} className="service-detail-item">
                          <span className="service-detail-dot" aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="services-section-cta scroll-animate">
            <p className="section-sub">{t('services.ctaDesc')}</p>
            <Link href={`/${locale}/contact`} className="catalogue-cta-btn">
              {t('services.ctaBtn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}