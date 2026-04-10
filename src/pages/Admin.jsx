import { useState, useEffect, useCallback } from 'react'

const API_BASE   = import.meta.env.VITE_API_BASE ?? ''
const API_KEY    = import.meta.env.VITE_API_KEY  ?? ''
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS ?? 'kelu-admin'
const SESSION_KEY = 'kelu_admin_auth'

const STATUSES = [
  { value: 'Nuevo',       label: 'Nuevo',       color: '#6b7280' },
  { value: 'Contactado',  label: 'Contactado',  color: '#3b82f6' },
  { value: 'En proceso',  label: 'En proceso',  color: '#f59e0b' },
  { value: 'Atendido',    label: 'Atendido',    color: '#22c55e' },
]

function statusMeta(value) {
  return STATUSES.find(s => s.value === value) ?? STATUSES[0]
}

function fmt(iso) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('es-CH', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

/* ── Password gate ── */
function PasswordGate({ onAuth }) {
  const [val, setVal] = useState('')
  const [err, setErr] = useState(false)

  function submit(e) {
    e.preventDefault()
    if (val === ADMIN_PASS) { sessionStorage.setItem(SESSION_KEY, '1'); onAuth() }
    else { setErr(true); setVal('') }
  }

  return (
    <div className="admin-gate">
      <div className="admin-gate-card">
        <div className="admin-gate-logo">
          <img src="/logo.svg" alt="Kelu" width="40" height="40" />
          <span>Admin</span>
        </div>
        <form onSubmit={submit}>
          <input
            type="password"
            className={`admin-gate-input${err ? ' admin-gate-input--err' : ''}`}
            placeholder="Contraseña"
            value={val}
            autoFocus
            onChange={e => { setVal(e.target.value); setErr(false) }}
          />
          {err && <p className="admin-gate-err">Contraseña incorrecta</p>}
          <button type="submit" className="admin-gate-btn">Entrar</button>
        </form>
      </div>
    </div>
  )
}

/* ── Status dropdown ── */
function StatusSelect({ lead, onUpdate }) {
  const [open, setOpen]   = useState(false)
  const [busy, setBusy]   = useState(false)
  const meta = statusMeta(lead.status)

  async function pick(value) {
    if (value === lead.status) { setOpen(false); return }
    setBusy(true); setOpen(false)
    try {
      const res = await fetch(`${API_BASE}/api/admin/leads/${lead.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-api-key': API_KEY },
        body: JSON.stringify({ status: value }),
      })
      if (!res.ok) throw new Error()
      onUpdate(lead.id, value)
    } catch {
      alert('No se pudo actualizar el estado.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="status-wrap" style={{ '--status-color': meta.color }}>
      <button
        className={`status-badge${busy ? ' status-badge--busy' : ''}`}
        onClick={() => setOpen(o => !o)}
        disabled={busy}
      >
        <span className="status-dot" />
        {busy ? '…' : meta.label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <>
          <div className="status-backdrop" onClick={() => setOpen(false)} />
          <ul className="status-menu">
            {STATUSES.map(s => (
              <li
                key={s.value}
                className={`status-option${s.value === lead.status ? ' status-option--active' : ''}`}
                style={{ '--opt-color': s.color }}
                onClick={() => pick(s.value)}
              >
                <span className="status-dot" />
                {s.label}
              </li>
            ))}
          </ul>
        </>
      )}
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

/* ── Dashboard ── */
function Dashboard() {
  const [leads,   setLeads]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [search,  setSearch]  = useState('')
  const [filter,  setFilter]  = useState('Todos')

  const load = useCallback(async () => {
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API_BASE}/api/admin/leads`, {
        headers: { 'x-api-key': API_KEY },
      })
      if (!res.ok) throw new Error(`Error ${res.status}`)
      const data = await res.json()
      setLeads(data.leads ?? [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  function handleUpdate(id, newStatus) {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l))
  }

  function logout() { sessionStorage.removeItem(SESSION_KEY); window.location.reload() }

  // Counts per status
  const counts = STATUSES.reduce((acc, s) => {
    acc[s.value] = leads.filter(l => (l.status || 'Nuevo') === s.value).length
    return acc
  }, {})

  const filtered = leads.filter(l => {
    const q = search.toLowerCase()
    const matchSearch = (
      l.name.toLowerCase().includes(q) ||
      l.email.toLowerCase().includes(q) ||
      (l.company ?? '').toLowerCase().includes(q)
    )
    const matchFilter = filter === 'Todos' || (l.status || 'Nuevo') === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="admin-wrap">

      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <img src="/logo.svg" alt="Kelu" width="32" height="32" />
          <span>Kelu · Admin</span>
        </div>
        <div className="admin-header-actions">
          <span className="admin-stat-badge">{leads.length} leads</span>
          <button className="admin-refresh-btn" onClick={load} disabled={loading} title="Actualizar">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ animation: loading ? 'adminSpin .8s linear infinite' : 'none' }}>
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
          <button className="admin-logout-btn" onClick={logout}>Salir</button>
        </div>
      </header>

      <div className="admin-body">

        {/* Pipeline summary */}
        <div className="admin-pipeline">
          {STATUSES.map(s => (
            <button
              key={s.value}
              className={`pipeline-chip${filter === s.value ? ' pipeline-chip--active' : ''}`}
              style={{ '--chip-color': s.color }}
              onClick={() => setFilter(f => f === s.value ? 'Todos' : s.value)}
            >
              <span className="pipeline-count">{counts[s.value] ?? 0}</span>
              <span className="pipeline-label">{s.label}</span>
            </button>
          ))}
          {filter !== 'Todos' && (
            <button className="pipeline-clear" onClick={() => setFilter('Todos')}>
              × Todos
            </button>
          )}
        </div>

        {/* Search */}
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
        </div>

        {/* States */}
        {loading && (
          <div className="admin-state">
            <div className="admin-spinner" />
            <p>Cargando leads…</p>
          </div>
        )}
        {!loading && error && (
          <div className="admin-state admin-state--err">
            <p>⚠ {error}</p>
            <button onClick={load}>Reintentar</button>
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="admin-state">
            <p>{search || filter !== 'Todos' ? 'Sin resultados.' : 'Aún no hay leads registrados.'}</p>
          </div>
        )}

        {/* Desktop table */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha y hora</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Empresa</th>
                    <th>Mensaje</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead, i) => (
                    <tr key={lead.id}>
                      <td className="admin-td-idx">{filtered.length - i}</td>
                      <td className="admin-td-date">{fmt(lead.createdAt)}</td>
                      <td><strong>{lead.name}</strong></td>
                      <td>
                        <a href={`mailto:${lead.email}`} className="admin-email-link">
                          {lead.email}
                        </a>
                      </td>
                      <td>{lead.company || <span className="admin-empty">—</span>}</td>
                      <td className="admin-td-msg">{lead.message || <span className="admin-empty">—</span>}</td>
                      <td>
                        <StatusSelect lead={lead} onUpdate={handleUpdate} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="admin-cards">
              {filtered.map((lead, i) => (
                <LeadCard key={lead.id} lead={lead} idx={filtered.length - i} onUpdate={handleUpdate} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(SESSION_KEY) === '1')
  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />
  return <Dashboard />
}
