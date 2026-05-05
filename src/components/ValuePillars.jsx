import { useTranslation } from 'react-i18next'

const PILLARS = [
  {
    key: 'one',
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=70&auto=format&fit=crop',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    key: 'two',
    img: '/products/arepas.png',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    key: 'three',
    img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=700&q=70&auto=format&fit=crop',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
]

export default function ValuePillars() {
  const { t } = useTranslation()

  return (
    <section className="pillars-section" aria-label="Value Pillars">
      <div className="section-inner">
        <div className="section-header scroll-animate">
          <span className="section-tag">{t('pillars.tag')}</span>
          <h2 className="section-title">{t('pillars.title')}</h2>
          <p className="section-sub">{t('pillars.sub')}</p>
        </div>
        <div className="pillars-grid">
          {PILLARS.map(({ key, icon, img }, i) => (
            <div
              key={key}
              className="pillar-card scroll-animate"
              style={{ '--card-delay': `${i * 100}ms` }}
            >
              <div className="pillar-card-img-wrap">
                <img src={img} alt="" aria-hidden="true" className="pillar-card-img" loading="lazy" />
                <div className="pillar-card-overlay" aria-hidden="true" />
              </div>
              <div className="pillar-card-body">
                <div className="pillar-icon" aria-hidden="true">{icon}</div>
                <h3 className="pillar-title">{t(`pillars.${key}title`)}</h3>
                <p className="pillar-text">{t(`pillars.${key}text`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
