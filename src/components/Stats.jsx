import { useTranslation } from 'react-i18next'
import { useRef, useState, lazy, Suspense } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SwissMapModal = lazy(() => import('./SwissMapModal'))
const StatModal     = lazy(() => import('./StatModal'))

function parseNumStr(str) {
  const m = String(str).match(/^(\d+)(.*)$/)
  return m ? { num: parseInt(m[1]), suffix: m[2] } : { num: 0, suffix: str }
}

function CountUp({ value }) {
  const [count, setCount]   = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const { num, suffix } = parseNumStr(value)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); io.disconnect() } },
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!started || num === 0) return
    let raf
    const duration = 1800
    const startTime = performance.now()
    const tick = (now) => {
      const t      = Math.min((now - startTime) / duration, 1)
      const eased  = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(eased * num))
      if (t < 1) raf = requestAnimationFrame(tick)
      else        setCount(num)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [started, num])

  return <span ref={ref}>{count}{suffix}</span>
}

const ICONS = [
  /* services / briefcase */
  <svg key="r" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"></path><line x1="12" y1="12" x2="12" y2="12"></line><path d="M2 12h20"></path>
  </svg>,
  /* products / box */
  <svg key="p" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>,
  /* zones / map */
  <svg key="z" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line x1="8" y1="2" x2="8" y2="18"/>
    <line x1="16" y1="6" x2="16" y2="22"/>
  </svg>,
  /* flavor / flame */
  <svg key="d" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
  </svg>,
]

const STATS = ['stat1', 'stat2', 'stat3', 'stat4']

const MODAL_KEY = { stat1: 'services', stat2: 'products', stat4: 'flavor' }
const POPUP_STAT = { services: 'stat1' }
const PRODUCT_CARD_KEYS = { 1: 'p2', 2: 'p4', 3: 'p1' }

export default function Stats() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [mapOpen,   setMapOpen]   = useState(false)
  const [openModal, setOpenModal] = useState(null) // 'services' | 'products' | 'flavor'

  const scrollToProduct = (productKey) => {
    setOpenModal(null)
    navigate('/products#product-' + productKey)
  }

  return (
    <section className="stats-section" aria-label="Stats">
      {/* decorative floating dots */}
      <span className="stats-dot stats-dot--1" aria-hidden="true" />
      <span className="stats-dot stats-dot--2" aria-hidden="true" />
      <span className="stats-dot stats-dot--3" aria-hidden="true" />

      <div className="stats-container">
        {STATS.map((key, i) => {
          const isZones   = key === 'stat3'
          const modalKey  = MODAL_KEY[key]
          return isZones ? (
            <button
              key={key}
              className="stat-item stat-item--clickable scroll-animate"
              onClick={() => setMapOpen(true)}
              aria-label="View delivery zones map"
            >
              <div className="stat-icon-wrap" aria-hidden="true">{ICONS[i]}</div>
              <div className="stat-big-label">{t(`stats.${key}label`)}</div>
              <span className="stat-view-map">{t('stats.statViewMore')}</span>
            </button>
          ) : modalKey ? (
            <button
              key={key}
              className="stat-item stat-item--clickable scroll-animate"
              onClick={() => setOpenModal(modalKey)}
            >
              <div className="stat-icon-wrap" aria-hidden="true">{ICONS[i]}</div>
              <div className="stat-big-label">{t(`stats.${key}label`)}</div>
              <span className="stat-view-map">{t('stats.statViewMore')}</span>
            </button>
          ) : (
            <div key={key} className="stat-item scroll-animate">
              <div className="stat-icon-wrap" aria-hidden="true">{ICONS[i]}</div>
              <div className="stat-big-label">{t(`stats.${key}label`)}</div>
            </div>
          )
        })}
      </div>

      {mapOpen && (
        <Suspense fallback={null}>
          <SwissMapModal onClose={() => setMapOpen(false)} />
        </Suspense>
      )}

      {openModal && (
        <Suspense fallback={null}>
          <StatModal
            title={t(`stats.${openModal}ModalTitle`)}
            subtitle={t(`stats.${openModal}ModalSubtitle`)}
            ariaLabel={t(`stats.${openModal}ModalTitle`)}
            panelClass="smap-panel--stat"
            onClose={() => setOpenModal(null)}
          >
            {openModal === 'flavor' ? (
              <p className="smap-stat-flavor-text">{t('stats.stat4popup')}</p>
            ) : openModal === 'products' ? (
              <ul className="smap-stat-list">
                {[1, 2, 3].map(n => (
                  <li
                    key={n}
                    className="smap-stat-list-item smap-stat-list-item--link"
                    onClick={() => scrollToProduct(PRODUCT_CARD_KEYS[n])}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => e.key === 'Enter' && scrollToProduct(PRODUCT_CARD_KEYS[n])}
                  >
                    <span className="smap-stat-dot" aria-hidden="true" />
                    {t(`stats.stat2popup${n}`)}
                    <span className="smap-stat-arrow" aria-hidden="true">→</span>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="smap-stat-list">
                {[1, 2, 3].map(n => (
                  <li key={n} className="smap-stat-list-item">
                    <span className="smap-stat-dot" aria-hidden="true" />
                    {t(`stats.${POPUP_STAT[openModal]}popup${n}`)}
                  </li>
                ))}
              </ul>
            )}
          </StatModal>
        </Suspense>
      )}
    </section>
  )
}
