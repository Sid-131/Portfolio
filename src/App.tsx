import { useCallback, useEffect, useRef, useState } from 'react';
import { Nav, Hero } from './ui/Top';
import { Signal, Work, CaseDrawer } from './ui/Work';
import { RealWorld, Principle, Skills, Playground, Journey, Person, Contact, Footer } from './ui/Rest';
import { Snake } from './ui/Snake';

type Theme = 'dark' | 'light';
const CASE_HASH = '#case/assistant';

const read = (k: string) => { try { return localStorage.getItem(k); } catch { return null; } };
const write = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => (read('theme') === 'light' ? 'light' : 'dark'));
  const [motion, setMotion] = useState<boolean>(() => {
    const saved = read('motion');
    if (saved) return saved === 'on';
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [caseOpen, setCaseOpen] = useState(() => window.location.hash === CASE_HASH);
  const [snake, setSnake] = useState(false);
  const scrollY = useRef(0);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#0d0f11' : '#f1f2f0');
    write('theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
    write('motion', motion ? 'on' : 'off');
  }, [motion]);

  // The deep dive has its own URL, so it can be linked and survives a refresh.
  useEffect(() => {
    const sync = () => setCaseOpen(window.location.hash === CASE_HASH);
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const openCase = useCallback(() => {
    scrollY.current = window.scrollY;
    if (window.location.hash !== CASE_HASH) window.history.pushState(null, '', CASE_HASH);
    setCaseOpen(true);
  }, []);

  const closeCase = useCallback(() => {
    window.history.replaceState(null, '', window.location.pathname);
    setCaseOpen(false);
    window.scrollTo({ top: scrollY.current });
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
    document.body.style.overflow = caseOpen || snake ? 'hidden' : '';
  }, [caseOpen, snake]);

  const closeSnake = useCallback(() => setSnake(false), []);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <span id="top" />
      <Nav theme={theme} onTheme={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
        motion={motion} onMotion={() => setMotion(m => !m)} />
      <main id="main">
        <Hero motion={motion} />
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
      {caseOpen && <CaseDrawer onClose={closeCase} />}
      {snake && <Snake onClose={closeSnake} />}
    </>
  );
}
