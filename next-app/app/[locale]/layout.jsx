import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import ClientShell from '../../components/ClientShell'
import Script from 'next/script'
import 'flag-icons/css/flag-icons.min.css'
import '../globals.css'
import '../modal.css'
import { Lora } from 'next/font/google'

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-lora',
})

export async function generateMetadata({ params }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: 'KELU GmbH' }],
    robots: 'index, follow',
    themeColor: '#1a1a1a',
    metadataBase: new URL('https://www.kelugroup.ch'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'es': '/es',
        'en': '/en',
        'de': '/de',
        'fr': '/fr',
        'it': '/it',
        'x-default': '/de',
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'KELU GmbH',
      url: `https://www.kelugroup.ch/${locale}`,
      title: t('title'),
      description: t('ogDescription'),
      images: [{
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: t('ogImageAlt'),
      }],
      locale: t('ogLocale'),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('twitterDescription'),
      images: ['/og-image.png'],
    },
  }
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'KELU GmbH',
  url: 'https://www.kelugroup.ch',
  logo: 'https://www.kelugroup.ch/logo-color.svg',
  description: 'Distribuidora B2B de productos alimentarios latinoamericanos en Suiza. Arepas, tequeños, empanadas, yuca, plátano maduro y más para restaurantes y negocios en Zúrich.',
  telephone: '+41764653788',
  email: 'info@kelugroup.ch',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Zürich',
    addressCountry: 'CH',
  },
  areaServed: { '@type': 'Country', name: 'Switzerland' },
  sameAs: ['https://www.instagram.com/kelugroup'],
}

const jsonLdBusiness = {
  '@context': 'https://schema.org',
  '@type': 'WholesaleBusiness',
  name: 'KELU GmbH',
  description: 'Proveedor mayorista B2B de alimentos latinoamericanos en Zúrich, Suiza.',
  url: 'https://www.kelugroup.ch',
  telephone: '+41764653788',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Zürich',
    addressCountry: 'CH',
  },
  servesCuisine: 'Latin American',
  priceRange: '$$',
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} className={lora.variable} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBusiness) }}
        />

        {/* Favicons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.fontshare.com" />


        {/* Consent default — must run BEFORE GTM */}
        <Script id="gtm-consent" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage:            'denied',
            analytics_storage:     'denied',
            ad_user_data:          'denied',
            ad_personalization:    'denied',
            functionality_storage: 'denied',
            security_storage:      'granted',
            wait_for_update:        2000
          });
          var saved = localStorage.getItem('kelu-cookie-consent');
          if (saved === 'granted') {
            gtag('consent', 'update', {
              ad_storage:            'denied',
              analytics_storage:     'granted',
              ad_user_data:          'denied',
              ad_personalization:    'denied',
              functionality_storage: 'granted',
              security_storage:      'granted',
            });
          }
        `}</Script>

        {/* GTM */}
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MRP4GB4Z');
        `}</Script>
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MRP4GB4Z"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <NextIntlClientProvider locale={locale} messages={messages}>
          <ClientShell locale={locale}>
            {children}
          </ClientShell>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}