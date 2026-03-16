import { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <span className="section-label">Projects</span>
      <h2
        className="mb-12 font-display italic font-bold text-deep"
        style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
      >
        What I've Built &<br />Researched
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, idx) => {
          const isExpanded = expanded === project.id;
          return (
            <div key={project.id} className="glass-card flex flex-col p-8">
              <span className="pill-tag mb-4 self-start">{String(idx + 1).padStart(2, '0')}</span>

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
                      <ExternalLink size={14} /> Live
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
