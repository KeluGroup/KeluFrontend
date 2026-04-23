import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Team from '../components/Team'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ScrollProgress'

export default function About({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu, scrolled }) {
  const { t } = useTranslation()

  // Scroll to top on mount + set up scroll-animate observer
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

  return (
    <>
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        activeSection=""
        scrolled={scrolled}
        isAboutPage
      />
      <main id="main-content">
        <Team />

        {/* Placeholder for future sections — values, press, milestones, etc. */}
      </main>
      <Footer />
    </>
  )
}
