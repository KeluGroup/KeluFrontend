import { useTranslation } from 'react-i18next'

const MEMBERS = [
  {
    key: 'kevin',
    initials: 'KG',
    name: 'Kevin García',
    roleKey: 'team.kevinRole',
    areasKey: 'team.kevinAreas',
    color: 'var(--color-primary)',
  },
  {
    key: 'luis',
    initials: 'LP',
    name: 'Luis Pietri',
    roleKey: 'team.luisRole',
    areasKey: 'team.luisAreas',
    color: '#06D6A0',
  },
  {
    key: 'andres',
    initials: 'AM',
    name: 'Andrés Mastrogiacomo',
    roleKey: 'team.andresRole',
    areasKey: 'team.andresAreas',
    color: '#C89B3C',
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

        <div className="team-grid">
          {MEMBERS.map((m) => (
            <div key={m.key} className="team-card scroll-animate" style={{ '--member-color': m.color }}>

              <div className="team-avatar" aria-hidden="true">
                <span className="team-initials">{m.initials}</span>
                <div className="team-avatar-ring" />
              </div>

              <h3 className="team-name">{m.name}</h3>
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
