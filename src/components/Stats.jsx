import { useTranslation } from 'react-i18next'

const STATS = ['stat1', 'stat2', 'stat3', 'stat4']

export default function Stats() {
  const { t } = useTranslation()

  return (
    <section className="stats-section" aria-label="Stats">
      <div className="stats-container">
        {STATS.map((key) => (
          <div key={key} className="stat-item scroll-animate">
            <div className="stat-big-num">{t(`stats.${key}num`)}</div>
            <div className="stat-big-label">{t(`stats.${key}label`)}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
