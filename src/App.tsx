import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, X, ArrowUpRight } from 'lucide-react';

// ── Data ────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 'homelab',
    name: 'Sidmatrix Homelab',
    shortName: 'Homelab',
    description:
      '19-container self-hosted infrastructure on a single laptop — Grafana, Jellyfin, Nextcloud, Ollama, and more. Monitored by a custom 1,000-line Python observability engine. Runs at $0/month.',
    cta: 'View on GitHub',
    ctaHref: 'https://github.com/Sid-131',
    iconBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    iconEmoji: '🖥️',
    stats: ['19 containers', '98/100 health', '$0/month'],
    mockups: [
      { label: 'Observability Engine', content: '13 audit sections · 9-category weighted health score · zero dependencies' },
      { label: 'Stack', content: 'Nextcloud · Jellyfin · Ollama · Sonarr · Radarr · Prowlarr · Grafana · PostgreSQL' },
    ],
  },
  {
    id: 'rag',
    name: 'RAG Chatbot',
    shortName: 'RAG Chatbot',
    description:
      'Production RAG-based mutual fund FAQ chatbot with dual-layer guardrails — built with FastAPI, LangChain, and FAISS. Answers real customer queries with grounded, hallucination-resistant responses.',
    cta: 'View on GitHub',
    ctaHref: 'https://github.com/Sid-131/RAG_chat_bot',
    iconBg: 'linear-gradient(135deg, #6c3483 0%, #2471a3 100%)',
    iconEmoji: '🤖',
    stats: ['FastAPI + LangChain', 'Dual guardrails', 'Production-ready'],
    mockups: [
      { label: 'Architecture', content: 'PDF ingestion → FAISS vector store → LangChain retriever → GPT response with guardrails' },
      { label: 'Use Case', content: 'Mutual fund FAQ · Hallucination-resistant · Source-grounded answers' },
    ],
  },
  {
    id: 'lumynex',
    name: 'Lumynex v1.0',
    shortName: 'Lumynex',
    description:
      'A self-healing display manager for Windows that automatically restores your monitor layout after sleep, resume, or reboot. Shipped as a standalone v1.0 EXE — zero installation required.',
    cta: 'Download v1.0',
    ctaHref: 'https://github.com/Sid-131/lumynex/releases/tag/v1.0',
    iconBg: 'linear-gradient(135deg, #e27500 0%, #f5a623 100%)',
    iconEmoji: '🖥',
    stats: ['Windows app', 'v1.0 shipped', 'Standalone EXE'],
    mockups: [
      { label: 'Problem', content: 'Windows loses your monitor layout every time you sleep, undock, or reboot' },
      { label: 'Solution', content: 'One-click restore · Auto-detects connected displays · No installation needed' },
    ],
  },
  {
    id: 'relay',
    name: 'Relay Teardown',
    shortName: 'Teardown',
    description:
      "Deep-dive product teardown of Relay.app's new user onboarding — exploring flows, friction points, and missed activation opportunities. Published as a structured PM artifact.",
    cta: 'Read Teardown',
    ctaHref: '/relay_onboarding.pdf',
    iconBg: 'linear-gradient(135deg, #1a6b4a 0%, #27ae60 100%)',
    iconEmoji: '🔍',
    stats: ['Full PRD teardown', 'Onboarding analysis', 'Published artifact'],
    mockups: [
      { label: 'Scope', content: "Relay.app new user onboarding — activation flow, aha moment, friction mapping" },
      { label: 'Output', content: 'Annotated flow diagrams · Drop-off hypotheses · Opportunity recommendations' },
    ],
  },
];

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/siddhant-singh-3b58681a7' },
  { label: 'GitHub', href: 'https://github.com/Sid-131' },
];

// ── Icon component ───────────────────────────────────────────────────────────

function AppIcon({ project, onClick, isActive }: {
  project: typeof PROJECTS[0];
  onClick: () => void;
  isActive: boolean;
}) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 cursor-pointer"
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <motion.div
        className="app-icon"
        animate={{ scale: isActive ? 1.04 : 1 }}
        style={{ background: project.iconBg }}
      >
        <span style={{ fontSize: 42 }}>{project.iconEmoji}</span>
      </motion.div>
      <span className="icon-label">{project.shortName}</span>
    </motion.div>
  );
}

// ── Mockup "screenshot" ──────────────────────────────────────────────────────

