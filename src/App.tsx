import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Nav, Hero } from './ui/Top';
import { Signal, Work, CaseDrawer } from './ui/Work';
import { RealWorld, Principle, Skills, Playground, Journey, Person, Contact, Footer } from './ui/Rest';
import { Snake } from './ui/Snake';
import { MotionRoot, Curtain, scrollLock } from './motion';

type Theme = 'dark' | 'light';
const CASE_HASH = '#case/assistant';

const read = (k: string, store: Storage | null = null) => { try { return (store ?? localStorage).getItem(k); } catch { return null; } };
const write = (k: string, v: string, store: Storage | null = null) => { try { (store ?? localStorage).setItem(k, v); } catch { /* storage unavailable */ } };
const session = () => { try { return sessionStorage; } catch { return null; } };

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => (read('theme') === 'light' ? 'light' : 'dark'));
  const [motion, setMotion] = useState<boolean>(() => {
    const saved = read('motion');
    if (saved) return saved === 'on';
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  // The intro curtain plays once per visit, and never when motion is paused or a deep link is opened.
  const ready0 = () => !motion || window.location.hash === CASE_HASH || read('intro', session()) === 'seen';
  const [ready, setReady] = useState<boolean>(ready0);
  const [curtain, setCurtain] = useState(() => !ready0());
  const [caseOpen, setCaseOpen] = useState(() => window.location.hash === CASE_HASH);
  const [snake, setSnake] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d0f11' : '#f1f2f0');
    write('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
    write('motion', motion ? 'on' : 'off');
    if (!motion) setReady(true);
  }, [motion]);

  // Content starts revealing as the curtain lifts, not after it has gone.
  const introLift = useCallback(() => { write('intro', 'seen', session()); setReady(true); }, []);
  const introDone = useCallback(() => setCurtain(false), []);

  // The deep dive has its own URL, so it can be linked and survives a refresh.
  useEffect(() => {
    const sync = () => setCaseOpen(window.location.hash === CASE_HASH);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const openCase = useCallback(() => {
    if (window.location.hash !== CASE_HASH) window.history.pushState(null, '', CASE_HASH);
    setCaseOpen(true);
  }, []);

  const closeCase = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname);
    setCaseOpen(false);
  }, []);

  // Intercept in-page links to the deep dive.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (a && a.getAttribute('href') === CASE_HASH) { e.preventDefault(); openCase(); }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [openCase]);

  // G opens the game from anywhere, unless the person is typing.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (snake || caseOpen || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement;
      if (t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(t.tagName)) return;
      if (e.key === 'g' || e.key === 'G') setSnake(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [snake, caseOpen]);

  useEffect(() => {
    const locked = caseOpen || snake || !ready;
    document.body.style.overflow = locked ? 'hidden' : '';
    scrollLock(locked);
  }, [caseOpen, snake, ready]);

  const closeSnake = useCallback(() => setSnake(false), []);

  return (
    <MotionRoot on={motion}>
      <a className="skip" href="#main">Skip to content</a>
      <span id="top" />
      {curtain && motion && <Curtain onLift={introLift} onDone={introDone} />}
      <Nav theme={theme} onTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        motion={motion} onMotion={() => setMotion(v => !v)} ready={ready} />
      <main id="main">
        <Hero ready={ready} />
        <Signal />
        <Work />
        <RealWorld />
        <Principle />
        <Skills onOpenCase={openCase} />
        <Playground onPlay={() => setSnake(true)} />
        <Journey />
        <Person />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>{caseOpen && <CaseDrawer key="case" onClose={closeCase} />}</AnimatePresence>
      {snake && <Snake onClose={closeSnake} />}
    </MotionRoot>
  );
}
