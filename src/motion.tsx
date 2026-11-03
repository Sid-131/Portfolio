import {
  createContext, useContext, useEffect, useRef, useState, useCallback,
  type ReactNode, type ElementType, type CSSProperties,
} from 'react';
import {
  motion, MotionConfig, useInView, animate,
  useScroll, useSpring, useMotionValue, useVelocity, useTransform, useAnimationFrame,
  type MotionValue,
} from 'framer-motion';
import Lenis from '@studio-freight/lenis';

export const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Motion switch ─────────────────────────────────────────────
   One flag drives everything: smooth scroll, reveals, counters,
   marquees. The nav's pause button and prefers-reduced-motion set it. */

const MotionCtx = createContext(true);
export const useMotionOn = () => useContext(MotionCtx);

let lenisRef: Lenis | null = null;
export const scrollLock = (locked: boolean) => { if (lenisRef) { if (locked) lenisRef.stop(); else lenisRef.start(); } };

export function MotionRoot({ on, children }: { on: boolean; children: ReactNode }) {
  useEffect(() => {
    if (!on) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    lenisRef = lenis;
    let raf = 0;
    const loop = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // Route in-page anchor links through Lenis so they glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      const href = a?.getAttribute('href');
      if (!a || !href || !href.startsWith('#') || href.startsWith('#case/') || href === '#play') return;
      const el = href === '#top' ? document.body : document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: href === '#top' ? 0 : -72, duration: 1.4 });
      history.replaceState(null, '', href === '#top' ? location.pathname : href);
    };
    document.addEventListener('click', onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('click', onClick);
      lenis.destroy();
      lenisRef = null;
    };
  }, [on]);

  // Magnetic buttons: elements marked data-magnetic lean toward the pointer.
  useEffect(() => {
    if (!on || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    let current: HTMLElement | null = null;
    const move = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-magnetic]');
      if (current && current !== el) { current.style.transform = ''; current = null; }
      if (!el) return;
      current = el;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
      const y = (e.clientY - (r.top + r.height / 2)) * 0.38;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const leave = () => { if (current) { current.style.transform = ''; current = null; } };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerleave', leave);
    return () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerleave', leave); leave(); };
  }, [on]);

  return (
    <MotionCtx.Provider value={on}>
      <MotionConfig reducedMotion={on ? 'never' : 'always'} transition={{ ease: EASE }}>
        {children}
      </MotionConfig>
    </MotionCtx.Provider>
  );
}

/* ── Intro curtain ─────────────────────────────────────────── */

export function Curtain({ onLift, onDone }: { onLift: () => void; onDone: () => void }) {
  const [lift, setLift] = useState(false);
  const name = 'Siddhant.';
  const lifted = useRef(false);
  const go = useCallback(() => {
    if (lifted.current) return;
    lifted.current = true;
    setLift(true);
    window.setTimeout(onLift, 250);
  }, [onLift]);

  useEffect(() => {
    const t = window.setTimeout(go, 2700);
    const onKey = (e: KeyboardEvent) => { if (['Escape', 'Enter', ' '].includes(e.key)) go(); };
    window.addEventListener('keydown', onKey);
    return () => { window.clearTimeout(t); window.removeEventListener('keydown', onKey); };
  }, [go]);

  return (
    <motion.div className="curtain" aria-hidden="true" onClick={go}
      initial={{ y: 0 }} animate={lift ? { y: '-105%' } : { y: 0 }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => { if (lift) onDone(); }}>
      <motion.p className="curtain__label" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
        Welcome to the work of
      </motion.p>
      <p className="curtain__name">
        {[...name].map((ch, i) => (
          <span className="curtain__ch" key={i}>
            <motion.span initial={{ y: '110%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.045, ease: EASE }}>
              {ch}
            </motion.span>
          </span>
        ))}
      </p>
      <motion.div className="curtain__me"
        initial={{ y: '35%', opacity: 0, scale: 0.96 }} animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.25, ease: EASE }}>
        <motion.img src="/siddhant-wave.webp" alt="" width={573} height={1400} decoding="async"
          animate={{ rotate: [0, -2.5, 2, -1.5, 0] }}
          transition={{ duration: 1.3, delay: 1.1, ease: 'easeInOut' }} />
      </motion.div>
      <motion.div className="curtain__note"
        initial={{ opacity: 0, y: 16, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate: -5 }}
        transition={{ delay: 1.05, type: 'spring', stiffness: 260, damping: 18 }}>
        <span>Hi, I’m Siddhant.</span>
        <b>Ticket. Pattern. Tool.</b>
      </motion.div>
      <motion.svg className="curtain__spark" viewBox="0 0 40 40" aria-hidden="true"
        initial={{ rotate: 0, scale: 0 }} animate={{ rotate: 180, scale: 1 }} transition={{ duration: 1.6, ease: EASE }}>
        <path d="M20 0c1.5 11 7.5 17 20 20-12.5 3-18.5 9-20 20-1.5-11-7.5-17-20-20 12.5-3 18.5-9 20-20Z" fill="currentColor" />
      </motion.svg>
      <motion.p className="curtain__skip" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ delay: 1.2 }}>
        Tap to skip
      </motion.p>
    </motion.div>
  );
}

