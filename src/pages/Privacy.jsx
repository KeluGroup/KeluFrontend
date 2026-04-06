import { useTranslation } from 'react-i18next'
import PageShell from '../components/PageShell'

export default function Privacy({ theme, onToggleTheme }) {
  const { t } = useTranslation()

  return (
    <PageShell theme={theme} onToggleTheme={onToggleTheme} title={t('privacy.title')}>
      <p className="policy-updated">{t('privacy.updated')}</p>
      <h3>{t('privacy.s1title')}</h3><p>{t('privacy.s1body')}</p>
      <h3>{t('privacy.s2title')}</h3><p>{t('privacy.s2body')}</p>
      <h3>{t('privacy.s3title')}</h3><p>{t('privacy.s3body')}</p>
      <h3>{t('privacy.s4title')}</h3><p>{t('privacy.s4body')}</p>
      <h3>{t('privacy.s5title')}</h3>
      <p>
        {t('privacy.s5body')}{' '}
        <a href="/#contact" className="policy-link">{t('privacy.s5link')}</a>.
      </p>
    </PageShell>
  )
}
