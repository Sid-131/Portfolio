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
        The PM who was<br />already building.
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
            <span className="section-label">The Proof</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {about.strengths.map((s, i) => (
                <span key={i} className="pill-tag">{s}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Network Graph */}
        <div className="glass-card p-8 flex items-center justify-center">
          <NetworkGraph />
        </div>
      </div>
    </section>
  );
}
