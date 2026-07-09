import { useState, useEffect } from 'react';
import { ORANGE, EASE, cab, monoTag, SOCIALS } from '../../data';

const NAV_ITEMS = [
  { label: 'HERO',    id: 'hero' },
  { label: 'ABOUT',   id: 'about' },
  { label: 'WORK',    id: 'work' },
  { label: 'CONTACT', id: 'contact' },
];

export function CircularMenu({ open, onClose, onGo }: {
  open: boolean; onClose: () => void; onGo: (id: string) => void;
}) {
  const [hov, setHov] = useState<number | null>(null);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: '#080808',
      clipPath: open ? 'circle(150% at 95% 5%)' : 'circle(0% at 95% 5%)',
      transition: `clip-path 0.9s ${EASE}`,
      display: 'flex', flexDirection: 'column',
      alignItems: 'flex-start', justifyContent: 'center',
      padding: '0 clamp(2rem,8vw,10rem)',
      pointerEvents: open ? 'auto' : 'none',
    }}>
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 'clamp(1.5rem,3vw,3rem)', right: 'clamp(1.5rem,3vw,3rem)',
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)', border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'none', color: '#fff', fontSize: 22, lineHeight: 1,
          transition: `background 0.2s ${EASE}`,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = ORANGE)}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
        data-cur
      >×</button>

      <nav style={{ width: '100%' }}>
        {NAV_ITEMS.map((item, i) => (
          <div
            key={item.label}
            style={{
              borderBottom: '1px solid rgba(255,255,255,0.07)',
              padding: '0.6rem 0',
              opacity: open ? 1 : 0,
              transform: open ? 'none' : 'translateY(40px)',
              transition: `opacity 0.6s ${0.08 + i * 0.1}s ${EASE}, transform 0.6s ${0.08 + i * 0.1}s ${EASE}`,
            }}
            onMouseEnter={() => setHov(i)}
            onMouseLeave={() => setHov(null)}
          >
            <button
              onClick={() => { onGo(item.id); onClose(); }}
              style={{
                background: 'none', border: 'none', cursor: 'none',
                display: 'flex', alignItems: 'center', gap: 24,
                fontFamily: cab, fontWeight: 900,
                fontSize: 'clamp(2.5rem,7vw,90px)',
                letterSpacing: '-0.03em', lineHeight: 1.1,
                color: hov === i ? ORANGE : 'transparent',
                WebkitTextStroke: hov === i ? '0px' : '1px rgba(255,255,255,0.7)',
                fontStyle: hov === i ? 'italic' : 'normal',
                transform: hov === i ? 'translateX(20px)' : 'none',
                transition: `all 0.35s ${EASE}`,
              }}
              data-cur
            >
              <span style={{ ...monoTag(`0${i + 1}`, 'rgba(255,255,255,0.2)'), fontStyle: 'normal', WebkitTextStroke: '0px' }}>
                0{i + 1}
              </span>
              {item.label}
            </button>
          </div>
        ))}
      </nav>

      <div style={{
        marginTop: 48, display: 'flex', gap: 32,
        opacity: open ? 1 : 0,
        transition: `opacity 0.6s 0.5s ${EASE}`,
      }}>
        {SOCIALS.map(s => (
          <a key={s.label} href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{ ...monoTag(s.full, 'rgba(255,255,255,0.25)'), textDecoration: 'none', transition: `color 0.2s ${EASE}` }}
            onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
            data-cur
          >
            {s.full}
          </a>
        ))}
      </div>
    </div>
  );
}
