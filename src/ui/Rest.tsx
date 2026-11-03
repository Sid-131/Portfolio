import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import {
  RECOGNITION, SKILLS, PLAYGROUND, JOURNEY, DEFAULTS, OFF_CLOCK, LINKS,
  type PlayKind, type PlayItem,
} from '../content';
import { Ext, Left, Right, Plus, Glyph } from './Icons';

const isExternal = (href: string) => /^https?:/.test(href) || href.endsWith('.pdf');
const extProps = (href: string) => (isExternal(href) ? { target: '_blank', rel: 'noopener' } : {});

/* ── 02 In the real world ─────────────────────────────────────── */

export function RealWorld() {
  const checks = Array.from({ length: 30 });
  return (
    <section className="sec" id="real" aria-labelledby="real-title">
      <div className="wrap">
        <header className="sec-head">
          <p className="sec-index"><b>02</b> In the real world</p>
          <h2 id="real-title" className="display">The queue is the research.<em>Four years of it.</em></h2>
        </header>

        <div className="real">
          <p className="real__lead">
            At Dell I handle high-severity PowerScale escalations for banking, telecom and media customers: performance,
            failover, protocol and InfiniBand back-end issues. It’s where I learned what an outage costs a customer, and
            which missing tool would have prevented it.
          </p>

          <article className="panel" aria-labelledby="precheck-title">
            <p className="panel__kind">Dell, standard protocol</p>
            <h3 id="precheck-title">SyncIQ failover precheck</h3>
            <p>
              Co-built with a teammate: 30 automated checks on the source and target clusters before every failover and
              failback, ending in a single go / no-go call. One check that kept raising false alarms was cut, because a
              gate people learn to ignore protects nobody.
            </p>
            <div className="gate" role="img" aria-label="30 checks passed, one earlier check removed, verdict: go">
              <div className="gate__checks">
                <div className="gate__grid" aria-hidden="true">
                  {checks.map((_, i) => <i key={i} />)}
                </div>
                <p className="gate__cap">30 / 30 passed. Run on 1,000+ cases, zero failover incidents since.</p>
              </div>
              <div className="gate__verdict">GO</div>
            </div>
          </article>

          <div className="panel">
            <p className="panel__kind">Beyond my own queue</p>
            <ul className="team">
              <li>Mentor new hires on Admin and FS cases.</li>
              <li>Formed and led the team’s engagement group.</li>
              <li>Managed a vendor hardware team through six months of training.</li>
            </ul>
            <p className="panel__kind" style={{ marginTop: 26, marginBottom: 0 }}>Dell recognition</p>
            <ul className="list">
              {RECOGNITION.map(r => (
                <li key={r.title + r.date}>
                  <time>{r.date}</time>
                  <span><b>{r.title}</b>{r.note && <> · {r.note}</>}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Principle ────────────────────────────────────────────────── */

export function Principle() {
  return (
    <section className="principle" aria-label="A working principle">
      <div className="wrap">
        <figure>
          <blockquote>A gate people learn to ignore protects nobody.</blockquote>
          <figcaption>Why one check came out of the SyncIQ precheck: it kept raising false alarms, and engineers stop trusting a noisy gate.</figcaption>
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
          <p className="sec-index"><b>03</b> How I think and work</p>
          <h2 id="skills-title" className="display">Tools are easy to list.<em>Here’s where I used them.</em></h2>
          <p className="lede">Pick a capability to see the work behind it.</p>
        </header>

        <div className="tabs" role="tablist" aria-label="Capabilities">
          {SKILLS.map((s, i) => (
            <button key={s.id} ref={el => { tabs.current[i] = el; }}
              role="tab" id={`tab-${s.id}`} aria-controls={`panel-${s.id}`}
              aria-selected={sel === s.id} tabIndex={sel === s.id ? 0 : -1}
              className="tab" onClick={() => setSel(s.id)} onKeyDown={e => onKey(e, i)}>
              {s.label}
            </button>
          ))}
        </div>

        <div className="tabpanel" role="tabpanel" id={`panel-${skill.id}`} aria-labelledby={`tab-${skill.id}`}>
          <p className="tabpanel__sum">{skill.summary}</p>
          <div className="evidence">
            {skill.evidence.map(e => {
              const inner = (<><b>{e.title}{e.href && <span aria-hidden="true"><Ext /></span>}</b><p>{e.body}</p></>);
              if (!e.href) return <div className="ev" key={e.title}>{inner}</div>;
              if (e.href === '#case/assistant') {
                return <a className="ev" key={e.title} href={e.href} onClick={ev => { ev.preventDefault(); onOpenCase(); }}>{inner}</a>;
              }
              return <a className="ev" key={e.title} href={e.href} {...extProps(e.href)}>{inner}</a>;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 04 Playground ────────────────────────────────────────────── */

const FILTERS: ('All' | PlayKind)[] = ['All', 'Build', 'Research', 'Prototype', 'Game'];

function PlayCard({ p, onPlay }: { p: PlayItem; onPlay: () => void }) {
  return (
    <article className="card" aria-labelledby={`pg-${p.id}`}>
      <div className="card__art"><Glyph name={p.glyph} /></div>
      <p className="card__kind"><span>{p.kind}</span></p>
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
    </article>
  );
}

export function Playground({ onPlay }: { onPlay: () => void }) {
  const [filter, setFilter] = useState<'All' | PlayKind>('All');
  const [pos, setPos] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const items = useMemo(() => PLAYGROUND.filter(p => filter === 'All' || p.kind === filter), [filter]);

  useEffect(() => {
    setPos(0);
    track.current?.scrollTo({ left: 0 });
  }, [filter]);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('.card');
    if (!card) return;
    const step = card.offsetWidth + 16;
    setPos(Math.min(items.length - 1, Math.round(el.scrollLeft / step)));
  };

  const go = (d: number) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>('.card');
    if (!el || !card) return;
    el.scrollBy({ left: d * (card.offsetWidth + 16), behavior: document.documentElement.dataset.motion === 'off' ? 'auto' : 'smooth' });
  };

  return (
    <section className="sec" id="playground" aria-labelledby="pg-title">
      <div className="wrap">
        <header className="sec-head">
          <p className="sec-index"><b>04</b> The playground</p>
          <h2 id="pg-title" className="display">Built to learn.<em>Each one taught me something.</em></h2>
          <p className="lede">Things I built or took apart to learn by doing. Swipe, or use the arrows.</p>
        </header>

        <div className="pg__bar">
          <div className="filters" role="group" aria-label="Filter projects">
            {FILTERS.map(f => (
              <button key={f} className="filter" aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f === 'All' ? `All ${PLAYGROUND.length}` : f === 'Build' ? 'Builds' : f === 'Prototype' ? 'Prototypes' : f}
              </button>
            ))}
          </div>
          <div className="pg__nav">
            <button className="iconbtn" onClick={() => go(-1)} disabled={pos === 0} aria-label="Previous project"><Left /></button>
            <span className="pg__count" aria-live="polite">{String(pos + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}</span>
            <button className="iconbtn" onClick={() => go(1)} disabled={pos >= items.length - 1} aria-label="Next project"><Right /></button>
          </div>
        </div>

        <div className="track" ref={track} onScroll={onScroll} tabIndex={0} aria-label="Projects">
          {items.map(p => <PlayCard key={p.id} p={p} onPlay={onPlay} />)}
        </div>
      </div>
    </section>
  );
}

/* ── 05 Journey ───────────────────────────────────────────────── */

export function Journey() {
  return (
    <section className="sec" id="journey" aria-labelledby="journey-title">
      <div className="wrap">
        <header className="sec-head">
          <p className="sec-index"><b>05</b> My career, connected</p>
          <h2 id="journey-title" className="display">Three fields, one habit.<em>Find the failure point.</em></h2>
        </header>
        <div className="journey">
          <div className="journey__intro">
            <p>Civil engineering taught me failure modes.</p>
            <p>Support taught me what they cost.</p>
            <p>Product practice is where I get to prevent them.</p>
          </div>
          <ol className="tl">
            {JOURNEY.map(j => (
              <li key={j.when + j.role}>
                <time>{j.when}</time>
                <h3>{j.org} <span>{j.role}</span></h3>
                <p>{j.note}</p>
              </li>
            ))}
            <li className="now">
              <time>Now</time>
              <h3>Open to product roles <span>Based in Bengaluru</span></h3>
              <p>Product roles where customer signal and the ability to build both count.</p>
            </li>
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
          <p className="sec-index"><b>06</b> The person</p>
          <h2 id="person-title" className="display">I’ve been on the other end<em>of the escalation.</em></h2>
        </header>
        <div className="person">
          <div className="person__bio">
            <div className="photo">
              <img src="/avatar.jpg" alt="Siddhant Singh" loading="lazy"
                onError={e => { (e.currentTarget.parentElement as HTMLElement).style.display = 'none'; }} />
            </div>
            <p>
              I came to software sideways, from a civil engineering degree, and learned it the way support engineers do:
              one broken cluster at a time. The NextLeap Fellowship gave the product instinct a framework.
            </p>
            <p>
              The homelab that serves this site is where I try things before I pitch them at work. Most of what’s on this
              page started there.
            </p>
            <div className="offclock">
              <h3>Off the clock</h3>
              <ul>{OFF_CLOCK.map(o => <li key={o}>{o}</li>)}</ul>
            </div>
          </div>

          <div className="acc">
            <h3 className="acc__title">My default settings</h3>
            {DEFAULTS.map((d, i) => {
              const isOpen = open === i;
              return (
                <div className="acc__item" key={d.h}>
                  <button className="acc__btn" aria-expanded={isOpen} aria-controls={`acc-${i}`} id={`accb-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}>
                    {d.h}<span className="acc__ico"><Plus /></span>
                  </button>
                  <div className="acc__panel" id={`acc-${i}`} role="region" aria-labelledby={`accb-${i}`} data-open={isOpen}>
                    <div><p>{d.p}</p></div>
                  </div>
                </div>
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
      <div className="contact">
        <h2 id="contact-title" className="display">Open to product roles.<em>Bring the messy problem.</em></h2>
        <p className="contact__lede">
          I bring four years of customer signal, a builder’s habit, and a bias for measuring what shipped. You bring a
          problem worth solving.
        </p>
        <div className="mail">
          <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          <button className="copy" onClick={copy}>{copied ? 'Copied' : 'Copy email'}</button>
          <span className="sr" aria-live="polite">{copied ? 'Email copied' : ''}</span>
        </div>
        <div className="contact__links">
          <a className="btn btn--solid" href={LINKS.linkedin} target="_blank" rel="noopener">Connect on LinkedIn <span className="ext"><Ext /></span></a>
          <a className="btn" href={LINKS.github} target="_blank" rel="noopener">See the code on GitHub <span className="ext"><Ext /></span></a>
          <a className="btn" href={LINKS.resume} target="_blank" rel="noopener">Résumé (PDF) <span className="ext"><Ext /></span></a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const words = ['Work the ticket', 'Find the pattern', 'Ship the tool', 'Measure it honestly'];
  const run = (hidden?: boolean) => (
    <div className="marquee__run" aria-hidden={hidden || undefined}>
      {words.map(w => <span key={w}>{w}</span>)}
    </div>
  );
  return (
    <footer className="foot">
      <div className="marquee">{run()}{run(true)}</div>
      <div className="wrap foot__bar">
        <span>© 2026 Siddhant Singh. Self-hosted on a 2019 laptop.</span>
        <span style={{ display: 'flex', gap: 20 }}>
          <a href="#work">Work</a><a href="#skills">Skills</a><a href="#journey">Journey</a><a href="#top">Back to top</a>
        </span>
      </div>
    </footer>
  );
}

