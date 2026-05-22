import  { SECTIONS } from '../config'

const sections = SECTIONS

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function SideDots({ activeSection }) {
  return (
    <nav className="side-dots" aria-label="Section navigation">
      {sections.map(id => (
        <button
          key={id}
          className={['side-dot', activeSection === id ? 'active' : ''].join(' ')}
          data-section={id}
          aria-label={`Go to ${id.charAt(0).toUpperCase() + id.slice(1)}`}
          onClick={() => scrollTo(id)}
        />
      ))}
    </nav>
  )
}
