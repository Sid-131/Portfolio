import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';

function StatusBadge() {
  return (
    <div
      className="mb-8 inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-primary"
      style={{ border: '1px solid rgba(58, 58, 56, 0.2)', borderRadius: '2px' }}
    >
      <span className="block h-2 w-2 bg-primary" />
      Open to PM opportunities
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-16"
    >
      <StatusBadge />

      <h1 className="mb-6 text-center font-heading text-6xl font-bold tracking-tight text-primary sm:text-7xl md:text-[96px] md:leading-[0.9]">
        {profile.name}
      </h1>

      {/* Subtitle with left vertical line */}
      <div className="mb-10 flex items-start gap-4">
        <div className="mt-1 hidden h-12 w-px bg-grid/30 sm:block" />
        <p className="max-w-xl font-mono text-xs uppercase leading-relaxed tracking-[0.1em] text-grid/60 sm:text-sm">
          {profile.shortTagline}
        </p>
      </div>

      {/* Quote as monospaced testimonial card */}
      <div
        className="mx-auto mb-10 max-w-2xl p-6"
        style={{ border: '1px solid rgba(58, 58, 56, 0.2)', borderRadius: '2px' }}
      >
        <p className="font-mono text-xs leading-[1.6] text-grid/70">
          &ldquo;{profile.interviewQuote}&rdquo;
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="bg-primary px-6 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-80"
          style={{ borderRadius: '2px' }}
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="px-6 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-primary transition-colors hover:bg-primary/5"
          style={{ border: '1px solid rgba(58, 58, 56, 0.2)', borderRadius: '2px' }}
        >
          Get in Touch
        </a>
      </div>

      {/* Social icons */}
      <div className="mt-8 flex items-center gap-5">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-grid/40 transition-colors hover:text-primary" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-grid/40 transition-colors hover:text-primary" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href={`mailto:${profile.email}`} className="text-grid/40 transition-colors hover:text-primary" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>

      <a href="#about" className="absolute bottom-10 text-grid/30 transition-colors hover:text-primary" aria-label="Scroll down">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
