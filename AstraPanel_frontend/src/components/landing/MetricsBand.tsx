const METRICS = [
  { value: '5', label: 'Core modules' },
  { value: '1,248', label: 'Transactions / mo' },
  { value: '24', label: 'Report templates' },
  { value: '50+', label: 'Crypto & stocks' },
]

export function MetricsBand() {
  return (
    <section id="analytics" className="section" style={{ paddingTop: 0 }}>
      <div className="landing__container">
        <div className="metrics-band">
          {METRICS.map((m) => (
            <div key={m.label} className="metric-item">
              <div className="metric-item__value">{m.value}</div>
              <div className="metric-item__label">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
