import { useEffect, useRef, useState } from 'react';
import { motion as m, useInView, useScroll, useTransform } from 'framer-motion';
import { FEATURES, ASSISTANT_CASE, SIGNALS, type Feature } from '../content';
import { Ext, Info, Close } from './Icons';
import { SplitHeading, Reveal, CountUp, useTyped, useMotionOn, scrollLock, EASE } from '../motion';

const isExternal = (href: string) => /^https?:/.test(href);

function LinkBtn({ href, label, solid }: { href: string; label: string; solid?: boolean }) {
  const ext = isExternal(href) || href.endsWith('.pdf');
  return (
    <a className={`btn btn--sm${solid ? ' btn--solid' : ''}`} href={href} data-magnetic
      {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>
      {label}{ext && <span className="ext"><Ext /></span>}
    </a>
  );
}

/* ── Mockups that play out when scrolled into view ─────────── */

const CMD = 'isi smb shares create finance /ifs/data/finance';

function AssistantMock() {
  const on = useMotionOn();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const [phase, setPhase] = useState(on ? 0 : 4);   // 0 idle, 1 question, 2 thinking, 3 answer, 4 cited
  const { shown, done } = useTyped(CMD, phase >= 3, 26);

  useEffect(() => {
    if (!on) { setPhase(4); return; }
    if (!seen) return;
    const t = [
      window.setTimeout(() => setPhase(1), 250),
      window.setTimeout(() => setPhase(2), 900),
      window.setTimeout(() => setPhase(3), 2000),
    ];
    return () => t.forEach(window.clearTimeout);
  }, [seen, on]);
  useEffect(() => { if (done && phase === 3) setPhase(4); }, [done, phase]);

  const pop = (show: boolean, d = 0) => ({
    initial: on ? { opacity: 0, y: 10, scale: 0.97 } : false,
    animate: show ? { opacity: 1, y: 0, scale: 1 } : undefined,
    transition: { duration: 0.5, delay: d, ease: EASE },
  } as const);

  return (
    <div ref={ref} className="mock" role="img" aria-label="Illustration: the assistant answering a OneFS question inside the web console with a copyable command and a cited source">
      <div className="mock__bar">
        <span className="dots"><i /><i /><i /></span>
        <b>PowerScale OneFS</b>
        <span className="ok">12 nodes healthy</span>
      </div>
      <div className="mock__body">
        <div className="mock__side" aria-hidden="true">
          <span className="on" /><span /><span style={{ width: '80%' }} /><span /><span style={{ width: '60%' }} /><span /><span style={{ width: '75%' }} />
        </div>
        <div className="mock__main">
          <div className="chat">
            <m.p className="chat__q" {...pop(phase >= 1)}>How do I create an SMB share for /ifs/data/finance?</m.p>
            <div className="chat__a">
              <m.span className="chat__who" {...pop(phase >= 2)}>
                Assistant
                {phase === 2 && <span className="typing" aria-hidden="true"><i /><i /><i /></span>}
              </m.span>
              <m.p {...pop(phase >= 3)}>Create the share from the CLI with:</m.p>
              <m.div className="code" {...pop(phase >= 3, 0.1)}>
                <code>{shown}{phase === 3 && <span className="caret" />}</code>
                <m.small animate={phase >= 4 && on ? { scale: [1, 1.15, 1] } : undefined} transition={{ duration: 0.4 }}>Copy</m.small>
              </m.div>
              <m.span className="cite" {...pop(phase >= 4, 0.1)}>OneFS CLI Command Reference</m.span>
              <m.span className="scope" {...pop(phase >= 4, 0.3)}>Answered from the WebUI guides only</m.span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueMock() {
  const on = useMotionOn();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const go = seen || !on;
  const rows = [
    { id: '#48213', s: 'SMB write latency on H5600 pool', v: 'NAC', c: 'nac' },
    { id: '#48227', s: 'SyncIQ policy stuck after upgrade', v: 'Knowledge gap', c: 'gap' },
    { id: '#48240', s: 'Quota alerts not reaching SMTP', v: 'Customer delay', c: 'delay' },
    { id: '#48251', s: 'NFS mount hangs on client', v: 'NAC', c: 'nac' },
  ];
  const tabs = ['FS 58', 'Admin 41', 'Net 33', 'Win 29', 'Nix 24', 'Bu 19', 'Hw 16'];
  return (
    <div ref={ref} className="mock" role="img" aria-label="Illustration: the L2 review board with skill queues, case verdicts and the router's 41% agreement with human labels">
      <div className="mock__bar">
        <span className="dots"><i /><i /><i /></span>
        <b>L2 Review</b>
        <span className="ok">300 cases this week</span>
      </div>
      <div className="qtabs" aria-hidden="true">
        {tabs.map((t, n) => (
          <m.span key={t} className={n === 0 ? 'on' : ''}
            initial={on ? { opacity: 0, y: -8 } : false} animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.1 + n * 0.05, duration: 0.4 }}>{t}</m.span>
        ))}
      </div>
      {rows.map((r, n) => (
        <m.div className="qrow" key={r.id}
          initial={on ? { opacity: 0, x: -24 } : false} animate={go ? { opacity: 1, x: 0 } : undefined}
          transition={{ delay: 0.45 + n * 0.12, duration: 0.6, ease: EASE }}>
          <code>{r.id}</code>
          <p>{r.s}</p>
          <m.span className={`chip chip--${r.c}`}
            initial={on ? { opacity: 0, scale: 0.4 } : false} animate={go ? { opacity: 1, scale: 1 } : undefined}
            transition={{ delay: 1.1 + n * 0.18, type: 'spring', stiffness: 420, damping: 16 }}>{r.v}</m.span>
        </m.div>
      ))}
      <div className="agree">
        <div className="agree__row"><span>Router agrees with human label</span><b><CountUp to={41} suffix="%" delay={1.6} duration={1.6} /></b></div>
        <div className="agree__track">
          <m.div className="agree__fill" initial={on ? { width: '0%' } : false} animate={go ? { width: '41%' } : undefined}
            transition={{ delay: 1.6, duration: 1.6, ease: [0.16, 1, 0.3, 1] }} />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ f, flip }: { f: Feature; flip?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <Reveal as="article" y={80} amount={0.15} className={`feature${flip ? ' feature--flip' : ''}`}>
      <div className="feature__visual" ref={ref as never}>
        <span className="feature__demo">Demo data</span>
        <m.div style={{ y }} className="feature__float">
          {f.id === 'assistant' ? <AssistantMock /> : <QueueMock />}
        </m.div>
      </div>
      <div className="feature__text">
        <Reveal as="p" className="feature__kind" delay={0.1}>{f.kind}</Reveal>
        <Reveal delay={0.15}><h3 className="feature__title" id={`f-${f.id}`}>{f.title}</h3></Reveal>
        <Reveal as="p" className="feature__q" delay={0.22}>{f.question}</Reveal>
        <ol className="steps">
          {f.steps.map((s, n) => (
            <Reveal as="li" key={s.title} delay={0.3 + n * 0.1}><div><b>{s.title}</b><span>{s.body}</span></div></Reveal>
          ))}
        </ol>
        <Reveal className="feature__cta" delay={0.6}>
          <LinkBtn href={f.primary.href} label={f.primary.label} solid />
          <LinkBtn href={f.secondary.href} label={f.secondary.label} />
        </Reveal>
        <Reveal as="p" className="note" delay={0.7}><Info />{f.note}</Reveal>
      </div>
    </Reveal>
  );
}

/* ── Signal band with counters ─────────────────────────────── */

function SignalValue({ n }: { n: number }) {
  const on = useMotionOn();
  const ref = useRef<HTMLParagraphElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  if (n === 0) return <p className="signal__val" ref={ref}><CountUp to={1000} comma suffix="+" duration={2.2} /></p>;
  if (n === 1) {
    return (
      <p className="signal__val" ref={ref} aria-label="7 to 3">
        <span aria-hidden="true">7</span>
        <svg className="signal__arrow" viewBox="0 0 64 40" aria-hidden="true">
          <m.path d="M4 20h50M40 6l14 14-14 14" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
            initial={on ? { pathLength: 0 } : false} animate={seen || !on ? { pathLength: 1 } : undefined}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }} />
        </svg>
        <span aria-hidden="true"><CountUp from={7} to={3} duration={1.4} delay={0.6} /></span>
      </p>
    );
  }
  return <p className="signal__val" ref={ref}><CountUp prefix="<" to={20} suffix="s" duration={1.8} /></p>;
}

