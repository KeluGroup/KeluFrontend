import I18nSync from '../../components/I18nSync'
import 'flag-icons/css/flag-icons.min.css'



export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  return (
    <I18nSync locale={locale}>
      {children}
    </I18nSync>
  )
}