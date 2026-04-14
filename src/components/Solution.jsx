import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { trackCTAClick } from '../utils/analytics'

/* ── Problem side (mirrors Problem.jsx cards) ── */
const PROBLEMS = [
  {
    key: 'card1',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    key: 'card2',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <line x1="18" y1="8" x2="23" y2="13"/><line x1="23" y1="8" x2="18" y2="13"/>
      </svg>
    ),
  },
  {
    key: 'card3',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23"/>
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
  },
  {
    key: 'card4',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4l3 3v5h-7V8z"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
]

/* ── Solution side (4 features matching the 4 problems 1-to-1) ── */
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
    titleKey: 'solution.feat4title',
    textKey:  'solution.feat4text',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
)
const CrossIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
)

export default function Solution() {
  const { t } = useTranslation()

  return (
    <section id="solution" className="section solution-section" aria-label="Solution">

      {/* Subtle background image */}
      <div className="solution-bg" aria-hidden="true" />

      <div className="section-inner">

        {/* ── Header ── */}
        <div className="section-header scroll-animate">
          <span className="section-tag">{t('solution.tag')}</span>
          <h2 className="section-title">{t('solution.title')}</h2>
          <p className="section-sub">{t('solution.subtitle')}</p>
        </div>

        {/* ── Before / After comparison panel ── */}
        <div className="solution-compare scroll-animate">

          {/* WITHOUT KeLu */}
          <div className="compare-col compare-col--before">
            <div className="compare-col-label compare-col-label--before">
              <span className="compare-badge compare-badge--before">
                <CrossIcon /> {t('solution.compareBeforeLabel')}
              </span>
            </div>
            <ul className="compare-list">
              {PROBLEMS.map(({ key, icon }) => (
                <li key={key} className="compare-item compare-item--bad">
                  <span className="compare-item-icon" aria-hidden="true">{icon}</span>
                  <span>{t(`problem.${key}title`)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Arrow divider */}
          <div className="compare-divider" aria-hidden="true">
            <div className="compare-arrow-wrap">
              <ArrowIcon />
            </div>
          </div>

          {/* WITH KeLu */}
          <div className="compare-col compare-col--after">
            <div className="compare-col-label compare-col-label--after">
              <span className="compare-badge compare-badge--after">
                <CheckIcon /> {t('solution.compareAfterLabel')}
              </span>
            </div>
            <ul className="compare-list">
              {FEATURES.map(({ titleKey }) => (
                <li key={titleKey} className="compare-item compare-item--good">
                  <span className="compare-item-check" aria-hidden="true"><CheckIcon /></span>
                  <span>{t(titleKey)}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* ── Feature detail cards ── */}
        <div className="solution-features-grid">
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

        {/* ── CTA row ── */}
        <div className="solution-cta-row scroll-animate">
          <Link to="/contact" className="btn-ph btn-ph-primary" onClick={() => trackCTAClick ('solution-contact')}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
            {t('solution.ctaSchedule')}
          </Link>
          <Link to="/benefits" className="btn-ph btn-ph-ghost" onClick={() => trackCTAClick ('solution-catalogue')}>
            {t('solution.ctaCatalogue')}
          </Link>
        </div>

      </div>
    </section>
  )
}
