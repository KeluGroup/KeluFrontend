import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation()

  const STATS = [
    { num: '—', label: t('about.metricA') },
    { num: '—', label: t('about.metricB') },
    { num: '—', label: t('about.metricC') },
  ]

  return (
    <section id="about" className="section" aria-label="About">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('about.tag')}</span>
          <h2 className="section-title">{t('about.title')}</h2>
          <p className="section-sub">{t('about.subtitle')}</p>
        </div>

        <div className="two-col">
          <div className="ph-image" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
            </svg>
            <span>{t('about.imgLabel')}</span>
          </div>

          <div className="text-col">
            <div className="ph-text-block">
              <div className="ph-h" /><div className="ph-l" /><div className="ph-l" /><div className="ph-l short" />
            </div>
            <div className="ph-text-block">
              <div className="ph-h" /><div className="ph-l" /><div className="ph-l" /><div className="ph-l shorter" />
            </div>
            <div className="stats-row">
              {STATS.map((stat, i) => (
                <Fragment key={stat.label}>
                  {i > 0 && <div className="stat-divider" />}
                  <div className="stat">
                    <span className="stat-num">{stat.num}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
