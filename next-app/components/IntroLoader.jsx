'use client'

import { useLayoutEffect, useRef, useState } from 'react'

const SESSION_KEY = 'kelu-intro-seen'
const FLY_IN_MS = 1800   // approach: logo descends in from afar, like a plane on final approach
const HOLD_MS = 550      // brief moment "arrived" at the center
const LAND_MS = 1300     // continues its trip, shrinking down onto the real navbar logo (its destination)

export default function IntroLoader() {
  const [phase, setPhase] = useState('flyin') // flyin -> hold -> land -> done
  const logoRef = useRef(null)

  useLayoutEffect(() => {
    let alreadySeen = false
    try { alreadySeen = sessionStorage.getItem(SESSION_KEY) === '1' } catch {}

    if (alreadySeen) {
      setPhase('done')
      return
    }
    try { sessionStorage.setItem(SESSION_KEY, '1') } catch {}

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setPhase('done')
      return
    }

    document.body.classList.add('intro-lock')

    const holdTimer = setTimeout(() => setPhase('hold'), FLY_IN_MS)

    const landTimer = setTimeout(() => {
      const logoEl = logoRef.current
      const targetEl = document.querySelector('.nav-float-logo img')
      if (logoEl) {
        const from = logoEl.getBoundingClientRect()
        let to
        if (targetEl) {
          to = targetEl.getBoundingClientRect()
        } else {
          const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
          to = { left: 1.5 * rootPx, top: 1.25 * rootPx, width: 76, height: 76 }
        }
        const dx = (to.left + to.width / 2) - (from.left + from.width / 2)
        const dy = (to.top + to.height / 2) - (from.top + from.height / 2)
        const scale = to.width / from.width
        logoEl.style.setProperty('--land-x', `${dx}px`)
        logoEl.style.setProperty('--land-y', `${dy}px`)
        logoEl.style.setProperty('--land-scale', scale)
      }
      setPhase('land')
    }, FLY_IN_MS + HOLD_MS)

    const doneTimer = setTimeout(() => {
      setPhase('done')
      document.body.classList.remove('intro-lock')
    }, FLY_IN_MS + HOLD_MS + LAND_MS)

    return () => {
      clearTimeout(holdTimer)
      clearTimeout(landTimer)
      clearTimeout(doneTimer)
      document.body.classList.remove('intro-lock')
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div className={`intro-loader intro-loader--${phase}`} aria-hidden="true">
      <span className="intro-loader-streak intro-loader-streak--1" />
      <span className="intro-loader-streak intro-loader-streak--2" />
      <img ref={logoRef} src="/logo.svg" alt="" className="intro-loader-logo" />
    </div>
  )
}
