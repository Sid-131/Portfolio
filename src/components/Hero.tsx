import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      {/* Status pill */}
      <span className="pill-tag mb-8">Open to PM roles</span>

      {/* Large serif italic name */}
      <h1
        className="mb-6 text-center font-display font-bold italic text-deep"
        style={{ fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.02em' }}
      >
        <span className="block">Siddhant</span>
        <span className="block">Singh.</span>
      </h1>

      {/* Tagline */}
      <p className="mx-auto mb-8 max-w-md text-center font-body text-base leading-relaxed text-deep/55 sm:text-lg">
        {profile.shortTagline}
      </p>

      {/* Quote — glass card */}
      <blockquote className="glass-card mx-auto mb-10 max-w-xl p-6 text-center">
        <p className="font-display italic text-base leading-relaxed text-deep/60">
          {profile.interviewQuote}
        </p>
      </blockquote>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a href="#projects" className="pill-btn">
          View Work
        </a>
        <a
          href="#contact"
          className="font-body text-sm text-deep/65 transition-colors hover:text-deep"
          style={{
            borderRadius: '100px',
            border: '1.5px solid rgba(43,64,53,0.22)',
            padding: '10px 28px',
          }}
        >
          Get in Touch
        </a>
      </div>

      {/* Social icons */}
      <div className="mt-8 flex items-center gap-5">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-deep/35 transition-colors hover:text-deep" aria-label="LinkedIn">
          <Linkedin size={18} />
        </a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-deep/35 transition-colors hover:text-deep" aria-label="GitHub">
          <Github size={18} />
        </a>
        <a href={`mailto:${profile.email}`} className="text-deep/35 transition-colors hover:text-deep" aria-label="Email">
          <Mail size={18} />
        </a>
      </div>

      <a href="#game" className="absolute bottom-10 animate-bounce text-deep/25 transition-colors hover:text-deep" aria-label="Scroll down">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
