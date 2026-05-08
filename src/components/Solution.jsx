import { useTranslation } from 'react-i18next'

const CARDS = [
  // Pillar cards — with images
  {
    key: 'pillar-one',
    titleKey: 'pillars.onetitle',
    textKey:  'pillars.onetext',
    img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/importred%20from%20the%20source.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
  },
  {
    key: 'pillar-two',
    titleKey: 'pillars.twotitle',
    textKey:  'pillars.twotext',
    img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/artesanal.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
  {
    key: 'pillar-three',
    titleKey: 'pillars.threetitle',
    textKey:  'pillars.threetext',
    img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/Outsourcing%20Log%C3%ADstico_%20A%20Solu%C3%A7%C3%A3o%20para%20Impulsionar%E2%80%A6.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  // Solution feature cards — image slots empty
  {
    key: 'feat2',
    titleKey: 'solution.feat2title',
    textKey:  'solution.feat2text',
    img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/arepa%20rellena.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    key: 'feat3',
    titleKey: 'solution.feat3title',
    textKey:  'solution.feat3text',
    img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/team.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    key: 'feat4',
    titleKey: 'solution.feat4title',
    textKey:  'solution.feat4text',
    img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/pricing.jpg',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
]

export default function Solution() {
  const { t } = useTranslation()

  return (
    <section id="solution" className="section solution-section" aria-label="Solution">
      <div className="solution-bg" aria-hidden="true" />
      <div className="section-inner">

        <div className="section-header scroll-animate">
          <span className="section-tag">{t('solution.tag')}</span>
          <h2 className="section-title">{t('solution.title')}</h2>
          <p className="section-sub">{t('solution.subtitle')}</p>
        </div>

        <div className="pillars-grid">
          {CARDS.map(({ key, titleKey, textKey, img, icon }, i) => (
            <div
              key={key}
              className="pillar-card scroll-animate"
              style={{ '--card-delay': `${i * 100}ms` }}
            >
              <div className="pillar-card-img-wrap">
                {img && <img src={img} alt="" aria-hidden="true" className="pillar-card-img" loading="lazy" />}
                <div className="pillar-card-overlay" aria-hidden="true" />
              </div>
              <div className="pillar-card-body">
                <div className="pillar-icon" aria-hidden="true">{icon}</div>
                <h3 className="pillar-title">{t(titleKey)}</h3>
                <p className="pillar-text">{t(textKey)}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
