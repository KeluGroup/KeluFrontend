import { useTranslation } from 'react-i18next'

const ICONS = [
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
  </svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>,
]

function ServiceCard({ title, icon }) {
  return (
    <div className="ph-card">
      <div className="card-icon-wrap" aria-hidden="true">{icon}</div>
      <div className="ph-card-title">{title}</div>
      <div className="ph-lines">
        <div className="ph-line" /><div className="ph-line" />
        <div className="ph-line short" /><div className="ph-line shorter" />
      </div>
    </div>
  )
}

export default function Services() {
  const { t } = useTranslation()

  const SERVICE_KEYS = ['one', 'two', 'three', 'four']

  return (
    <section id="services" className="section" aria-label="Services">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('services.tag')}</span>
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-sub">{t('services.subtitle')}</p>
        </div>

        <div className="cards-grid">
          {SERVICE_KEYS.map((key, i) => (
            <ServiceCard key={key} title={t(`services.${key}`)} icon={ICONS[i]} />
          ))}
        </div>

        <div className="cta-banner" aria-hidden="true">
          <div className="cta-banner-copy">
            <p className="cta-banner-tag">{t('services.ctaTag')}</p>
            <p className="cta-banner-title">{t('services.ctaTitle')}</p>
          </div>
          <div className="cta-banner-btn">{t('services.ctaBtn')}</div>
        </div>

      </div>
    </section>
  )
}
