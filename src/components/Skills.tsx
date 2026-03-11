import { skills } from '../data/portfolio';

const categoryAccents = ['bg-coral', 'bg-primary', 'bg-mint', 'bg-gold', 'bg-coral'];

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
        04 / Skills
      </div>
      <h2 className="mb-12 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        What I Work With
      </h2>

      <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ backgroundColor: 'rgba(58,58,56,0.2)' }}>
        {Object.entries(skills).map(([category, items], idx) => (
          <div key={category} className="bg-paper p-6">
            <div className="mb-4 flex items-center gap-2">
              <span className={`block h-2 w-2 ${categoryAccents[idx]}`} />
              <h4 className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
                {category}
              </h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[11px] text-grid/70 transition-colors hover:text-primary"
                  style={{ border: '1px solid rgba(58,58,56,0.2)', padding: '4px 10px', borderRadius: '2px' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
