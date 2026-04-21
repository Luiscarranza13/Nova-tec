import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const title = searchParams.get('title') || 'NovaTec — Desarrollo de Software'
  const description = searchParams.get('description') || 'Transformamos ideas en software excepcional'
  const tag = searchParams.get('tag') || 'novatec.pe'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          background: 'linear-gradient(135deg, #0d1117 0%, #1a1040 50%, #0d1117 100%)',
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-100px', left: '-100px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', right: '-100px',
          width: '350px', height: '350px',
          background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 10 }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '24px', fontWeight: 'bold', color: 'white',
            }}>N</div>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>
              Nova<span style={{ color: '#818cf8' }}>Tec</span>
            </span>
          </div>

          {/* Title */}
          <div style={{
            fontSize: title.length > 40 ? '42px' : '52px',
            fontWeight: 'bold', color: 'white',
            lineHeight: 1.1, marginBottom: '20px',
            maxWidth: '900px',
          }}>
            {title}
          </div>

          {/* Description */}
          <div style={{
            fontSize: '22px', color: 'rgba(255,255,255,0.6)',
            lineHeight: 1.4, maxWidth: '800px',
          }}>
            {description}
          </div>

          {/* Bottom bar */}
          <div style={{
            marginTop: 'auto', display: 'flex', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 16px', borderRadius: '999px',
              background: 'rgba(99,102,241,0.2)',
              border: '1px solid rgba(99,102,241,0.4)',
              color: '#818cf8', fontSize: '16px',
            }}>
              🚀 Desarrollo de Software Premium
            </div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '16px' }}>
              {tag}
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
