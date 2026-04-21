import { useState, useEffect, useRef, useCallback } from 'react';

// ── Constants ────────────────────────────────────────────────────────────────

const ORANGE = '#FF4D00';
const EASE   = 'cubic-bezier(0.23, 1, 0.32, 1)';

const PROJECTS = [
  { id: 'homelab', name: 'Sidmatrix Homelab',      cat: 'Infrastructure · 2024', sub: '19-container homelab at $0/month',                    href: 'https://github.com/Sid-131',                                      accent: '#FF4D00', bg: 'linear-gradient(135deg,#1a0800 0%,#0a0400 100%)' },
  { id: 'rag',     name: 'RAG Chatbot',             cat: 'AI · Production · 2024', sub: 'Mutual fund FAQ with dual-layer guardrails',            href: 'https://github.com/Sid-131/RAG_chat_bot',                         accent: '#6366f1', bg: 'linear-gradient(135deg,#08080f 0%,#040408 100%)' },
  { id: 'lumynex', name: 'Lumynex v1.0',            cat: 'Windows · Shipped · 2025', sub: 'Self-healing display manager, standalone EXE',       href: 'https://github.com/Sid-131/lumynex/releases/tag/v1.0',            accent: '#FF8C00', bg: 'linear-gradient(135deg,#120800 0%,#080400 100%)' },
  { id: 'relay',   name: 'Relay.app Teardown',      cat: 'PM Work · 2025',       sub: 'Onboarding teardown, PSYCH framework, 3 fixes',          href: '/relay_onboarding.pdf',                                           accent: '#00C896', bg: 'linear-gradient(135deg,#001510 0%,#000a08 100%)' },
  { id: 'cube',    name: 'Cube AI Teardown',        cat: 'PM Work · 2026',       sub: '6 UX problems identified, 5 interventions, growth audit', href: '/Cube_AI_Product_Teardown.pdf',                                   accent: ORANGE,   bg: 'linear-gradient(135deg,#120000 0%,#080000 100%)' },
  { id: 'synciq',  name: 'SyncIQ Precheck Tool',    cat: 'Dell · Internal · 2023', sub: '7-section automated precheck for SyncIQ failover',     href: 'https://github.com/Sid-131',                                      accent: '#888',   bg: 'linear-gradient(135deg,#0d0d0d 0%,#080808 100%)' },
];

const SOCIALS = [
  { label: 'LI', full: 'LinkedIn', href: 'https://linkedin.com/in/siddhant-singh-3b58681a7' },
  { label: 'GH', full: 'GitHub',   href: 'https://github.com/Sid-131' },
  { label: 'EM', full: 'Email',    href: 'mailto:siddhant.singh131@outlook.com' },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const cab = "'Cabinet Grotesk', ui-sans-serif, sans-serif";
const sat = "'Satoshi', ui-sans-serif, sans-serif";
const mono = "'JetBrains Mono', ui-monospace, monospace";

function monoTag(_text: string, color = 'rgba(255,255,255,0.3)'): React.CSSProperties {
  return { fontFamily: mono, fontSize: 10, letterSpacing: '0.5em', color, textTransform: 'uppercase' as const };
}

// ── Grain overlay ────────────────────────────────────────────────────────────

function GrainOverlay() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
      </svg>
      <div className="grain-overlay" />
    </>
  );
}

// ── Mesh blobs ────────────────────────────────────────────────────────────────

