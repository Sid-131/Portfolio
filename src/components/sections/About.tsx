import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ORANGE, EASE, cab, sat, monoTag, STATS, type Stat } from '../../data';
import { useReveal } from '../../hooks/useReveal';

function CountUpStat({ stat, start }: { stat: Stat; start: boolean }) {
  const { end, decimals = 0, prefix = '', suffix = '', label } = stat;
  const [n, setN] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    const t0 = performance.now();
    const DUR = 1100;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / DUR, 1);
      setN(end * (1 - Math.pow(1 - p, 3))); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end]);

  const shown = decimals > 0
    ? n.toFixed(decimals)
    : Math.round(n).toLocaleString('en-US');

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
      <p style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,38px)', color: '#fff', letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
        {prefix}{shown}{suffix}
      </p>
      <p style={{ ...monoTag(label, 'rgba(255,255,255,0.22)'), marginTop: 6 }}>{label}</p>
    </div>
  );
}

export function About() {
  const [ref, visible] = useReveal<HTMLElement>();

  const fade = (delay: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(28px)',
    transition: `opacity 0.7s ${delay}s ${EASE}, transform 0.7s ${delay}s ${EASE}`,
  });

  return (
    <section id="about" ref={ref} style={{
      padding: 'clamp(4rem,8vw,10rem) clamp(2rem,5vw,8rem)',
      position: 'relative',
    }}>
      <div className="about-grid">
        {/* Left */}
        <div>
          <div style={{ ...monoTag('// ABOUT', ORANGE), marginBottom: 32, ...fade(0) }}>{'// ABOUT'}</div>
          <h2 style={{ margin: 0, lineHeight: 0.88, letterSpacing: '-0.04em', ...fade(0.1) }}>
            <span style={{ display: 'block', fontFamily: cab, fontWeight: 900, fontSize: 'clamp(2.5rem,7vw,86px)', color: '#fff' }}>
              TSE WHO
            </span>
            <span style={{
              display: 'block', fontFamily: cab, fontWeight: 900,
              fontSize: 'clamp(2.5rem,7vw,86px)',
              color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.75)',
              fontStyle: 'italic',
            }}>
              BUILDS.
            </span>
          </h2>
          <p style={{
            fontFamily: sat, fontSize: '1.05rem', lineHeight: 1.78,
            color: 'rgba(255,255,255,0.42)', marginTop: 28, marginBottom: 48,
            ...fade(0.2),
          }}>
            3.5 years resolving 1,000+ enterprise S1/S2 production incidents at Dell — product failure from the customer's side, under pressure, in real time. Then I built the tools that should've existed: a RAG chatbot, a Windows display manager, a 19-container homelab, and PM teardowns. NextLeap PM Fellowship formalised the product thinking.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, ...fade(0.3) }}>
            {STATS.map(s => <CountUpStat key={s.label} stat={s} start={visible} />)}
          </div>
        </div>

        {/* Right — photo */}
        <div style={{ position: 'relative', ...fade(0.25) }}>
          <div style={{
            aspectRatio: '4/5', borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden', position: 'relative',
            background: '#111',
          }}>
            <img
              src="/avatar.jpg"
              alt="Siddhant Singh"
              loading="lazy"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '50% 15%', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
              background: 'linear-gradient(to top, rgba(8,8,8,0.85), transparent)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ ...monoTag('SIDDHANT SINGH', 'rgba(255,255,255,0.7)'), margin: 0 }}>SIDDHANT SINGH</p>
              <p style={{ ...monoTag('PRODUCT · BUILDER', ORANGE), margin: 0, opacity: 0.9 }}>PRODUCT · BUILDER</p>
            </div>
            <div style={{
              position: 'absolute', bottom: '-20%', right: '-20%',
              width: '70%', height: '70%',
              background: `radial-gradient(circle, ${ORANGE}, transparent 70%)`,
              filter: 'blur(40px)', opacity: 0.15, pointerEvents: 'none',
            }} />
          </div>
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-10%',
            width: '55%', height: '55%',
            background: ORANGE, filter: 'blur(80px)',
            opacity: 0.1, borderRadius: '50%', zIndex: -1,
          }} />
        </div>
      </div>
    </section>
  );
}
