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
        // Scroll to the exact top of the section — sections have enough
        // top padding (space-20 ≈ 80px) so content clears the floating logo
        window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [hash, pathname])

  return null
}