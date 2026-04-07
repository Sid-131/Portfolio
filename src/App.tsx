import { useState, useEffect, useRef, useCallback } from 'react';

// ── Snake constants ───────────────────────────────────────────────────────────
const GRID = 20, CELL = 18, SIZE = GRID * CELL;
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Pt = { x: number; y: number };
type GameStatus = 'idle' | 'playing' | 'over';
function randomFood(snake: Pt[]): Pt {
  let p: Pt;
  do { p = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) }; }
  while (snake.some(s => s.x === p.x && s.y === p.y));
  return p;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const SKILLS = [
  'Product Strategy', 'RAG / LLMs', 'Docker & Linux',
  'Python & FastAPI', 'User Research', 'Enterprise Storage',
];

const PROJECTS = [
  {
    id: 'homelab',
    name: 'Sidmatrix Homelab',
    sub: '19-container self-hosted infrastructure monitored by a custom Python observability engine. $0/month.',
    tags: ['Docker', 'Python', 'Linux'],
    href: 'https://github.com/Sid-131',
  },
  {
    id: 'rag',
    name: 'RAG Chatbot',
    sub: 'Production RAG-based mutual fund FAQ chatbot with dual-layer guardrails — FastAPI, LangChain, ChromaDB.',
    tags: ['FastAPI', 'LangChain', 'Gemini'],
    href: 'https://github.com/Sid-131/RAG_chat_bot',
  },
  {
    id: 'lumynex',
    name: 'Lumynex v1.0',
    sub: 'Self-healing Windows display manager — detects GPU, fixes layouts, ships as a standalone EXE.',
    tags: ['Python', 'Windows API', 'PyInstaller'],
    href: 'https://github.com/Sid-131/lumynex/releases/tag/v1.0',
  },
  {
    id: 'relay',
    name: 'Relay.app Teardown',
    sub: 'Deep-dive product teardown of new-user onboarding — PSYCH framework, 60+ G2 reviews, 3 prioritised fixes.',
    tags: ['PM Teardown', 'Onboarding', 'PSYCH'],
    href: '/relay_onboarding.pdf',
  },
  {
    id: 'cube',
    name: 'Cube AI Teardown',
    sub: 'Product teardown & growth audit of Cube AI — 6 UX/trust problems identified, 5 interventions, competitive analysis vs Semrush & Jasper.',
    tags: ['PM Teardown', 'Growth Audit', 'UX Analysis'],
    href: '/Cube_AI_Product_Teardown.pdf',
  },
  {
    id: 'synciq',
    name: 'SyncIQ Precheck Tool',
    sub: 'Automated 7-section precheck for PowerScale SyncIQ failover — eliminates manual checklist blind spots.',
    tags: ['Python', 'Bash', 'Dell'],
    href: 'https://github.com/Sid-131',
  },
];

// ── Snake Game ────────────────────────────────────────────────────────────────

