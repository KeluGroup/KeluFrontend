import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const PRODUCTS = [
  { key: 'p1', label: 'Arepas',               img: '/products/arepas.png' },
  { key: 'p2', label: 'Tequeños',             img: '/products/tequenos.jpg' },
  { key: 'p3', label: 'Empanadas',            img: '/products/empanada-carne.jpg' },
  { key: 'p4', label: 'Yuca Sticks',          img: '/products/yuca-sticks.webp' },
  { key: 'p5', label: 'Pan de Bono',          img: '/products/pan-de-bono.jpg' },
  { key: 'p6', label: 'Teq. Chocolate',       img: '/products/tequenos-chocolate.jpg' },
  { key: 'p7', label: 'Pulpas de Fruta',      img: '/products/fruit-pulps.png' },
  { key: 'p8', label: 'Salsas',               img: '/products/salsas.jpg' },
]

export default function ProductStrip() {
  const { t } = useTranslation()

  return (
    <section className="product-strip-section" aria-label="Product catalogue strip">
      <div className="section-inner">

        <div className="section-header scroll-animate">
          <span className="section-tag">{t('productStrip.tag')}</span>
          <h2 className="section-title">{t('productStrip.title')}</h2>
          <p className="section-sub">{t('productStrip.sub')}</p>
        </div>

        <div className="product-strip-grid scroll-animate">
          {PRODUCTS.map(({ key, label, img }) => (
            <Link key={key} to={`/products#product-${key}`} className="product-strip-item">
              <div className="product-strip-img-wrap">
                <img src={img} alt={label} className="product-strip-img" loading="lazy" />
                <div className="product-strip-img-overlay" aria-hidden="true" />
              </div>
              <span className="product-strip-label">{label}</span>
            </Link>
          ))}
        </div>

        <div className="product-strip-footer scroll-animate">
          <Link to="/products" className="product-strip-cta-btn">
            {t('productStrip.cta')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
