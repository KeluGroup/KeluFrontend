import { useTranslation } from 'react-i18next'
import PageShell from '../components/PageShell'

export default function Terms({ theme, onToggleTheme }) {
  const { t } = useTranslation()

  return (
    <PageShell theme={theme} onToggleTheme={onToggleTheme} title={t('terms.title')}>
      <p className="policy-updated">{t('terms.updated')}</p>
      <h3>{t('terms.s1title')}</h3><p>{t('terms.s1body')}</p>
      <h3>{t('terms.s2title')}</h3><p>{t('terms.s2body')}</p>
      <h3>{t('terms.s3title')}</h3><p>{t('terms.s3body')}</p>
      <h3>{t('terms.s4title')}</h3><p>{t('terms.s4body')}</p>
      <h3>{t('terms.s5title')}</h3><p>{t('terms.s5body')}</p>
      <h3>{t('terms.s6title')}</h3>
      <p>
        {t('terms.s6body')}{' '}
        <a href="/#contact" className="policy-link">{t('terms.s6link')}</a>.
      </p>
    </PageShell>
  )
}
