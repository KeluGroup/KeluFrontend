import { useEffect } from 'react'
import { MapContainer, TileLayer, Circle, Marker, Popup, ZoomControl } from 'react-leaflet'
import { useTranslation } from 'react-i18next'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix Leaflet default marker icon broken by bundlers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const ZURICH_CENTER   = [47.3769, 8.5417]
const SWISS_CENTER    = [46.8182, 8.2275]

// Zürich delivery zone (approx 25 km radius = covers the 4 zones)
const ZONE_OPTIONS = {
  color:       '#184F25',
  fillColor:   '#184F25',
  fillOpacity: 0.15,
  weight:      2,
  dashArray:   '6 4',
}

const CITIES = [
  { pos: [47.3769, 8.5417],  name: 'Zürich',     note: '⚡ Active delivery zone', active: true  },
  { pos: [46.9480, 7.4474],  name: 'Bern',        note: 'Expanding soon',          active: false },
  { pos: [47.5596, 7.5886],  name: 'Basel',       note: 'Expanding soon',          active: false },
  { pos: [46.5197, 6.6323],  name: 'Lausanne',    note: 'Future coverage',         active: false },
  { pos: [46.2044, 6.1432],  name: 'Geneva',      note: 'Future coverage',         active: false },
  { pos: [47.0502, 8.3093],  name: 'Lucerne',     note: 'Expanding soon',          active: false },
  { pos: [47.4245, 9.3767],  name: 'St. Gallen',  note: 'Expanding soon',          active: false },
  { pos: [46.0037, 8.9511],  name: 'Lugano',      note: 'Future coverage',         active: false },
]

const createIcon = (active) => L.divIcon({
  className: '',
  html: `<div style="
    width:${active ? 14 : 10}px;
    height:${active ? 14 : 10}px;
    border-radius:50%;
    background:${active ? '#184F25' : '#9DB59F'};
    border:2px solid ${active ? '#fff' : 'rgba(255,255,255,0.5)'};
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  "></div>`,
  iconSize:   [active ? 14 : 10, active ? 14 : 10],
  iconAnchor: [active ? 7 : 5,  active ? 7 : 5],
})

export default function SwissMapModal({ onClose }) {
  const { t } = useTranslation()

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="smap-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Delivery zones map">
      <div className="smap-panel" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="smap-header">
          <div>
            <h2 className="smap-title">{t('deliveryMap.title')}</h2>
            <p className="smap-subtitle">{t('deliveryMap.subtitle')}</p>
          </div>
          <button className="smap-close" onClick={onClose} aria-label="Close map">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Map */}
        <div className="smap-map-wrap">
          <MapContainer
            center={SWISS_CENTER}
            zoom={7}
            zoomControl={false}
            scrollWheelZoom={false}
            style={{ width: '100%', height: '100%' }}
          >
            <ZoomControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Active delivery zone — Zürich */}
            <Circle center={ZURICH_CENTER} radius={28000} pathOptions={ZONE_OPTIONS} />

            {/* City markers */}
            {CITIES.map(city => (
              <Marker key={city.name} position={city.pos} icon={createIcon(city.active)}>
                <Popup className="smap-popup">
                  <strong>{city.name}</strong><br />{city.note}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="smap-legend">
          <div className="smap-legend-item">
            <span className="smap-legend-dot smap-legend-dot--active" />
            <span>{t('deliveryMap.currentLabel')} — {t('deliveryMap.currentDesc')}</span>
          </div>
          <div className="smap-legend-item">
            <span className="smap-legend-dot smap-legend-dot--future" />
            <span>{t('deliveryMap.expandLabel')} — {t('deliveryMap.expandDesc')}</span>
          </div>
        </div>

      </div>
    </div>
  )
}
