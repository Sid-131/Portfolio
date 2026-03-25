import { experience } from '../data/portfolio';
import { AnimateIn } from './AnimateIn';

export default function Experience() {
  return (
    <section id="experience" className="relative z-20 mx-auto max-w-[1024px] px-6 py-24">
      <AnimateIn>
        <span className="section-label">Experience</span>
        <h2
          className="mb-12 font-display font-bold text-deep tracking-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          Where I've Worked
        </h2>
      </AnimateIn>

      <div className="space-y-6">
        <AnimateIn delay={1}>
          <div className="glass-card p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-deep tracking-tight">{experience.role}</h3>
                <p className="mt-1 font-body text-sm text-deep/55">{experience.company}</p>
                <span className="section-label mt-1">{experience.promotion}</span>
              </div>
              <div className="sm:text-right">
                <span className="section-label">{experience.period}</span>
                <span className="section-label">{experience.location}</span>
              </div>
            </div>

            <ul className="space-y-3">
              {experience.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ background: '#2d60ce' }}
                  />
                  <span className="font-body text-sm leading-relaxed text-deep/55">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimateIn>

        <AnimateIn delay={2}>
          <div className="glass-card p-6 sm:p-8">
            <span className="section-label">Awards & Recognition</span>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {experience.awards.map((award) => (
                <div
                  key={award.title}
                  className="p-4"
                  style={{ background: 'rgba(234,234,234,0.04)', borderRadius: '8px' }}
                >
                  <p className="font-body text-sm font-semibold text-deep">{award.title}</p>
                  <p className="mt-1 font-mono text-[10px] text-deep/40">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimateIn delay={3}>
            <div className="glass-card p-6">
              <span className="section-label">Education</span>
              <p className="font-body text-sm text-deep/55">{experience.education}</p>
            </div>
          </AnimateIn>
          <AnimateIn delay={4}>
            <div className="glass-card p-6">
              <span className="section-label">PM Fellowship</span>
              <p className="font-body text-sm text-deep/55">{experience.fellowship}</p>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
