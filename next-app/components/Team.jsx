import { useTranslations } from 'next-intl'

export default function Team() {
  const t = useTranslations()

  return (
    <section id="team" className="section team-section" aria-label="Team">

      {/* ── Story ─────────────────────────────────────────── */}
      <section id="story">
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
                  src="https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/teampic.JPG"
                  alt="Los tres fundadores de KELU frente a Swiss Leaders, Zürich"
                  className="founders-photo"
                  loading="lazy"
                />
              </div>
              <div className="founders-caption">
                <span>{t("team.foundersCaption")}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="story-socials" style={{textAlign:'center',marginTop:'2rem'}}>
          <p style={{fontWeight:600,marginBottom:'.35rem'}}>{t('team.followTitle')}</p>
          <p style={{marginBottom:'1rem'}}>{t('team.followDesc')}</p>
          <div style={{display:'flex',gap:'1.25rem',justifyContent:'center',flexWrap:'wrap'}}>
            <a href="https://www.instagram.com/kelugroup" target="_blank" rel="noopener noreferrer" aria-label="KELU Instagram">Instagram ↗</a>
            <a href="https://www.linkedin.com/in/kelu-gmbh-339753414/" target="_blank" rel="noopener noreferrer" aria-label="KELU LinkedIn">LinkedIn ↗</a>
          </div>
        </div>
      </section>

    </section>
  )
}
