import { useEffect, useRef } from 'react';
import { ORANGE } from '../../data';

export function MeshBlobs() {
  const b1 = useRef<HTMLDivElement>(null);
  const b2 = useRef<HTMLDivElement>(null);
  const b3 = useRef<HTMLDivElement>(null);
  const mx = useRef(0); const my = useRef(0);

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      mx.current = (e.clientX / window.innerWidth  - 0.5) * 40;
      my.current = (e.clientY / window.innerHeight - 0.5) * 40;
    };
    let id: number;
    const animate = () => {
      if (b1.current) b1.current.style.transform = `translate(${mx.current * 0.5}px,${my.current * 0.5}px)`;
      if (b2.current) b2.current.style.transform = `translate(${mx.current}px,${my.current}px)`;
      if (b3.current) b3.current.style.transform = `translate(${mx.current * 1.5}px,${my.current * 1.5}px)`;
      id = requestAnimationFrame(animate);
    };
    animate();
    window.addEventListener('mousemove', onMouse, { passive: true });
    return () => { cancelAnimationFrame(id); window.removeEventListener('mousemove', onMouse); };
  }, []);

  const base: React.CSSProperties = {
    position: 'absolute', borderRadius: '50%',
    filter: 'blur(100px)', mixBlendMode: 'soft-light',
    pointerEvents: 'none', willChange: 'transform',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
      <div ref={b1} style={{ ...base, width: 600, height: 600, background: ORANGE,    opacity: 0.22, top: '5%',  left: '15%', animation: 'float-a 15s ease-in-out infinite' }} />
      <div ref={b2} style={{ ...base, width: 480, height: 480, background: '#B22222', opacity: 0.18, top: '40%', right: '5%', animation: 'float-b 20s ease-in-out infinite' }} />
      <div ref={b3} style={{ ...base, width: 380, height: 380, background: '#FF8C00', opacity: 0.15, bottom: '5%', left: '40%', animation: 'float-c 18s ease-in-out infinite' }} />
    </div>
  );
}
