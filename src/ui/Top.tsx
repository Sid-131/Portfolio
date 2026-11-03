import { useEffect, useState } from 'react';
import { NAV, LOOPS, BUILT_ACROSS, LINKS } from '../content';
import { Sun, Moon, Pause, Play, Menu, Close, Check, Down, Award, Cap, Ext } from './Icons';

type NavProps = {
  theme: 'dark' | 'light';
  onTheme: () => void;
  motion: boolean;
  onMotion: () => void;
};

export function Nav({ theme, onTheme, motion, onMotion }: NavProps) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
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
    <header className={`nav${stuck ? ' is-stuck' : ''}`}>
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
            <a key={n.id} href={`#${n.id}`} aria-current={active === n.id ? 'true' : undefined}>{n.label}</a>
          ))}
        </nav>

        <button className="iconbtn" onClick={onMotion} aria-pressed={!motion}
          aria-label={motion ? 'Pause motion' : 'Resume motion'} title={motion ? 'Pause motion' : 'Resume motion'}>
          {motion ? <Pause /> : <Play />}
        </button>
        <button className="iconbtn" onClick={onTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light theme' : 'Dark theme'}>
          {theme === 'dark' ? <Sun /> : <Moon />}
        </button>
        <a className="btn btn--solid btn--sm nav__talk" href="#contact">Let’s talk</a>
        <button className="iconbtn nav__menu" onClick={() => setOpen(o => !o)}
          aria-expanded={open} aria-controls="nav-sheet" aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav id="nav-sheet" className="nav__sheet" aria-label="Sections">
          {NAV.map(n => <a key={n.id} href={`#${n.id}`} onClick={close}>{n.label}</a>)}
          <a className="btn btn--solid" href="#contact" onClick={close}>Let’s talk</a>
        </nav>
      )}
    </header>
  );
}

function LoopCard({ motion }: { motion: boolean }) {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);

  useEffect(() => {
    if (!motion || hold) return;
    const t = window.setTimeout(() => setI(n => (n + 1) % LOOPS.length), 7000);
    return () => window.clearTimeout(t);
  }, [i, motion, hold]);

  const loop = LOOPS[i];

  return (
    <div className="loop" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}
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
            <i key={n === i ? `on-${i}` : 'off'} />
          </button>
        ))}
      </div>
      <div className="loop__body" id="loop-panel" role="tabpanel" aria-labelledby={`loop-tab-${i}`} key={i}>
        <div className="stage stage--ticket"><span className="stage__k">Ticket</span><p>“{loop.ticket}”</p></div>
        <div className="stage stage--pattern"><span className="stage__k">Pattern</span><p>{loop.pattern}</p></div>
        <div className="stage stage--tool"><span className="stage__k">Tool</span><p>{loop.tool}</p></div>
        <p className="loop__result"><Check />{loop.result}</p>
      </div>
    </div>
  );
}

export function Hero({ motion }: { motion: boolean }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap hero__grid">
        <div>
          <p className="hero__status"><span className="pulse" aria-hidden="true" />Bengaluru, India. Open to product roles.</p>
          <h1 id="hero-title" className="display">
            I work the escalations.
            <em>Then I build what stops them.</em>
          </h1>
          <p className="lede">
            I’m Siddhant, a Technical Support Engineer II at Dell on PowerScale storage. Four years of high-severity
            cases for banks, telcos and media companies taught me where enterprise products break. Alongside the queue,
            I ship the tools my team now runs on.
          </p>
          <div className="hero__cta">
            <a className="btn btn--solid" href="#work">See the work <Down /></a>
            <a className="btn" href={LINKS.resume} target="_blank" rel="noopener">Résumé (PDF) <span className="ext"><Ext /></span></a>
          </div>
          <div className="hero__badges">
            <div className="badge">
              <span className="badge__ico"><Cap /></span>
              <span><strong>NextLeap PM Fellow</strong><span>Product Management Fellowship</span></span>
            </div>
            <div className="badge">
              <span className="badge__ico"><Award /></span>
              <span><strong>2× Dell Game Changer</strong><span>Plus Bravo, top 3% of engineers</span></span>
            </div>
          </div>
        </div>
        <LoopCard motion={motion} />
      </div>

      <div className="across">
        <div className="wrap across__in">
          <p className="across__lbl">Built across</p>
          {BUILT_ACROSS.map(b => (
            <div className="across__item" key={b.org}>
              <p className="across__org">{b.org}</p>
              <p className="across__what">{b.what}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
