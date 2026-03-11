import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="mb-4 inline-block rounded-full border border-accent/30 bg-accent/5 px-4 py-1.5 text-sm text-accent">
        Open to PM opportunities
      </div>

      <h1 className="mb-4 text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
        {profile.name}
      </h1>

      <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-400 sm:text-xl">
        {profile.shortTagline}
      </p>

      <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-gray-500 italic">
        &ldquo;{profile.interviewQuote}&rdquo;
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="#projects"
          className="rounded-lg bg-accent px-6 py-3 font-semibold text-black transition-all hover:bg-accent/80 hover:shadow-lg hover:shadow-accent/20"
        >
          View Projects
        </a>
        <a
          href="#contact"
          className="rounded-lg border border-border px-6 py-3 font-semibold text-gray-300 transition-all hover:border-accent/50 hover:text-white"
        >
          Get in Touch
        </a>
      </div>

      <div className="mt-8 flex items-center gap-5">
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-accent"
          aria-label="LinkedIn"
        >
          <Linkedin size={22} />
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 transition-colors hover:text-accent"
          aria-label="GitHub"
        >
          <Github size={22} />
        </a>
        <a
          href={`mailto:${profile.email}`}
          className="text-gray-500 transition-colors hover:text-accent"
          aria-label="Email"
        >
          <Mail size={22} />
        </a>
      </div>

      <a
        href="#about"
        className="absolute bottom-10 animate-bounce text-gray-600 transition-colors hover:text-accent"
        aria-label="Scroll down"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
