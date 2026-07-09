import { useState } from 'react';
import { ORANGE, EASE, sat, mono } from '../../data';

function MovieCard() {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(true);
  if (!vis) return null;
  return (
    <div style={{ position: 'relative' }}>
      <a
        href="https://media.sidmatrix.xyz/web/"
        target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        data-cur
      >
        <div style={{
          background: hov ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hov ? ORANGE : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '1rem', backdropFilter: 'blur(20px)',
          padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
          transition: `all 0.3s ${EASE}`,
          transform: hov ? 'translateY(-3px)' : 'none',
          boxShadow: hov ? `0 16px 40px rgba(255,77,0,0.12)` : 'none',
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: hov ? ORANGE : 'rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: `background 0.3s ${EASE}`, flexShrink: 0,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke={hov ? '#fff' : 'rgba(255,255,255,0.5)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'stroke 0.3s' }}>
              <rect x="2" y="2" width="20" height="20" rx="3"/>
              <path d="M7 2v20M17 2v20M2 12h20M2 7h5M17 7h5M17 17h5M2 17h5"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: sat, fontWeight: 700, fontSize: 13, color: '#fff', margin: 0, lineHeight: 1.3 }}>
              Want to watch a movie?
            </p>
            <p style={{
              fontFamily: mono, fontSize: 9,
              color: hov ? ORANGE : 'rgba(255,255,255,0.25)',
              margin: '3px 0 0', letterSpacing: '0.3em', textTransform: 'uppercase',
              transition: `color 0.3s ${EASE}`,
            }}>JELLYFIN · SIDMATRIX ↗</p>
          </div>
        </div>
      </a>
      <button
        onClick={() => setVis(false)}
        style={{
          position: 'absolute', top: -8, right: -8,
          width: 20, height: 20, borderRadius: '50%',
          background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, lineHeight: 1, transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
        data-cur
      >×</button>
    </div>
  );
}

function SnakeCard({ onOpen }: { onOpen: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'none', display: 'block', width: '100%' }}
      data-cur
    >
      <div style={{
        background: hov ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.04)',
        border: `1px solid ${hov ? ORANGE : 'rgba(255,255,255,0.08)'}`,
        borderRadius: '1rem', backdropFilter: 'blur(20px)',
        padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12,
        transition: `all 0.3s ${EASE}`,
        transform: hov ? 'translateY(-3px)' : 'none',
        boxShadow: hov ? `0 16px 40px rgba(255,77,0,0.12)` : 'none',
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: '50%',
          background: hov ? ORANGE : 'rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: `background 0.3s ${EASE}`, flexShrink: 0, fontSize: 16,
        }}>🐍</div>
        <div style={{ textAlign: 'left' }}>
          <p style={{ fontFamily: sat, fontWeight: 700, fontSize: 13, color: '#fff', margin: 0, lineHeight: 1.3 }}>
            Bored? Play Snake
          </p>
          <p style={{
            fontFamily: mono, fontSize: 9,
            color: hov ? ORANGE : 'rgba(255,255,255,0.25)',
            margin: '3px 0 0', letterSpacing: '0.3em', textTransform: 'uppercase',
            transition: `color 0.3s ${EASE}`,
          }}>MINI GAME · WASD / ARROWS</p>
        </div>
      </div>
    </button>
  );
}

export function FloatingCards({ onSnake }: { onSnake: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 'clamp(1.5rem,3vw,3rem)',
      right: 'clamp(1.5rem,3vw,3rem)',
      display: 'flex', flexDirection: 'column', gap: 10,
      zIndex: 150,
    }}>
      <MovieCard />
      <SnakeCard onOpen={onSnake} />
    </div>
  );
}
