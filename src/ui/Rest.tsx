import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type PointerEvent as RPointer, type ReactNode } from 'react';
import { motion as m, AnimatePresence, useInView, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from 'framer-motion';
import {
  RECOGNITION, SKILLS, PLAYGROUND, JOURNEY, DEFAULTS, OFF_CLOCK, LINKS,
  type PlayKind, type PlayItem,
} from '../content';
import { Ext, Left, Right, Plus, Glyph } from './Icons';
import { SplitHeading, Reveal, CountUp, VelocityMarquee, useMotionOn, EASE } from '../motion';

const isExternal = (href: string) => /^https?:/.test(href) || href.endsWith('.pdf');
const extProps = (href: string) => (isExternal(href) ? { target: '_blank', rel: 'noopener' } : {});

/* ── 02 In the real world ─────────────────────────────────────── */

function Gate() {
  const on = useMotionOn();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const go = seen || !on;
  return (
    <div ref={ref} className="gate" role="img" aria-label="30 checks passed, verdict: go">
      <div className="gate__checks">
        <div className="gate__grid" aria-hidden="true">
          {Array.from({ length: 30 }).map((_, i) => (
            <m.i key={i}
              initial={on ? { opacity: 0.12, scale: 0.6 } : false}
              animate={go ? { opacity: 0.9, scale: 1 } : undefined}
              transition={{ delay: 0.15 + i * 0.045, type: 'spring', stiffness: 500, damping: 22 }} />
          ))}
        </div>
        <p className="gate__cap"><CountUp to={30} duration={1.4} delay={0.15} /> / 30 passed. Run on 1,000+ cases, zero failover incidents since.</p>
      </div>
      <m.div className="gate__verdict"
        initial={on ? { opacity: 0, scale: 2.2, rotate: -12 } : false}
        animate={go ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
        transition={{ delay: 1.65, type: 'spring', stiffness: 380, damping: 14 }}>
        GO
      </m.div>
    </div>
  );
}

export function RealWorld() {
  return (
    <section className="sec" id="real" aria-labelledby="real-title">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="sec-index"><b>02</b> In the real world</Reveal>
          <SplitHeading id="real-title" main="The queue is the research." em="Four years of it." />
        </header>

        <div className="real">
          <Reveal as="p" className="real__lead">
            At Dell I handle high-severity PowerScale escalations for banking, telecom and media customers: performance,
            failover, protocol and InfiniBand back-end issues. It’s where I learned what an outage costs a customer, and
            which missing tool would have prevented it.
          </Reveal>

          <Reveal as="article" className="panel" y={60}>
            <p className="panel__kind">Dell, standard protocol</p>
            <h3 id="precheck-title">SyncIQ failover precheck</h3>
            <p>
              Co-built with a teammate: 30 automated checks on the source and target clusters before every failover and
              failback, ending in a single go / no-go call. One check that kept raising false alarms was cut, because a
              gate people learn to ignore protects nobody.
            </p>
            <Gate />
          </Reveal>

          <Reveal className="panel" y={60} delay={0.12}>
            <p className="panel__kind">Beyond my own queue</p>
            <ul className="team">
              {['Mentor new hires on Admin and FS cases.', 'Formed and led the team’s engagement group.', 'Managed a vendor hardware team through six months of training.']
                .map((t, n) => <Reveal as="li" key={t} delay={0.2 + n * 0.08} y={14}>{t}</Reveal>)}
            </ul>
            <p className="panel__kind" style={{ marginTop: 26, marginBottom: 0 }}>Dell recognition</p>
            <ul className="list">
              {RECOGNITION.map((r, n) => (
                <Reveal as="li" key={r.title + r.date} delay={0.3 + n * 0.08} y={14}>
                  <time>{r.date}</time>
                  <span><b>{r.title}</b>{r.note && <> · {r.note}</>}</span>
                </Reveal>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ── Principle: words light up as you scroll past ───────────── */

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.14, 1]);
  return <m.span style={{ opacity }}>{w}{i < n - 1 ? ' ' : ''}</m.span>;
}

export function Principle() {
  const on = useMotionOn();
  const ref = useRef<HTMLQuoteElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] });
  const words = 'A gate people learn to ignore protects nobody.'.split(' ');
  return (
    <section className="principle" aria-label="A working principle">
      <div className="wrap">
        <figure>
          <blockquote ref={ref} aria-label={words.join(' ')}>
            <span aria-hidden="true">
              {on ? words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />) : words.join(' ')}
            </span>
          </blockquote>
          <Reveal as="p" className="figcap" delay={0.1}>
            Why one check came out of the SyncIQ precheck: it kept raising false alarms, and engineers stop trusting a noisy gate.
          </Reveal>
        </figure>
      </div>
    </section>
  );
}

