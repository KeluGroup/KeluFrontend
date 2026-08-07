'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Suspense, lazy } from 'react'
import { useLocale } from '../../../hooks/useLocale'

const RecipeModal = lazy(() => import('../../../components/RecipeModal'))

const COUNTRY_FLAG = { venezuela: '🇻🇪', colombia: '🇨🇴' }

function RecipeCard({ recipe, onClick, fallIndex }) {
  const t = useTranslations()

  const handleClick = (e) => {
    const rect    = e.currentTarget.getBoundingClientRect()
    const originX = (rect.left + rect.width / 2) - window.innerWidth / 2
    const originY = (rect.top + rect.height / 2) - window.innerHeight / 2
    onClick({ ...recipe, originX, originY })
  }

  const fallStyle = {
    '--fall-delay': `${(fallIndex % 8) * 70}ms`,
    '--fall-rot': `${(fallIndex % 2 === 0 ? -1 : 1) * (3 + (fallIndex % 3) * 2)}deg`,
  }

  return (
    <button
      className="product-card-btn recipe-card-btn recipe-fall-item"
      style={fallStyle}
      onClick={handleClick}
      aria-label={recipe.title}
    >
      <div className="product-card-img-wrap">
        <img src={recipe.img} alt={recipe.title} className="product-card-img" loading="lazy" />
        <div className="product-card-overlay" aria-hidden="true" />
        <span className="menu-card-tag recipe-card-country">
          {COUNTRY_FLAG[recipe.country]} {t(`recetas.country${recipe.country === 'venezuela' ? 'Venezuela' : 'Colombia'}`)}
        </span>
        <div className="product-card-footer recipe-card-footer">
          <span className="product-card-label">{recipe.title}</span>
        </div>
      </div>
    </button>
  )
}

export default function RecetasPage() {
  const t = useTranslations()
  const locale = useLocale()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeRecipe, setActiveRecipe] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetch(`/api/recetas?locale=${locale}`)
      .then(res => res.json())
      .then(data => { if (!cancelled) setRecipes(data.recetas || []) })
      .catch(() => { if (!cancelled) setRecipes([]) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [locale])

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

  const filtered = filter === 'all' ? recipes : recipes.filter(r => r.country === filter)

  return (
    <main className="benefits-main">
      <section className="benefits-section" aria-label="Recipes">
        <div className="section-inner">
          <div className="section-header recetas-hero scroll-animate">
            <div className="recetas-hero-bg" aria-hidden="true" />
            <div className="recetas-hero-content">
              <span className="section-tag recetas-hero-tag">{t('recetas.eyebrow')}</span>
              <h1 className="section-title recetas-hero-title">{t('recetas.pageTitle')}</h1>
              <p className="section-sub recetas-hero-sub">{t('recetas.pageSubtitle')}</p>
            </div>
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

          {!loading && (
            <div className="product-strip-grid recetas-grid" key={filter}>
              {filtered.map((r, i) => (
                <RecipeCard key={r.key} recipe={r} onClick={setActiveRecipe} fallIndex={i} />
              ))}
            </div>
          )}

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
