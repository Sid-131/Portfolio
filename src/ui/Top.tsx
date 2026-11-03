import { useEffect, useRef, useState, type PointerEvent as RPointer } from 'react';
import { motion as m, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { NAV, LOOPS, BUILT_ACROSS, LINKS } from '../content';
import { Sun, Moon, Pause, Play, Menu, Close, Check, Down, Award, Cap, Ext } from './Icons';
import { SplitHeading, ScrollProgress, VelocityMarquee, useMotionOn, EASE } from '../motion';

type NavProps = {
  theme: 'dark' | 'light';
  onTheme: () => void;
  motion: boolean;
  onMotion: () => void;
  ready: boolean;
};

export function Nav({ theme, onTheme, motion, onMotion, ready }: NavProps) {
  const [stuck, setStuck] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const last = useRef(0);

  // Tuck the nav away while scrolling down, bring it back on the way up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setStuck(y > 8);
      if (Math.abs(y - last.current) > 6) {
        setHidden(y > last.current && y > 320);
        last.current = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    [...NAV.map(n => n.id), 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <m.header className={`nav${stuck ? ' is-stuck' : ''}`}
      initial={motion ? { y: -80, opacity: 0 } : false}
      animate={ready ? { y: hidden && !open ? -76 : 0, opacity: 1 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}>
      <div className="wrap nav__in">
        <a className="brand" href="#top" aria-label="Siddhant Singh, back to top">
          <span className="brand__mark" aria-hidden="true">SS</span>
          <span className="brand__name">
            Siddhant Singh
            <span className="brand__sub">Support engineer turned product builder</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Sections">
          {NAV.map(n => (
            <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined}>
              {n.label}
              {active === n.id && <m.span layoutId="nav-pill" className="nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
            </a>
          ))}
        </nav>

        <button className="iconbtn" onClick={onMotion} aria-pressed={!motion}
          aria-label={motion ? 'Pause motion' : 'Resume motion'} title={motion ? 'Pause motion' : 'Resume motion'}>
          {motion ? <Pause /> : <Play />}
        </button>
        <button className="iconbtn" onClick={onTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light theme' : 'Dark theme'}>
          <AnimatePresence mode="wait" initial={false}>
            <m.span key={theme} style={{ display: 'grid' }}
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.25 }}>
              {theme === 'dark' ? <Sun /> : <Moon />}
            </m.span>
          </AnimatePresence>
        </button>
        <a className="btn btn--solid btn--sm nav__talk" href="#contact" data-magnetic>Let’s talk</a>
        <button className="iconbtn nav__menu" onClick={() => setOpen(o => !o)}
          aria-expanded={open} aria-controls="nav-sheet" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav id="nav-sheet" className="nav__sheet" aria-label="Sections"
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: EASE }}>
            {NAV.map((n, i) => (
              <m.a key={n.id} href={`#${n.id}`} onClick={close}
                initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: EASE }}>
                {n.label}
              </m.a>
            ))}
            <a className="btn btn--solid" href="#contact" onClick={close}>Let’s talk</a>
          </m.nav>
        )}
      </AnimatePresence>
      <ScrollProgress />
    </m.header>
  );
}

/* Ticket → pattern → tool card, with a slight 3D tilt toward the pointer */

function LoopCard({ ready }: { ready: boolean }) {
  const on = useMotionOn();
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  useEffect(() => {
    if (!on || hold || !ready) return;
    const t = window.setTimeout(() => setI(n => (n + 1) % LOOPS.length), 7000);
    return () => window.clearTimeout(t);
  }, [i, on, hold, ready]);

  const tilt = (e: RPointer<HTMLDivElement>) => {
    if (!on || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 10);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8);
  };
  const reset = () => { rx.set(0); ry.set(0); setHold(false); };

  const loop = LOOPS[i];

  return (
    <m.div className="loop-wrap"
      initial={on ? { opacity: 0, y: 60, rotate: 2 } : false}
      animate={ready ? { opacity: 1, y: 0, rotate: 0 } : undefined}
      transition={{ duration: 1.1, delay: 0.55, ease: EASE }}>
      <m.div className="loop" style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
        onPointerMove={tilt} onPointerEnter={() => setHold(true)} onPointerLeave={reset}
        onFocus={() => setHold(true)} onBlur={() => setHold(false)}>
        <div className="loop__top">
          <span className="loop__title">From ticket to tool</span>
          <span className="loop__count">{String(i + 1).padStart(2, '0')} / {String(LOOPS.length).padStart(2, '0')}</span>
        </div>
        <div className="loop__bars" role="tablist" aria-label="Examples">
          {LOOPS.map((l, n) => (
            <button key={l.name} role="tab" id={`loop-tab-${n}`} aria-controls="loop-panel"
              aria-selected={n === i} className={`loop__bar${n < i ? ' is-done' : ''}`}
              onClick={() => setI(n)}>
              {l.name}
              <i key={n === i ? `on-${i}-${ready}` : 'off'} className={ready ? 'run' : ''} />
            </button>
          ))}
        </div>
        <div className="loop__body" id="loop-panel" role="tabpanel" aria-labelledby={`loop-tab-${i}`}>
          <AnimatePresence mode="wait">
            <m.div key={i} className="loop__stages" exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }} transition={{ duration: 0.35 }}>
              {[
                { k: 'Ticket', cls: 'stage--ticket', t: `“${loop.ticket}”` },
                { k: 'Pattern', cls: 'stage--pattern', t: loop.pattern },
                { k: 'Tool', cls: 'stage--tool', t: loop.tool },
              ].map((s, n) => (
                <m.div key={s.k} className={`stage ${s.cls}`}
                  initial={on ? { opacity: 0, x: -18, filter: 'blur(6px)' } : false}
                  animate={ready ? { opacity: 1, x: 0, filter: 'blur(0px)' } : undefined}
                  transition={{ duration: 0.6, delay: (i === 0 ? 0.9 : 0.1) + n * 0.75, ease: EASE }}>
                  <span className="stage__k">{s.k}</span><p>{s.t}</p>
                </m.div>
              ))}
              <m.p className="loop__result"
                initial={on ? { opacity: 0, scale: 0.94 } : false}
                animate={ready ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.5, delay: (i === 0 ? 0.9 : 0.1) + 2.3, type: 'spring', stiffness: 260, damping: 18 }}>
                <Check />{loop.result}
              </m.p>
            </m.div>
          </AnimatePresence>
        </div>
      </m.div>
    </m.div>
  );
}

