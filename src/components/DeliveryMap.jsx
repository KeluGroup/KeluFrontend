import { useTranslation } from 'react-i18next'

const SWISS_PATH =
  'M 168 42 L 240 22 L 300 20 L 355 30 L 398 52 L 435 85 L 455 115 L 450 150 L 420 180 L 375 210 L 355 250 L 330 265 L 295 255 L 265 245 L 248 238 L 228 248 L 205 258 L 175 248 L 148 228 L 115 210 L 85 210 L 55 225 L 30 215 L 28 195 L 50 178 L 72 155 L 88 128 L 100 95 L 130 62 L 155 45 Z'

const CITIES = [
  { id: 'zurich',    label: 'Zürich',    x: 292, y: 70,  current: true  },
  { id: 'bern',      label: 'Bern',      x: 185, y: 112, current: false },
  { id: 'basel',     label: 'Basel',     x: 178, y: 50,  current: false },
  { id: 'lucerne',   label: 'Lucerne',   x: 258, y: 102, current: false },
  { id: 'stgallen',  label: 'St. Gallen',x: 372, y: 62,  current: false },
  { id: 'lugano',    label: 'Lugano',    x: 338, y: 252, current: false },
  { id: 'geneva',    label: 'Geneva',    x: 48,  y: 215, current: false },
]

export default function DeliveryMap() {
  const { t } = useTranslation()

  return (
    <section className="delivery-map-section">
      <div className="section-inner delivery-map-inner">
        <div className="delivery-map-header scroll-animate">
          <span className="section-tag">{t('deliveryMap.tag')}</span>
          <h2 className="section-title">{t('deliveryMap.title')}</h2>
          <p className="section-sub">{t('deliveryMap.subtitle')}</p>
        </div>

        <div className="delivery-map-body scroll-animate">
          <div className="swiss-map-wrap">
            <svg
              viewBox="0 30 470 260"
              className="swiss-map-svg"
              aria-label="Map of Switzerland showing KELU delivery coverage"
              role="img"
            >
              {/* Country fill */}
              <path d={SWISS_PATH} className="swiss-map-country" />

              {/* Zürich delivery zone glow */}
              <circle cx="292" cy="70" r="48" className="swiss-map-zone-ring" />
              <circle cx="292" cy="70" r="34" className="swiss-map-zone" />

              {/* Cities */}
              {CITIES.map(c => (
                <g key={c.id} className={`swiss-map-city ${c.current ? 'swiss-map-city--current' : ''}`}>
                  <circle cx={c.x} cy={c.y} r={c.current ? 6 : 4} />
                  <text x={c.x} y={c.y - 10} textAnchor="middle">{c.label}</text>
                </g>
              ))}
            </svg>
          </div>

          <div className="delivery-map-legend">
            <div className="dml-item dml-item--current">
              <span className="dml-dot dml-dot--current" />
              <div>
                <strong>{t('deliveryMap.currentLabel')}</strong>
                <p>{t('deliveryMap.currentDesc')}</p>
              </div>
            </div>
            <div className="dml-item">
              <span className="dml-dot dml-dot--future" />
              <div>
                <strong>{t('deliveryMap.expandLabel')}</strong>
                <p>{t('deliveryMap.expandDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
