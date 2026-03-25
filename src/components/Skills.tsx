import { skills } from '../data/portfolio';
import { AnimateIn } from './AnimateIn';

export default function Skills() {
  const entries = Object.entries(skills);

  return (
    <section id="skills" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <AnimateIn>
        <span className="section-label">Skills</span>
        <h2
          className="mb-12 font-display italic font-bold text-deep"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          What I Work With
        </h2>
      </AnimateIn>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map(([category, items], i) => (
          <AnimateIn key={category} delay={i + 1}>
            <div className="glass-card p-6">
              <div
                className="mb-4 pb-3"
                style={{ borderBottom: '2px solid rgba(184,220,240,0.5)' }}
              >
                <span className="section-label">{category}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className="pill-tag cursor-default transition-colors hover:bg-sky/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </section>
  );
}