function MeshBlobs() {
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

// ── Custom cursor ─────────────────────────────────────────────────────────────

function CustomCursor() {
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
    const mv = (e: MouseEvent) => { tgt.current = { x: e.clientX, y: e.clientY }; };
    const on = (e: MouseEvent) => { over.current = !!(e.target as HTMLElement).closest('a,button,[data-cur]'); };
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

// ── Page loader ───────────────────────────────────────────────────────────────

function Loader({ onDone }: { onDone: () => void }) {
  const [n, setN]   = useState(0);
  const [msg, setMsg] = useState('INITIALIZING SYSTEM');
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
      {/* Glowing orb */}
      <div style={{
        position: 'absolute', width: 256, height: 256, borderRadius: '50%',
        background: `radial-gradient(circle, ${ORANGE}, #B22222)`,
        filter: 'blur(50px)', opacity: 0.65,
        animation: 'pulse-orb 2s ease-in-out infinite',
      }} />
      {/* Counter */}
      <span style={{
        fontFamily: cab, fontWeight: 900,
        fontSize: 'clamp(80px, 15vw, 160px)',
        color: '#fff', letterSpacing: '-0.05em', lineHeight: 1,
        position: 'relative', zIndex: 1,
      }}>
        {String(n).padStart(2, '0')}
      </span>
      {/* Status */}
      <span style={{ ...monoTag(msg, 'rgba(255,255,255,0.3)'), marginTop: 24, position: 'relative', zIndex: 1 }}>
        {msg}
      </span>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header({ onMenu }: { onMenu: () => void }) {
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
            <rect y="0"   width="16" height="1.5" rx="0.75" fill="white"/>
            <rect y="4.75" width="10" height="1.5" rx="0.75" fill="white"/>
            <rect y="9.5"  width="16" height="1.5" rx="0.75" fill="white"/>
          </svg>
        </div>
      </button>
    </div>
  );
}

// ── Circular nav overlay ──────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'HERO',    idx: 0 },
  { label: 'ABOUT',   idx: 1 },
  { label: 'WORK',    idx: 2 },
  { label: 'CONTACT', idx: 3 },
];

function CircularMenu({ open, onClose, onGo }: {
  open: boolean; onClose: () => void; onGo: (i: number) => void;
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
      {/* Close */}
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
      >
        ×
      </button>

      {/* Links */}
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
              onClick={() => { onGo(item.idx); onClose(); }}
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

      {/* Footer socials */}
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

// ── Section progress ──────────────────────────────────────────────────────────

function SectionProgress({ cur, total }: { cur: number; total: number }) {
  return (
    <div style={{
      position: 'fixed', bottom: 'clamp(1.5rem,3vw,3rem)', left: 'clamp(1.5rem,3vw,3rem)',
      display: 'flex', alignItems: 'center', gap: 12, zIndex: 100,
    }}>
      <span style={{ ...monoTag(`0${cur + 1}`, ORANGE), fontSize: 12 }}>0{cur + 1}</span>
      <div style={{ width: 48, height: 1, background: '#27272a' }} />
      <span style={{ ...monoTag(`0${total}`, '#52525b'), fontSize: 12 }}>0{total}</span>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection({ onNext }: { onNext: () => void }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(2rem,5vw,8rem)',
      paddingTop: 'calc(clamp(1.5rem,3vw,3rem) + 72px)',
    }}>
      {/* Tag */}
      <div style={{
        ...monoTag('// PM · BUILDER · BENGALURU, INDIA', ORANGE),
        marginBottom: 40,
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
        transition: `opacity 0.7s 0.1s ${EASE}, transform 0.7s 0.1s ${EASE}`,
      }} />

      {/* Title */}
      <div style={{
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(40px)',
        transition: `opacity 0.8s 0.2s ${EASE}, transform 0.8s 0.2s ${EASE}`,
      }}>
        <h1 style={{ margin: 0, lineHeight: 0.88, letterSpacing: '-0.04em' }}>
          <span style={{ display: 'block', fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3.5rem,14vw,180px)', color: '#fff' }}>
            PRODUCT
          </span>
          <span style={{
            display: 'block', fontFamily: cab, fontWeight: 900,
            fontSize: 'clamp(3.5rem,14vw,180px)',
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.75)',
            fontStyle: 'italic', position: 'relative',
          }}>
            MANAGER.
            <div style={{
              position: 'absolute', right: '0%', bottom: '-10%',
              width: '35%', height: '120%',
              background: `radial-gradient(circle, ${ORANGE} 0%, transparent 70%)`,
              filter: 'blur(60px)', opacity: 0.28,
              mixBlendMode: 'screen', pointerEvents: 'none',
            }} />
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p style={{
        fontFamily: sat, fontSize: '1.2rem', color: 'rgba(255,255,255,0.38)',
        marginTop: 48, maxWidth: '28rem', lineHeight: 1.7,
        opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
        transition: `opacity 0.7s 0.55s ${EASE}, transform 0.7s 0.55s ${EASE}`,
      }}>
        Builds products that turn enterprise chaos into clarity. 1,000+ incidents resolved. 4 tools shipped. Real infrastructure, real research.
      </p>

      {/* CTA */}
      <button
        onClick={onNext}
        style={{
          marginTop: 56, display: 'flex', alignItems: 'center', gap: 16,
          background: 'none', border: 'none', cursor: 'none', padding: 0,
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)',
          transition: `opacity 0.7s 0.7s ${EASE}, transform 0.7s 0.7s ${EASE}`,
        }}
        data-cur
      >
        <ArrowCircle />
        <span style={monoTag('SCROLL OR NAVIGATE', 'rgba(255,255,255,0.28)')}>SCROLL OR NAVIGATE</span>
      </button>
    </div>
  );
}

function ArrowCircle() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 48, height: 48, borderRadius: '50%',
        border: `1px solid ${hov ? ORANGE : 'rgba(255,255,255,0.15)'}`,
        background: hov ? `rgba(255,77,0,0.1)` : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: `all 0.3s ${EASE}`, flexShrink: 0,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v12M2 8l6 6 6-6" stroke={hov ? ORANGE : 'rgba(255,255,255,0.55)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

const STATS = [
  { val: '1,000+', label: 'Enterprise Incidents' },
  { val: '4',      label: 'Shipped Products'     },
  { val: '3.5 YRS', label: 'At Dell'             },
  { val: '$0/MO',  label: 'Homelab Cost'         },
];

function AboutSection() {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4vw', alignItems: 'center',
      padding: 'clamp(2rem,5vw,8rem)',
      paddingTop: 'calc(clamp(1.5rem,3vw,3rem) + 72px)',
      overflowY: 'auto',
    }}>
      {/* Left */}
      <div>
        <div style={{ ...monoTag('// ABOUT', ORANGE), marginBottom: 32 }} />
        <h2 style={{ margin: 0, lineHeight: 0.88, letterSpacing: '-0.04em' }}>
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
        }}>
          3.5 years resolving 1,000+ enterprise S1/S2 production incidents at Dell — product failure from the customer's side, under pressure, in real time. Then I built the tools that should've existed: a RAG chatbot, a Windows display manager, a 19-container homelab, and PM teardowns. NextLeap PM Fellowship formalised the product thinking.
        </p>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {STATS.map(({ val, label }) => (
            <div key={label} style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
              <p style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,38px)', color: '#fff', letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
                {val}
              </p>
              <p style={{ ...monoTag(label, 'rgba(255,255,255,0.22)'), marginTop: 6 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — styled container */}
      <div style={{ position: 'relative' }}>
        <div style={{
          aspectRatio: '4/5', borderRadius: '2rem',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #080808 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          <span style={{
            fontFamily: cab, fontWeight: 900,
            fontSize: 'clamp(4rem,10vw,120px)',
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.08)',
            letterSpacing: '-0.04em', position: 'relative', zIndex: 1,
          }}>SS</span>
          <p style={{ ...monoTag('SIDDHANT SINGH', 'rgba(255,255,255,0.14)'), marginTop: 16, position: 'relative', zIndex: 1 }}>SIDDHANT SINGH</p>
          <p style={{ ...monoTag('PRODUCT · BUILDER', ORANGE), marginTop: 8, opacity: 0.8, position: 'relative', zIndex: 1 }}>PRODUCT · BUILDER</p>
          {/* Inner glow */}
          <div style={{
            position: 'absolute', bottom: '-20%', right: '-20%',
            width: '70%', height: '70%',
            background: `radial-gradient(circle, ${ORANGE}, transparent 70%)`,
            filter: 'blur(40px)', opacity: 0.25,
          }} />
        </div>
        {/* Outer accent glow */}
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-10%',
          width: '55%', height: '55%',
          background: ORANGE, filter: 'blur(80px)',
          opacity: 0.12, borderRadius: '50%', zIndex: -1,
        }} />
      </div>
    </div>
  );
}

