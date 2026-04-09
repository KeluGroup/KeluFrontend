import { useTranslation } from 'react-i18next'

const CARDS = ['card1', 'card2', 'card3', 'card4']

export default function Problem() {
  const { t } = useTranslation()

  return (
    <section id="problem" className="section" aria-label="Problem">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('problem.tag')}</span>
          <h2 className="section-title">{t('problem.title')}</h2>
          <p className="section-sub">{t('problem.subtitle')}</p>
        </div>

        <div className="problem-grid">
          {CARDS.map((key) => (
            <div key={key} className="problem-card scroll-animate">
              <h3 className="problem-card-title">{t(`problem.${key}title`)}</h3>
              <p className="problem-card-text">{t(`problem.${key}text`)}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
