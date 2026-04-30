import { useTranslation } from 'react-i18next'

export default function Team() {
  const { t } = useTranslation()

  return (
    <section id="team" className="section team-section" aria-label="Team">
      <section id="story">
        <p className="story-eyebrow anim-fade">{t('team.title')}</p>
        <div className="story-grid">
          <div className="story-left">
            <h2 className="anim-fade">
              {t('team.storyHeadingLine1')}<br />
              {t('team.storyHeadingConnector')} <em>{t('team.storyHeadingEm')}</em>
            </h2>
            <p className="anim-fade">{t('team.storyP1')}</p>
            <p className="anim-fade">{t('team.storyP2')}</p>
            <p className="anim-fade">{t('team.storyP3')}</p>
          </div>
          <div className="story-right anim-right">
            <div className="founder-cards">
              <div className="founder-card">
                <div className="founder-avatar">L</div>
                <div className="founder-info"><h4>Luis</h4><span>{t('team.founderVenezuela')}</span></div>
              </div>
              <div className="founder-card">
                <div className="founder-avatar">A</div>
                <div className="founder-info"><h4>Andrés</h4><span>{t('team.founderVenezuela')}</span></div>
              </div>
              <div className="founder-card">
                <div className="founder-avatar">K</div>
                <div className="founder-info"><h4>Kevin</h4><span>{t('team.founderColombia')}</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
