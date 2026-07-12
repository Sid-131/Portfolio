import { useState } from 'react';
import { ORANGE, EASE, cab, mono, monoTag, SOCIALS } from '../../data';
import { useReveal } from '../../hooks/useReveal';

export function Contact({ onSnake }: { onSnake: () => void }) {
  const [hov, setHov] = useState(false);
  const [ref, visible] = useReveal<HTMLElement>();

  return (
    <section id="contact" ref={ref} style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: 'clamp(2rem,5vw,8rem)',
      position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(28px)',
      transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
    }}>
      <div style={{ ...monoTag('// GET IN TOUCH', ORANGE), marginBottom: 40 }}>{'// GET IN TOUCH'}</div>

      <a
        href="mailto:siddhant.singh131@outlook.com"
        style={{ textDecoration: 'none', lineHeight: 0.88, letterSpacing: '-0.04em' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        data-cur
      >
        <div style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,10vw,120px)', color: '#fff' }}>
          LET'S
        </div>
        <div style={{
          fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,10vw,120px)',
          fontStyle: 'italic',
          color: hov ? ORANGE : 'transparent',
          WebkitTextStroke: hov ? '0px' : '1px rgba(255,255,255,0.75)',
          transition: `color 0.4s ${EASE}, -webkit-text-stroke 0.4s ${EASE}`,
        }}>
          BUILD.
        </div>
      </a>

      <a
        href="mailto:siddhant.singh131@outlook.com"
        style={{ ...monoTag('SIDDHANT.SINGH131@OUTLOOK.COM', 'rgba(255,255,255,0.28)'), fontSize: 11, textDecoration: 'none', marginTop: 40, transition: `color 0.2s ${EASE}` }}
        onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
        data-cur
      >
        SIDDHANT.SINGH131@OUTLOOK.COM
      </a>

      <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
        {SOCIALS.map(s => (
          <a key={s.label} href={s.href}
            target={s.href.startsWith('http') ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
            data-cur
          >
            <div
              style={{ width: 64, height: 64, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: `all 0.3s ${EASE}` }}
              onMouseEnter={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = '#fff'; d.style.borderColor = '#fff'; (d.querySelector('span') as HTMLElement).style.color = '#080808'; }}
              onMouseLeave={e => { const d = e.currentTarget as HTMLDivElement; d.style.background = 'transparent'; d.style.borderColor = 'rgba(255,255,255,0.1)'; (d.querySelector('span') as HTMLElement).style.color = 'rgba(255,255,255,0.5)'; }}
            >
              <span style={{ ...monoTag(s.label, 'rgba(255,255,255,0.5)'), fontSize: 11, transition: `color 0.3s ${EASE}` }}>{s.label}</span>
            </div>
          </a>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 'clamp(1.5rem,3vw,3rem)',
        display: 'flex', gap: 24, alignItems: 'center',
        ...monoTag('', 'rgba(255,255,255,0.18)'), fontSize: 10, letterSpacing: '0.3em',
      }}>
        {['© 2026 SIDDHANT SINGH', 'PM · BUILDER · BENGALURU'].map((t, i) => (
          <span key={i} style={{ color: 'rgba(255,255,255,0.18)' }}>{t}</span>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
          style={{ color: 'rgba(255,255,255,0.18)', textDecoration: 'none', transition: `color 0.2s` }}
          onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
          data-cur>RESUME ↗</a>
        <button
          onClick={onSnake}
          style={{ background: 'none', border: 'none', cursor: 'none', color: 'rgba(255,255,255,0.18)', fontFamily: mono, fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', transition: `color 0.2s` }}
          onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.18)')}
          data-cur
        >PLAY ↗</button>
      </div>
    </section>
  );
}
