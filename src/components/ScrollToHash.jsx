import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { hash, pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Skip on initial page load — only scroll when user explicitly navigates to a hash
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (!hash) return

    const timer = setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 80
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [hash, pathname])

  return null
}