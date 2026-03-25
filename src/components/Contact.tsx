import { Mail, Linkedin, Github, MapPin, Film } from 'lucide-react';
import { profile } from '../data/portfolio';
import { AnimateIn } from './AnimateIn';
import { RotatingText } from './RotatingText';

export default function Contact() {
  return (
    <section id="contact" className="relative z-20 mx-auto max-w-[640px] px-6 py-24">
      <AnimateIn className="text-center">
        <span className="section-label">Contact</span>
        <h2
          className="mb-4 font-display font-bold text-deep tracking-tight"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)', lineHeight: 1.1 }}
        >
          Let's Connect
        </h2>
        <p className="mx-auto mb-10 font-body text-base leading-relaxed text-deep/45">
          I'm actively looking for Associate PM / PM roles.<br />
          Open to conversations about AI-native products, developer tooling, and B2B SaaS.
        </p>
      </AnimateIn>

      <AnimateIn delay={1}>
        <div className="glass-card p-8">
          <div className="grid gap-3 sm:grid-cols-2">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-3 p-4 transition-colors hover:bg-white/5"
              style={{ background: 'rgba(234,234,234,0.04)', borderRadius: '8px' }}
            >
              <Mail size={16} className="text-deep/50" />
              <div>
                <span className="section-label" style={{ marginBottom: 2 }}>Email</span>
                <p className="font-body text-sm text-deep/55">{profile.email}</p>
              </div>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 transition-colors hover:bg-white/5"
              style={{ background: 'rgba(234,234,234,0.04)', borderRadius: '8px' }}
            >
              <Linkedin size={16} className="text-deep/50" />
              <div>
                <span className="section-label" style={{ marginBottom: 2 }}>LinkedIn</span>
                <p className="font-body text-sm text-deep/55">Profile</p>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 transition-colors hover:bg-white/5"
              style={{ background: 'rgba(234,234,234,0.04)', borderRadius: '8px' }}
            >
              <Github size={16} className="text-deep/50" />
              <div>
                <span className="section-label" style={{ marginBottom: 2 }}>GitHub</span>
                <p className="font-body text-sm text-deep/55">Sid-131</p>
              </div>
            </a>

            <div
              className="flex items-center gap-3 p-4"
              style={{ background: 'rgba(234,234,234,0.04)', borderRadius: '8px' }}
            >
              <MapPin size={16} className="text-deep/50" />
              <div>
                <span className="section-label" style={{ marginBottom: 2 }}>Location</span>
                <p className="font-body text-sm text-deep/55">{profile.location}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={2}>
        <div
          onClick={() => window.open('https://media.sidmatrix.xyz/web/', '_blank', 'noopener,noreferrer')}
          className="mt-4 flex cursor-pointer items-center gap-4 p-5 transition-colors hover:bg-white/5"
          style={{ background: 'rgba(234,234,234,0.04)', borderRadius: '24px', border: '1px solid rgba(234,234,234,0.08)' }}
        >
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ background: 'rgba(45,96,206,0.15)' }}
          >
            <Film size={18} className="text-deep/60" />
          </div>
          <div className="flex-1">
            <p className="font-display font-bold text-base text-deep">Wanna watch a movie?</p>
            <p className="font-body text-sm text-deep/40">I run a self-hosted Jellyfin server. Email me for access.</p>
          </div>
          <a
            href={`mailto:${profile.email}?subject=Jellyfin Access Request`}
            onClick={(e) => e.stopPropagation()}
            className="shrink-0 font-body text-xs text-deep/40 underline decoration-dotted hover:text-deep transition-colors"
          >
            Request access
          </a>
        </div>
      </AnimateIn>

      <AnimateIn delay={3}>
        <footer
          className="mt-16 pt-6"
          style={{ borderTop: '1px solid rgba(234,234,234,0.08)' }}
        >
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-deep/30">
              &copy; {new Date().getFullYear()} {profile.name} — Built with React + Vite
            </p>
            <RotatingText />
          </div>
        </footer>
      </AnimateIn>
    </section>
  );
}
