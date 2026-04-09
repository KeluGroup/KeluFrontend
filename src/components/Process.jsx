import { useTranslation } from 'react-i18next'

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
          {STEPS.map((n) => (
            <div key={n} className="process-item scroll-animate">
              <div className="process-number" aria-hidden="true">{n}</div>
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
