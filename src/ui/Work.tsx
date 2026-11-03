import { useEffect, useRef } from 'react';
import { FEATURES, ASSISTANT_CASE, SIGNALS, type Feature } from '../content';
import { Ext, Info, Close } from './Icons';

const isExternal = (href: string) => /^https?:/.test(href);

function LinkBtn({ href, label, solid }: { href: string; label: string; solid?: boolean }) {
  const ext = isExternal(href) || href.endsWith('.pdf');
  return (
    <a className={`btn btn--sm${solid ? ' btn--solid' : ''}`} href={href}
      {...(ext ? { target: '_blank', rel: 'noopener' } : {})}>
      {label}{ext && <span className="ext"><Ext /></span>}
    </a>
  );
}

function AssistantMock() {
  return (
    <div className="mock" role="img" aria-label="Illustration: the assistant answering a OneFS question inside the web console with a copyable command and a cited source">
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
            <p className="chat__q">How do I create an SMB share for /ifs/data/finance?</p>
            <div className="chat__a">
              <span className="chat__who">Assistant</span>
              <p>Create the share from the CLI with:</p>
              <div className="code"><code>isi smb shares create finance /ifs/data/finance</code><small>Copy</small></div>
              <span className="cite">OneFS CLI Command Reference</span>
              <span className="scope">Answered from the WebUI guides only</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QueueMock() {
  const rows = [
    { id: '#48213', s: 'SMB write latency on H5600 pool', v: 'NAC', c: 'nac' },
    { id: '#48227', s: 'SyncIQ policy stuck after upgrade', v: 'Knowledge gap', c: 'gap' },
    { id: '#48240', s: 'Quota alerts not reaching SMTP', v: 'Customer delay', c: 'delay' },
    { id: '#48251', s: 'NFS mount hangs on client', v: 'NAC', c: 'nac' },
  ];
  return (
    <div className="mock" role="img" aria-label="Illustration: the L2 review board with skill queues, case verdicts and the router's 41% agreement with human labels">
      <div className="mock__bar">
        <span className="dots"><i /><i /><i /></span>
        <b>L2 Review</b>
        <span className="ok">300 cases this week</span>
      </div>
      <div className="qtabs" aria-hidden="true">
        <span className="on">FS 58</span><span>Admin 41</span><span>Net 33</span><span>Win 29</span><span>Nix 24</span><span>Bu 19</span><span>Hw 16</span>
      </div>
      {rows.map(r => (
        <div className="qrow" key={r.id}>
          <code>{r.id}</code>
          <p>{r.s}</p>
          <span className={`chip chip--${r.c}`}>{r.v}</span>
        </div>
      ))}
      <div className="agree">
        <div className="agree__row"><span>Router agrees with human label</span><b>41%</b></div>
        <div className="agree__track"><div className="agree__fill" /></div>
      </div>
    </div>
  );
}

function FeatureCard({ f, flip }: { f: Feature; flip?: boolean }) {
  return (
    <article className={`feature${flip ? ' feature--flip' : ''}`} aria-labelledby={`f-${f.id}`}>
      <div className="feature__visual">
        <span className="feature__demo">Demo data</span>
        {f.id === 'assistant' ? <AssistantMock /> : <QueueMock />}
      </div>
      <div className="feature__text">
        <p className="feature__kind">{f.kind}</p>
        <h3 className="feature__title" id={`f-${f.id}`}>{f.title}</h3>
        <p className="feature__q">{f.question}</p>
        <ol className="steps">
          {f.steps.map(s => (<li key={s.title}><div><b>{s.title}</b><span>{s.body}</span></div></li>))}
        </ol>
        <div className="feature__cta">
          <LinkBtn href={f.primary.href} label={f.primary.label} solid />
          <LinkBtn href={f.secondary.href} label={f.secondary.label} />
        </div>
        <p className="note"><Info />{f.note}</p>
      </div>
    </article>
  );
}

export function Signal() {
  return (
    <section className="sec" aria-labelledby="signal-title">
      <div className="wrap">
        <header className="sec-head">
          <p className="sec-index">The signal</p>
          <h2 id="signal-title" className="display">Close to the customer.<em>Useful at team scale.</em></h2>
        </header>
        <div className="signal">
          {SIGNALS.map(s => (
            <div className="signal__item" key={s.title}>
              <p className="signal__val">{s.value}</p>
              <p className="signal__title">{s.title}</p>
              <p className="signal__body">{s.body}</p>
              <p className="signal__tag">{s.tag}</p>
            </div>
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
          <p className="sec-index"><b>01</b> Selected work</p>
          <h2 id="work-title" className="display">Shipped to real users.<em>Measured honestly.</em></h2>
          <p className="lede">Two tools Dell support engineers use today, and the decisions that shaped them.</p>
        </header>
        <div className="features">
          {FEATURES.map((f, n) => <FeatureCard key={f.id} f={f} flip={n % 2 === 1} />)}
        </div>
      </div>
    </section>
  );
}

export function CaseDrawer({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const c = ASSISTANT_CASE;

  useEffect(() => {
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <>
      <div className="scrim" onClick={onClose} aria-hidden="true" />
      <div className="drawer" role="dialog" aria-modal="true" aria-labelledby="case-title">
        <div className="drawer__top">
          <span>Deep dive</span>
          <button className="iconbtn" onClick={onClose} aria-label="Close deep dive"><Close /></button>
        </div>
        <div className="drawer__in">
          <header>
            <h2 id="case-title" ref={ref} tabIndex={-1}>{c.title}</h2>
            <p className="drawer__sub">{c.sub}</p>
          </header>
          <dl className="facts">
            {c.facts.map(f => (<div key={f.k}><dt>{f.k}</dt><dd>{f.v}</dd></div>))}
          </dl>
          {c.sections.map(s => (
            <section key={s.h}>
              <h3>{s.h}</h3>
              {s.p?.map((t, i) => <p key={i}>{renderCode(t)}</p>)}
              {s.list && <ul>{s.list.map((t, i) => <li key={i}>{t}</li>)}</ul>}
            </section>
          ))}
          <div className="feature__cta">
            {c.links.map(l => <LinkBtn key={l.href} href={l.href} label={l.label} solid />)}
            <button className="btn btn--sm" onClick={onClose}>Back to the work</button>
          </div>
        </div>
      </div>
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
