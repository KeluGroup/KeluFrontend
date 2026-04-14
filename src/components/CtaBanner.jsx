import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { trackCTAClick } from '../utils/analytics'

const EMOJIS = ['🫓', '🌽', '🧀', '🫓', '🌶️', '🫓', '🫓']

function useArepaRain(canvasRef, active) {
  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drops = Array.from({ length: 22 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * -canvas.height,
      speed:   0.4 + Math.random() * 0.7,
      size:    18 + Math.random() * 22,
      rot:     Math.random() * Math.PI * 2,
      rotSpd:  (Math.random() - 0.5) * 0.012,
      opacity: 0.08 + Math.random() * 0.14,
      emoji:   EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }))

    let raf
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const d of drops) {
        ctx.save()
        ctx.globalAlpha = d.opacity
        ctx.translate(d.x, d.y)
        ctx.rotate(d.rot)
        ctx.font = `${d.size}px serif`
        ctx.fillText(d.emoji, -d.size / 2, d.size / 2)
        ctx.restore()
        d.y   += d.speed
        d.rot += d.rotSpd
        if (d.y > canvas.height + d.size) {
          d.y = -d.size * 2
          d.x = Math.random() * canvas.width
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, canvasRef])
}

export default function CtaBanner() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)
  const activeRef  = useRef(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('cta-visible')
          activeRef.current = true
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useArepaRain(canvasRef, true)

  return (
    <section className="cta-final cta-portal" ref={sectionRef} aria-label="Call to action">
      <canvas ref={canvasRef} className="arepa-rain-canvas" aria-hidden="true" />

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
        <a href="/contact" className="cta-final-btn cta-portal-btn" onClick={() => trackCTAClick('solution-contact')}>
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
