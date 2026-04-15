import { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

const API_BASE    = import.meta.env.VITE_API_BASE ?? ''
const SESSION_KEY = 'kelu_admin_token'

const STATUSES = [
  { value: 'Nuevo',      label: 'Nuevo',      color: '#6b7280' },
  { value: 'Contactado', label: 'Contactado', color: '#3b82f6' },
  { value: 'En proceso', label: 'En proceso', color: '#f59e0b' },
  { value: 'Atendido',   label: 'Atendido',   color: '#22c55e' },
]


const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
)
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

function statusMeta(v) { return STATUSES.find(s => s.value === v) ?? STATUSES[0] }

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-CH', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function adminHeaders() {
  return {
    'Content-Type':  'application/json',
    'x-admin-token': sessionStorage.getItem(SESSION_KEY) ?? '',
  }
}


/* ── Password gate ── */
function PasswordGate({ onAuth }) {
  const [val,     setVal]     = useState('')
  const [err,     setErr]     = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(e) {
    e.preventDefault()
    if (!val.trim()) return
    setLoading(true); setErr('')
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ password: val }),
      })
      if (res.status === 401) { setErr('Contraseña incorrecta'); setVal(''); return }
      if (!res.ok)            { setErr(`Error del servidor (${res.status})`); return }
      const { token } = await res.json()
      sessionStorage.setItem(SESSION_KEY, token)
      onAuth()
    } catch {
      setErr('No se pudo conectar al servidor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-gate">
      <div className="admin-gate-card">
        <div className="admin-gate-logo">
          <img src="/logo.svg" alt="Kelu" width="56" height="56" />
          <div>
            <div className="admin-gate-brand">Kelu</div>
            <div className="admin-gate-subtitle">Panel de administración</div>
          </div>
        </div>
        <form onSubmit={submit}>
          <input
            type="password"
            className={`admin-gate-input${err ? ' admin-gate-input--err' : ''}`}
            placeholder="Contraseña"
            value={val}
            autoFocus
            disabled={loading}
            onChange={e => { setVal(e.target.value); setErr('') }}
          />
          {err && <p className="admin-gate-err">{err}</p>}
          <button type="submit" className="admin-gate-btn" disabled={loading}>
            {loading ? 'Verificando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}


/* ── Status dropdown (portal-based) ── */
function StatusSelect({ lead, onUpdate }) {
  const [open, setOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [pos,  setPos]  = useState({ top: 0, left: 0, width: 0, upward: false })
  const btnRef          = useRef(null)
  const meta            = statusMeta(lead.status)

  useEffect(() => {
    if (!open || !btnRef.current) return
    const rect       = btnRef.current.getBoundingClientRect()
    const menuHeight = 160
    const spaceBelow = window.innerHeight - rect.bottom
    const upward     = spaceBelow < menuHeight
    setPos({
      top:    upward
                ? rect.top    + window.scrollY - menuHeight - 4
                : rect.bottom + window.scrollY + 4,
      left:   rect.left + window.scrollX,
      width:  rect.width,
      upward,
    })
  }, [open])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    window.addEventListener('scroll', close, true)
    return () => window.removeEventListener('scroll', close, true)
  }, [open])

  async function pick(value) {
    if (value === lead.status) { setOpen(false); return }
    setBusy(true); setOpen(false)
    try {
      const res = await fetch(`${API_BASE}/api/admin/leads/${lead.id}`, {
        method:  'PATCH',
        headers: adminHeaders(),
        body:    JSON.stringify({ status: value }),
      })
      if (!res.ok) throw new Error()
      onUpdate(lead.id, value)
    } catch {
      alert('No se pudo actualizar el estado.')
    } finally {
      setBusy(false)
    }
  }

  const menu = open && createPortal(
    <>
      <div className="status-backdrop" onClick={() => setOpen(false)} />
      <ul className="status-menu" style={{
        position: 'absolute',
        top:      pos.top,
        left:     pos.left,
        minWidth: pos.width,
        zIndex:   9999,
      }}>
        {STATUSES.map(s => (
          <li key={s.value}
            className={`status-option${s.value === lead.status ? ' status-option--active' : ''}`}
            style={{ '--opt-color': s.color }}
            onClick={() => pick(s.value)}>
            <span className="status-dot" />{s.label}
          </li>
        ))}
      </ul>
    </>,
    document.body
  )

  return (
    <div className="status-wrap" style={{ '--status-color': meta.color }}>
      <button
        ref={btnRef}
        className={`status-badge${busy ? ' status-badge--busy' : ''}`}
        onClick={() => setOpen(o => !o)}
        disabled={busy}>
        <span className="status-dot" />
        {busy ? '…' : meta.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          style={{ transform: pos.upward && open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {menu}
    </div>
  )
}


/* ── Mobile card ── */
function LeadCard({ lead, idx, onUpdate }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="admin-card">
      <div className="admin-card-header" onClick={() => setOpen(o => !o)}>
        <span className="admin-card-idx">#{idx}</span>
        <div className="admin-card-info">
          <strong>{lead.name}</strong>
          <span>{lead.email}</span>
        </div>
        <div className="admin-card-right">
          <span className="admin-card-date">{fmt(lead.createdAt)}</span>
          <span className="admin-card-chevron">{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div className="admin-card-body">
          {lead.company && <p><b>Empresa:</b> {lead.company}</p>}
          <p><b>Mensaje:</b> {lead.message || '—'}</p>
          <div style={{ marginTop: '.5rem' }}>
            <StatusSelect lead={lead} onUpdate={onUpdate} />
          </div>
        </div>
      )}
    </div>
  )
}


/* ── Shared Airtable form tab ── */
function AirtableForm({ title, description, src }) {
  return (
    <div className="admin-order-wrap">
      <div className="admin-order-header">
        <h2 className="admin-order-title">{title}</h2>
        <p className="admin-order-sub">{description}</p>
      </div>
      <div className="admin-order-frame">
        <iframe
          src={src}
          frameBorder="0"
          width="100%"
          height="600"
          style={{ background: 'transparent', border: 'none' }}
          title={title}
        />
      </div>
    </div>
  )
}


/* ── Leads tab ── */
function LeadsTab() {
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('Todos')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE}/api/admin/leads`, { headers: adminHeaders() })
      if (res.status === 403) { sessionStorage.removeItem(SESSION_KEY); window.location.reload(); return }
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data = await res.json()
      setLeads(data.leads ?? [])
    } catch (e) { setError(e.message) }
    finally     { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  function handleUpdate(id, newStatus) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
  }

  const counts = STATUSES.reduce((acc, s) => {
    acc[s.value] = leads.filter(l => (l.status || 'Nuevo') === s.value).length
    return acc
  }, {})

  const filtered = leads.filter(l => {
    const q           = search.toLowerCase()
    const matchSearch = l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q) || (l.company ?? '').toLowerCase().includes(q)
    const matchFilter = filter === 'Todos' || (l.status || 'Nuevo') === filter
    return matchSearch && matchFilter
  })

  return (
    <>
      {/* Pipeline filter chips */}
      <div className="admin-pipeline">
        {STATUSES.map(s => (
          <button key={s.value}
            className={`pipeline-chip${filter === s.value ? ' pipeline-chip--active' : ''}`}
            style={{ '--chip-color': s.color }}
            onClick={() => setFilter(f => f === s.value ? 'Todos' : s.value)}>
            <span className="pipeline-count">{counts[s.value] ?? 0}</span>
            <span className="pipeline-label">{s.label}</span>
          </button>
        ))}
        {filter !== 'Todos' && (
          <button className="pipeline-clear" onClick={() => setFilter('Todos')}>× Todos</button>
        )}
      </div>

      {/* Search + Refresh on the same row */}
      <div className="admin-search-row">
        <div className="admin-search-wrap">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="admin-search"
            placeholder="Buscar por nombre, email o empresa…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="admin-refresh-btn" onClick={load} disabled={loading}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: loading ? 'adminSpin .8s linear infinite' : 'none' }}>
            <polyline points="23 4 23 10 17 10"/>
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
          </svg>
          {loading ? 'Cargando…' : 'Actualizar'}
        </button>
      </div>

      {/* States */}
      {loading && <div className="admin-state"><div className="admin-spinner" /><p>Cargando leads…</p></div>}
      {!loading && error && (
        <div className="admin-state admin-state--err">
          <p>⚠ {error}</p><button onClick={load}>Reintentar</button>
        </div>
      )}
      {!loading && !error && filtered.length === 0 && (
        <div className="admin-state">
          <p>{search || filter !== 'Todos' ? 'Sin resultados.' : 'Aún no hay leads registrados.'}</p>
        </div>
      )}

      {/* Table */}
      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr><th>#</th><th>Fecha y hora</th><th>Nombre</th><th>Email</th><th>Empresa</th><th>Mensaje</th><th>Estado</th></tr>
              </thead>
              <tbody>
                {filtered.map((lead, i) => (
                  <tr key={lead.id}>
                    <td className="admin-td-idx">{filtered.length - i}</td>
                    <td className="admin-td-date">{fmt(lead.createdAt)}</td>
                    <td><strong>{lead.name}</strong></td>
                    <td><a href={`mailto:${lead.email}`} className="admin-email-link">{lead.email}</a></td>
                    <td>{lead.company || <span className="admin-empty">—</span>}</td>
                    <td className="admin-td-msg">{lead.message || <span className="admin-empty">—</span>}</td>
                    <td><StatusSelect lead={lead} onUpdate={handleUpdate} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-cards">
            {filtered.map((lead, i) => (
              <LeadCard key={lead.id} lead={lead} idx={filtered.length - i} onUpdate={handleUpdate} />
            ))}
          </div>
        </>
      )}
    </>
  )
}


/* ── Dashboard (3-tab shell) ── */
function Dashboard({ theme, onToggleTheme }) {
  const [tab, setTab] = useState('leads')

  function logout() { sessionStorage.removeItem(SESSION_KEY); window.location.reload() }

  const TABS = [
    {
      id: 'leads',
      label: 'Leads',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      id: 'nuevo-cliente',
      label: 'Nuevo cliente',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
          <line x1="12" y1="14" x2="12" y2="20"/><line x1="9" y1="17" x2="15" y2="17"/>
        </svg>
      ),
    },
    {
      id: 'nueva-orden',
      label: 'Nueva orden',
      icon: (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="12" y1="18" x2="12" y2="12"/>
          <line x1="9"  y1="15" x2="15" y2="15"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="admin-wrap">
      <header className="admin-header">
        <div className="admin-header-brand">
          <img src="/logo.svg" alt="Kelu" width="44" height="44" />
          <div className="admin-header-titles">
            <span className="admin-header-name">Kelu</span>
            <span className="admin-header-sub">Panel de administración</span>
          </div>
        </div>
        <div className="admin-header-actions">
        <button
          className="admin-logout-btn"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          style={{ padding: '0.35rem 0.6rem', display: 'flex', alignItems: 'center' }}
        >
          {theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        </button>
        <button className="admin-logout-btn" onClick={logout}>Salir</button>
      </div>
      </header>

      <nav className="admin-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`admin-tab${tab === t.id ? ' admin-tab--active' : ''}`}
            onClick={() => setTab(t.id)}>
            {t.icon}
            {t.label}
          </button>
        ))}
      </nav>

      <div className="admin-body">
        {tab === 'leads' && <LeadsTab />}
        {tab === 'nuevo-cliente' && (
          <AirtableForm
            title="Nuevo cliente"
            description="Registra un nuevo cliente en Airtable."
            src="https://airtable.com/embed/appeEsPqR4rIsoeyu/pag4wj1jXAH0aEZBo/form"
          />
        )}
        {tab === 'nueva-orden' && (
          <AirtableForm
            title="Nueva orden"
            description="Registra una nueva orden en Airtable."
            src="https://airtable.com/embed/appeEsPqR4rIsoeyu/pagALMRwKTPmXNwrJ/form"
          />
        )}
      </div>
    </div>
  )
}


export default function Admin() {
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem(SESSION_KEY))

  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute('data-theme') ??
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  )

  const toggleTheme = () => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      return next
    })
  }

  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <Dashboard theme={theme} onToggleTheme={toggleTheme} />
}