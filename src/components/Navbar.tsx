import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { navItems } from '../data/portfolio';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
      style={{
        background: scrolled ? 'rgba(20,22,23,0.85)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(234,234,234,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : undefined,
      }}
    >
      <div className="mx-auto flex max-w-[1024px] items-center justify-between px-6 py-4">
        {/* Logo — geometric sans bold */}
        <a
          href="#hero"
          className="font-display font-bold text-deep"
          style={{
            fontSize: 16,
            background: 'rgba(234,234,234,0.07)',
            borderRadius: '4px',
            padding: '6px 16px',
            letterSpacing: '-0.02em',
          }}
        >
          SS
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] uppercase tracking-widest text-deep/50 transition-colors hover:text-deep"
            >
              <span className="text-sky">{String(i + 1).padStart(2, '0')}.</span> {item.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-4">
          <a href="#contact" className="pill-btn hidden md:inline-block">
            Let's Talk
          </a>
          <button
            className="text-deep/50 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="backdrop-blur-md md:hidden"
          style={{
            background: 'rgba(20,22,23,0.95)',
            borderTop: '1px solid rgba(234,234,234,0.08)',
          }}
        >
          <div className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-mono text-[11px] uppercase tracking-widest text-deep/50 transition-colors hover:text-deep"
              >
                {item.label}
              </a>
            ))}
            <a href="#contact" className="pill-btn mt-3 text-center">
              Let's Talk
            </a>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
