import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'backdrop-blur-md' : ''
      }`}
      style={{
        background: scrolled ? 'rgba(255,255,255,0.6)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(184,220,240,0.5)' : 'none',
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo — italic serif pill */}
        <a
          href="#hero"
          className="font-display italic font-bold text-deep"
          style={{
            fontSize: 16,
            background: 'rgba(43,64,53,0.07)',
            borderRadius: '100px',
            padding: '6px 16px',
          }}
        >
          ss.
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-body text-sm text-deep/60 transition-colors hover:text-deep"
            >
              {item.label}
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
            background: 'rgba(255,255,255,0.8)',
            borderTop: '1px solid rgba(184,220,240,0.4)',
          }}
        >
          <div className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-body text-sm text-deep/60 transition-colors hover:text-deep"
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
    </nav>
  );
}
