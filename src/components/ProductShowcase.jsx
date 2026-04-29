import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

// AI-generated product images via Pollinations AI
// Each seed ensures a consistent image on every load
const PRODUCTS = [
  {
    key: 'p1',
    nameKey: 'solution.p1',
    rotate: '-8deg',
    delay: 0,
    img: 'https://image.pollinations.ai/prompt/arepa%20venezolana%20corn%20flatbread%20close%20up%20food%20photography%20white%20background%20professional%20studio?width=480&height=480&seed=101&nologo=true',
    color: '#F4A261',
  },
  {
    key: 'p2',
    nameKey: 'solution.p2',
    rotate: '6deg',
    delay: 80,
    img: 'https://image.pollinations.ai/prompt/tequeños%20cheese%20sticks%20venezuelan%20appetizer%20food%20photography%20white%20background%20studio%20crispy?width=480&height=480&seed=202&nologo=true',
    color: '#FFD166',
  },
  {
    key: 'p3',
    nameKey: 'solution.p3',
    rotate: '-5deg',
    delay: 160,
    img: 'https://image.pollinations.ai/prompt/empanada%20colombiana%20fried%20golden%20pastry%20food%20photography%20white%20background%20professional?width=480&height=480&seed=303&nologo=true',
    color: '#E9C46A',
  },
  {
    key: 'p4',
    nameKey: 'solution.p4',
    rotate: '9deg',
    delay: 240,
    img: 'https://image.pollinations.ai/prompt/yuca%20frita%20fried%20cassava%20sticks%20latin%20food%20photography%20white%20background%20crispy%20golden?width=480&height=480&seed=404&nologo=true',
    color: '#9B7653',
  },
  {
    key: 'p5',
    nameKey: 'solution.p5',
    rotate: '-7deg',
    delay: 100,
    img: 'https://image.pollinations.ai/prompt/platano%20maduro%20sweet%20fried%20ripe%20plantain%20latin%20food%20photography%20white%20background?width=480&height=480&seed=505&nologo=true',
    color: '#FFB703',
  },
  {
    key: 'p6',
    nameKey: 'solution.p6',
    rotate: '5deg',
    delay: 180,
    img: 'https://image.pollinations.ai/prompt/queso%20blanco%20latino%20fresh%20white%20cheese%20block%20food%20photography%20white%20background%20professional?width=480&height=480&seed=606&nologo=true',
    color: '#FAFAFA',
  },
  {
    key: 'p7',
    nameKey: 'solution.p7',
    rotate: '-4deg',
    delay: 260,
    img: 'https://image.pollinations.ai/prompt/guasacaca%20aji%20latin%20american%20sauces%20condiments%20food%20photography%20white%20background%20colorful?width=480&height=480&seed=707&nologo=true',
    color: '#06D6A0',
  },
  {
    key: 'p8',
    nameKey: 'solution.p8',
    rotate: '8deg',
    delay: 340,
    img: 'https://image.pollinations.ai/prompt/maracuya%20passion%20fruit%20guanabana%20tropical%20fruit%20pulp%20latin%20food%20photography%20white%20background?width=480&height=480&seed=808&nologo=true',
    color: '#FF9F1C',
  },
]

function ProductCard({ product, visible, index }) {
  const { t } = useTranslation()
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <div
      id={`showcase-product-${product.key}`}
      className={`showcase-card ${visible ? 'showcase-card--visible' : ''}`}
      style={{
        '--fall-rotate': product.rotate,
        '--fall-delay': `${product.delay}ms`,
        '--card-glow': product.color,
      }}
    >
      <div className="showcase-img-wrap">
        {!imgLoaded && (
          <div className="showcase-img-skeleton" aria-hidden="true">
            <div className="skeleton-shimmer" />
          </div>
        )}
        <img
          src={product.img}
          alt={t(product.nameKey)}
          className={`showcase-img ${imgLoaded ? 'showcase-img--loaded' : ''}`}
          onLoad={() => setImgLoaded(true)}
          loading="lazy"
        />
      </div>
      <p className="showcase-card-name">{t(product.nameKey)}</p>
    </div>
  )
}

export default function ProductShowcase() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const mouseRef = useRef({ x: 0, y: 0 })
  const parallaxRef = useRef(null)

  // Trigger falling animation when section enters viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Mouse-tracking parallax on decorative elements
  useEffect(() => {
    const handleMouse = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
      if (parallaxRef.current) {
        const items = parallaxRef.current.querySelectorAll('[data-parallax]')
        items.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 1
          el.style.transform = `translate(${mouseRef.current.x * speed * 18}px, ${mouseRef.current.y * speed * 14}px)`
        })
      }
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  return (
    <section className="showcase-section" ref={sectionRef} aria-label="Product showcase">
      <div ref={parallaxRef} className="showcase-parallax-layer" aria-hidden="true">
        <span className="showcase-deco showcase-deco--1" data-parallax="0.6">🌿</span>
        <span className="showcase-deco showcase-deco--2" data-parallax="0.9">✦</span>
        <span className="showcase-deco showcase-deco--3" data-parallax="0.4">🌶️</span>
        <span className="showcase-deco showcase-deco--4" data-parallax="1.1">✦</span>
        <span className="showcase-deco showcase-deco--5" data-parallax="0.7">🥑</span>
        <div className="showcase-glow-1" data-parallax="0.3" />
        <div className="showcase-glow-2" data-parallax="0.5" />
      </div>

      <div className="showcase-inner">
        <div className="showcase-header">
          <span className="showcase-eyebrow">{t('solution.productsTitle')}</span>
          <h2 className="showcase-title">
            {t('solution.tag')}
          </h2>
          <p className="showcase-sub">{t('solution.subtitle')}</p>
        </div>

        <div className="showcase-grid">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.key} product={p} visible={visible} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
