import { useTranslation } from 'react-i18next'

// Swap avatar src with professional photos when ready
const MEMBERS = [
  {
    key: 'kevin',
    name: 'Kevin García',
    roleKey: 'team.kevinRole',
    areasKey: 'team.kevinAreas',
    color: 'var(--color-primary)',
    avatar: 'https://i.pravatar.cc/200?img=12',
    flag: '🇨🇴',
  },
  {
    key: 'luis',
    name: 'Luis Pietri',
    roleKey: 'team.luisRole',
    areasKey: 'team.luisAreas',
    color: '#06D6A0',
    avatar: 'https://i.pravatar.cc/200?img=53',
    flag: '🇻🇪',
  },
  {
    key: 'andres',
    name: 'Andrés Mastrogiacomo',
    roleKey: 'team.andresRole',
    areasKey: 'team.andresAreas',
    color: '#C89B3C',
    avatar: 'https://i.pravatar.cc/200?img=68',
    flag: '🇻🇪',
  },
]

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
            {/* Replace this div with <img src="..." alt="The KELU team" className="team-group-img" /> when photo is ready */}
            <div className="team-photo-placeholder" aria-label={t('team.photoLabel')}>
              <div className="team-photo-flags" aria-hidden="true">
                <span>🇨🇴</span><span>🇻🇪</span><span>🇻🇪</span>
              </div>
              <span className="team-photo-label">{t('team.photoLabel')}</span>
            </div>
          </div>
        </div>

        {/* Individual member cards */}
        <div className="team-grid">
          {MEMBERS.map((m) => (
            <div key={m.key} className="team-card scroll-animate" style={{ '--member-color': m.color }}>

              <div className="team-avatar">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="team-avatar-photo"
                  loading="lazy"
                />
                <div className="team-avatar-ring" aria-hidden="true" />
              </div>

              <div className="team-name-row">
                <h3 className="team-name">{m.name}</h3>
                <span className="team-flag" aria-hidden="true">{m.flag}</span>
              </div>
              <p className="team-role-full">{t(m.roleKey)}</p>

              <ul className="team-areas">
                {t(m.areasKey, { returnObjects: true }).map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
