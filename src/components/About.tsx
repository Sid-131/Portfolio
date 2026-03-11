import { about } from '../data/portfolio';
import NetworkGraph from './NetworkGraph';

const accentColors = ['border-l-coral', 'border-l-mint', 'border-l-gold', 'border-l-primary', 'border-l-coral', 'border-l-mint'];

export default function About() {
  return (
    <section id="about" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
        01 / About
      </div>
      <h2 className="mb-12 font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        From Support Engineer<br />to Product Manager
      </h2>

      <div className="grid gap-px lg:grid-cols-2" style={{ backgroundColor: 'rgba(58,58,56,0.2)' }}>
        {/* Story + Strengths */}
        <div className="bg-paper p-8">
          <div className="space-y-4">
            {about.story.map((paragraph, i) => (
              <p key={i} className="font-body text-sm leading-relaxed text-grid/70">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="mb-4 font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
              What Sets Me Apart
            </h4>
            <ul className="space-y-2">
              {about.strengths.map((s, i) => (
                <li
                  key={i}
                  className={`border-l-2 ${accentColors[i % accentColors.length]} pl-3 font-mono text-[11px] leading-relaxed text-grid/70`}
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* PM Profile Rating + Network Graph */}
        <div className="bg-paper p-8">
          <div className="mb-8 p-6" style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}>
            <div className="mb-6 flex items-baseline justify-between">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">PM Profile Rating</h4>
              <span className="font-heading text-3xl font-bold text-primary">74<span className="text-sm text-grid/40">/100</span></span>
            </div>
            <div className="space-y-3">
              {about.ratings.map((r) => (
                <div key={r.label}>
                  <div className="mb-1 flex justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/60">{r.label}</span>
                    <span className="font-mono text-[10px] text-primary">{r.score}/{r.max}</span>
                  </div>
                  <div className="h-1 overflow-hidden bg-grid/10" style={{ borderRadius: '0px' }}>
                    <div
                      className="h-full bg-primary transition-all duration-700"
                      style={{ width: `${(r.score / r.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NetworkGraph />
        </div>
      </div>
    </section>
  );
}
