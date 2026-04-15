// src/hooks/useHashSync.js
import { useEffect } from 'react'

export function useHashSync(selector = 'section[id]') {
  useEffect(() => {
    const sections = document.querySelectorAll(selector)
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            history.replaceState(null, '', `#${e.target.id}`)
          }
        })
      },
      { threshold: 0.4, rootMargin: '0px 0px -20% 0px' }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [selector])
}