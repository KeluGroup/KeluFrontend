import { getTranslations } from 'next-intl/server'

const LOCALES = ['es', 'en', 'de', 'fr', 'it']

// Builds a generateMetadata function for a subpage so each route gets its own
// localized title/description instead of inheriting the generic layout one.
export function buildPageMetadata(path, titleKey, descKey) {
  return async function generateMetadata({ params }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'meta' })

    return {
      title: t(titleKey),
      description: t(descKey),
      alternates: {
        canonical: `/${locale}${path}`,
        languages: {
          ...Object.fromEntries(LOCALES.map(l => [l, `/${l}${path}`])),
          'x-default': `/de${path}`,
        },
      },
      openGraph: {
        title: t(titleKey),
        description: t(descKey),
        url: `https://www.kelugroup.ch/${locale}${path}`,
      },
      twitter: {
        title: t(titleKey),
        description: t(descKey),
      },
    }
  }
}