export function Hero({ ready }: { ready: boolean }) {
  const on = useMotionOn();
  const ref = useRef<HTMLElement>(null);
  const gx = useMotionValue(70);
  const gy = useMotionValue(30);
  const sx = useSpring(gx, { stiffness: 60, damping: 20 });
  const sy = useSpring(gy, { stiffness: 60, damping: 20 });
  const glow = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(600px circle at ${x}% ${y}%, var(--accent-soft), transparent 60%)`);
  // Parallax layers around the hero card: each drifts against the pointer at its own depth.
  const nearX = useTransform(sx, v => (v - 50) * -0.5);
  const nearY = useTransform(sy, v => (v - 50) * -0.4);
  const farX = useTransform(sx, v => (v - 50) * 0.25);
  const farY = useTransform(sy, v => (v - 50) * 0.2);

  const follow = (e: RPointer<HTMLElement>) => {
    if (!on || e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(((e.clientX - r.left) / r.width) * 100);
    gy.set(((e.clientY - r.top) / r.height) * 100);
  };

  const rise = (d: number) => ({
    initial: on ? { opacity: 0, y: 24 } : false,
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.9, delay: d, ease: EASE },
  } as const);

  return (
    <section className="hero" aria-labelledby="hero-title" ref={ref} onPointerMove={follow}>
      <m.div className="hero__glow" style={{ background: glow }} aria-hidden="true" />
      <div className="wrap hero__grid">
        <div>
          <m.p className="hero__status" {...rise(0.05)}>
            <span className="pulse" aria-hidden="true" />Bengaluru, India. Open to product roles.
          </m.p>
          <SplitHeading as="h1" id="hero-title" play={ready} delay={0.1}
            main="I work the escalations." em="Then I build what stops them." />
          <m.p className="lede" {...rise(0.75)}>
            I’m Siddhant, a Technical Support Engineer II at Dell on PowerScale storage. Four years of high-severity
            cases for banks, telcos and media companies taught me where enterprise products break. Alongside the queue,
            I ship the tools my team now runs on.
          </m.p>
          <m.div className="hero__cta" {...rise(0.9)}>
            <a className="btn btn--solid" href="#work" data-magnetic>See the work <span className="bob"><Down /></span></a>
            <a className="btn" href={LINKS.resume} target="_blank" rel="noopener" data-magnetic>Résumé (PDF) <span className="ext"><Ext /></span></a>
          </m.div>
          <div className="hero__badges">
            {[
              { ico: <Cap />, h: 'NextLeap PM Fellow', s: 'Product Management Fellowship' },
              { ico: <Award />, h: '2× Dell Game Changer', s: 'Plus Bravo, top 3% of engineers' },
            ].map((b, n) => (
              <m.div className="badge" key={b.h} {...rise(1.05 + n * 0.1)}>
                <span className="badge__ico">{b.ico}</span>
                <span><strong>{b.h}</strong><span>{b.s}</span></span>
              </m.div>
            ))}
          </div>
        </div>
        <div className="loop-stage">
          <m.div className="orbits" style={{ x: farX, y: farY }} aria-hidden="true"
            initial={on ? { opacity: 0, scale: 0.85 } : false} animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.6, delay: 0.4, ease: EASE }}>
            <svg className="orbit orbit--a" viewBox="0 0 400 400"><ellipse cx="200" cy="200" rx="196" ry="120" /></svg>
            <svg className="orbit orbit--b" viewBox="0 0 400 400"><ellipse cx="200" cy="200" rx="150" ry="190" /><circle cx="200" cy="10" r="5" /></svg>
            <svg className="orbit orbit--c" viewBox="0 0 400 400"><circle cx="200" cy="200" r="186" strokeDasharray="2 10" /></svg>
          </m.div>
          <m.span className="spark spark--a" style={{ x: nearX, y: nearY }} aria-hidden="true"><Spark /></m.span>
          <m.span className="spark spark--b" style={{ x: farX, y: farY }} aria-hidden="true"><Spark /></m.span>
          <m.span className="spark spark--c" style={{ x: nearX, y: farY }} aria-hidden="true"><Spark /></m.span>
          <LoopCard ready={ready} />
        </div>
      </div>

      <m.div className="across" {...rise(1.25)}>
        <p className="across__lbl wrap">Built across</p>
        <VelocityMarquee base={-1.6}>
          {BUILT_ACROSS.map(b => (
            <span className="across__item" key={b.org}>
              <span className="across__org">{b.org}</span>
              <span className="across__what">{b.what}</span>
              <span className="across__star" aria-hidden="true">✳</span>
            </span>
          ))}
        </VelocityMarquee>
      </m.div>
    </section>
  );
}

function Spark() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <path d="M20 0c1.5 11 7.5 17 20 20-12.5 3-18.5 9-20 20-1.5-11-7.5-17-20-20 12.5-3 18.5-9 20-20Z" fill="currentColor" />
    </svg>
  );
}
