import { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { projects } from '../data/portfolio';

const borderAccents = ['border-l-coral', 'border-l-mint', 'border-l-gold', 'border-l-primary'];

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
        03 / Projects
      </div>
      <h2 className="mb-12 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        What I've Built &<br />Researched
      </h2>

      {/* Bento 2x2 grid with 1px gaps */}
      <div className="grid gap-px md:grid-cols-2" style={{ backgroundColor: 'rgba(58,58,56,0.2)' }}>
        {projects.map((project, idx) => {
          const isExpanded = expanded === project.id;
          return (
            <div
              key={project.id}
              className={`flex flex-col border-l-2 ${borderAccents[idx]} bg-paper p-8`}
            >
              {/* Monospaced header label */}
              <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/40">
                Project {String(idx + 1).padStart(2, '0')}
              </div>

              <h3 className="mb-4 font-heading text-lg font-bold text-primary">
                {project.title}
              </h3>

              {/* Tags */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/60"
                    style={{ border: '1px solid rgba(58,58,56,0.2)', padding: '2px 8px', borderRadius: '2px' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Problem */}
              <p className="mb-3 font-body text-sm leading-relaxed text-grid/70">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/40">Problem: </span>
                {project.problem}
              </p>

              {/* Expanded solution */}
              {isExpanded && (
                <p className="mb-3 font-body text-sm leading-relaxed text-grid/70">
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/40">Solution: </span>
                  {project.solution}
                </p>
              )}

              {/* Insight as code-snippet style */}
              <div className="mb-4 border-l-2 border-l-grid/20 bg-grid/[0.03] p-3">
                <p className="font-mono text-[11px] leading-[1.6] text-grid/60 italic">
                  // {project.insight}
                </p>
              </div>

              <button
                onClick={() => setExpanded(isExpanded ? null : project.id)}
                className="mb-4 flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50 transition-colors hover:text-primary"
              >
                {isExpanded ? <>Show less <ChevronUp size={12} /></> : <>Show more <ChevronDown size={12} /></>}
              </button>

              {/* Links at bottom */}
              {(project.github || project.live) && (
                <div className="mt-auto flex gap-4 pt-4" style={{ borderTop: '1px solid rgba(58,58,56,0.15)' }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50 transition-colors hover:text-primary">
                      <Github size={14} /> Source
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50 transition-colors hover:text-primary">
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
