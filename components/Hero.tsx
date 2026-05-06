export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-decor">
        <div className="cloud-h c1"></div>
        <div className="cloud-h c2"></div>

        <div className="balloon-h hb1"></div>
        <div className="bstr-h" style={{ top: '90px', left: '12%', height: '70px', transform: 'rotate(6deg)' }}></div>
        <div className="balloon-h hb2"></div>
        <div className="bstr-h" style={{ top: '110px', left: '28%', height: '90px', transform: 'rotate(-4deg)' }}></div>
        <div className="balloon-h hb3"></div>
        <div className="bstr-h" style={{ top: '120px', right: '24%', height: '70px', transform: 'rotate(-6deg)' }}></div>
        <div className="balloon-h hb4"></div>
        <div className="bstr-h" style={{ top: '90px', right: '10%', height: '60px', transform: 'rotate(5deg)' }}></div>

        <svg className="star-h" style={{ top: '40px', left: '46%', width: '14px', height: '14px' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.5 7L20 10l-5.5 3.5L16 20l-4-3.5L8 20l1.5-6.5L4 10l6.5-1z" />
        </svg>
        <svg className="star-h" style={{ top: '160px', left: '8%', width: '10px', height: '10px', opacity: 0.5 }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.5 7L20 10l-5.5 3.5L16 20l-4-3.5L8 20l1.5-6.5L4 10l6.5-1z" />
        </svg>
        <svg className="star-h" style={{ top: '180px', right: '8%', width: '12px', height: '12px', opacity: 0.6 }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l1.5 7L20 10l-5.5 3.5L16 20l-4-3.5L8 20l1.5-6.5L4 10l6.5-1z" />
        </svg>
      </div>

      <div className="hero-inner">
        <div className="hero-eyebrow">
          <span className="line"></span>
          Birthday Soirée · 06.05.2026
          <span className="line"></span>
        </div>

        <h1 className="hero-title">
          <span className="ht-top">Tahir</span>
          <span className="ht-script">Oluwatofunmi</span>
          <span className="ht-bottom">
            is turning <em>one</em>
          </span>
        </h1>

        <div className="hero-crown">
          <svg width="44" height="32" viewBox="0 0 48 32" fill="none" stroke="currentColor" strokeWidth={1.2}>
            <path d="M4 26 L 8 10 L 16 20 L 24 6 L 32 20 L 40 10 L 44 26 Z" fill="rgba(212, 146, 60, 0.12)" />
            <line x1="4" y1="28.5" x2="44" y2="28.5" strokeWidth={1} />
            <circle cx="8" cy="10" r="1.5" fill="currentColor" />
            <circle cx="24" cy="6" r="1.8" fill="currentColor" />
            <circle cx="40" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </div>

        <p className="hero-lede">
          With grateful hearts, we invite you to celebrate our <em>little prince&apos;s</em> first birthday — and to leave him a wish he&apos;ll treasure when he&apos;s older.
        </p>

        <a href="#wishes" className="hero-cta">
          Leave a wish for Tahir
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <path d="M1 5 H 14 M 10 1 L 14 5 L 10 9" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}
