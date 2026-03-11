import { skills } from '../data/portfolio';

export default function Skills() {
  return (
    <section id="skills" className="relative z-20 mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Skills
      </h2>
      <h3 className="mb-10 text-3xl font-bold sm:text-4xl">
        What I Work With
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(skills).map(([category, items]) => (
          <div
            key={category}
            className="rounded-xl border border-border bg-surface-light p-6 transition-colors hover:border-accent/30"
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">
              {category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-gray-300 transition-colors hover:border-accent/40 hover:text-white"
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
