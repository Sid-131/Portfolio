import { useState, useEffect, useCallback } from 'react';
import { ORANGE, EASE, cab, monoTag } from '../../data';

export function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN]       = useState(0);
  const [msg, setMsg]   = useState('INITIALIZING SYSTEM');
  const [exit, setExit] = useState(false);
  const done = useCallback(onDone, [onDone]);

  useEffect(() => {
    const msgs = ['INITIALIZING SYSTEM', 'LOADING ASSETS', 'COMPILING ROUTES', 'READY'];
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.floor(Math.random() * 5) + 2;
      if (cur >= 100) {
        cur = 100;
        clearInterval(id);
        setMsg('READY');
        setTimeout(() => { setExit(true); setTimeout(done, 700); }, 300);
      }
      setN(cur);
      setMsg(msgs[Math.min(Math.floor((cur / 100) * msgs.length), msgs.length - 1)]);
    }, 28);
    return () => clearInterval(id);
  }, [done]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 99998,
      background: '#080808',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: exit ? 0 : 1,
      transition: `opacity 0.7s ${EASE}`,
    }}>
      <div style={{
        position: 'absolute', width: 256, height: 256, borderRadius: '50%',
        background: `radial-gradient(circle, ${ORANGE}, #B22222)`,
        filter: 'blur(50px)', opacity: 0.65,
        animation: 'pulse-orb 2s ease-in-out infinite',
      }} />
      <span style={{
        fontFamily: cab, fontWeight: 900,
        fontSize: 'clamp(80px, 15vw, 160px)',
        color: '#fff', letterSpacing: '-0.05em', lineHeight: 1,
        position: 'relative', zIndex: 1,
      }}>
        {String(n).padStart(2, '0')}
      </span>
      <span style={{ ...monoTag(msg, 'rgba(255,255,255,0.3)'), marginTop: 24, position: 'relative', zIndex: 1 }}>
        {msg}
      </span>
    </div>
  );
}
