import { useState } from 'react';
import { ORANGE, EASE, cab, sat, mono, monoTag, PROJECTS, type Project } from '../../data';
import { useReveal } from '../../hooks/useReveal';

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ ...monoTag(label, 'rgba(255,255,255,0.28)'), marginBottom: 4 }}>{label}</p>
      <p style={{ fontFamily: sat, fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{text}</p>
    </div>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const [ref, visible] = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const [hov, setHov] = useState(false);
  const rev = i % 2 === 1; // 02, 04, 06 → visual on the right

  return (
    <div
      ref={ref}
      className={`prow${rev ? ' rev' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateX(${rev ? 40 : -40}px)`,
        transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
        marginBottom: 'clamp(4rem,8vw,9rem)',
      }}
    >
      {/* Visual panel */}
      <a
        className="pvis"
        href={p.href}
        target={p.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        data-cur
      >
        <div style={{
          aspectRatio: '4/3', borderRadius: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)',
          background: p.bg, position: 'relative', overflow: 'hidden',
          transform: hov ? 'scale(1.02)' : 'none',
          transition: `transform 0.5s ${EASE}`,
        }}>
          <span style={{
            position: 'absolute', top: '8%', left: '6%',
            fontFamily: cab, fontWeight: 900,
            fontSize: 'clamp(5rem,10vw,140px)', lineHeight: 1,
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            letterSpacing: '-0.04em', pointerEvents: 'none',
          }}>
            {p.index}
          </span>
          <span style={{
            position: 'absolute', bottom: '8%', right: '8%',
            fontFamily: cab, fontWeight: 900, fontSize: 22,
            color: 'rgba(255,255,255,0.35)', letterSpacing: '-0.02em',
          }}>
            {p.name.split(' ')[0].toUpperCase()}
          </span>
          <div style={{
            position: 'absolute', bottom: '-30%', right: '-20%',
            width: '80%', height: '80%',
            background: `radial-gradient(circle, ${p.accent}, transparent 70%)`,
            filter: 'blur(50px)',
            opacity: hov ? 0.4 : 0.18,
            transition: `opacity 0.5s ${EASE}`,
            pointerEvents: 'none',
          }} />
        </div>
      </a>

      {/* Story column */}
      <div className="pstory">
        <p style={{ ...monoTag(p.cat, p.accent), marginBottom: 14 }}>{p.cat}</p>
        <h3 style={{
          fontFamily: cab, fontWeight: 900,
          fontSize: 'clamp(1.8rem,3.5vw,44px)',
          color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 24px',
        }}>
          {p.name}
        </h3>

        <CaseLine label="PROBLEM" text={p.problem} />
        <CaseLine label="BUILT"   text={p.built} />
        <CaseLine label="RESULT"  text={p.result} />

        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '26px 0' }}>
          <span style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(2rem,4vw,52px)', color: p.accent, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {p.metric.value}
          </span>
          <span style={monoTag(p.metric.label, 'rgba(255,255,255,0.3)')}>{p.metric.label}</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 26 }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100, padding: '5px 12px',
            }}>
              {t}
            </span>
          ))}
        </div>

        <a
          href={p.href}
          target={p.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          style={{ ...monoTag(p.linkLabel, 'rgba(255,255,255,0.55)'), fontSize: 11, textDecoration: 'none', transition: `color 0.2s ${EASE}` }}
          onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          data-cur
        >
          {p.linkLabel}
        </a>
      </div>
    </div>
  );
}

export function Work() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section id="work" style={{ padding: 'clamp(4rem,8vw,10rem) clamp(2rem,5vw,8rem)', position: 'relative' }}>
      <div ref={ref} style={{
        marginBottom: 'clamp(3rem,6vw,6rem)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
      }}>
        <div style={{ ...monoTag('// SELECTED WORK', ORANGE), marginBottom: 16 }}>{'// SELECTED WORK'}</div>
        <h2 style={{ margin: 0, lineHeight: 0.88, letterSpacing: '-0.04em' }}>
          <span style={{ display: 'block', fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,9vw,112px)', color: '#fff' }}>
            SELECTED
          </span>
          <span style={{
            display: 'block', fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,9vw,112px)',
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.75)', fontStyle: 'italic',
          }}>
            WORK.
          </span>
        </h2>
      </div>

      {PROJECTS.map((p, i) => <ProjectRow key={p.id} p={p} i={i} />)}
    </section>
  );
}
