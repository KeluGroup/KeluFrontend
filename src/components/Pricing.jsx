import { useTranslation } from 'react-i18next'

const TIERS = [
  { key: 'tier1', featured: false },
  { key: 'tier2', featured: true  },
  { key: 'tier3', featured: false },
]

const FEATURE_COUNT = 5

export default function Pricing() {
  const { t } = useTranslation()

  return (
    <section id="pricing" className="section" aria-label="Pricing">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('pricing.tag')}</span>
          <h2 className="section-title">{t('pricing.title')}</h2>
          <p className="section-sub">{t('pricing.subtitle')}</p>
        </div>

        <div className="pricing-grid">
          {TIERS.map(({ key, featured }) => (
            <div key={key} className={`pricing-card scroll-animate${featured ? ' pricing-card--featured' : ''}`}>
              {featured && <div className="pricing-badge">{t('pricing.badge')}</div>}
              <h3 className="tier-name">{t(`pricing.${key}name`)}</h3>
              <div className="tier-threshold">{t(`pricing.${key}threshold`)}</div>
              <p className="tier-period">{t(`pricing.${key}period`)}</p>
              <div className="tier-discount">{t(`pricing.${key}discount`)}</div>
              <ul className="tier-features">
                {Array.from({ length: FEATURE_COUNT }, (_, i) => {
                  const text = t(`pricing.${key}f${i + 1}`, { defaultValue: '' })
                  return text ? <li key={i}>{text}</li> : null
                })}
              </ul>
              <a href="#contact" className="tier-cta">
                {t(`pricing.${key}cta`)}
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
