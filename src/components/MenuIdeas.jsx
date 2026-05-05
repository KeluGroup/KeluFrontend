import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const CARDS = [
  { key: 'one',   img: '/products/pan-de-bono.jpg',          tagColor: '#F59E0B' },
  { key: 'two',   img: '/products/tequenos.jpg',             tagColor: 'var(--color-primary)' },
  { key: 'three', img: '/products/tequenos-chocolate.jpg',   tagColor: '#8B5CF6' },
]

export default function MenuIdeas() {
  const { t } = useTranslation()

  return (
    <section className="menu-ideas-section" aria-label="Menu Ideas">
      <div className="section-inner">

        <div className="section-header scroll-animate">
          <span className="section-tag">{t('menuIdeas.tag')}</span>
          <h2 className="section-title">{t('menuIdeas.title')}</h2>
          <p className="section-sub">{t('menuIdeas.sub')}</p>
        </div>

        <div className="menu-ideas-grid">
          {CARDS.map(({ key, img, tagColor }, i) => (
            <div
              key={key}
              className="menu-card scroll-animate"
              style={{ '--card-delay': `${i * 100}ms` }}
            >
              <div className="menu-card-img-wrap">
                <img src={img} alt="" aria-hidden="true" className="menu-card-img" loading="lazy" />
                <div className="menu-card-overlay" aria-hidden="true" />
                <span className="menu-card-tag" style={{ background: tagColor }}>
                  {t(`menuIdeas.${key}tag`)}
                </span>
              </div>
              <div className="menu-card-body">
                <h3 className="menu-card-title">{t(`menuIdeas.${key}title`)}</h3>
                <p className="menu-card-desc">{t(`menuIdeas.${key}desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="menu-ideas-cta scroll-animate">
          <Link to="/contact" className="menu-ideas-cta-btn">
            {t('contact.ctaBtn')}
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
