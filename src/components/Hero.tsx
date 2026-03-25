import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { profile } from '../data/portfolio';
import { SplitText } from './SplitText';
import { useMagnetic } from '../hooks/useMagnetic';

function MagneticBtn({ children, href, className, style, download }: {
  children: React.ReactNode;
  href: string;
  className?: string;
  style?: React.CSSProperties;
  download?: string;
}) {
  const ref = useMagnetic(0.25) as React.RefObject<HTMLAnchorElement>;
  return (
    <a ref={ref} href={href} className={className} style={style} download={download}>
      {children}
    </a>
  );
}

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (!contentRef.current) return;
      const y = window.scrollY * 0.3;
      contentRef.current.style.transform = `translateY(${y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 pt-20"
    >
      <div ref={contentRef} className="flex flex-col items-center" style={{ willChange: 'transform' }}>
        {/* t=150ms — Eyebrow */}
        <motion.span
          className="pill-tag mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: 'easeOut' }}
        >
          PM · Builder · Available
        </motion.span>

        {/* t=300ms — Name (split word reveal) */}
        <h1
          className="mb-4 text-center font-display font-bold italic text-deep"
          style={{ fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 0.88, letterSpacing: '-0.02em' }}
        >
          <SplitText text="Siddhant" delay={0.3} />
          <SplitText text="Singh." delay={0.4} />
        </h1>

        {/* t=700ms — Role line */}
        <motion.p
          className="mb-6 text-center font-body font-medium text-deep/70 sm:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5, ease: 'easeOut' }}
        >
          I build products. I understand customers. I write code.
        </motion.p>

        {/* t=700ms — Subtext */}
        <motion.p
          className="mx-auto mb-8 max-w-lg text-center font-body text-sm leading-relaxed text-deep/50 sm:text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5, ease: 'easeOut' }}
        >
          {profile.shortTagline}
        </motion.p>

        {/* Quote */}
        <motion.blockquote
          className="glass-card mx-auto mb-10 max-w-xl p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
        >
          <p className="font-display italic text-base leading-relaxed text-deep/60">
            {profile.interviewQuote}
          </p>
        </motion.blockquote>

        {/* t=900ms — CTAs with stagger + magnetic */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { label: 'View Work', href: '#projects', primary: true },
            { label: '🐍 Let\'s Play', href: '#game', green: true },
            { label: 'Resume', href: '/resume.pdf', download: 'Siddhant_Singh_Resume.pdf', icon: true },
            { label: 'Get in Touch', href: '#contact' },
          ].map((btn, i) => (
            <motion.div
              key={btn.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.08, duration: 0.5, ease: 'easeOut' }}
            >
              <MagneticBtn
                href={btn.href}
                download={btn.download}
                className={btn.primary ? 'pill-btn' : 'flex items-center gap-2 font-body text-sm text-deep/65 transition-colors hover:text-deep'}
                style={
                  btn.primary ? undefined :
                  btn.green ? {
                    borderRadius: '100px',
                    background: 'rgba(107,175,126,0.18)',
                    border: '1.5px solid rgba(107,175,126,0.4)',
                    padding: '10px 22px',
                    color: 'inherit',
                    fontFamily: 'inherit',
                  } : {
                    borderRadius: '100px',
                    border: '1.5px solid rgba(43,64,53,0.22)',
                    padding: '10px 22px',
                  }
                }
              >
                {btn.icon && <Download size={14} />}
                {btn.label}
              </MagneticBtn>
            </motion.div>
          ))}
        </div>

        {/* Social icons */}
        <motion.div
          className="mt-8 flex items-center gap-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-deep/35 transition-colors hover:text-deep" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-deep/35 transition-colors hover:text-deep" aria-label="GitHub"><Github size={18} /></a>
          <a href={`mailto:${profile.email}`} className="text-deep/35 transition-colors hover:text-deep" aria-label="Email"><Mail size={18} /></a>
        </motion.div>
      </div>

      <a href="#game" className="absolute bottom-10 animate-bounce text-deep/25 transition-colors hover:text-deep" aria-label="Scroll down">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}
