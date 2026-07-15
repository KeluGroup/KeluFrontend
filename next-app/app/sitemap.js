const BASE_URL = 'https://www.kelugroup.ch'
const LOCALES = ['es', 'en', 'de', 'fr', 'it']

const PAGES = [
  { path: '',          changeFrequency: 'weekly',  priority: 1.0 },
  { path: '/products', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/services', changeFrequency: 'weekly',  priority: 0.9 },
  { path: '/contact',  changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about',    changeFrequency: 'monthly', priority: 0.7 },
  { path: '/faq',      changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy',  changeFrequency: 'yearly',  priority: 0.2 },
  { path: '/terms',    changeFrequency: 'yearly',  priority: 0.2 },
  { path: '/cookies',  changeFrequency: 'yearly',  priority: 0.2 },
]

export default function sitemap() {
  return PAGES.flatMap(({ path, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      LOCALES.map(l => [l, `${BASE_URL}/${l}${path}`])
    )
    return LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages },
    }))
  })
}
