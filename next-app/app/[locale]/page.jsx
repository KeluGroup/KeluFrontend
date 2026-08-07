'use client'
import Navbar          from '../../components/Navbar'
import Home            from '../../components/Home'
import Solution        from '../../components/Solution'
import Process         from '../../components/Process'
import Contact         from '../../components/Contact'
import Footer          from '../../components/Footer'

export default function HomePage({ params }) {
  return (
    <>
      
      <main id="main-content">
        <Home />
        <Solution />
        <Process />
        <Contact />
      </main>
    </>
  )
}