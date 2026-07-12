import { ImageResponse } from 'next/og';

export const alt = 'Mani Offset — Offset Printing in Chennai';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0d1430',
        }}
      >
        <div
          style={{
            color: '#f29a1b',
            fontSize: 28,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          MANI OFFSET · SINCE 1995
        </div>
        <div style={{ color: '#ffffff', fontSize: 110, fontWeight: 700, marginTop: 24 }}>
          FeelThePRINT
        </div>
        <div style={{ color: '#94a3b8', fontSize: 36, marginTop: 12 }}>
          Offset Printing · Chennai
        </div>
      </div>
    ),
    { ...size }
  );
}
