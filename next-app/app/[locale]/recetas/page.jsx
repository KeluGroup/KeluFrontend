'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Suspense, lazy } from 'react'
import { useLocale } from '../../../hooks/useLocale'

const RecipeModal = lazy(() => import('../../../components/RecipeModal'))

const RECIPES = [
  { key: 'tequenos_clasicos',     country: 'venezuela', img: '/products/tequenos.jpg', time: '30 min', difficulty: 'facil' },
  { key: 'arepas_reina_pepiada',  country: 'venezuela', img: 'https://an7cx1vpwwkxwbzr.public.blob.vercel-storage.com/arepas%204%20variedades.jpg', time: '40 min', difficulty: 'media' },
  { key: 'pan_de_bono',           country: 'colombia',  img: '/products/pan-de-bono.jpg', time: '35 min', difficulty: 'media' },
  { key: 'empanadas_carne',       country: 'colombia',  img: '/products/empanada-carne.jpg', time: '50 min', difficulty: 'media' },
  { key: 'cachapas_maiz',         country: 'venezuela', img: 'https://images.unsplash.com/photo-1639929781092-fe59fae895c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', time: '20 min', difficulty: 'facil' },
  { key: 'bunuelos_colombianos',  country: 'colombia',  img: 'https://images.unsplash.com/photo-1708782345356-453fa9ef901e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', time: '35 min', difficulty: 'media' },
  { key: 'pabellon_criollo',      country: 'venezuela', img: 'https://images.unsplash.com/photo-1596069080606-b9cdbd242ff1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', time: '60 min', difficulty: 'dificil' },
  { key: 'arepas_choclo',         country: 'colombia',  img: 'https://images.unsplash.com/photo-1776765828695-ad21c7f27504?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080', time: '25 min', difficulty: 'facil' },
]

const COUNTRY_FLAG = { venezuela: '🇻🇪', colombia: '🇨🇴' }

function RecipeCard({ recipe, onClick }) {
  const t = useTranslations()
  const title  = t(`recetas.${recipe.key}_title`)
  const teaser = t(`recetas.${recipe.key}_teaser`)

  const handleClick = (e) => {
    const rect    = e.currentTarget.getBoundingClientRect()
    const originX = (rect.left + rect.width / 2) - window.innerWidth / 2
    const originY = (rect.top + rect.height / 2) - window.innerHeight / 2
    onClick({ ...recipe, originX, originY })
  }

  return (
    <button className="product-card-btn recipe-card-btn" onClick={handleClick} aria-label={title}>
      <div className="product-card-img-wrap">
        <img src={recipe.img} alt={title} className="product-card-img" loading="lazy" />
        <div className="product-card-overlay" aria-hidden="true" />
        <span className="menu-card-tag recipe-card-country">
          {COUNTRY_FLAG[recipe.country]} {t(`recetas.country${recipe.country === 'venezuela' ? 'Venezuela' : 'Colombia'}`)}
        </span>
        <div className="product-card-footer recipe-card-footer">
          <span className="product-card-label">{title}</span>
          <span className="recipe-card-teaser">{teaser}</span>
        </div>
      </div>
    </button>
  )
}

export default function RecetasPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [activeRecipe, setActiveRecipe] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    window.scrollTo(0, 0)
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => io.observe(el))
    }, 100)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  const filtered = filter === 'all' ? RECIPES : RECIPES.filter(r => r.country === filter)

  return (
    <main className="benefits-main">
      <section className="benefits-section" aria-label="Recipes">
        <div className="section-inner">
          <div className="section-header scroll-animate">
            <span className="section-tag">{t('recetas.eyebrow')}</span>
            <h1 className="section-title">{t('recetas.pageTitle')}</h1>
            <p className="section-sub">{t('recetas.pageSubtitle')}</p>
          </div>

          <div className="recetas-filters scroll-animate">
            <button
              className={`recetas-filter-btn ${filter === 'all' ? 'recetas-filter-btn--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              {t('recetas.filterAll')}
            </button>
            <button
              className={`recetas-filter-btn ${filter === 'venezuela' ? 'recetas-filter-btn--active' : ''}`}
              onClick={() => setFilter('venezuela')}
            >
              🇻🇪 {t('recetas.countryVenezuela')}
            </button>
            <button
              className={`recetas-filter-btn ${filter === 'colombia' ? 'recetas-filter-btn--active' : ''}`}
              onClick={() => setFilter('colombia')}
            >
              🇨🇴 {t('recetas.countryColombia')}
            </button>
          </div>

          <div className="product-strip-grid recetas-grid scroll-animate">
            {filtered.map(r => (
              <RecipeCard key={r.key} recipe={r} onClick={setActiveRecipe} />
            ))}
          </div>

          <div className="products-section-cta scroll-animate">
            <p className="section-sub">{t('recetas.ctaTitle')}</p>
            <Link href={`/${locale}/products`} className="catalogue-cta-btn">
              {t('recetas.ctaBtn')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {activeRecipe && (
        <Suspense fallback={null}>
          <RecipeModal recipe={activeRecipe} onClose={() => setActiveRecipe(null)} />
        </Suspense>
      )}
    </main>
  )
}
