import { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { projects } from '../data/portfolio';
import { AnimateIn } from './AnimateIn';

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <AnimateIn>
        <span className="section-label">Projects</span>
        <h2
          className="mb-12 font-display italic font-bold text-deep"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          What I've Built &<br />Researched
        </h2>
      </AnimateIn>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, idx) => {
          const isExpanded = expanded === project.id;
          return (
            <AnimateIn key={project.id} delay={idx + 1}>
              <div className="project-card glass-card flex flex-col p-8 h-full" style={'upcoming' in project && project.upcoming ? { border: '1.5px solid rgba(107,175,126,0.35)' } : {}}>
                <div className="mb-4 flex items-center gap-2">
                  <span className="pill-tag">{String(idx + 1).padStart(2, '0')}</span>
                  {'upcoming' in project && project.upcoming && (
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(107,175,126,0.15)', color: '#6BAF7E', border: '1px solid rgba(107,175,126,0.3)' }}>
                      Just Shipped
                    </span>
                  )}
                </div>

                <h3 className="mb-4 font-display italic text-xl font-bold text-deep">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="pill-tag">{tag}</span>
                  ))}
                </div>

                {/* Problem */}
                <p className="mb-3 font-body text-sm leading-relaxed text-deep/65">
                  <span className="font-body text-xs font-semibold uppercase tracking-wide text-deep/45">Problem: </span>
                  {project.problem}
                </p>

                {/* Solution (expanded) */}
                {isExpanded && (
                  <p className="mb-3 font-body text-sm leading-relaxed text-deep/65">
                    <span className="font-body text-xs font-semibold uppercase tracking-wide text-deep/45">Solution: </span>
                    {project.solution}
                  </p>
                )}

                {/* Stats row — homelab only */}
                {'stats' in project && project.stats && (
                  <div className="mb-4 grid grid-cols-4 gap-2">
                    {(project.stats as { label: string; value: string }[]).map((s) => (
                      <div
                        key={s.label}
                        className="flex flex-col items-center rounded-xl py-2 px-1 text-center"
                        style={{ background: 'rgba(107,175,126,0.12)' }}
                      >
                        <span className="font-display italic font-bold text-base text-deep">{s.value}</span>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-deep/40">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Insight — italic serif quote */}
                <blockquote
                  className="mb-4 border-l-2 pl-4 font-display italic text-base text-deep/45"
                  style={{ borderColor: '#B8DCF0' }}
                >
                  {project.insight}
                </blockquote>

                <button
                  onClick={() => setExpanded(isExpanded ? null : project.id)}
                  className="mb-4 flex items-center gap-1 font-body text-sm text-deep/45 underline decoration-dotted hover:text-deep transition-colors"
                >
                  {isExpanded ? <>Show less <ChevronUp size={14} /></> : <>Show more <ChevronDown size={14} /></>}
                </button>

                {(project.github || project.live) && (
                  <div
                    className="mt-auto flex gap-5 pt-4"
                    style={{ borderTop: '1px solid rgba(43,64,53,0.1)' }}
                  >
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 font-body text-sm text-deep/45 transition-colors hover:text-deep">
                        <Github size={14} /> Source
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 font-body text-sm text-deep/45 transition-colors hover:text-deep">
                        <ExternalLink size={14} /> {project.live.endsWith('.pdf') ? 'Read Teardown' : 'Live'}
                      </a>
                    )}
                    {'download' in project && project.download && (
                      <a href={project.download as string} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 font-body text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: '#6BAF7E' }}>
                        <Download size={14} /> Download v1.0
                      </a>
                    )}
                  </div>
                )}
              </div>
            </AnimateIn>
          );
        })}
      </div>
    </section>
  );
}
