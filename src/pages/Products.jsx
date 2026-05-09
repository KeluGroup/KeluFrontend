import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import ProductModal from '../components/ProductModal'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MenuIdeas     from '../components/MenuIdeas'
import ScrollProgress from '../components/ScrollProgress'
import { trackProductView, trackCatalogueRequest } from '../utils/analytics'


/* ── Products data ── */
const PRODUCTS = [
  { key: 'p1', label: 'Arepas',                img: '/products/arepas.png' },
  { key: 'p2', label: 'Tequeños',              img: '/products/tequenos.jpg' },
  { key: 'p3', label: 'Empanadas',             img: '/products/empanada-carne.jpg' },
  { key: 'p4', label: 'Yuca Sticks',           img: '/products/yuca-sticks.webp' },
  { key: 'p5', label: 'Pan de Bono',           img: '/products/pan-de-bono.jpg' },
  { key: 'p6', label: 'Tequeños de Chocolate', img: '/products/tequenos-chocolate.jpg' },
  { key: 'p7', label: 'Pulpas de Fruta',       img: '/products/fruit-pulps.png' },
  { key: 'p8', label: 'Salsas',                img: '/products/salsas.jpg' },
]


/* ── Product card ── */
function ProductCard({ product, onClick }) {
  const { t } = useTranslation()
  const label = t(`productStrip.${product.key}`)

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const originX = (rect.left + rect.width / 2) - window.innerWidth / 2
    const originY = (rect.top + rect.height / 2) - window.innerHeight / 2
    onClick({ ...product, originX, originY })
    trackProductView(product.key, label)
  }

  return (
    <button
      id={`product-${product.key}`}
      className="product-card-btn"
      onClick={handleClick}
      aria-label={label}
    >
      <div className="product-card-img-wrap">
        <img src={product.img} alt={label} className="product-card-img" loading="lazy" />
        <div className="product-card-overlay" aria-hidden="true" />
        <div className="product-card-footer">
          <span className="product-card-label">{label}</span>
        </div>
      </div>
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
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 400)
    } else {
      window.scrollTo(0, 0)
    }
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
              <h2 className="section-title">{t('solution.productsTitle')}</h2>
              <p className="section-sub">{t('solution.subtitle')}</p>
            </div>

            <p className="products-hint scroll-animate" >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Tap a product to learn more
            </p>

            <div className="product-strip-grid scroll-animate">
              {PRODUCTS.map(p => (
                <ProductCard
                  key={p.key}
                  product={p}
                  onClick={setActiveProduct}
                />
              ))}
            </div>

            <div className="products-section-cta scroll-animate">
              <p className="section-sub">{t('productStrip.ctaDesc')}</p>
              <Link to="/contact" className="catalogue-cta-btn" onClick={trackCatalogueRequest}>
                {t('productStrip.ctaButton')}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
            </div>

          </div>
        </section>

        <section>
          <MenuIdeas />
        </section>


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