// ── Work ──────────────────────────────────────────────────────────────────────

function WorkSection() {
  const [hov, setHov] = useState<string | null>(null);

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      padding: 'clamp(2rem,5vw,8rem)',
      paddingTop: 'calc(clamp(1.5rem,3vw,3rem) + 72px)',
      overflowY: 'auto',
    }}>
      <div style={{ marginBottom: 40 }}>
        <div style={{ ...monoTag('// SELECTED WORK', ORANGE), marginBottom: 16 }} />
        <h2 style={{
          fontFamily: cab, fontWeight: 900,
          fontSize: 'clamp(3rem,9vw,112px)',
          color: '#fff', letterSpacing: '-0.04em', lineHeight: 0.88, margin: 0,
        }}>
          PROJECTS
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14 }}>
        {PROJECTS.map(p => (
          <a
            key={p.id}
            href={p.href}
            target={p.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setHov(p.id)}
            onMouseLeave={() => setHov(null)}
            data-cur
          >
            <div style={{
              aspectRatio: '16/9', borderRadius: '1.5rem',
              border: '1px solid rgba(255,255,255,0.1)',
              background: p.bg, position: 'relative', overflow: 'hidden',
              transition: `transform 0.4s ${EASE}, box-shadow 0.4s ${EASE}`,
              transform: hov === p.id ? 'translateY(-4px)' : 'none',
              boxShadow: hov === p.id ? '0 24px 64px rgba(0,0,0,0.5)' : 'none',
            }}>
              {/* Accent bottom gradient */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%',
                background: `linear-gradient(to top, ${p.accent}28, transparent)`,
                pointerEvents: 'none',
              }} />

              {/* Default state */}
              <div style={{
                position: 'absolute', inset: 0, padding: 20,
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                opacity: hov === p.id ? 0 : 1,
                transition: `opacity 0.25s ${EASE}`,
                pointerEvents: 'none',
              }}>
                <p style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(0.9rem,1.4vw,18px)', color: 'rgba(255,255,255,0.65)', margin: 0, letterSpacing: '-0.02em' }}>
                  {p.name}
                </p>
                <p style={{ ...monoTag(p.cat, p.accent), marginTop: 4 }}>{p.cat}</p>
              </div>

              {/* Hover overlay */}
              <div style={{
                position: 'absolute', inset: 0, padding: 20,
                background: 'rgba(0,0,0,0.55)',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                opacity: hov === p.id ? 1 : 0,
                transition: `opacity 0.28s ${EASE}`,
                pointerEvents: 'none',
              }}>
                <p style={{ ...monoTag(p.cat, ORANGE), marginBottom: 8 }}>{p.cat}</p>
                <p style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(1rem,1.8vw,22px)', color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
                  {p.name}
                </p>
                <p style={{ fontFamily: sat, fontSize: 13, color: 'rgba(255,255,255,0.45)', margin: 0, marginTop: 6 }}>
                  {p.sub}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function ContactSection({ onSnake }: { onSnake: () => void }) {
  const [hov, setHov] = useState(false);

  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: 'clamp(2rem,5vw,8rem)',
      paddingTop: 'calc(clamp(1.5rem,3vw,3rem) + 72px)',
      position: 'relative',
    }}>
      <div style={{ ...monoTag('// GET IN TOUCH', ORANGE), marginBottom: 40 }} />

      {/* Hero CTA text */}
      <a
        href="mailto:siddhant.singh131@outlook.com"
        style={{ textDecoration: 'none', lineHeight: 0.88, letterSpacing: '-0.04em' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        data-cur
      >
        <div style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,10vw,120px)', color: '#fff' }}>
          LET'S
        </div>
        <div style={{
          fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,10vw,120px)',
          fontStyle: 'italic',
          color: hov ? ORANGE : 'transparent',
          WebkitTextStroke: hov ? '0px' : '1px rgba(255,255,255,0.75)',
          transition: `color 0.4s ${EASE}, -webkit-text-stroke 0.4s ${EASE}`,
        }}>
          BUILD.
        </div>
      </a>

      {/* Email */}
      <a
        href="mailto:siddhant.singh131@outlook.com"
        style={{
          ...monoTag('SIDDHANT.SINGH131@OUTLOOK.COM', 'rgba(255,255,255,0.28)'),
          fontSize: 11, textDecoration: 'none',
          marginTop: 40, transition: `color 0.2s ${EASE}`,
        }}
        onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
        data-cur
      >
        SIDDHANT.SINGH131@OUTLOOK.COM
      </a>

      {/* Social circles */}
      <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
        {SOCIALS.map(s => (
          <a key={s.label} href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
            data-cur
          >
            <div
              style={{
                width: 64, height: 64, borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: `all 0.3s ${EASE}`,
              }}
              onMouseEnter={e => {
                const d = e.currentTarget as HTMLDivElement;
                d.style.background = '#fff'; d.style.borderColor = '#fff';
                (d.querySelector('span') as HTMLElement).style.color = '#080808';
              }}
              onMouseLeave={e => {
                const d = e.currentTarget as HTMLDivElement;
                d.style.background = 'transparent'; d.style.borderColor = 'rgba(255,255,255,0.1)';
                (d.querySelector('span') as HTMLElement).style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              <span style={{ ...monoTag(s.label, 'rgba(255,255,255,0.5)'), fontSize: 11, transition: `color 0.3s ${EASE}` }}>
                {s.label}
              </span>
            </div>
          </a>
        ))}
      </div>

      {/* Footer line */}
      <div style={{
        position: 'absolute', bottom: 'clamp(1.5rem,3vw,3rem)',
        display: 'flex', gap: 24, alignItems: 'center',
        ...monoTag('', 'rgba(255,255,255,0.18)'), fontSize: 10, letterSpacing: '0.3em',
      }}>
        {['© 2026 SIDDHANT SINGH', 'PM · BUILDER · BENGALURU'].map((t, i) => (
          <span key={i} style={{ color: 'rgba(255,255,255,0.18)' }}>{t}</span>
        ))}
        <a href="/resume.pdf" target="_blank" style={{ color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: `color 0.2s` }}
          onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
          data-cur>
          RESUME ↗
        </a>
        <button
          onClick={onSnake}
          style={{ background: 'none', border: 'none', cursor: 'none', color: 'rgba(255,255,255,0.18)', fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', transition: `color 0.2s` }}
          onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
          data-cur
        >PLAY ↗</button>
      </div>
    </div>
  );
}

// ── Snake game ────────────────────────────────────────────────────────────────

const CELL  = 20;
const GCOLS = 20;
const GROWS = 20;

type Pt  = { x: number; y: number };
type Dir = 'U' | 'D' | 'L' | 'R';

function SnakeGame({ open, onClose }: { open: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snake     = useRef<Pt[]>([{ x: 10, y: 10 }]);
  const dir       = useRef<Dir>('R');
  const nextDir   = useRef<Dir>('R');
  const food      = useRef<Pt>({ x: 5, y: 5 });
  const running   = useRef(false);
  const deadRef   = useRef(false);
  const [score, setScore]   = useState(0);
  const [isDead, setIsDead] = useState(false);

  const rndFood = (s: Pt[]): Pt => {
    let p: Pt;
    do { p = { x: Math.floor(Math.random() * GCOLS), y: Math.floor(Math.random() * GROWS) }; }
    while (s.some(q => q.x === p.x && q.y === p.y));
    return p;
  };

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, GCOLS * CELL, GROWS * CELL);

    // Subtle grid dots
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    for (let x = 0; x < GCOLS; x++)
      for (let y = 0; y < GROWS; y++)
        ctx.fillRect(x * CELL + CELL / 2 - 1, y * CELL + CELL / 2 - 1, 2, 2);

    // Food — glowing white square
    ctx.shadowColor = '#fff';
    ctx.shadowBlur  = 12;
    ctx.fillStyle   = '#fff';
    ctx.fillRect(food.current.x * CELL + 5, food.current.y * CELL + 5, CELL - 10, CELL - 10);
    ctx.shadowBlur  = 0;

    // Snake — orange head, fading tail
    const len = snake.current.length;
    snake.current.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : 0.35 + (0.65 * (len - i) / len);
      ctx.fillStyle = i === 0 ? ORANGE : `rgba(255,77,0,${alpha})`;
      if (i === 0) { ctx.shadowColor = ORANGE; ctx.shadowBlur = 14; }
      ctx.fillRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2);
      ctx.shadowBlur = 0;
    });
  }, []);

  const reset = useCallback(() => {
    snake.current   = [{ x: 10, y: 10 }];
    dir.current     = 'R';
    nextDir.current = 'R';
    food.current    = { x: 5, y: 5 };
    running.current = true;
    deadRef.current = false;
    setScore(0);
    setIsDead(false);
    draw();
  }, [draw]);

  useEffect(() => {
    if (!open) return;
    reset();

    // Capture phase so we intercept before section nav
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, Dir> = {
        ArrowUp: 'U', w: 'U', W: 'U',
        ArrowDown: 'D', s: 'D', S: 'D',
        ArrowLeft: 'L', a: 'L', A: 'L',
        ArrowRight: 'R', d: 'R', D: 'R',
      };
      const d = map[e.key];
      if (!d) return;
      e.stopPropagation();
      e.preventDefault();
      const opp: Record<Dir, Dir> = { U: 'D', D: 'U', L: 'R', R: 'L' };
      if (d !== opp[dir.current]) nextDir.current = d;
    };
    window.addEventListener('keydown', onKey, { capture: true });

    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);

    const tick = setInterval(() => {
      if (!running.current || deadRef.current) return;
      dir.current = nextDir.current;
      const head = { ...snake.current[0] };
      if (dir.current === 'U') head.y--;
      if (dir.current === 'D') head.y++;
      if (dir.current === 'L') head.x--;
      if (dir.current === 'R') head.x++;

      if (
        head.x < 0 || head.x >= GCOLS ||
        head.y < 0 || head.y >= GROWS ||
        snake.current.some(s => s.x === head.x && s.y === head.y)
      ) {
        deadRef.current = true;
        running.current = false;
        setIsDead(true);
        draw();
        return;
      }

      const ate = head.x === food.current.x && head.y === food.current.y;
      snake.current = [head, ...snake.current.slice(0, ate ? undefined : -1)];
      if (ate) { food.current = rndFood(snake.current); setScore(p => p + 1); }
      draw();
    }, 130);

    return () => {
      clearInterval(tick);
      window.removeEventListener('keydown', onKey, { capture: true });
      window.removeEventListener('keydown', onEsc);
    };
  }, [open, reset, draw, onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.88)',
      backdropFilter: 'blur(24px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none',
      transition: `opacity 0.4s ${EASE}`,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: GCOLS * CELL, marginBottom: 14,
      }}>
        <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.45em', color: ORANGE, textTransform: 'uppercase' }}>
          {String(score).padStart(3, '0')}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase' }}>
            WASD / ARROWS
          </span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'none', color: 'rgba(255,255,255,0.35)', fontSize: 22, lineHeight: 1, transition: `color 0.2s` }}
            onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
            data-cur
          >×</button>
        </div>
      </div>

      {/* Canvas */}
      <div style={{ position: 'relative' }}>
        <canvas
          ref={canvasRef}
          width={GCOLS * CELL}
          height={GROWS * CELL}
          style={{ display: 'block', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10 }}
        />
        {isDead && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'rgba(8,8,8,0.85)', borderRadius: 10,
          }}>
            <p style={{ fontFamily: cab, fontWeight: 900, fontSize: 56, color: ORANGE, letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
              GAME OVER
            </p>
            <p style={{ fontFamily: mono, fontSize: 11, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.45em', margin: '12px 0 0', textTransform: 'uppercase' }}>
              SCORE — {String(score).padStart(3, '0')}
            </p>
            <button
              onClick={reset}
              style={{
                marginTop: 28, fontFamily: mono, fontSize: 10, letterSpacing: '0.5em',
                textTransform: 'uppercase', color: '#080808', background: ORANGE,
                border: 'none', cursor: 'none', padding: '10px 28px', borderRadius: 6,
              }}
              data-cur
            >PLAY AGAIN</button>
          </div>
        )}
      </div>

      <p style={{ fontFamily: mono, fontSize: 9, color: 'rgba(255,255,255,0.14)', letterSpacing: '0.4em', marginTop: 14, textTransform: 'uppercase' }}>
        ESC TO EXIT
      </p>
    </div>
  );
}

