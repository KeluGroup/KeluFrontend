import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import { fetchUnsplashPhoto } from '../utils/unsplash'

const ChevronIcon = ({ open }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true"
    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.28s ease' }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
)

const SERVICE_QUERIES = {
  one:   'zurich outdoor market switzerland street vendors fresh food',
  two:   'catering buffet elegant service food table professional',
  three: 'food festival pop-up outdoor gastronomy street food event',
  four:  'business consulting meeting professional strategy office',
}

const SERVICES = [
  {
    key: 'one',
    img: '/products/latin-food.jpg',
    imgPos: 'center 40%',
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
    img: '/products/tequenos.jpg',
    imgPos: 'center 35%',
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
    img: '/products/empanadas-pollo.jpg',
    imgPos: 'center 50%',
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
    img: '/products/salsas.jpg',
    imgPos: 'center 45%',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
]

export default function Services({
  theme,
  onToggleTheme,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  scrolled,
}) {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState(null)
  const [cardImgs, setCardImgs] = useState({})

  useEffect(() => {
    Promise.all(
      Object.entries(SERVICE_QUERIES).map(async ([key, query]) => {
        const url = await fetchUnsplashPhoto(query)
        return [key, url]
      })
    ).then(entries => {
      const imgs = Object.fromEntries(entries.filter(([, url]) => url))
      if (Object.keys(imgs).length > 0) setCardImgs(imgs)
    })
  }, [])

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

  const toggle = (key) => setOpenId(prev => prev === key ? null : key)

  return (
    <>
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        activeSection=""
        scrolled={scrolled}
        isAboutPage
      />

      <main className="services-main">

        {/* ══ HERO ════════════════════════════════════════════════════ */}
        <section className="services-hero" aria-label="Services hero">
          <img
            src="/products/latin-food.jpg"
            alt="Comida Latina KELU"
            className="services-hero-img"
          />
          <div className="services-hero-overlay" aria-hidden="true" />
          <div className="services-hero-content">
            <span className="services-hero-tag">{t('services.tag')}</span>
            <h1 className="services-hero-title">{t('services.title')}</h1>
            <p className="services-hero-sub">{t('services.subtitle')}</p>
          </div>
        </section>

        {/* ══ CARDS ═══════════════════════════════════════════════════ */}
        <section className="services-section" aria-label="Our Services">
          <div className="section-inner">
            <div className="services-grid">
              {SERVICES.map((s, i) => {
                const isOpen = openId === s.key
                return (
                  <article
                    key={s.key}
                    className={`service-tile${isOpen ? ' service-tile--open' : ''}`}
                    style={{ '--card-delay': `${i * 90}ms` }}
                  >
                    {/* ── Image — same visual as product-tile ── */}
                    <button
                      className="service-tile-top"
                      onClick={() => toggle(s.key)}
                      aria-expanded={isOpen}
                      aria-label={t(`services.${s.key}`)}
                    >
                      <img
                        src={cardImgs[s.key] || s.img}
                        alt=""
                        aria-hidden="true"
                        className="service-tile-img"
                        style={{ objectPosition: s.imgPos }}
                        loading="lazy"
                      />
                      <div className="service-tile-overlay" aria-hidden="true" />
                      <div className="service-tile-label">
                        <span className="service-tile-icon" aria-hidden="true">{s.icon}</span>
                        <h2 className="service-tile-name">{t(`services.${s.key}`)}</h2>
                      </div>
                    </button>

                    {/* ── Expandable body ── */}
                    <div
                      className={`service-tile-body${isOpen ? ' service-tile-body--open' : ''}`}
                      aria-hidden={!isOpen}
                    >
                      <div className="service-tile-body-inner">
                        <p className="service-tile-desc">{t(`services.${s.key}Desc`)}</p>
                        <div className="service-tile-details">
                          {t(`services.${s.key}Detail`).split(' · ').map((item, idx) => (
                            <div key={idx} className="service-detail-item">
                              <span className="service-detail-dot" aria-hidden="true" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══ CTA ═════════════════════════════════════════════════════ */}
        <section className="services-cta-section" aria-label="Call to action">
          {/* Background image with blur */}
          <img
            src="/products/empanada-carne.jpg"
            alt=""
            aria-hidden="true"
            className="services-cta-bg-img"
          />
          <div className="services-cta-bg-overlay" aria-hidden="true" />

          <div className="services-cta-inner scroll-animate">
            <span className="services-cta-tag">{t('services.ctaTag')}</span>
            <h2 className="services-cta-title">{t('services.ctaTitle')}</h2>
            <p className="services-cta-desc">{t('services.ctaDesc')}</p>
            <Link to="/contact" className="services-cta-btn">
              {t('services.ctaBtn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
