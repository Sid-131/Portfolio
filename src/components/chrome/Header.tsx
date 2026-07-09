import { useState } from 'react';
import { ORANGE, EASE, cab, monoTag } from '../../data';

export function Header({ onMenu }: { onMenu: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: 'clamp(1.5rem,3vw,3rem)',
    }}>
      <span style={{ fontFamily: cab, fontWeight: 900, fontSize: 22, color: '#fff', letterSpacing: '-0.04em' }}>
        SS.
      </span>
      <button
        onClick={onMenu}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'none' }}
        data-cur
      >
        <span style={monoTag('MENU', 'rgba(255,255,255,0.4)')}>MENU</span>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: hov ? ORANGE : 'rgba(255,255,255,0.08)',
          border: `1px solid ${hov ? ORANGE : 'transparent'}`,
          backdropFilter: 'blur(20px)',
          transition: `all 0.3s ${EASE}`,
        }}>
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
            <rect y="0"    width="16" height="1.5" rx="0.75" fill="white"/>
            <rect y="4.75" width="10" height="1.5" rx="0.75" fill="white"/>
            <rect y="9.5"  width="16" height="1.5" rx="0.75" fill="white"/>
          </svg>
        </div>
      </button>
    </div>
  );
}
