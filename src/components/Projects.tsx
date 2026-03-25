import { useState } from 'react';
import { ExternalLink, Github, Download, RotateCcw } from 'lucide-react';
import { projects } from '../data/portfolio';
import { AnimateIn } from './AnimateIn';

export default function Projects() {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section id="projects" className="relative z-20 mx-auto max-w-[1024px] px-6 py-24">
      <AnimateIn>
        <span className="section-label">Projects</span>
        <h2
          className="mb-12 font-display font-bold text-deep tracking-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          What I've Built &<br />Researched
        </h2>
      </AnimateIn>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, idx) => {
          const isFlipped = flipped === project.id;
          const accentColors = ['#2d60ce', '#e27500', '#00512f', '#2d60ce', '#e27500', '#00512f', '#2d60ce'];
          const accent = accentColors[idx % accentColors.length];

          return (
            <AnimateIn key={project.id} delay={idx + 1}>
              <div
                className={`card-flip-container ${isFlipped ? 'flipped' : ''}`}
                style={{ height: '440px' }}
                onClick={() => setFlipped(isFlipped ? null : project.id)}
              >
                <div className="card-flip-inner">
                  {/* FRONT */}
                  <div
                    className="card-flip-front glass-card flex flex-col p-8 cursor-pointer"
                    style={{ borderLeft: `3px solid ${accent}` }}
                  >
                    <div className="mb-4 flex items-center gap-2">
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

                    <h3 className="mb-4 font-display text-xl font-bold text-deep tracking-tight">
                      {project.title}
                    </h3>

                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="pill-tag">{tag}</span>
                      ))}
                    </div>

                    <p className="mb-3 font-body text-sm leading-relaxed text-deep/55">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-deep/35">Problem: </span>
                      {project.problem}
                    </p>

                    {'stats' in project && project.stats && (
                      <div className="mb-4 grid grid-cols-4 gap-2">
                        {(project.stats as { label: string; value: string }[]).map((s) => (
                          <div
                            key={s.label}
                            className="flex flex-col items-center py-2 px-1 text-center"
                            style={{ background: 'rgba(45,96,206,0.08)', borderRadius: '8px' }}
                          >
                            <span className="font-display font-bold text-base text-deep">{s.value}</span>
                            <span className="font-mono text-[9px] uppercase tracking-wider text-deep/35">{s.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="mt-auto font-mono text-[10px] text-deep/30 text-center">Click to flip →</p>
                  </div>

                  {/* BACK */}
                  <div
                    className="card-flip-back glass-card flex flex-col p-8 cursor-pointer"
                    style={{ borderLeft: `3px solid ${accent}` }}
                  >
                    <span className="pill-tag mb-4 self-start">{String(idx + 1).padStart(2, '0')}</span>
                    <h3 className="mb-4 font-display text-lg font-bold text-deep tracking-tight">
                      {project.title}
                    </h3>

                    <p className="mb-4 font-body text-sm leading-relaxed text-deep/55">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-deep/35">Solution: </span>
                      {project.solution}
                    </p>

                    <blockquote
                      className="mb-4 border-l-2 pl-4 font-body text-sm text-deep/40"
                      style={{ borderColor: accent }}
                    >
                      {project.insight}
                    </blockquote>

                    {(project.github || project.live) && (
                      <div
                        className="mt-auto flex gap-5 pt-4"
                        style={{ borderTop: '1px solid rgba(234,234,234,0.08)' }}
                      >
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 font-body text-sm text-deep/40 transition-colors hover:text-deep">
                            <Github size={14} /> Source
                          </a>
                        )}
                        {project.live && (
                          <a href={project.live} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 font-body text-sm text-deep/40 transition-colors hover:text-deep">
                            <ExternalLink size={14} /> {project.live.endsWith('.pdf') ? 'Read Teardown' : 'Live'}
                          </a>
                        )}
                        {'download' in project && project.download && (
                          <a href={project.download as string} target="_blank" rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 font-body text-sm font-medium transition-colors hover:opacity-80"
                            style={{ color: '#e27500' }}>
                            <Download size={14} /> Download v1.0
                          </a>
                        )}
                      </div>
                    )}

                    <p className="mt-3 flex items-center gap-1 font-mono text-[10px] text-deep/30 text-center justify-center">
                      <RotateCcw size={10} /> Click to flip back
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          );
        })}
      </div>
    </section>
  );
}
