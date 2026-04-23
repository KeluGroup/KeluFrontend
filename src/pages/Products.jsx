import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Masonry from 'react-masonry-css'

import { BRAND_NAME } from '../config'
import ProductModal from '../components/ProductModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
 


/* ── Products data ── */
const PRODUCTS = [
  { key: 'p1', rotate: '-6deg', delay: 0,   color: '#F4A261', img: 'https://image.pollinations.ai/prompt/arepa%20venezolana%20corn%20flatbread%20close%20up%20food%20photography%20white%20background%20professional%20studio?width=480&height=480&seed=101&nologo=true' },
  { key: 'p2', rotate: '5deg',  delay: 120, color: '#FFD166', img: 'https://image.pollinations.ai/prompt/tequeños%20cheese%20sticks%20venezuelan%20appetizer%20food%20photography%20white%20background%20studio%20crispy?width=480&height=480&seed=202&nologo=true' },
  { key: 'p3', rotate: '-4deg', delay: 127, color: '#E9C46A', img: 'https://image.pollinations.ai/prompt/empanada%20colombiana%20fried%20golden%20pastry%20food%20photography%20white%20background%20professional?width=480&height=480&seed=303&nologo=true' },
  { key: 'p4', rotate: '7deg',  delay: 245, color: '#9B7653', img: 'https://image.pollinations.ai/prompt/yuca%20frita%20fried%20cassava%20sticks%20latin%20food%20photography%20white%20background%20crispy%20golden?width=480&height=480&seed=404&nologo=true' },
  { key: 'p5', rotate: '-5deg', delay: 248, color: '#FFB703', img: 'https://image.pollinations.ai/prompt/platano%20maduro%20sweet%20fried%20ripe%20plantain%20latin%20food%20photography%20white%20background?width=480&height=480&seed=505&nologo=true' },
  { key: 'p6', rotate: '4deg',  delay: 280, color: '#FAFAFA', img: 'https://image.pollinations.ai/prompt/queso%20blanco%20latino%20fresh%20white%20cheese%20block%20food%20photography%20white%20background%20professional?width=480&height=480&seed=606&nologo=true' },
  { key: 'p7', rotate: '-3deg', delay: 400, color: '#06D6A0', img: 'https://image.pollinations.ai/prompt/guasacaca%20aji%20latin%20american%20sauces%20condiments%20food%20photography%20white%20background%20colorful?width=480&height=480&seed=707&nologo=true' },
  { key: 'p8', rotate: '6deg',  delay: 520, color: '#FF9F1C', img: 'https://image.pollinations.ai/prompt/maracuya%20passion%20fruit%20guanabana%20tropical%20fruit%20pulp%20latin%20food%20photography%20white%20background?width=480&height=480&seed=808&nologo=true' },
  { key: 'p9', rotate: '6deg',  delay: 520, color: '#FF9F1C', img: 'https://image.pollinations.ai/prompt/maracuya%20passion%20fruit%20guanabana%20tropical%20fruit%20pulp%20latin%20food%20photography%20white%20background?width=480&height=480&seed=808&nologo=true' },
  { key: 'p10', rotate: '7deg',  delay: 569, color: '#9B7653', img: 'https://image.pollinations.ai/prompt/yuca%20frita%20fried%20cassava%20sticks%20latin%20food%20photography%20white%20background%20crispy%20golden?width=480&height=480&seed=404&nologo=true' },

]

const TIERS = [
  { key: 'tier1', featured: false },
  { key: 'tier2', featured: true },
  { key: 'tier3', featured: false },
]
const FEATURE_COUNT = 5

// Masonry breakpoints (cols per width)
const MASONRY_BREAKPOINTS = {
  default: 5,  // large desktop
  1100: 3,     // tablet / small desktop
  768: 2,      // large phones
  0: 1,        // small phones
}


/* ── Product card ── */
function ProductCard({ product, visible, onClick }) {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      className={`product-tile ${visible ? 'product-tile--visible' : ''}`}
      style={{ '--fall-delay': `${product.delay}ms` }}
      onClick={() => onClick(product)}
      aria-label={t(`solution.${product.key}`)}
    >
      {!loaded && (
        <div className="product-photo-skeleton">
          <div className="skeleton-shimmer" />
        </div>
      )}
      <img
        src={product.img}
        alt={t(`solution.${product.key}`)}
        className={`product-tile-img ${loaded ? 'product-tile-img--loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
      {/* Name only on hover */}
      <span className="product-tile-label">
        {t(`solution.${product.key}`)}
      </span>
    </button>
  )
}


/* ── Main page ── */
export default function Benefits({
  theme,
  onToggleTheme,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
  scrolled,
}) {
  const { t } = useTranslation()
  const [activeProduct, setActiveProduct] = useState(null)
  const [visible, setVisible] = useState(false)
  const visualRef = useRef(null)

  // scroll-animate observer
  useEffect(() => {
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document
        .querySelectorAll('.scroll-animate')
        .forEach(el => io.observe(el))
    }, 100)
    return () => {
      clearTimeout(timer)
      io.disconnect()
    }
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const io = new IntersectionObserver(
      entries =>
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('visible')
        }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document
        .querySelectorAll('.scroll-animate')
        .forEach(el => io.observe(el))
    }, 100)
    return () => {
      clearTimeout(timer)
      io.disconnect()
    }
  }, [])

  // product fall animation
  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

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

      <main className="benefits-main">
        {/* ══ SECTION 1 — Products ══════════════════════════════ */}
        <section className="benefits-section" aria-label="Catalogue">
          <div className="section-inner">
            <div className="section-header scroll-animate">
              <span className="section-tag">{t('solution.tag')}</span>
              <h2 className="section-title">{t('solution.productsTitle')}</h2>
              <p className="section-sub">{t('solution.subtitle')}</p>
            </div>

            <p className="products-hint" >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Tap a product to learn more
            </p>

            <div ref={visualRef}>
              <Masonry
                breakpointCols={MASONRY_BREAKPOINTS}
                className="products-masonry"
                columnClassName="products-masonry-col"
              >
                {PRODUCTS.map(p => (
                  <ProductCard key={p.key} product={p} visible={visible} onClick={setActiveProduct} />
                ))}
              </Masonry>
            </div>

            <div className="catalogue-footer">
              <p className="catalogue-desc">
                {t('solution.ctaDesc')}
              </p>
              <Link to="/contact" className="catalogue-cta-btn">
                {t('solution.ctaButton')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>


          </div>
        </section>

        {/* ── Divider ── */}
        <div className="benefits-divider" aria-hidden="true">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path
              d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
              fill="var(--color-surface)"
            />
          </svg>
        </div>

      </main>

      <Footer />

      {activeProduct && (
        <ProductModal
          product={activeProduct}
          onClose={() => setActiveProduct(null)}
        />
      )}
    </>
  )
}