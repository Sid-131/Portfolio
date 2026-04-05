import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, Download } from 'lucide-react';
import { projects } from '../data/portfolio';

gsap.registerPlugin(ScrollTrigger);

const accentColors = ['#2d60ce', '#e27500', '#00512f', '#2d60ce', '#e27500', '#00512f', '#2d60ce'];

export default function ScrollPinCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.pin-card');
      const totalCards = cards.length;

      // Set all cards hidden initially except first
      cards.forEach((card, i) => {
        if (i > 0) gsap.set(card, { opacity: 0, y: 40 });
      });

      // Single timeline drives everything — one ScrollTrigger total
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: `+=${totalCards * 80}vh`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        const front = card.querySelector('.pin-card-front') as HTMLElement;
        const back = card.querySelector('.pin-card-back') as HTMLElement;

        // Step 1: flip current card
        tl.to(front, { rotateY: 180, duration: 1, ease: 'none' }, i * 3)
          .to(back,  { rotateY: 360, duration: 1, ease: 'none' }, i * 3);

        // Step 2: fade out current, bring in next
        if (i < totalCards - 1) {
          tl.to(card, { opacity: 0, y: -30, duration: 0.8, ease: 'none' }, i * 3 + 1.5);
          tl.to(cards[i + 1], { opacity: 1, y: 0, duration: 0.8, ease: 'none' }, i * 3 + 1.8);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="relative z-20">
      {/* Header — above the pin zone */}
      <div className="mx-auto max-w-[1024px] px-6 pt-24 pb-10">
        <span className="section-label">Projects</span>
        <h2
          className="font-display font-bold text-deep tracking-tighter"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          What I've Built &<br />Researched
        </h2>
      </div>

      {/* Pinned card stack */}
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ height: '72vh', perspective: '1400px' }}
      >
        {projects.map((project, idx) => {
          const accent = accentColors[idx % accentColors.length];
          return (
            <div
              key={project.id}
              className="pin-card absolute"
              style={{
                width: 'min(600px, 90vw)',
                height: '420px',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* FRONT */}
              <div
                className="pin-card-front absolute inset-0 flex flex-col p-8"
                style={{
                  background: '#1c1f22',
                  border: '1px solid rgba(234,234,234,0.08)',
                  borderRadius: '24px',
                  borderLeft: `3px solid ${accent}`,
                  boxShadow: '0 6px 32px rgba(0,0,0,0.15)',
                  backfaceVisibility: 'hidden',
                }}
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="pill-tag">{String(idx + 1).padStart(2, '0')}</span>
                  {'upcoming' in project && project.upcoming && (
                    <span
                      className="font-mono text-[9px] uppercase tracking-widest px-2 py-1"
                      style={{
                        background: 'rgba(226,117,0,0.12)',
                        color: '#e27500',
                        border: '1px solid rgba(226,117,0,0.3)',
                        borderRadius: '4px',
                      }}
                    >
                      Just Shipped
                    </span>
                  )}
                </div>

                <h3 className="mb-3 font-display text-2xl font-bold text-deep tracking-tight">
                  {project.title}
                </h3>

                <div className="mb-3 flex flex-wrap gap-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="pill-tag">{tag}</span>
                  ))}
                </div>

                <p className="mb-4 font-body text-sm leading-relaxed text-deep/50">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-deep/30">Problem · </span>
                  {project.problem}
                </p>

                {'stats' in project && project.stats && (
                  <div className="mt-auto grid grid-cols-4 gap-2">
                    {(project.stats as { label: string; value: string }[]).map((s) => (
                      <div
                        key={s.label}
                        className="flex flex-col items-center py-2 px-1 text-center"
                        style={{ background: 'rgba(45,96,206,0.08)', borderRadius: '8px' }}
                      >
                        <span className="font-display font-bold text-base text-deep">{s.value}</span>
                        <span className="font-mono text-[8px] uppercase tracking-wider text-deep/30">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {!('stats' in project && project.stats) && (
                  <blockquote
                    className="mt-auto border-l-2 pl-4 font-body text-sm text-deep/35"
                    style={{ borderColor: accent }}
                  >
                    {project.insight}
                  </blockquote>
                )}
              </div>

              {/* BACK */}
              <div
                className="pin-card-back absolute inset-0 flex flex-col p-8"
                style={{
                  background: '#1c1f22',
                  border: '1px solid rgba(234,234,234,0.08)',
                  borderRadius: '24px',
                  borderLeft: `3px solid ${accent}`,
                  boxShadow: '0 6px 32px rgba(0,0,0,0.15)',
                  backfaceVisibility: 'hidden',
                  transform: 'rotateY(180deg)',
                }}
              >
                <span className="pill-tag mb-3 self-start">{String(idx + 1).padStart(2, '0')}</span>
                <h3 className="mb-3 font-display text-xl font-bold text-deep tracking-tight">
                  {project.title}
                </h3>

                <p className="mb-4 font-body text-sm leading-relaxed text-deep/50">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-deep/30">Solution · </span>
                  {project.solution}
                </p>

                <blockquote
                  className="mb-4 border-l-2 pl-4 font-body text-sm text-deep/35"
                  style={{ borderColor: accent }}
                >
                  {project.insight}
                </blockquote>

                {(project.github || project.live) && (
                  <div
                    className="mt-auto flex gap-5 pt-4"
                    style={{ borderTop: '1px solid rgba(234,234,234,0.06)' }}
                  >
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 font-body text-sm text-deep/35 transition-colors hover:text-deep">
                        <Github size={14} /> Source
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 font-body text-sm text-deep/35 transition-colors hover:text-deep">
                        <ExternalLink size={14} /> {project.live.endsWith('.pdf') ? 'Teardown' : 'Live'}
                      </a>
                    )}
                    {'download' in project && project.download && (
                      <a href={project.download as string} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 font-body text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: '#e27500' }}>
                        <Download size={14} /> Download
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Progress dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {projects.map((_, i) => (
            <div key={i} className="h-1 w-4 rounded-full" style={{ background: 'rgba(234,234,234,0.15)' }} />
          ))}
        </div>
      </div>
    </section>
  );
}
