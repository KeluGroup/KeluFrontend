import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

export default function CtaBanner() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('cta-visible') },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="cta-final cta-portal" ref={sectionRef} aria-label="Call to action">

      {/* Portal rings */}
      <div className="portal-rings" aria-hidden="true">
        {[1,2,3,4,5].map(n => (
          <div key={n} className={`portal-ring portal-ring--${n}`} />
        ))}
      </div>

      {/* Floating particles */}
      <div className="cta-particles" aria-hidden="true">
        {['✦','★','◆','✦','★','◆','✦','★'].map((s, i) => (
          <span key={i} className={`cta-particle cta-particle--${i + 1}`}>{s}</span>
        ))}
      </div>

      <div className="cta-final-inner">
        <h2 className="cta-final-title cta-animated-title">
          {t('ctabanner.title').split(' ').map((word, i) => (
            <span key={i} className="cta-word" style={{ '--word-i': i }}>{word}</span>
          ))}
        </h2>
        <p className="cta-final-desc cta-animated-desc">{t('ctabanner.description')}</p>
        <a href="#contact" className="cta-final-btn cta-portal-btn">
          <span className="cta-btn-ripple" aria-hidden="true" />
          {t('ctabanner.button')}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
