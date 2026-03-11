import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
        Contact
      </h2>
      <h3 className="mb-4 text-3xl font-bold sm:text-4xl">
        Let's Connect
      </h3>
      <p className="mx-auto mb-10 max-w-xl text-gray-400">
        I'm actively looking for Associate Product Manager / Product Manager roles.
        Open to conversations about AI-native products, developer tooling, and B2B SaaS.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-light p-5 transition-all hover:border-accent/40 hover:bg-surface-lighter"
        >
          <Mail size={20} className="text-accent" />
          <span className="text-gray-300">{profile.email}</span>
        </a>

        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-light p-5 transition-all hover:border-accent/40 hover:bg-surface-lighter"
        >
          <Linkedin size={20} className="text-accent" />
          <span className="text-gray-300">LinkedIn Profile</span>
        </a>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-light p-5 transition-all hover:border-accent/40 hover:bg-surface-lighter"
        >
          <Github size={20} className="text-accent" />
          <span className="text-gray-300">GitHub</span>
        </a>

        <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-surface-light p-5">
          <MapPin size={20} className="text-accent" />
          <span className="text-gray-300">{profile.location}</span>
        </div>
      </div>

      <footer className="mt-20 border-t border-border pt-8 text-sm text-gray-600">
        <p>&copy; {new Date().getFullYear()} {profile.name}. Built with React + Three.js</p>
      </footer>
    </section>
  );
}
