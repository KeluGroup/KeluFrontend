import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import ProductModal from './ProductModal'

const FEATURES = [
  {
    titleKey: 'solution.feat1title',
    textKey:  'solution.feat1text',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    titleKey: 'solution.feat3title',
    textKey:  'solution.feat3text',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
      </svg>
    ),
  },
]

const PRODUCTS = [
  { key:'p1', rotate:'-8deg', delay:0,   color:'#F4A261',
    img:'https://image.pollinations.ai/prompt/arepa%20venezolana%20corn%20flatbread%20close%20up%20food%20photography%20white%20background%20professional%20studio?width=480&height=480&seed=101&nologo=true' },
  { key:'p2', rotate:'6deg',  delay:80,  color:'#FFD166',
    img:'https://image.pollinations.ai/prompt/tequeños%20cheese%20sticks%20venezuelan%20appetizer%20food%20photography%20white%20background%20studio%20crispy?width=480&height=480&seed=202&nologo=true' },
  { key:'p3', rotate:'-5deg', delay:160, color:'#E9C46A',
    img:'https://image.pollinations.ai/prompt/empanada%20colombiana%20fried%20golden%20pastry%20food%20photography%20white%20background%20professional?width=480&height=480&seed=303&nologo=true' },
  { key:'p4', rotate:'9deg',  delay:240, color:'#9B7653',
    img:'https://image.pollinations.ai/prompt/yuca%20frita%20fried%20cassava%20sticks%20latin%20food%20photography%20white%20background%20crispy%20golden?width=480&height=480&seed=404&nologo=true' },
  { key:'p5', rotate:'-7deg', delay:100, color:'#FFB703',
    img:'https://image.pollinations.ai/prompt/platano%20maduro%20sweet%20fried%20ripe%20plantain%20latin%20food%20photography%20white%20background?width=480&height=480&seed=505&nologo=true' },
  { key:'p6', rotate:'5deg',  delay:180, color:'#FAFAFA',
    img:'https://image.pollinations.ai/prompt/queso%20blanco%20latino%20fresh%20white%20cheese%20block%20food%20photography%20white%20background%20professional?width=480&height=480&seed=606&nologo=true' },
  { key:'p7', rotate:'-4deg', delay:260, color:'#06D6A0',
    img:'https://image.pollinations.ai/prompt/guasacaca%20aji%20latin%20american%20sauces%20condiments%20food%20photography%20white%20background%20colorful?width=480&height=480&seed=707&nologo=true' },
  { key:'p8', rotate:'8deg',  delay:340, color:'#FF9F1C',
    img:'https://image.pollinations.ai/prompt/maracuya%20passion%20fruit%20guanabana%20tropical%20fruit%20pulp%20latin%20food%20photography%20white%20background?width=480&height=480&seed=808&nologo=true' },
]

function ProductCard({ product, visible, onClick }) {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      className={`product-tag product-tag--photo ${visible ? 'product-tag--visible' : ''}`}
      style={{ '--fall-rotate': product.rotate, '--fall-delay': `${product.delay}ms` }}
      onClick={() => onClick(product)}
      aria-label={t(`solution.${product.key}`)}
    >
      <div className="product-photo-wrap">
        {!loaded && <div className="product-photo-skeleton"><div className="skeleton-shimmer" /></div>}
        <img
          src={product.img}
          alt={t(`solution.${product.key}`)}
          className={`product-photo ${loaded ? 'product-photo--loaded' : ''}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
      </div>
      <span className="product-name">{t(`solution.${product.key}`)}</span>
    </button>
  )
}

export default function Solution() {
  const { t } = useTranslation()
  const [activeProduct, setActiveProduct] = useState(null)
  const [visible, setVisible] = useState(false)
  const visualRef = useRef(null)

  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect() } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section id="solution" className="section" aria-label="Solution">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('solution.tag')}</span>
          <h2 className="section-title">{t('solution.title')}</h2>
          <p className="section-sub">{t('solution.subtitle')}</p>
        </div>

        <div className="solution-grid">

          {/* ── Left: feature text ── */}
          <div className="solution-content">
            <h3 className="solution-content-title">{t('solution.contentTitle')}</h3>
            <div className="solution-features">
              {FEATURES.map((f) => (
                <div key={f.titleKey} className="feature-item scroll-animate">
                  <div className="feature-icon-box" aria-hidden="true">{f.icon}</div>
                  <div>
                    <h4 className="feature-title">{t(f.titleKey)}</h4>
                    <p className="feature-text">{t(f.textKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: dark green panel with product photos ── */}
          <div className="solution-visual scroll-animate" ref={visualRef}>
            <span className="visual-blob visual-blob--1" aria-hidden="true" />
            <span className="visual-blob visual-blob--2" aria-hidden="true" />
            <h3 className="products-title">{t('solution.productsTitle')}</h3>
            <p className="products-hint">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{display:'inline',marginRight:'4px',verticalAlign:'middle'}}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Tap a product to learn more
            </p>
            <div className="products-grid">
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
