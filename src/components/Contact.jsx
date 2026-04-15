import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { trackCTAClick } from '../utils/analytics'

const EMOJIS = ['🫓', '🌽', '🧀', '🌶️', '🫑', '🥑', '🍋']

function useEmojiRain(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const drops = Array.from({ length: 18 }, () => ({
      x:       Math.random() * canvas.width,
      y:       Math.random() * -canvas.height,
      speed:   0.35 + Math.random() * 0.6,
      size:    16 + Math.random() * 20,
      rot:     Math.random() * Math.PI * 2,
      rotSpd:  (Math.random() - 0.5) * 0.01,
      opacity: 0.07 + Math.random() * 0.12,
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
  }, [canvasRef])
}

export default function Contact() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const canvasRef  = useRef(null)

  useEmojiRain(canvasRef)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('cta-visible') },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section
      id="contact"
      className="cta-final cta-portal contact-merged"
      ref={sectionRef}
      aria-label="Contact"
    >
      {/* Emoji rain */}
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

      <div className="cta-final-inner contact-merged-inner">
        {/* Tag */}
        <span className="contact-merged-tag">{t('contact.tag')}</span>

        {/* Main headline */}
        <h2 className="cta-final-title cta-animated-title">
          {t('ctabanner.title').split(' ').map((word, i) => (
            <span key={i} className="cta-word" style={{ '--word-i': i }}>{word}</span>
          ))}
        </h2>

        {/* Subtitle */}
        <p className="cta-final-desc cta-animated-desc">{t('contact.subtitle')}</p>

        {/* Single CTA */}
        <Link
          to="/contact"
          className="contact-merged-btn"
          onClick={() => trackCTAClick('contact-merged')}
        >
          <span>{t('contact.infoTitle')}</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>
    </section>
  )
}
