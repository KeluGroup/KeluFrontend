'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Suspense, lazy } from 'react'
import { trackProductView, trackCatalogueRequest, trackCatalogueDownload } from '../../../utils/analytics'
import { useLocale } from '../../../hooks/useLocale' 

const CATALOGUES = [
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
]

const cataloguePath = code => `/catalogues/kelu-catalogue-2026-10-${code}.pdf`

const ProductModal = lazy(() => import('../../../components/ProductModal'))

const PRODUCTS = [
  { key: 'p1', label: 'Arepas',                img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/arepas%204%20variedades.jpg' },
  { key: 'p2', label: 'Tequeños',              img: '/products/tequenos.jpg' },
  { key: 'p3', label: 'Empanadas',             img: '/products/empanada-carne.jpg' },
  { key: 'p4', label: 'Yuca Sticks',           img: '/products/yuca-sticks.webp' },
  { key: 'p5', label: 'Pan de Bono',           img: '/products/pan-de-bono.jpg' },
  { key: 'p6', label: 'Tequeños de Chocolate', img: '/products/tequenos-chocolate.jpg' },
  { key: 'p7', label: 'Pulpas de Fruta',       img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/pulp%20fruits.jpg' },
  { key: 'p8', label: 'Salsas',                img: '/products/salsas.jpg' },
]

function ProductCard({ product, onClick }) {
  const t = useTranslations()
  const label = t(`productStrip.${product.key}`)
  const name  = t(`solution.${product.key}`, { defaultValue: product.label })

  const handleClick = (e) => {
    const rect    = e.currentTarget.getBoundingClientRect()
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
          <span className="product-card-label">{name}</span>
        </div>
      </div>
    </button>
  )
}

export default function ProductsPage() {
  const t = useTranslations()
  const [activeProduct, setActiveProduct] = useState(null)
  const locale = useLocale()
  const catalogueLocale = CATALOGUES.some(item => item.code === locale) ? locale : 'de'

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
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => io.observe(el))
    }, 100)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  return (
    <main className="benefits-main">
      <section className="benefits-section" aria-label="Catalogue">
        <div className="section-inner">
          <div className="section-header scroll-animate">
            <h2 className="section-title">{t('solution.productsTitle')}</h2>
            <p className="section-sub">{t('solution.subtitle')}</p>
          </div>

          <p className="products-hint scroll-animate">
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
              <ProductCard key={p.key} product={p} onClick={setActiveProduct} />
            ))}
          </div>

          <div className="products-section-cta scroll-animate">
            <p className="section-sub">{t('catalogueDownloads.description')}</p>
            {locale === 'it' && <p className="catalogue-language-note">{t('catalogueDownloads.fallback')}</p>}
            <a
              href={cataloguePath(catalogueLocale)}
              className="catalogue-cta-btn"
              download
              hrefLang={catalogueLocale}
              type="application/pdf"
              onClick={() => trackCatalogueDownload(catalogueLocale)}
            >
              {t('catalogueDownloads.download')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" />
              </svg>
            </a>
            <nav className="catalogue-languages" aria-label={t('catalogueDownloads.otherLanguages')}>
              <span>{t('catalogueDownloads.otherLanguages')}</span>
              {CATALOGUES.filter(item => item.code !== catalogueLocale).map(item => (
                <a key={item.code} href={cataloguePath(item.code)} hrefLang={item.code}
                  lang={item.code} download type="application/pdf"
                  onClick={() => trackCatalogueDownload(item.code)}>
                  {item.label}
                </a>
              ))}
            </nav>
            <Link href={`/${locale}/contact`} className="catalogue-quote-link" onClick={trackCatalogueRequest}>
              {t('catalogueDownloads.contact')}
            </Link>
          </div>


        </div>
      </section>

      {activeProduct && (
        <Suspense fallback={null}>
          <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
        </Suspense>
      )}
    </main>
  )
}