import { useTranslation } from 'react-i18next'

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
  { emoji: '🫓', key: 'p1' },
  { emoji: '🧀', key: 'p2' },
  { emoji: '🥟', key: 'p3' },
  { emoji: '🍠', key: 'p4' },
  { emoji: '🍌', key: 'p5' },
  { emoji: '🧀', key: 'p6' },
  { emoji: '🌶️', key: 'p7' },
  { emoji: '🥭', key: 'p8' },
]

export default function Solution() {
  const { t } = useTranslation()

  return (
    <section id="solution" className="section" aria-label="Solution">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('solution.tag')}</span>
          <h2 className="section-title">{t('solution.title')}</h2>
          <p className="section-sub">{t('solution.subtitle')}</p>
        </div>

        <div className="solution-grid">

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

          <div className="solution-visual scroll-animate">
            {/* decorative circles inside the visual panel */}
            <span className="visual-blob visual-blob--1" aria-hidden="true" />
            <span className="visual-blob visual-blob--2" aria-hidden="true" />
            <h3 className="products-title">{t('solution.productsTitle')}</h3>
            <div className="products-grid">
              {PRODUCTS.map((p) => (
                <div key={p.key} className="product-tag">
                  <span className="product-emoji" aria-hidden="true">{p.emoji}</span>
                  <span className="product-name">{t(`solution.${p.key}`)}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
