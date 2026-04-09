import { useTranslation } from 'react-i18next'

const FEATURES = [
  { icon: '📦', titleKey: 'solution.feat1title', textKey: 'solution.feat1text' },
  { icon: '💰', titleKey: 'solution.feat2title', textKey: 'solution.feat2text' },
  { icon: '🚚', titleKey: 'solution.feat3title', textKey: 'solution.feat3text' },
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
