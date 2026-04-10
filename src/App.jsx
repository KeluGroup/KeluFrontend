import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar    from './components/Navbar'
import SideDots  from './components/SideDots'
import Home      from './components/Home'
import Problem   from './components/Problem'
import Solution  from './components/Solution'
import Pricing   from './components/Pricing'
import Stats     from './components/Stats'
import Process   from './components/Process'
import CtaBanner from './components/CtaBanner'
import Contact   from './components/Contact'
import About     from './pages/About'
import Footer    from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollProgress from './components/ScrollProgress'
import Privacy  from './pages/Privacy'
import Terms    from './pages/Terms'
import ScrollToHash from './components/ScrollToHash'
import CursorTrail  from './components/CursorTrail'
import { SECTIONS } from './config'


function MainLayout({ theme, onToggleTheme, menuOpen, onToggleMenu, onCloseMenu, activeSection, scrolled }) {
  return (
    <>
      <ScrollProgress />
      <Navbar
        theme={theme}
        onToggleTheme={onToggleTheme}
        menuOpen={menuOpen}
        onToggleMenu={onToggleMenu}
        onCloseMenu={onCloseMenu}
        activeSection={activeSection}
        scrolled={scrolled}
      />
      <SideDots activeSection={activeSection} />
      <main id="main-content">
        <Home />
        <Problem />
        <Solution />
        <Pricing />
        <Stats />
        <Process />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}


export default function App() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') ??
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled,      setScrolled]      = useState(false)

  const location = useLocation()

  // Disable browser scroll restoration so reloads always start at the top
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )
    const timer = setTimeout(() => {
      document.querySelectorAll('.scroll-animate').forEach(el => io.observe(el))
    }, 100)
    return () => { clearTimeout(timer); io.disconnect() }
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Re-runs every time the path changes so the IO re-attaches
  // to sections when navigating back to /
  useEffect(() => {
    if (location.pathname !== '/') return

    setActiveSection('home')

    const ids = SECTIONS
    const io  = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { threshold: 0.45 }
    )

    // Small delay so the DOM is ready after React re-renders MainLayout
    const timer = setTimeout(() => {
      ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el) })
    }, 50)

    return () => { clearTimeout(timer); io.disconnect() }
  }, [location.pathname])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleMenu  = () => setMenuOpen(o => !o)
  const closeMenu   = () => setMenuOpen(false)

  const sharedProps = { theme, onToggleTheme: toggleTheme, menuOpen, onToggleMenu: toggleMenu, onCloseMenu: closeMenu, activeSection, scrolled }

  return (
    <>
      <ScrollToHash />
      <CursorTrail />
      <Routes>
        <Route path="/"        element={<MainLayout {...sharedProps} />} />
        <Route path="/about"   element={<About   {...sharedProps} />} />
        <Route path="/privacy" element={<Privacy theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/terms"   element={<Terms   theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
    </>
  )
}