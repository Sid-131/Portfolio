import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 mx-auto max-w-[640px] px-6 py-24">
      <div className="mb-2 text-center font-mono text-[10px] uppercase tracking-[0.1em] text-grid/50">
        05 / Contact
      </div>
      <h2 className="mb-4 text-center font-heading text-4xl font-bold tracking-tight text-primary sm:text-5xl">
        Let's Connect
      </h2>
      <p className="mx-auto mb-10 text-center font-body text-sm leading-relaxed text-grid/60">
        I'm actively looking for Associate Product Manager / Product Manager roles.
        Open to conversations about AI-native products, developer tooling, and B2B SaaS.
      </p>

      {/* Form CTA container with corner markers */}
      <div className="relative p-8" style={{ border: '1px solid rgba(58,58,56,0.2)', borderRadius: '2px' }}>
        {/* L-shaped corner markers */}
        <div className="absolute top-0 left-0 h-2.5 w-2.5 border-t border-l border-primary" />
        <div className="absolute top-0 right-0 h-2.5 w-2.5 border-t border-r border-primary" />
        <div className="absolute bottom-0 left-0 h-2.5 w-2.5 border-b border-l border-primary" />
        <div className="absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-primary" />

        <div className="grid gap-3 sm:grid-cols-2">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-3 p-4 transition-colors hover:bg-grid/[0.03]"
            style={{ border: '1px solid rgba(58,58,56,0.15)', borderRadius: '2px' }}
          >
            <Mail size={16} className="text-primary" />
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-grid/40">Email</div>
              <span className="font-mono text-[11px] text-grid/70">{profile.email}</span>
            </div>
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 transition-colors hover:bg-grid/[0.03]"
            style={{ border: '1px solid rgba(58,58,56,0.15)', borderRadius: '2px' }}
          >
            <Linkedin size={16} className="text-primary" />
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-grid/40">LinkedIn</div>
              <span className="font-mono text-[11px] text-grid/70">Profile</span>
            </div>
          </a>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 transition-colors hover:bg-grid/[0.03]"
            style={{ border: '1px solid rgba(58,58,56,0.15)', borderRadius: '2px' }}
          >
            <Github size={16} className="text-primary" />
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-grid/40">GitHub</div>
              <span className="font-mono text-[11px] text-grid/70">Sid-131</span>
            </div>
          </a>

          <div
            className="flex items-center gap-3 p-4"
            style={{ border: '1px solid rgba(58,58,56,0.15)', borderRadius: '2px' }}
          >
            <MapPin size={16} className="text-primary" />
            <div>
              <div className="font-mono text-[9px] uppercase tracking-[0.1em] text-grid/40">Location</div>
              <span className="font-mono text-[11px] text-grid/70">{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 pt-6 text-center" style={{ borderTop: '1px solid rgba(58,58,56,0.15)' }}>
        <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/40">
          &copy; {new Date().getFullYear()} {profile.name} — Built with React + Three.js
        </p>
      </footer>
    </section>
  );
}
