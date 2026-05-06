import QR from 'qrcode'

export default async function QRCode({
  url,
  caption,
}: {
  url: string
  caption?: string
}) {
  const svg = await QR.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 1,
    color: {
      dark: '#F5EDDD',
      light: '#0000', // transparent background
    },
  })

  return (
    <section className="qr">
      <div className="qr-eyebrow">
        <span className="line"></span>
        Scan to send a wish
        <span className="line"></span>
      </div>
      <h2 className="qr-title">Pass it around</h2>
      <p className="qr-sub">
        Family and friends — point your camera here and add Tahir to your blessings.
      </p>
      <div className="qr-card">
        <div className="qr-svg" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="qr-url">{caption ?? url.replace(/^https?:\/\//, '')}</div>
      </div>
    </section>
  )
}
