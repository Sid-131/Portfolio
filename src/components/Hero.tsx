import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { profile } from '../data/portfolio';
import HeroOrb from './HeroOrb';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      <HeroOrb />
      {/* Status pill */}
      <span className="pill-tag mb-8">PM · Builder · Available</span>

      {/* Large serif italic name */}
      <h1
        className="mb-4 text-center font-display font-bold italic text-deep"
        style={{ fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.02em' }}
      >
        <span className="block">Siddhant</span>
        <span className="block">Singh.</span>
      </h1>

      {/* Role line — strong, direct */}
      <p className="mb-6 text-center font-body font-medium text-deep/70 sm:text-lg">
        I build products. I understand customers. I write code.
      </p>

      {/* Tagline — stronger, resume-accurate */}
      <p className="mx-auto mb-8 max-w-lg text-center font-body text-sm leading-relaxed text-deep/50 sm:text-base">
        {profile.shortTagline}
      </p>

      {/* Quote — glass card */}
      <blockquote className="glass-card mx-auto mb-10 max-w-xl p-6 text-center">
        <p className="font-display italic text-base leading-relaxed text-deep/60">
          {profile.interviewQuote}
        </p>
      </blockquote>

      {/* CTAs — 4 buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <a href="#projects" className="pill-btn">
          View Work
        </a>
        <a
          href="#game"
          className="flex items-center gap-2 font-body text-sm font-medium text-deep/70 transition-colors hover:text-deep"
          style={{
            borderRadius: '100px',
            background: 'rgba(107,175,126,0.18)',
            border: '1.5px solid rgba(107,175,126,0.4)',
            padding: '10px 22px',
          }}
        >
          🐍 Let's Play
        </a>
        <a
          href="/resume.pdf"
          download="Siddhant_Singh_Resume.pdf"
          className="flex items-center gap-2 font-body text-sm text-deep/65 transition-colors hover:text-deep"
          style={{
            borderRadius: '100px',
            border: '1.5px solid rgba(43,64,53,0.22)',
            padding: '10px 22px',
          }}
        >
          <Download size={14} />
          Resume
        </a>
        <a
          href="#contact"
          className="font-body text-sm text-deep/50 transition-colors hover:text-deep"
          style={{
            borderRadius: '100px',
            border: '1.5px solid rgba(43,64,53,0.12)',
            padding: '10px 22px',
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
