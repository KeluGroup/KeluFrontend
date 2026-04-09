import { useTranslation } from 'react-i18next'

const STEP_ICONS = [
  /* 1 — schedule */
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
    <line x1="3" y1="10" x2="21" y2="10"/>
    <line x1="8" y1="14" x2="8" y2="14" strokeWidth="3"/><line x1="12" y1="14" x2="12" y2="14" strokeWidth="3"/>
    <line x1="16" y1="14" x2="16" y2="14" strokeWidth="3"/>
  </svg>,
  /* 2 — proposal */
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>,
  /* 3 — first delivery */
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>,
  /* 4 — recurring */
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9"/>
    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
    <polyline points="7 23 3 19 7 15"/>
    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
  </svg>,
]

const STEPS = [1, 2, 3, 4]

export default function Process() {
  const { t } = useTranslation()

  return (
    <section id="process" className="section" aria-label="Process">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('process.tag')}</span>
          <h2 className="section-title">{t('process.title')}</h2>
          <p className="section-sub">{t('process.subtitle')}</p>
        </div>

        <div className="process-timeline">
          {STEPS.map((n, i) => (
            <div key={n} className="process-item scroll-animate">
              <div className="process-number" aria-hidden="true">
                <span className="process-n">{n}</span>
                <span className="process-icon">{STEP_ICONS[i]}</span>
              </div>
              <div className="process-content">
                <h3 className="process-step-title">{t(`process.step${n}title`)}</h3>
                <p className="process-step-desc">{t(`process.step${n}desc`)}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
