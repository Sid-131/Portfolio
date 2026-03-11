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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? 'bg-paper/90 backdrop-blur-sm' : 'bg-transparent'
      }`}
      style={{ borderBottom: '1px solid rgba(58, 58, 56, 0.2)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        {/* Logo box */}
        <a href="#hero" className="flex h-8 w-8 items-center justify-center bg-primary" style={{ borderRadius: '2px' }}>
          <span className="font-mono text-[10px] font-semibold tracking-widest text-white">SS</span>
        </a>

        {/* Desktop nav — numbered, monospaced */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-[0.1em] text-grid/60 transition-colors hover:text-primary"
            >
              {String(i + 1).padStart(2, '0')}. {item.label}
            </a>
          ))}
        </div>

        {/* Right — ghost button + mobile toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden font-mono text-[10px] uppercase tracking-[0.1em] text-primary md:block"
            style={{ border: '1px solid rgba(58, 58, 56, 0.2)', padding: '6px 16px', borderRadius: '2px' }}
          >
            Contact
          </a>
          <button
            className="text-grid/60 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-paper/95 backdrop-blur-sm md:hidden" style={{ borderTop: '1px solid rgba(58, 58, 56, 0.2)' }}>
          <div className="flex flex-col gap-0 px-6 py-4">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 font-mono text-[11px] uppercase tracking-[0.1em] text-grid/60 transition-colors hover:text-primary"
              >
                {String(i + 1).padStart(2, '0')}. {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