/* ── Split heading: each word rises out of a mask ──────────── */

type SplitProps = {
  as?: ElementType;
  id?: string;
  className?: string;
  main: string;
  em?: string;
  delay?: number;
  play?: boolean;          // for the hero: wait until the curtain lifts
};

export function SplitHeading({ as: Tag = 'h2', id, className = 'display', main, em, delay = 0, play = true }: SplitProps) {
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, margin: '0px 0px -12% 0px' });
  const on = useMotionOn();
  const go = !on || (seen && play);
  let i = 0;
  const words = (text: string) => text.split(' ').map((w, k, all) => {
    const d = delay + i++ * 0.05;
    return (
      <span key={k}>
        <span className="w">
          <motion.span className="w__in" initial={on ? { y: '108%', rotate: 4 } : false}
            animate={go ? { y: '0%', rotate: 0 } : undefined}
            transition={{ duration: 1, delay: d, ease: EASE }}>
            {w}
          </motion.span>
        </span>
        {k < all.length - 1 ? ' ' : ''}
      </span>
    );
  });
  return (
    <Tag id={id} ref={ref} className={className} aria-label={em ? `${main} ${em}` : main}>
      <span aria-hidden="true">{words(main)}</span>
      {em && <em aria-hidden="true">{words(em)}</em>}
    </Tag>
  );
}

/* ── Reveal: fade and rise when scrolled into view ─────────── */

type RevealProps = {
  as?: 'div' | 'p' | 'li' | 'article' | 'section' | 'figure' | 'header' | 'span';
  delay?: number;
  y?: number;
  scale?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  id?: string;
  amount?: number;
};

export function Reveal({ as = 'div', delay = 0, y = 32, scale, className, style, children, id, amount = 0.2 }: RevealProps) {
  const on = useMotionOn();
  const M = motion[as] as typeof motion.div;
  return (
    <M id={id} className={className} style={style}
      initial={on ? { opacity: 0, y, scale: scale ?? 1 } : false}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.9, delay, ease: EASE }}>
      {children}
    </M>
  );
}

/* ── Count-up number ───────────────────────────────────────── */

export function CountUp({ to, from = 0, duration = 1.8, prefix = '', suffix = '', comma = false, delay = 0 }:
  { to: number; from?: number; duration?: number; prefix?: string; suffix?: string; comma?: boolean; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const on = useMotionOn();
  const [v, setV] = useState(on ? from : to);
  useEffect(() => {
    if (!on) { setV(to); return; }
    if (!seen) return;
    const c = animate(from, to, { duration, delay, ease: [0.16, 1, 0.3, 1], onUpdate: setV });
    return () => c.stop();
  }, [seen, on, from, to, duration, delay]);
  const n = Math.round(v);
  return <span ref={ref}>{prefix}{comma ? n.toLocaleString('en-US') : n}{suffix}</span>;
}

/* ── Typewriter for the console mockup ─────────────────────── */

export function useTyped(text: string, start: boolean, speed = 28) {
  const on = useMotionOn();
  const [n, setN] = useState(on ? 0 : text.length);
  useEffect(() => {
    if (!on) { setN(text.length); return; }
    if (!start) return;
    let k = 0;
    const t = window.setInterval(() => { k++; setN(k); if (k >= text.length) window.clearInterval(t); }, speed);
    return () => window.clearInterval(t);
  }, [start, on, text, speed]);
  return { shown: text.slice(0, n), done: n >= text.length };
}

/* ── Scroll progress bar ───────────────────────────────────── */

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.span className="progress" style={{ scaleX: x }} aria-hidden="true" />;
}

/* ── Velocity marquee: drifts, speeds up with scrolling ────── */

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

export function VelocityMarquee({ children, base = -2.2, className = '' }: { children: ReactNode; base?: number; className?: string }) {
  const on = useMotionOn();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const vel = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(vel, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(1);
  const x: MotionValue<string> = useTransform(baseX, v => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (!on) return;
    let move = dir.current * base * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={`vm ${className}`}>
      <motion.div className="vm__track" style={{ x }}>
        <div className="vm__run">{children}</div>
        <div className="vm__run" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}
