import { getTranslations } from 'next-intl/server'

// Direct-mail landing for the tasting boxes — kept out of search results
// on purpose: it only makes sense to someone who received a box.
export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    title: t('tastingTitle'),
    description: t('tastingDesc'),
    robots: 'noindex, follow',
  }
}

export default function TastingLayout({ children }) {
  return children
}
