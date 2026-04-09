import { useTranslation } from 'react-i18next'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const MEMBERS = [
  {
    key: 'kevin',
    initials: 'KG',
    name: 'Kevin García',
    role: 'CGCO',
    roleFullKey: 'team.kevinRole',
    areasKey: 'team.kevinAreas',
    color: 'var(--color-primary)',
  },
  {
    key: 'julia',
    initials: 'JE',
    name: 'Julia Ettlin',
    role: 'COSO',
    roleFullKey: 'team.juliaRole',
    areasKey: 'team.juliaAreas',
    color: '#06D6A0',
  },
  {
    key: 'andres',
    initials: 'AM',
    name: 'Andrés Mastrogiacomo',
    role: 'CTO',
    roleFullKey: 'team.andresRole',
    areasKey: 'team.andresAreas',
    color: '#FFD23F',
  },
]

export default function Team() {
  const { t } = useTranslation()

  return (
    <section id="team" className="section" aria-label="Team">
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
              <div className="team-info">
                <p className="team-role-badge">{m.role}</p>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role-full">{t(m.roleFullKey)}</p>
                <ul className="team-areas">
                  {t(m.areasKey, { returnObjects: true }).map((area, i) => (
                    <li key={i}>{area}</li>
                  ))}
                </ul>
              </div>
              <div className="team-socials">
                <a
                  href="https://www.instagram.com/kelugroup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-social-btn"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-social-btn"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
