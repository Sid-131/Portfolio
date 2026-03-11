import { useState } from 'react';
import { ExternalLink, Github, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="projects" className="relative z-20 mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Projects
      </h2>
      <h3 className="mb-10 text-3xl font-bold sm:text-4xl">
        What I've Built & Researched
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const isExpanded = expanded === project.id;
          return (
            <div
              key={project.id}
              className="group flex flex-col rounded-xl border border-border bg-surface-light transition-all hover:border-accent/30"
            >
              <div className="p-6">
                <h4 className="mb-3 text-lg font-bold text-white">
                  {project.title}
                </h4>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-accent/10 px-2.5 py-1 text-xs font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="mb-3 text-sm text-gray-400">
                  <span className="font-semibold text-gray-300">Problem: </span>
                  {project.problem}
                </p>

                {isExpanded && (
                  <div className="mb-3 animate-[fadeIn_0.3s_ease-in-out]">
                    <p className="mb-4 text-sm leading-relaxed text-gray-400">
                      <span className="font-semibold text-gray-300">Solution: </span>
                      {project.solution}
                    </p>
                  </div>
                )}

                <div className="mb-4 flex items-start gap-2 rounded-lg bg-accent/5 p-3">
                  <Lightbulb size={16} className="mt-0.5 shrink-0 text-accent" />
                  <p className="text-sm italic text-accent/80">
                    {project.insight}
                  </p>
                </div>

                <button
                  onClick={() => setExpanded(isExpanded ? null : project.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 transition-colors hover:text-accent"
                >
                  {isExpanded ? (
                    <>
                      Show less <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      Show more <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>

              {(project.github || project.live) && (
                <div className="mt-auto flex gap-4 border-t border-border px-6 py-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-accent"
                    >
                      <Github size={16} />
                      Source Code
                    </a>
                  )}
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-accent"
                    >
                      <ExternalLink size={16} />
                      Live Demo
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
