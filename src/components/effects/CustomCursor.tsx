import { useEffect, useRef } from 'react';
import { EASE } from '../../data';

export function CustomCursor() {
  const ref  = useRef<HTMLDivElement>(null);
  const pos  = useRef({ x: -100, y: -100 });
  const tgt  = useRef({ x: -100, y: -100 });
  const over = useRef(false);

  useEffect(() => {
    let id: number;
    const tick = () => {
      pos.current.x += (tgt.current.x - pos.current.x) * 0.14;
      pos.current.y += (tgt.current.y - pos.current.y) * 0.14;
      if (ref.current) {
        ref.current.style.transform =
          `translate(${pos.current.x - 6}px,${pos.current.y - 6}px) scale(${over.current ? 6 : 1})`;
      }
      id = requestAnimationFrame(tick);
    };
    tick();
    const mv  = (e: MouseEvent) => { tgt.current = { x: e.clientX, y: e.clientY }; };
    const on  = (e: MouseEvent) => { over.current = !!(e.target as HTMLElement).closest('a,button,[data-cur]'); };
    const off = () => { over.current = false; };
    window.addEventListener('mousemove', mv, { passive: true });
    document.addEventListener('mouseover', on);
    document.addEventListener('mouseout', off);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', mv);
      document.removeEventListener('mouseover', on);
      document.removeEventListener('mouseout', off);
    };
  }, []);

  return (
    <div ref={ref} style={{
      position: 'fixed', top: 0, left: 0, width: 12, height: 12,
      borderRadius: '50%', background: '#fff',
      mixBlendMode: 'difference', pointerEvents: 'none',
      zIndex: 99999,
      transition: `transform 0.15s ${EASE}`,
    }} />
  );
}
