import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'

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
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=70&auto=format&fit=crop',
    imgPos: 'center 40%',
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
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
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

        {/* ══ HERO — same format as Products page ═════════════════════ */}
        <section className="services-section services-section--header" aria-label="Services header">
          <div className="section-inner">
            <div className="section-header scroll-animate">
              <h1 className="section-title">{t('services.title')}</h1>
              <p className="section-sub">{t('services.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* ══ CARDS ═══════════════════════════════════════════════════ */}
        <section className="services-section" aria-label="Our Services">
          <div className="section-inner">
            <div className="services-grid">
              {SERVICES.map((s, i) => {
                const isOpen = openId === s.key
                if (s.featured) {
                  return (
                    <article
                      key={s.key}
                      className={`service-card service-card--featured${isOpen ? ' service-card--open' : ''}`}
                      style={{ '--card-delay': `${i * 90}ms` }}
                    >
                      <div className="service-card-img-wrap service-card-img-wrap--featured">
                        <img
                          src={s.img}
                          alt=""
                          aria-hidden="true"
                          className="service-card-img"
                          style={{ objectPosition: s.imgPos }}
                          loading="lazy"
                          fetchpriority="high"
                        />
                        <div className="service-card-img-overlay" aria-hidden="true" />
                        <div className="service-card-icon-badge">{s.icon}</div>
                      </div>
                      <div className="service-card-body service-card-body--featured">
                        <span className="service-featured-badge">{t('services.fiveBadge')}</span>
                        <h2 className="service-card-title">{t(`services.${s.key}`)}</h2>
                        <p className="service-card-desc">{t(`services.${s.key}Desc`)}</p>
                        <button
                          className="service-card-toggle"
                          onClick={() => toggle(s.key)}
                          aria-expanded={isOpen}
                        >
                          <span>{t(isOpen ? 'services.collapse' : 'services.expand')}</span>
                          <ChevronIcon open={isOpen} />
                        </button>
                        <div
                          className={`service-card-detail${isOpen ? ' service-card-detail--open' : ''}`}
                          aria-hidden={!isOpen}
                        >
                          <div className="service-card-detail-inner service-card-detail-inner--grid">
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
                }
                return (
                  <article
                    key={s.key}
                    className={`service-card${isOpen ? ' service-card--open' : ''}`}
                    style={{ '--card-delay': `${i * 90}ms` }}
                  >
                    {/* ── Image header ── */}
                    <div className="service-card-img-wrap">
                      <img
                        src={s.img}
                        alt=""
                        aria-hidden="true"
                        className="service-card-img"
                        style={{ objectPosition: s.imgPos }}
                        loading="lazy"
                      />
                      <div className="service-card-img-overlay" aria-hidden="true" />
                      <div className="service-card-icon-badge">{s.icon}</div>
                    </div>

                    {/* ── Body ── */}
                    <div className="service-card-body">
                      <h2 className="service-card-title">{t(`services.${s.key}`)}</h2>
                      <p className="service-card-desc">{t(`services.${s.key}Desc`)}</p>

                      <button
                        className="service-card-toggle"
                        onClick={() => toggle(s.key)}
                        aria-expanded={isOpen}
                      >
                        <span>{t(isOpen ? 'services.collapse' : 'services.expand')}</span>
                        <ChevronIcon open={isOpen} />
                      </button>

                      <div
                        className={`service-card-detail${isOpen ? ' service-card-detail--open' : ''}`}
                        aria-hidden={!isOpen}
                      >
                        <div className="service-card-detail-inner">
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

            <div className="services-section-cta scroll-animate">
              <p className="section-sub">{t('services.ctaDesc')}</p>
              <Link to="/contact" className="catalogue-cta-btn">
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

      <Footer />
    </>
  )
}
