import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ProductModal from './ProductModal'

const FEATURES = [
  {
    titleKey: 'solution.feat1title',
    textKey:  'solution.feat1text',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    titleKey: 'solution.feat2title',
    textKey:  'solution.feat2text',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    titleKey: 'solution.feat3title',
    textKey:  'solution.feat3text',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
]

const PRODUCTS = [
  { key:'p1', nameKey:'solution.p1', rotate:'-8deg', delay:0,   color:'#F4A261',
    img:'https://image.pollinations.ai/prompt/arepa%20venezolana%20corn%20flatbread%20close%20up%20food%20photography%20white%20background%20professional%20studio?width=480&height=480&seed=101&nologo=true' },
  { key:'p2', nameKey:'solution.p2', rotate:'6deg',  delay:80,  color:'#FFD166',
    img:'https://image.pollinations.ai/prompt/tequeños%20cheese%20sticks%20venezuelan%20appetizer%20food%20photography%20white%20background%20studio%20crispy?width=480&height=480&seed=202&nologo=true' },
  { key:'p3', nameKey:'solution.p3', rotate:'-5deg', delay:160, color:'#E9C46A',
    img:'https://image.pollinations.ai/prompt/empanada%20colombiana%20fried%20golden%20pastry%20food%20photography%20white%20background%20professional?width=480&height=480&seed=303&nologo=true' },
  { key:'p4', nameKey:'solution.p4', rotate:'9deg',  delay:240, color:'#9B7653',
    img:'https://image.pollinations.ai/prompt/yuca%20frita%20fried%20cassava%20sticks%20latin%20food%20photography%20white%20background%20crispy%20golden?width=480&height=480&seed=404&nologo=true' },
  { key:'p5', nameKey:'solution.p5', rotate:'-7deg', delay:100, color:'#FFB703',
    img:'https://image.pollinations.ai/prompt/platano%20maduro%20sweet%20fried%20ripe%20plantain%20latin%20food%20photography%20white%20background?width=480&height=480&seed=505&nologo=true' },
  { key:'p6', nameKey:'solution.p6', rotate:'5deg',  delay:180, color:'#FAFAFA',
    img:'https://image.pollinations.ai/prompt/queso%20blanco%20latino%20fresh%20white%20cheese%20block%20food%20photography%20white%20background%20professional?width=480&height=480&seed=606&nologo=true' },
  { key:'p7', nameKey:'solution.p7', rotate:'-4deg', delay:260, color:'#06D6A0',
    img:'https://image.pollinations.ai/prompt/guasacaca%20aji%20latin%20american%20sauces%20condiments%20food%20photography%20white%20background%20colorful?width=480&height=480&seed=707&nologo=true' },
  { key:'p8', nameKey:'solution.p8', rotate:'8deg',  delay:340, color:'#FF9F1C',
    img:'https://image.pollinations.ai/prompt/maracuya%20passion%20fruit%20guanabana%20tropical%20fruit%20pulp%20latin%20food%20photography%20white%20background?width=480&height=480&seed=808&nologo=true' },
]

function ProductCard({ product, visible, onClick }) {
  const { t } = useTranslation()
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <button
      className={`showcase-card sol-prod-btn ${visible ? 'showcase-card--visible' : ''}`}
      style={{ '--fall-rotate': product.rotate, '--fall-delay': `${product.delay}ms`, '--card-glow': product.color }}
      onClick={() => onClick(product)}
      aria-label={t(product.nameKey)}
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
    </button>
  )
}

export default function Solution() {
  const { t } = useTranslation()
  const [activeProduct, setActiveProduct] = useState(null)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="solution" className="showcase-section sol-unified" ref={sectionRef} aria-label="Solution">
      <div className="showcase-inner">

        <div className="sol-header">
          <span className="showcase-eyebrow">{t('solution.tag')}</span>
          <h2 className="showcase-title">{t('solution.title')}</h2>
          <p className="showcase-sub">{t('solution.subtitle')}</p>
        </div>

        <div className="sol-combined-grid">

          {/* ── Left: features ── */}
          <div className="sol-features-col">
            <h3 className="sol-content-title">{t('solution.contentTitle')}</h3>
            <div className="sol-features">
              {FEATURES.map((f) => (
                <div key={f.titleKey} className="sol-feature-item">
                  <div className="sol-feature-icon">{f.icon}</div>
                  <div>
                    <h4 className="sol-feature-title">{t(f.titleKey)}</h4>
                    <p className="sol-feature-text">{t(f.textKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: product image grid ── */}
          <div className="sol-products-col">
            <p className="sol-products-hint">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display:'inline',marginRight:'5px',verticalAlign:'middle'}}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {t('solution.productsTitle')} — tap to explore
            </p>
            <div className="showcase-grid sol-prod-grid">
              {PRODUCTS.map((p) => (
                <ProductCard key={p.key} product={p} visible={visible} onClick={setActiveProduct} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </section>
  )
}
