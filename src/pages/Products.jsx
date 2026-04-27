import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Masonry from 'react-masonry-css'

import { BRAND_NAME } from '../config'
import ProductModal from '../components/ProductModal'
import DeliveryMap from '../components/DeliveryMap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'
import { trackProductView, trackCatalogueRequest } from '../utils/analytics'
 


/* ── Products data ── */
const PRODUCTS = [
  { key: 'p1', label: 'Arepas',                tilt: '-2deg',   delay: 0,   img: '/products/arepas.png',            featured: true },
  { key: 'p2', label: 'Tequeños',              tilt:  '1.5deg', delay: 100, img: '/products/tequenos.jpg' },
  { key: 'p3', label: 'Empanadas',             tilt: '-1deg',   delay: 150, img: '/products/empanada-carne.jpg' },
  { key: 'p4', label: 'Yuca Sticks',           tilt:  '2deg',   delay: 250, img: '/products/yuca-sticks.webp' },
  { key: 'p5', label: 'Pan de Bono',           tilt: '-1.5deg', delay: 350, img: '/products/pan-de-bono.jpg' },
  { key: 'p6', label: 'Tequeños de Chocolate', tilt: '-2deg',   delay: 450, img: '/products/tequenos-chocolate.jpg' },
  { key: 'p7', label: 'Pulpas de Fruta',       tilt:  '1.5deg', delay: 550, img: '/products/fruit-pulps.png' },
  { key: 'p8', label: 'Salsas',                tilt: '-1deg',   delay: 650, img: '/products/empanadas-pollo.jpg' },
]

const TIERS = [
  { key: 'tier1', featured: false },
  { key: 'tier2', featured: true },
  { key: 'tier3', featured: false },
]
const FEATURE_COUNT = 5

// Masonry breakpoints (cols per width)
const MASONRY_BREAKPOINTS = {
  default: 4,  // desktop ancho
  1200: 3,     // desktop normal
  700: 2,      // tablet
  0: 1,        // móvil
}


/* ── Product card ── */
function ProductCard({ product, visible, onClick }) {
  const { t } = useTranslation()
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      className={`product-tile ${visible ? 'product-tile--visible' : ''}${product.featured ? ' product-tile--featured' : ''}`}
      style={{
        '--fall-delay': `${product.delay}ms`,
        '--tile-tilt':  product.tilt,
      }}
      onClick={() => { onClick(product); trackProductView(product.key, product.label) }}
      aria-label={product.label}
    >
      {!loaded && (
        <div className="product-photo-skeleton">
          <div className="skeleton-shimmer" />
        </div>
      )}
      <img
        src={product.img}
        alt={product.label}
        className={`product-tile-img ${loaded ? 'product-tile-img--loaded' : ''}`}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />
      <span className="product-tile-label product-tile-label--always">
        {product.label}
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

          </div>
        </section>

        {/* ══ SECTION 2 — Solicitar presupuesto ══════════════════ */}
        <section className="catalogue-cta-section" aria-label="Solicitar presupuesto">
          <div className="catalogue-cta-inner">
            <p className="catalogue-cta-desc">{t('solution.ctaDesc')}</p>
            <div className="catalogue-cta-actions">
              <Link to="/contact" className="catalogue-cta-btn" onClick={trackCatalogueRequest}>
                {t('solution.ctaButton')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <button className="catalogue-download-btn" title={t('solution.catalogueSoon')} onClick={() => window.location.href='/contact'}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                {t('solution.catalogueBtn')}
              </button>
            </div>
          </div>
        </section>

        {/* ══ SECTION 3 — Mapa de cobertura ══════════════════════ */}
        <DeliveryMap />

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