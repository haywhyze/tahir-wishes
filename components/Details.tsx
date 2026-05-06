const items: { k: string; v: string }[] = [
  { k: 'Date', v: 'Wednesday, 6 May 2026' },
  { k: 'Time', v: '4:00 PM' },
  { k: 'Venue', v: 'Cave Lux, Fortunate Hub, Ilorin' },
  { k: 'Dress', v: 'Cream, sky blue & gold' },
  { k: 'RSVP', v: '0814 402 8574' },
]

export default function Details() {
  return (
    <section className="details" id="details">
      <div className="d-eyebrow">
        <span className="line"></span>
        Celebration details
        <span className="line"></span>
      </div>
      <h2 className="d-title">A soirée in his honour</h2>

      <div className="d-card">
        <div className="d-grid">
          {items.map(({ k, v }) => (
            <div key={k} style={{ display: 'contents' }}>
              <div className="d-k">{k}</div>
              <div className="d-v">{v}</div>
            </div>
          ))}
        </div>
        <div className="d-foot">
          <a
            className="d-btn"
            href="https://www.google.com/maps/search/?api=1&query=Fortunate+Hub+Ilorin"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Maps
          </a>
          <a className="d-btn d-btn-outline" href="tel:08144028574">
            Call to RSVP
          </a>
        </div>
      </div>
    </section>
  )
}
