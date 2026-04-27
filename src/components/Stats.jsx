import { useTranslation } from 'react-i18next'
import { useEffect, useRef, useState, lazy, Suspense } from 'react'

const SwissMapModal = lazy(() => import('./SwissMapModal'))

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
  /* restaurants */
  <svg key="r" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11l19-9-9 19-2-8-8-2z"/>
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
  /* days / clock */
  <svg key="d" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>,
]

const STATS = ['stat1', 'stat2', 'stat3', 'stat4']

export default function Stats() {
  const { t } = useTranslation()
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <section className="stats-section" aria-label="Stats">
      {/* decorative floating dots */}
      <span className="stats-dot stats-dot--1" aria-hidden="true" />
      <span className="stats-dot stats-dot--2" aria-hidden="true" />
      <span className="stats-dot stats-dot--3" aria-hidden="true" />

      <div className="stats-container">
        {STATS.map((key, i) => {
          const isZones = key === 'stat3'
          return isZones ? (
            <button
              key={key}
              className="stat-item stat-item--clickable scroll-animate"
              onClick={() => setMapOpen(true)}
              aria-label="View delivery zones map"
            >
              <div className="stat-icon-wrap" aria-hidden="true">{ICONS[i]}</div>
              <div className="stat-big-num"><CountUp value={t(`stats.${key}num`)} /></div>
              <div className="stat-big-label">{t(`stats.${key}label`)}</div>
              <span className="stat-view-map">View map →</span>
            </button>
          ) : (
            <div key={key} className="stat-item scroll-animate">
              <div className="stat-icon-wrap" aria-hidden="true">{ICONS[i]}</div>
              <div className="stat-big-num"><CountUp value={t(`stats.${key}num`)} /></div>
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

      {/* Trust strip */}
      <div className="stats-trust-strip">
        {['Zürich zones covered', 'On-time delivery', 'Fixed weekly routes', 'Zero hidden fees'].map((label) => (
          <div key={label} className="stats-trust-item">
            <span className="stats-trust-check">✓</span>
            {label}
          </div>
        ))}
      </div>
    </section>
  )
}
