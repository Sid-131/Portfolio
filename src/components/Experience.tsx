import { experience } from '../data/portfolio';

function CornerMarkers({ children }: { children: React.ReactNode }) {
  const corner = 'absolute w-2.5 h-2.5 border-primary';
  return (
    <div className="relative p-6">
      <div className={`${corner} top-0 left-0 border-t border-l`} />
      <div className={`${corner} top-0 right-0 border-t border-r`} />
      <div className={`${corner} bottom-0 left-0 border-b border-l`} />
      <div className={`${corner} bottom-0 right-0 border-b border-r`} />
      {children}
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
        02 / Experience
      </div>
      <h2 className="mb-12 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        Where I've Worked
      </h2>

      <div className="space-y-6">
        {/* Dell Technologies card */}
        <div style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}>
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="font-heading text-xl font-bold text-primary">{experience.role}</h3>
                <p className="mt-1 font-body text-sm text-grid/70">{experience.company}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/40">{experience.promotion}</p>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50 sm:text-right">
                <p>{experience.period}</p>
                <p>{experience.location}</p>
              </div>
            </div>

            <ul className="space-y-3">
              {experience.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-primary" />
                  <span className="font-body text-sm leading-relaxed text-grid/70">{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Awards */}
        <div style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}>
          <div className="p-6 sm:p-8">
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">Awards & Recognition</h4>
            <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: 'rgba(58,58,56,0.15)' }}>
              {experience.awards.map((award) => (
                <div key={award.title} className="bg-paper p-4">
                  <p className="font-heading text-sm font-semibold text-primary">{award.title}</p>
                  <p className="mt-1 font-mono text-[10px] text-grid/50">{award.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education & Fellowship with corner markers */}
        <div className="grid gap-px sm:grid-cols-2" style={{ backgroundColor: 'rgba(58,58,56,0.2)' }}>
          <div className="bg-paper" style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}>
            <CornerMarkers>
              <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">Education</h4>
              <p className="font-body text-sm text-grid/70">{experience.education}</p>
            </CornerMarkers>
          </div>
          <div className="bg-paper" style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}>
            <CornerMarkers>
              <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">PM Fellowship</h4>
              <p className="font-body text-sm text-grid/70">{experience.fellowship}</p>
            </CornerMarkers>
          </div>
        </div>
      </div>
    </section>
  );
}
