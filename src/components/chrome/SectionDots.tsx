import { useState, useEffect } from 'react';
import { ORANGE, monoTag, SECTION_IDS } from '../../data';

export function SectionDots() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    // Fires when a section crosses the viewport's vertical center.
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setCur(SECTION_IDS.indexOf(e.target.id as typeof SECTION_IDS[number]));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 'clamp(1.5rem,3vw,3rem)', left: 'clamp(1.5rem,3vw,3rem)',
      display: 'flex', alignItems: 'center', gap: 12, zIndex: 100,
    }}>
      <span style={{ ...monoTag(`0${cur + 1}`, ORANGE), fontSize: 12 }}>0{cur + 1}</span>
      <div style={{ width: 48, height: 1, background: '#27272a' }} />
      <span style={{ ...monoTag(`0${SECTION_IDS.length}`, '#52525b'), fontSize: 12 }}>0{SECTION_IDS.length}</span>
    </div>
  );
}