export function Signal() {
  return (
    <section className="sec" aria-labelledby="signal-title">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="sec-index">The signal</Reveal>
          <SplitHeading id="signal-title" main="Close to the customer." em="Useful at team scale." />
        </header>
        <div className="signal">
          {SIGNALS.map((s, n) => (
            <Reveal className="signal__item" key={s.title} delay={n * 0.12}>
              <SignalValue n={n} />
              <p className="signal__title">{s.title}</p>
              <p className="signal__body">{s.body}</p>
              <p className="signal__tag">{s.tag}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Work() {
  return (
    <section className="sec" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <header className="sec-head">
          <Reveal as="p" className="sec-index"><b>01</b> Selected work</Reveal>
          <SplitHeading id="work-title" main="Shipped to real users." em="Measured honestly." />
          <Reveal as="p" className="lede" delay={0.3}>Two tools Dell support engineers use today, and the decisions that shaped them.</Reveal>
        </header>
        <div className="features">
          {FEATURES.map((f, n) => <FeatureCard key={f.id} f={f} flip={n % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}

/* ── Deep-dive drawer ──────────────────────────────────────── */

export function CaseDrawer({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const c = ASSISTANT_CASE;

  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
    scrollLock(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); scrollLock(false); };
  }, [onClose]);

  const item = (n: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: 0.25 + n * 0.06, ease: EASE },
  });

  return (
    <>
      <m.div className="scrim" onClick={onClose} aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
      <m.div className="drawer" role="dialog" aria-modal="true" aria-labelledby="case-title" data-lenis-prevent
        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
        <div className="drawer__top">
          <span>Deep dive</span>
          <button className="iconbtn" onClick={onClose} aria-label="Close deep dive"><Close /></button>
        </div>
        <div className="drawer__in">
          <m.header {...item(0)}>
            <h2 id="case-title" ref={ref} tabIndex={-1}>{c.title}</h2>
            <p className="drawer__sub">{c.sub}</p>
          </m.header>
          <m.dl className="facts" {...item(1)}>
            {c.facts.map(f => (<div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>))}
          </m.dl>
          {c.sections.map((s, n) => (
            <m.section key={s.h} {...item(2 + n)}>
              <h3>{s.h}</h3>
              {s.p?.map((t, i) => <p key={i}>{renderCode(t)}</p>)}
              {s.list && <ul>{s.list.map((t, i) => <li key={i}>{t}</li>)}</ul>}
            </m.section>
          ))}
          <m.div className="feature__cta" {...item(2 + c.sections.length)}>
            {c.links.map(l => <LinkBtn key={l.href} href={l.href} label={l.label} solid />)}
            <button className="btn btn--sm" onClick={onClose}>Back to the work</button>
          </m.div>
        </div>
      </m.div>
    </>
  );
}

// Render the one inline command in the copy as code.
function renderCode(t: string) {
  const cmd = 'isi ai <query>';
  if (!t.includes(cmd)) return t;
  const [a, b] = t.split(cmd);
  return (<>{a}<code>{cmd}</code>{b}</>);
}
