import { useTranslation } from 'react-i18next'

export default function Team() {
  const { t } = useTranslation()

  return (
    <section id="team" className="section team-section" aria-label="Team">
      <div className="section-inner">

        <div className="section-header">
          <span className="section-tag">{t('team.tag')}</span>
          <h2 className="section-title">{t('team.title')}</h2>
          <p className="section-sub">{t('team.subtitle')}</p>
        </div>

        {/* Origin story + group photo */}
        <div className="team-story scroll-animate">
          <div className="team-story-text">
            <span className="team-story-tag">{t('team.storyTag')}</span>
            <h3 className="team-story-title">{t('team.storyTitle')}</h3>
            <p className="team-story-p">{t('team.storyP1')}</p>
            <p className="team-story-p">{t('team.storyP2')}</p>
            <p className="team-story-p team-story-p--em">{t('team.storyP3')}</p>
          </div>
          <div className="team-story-photo">
            {/* Replace with <img src="..." alt="The KELU team" className="team-group-img" /> when photo is ready */}
            <div className="team-photo-placeholder" aria-label={t('team.photoLabel')}>
              <div className="team-photo-flags" aria-hidden="true">
                <span>🇨🇴</span><span>🇻🇪</span><span>🇻🇪</span>
              </div>
              <span className="team-photo-label">{t('team.photoLabel')}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
