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
            <div className="founders-photo-wrap">
              <div className="founders-photo-inner">
                <img
                  src="https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/DSC00078.JPG"
                  alt="Los tres fundadores de KELU frente a Swiss Leaders, Zürich"
                  className="founders-photo"
                  loading="lazy"
                />
                <div className="founders-caption">
                  <span>Luis · Andrés · Kevin</span>
                  <span className="founders-caption-sub">Swiss Leaders, Zürich 🇨🇭</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}