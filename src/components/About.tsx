import { about } from '../data/portfolio';

export default function About() {
  return (
    <section id="about" className="relative z-20 mx-auto max-w-5xl px-6 py-24">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        About
      </h2>
      <h3 className="mb-10 text-3xl font-bold sm:text-4xl">
        From Support Engineer to Product Manager
      </h3>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Story */}
        <div className="space-y-4">
          {about.story.map((paragraph, i) => (
            <p key={i} className="leading-relaxed text-gray-400">
              {paragraph}
            </p>
          ))}

          <div className="mt-8">
            <h4 className="mb-4 text-lg font-semibold text-white">
              What Sets Me Apart
            </h4>
            <ul className="space-y-2">
              {about.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PM Profile Rating */}
        <div className="rounded-xl border border-border bg-surface-light p-6">
          <div className="mb-6 flex items-baseline justify-between">
            <h4 className="text-lg font-semibold text-white">PM Profile Rating</h4>
            <span className="text-3xl font-bold text-accent">74<span className="text-lg text-gray-500">/100</span></span>
          </div>
          <div className="space-y-4">
            {about.ratings.map((r) => (
              <div key={r.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-400">{r.label}</span>
                  <span className="font-medium text-white">{r.score}/{r.max}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-lighter">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent-dim to-accent transition-all duration-700"
                    style={{ width: `${(r.score / r.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