function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const snakeRef = useRef<Pt[]>([]);
  const dirRef = useRef<Dir>('RIGHT');
  const nextDirRef = useRef<Dir>('RIGHT');
  const foodRef = useRef<Pt>({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const statusRef = useRef<GameStatus>('idle');

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#2d2a24';
    ctx.fillRect(0, 0, SIZE, SIZE);
    ctx.strokeStyle = 'rgba(241,229,213,0.05)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke();
    }
    const f = foodRef.current;
    ctx.fillStyle = '#34bfff';
    ctx.beginPath();
    ctx.arc(f.x * CELL + CELL / 2, f.y * CELL + CELL / 2, CELL / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    snakeRef.current.forEach((seg, i) => {
      const alpha = i === 0 ? 1 : Math.max(0.25, 1 - i * 0.03);
      ctx.fillStyle = i === 0 ? '#f1e5d5' : `rgba(241,229,213,${alpha})`;
      ctx.beginPath();
      ctx.roundRect(seg.x * CELL + 1, seg.y * CELL + 1, CELL - 2, CELL - 2, 3);
      ctx.fill();
    });
  }, []);

  const endGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    statusRef.current = 'over';
    setStatus('over');
    setBest(prev => Math.max(prev, scoreRef.current));
  }, []);

  const tick = useCallback(() => {
    dirRef.current = nextDirRef.current;
    const head = snakeRef.current[0];
    const nh: Pt = {
      x: head.x + (dirRef.current === 'RIGHT' ? 1 : dirRef.current === 'LEFT' ? -1 : 0),
      y: head.y + (dirRef.current === 'DOWN' ? 1 : dirRef.current === 'UP' ? -1 : 0),
    };
    if (nh.x < 0 || nh.x >= GRID || nh.y < 0 || nh.y >= GRID) { endGame(); return; }
    if (snakeRef.current.some(s => s.x === nh.x && s.y === nh.y)) { endGame(); return; }
    const newSnake = [nh, ...snakeRef.current];
    if (nh.x === foodRef.current.x && nh.y === foodRef.current.y) {
      scoreRef.current += 10; setScore(scoreRef.current);
      foodRef.current = randomFood(newSnake);
    } else { newSnake.pop(); }
    snakeRef.current = newSnake;
    draw();
  }, [draw, endGame]);

  const startGame = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    snakeRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    dirRef.current = nextDirRef.current = 'RIGHT';
    foodRef.current = randomFood(snakeRef.current);
    scoreRef.current = 0; setScore(0);
    statusRef.current = 'playing'; setStatus('playing');
    draw();
    timerRef.current = setInterval(tick, 120);
  }, [draw, tick]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) e.preventDefault();
      const d = dirRef.current;
      if (e.key === 'ArrowUp' && d !== 'DOWN') nextDirRef.current = 'UP';
      else if (e.key === 'ArrowDown' && d !== 'UP') nextDirRef.current = 'DOWN';
      else if (e.key === 'ArrowLeft' && d !== 'RIGHT') nextDirRef.current = 'LEFT';
      else if (e.key === 'ArrowRight' && d !== 'LEFT') nextDirRef.current = 'RIGHT';
      else if (e.key === 'Enter' && statusRef.current !== 'playing') startGame();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [startGame]);

  useEffect(() => { draw(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [draw]);

  const handleDpad = (d: Dir) => {
    const cur = dirRef.current;
    if (d === 'UP' && cur !== 'DOWN') nextDirRef.current = 'UP';
    else if (d === 'DOWN' && cur !== 'UP') nextDirRef.current = 'DOWN';
    else if (d === 'LEFT' && cur !== 'RIGHT') nextDirRef.current = 'LEFT';
    else if (d === 'RIGHT' && cur !== 'LEFT') nextDirRef.current = 'RIGHT';
  };

  const dpadBtn: React.CSSProperties = {
    width: 44, height: 44, borderRadius: 10,
    border: '1px solid rgba(45,42,36,0.12)',
    background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, color: '#2d2a24',
    cursor: 'none', userSelect: 'none',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    transition: 'background 0.15s ease',
  };

  return (
    <section id="game" style={{ padding: '0 clamp(24px, 5vw, 80px) 100px' }}>
      <p className="mono-label">// Interactive</p>
      <h2 style={{
        fontFamily: "'Urbanist', sans-serif", fontWeight: 900,
        fontSize: 'clamp(44px, 6vw, 72px)', letterSpacing: '-0.04em', lineHeight: 1,
        color: '#2d2a24', marginTop: 8, marginBottom: 40,
      }}>
        While You're Here
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{
          background: '#fff', borderRadius: 24,
          boxShadow: '0 4px 32px rgba(0,0,0,0.08)',
          padding: 24, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        }}>
          {/* Score bar */}
          <div style={{ width: SIZE, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: '#5f5646', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Nokia Snake v1.0
            </span>
            <div style={{ display: 'flex', gap: 16 }}>
              {best > 0 && <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: '#5f5646' }}>Best: {best}</span>}
              <span style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: '#2d2a24' }}># {score}</span>
            </div>
          </div>

          {/* Canvas */}
          <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(45,42,36,0.08)' }}>
            <canvas ref={canvasRef} width={SIZE} height={SIZE} style={{ display: 'block' }} />

            {status === 'idle' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 16,
                background: 'rgba(45,42,36,0.88)', backdropFilter: 'blur(4px)',
              }}>
                <p style={{ fontFamily: "'Share Tech Mono'", fontSize: 10, color: 'rgba(241,229,213,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Classic Nokia Snake
                </p>
                <button onClick={startGame} className="cta-pill" style={{ fontSize: 13, padding: '10px 28px' }}>
                  Start Game
                </button>
                <p style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: 'rgba(241,229,213,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Arrow keys or D-pad · Enter to start
                </p>
              </div>
            )}

            {status === 'over' && (
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 8,
                background: 'rgba(45,42,36,0.92)', backdropFilter: 'blur(4px)',
              }}>
                <p style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: '#34bfff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Game Over</p>
                <p style={{ fontFamily: "'Urbanist'", fontWeight: 900, fontSize: 48, color: '#f1e5d5', letterSpacing: '-0.04em', lineHeight: 1 }}>{score}</p>
                <p style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: 'rgba(241,229,213,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>points scored</p>
                <button onClick={startGame} className="cta-pill">Play Again</button>
              </div>
            )}
          </div>

          {/* D-pad */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <button style={dpadBtn} onPointerDown={() => handleDpad('UP')}>▲</button>
            <div style={{ display: 'flex', gap: 4 }}>
              <button style={dpadBtn} onPointerDown={() => handleDpad('LEFT')}>◀</button>
              <div style={{ width: 44 }} />
              <button style={dpadBtn} onPointerDown={() => handleDpad('RIGHT')}>▶</button>
            </div>
            <button style={dpadBtn} onPointerDown={() => handleDpad('DOWN')}>▼</button>
          </div>
          <p style={{ fontFamily: "'Share Tech Mono'", fontSize: 9, color: '#5f5646', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Eat food to grow · Avoid walls & yourself
          </p>
        </div>
      </div>
    </section>
  );
}

// ── Jellyfin Easter Egg ───────────────────────────────────────────────────────

function JellyfinCard() {
  return (
    <div
      onClick={() => window.open('https://media.sidmatrix.xyz/web/', '_blank')}
      style={{
        background: '#fff', borderRadius: 16, padding: '20px 24px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        border: '1px solid rgba(45,42,36,0.07)',
        cursor: 'none', transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex', alignItems: 'center', gap: 16, maxWidth: 380,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.transform = 'none';
        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
        background: 'linear-gradient(135deg, #00a4dc 0%, #0090c8 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 24,
      }}>
        🎬
      </div>
      <div>
        <p style={{ fontFamily: "'Urbanist'", fontWeight: 700, fontSize: 15, color: '#2d2a24' }}>
          Want to watch a movie?
        </p>
        <p style={{ fontFamily: "'Share Tech Mono'", fontSize: 11, color: '#5f5646', marginTop: 3 }}>
          media.sidmatrix.xyz · email for credentials
        </p>
      </div>
      <span style={{ marginLeft: 'auto', fontSize: 16, color: '#dfd2bf' }}>↗</span>
    </div>
  );
}

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Particle Orb ──────────────────────────────────────────────────────────────

function ParticleOrb() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
    };
    resize();
    window.addEventListener('resize', resize);

    // Fibonacci sphere
    const N = 280;
    const phi = Math.PI * (3 - Math.sqrt(5));
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const t = phi * i;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r };
    });

    let angle = 0;
    let animId: number;

    const draw = () => {
      const dpr = window.devicePixelRatio;
      const W = canvas.width / dpr;
      const H = canvas.height / dpr;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(dpr, dpr);

      const R = Math.min(W, H) * 0.44;
      const cx = W / 2;
      const cy = H / 2;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      // Mouse-driven tilt
      const tiltX = (mouseRef.current.y - window.innerHeight / 2) * 0.0002;
      const tiltY = (mouseRef.current.x - window.innerWidth / 2) * 0.0002;
      const cosTX = Math.cos(tiltX), sinTX = Math.sin(tiltX);
      const cosTY = Math.cos(tiltY), sinTY = Math.sin(tiltY);

      const proj = pts.map(({ x, y, z }) => {
        // Y-axis rotation
        const rx = x * cosA - z * sinA;
        const ry = y;
        const rz = x * sinA + z * cosA;
        // X-axis tilt (mouse)
        const ry2 = ry * cosTX - rz * sinTX;
        const rz2 = ry * sinTX + rz * cosTX;
        // Y-axis tilt (mouse)
        const rx2 = rx * cosTY + rz2 * sinTY;
        const rz3 = -rx * sinTY + rz2 * cosTY;
        const depth = (rz3 + 1.6) / 2.6;
        return { sx: cx + rx2 * R, sy: cy + ry2 * R, depth };
      }).sort((a, b) => a.depth - b.depth);

      proj.forEach(({ sx, sy, depth }) => {
        ctx.beginPath();
        ctx.arc(sx, sy, depth * 2.8 + 0.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52,191,255,${(depth * 0.75 + 0.05).toFixed(2)})`;
        ctx.fill();
      });

      ctx.restore();
      angle += 0.004;
      animId = requestAnimationFrame(draw);
    };

    draw();
    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', onMouse);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}

// ── Custom Cursor ─────────────────────────────────────────────────────────────

function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });

  useEffect(() => {
    let id: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      if (ref.current) {
        ref.current.style.transform =
          `translate(${pos.current.x - 10}px, ${pos.current.y - 10}px)`;
      }
      id = requestAnimationFrame(animate);
    };
    animate();

    const move = (e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('a,button,.project-card,.cta-pill,.cta-fill,.skill-pill'))
        ref.current?.classList.add('hovered');
    };
    const out = () => ref.current?.classList.remove('hovered');

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return <div ref={ref} className="cursor-dot" />;
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(24px, 5vw, 80px)',
        background: scrolled ? 'rgba(241,229,213,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(223,210,191,0.6)' : 'none',
        transition: 'background 0.4s ease, border-color 0.4s ease',
      }}
    >
      {/* Logo mark */}
      <a
        href="#hero"
        style={{
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 900, fontSize: 20,
          color: '#2d2a24', textDecoration: 'none',
          letterSpacing: '-0.03em',
        }}
      >
        SS
      </a>

      {/* Right nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {['About', 'Projects', 'Contact'].map(s => (
          <a
            key={s}
            href={`#${s.toLowerCase()}`}
            className="mono-label"
            style={{ textDecoration: 'none', color: '#5f5646', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#2d2a24')}
            onMouseLeave={e => (e.currentTarget.style.color = '#5f5646')}
          >
            {s}
          </a>
        ))}
        <a href="mailto:siddhant.singh131@outlook.com" className="cta-pill" style={{ padding: '8px 20px', fontSize: 13 }}>
          GET IN TOUCH
        </a>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  const stagger = (word: string, baseDelay: number) =>
    word.split('').map((ch, i) => (
      <span
        key={i}
        className={`hero-letter${vis ? ' visible' : ''}`}
        style={{ transitionDelay: `${baseDelay + i * 40}ms` }}
      >
        {ch}
      </span>
    ));

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: '80px clamp(24px, 5vw, 80px) 0',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Left: text */}
      <div style={{ flex: '0 0 55%', zIndex: 2, paddingTop: 40 }}>
        <p
          className="mono-label"
          style={{
            marginBottom: 24, color: '#34bfff',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s',
          }}
        >
          // PM · Builder · Bengaluru, India
        </p>

        <h1
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(64px, 9vw, 112px)',
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
            color: '#2d2a24',
            overflow: 'hidden',
          }}
        >
          <div style={{ display: 'block', overflow: 'hidden' }}>
            {stagger('SIDDHANT', 200)}
          </div>
          <div style={{ display: 'block', overflow: 'hidden', color: '#34bfff' }}>
            {stagger('SINGH', 600)}
          </div>
        </h1>

        <p
          style={{
            marginTop: 36, fontSize: 18, color: '#5f5646', maxWidth: 440, lineHeight: 1.6,
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 1s, transform 0.6s ease 1s',
          }}
        >
          Builds products that turn enterprise chaos into clarity — from 1,000+ production incidents to shipped tools people actually use.
        </p>

        <div
          style={{
            marginTop: 40, display: 'flex', gap: 16, flexWrap: 'wrap',
            opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s ease 1.2s, transform 0.6s ease 1.2s',
          }}
        >
          <a href="#projects" className="cta-pill">View Work</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-pill">
            Resume ↗
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            marginTop: 80, display: 'flex', alignItems: 'center', gap: 12,
            opacity: vis ? 0.5 : 0,
            transition: 'opacity 0.6s ease 1.5s',
          }}
        >
          <div style={{
            width: 1, height: 48,
            background: 'linear-gradient(to bottom, #5f5646, transparent)',
          }} />
          <span className="mono-label">scroll</span>
        </div>
      </div>

      {/* Right: Particle orb */}
      <div
        style={{
          position: 'absolute', right: 0, top: 0, bottom: 0,
          width: '48%', pointerEvents: 'none',
        }}
      >
        <ParticleOrb />
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────────────────────

