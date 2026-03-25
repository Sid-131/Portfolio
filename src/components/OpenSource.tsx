import { Github, ExternalLink } from 'lucide-react';
import { openSource, profile } from '../data/portfolio';
import { AnimateIn } from './AnimateIn';

// Decorative contribution grid — 52 weeks × 5 rows of random activity
function ContribGrid() {
  const weeks = 26;
  const rows = 5;
  const levels = [0, 0, 0, 1, 1, 1, 2, 2, 3];
  const colors = ['rgba(43,64,53,0.06)', 'rgba(107,175,126,0.25)', 'rgba(107,175,126,0.5)', 'rgba(61,139,55,0.75)'];

  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: weeks }).map((_, w) => (
        <div key={w} className="flex flex-col gap-[3px]">
          {Array.from({ length: rows }).map((_, d) => {
            const level = levels[Math.floor((w * rows + d * 7 + w * 3) % levels.length)];
            return (
              <div
                key={d}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: colors[level],
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default function OpenSource() {
  return (
    <section id="opensource" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <AnimateIn>
        <span className="section-label">Built in Public</span>
        <h2
          className="mb-12 font-display italic font-bold text-deep"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          Code I've Shipped
        </h2>
      </AnimateIn>

      {/* Contribution activity banner */}
      <AnimateIn delay={1}>
        <div className="glass-card mb-8 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-deep/40">GitHub Activity</p>
            <p className="mt-1 font-body text-sm text-deep/65">
              Shipping tools, automations, and AI systems — built for real use, not demos.
            </p>
          </div>
          <div className="shrink-0 overflow-x-auto">
            <ContribGrid />
          </div>
        </div>
      </AnimateIn>

      {/* Repo cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {openSource.map((repo, i) => (
          <AnimateIn key={repo.name} delay={i + 2}>
            <div className="glass-card flex flex-col p-6 h-full">
              <div className="mb-3 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Github size={14} className="shrink-0 text-deep/50" />
                  <span className="font-mono text-[11px] font-medium text-deep/80">{repo.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {repo.live && (
                    <a href={repo.live} target="_blank" rel="noopener noreferrer" className="text-deep/35 transition-colors hover:text-deep" aria-label="Live demo">
                      <ExternalLink size={13} />
                    </a>
                  )}
                  {repo.href && (
                    <a href={repo.href} target="_blank" rel="noopener noreferrer" className="text-deep/35 transition-colors hover:text-deep" aria-label="GitHub repo">
                      <Github size={13} />
                    </a>
                  )}
                </div>
              </div>

              <p className="mb-4 flex-1 font-body text-sm leading-relaxed text-deep/60">
                {repo.description}
              </p>

              <div className="mb-4 flex flex-wrap gap-1.5">
                {repo.tags.map((tag) => (
                  <span key={tag} className="pill-tag">{tag}</span>
                ))}
              </div>

              <div
                className="mt-auto pt-3"
                style={{ borderTop: '1px solid rgba(43,64,53,0.08)' }}
              >
                <span className="font-mono text-[9px] uppercase tracking-widest text-deep/35">
                  {repo.highlight}
                </span>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>

      {/* GitHub CTA */}
      <AnimateIn delay={openSource.length + 2}>
        <div className="mt-10 text-center">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-sm text-deep/55 transition-colors hover:text-deep"
            style={{
              borderRadius: '100px',
              border: '1.5px solid rgba(43,64,53,0.2)',
              padding: '10px 24px',
            }}
          >
            <Github size={14} />
            View full profile on GitHub
          </a>
        </div>
      </AnimateIn>
    </section>
  );
}