// ── Movie card ────────────────────────────────────────────────────────────────

function MovieCard() {
  const [hov, setHov] = useState(false);
  const [vis, setVis] = useState(true);

  if (!vis) return null;
  return (
    <div style={{
      position: 'fixed', bottom: 'clamp(1.5rem,3vw,3rem)', right: 'clamp(1.5rem,3vw,3rem)',
      zIndex: 150,
    }}>
      <a
        href="https://media.sidmatrix.xyz/web/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        data-cur
      >
        <div style={{
          background: hov ? 'rgba(255,77,0,0.1)' : 'rgba(255,255,255,0.04)',
          border: `1px solid ${hov ? ORANGE : 'rgba(255,255,255,0.08)'}`,
          borderRadius: '1rem',
          backdropFilter: 'blur(20px)',
          padding: '12px 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          transition: `all 0.3s ${EASE}`,
          transform: hov ? 'translateY(-3px)' : 'none',
          boxShadow: hov ? `0 16px 40px rgba(255,77,0,0.12)` : 'none',
        }}>
          {/* Icon */}
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
              margin: '3px 0 0', letterSpacing: '0.3em',
              textTransform: 'uppercase',
              transition: `color 0.3s ${EASE}`,
            }}>
              JELLYFIN · SIDMATRIX ↗
            </p>
          </div>
        </div>
      </a>
      {/* Dismiss */}
      <button
        onClick={() => setVis(false)}
        style={{
          position: 'absolute', top: -8, right: -8,
          width: 20, height: 20, borderRadius: '50%',
          background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'none', color: 'rgba(255,255,255,0.3)', fontSize: 12, lineHeight: 1,
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.color = '#fff'; }}
        onMouseLeave={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
        data-cur
      >×</button>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

const TOTAL = 4;

export default function App() {
  const [loaded,    setLoaded]  = useState(false);
  const [section,   setSection] = useState(0);
  const [menuOpen,  setMenu]    = useState(false);
  const [snakeOpen, setSnake]   = useState(false);
  const lastScroll = useRef(0);

  // Scroll to navigate (blocked when menu or snake is open)
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (menuOpen || snakeOpen) return;
      const now = Date.now();
      if (now - lastScroll.current < 900) return;
      lastScroll.current = now;
      if (e.deltaY > 30)  setSection(p => Math.min(p + 1, TOTAL - 1));
      if (e.deltaY < -30) setSection(p => Math.max(p - 1, 0));
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [menuOpen, snakeOpen]);

  // Keyboard — G opens snake; arrows navigate sections
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (snakeOpen) return;           // snake handles its own keys via capture
      if (e.key === 'g' || e.key === 'G') { setSnake(true); return; }
      if (menuOpen) return;
      if (e.key === 'ArrowDown'  || e.key === 'ArrowRight') setSection(p => Math.min(p + 1, TOTAL - 1));
      if (e.key === 'ArrowUp'    || e.key === 'ArrowLeft')  setSection(p => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, snakeOpen]);

  const SECTIONS = [
    <HeroSection    key="hero"    onNext={() => setSection(1)} />,
    <AboutSection   key="about" />,
    <WorkSection    key="work"  />,
    <ContactSection key="contact" onSnake={() => setSnake(true)} />,
  ];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', background: '#080808', overflow: 'hidden' }}>
      <CustomCursor />
      <GrainOverlay />
      <MeshBlobs />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Header onMenu={() => setMenu(true)} />

      <CircularMenu
        open={menuOpen}
        onClose={() => setMenu(false)}
        onGo={i => setSection(i)}
      />

      <SnakeGame open={snakeOpen} onClose={() => setSnake(false)} />

      {/* Sections */}
      <div style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
        {SECTIONS.map((s, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              opacity: section === i ? 1 : 0,
              transform: section === i ? 'scale(1)' : section > i ? 'scale(0.94)' : 'scale(1.03)',
              transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
              pointerEvents: section === i ? 'auto' : 'none',
              overflowY: (i === 2 || i === 1) ? 'auto' : 'hidden',
            }}
          >
            {s}
          </div>
        ))}
      </div>

      {loaded && <SectionProgress cur={section} total={TOTAL} />}
      {loaded && <MovieCard />}
    </div>
  );
}