function About() {
  const { ref, visible } = useReveal();

  return (
    <section id="about" ref={ref} style={{ padding: '120px clamp(24px, 5vw, 80px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <p className={`mono-label reveal${visible ? ' visible' : ''}`}>
            // About
          </p>
          <h2
            className={`reveal reveal-delay-1${visible ? ' visible' : ''}`}
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(44px, 5vw, 72px)',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#2d2a24',
              marginTop: 16,
            }}
          >
            Siddhant<br />
            <span style={{ color: '#34bfff' }}>Singh.</span>
          </h2>
          <p
            className={`mono-label reveal reveal-delay-2${visible ? ' visible' : ''}`}
            style={{ marginTop: 20, color: '#34bfff' }}
          >
            // Bengaluru, India · Dell Technologies
          </p>

          <p
            className={`reveal reveal-delay-3${visible ? ' visible' : ''}`}
            style={{ marginTop: 32, color: '#5f5646', lineHeight: 1.7, fontSize: 15 }}
          >
            3.5 years resolving 1,000+ enterprise production incidents (S1/S2) at Dell. I learned product failure from the customer's side — under pressure, in real time. Then I built the tools that should've existed: a RAG chatbot, a Windows display manager, a 19-container homelab, PM teardowns. The NextLeap PM Fellowship is where the product thinking got formalised.
          </p>
        </div>

        {/* Right: skills */}
        <div>
          <p className={`mono-label reveal${visible ? ' visible' : ''}`}>
            // Skills
          </p>
          <div
            className={`reveal reveal-delay-1${visible ? ' visible' : ''}`}
            style={{ marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: 10 }}
          >
            {SKILLS.map((s, i) => (
              <span
                key={s}
                className="skill-pill"
                style={{ transitionDelay: `${0.1 + i * 0.05}s` }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div
            className={`reveal reveal-delay-3${visible ? ' visible' : ''}`}
            style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}
          >
            {[
              { val: '1,000+', label: 'Enterprise incidents resolved' },
              { val: '4', label: 'Shipped products' },
              { val: '3.5 yrs', label: 'At Dell Technologies' },
              { val: '$0/mo', label: '19-container homelab cost' },
            ].map(({ val, label }) => (
              <div key={label}>
                <p style={{
                  fontFamily: "'Urbanist', sans-serif",
                  fontWeight: 900,
                  fontSize: 40,
                  letterSpacing: '-0.04em',
                  color: '#2d2a24',
                  lineHeight: 1,
                }}>
                  {val}
                </p>
                <p className="mono-label" style={{ marginTop: 6 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────

function Projects() {
  const { ref, visible } = useReveal();

  return (
    <section id="projects" ref={ref} style={{ padding: '40px clamp(24px, 5vw, 80px) 120px' }}>
      <div className={`reveal${visible ? ' visible' : ''}`}>
        <p className="mono-label">// Selected</p>
        <h2
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(56px, 8vw, 96px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#2d2a24',
            marginTop: 8, marginBottom: 16,
          }}
        >
          Projects
        </h2>
      </div>

      <div style={{ borderBottom: '1px solid #dfd2bf' }}>
        {PROJECTS.map((p, i) => (
          <a
            key={p.id}
            href={p.href}
            target={p.href.startsWith('http') ? '_blank' : undefined}
            rel={p.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`project-card reveal reveal-delay-${Math.min(i + 1, 5)}${visible ? ' visible' : ''}`}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 24 }}
          >
            <span className="project-card-num">{String(i + 1).padStart(2, '0')}</span>
            <div style={{ flex: 1 }}>
              <p className="project-card-name">{p.name}</p>
              <p className="project-card-sub" style={{ marginTop: 4 }}>{p.sub}</p>
            </div>
            <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
              {p.tags.map(t => (
                <span
                  key={t}
                  className="mono-label"
                  style={{
                    background: 'rgba(52,191,255,0.08)',
                    border: '1px solid rgba(52,191,255,0.2)',
                    borderRadius: 4,
                    padding: '4px 10px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="project-card-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────

function Contact() {
  const { ref, visible } = useReveal();

  return (
    <section
      id="contact"
      ref={ref}
      style={{ padding: '120px clamp(24px, 5vw, 80px)', textAlign: 'left' }}
    >
      <p className={`mono-label reveal${visible ? ' visible' : ''}`}>// Contact</p>
      <h2
        className={`reveal reveal-delay-1${visible ? ' visible' : ''}`}
        style={{
          fontFamily: "'Urbanist', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(56px, 8vw, 100px)',
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          color: '#2d2a24',
          marginTop: 16,
        }}
      >
        Let's work<br />
        <span style={{ paddingLeft: 'clamp(24px, 4vw, 80px)' }}>together.</span>
      </h2>

      <div
        className={`reveal reveal-delay-2${visible ? ' visible' : ''}`}
        style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 24 }}
      >
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <a
            href="mailto:siddhant.singh131@outlook.com"
            className="cta-fill"
            onClick={e => {
              // Fallback: copy email if mailto doesn't open
              e.preventDefault();
              window.location.href = 'mailto:siddhant.singh131@outlook.com';
            }}
          >
            siddhant.singh131@outlook.com ↗
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-pill">
            Resume ↗
          </a>
        </div>
        <JellyfinCard />
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: '#f5efe6', borderTop: '1px solid #e8ddd0' }}>
      <div
        style={{
          maxWidth: 1280, margin: '0 auto',
          padding: '40px clamp(24px, 5vw, 80px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 32 }}>
          {[
            { label: 'LinkedIn', href: 'https://linkedin.com/in/siddhant-singh-3b58681a7' },
            { label: 'GitHub', href: 'https://github.com/Sid-131' },
            { label: 'Email', href: 'mailto:siddhant.singh131@outlook.com' },
          ].map(l => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="mono-label"
              style={{ textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2d2a24')}
              onMouseLeave={e => (e.currentTarget.style.color = '#5f5646')}
            >
              {l.label}
            </a>
          ))}
        </div>

        <p className="mono-label">© 2026 Siddhant Singh. All rights reserved.</p>

        <p className="mono-label" style={{ color: '#34bfff' }}>
          PM · Builder · Bengaluru
        </p>
      </div>
    </footer>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: '#f1e5d5', maxWidth: '100vw' }}>
      <CustomCursor />
      <Header />
      <Hero />
      <SnakeGame />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