function MockupCard({ mockup, rotate }: { mockup: { label: string; content: string }; rotate: number }) {
  return (
    <div
      className="mockup-card p-5"
      style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center center' }}
    >
      <p className="text-[11px] font-medium text-gray-400 uppercase tracking-wider mb-2">{mockup.label}</p>
      <p className="text-sm text-gray-600 leading-relaxed">{mockup.content}</p>
    </div>
  );
}

// ── Detail Panel ─────────────────────────────────────────────────────────────

function DetailPanel({ project, onClose }: { project: typeof PROJECTS[0]; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      className="detail-panel"
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      exit={{ x: '-100%' }}
      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
      >
        <X size={16} color="#888" />
      </button>

      {/* Icon */}
      <div
        className="app-icon mb-5"
        style={{ background: project.iconBg, width: 64, height: 64, borderRadius: 16 }}
      >
        <span style={{ fontSize: 28 }}>{project.iconEmoji}</span>
      </div>

      {/* Name */}
      <h2 className="text-[26px] font-semibold text-ink mb-2 leading-tight">{project.name}</h2>

      {/* Stats pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.stats.map((s) => (
          <span key={s} className="icon-label text-[12px] text-gray-500 py-1 px-3">{s}</span>
        ))}
      </div>

      {/* Description */}
      <p className="text-[15px] text-muted leading-relaxed mb-6">{project.description}</p>

      {/* CTA */}
      <a href={project.ctaHref} target="_blank" rel="noopener noreferrer" className="cta-btn mb-8">
        {project.ctaHref.endsWith('.pdf') ? null : project.ctaHref.includes('github') ? <Github size={13} /> : <ArrowUpRight size={13} />}
        {project.cta}
      </a>

      {/* Mockups */}
      <div className="mt-4 flex flex-col gap-4">
        {project.mockups.map((m, i) => (
          <MockupCard key={i} mockup={m} rotate={i === 0 ? -2 : 2} />
        ))}
      </div>
    </motion.div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeProject = PROJECTS.find((p) => p.id === activeId) ?? null;
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (containerRef.current && e.target === containerRef.current) setActiveId(null);
  };

  return (
    <div className="dot-grid relative h-screen w-screen overflow-hidden flex flex-col" style={{ background: '#f7f7f7' }}>

      {/* Backdrop blur when panel open */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            ref={containerRef}
            className="fixed inset-0 z-40"
            initial={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(247,247,247,0)' }}
            animate={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(247,247,247,0.4)' }}
            exit={{ backdropFilter: 'blur(0px)', backgroundColor: 'rgba(247,247,247,0)' }}
            transition={{ duration: 0.3 }}
            onClick={handleBackdropClick}
          />
        )}
      </AnimatePresence>

      {/* Detail Panel */}
      <AnimatePresence>
        {activeProject && <DetailPanel project={activeProject} onClose={() => setActiveId(null)} />}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 gap-10">

        {/* Hero headline */}
        <motion.h1
          className="font-display text-center text-ink"
          style={{ fontFamily: "'Caveat', cursive", fontSize: 'clamp(40px, 6vw, 68px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-0.01em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Welcome to my corner on the internet :)
        </motion.h1>

        {/* Projects grid */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {PROJECTS.map((p) => (
            <AppIcon
              key={p.id}
              project={p}
              onClick={() => setActiveId(activeId === p.id ? null : p.id)}
              isActive={activeId === p.id}
            />
          ))}
        </motion.div>

        {/* Bio */}
        <motion.div
          className="flex flex-col items-center gap-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{ maxWidth: 460, fontSize: 15, color: '#555', lineHeight: 1.75 }}>
            Hey there! I'm Siddhant — a TSE at Dell specialising in enterprise storage, with a growing obsession for product thinking. I've resolved 1,000+ production incidents, built tools for real clusters, and shipped products people actually use.
          </p>
          <a href="mailto:siddhant.singh131@outlook.com" className="cta-btn">
            Reach out <ArrowUpRight size={13} />
          </a>
        </motion.div>
      </div>

      {/* Pagination dots */}
      <motion.div
        className="flex items-center justify-center gap-2 pb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className={`page-dot ${i === 0 ? 'active' : 'inactive'}`} />
        ))}
      </motion.div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-6 pb-5" style={{ borderTop: '1px solid #ebebeb' }}>
        <div className="flex items-center gap-5 pt-4">
          {SOCIAL.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 13, color: '#888', textDecoration: 'none' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1a1a1a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
            >
              {s.label}
            </a>
          ))}
          <span style={{ fontSize: 12, color: '#bbb' }}>© 2026 Siddhant Singh. All rights reserved.</span>
        </div>
      </div>

    </div>
  );
}
