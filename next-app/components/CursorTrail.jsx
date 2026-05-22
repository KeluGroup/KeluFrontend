import { useEffect } from 'react'

// Latin food icons — Kelu's identity
const FOODS = ['🫓', '🌽', '🧀', '🥑', '🌶️', '🫔', '🫓', '🫓']

export default function CursorTrail() {
  useEffect(() => {
    // Only on desktop (touch devices skip this)
    if (window.matchMedia('(pointer: coarse)').matches) return

    let lastX = 0
    let lastY = 0
    const MIN_DIST = 38   // px between each spawn
    let frameCount = 0

    function spawnItem(x, y, angle) {
      const food = FOODS[frameCount % FOODS.length]
      frameCount++

      const el = document.createElement('span')
      el.className  = 'cursor-trail-item'
      el.textContent = food

      // Random small extra rotation for organic feel
      const extraRot = (Math.random() - 0.5) * 0.8
      const totalRot = angle + extraRot

      el.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        --rot: ${totalRot}rad;
      `
      document.body.appendChild(el)

      // Trigger animation on next frame
      requestAnimationFrame(() => {
        el.classList.add('cursor-trail-item--out')
      })

      setTimeout(() => el.remove(), 850)
    }

    function onMove(e) {
      const cx = e.clientX
      const cy = e.clientY
      const dx = cx - lastX
      const dy = cy - lastY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < MIN_DIST) return

      const angle = Math.atan2(dy, dx)
      // Use fixed position (viewport coords)
      spawnItem(cx, cy, angle)
      lastX = cx
      lastY = cy
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return null
}
