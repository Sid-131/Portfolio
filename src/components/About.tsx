import { about } from '../data/portfolio';
import NetworkGraph from './NetworkGraph';

export default function About() {
  return (
    <section id="about" className="relative z-20 mx-auto max-w-6xl px-6 py-24">
      <span className="section-label">About</span>
      <h2
        className="mb-12 font-display italic font-bold text-deep"
        style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
      >
        From Support Engineer<br />to Product Manager
      </h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Story + Strengths */}
        <div className="glass-card p-8">
          <div className="space-y-4">
            {about.story.map((paragraph, i) => (
              <p key={i} className="font-body text-sm leading-relaxed text-deep/65">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8">
            <span className="section-label">What Sets Me Apart</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {about.strengths.map((s, i) => (
                <span key={i} className="pill-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* PM Profile Rating + Network Graph */}
        <div className="glass-card p-8">
          <div
            className="mb-8 p-5"
            style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '12px' }}
          >
            <div className="mb-6 flex items-baseline justify-between">
              <span className="section-label">PM Profile Rating</span>
              <span className="font-display text-3xl font-bold italic text-deep">
                74<span className="text-sm text-deep/40">/100</span>
              </span>
            </div>
            <div className="space-y-3">
              {about.ratings.map((r) => (
                <div key={r.label}>
                  <div className="mb-1 flex justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-deep/50">{r.label}</span>
                    <span className="font-mono text-[10px] text-deep/60">{r.score}/{r.max}</span>
                  </div>
                  <div
                    className="overflow-hidden"
                    style={{ height: 6, background: 'rgba(43,64,53,0.08)', borderRadius: '100px' }}
                  >
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${(r.score / r.max) * 100}%`,
                        background: '#B8DCF0',
                        borderRadius: '100px',
                      }}
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
