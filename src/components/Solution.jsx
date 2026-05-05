import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { trackCTAClick } from '../utils/analytics'

const FEATURES = [
  {
    titleKey: 'solution.feat1title',
    textKey:  'solution.feat1text',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
        <line x1="8" y1="18" x2="21" y2="18"/>
        <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
        <line x1="3" y1="18" x2="3.01" y2="18"/>
      </svg>
    ),
  },
  {
    titleKey: 'solution.feat4title',
    textKey:  'solution.feat4text',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    titleKey: 'solution.feat2title',
    textKey:  'solution.feat2text',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    titleKey: 'solution.feat3title',
    textKey:  'solution.feat3text',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
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
        <div className="solution-split">

          {/* ── Left: text column ── */}
          <div className="solution-text-col scroll-animate">
            <span className="section-tag">{t('solution.tag')}</span>
            <h2 className="solution-split-title">{t('solution.title')}</h2>
            <p className="solution-split-sub">{t('solution.subtitle')}</p>

            <ul className="solution-split-features">
              {FEATURES.map(f => (
                <li key={f.titleKey} className="solution-split-feature">
                  <span className="solution-split-feature-icon" aria-hidden="true">
                    {f.icon}
                  </span>
                  <div>
                    <strong className="solution-split-feature-title">{t(f.titleKey)}</strong>
                    <p className="solution-split-feature-text">{t(f.textKey)}</p>
                  </div>
                </li>
              ))}
            </ul>

          </div>

          {/* ── Right: image column ── */}
          <div className="solution-img-col scroll-animate">
            <div className="solution-img-frame">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=900&q=80&auto=format&fit=crop"
                alt=""
                aria-hidden="true"
                className="solution-img-photo"
                loading="lazy"
              />
              <div className="solution-img-overlay" aria-hidden="true" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