/* ── 03 Skills ────────────────────────────────────────────────── */

export function Skills({ onOpenCase }: { onOpenCase: () => void }) {
  const [sel, setSel] = useState(SKILLS[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const skill = SKILLS.find(s => s.id === sel)!;

  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const n = (i + dir + SKILLS.length) % SKILLS.length;
    setSel(SKILLS[n].id);
    tabs.current[n]?.focus();
  };

  return (
    <section className="sec" id="skills" aria-labelledby="skills-title">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="sec-index"><b>03</b> How I think and work</Reveal>
          <SplitHeading id="skills-title" main="Tools are easy to list." em="Here’s where I used them." />
          <Reveal as="p" className="lede" delay={0.3}>Pick a capability to see the work behind it.</Reveal>
        </header>

        <Reveal className="tabs" y={20}>
          <div role="tablist" aria-label="Capabilities" className="tabs__in">
            {SKILLS.map((s, i) => (
              <button key={s.id} ref={el => { tabs.current[i] = el; }}
                role="tab" id={`tab-${s.id}`} aria-controls={`panel-${s.id}`}
                aria-selected={sel === s.id} tabIndex={sel === s.id ? 0 : -1}
                className="tab" onClick={() => setSel(s.id)} onKeyDown={e => onKey(e, i)}>
                {sel === s.id && <m.span layoutId="tab-pill" className="tab__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="tab__label">{s.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="tabpanel" role="tabpanel" id={`panel-${skill.id}`} aria-labelledby={`tab-${skill.id}`}>
          <AnimatePresence mode="wait">
            <m.div key={skill.id} className="tabpanel__grid"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}>
              <m.p className="tabpanel__sum" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
                {skill.summary}
              </m.p>
              <div className="evidence">
                {skill.evidence.map((e, n) => {
                  const inner = (<><b>{e.title}{e.href && <span aria-hidden="true"><Ext /></span>}</b><p>{e.body}</p></>);
                  const anim = { initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay: 0.08 + n * 0.08, ease: EASE } };
                  if (!e.href) return <m.div className="ev" key={e.title} {...anim}>{inner}</m.div>;
                  if (e.href === '#case/assistant') {
                    return <m.a className="ev" key={e.title} href={e.href} {...anim} onClick={ev => { ev.preventDefault(); onOpenCase(); }}>{inner}</m.a>;
                  }
                  return <m.a className="ev" key={e.title} href={e.href} {...extProps(e.href)} {...anim}>{inner}</m.a>;
                })}
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ── 04 Playground ────────────────────────────────────────────── */

const FILTERS: ('All' | PlayKind)[] = ['All', 'Build', 'Research', 'Prototype', 'Game'];

function PlayCard({ p, n, onPlay }: { p: PlayItem; n: number; onPlay: () => void }) {
  const on = useMotionOn();
  const ref = useRef<HTMLElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  return (
    <m.article ref={ref} className={`card${seen || !on ? ' is-in' : ''}`} aria-labelledby={`pg-${p.id}`}
      initial={on ? { opacity: 0, y: 50 } : false}
      animate={seen || !on ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, delay: Math.min(n, 4) * 0.08, ease: EASE }}
      whileHover={on ? { y: -8 } : undefined}>
      <div className="card__art"><Glyph name={p.glyph} /></div>
      <p className="card__kind"><span>{p.kind}</span><span className="card__n">{String(n + 1).padStart(2, '0')}</span></p>
      <h3 className="card__title" id={`pg-${p.id}`}>{p.title}</h3>
      <div>
        <p className="card__line">{p.line}</p>
        {p.takeaway && <p className="card__take">{p.takeaway}</p>}
      </div>
      <div className="card__foot">
        <ul className="tags">{p.tags.map(t => <li key={t}>{t}</li>)}</ul>
        <div className="card__links">
          {p.links.length === 0 && <span className="muted">You’re looking at it.</span>}
          {p.links.map((l, i) => l.href === '#play'
            ? <button key={l.label} className="btn btn--sm btn--solid" onClick={onPlay}>{l.label}</button>
            : <a key={l.label} className={`btn btn--sm${i === 0 ? ' btn--solid' : ''}`} href={l.href} {...extProps(l.href)}>
                {l.label}{isExternal(l.href) && <span className="ext"><Ext /></span>}
              </a>)}
        </div>
      </div>
    </m.article>
  );
}

export function Playground({ onPlay }: { onPlay: () => void }) {
  const [filter, setFilter] = useState<'All' | PlayKind>('All');
  const [pos, setPos] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const items = useMemo(() => PLAYGROUND.filter(p => filter === 'All' || p.kind === filter), [filter]);
  const progress = useMotionValue(0);
  const bar = useSpring(progress, { stiffness: 200, damping: 30 });

  useEffect(() => {
    setPos(0);
    progress.set(0);
    track.current?.scrollTo({ left: 0 });
  }, [filter, progress]);

  const step = () => {
    const card = track.current?.querySelector<HTMLElement>('.card');
    return card ? card.offsetWidth + 16 : 300;
  };
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setPos(Math.min(items.length - 1, Math.round(el.scrollLeft / step())));
    const max = el.scrollWidth - el.clientWidth;
    progress.set(max > 0 ? el.scrollLeft / max : 1);
  };
  const go = (d: number) => {
    track.current?.scrollBy({ left: d * step(), behavior: document.documentElement.dataset.motion === 'off' ? 'auto' : 'smooth' });
  };

  // Click-and-drag to scroll with a mouse; touch keeps native swiping.
  const down = (e: RPointer<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const moveDrag = (e: RPointer<HTMLDivElement>) => {
    const d = drag.current, el = track.current;
    if (!d || !el) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) { d.moved = true; el.classList.add('is-dragging'); }
    if (d.moved) el.scrollLeft = d.left - dx;
  };
  const up = () => {
    const el = track.current, d = drag.current;
    drag.current = null;
    if (!el || !d?.moved) return;
    el.classList.remove('is-dragging');
    const target = Math.round(el.scrollLeft / step()) * step();
    el.scrollTo({ left: target, behavior: 'smooth' });
    // Swallow the click that ends a drag so cards don't open by accident.
    const stop = (ev: MouseEvent) => { ev.preventDefault(); ev.stopPropagation(); };
    el.addEventListener('click', stop, { capture: true, once: true });
    window.setTimeout(() => el.removeEventListener('click', stop, { capture: true }), 0);
  };

  return (
    <section className="sec" id="playground" aria-labelledby="pg-title">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="sec-index"><b>04</b> The playground</Reveal>
          <SplitHeading id="pg-title" main="Built to learn." em="Each one taught me something." />
          <Reveal as="p" className="lede" delay={0.3}>Things I built or took apart to learn by doing. Swipe, drag, or use the arrows.</Reveal>
        </header>

        <Reveal className="pg__bar" y={20}>
          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map(f => (
              <button key={f} className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {filter === f && <m.span layoutId="filter-pill" className="filter__pill" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                <span className="filter__label">{f === 'All' ? `All ${PLAYGROUND.length}` : f === 'Build' ? 'Builds' : f === 'Prototype' ? 'Prototypes' : f}</span>
              </button>
            ))}
          </div>
          <div className="pg__nav">
            <button className="iconbtn" onClick={() => go(-1)} disabled={pos === 0} aria-label="Previous project"><Left /></button>
            <span className="pg__count" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.span key={pos} style={{ display: 'inline-block' }}
                  initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }} transition={{ duration: 0.3 }}>
                  {String(pos + 1).padStart(2, '0')}
                </m.span>
              </AnimatePresence>
              {' '}/ {String(items.length).padStart(2, '0')}
            </span>
            <button className="iconbtn" onClick={() => go(1)} disabled={pos >= items.length - 1} aria-label="Next project"><Right /></button>
          </div>
        </Reveal>

        <div className="track" ref={track} onScroll={onScroll} tabIndex={0} aria-label="Projects"
          onPointerDown={down} onPointerMove={moveDrag} onPointerUp={up} onPointerLeave={up}>
          <AnimatePresence mode="popLayout">
            {items.map((p, n) => <PlayCard key={`${filter}-${p.id}`} p={p} n={n} onPlay={onPlay} />)}
          </AnimatePresence>
        </div>
        <div className="pg__progress" aria-hidden="true"><m.span style={{ scaleX: bar }} /></div>
      </div>
    </section>
  );
}

/* ── 05 Journey: the line draws as you scroll ─────────────────── */

function Stop({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const passed = useInView(ref, { margin: '0px 0px -55% 0px' });
  return (
    <m.li ref={ref} className={`${className}${passed ? ' is-lit' : ''}`}
      initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: EASE }}>
      {children}
    </m.li>
  );
}

