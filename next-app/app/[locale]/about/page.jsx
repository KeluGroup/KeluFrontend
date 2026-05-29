'use client'

import { useEffect } from 'react'
import Team from '../../../components/Team'

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0)

    const nudge = setTimeout(() => {
      window.scrollTo({ top: 1, behavior: 'smooth' })
    }, 300)

    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate, .anim-fade, .anim-right').forEach(el => io.observe(el))
    }, 100)

    return () => { clearTimeout(nudge); clearTimeout(timer); io.disconnect() }
  }, [])

  return (
    <main id="main-content" className="about-page-main">
      <Team />
    </main>
  )
}