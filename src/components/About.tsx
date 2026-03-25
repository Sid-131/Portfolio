import { about } from '../data/portfolio';
import NetworkGraph from './NetworkGraph';
import { AnimateIn } from './AnimateIn';

export default function About() {
  return (
    <section id="about" className="relative z-20 mx-auto max-w-[1024px] px-6 py-24">
      <AnimateIn>
        <span className="section-label">About</span>
        <h2
          className="mb-12 font-display font-bold text-deep tracking-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          The PM who was<br />already building.
        </h2>
      </AnimateIn>

      <div className="grid gap-6 lg:grid-cols-2">
        <AnimateIn delay={1} className="glass-card p-8">
          <div className="space-y-4">
            {about.story.map((paragraph, i) => (
              <p key={i} className="font-body text-sm leading-relaxed text-deep/55">
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
        </AnimateIn>

        <AnimateIn delay={2} className="glass-card p-8 flex items-center justify-center">
          <NetworkGraph />
        </AnimateIn>
      </div>
    </section>
  );
}