export function Journey() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });
  return (
    <section className="sec" id="journey" aria-labelledby="journey-title">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="sec-index"><b>05</b> My career, connected</Reveal>
          <SplitHeading id="journey-title" main="Three fields, one habit." em="Find the failure point." />
        </header>
        <div className="journey">
          <div className="journey__intro">
            {['Civil engineering taught me failure modes.', 'Support taught me what they cost.', 'Product practice is where I get to prevent them.']
              .map((t, n) => <Reveal as="p" key={t} delay={n * 0.12} y={20}>{t}</Reveal>)}
          </div>
          <ol className="tl" ref={ref}>
            <m.span className="tl__line" style={{ scaleY: line }} aria-hidden="true" />
            {JOURNEY.map(j => (
              <Stop key={j.when + j.role}>
                <time>{j.when}</time>
                <h3>{j.org} <span>{j.role}</span></h3>
                <p>{j.note}</p>
              </Stop>
            ))}
            <Stop className="now">
              <time>Now</time>
              <h3>Open to product roles <span>Based in Bengaluru</span></h3>
              <p>Product roles where customer signal and the ability to build both count.</p>
            </Stop>
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ── 06 Person ────────────────────────────────────────────────── */

export function Person() {
  const [open, setOpen] = useState(0);
  return (
    <section className="sec" id="person" aria-labelledby="person-title">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="sec-index"><b>06</b> The person</Reveal>
          <SplitHeading id="person-title" main="I’ve been on the other end" em="of the escalation." />
        </header>
        <div className="person">
          <div className="person__bio">
            <Reveal className="photo" scale={0.85} y={0}>
              <img src="/siddhant-portrait.webp" alt="Siddhant Singh, as a 3D cartoon" loading="lazy" width={640} height={640}
                onError={e => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }} />
            </Reveal>
            <Reveal as="p" delay={0.1}>
              I came to software sideways, from a civil engineering degree, and learned it the way support engineers do:
              one broken cluster at a time. The NextLeap Fellowship gave the product instinct a framework.
            </Reveal>
            <Reveal as="p" delay={0.18}>
              The homelab that serves this site is where I try things before I pitch them at work. Most of what’s on this
              page started there.
            </Reveal>
            <div className="offclock">
              <Reveal as="p" className="offclock__h" delay={0.2}>Off the clock</Reveal>
              <ul>
                {OFF_CLOCK.map((o, n) => (
                  <m.li key={o} initial={{ opacity: 0, scale: 0.6, y: 10 }} whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.8 }} transition={{ delay: 0.25 + n * 0.07, type: 'spring', stiffness: 380, damping: 20 }}
                    whileHover={{ y: -3 }}>
                    {o}
                  </m.li>
                ))}
              </ul>
            </div>
          </div>

          <div className="acc">
            <Reveal as="p" className="acc__title">My default settings</Reveal>
            {DEFAULTS.map((d, i) => {
              const isOpen = open === i;
              return (
                <Reveal className="acc__item" key={d.h} delay={0.1 + i * 0.1} y={24}>
                  <button className="acc__btn" aria-expanded={isOpen} aria-controls={`acc-${i}`} id={`accb-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    {d.h}<span className="acc__ico"><Plus /></span>
                  </button>
                  <div className="acc__panel" id={`acc-${i}`} role="region" aria-labelledby={`accb-${i}`} data-open={isOpen}>
                    <div><p>{d.p}</p></div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Contact + footer ─────────────────────────────────────────── */

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${LINKS.email}`;
    }
  };

  return (
    <section className="wrap" id="contact" aria-labelledby="contact-title" style={{ scrollMarginTop: 68 }}>
      <Reveal className="contact" y={80} scale={0.96} amount={0.25}>
        <span className="contact__orb" aria-hidden="true" />
        <SplitHeading id="contact-title" main="Open to product roles." em="Bring the messy problem." delay={0.2} />
        <Reveal as="p" className="contact__lede" delay={0.4}>
          I bring four years of customer signal, a builder’s habit, and a bias for measuring what shipped. You bring a
          problem worth solving.
        </Reveal>
        <Reveal className="mail" delay={0.5}>
          <a href={`mailto:${LINKS.email}`} className="mail__a">{LINKS.email}</a>
          <button className="copy" onClick={copy}>
            <AnimatePresence mode="wait" initial={false}>
              <m.span key={copied ? 'y' : 'n'} style={{ display: 'inline-block' }}
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
                {copied ? 'Copied' : 'Copy email'}
              </m.span>
            </AnimatePresence>
          </button>
          <span className="sr" aria-live="polite">{copied ? 'Email copied' : ''}</span>
        </Reveal>
        <Reveal className="contact__links" delay={0.6}>
          <a className="btn btn--solid" href={LINKS.linkedin} target="_blank" rel="noopener" data-magnetic>Connect on LinkedIn <span className="ext"><Ext /></span></a>
          <a className="btn" href={LINKS.github} target="_blank" rel="noopener" data-magnetic>See the code on GitHub <span className="ext"><Ext /></span></a>
          <a className="btn" href={LINKS.resume} target="_blank" rel="noopener" data-magnetic>Résumé (PDF) <span className="ext"><Ext /></span></a>
        </Reveal>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const words = ['Work the ticket', 'Find the pattern', 'Ship the tool', 'Measure it honestly'];
  return (
    <footer className="foot">
      <VelocityMarquee base={-2.4} className="foot__marquee">
        {words.map(w => <span key={w} className="foot__word">{w}<span className="foot__star" aria-hidden="true">✳</span></span>)}
      </VelocityMarquee>
      <div className="wrap foot__bar">
        <span>© 2026 Siddhant Singh. Self-hosted on a 2019 laptop.</span>
        <span style={{ display: 'flex', gap: 20 }}>
          <a href="#work">Work</a><a href="#skills">Skills</a><a href="#journey">Journey</a><a href="#top">Back to top</a>
        </span>
      </div>
    </footer>
  );
}
