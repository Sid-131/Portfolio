import { useState } from 'react';
import { ORANGE, EASE, cab, sat, monoTag } from '../../data';

function MaskLine({ text, delay, active, outline }: {
  text: string; delay: number; active: boolean; outline?: boolean;
}) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <span style={{
        display: 'block', fontFamily: cab, fontWeight: 900,
        fontSize: 'clamp(3.5rem,14vw,180px)', lineHeight: 0.95, letterSpacing: '-0.04em',
        color: outline ? 'transparent' : '#fff',
        WebkitTextStroke: outline ? '1px rgba(255,255,255,0.75)' : undefined,
        fontStyle: outline ? 'italic' : 'normal',
        position: 'relative',
        transform: active ? 'none' : 'translateY(110%)',
        transition: `transform 0.9s ${delay}s ${EASE}`,
      }}>
        {text}
        {outline && (
          <span style={{
            position: 'absolute', right: '0%', bottom: '-10%',
            width: '35%', height: '120%',
            background: `radial-gradient(circle, ${ORANGE} 0%, transparent 70%)`,
            filter: 'blur(60px)', opacity: 0.28,
            mixBlendMode: 'screen', pointerEvents: 'none',
          }} />
        )}
      </span>
    </span>
  );
}

function ScrollCue({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        background: 'none', border: 'none', cursor: 'none', padding: 0,
      }}
      data-cur
    >
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        border: `1px solid ${hov ? ORANGE : 'rgba(255,255,255,0.15)'}`,
        background: hov ? 'rgba(255,77,0,0.1)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: `all 0.3s ${EASE}`, flexShrink: 0,
        animation: 'cue-bounce 2.2s ease-in-out infinite',
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M2 8l6 6 6-6" stroke={hov ? ORANGE : 'rgba(255,255,255,0.55)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={monoTag('SCROLL', 'rgba(255,255,255,0.28)')}>SCROLL</span>
    </button>
  );
}

export function Hero({ active, onNext }: { active: boolean; onNext: () => void }) {
  return (
    <section id="hero" style={{
      minHeight: '100svh', position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(2rem,5vw,8rem)',
      paddingTop: 'calc(clamp(1.5rem,3vw,3rem) + 72px)',
    }}>
      <div style={{
        ...monoTag('// PM · BUILDER · BENGALURU, INDIA', ORANGE),
        marginBottom: 40,
        opacity: active ? 1 : 0,
        transition: `opacity 0.7s 0.15s ${EASE}`,
      }}>
        {'// PM · BUILDER · BENGALURU, INDIA'}
      </div>

      <h1 style={{ margin: 0 }}>
        <MaskLine text="PRODUCT"  delay={0.25} active={active} />
        <MaskLine text="MANAGER." delay={0.4}  active={active} outline />
      </h1>

      <p style={{
        fontFamily: sat, fontSize: '1.2rem', color: 'rgba(255,255,255,0.38)',
        marginTop: 48, maxWidth: '28rem', lineHeight: 1.7,
        opacity: active ? 1 : 0, transform: active ? 'none' : 'translateY(20px)',
        transition: `opacity 0.7s 0.65s ${EASE}, transform 0.7s 0.65s ${EASE}`,
      }}>
        Builds products that turn enterprise chaos into clarity. 1,000+ incidents resolved. 4 tools shipped. Real infrastructure, real research.
      </p>

      <div style={{
        marginTop: 56,
        opacity: active ? 1 : 0,
        transition: `opacity 0.7s 0.85s ${EASE}`,
      }}>
        <ScrollCue onClick={onNext} />
      </div>
    </section>
  );
}
