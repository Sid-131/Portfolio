# Cinematic Scroll Redesign (v2) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert sidmatrix.xyz from section-slide navigation to a cinematic-hero + free-scroll page with editorial project case rows, splitting the 1,100-line App.tsx into focused modules.

**Architecture:** All visual identity (colors, fonts, effects, snake game, floating cards) is preserved. Navigation changes from wheel-hijacked fixed sections to natural scroll with IntersectionObserver-driven reveals. Shared constants/data move to `src/data.ts`; a single `useReveal` hook powers all scroll animations; components split into `effects/`, `chrome/`, `sections/`.

**Tech Stack:** React 19, TypeScript, Vite 7, Tailwind v4 (only for its preflight — all component styles are inline). **No new dependencies.** No unit-test framework exists in this repo and none is added (visual portfolio; YAGNI) — every task's verification gate is `npm run build` (which runs `tsc -b`, catching type errors) plus preview-server checks in Task 11.

**Spec:** `docs/superpowers/specs/2026-04-21-cinematic-scroll-redesign-design.md`

**Working reference:** The current `src/App.tsx` stays untouched until Task 10. Tasks 3–9 create new files that duplicate some of its components (module scope keeps this compiling). Copy instructions reference component names in `src/App.tsx` — search by the banner comments (e.g. `// ── Snake game ──`).

---

### Task 1: Shared data module

**Files:**
- Create: `src/data.ts`

- [ ] **Step 1: Write `src/data.ts`**

```ts
import type { CSSProperties } from 'react';

export const ORANGE = '#FF4D00';
export const EASE   = 'cubic-bezier(0.23, 1, 0.32, 1)';

export const cab  = "'Cabinet Grotesk', ui-sans-serif, sans-serif";
export const sat  = "'Satoshi', ui-sans-serif, sans-serif";
export const mono = "'JetBrains Mono', ui-monospace, monospace";

export function monoTag(_text: string, color = 'rgba(255,255,255,0.3)'): CSSProperties {
  return { fontFamily: mono, fontSize: 10, letterSpacing: '0.5em', color, textTransform: 'uppercase' as const };
}

export type Project = {
  id: string;
  index: string;              // '01'…'06'
  name: string;
  cat: string;
  problem: string;
  built: string;
  result: string;
  metric: { value: string; label: string };
  tags: string[];
  href: string;
  linkLabel: string;
  accent: string;
  bg: string;
};

export const PROJECTS: Project[] = [
  {
    id: 'homelab', index: '01', name: 'Sidmatrix Homelab', cat: 'Infrastructure · 2024',
    problem: "Cloud hosting for personal projects costs money and teaches you nothing about infrastructure.",
    built: "A 19-container Docker stack on home hardware — media server, reverse proxy, monitoring, this portfolio — exposed via Cloudflare Tunnel with zero port-forwarding.",
    result: "Production-grade uptime at $0/month.",
    metric: { value: '19', label: 'containers · $0/mo' },
    tags: ['Docker', 'Nginx', 'Cloudflare Tunnel', 'Linux'],
    href: 'https://github.com/Sid-131', linkLabel: 'VIEW PROJECT ↗',
    accent: '#FF4D00', bg: 'linear-gradient(135deg,#1a0800 0%,#0a0400 100%)',
  },
  {
    id: 'rag', index: '02', name: 'RAG Chatbot', cat: 'AI · Production · 2024',
    problem: "Mutual fund FAQs are repetitive, but a hallucinating bot in finance is worse than no bot.",
    built: "A retrieval-augmented chatbot with dual-layer guardrails — input filtering and grounded-answer validation — deployed to production.",
    result: "Answers stay pinned to source documents.",
    metric: { value: '2', label: 'guardrail layers' },
    tags: ['Python', 'RAG', 'LLM', 'FastAPI'],
    href: 'https://github.com/Sid-131/RAG_chat_bot', linkLabel: 'VIEW PROJECT ↗',
    accent: '#6366f1', bg: 'linear-gradient(135deg,#08080f 0%,#040408 100%)',
  },
  {
    id: 'lumynex', index: '03', name: 'Lumynex v1.0', cat: 'Windows · Shipped · 2025',
    problem: "Windows multi-monitor setups silently break after sleep, driver updates, or dock changes.",
    built: "A self-healing display manager that detects and restores broken layouts automatically — shipped as a standalone EXE, no install.",
    result: "v1.0 released publicly.",
    metric: { value: 'v1.0', label: 'shipped' },
    tags: ['Windows', 'C#', 'Win32 API'],
    href: 'https://github.com/Sid-131/lumynex/releases/tag/v1.0', linkLabel: 'VIEW RELEASE ↗',
    accent: '#FF8C00', bg: 'linear-gradient(135deg,#120800 0%,#080400 100%)',
  },
  {
    id: 'relay', index: '04', name: 'Relay.app Teardown', cat: 'PM Work · 2025',
    problem: "Relay.app loses users during onboarding before they reach the core value moment.",
    built: "A full onboarding teardown using the PSYCH framework — mapped every screen, identified friction points, proposed three concrete fixes.",
    result: "A structured case study in product thinking.",
    metric: { value: '3', label: 'fixes proposed' },
    tags: ['PM', 'Onboarding', 'PSYCH'],
    href: '/relay_onboarding.pdf', linkLabel: 'READ TEARDOWN ↗',
    accent: '#00C896', bg: 'linear-gradient(135deg,#001510 0%,#000a08 100%)',
  },
  {
    id: 'cube', index: '05', name: 'Cube AI Teardown', cat: 'PM Work · 2026',
    problem: "Cube AI's growth is capped by UX friction the team is too close to see.",
    built: "A product teardown covering six identified UX problems, five prioritised interventions, and a growth audit.",
    result: "An actionable improvement roadmap.",
    metric: { value: '6', label: 'UX problems found' },
    tags: ['PM', 'UX Audit', 'Growth'],
    href: '/Cube_AI_Product_Teardown.pdf', linkLabel: 'READ TEARDOWN ↗',
    accent: '#FF4D00', bg: 'linear-gradient(135deg,#120000 0%,#080000 100%)',
  },
  {
    id: 'synciq', index: '06', name: 'SyncIQ Precheck Tool', cat: 'Dell · Internal · 2023',
    problem: "Manual prechecks before PowerScale SyncIQ failover were slow and error-prone under incident pressure.",
    built: "An automated seven-section precheck that validates cluster state before failover.",
    result: "Adopted internally by Dell support engineers.",
    metric: { value: '7', label: 'sections automated' },
    tags: ['PowerScale', 'Python', 'Automation'],
    href: 'https://github.com/Sid-131', linkLabel: 'VIEW PROJECT ↗',
    accent: '#888', bg: 'linear-gradient(135deg,#0d0d0d 0%,#080808 100%)',
  },
];

export type Stat = { end: number; decimals?: number; prefix?: string; suffix?: string; label: string };

export const STATS: Stat[] = [
  { end: 1000, suffix: '+',    label: 'Enterprise Incidents' },
  { end: 4,                    label: 'Shipped Products' },
  { end: 3.5, decimals: 1, suffix: ' YRS', label: 'At Dell' },
  { end: 0,   prefix: '$', suffix: '/MO',  label: 'Homelab Cost' },
];

export const SOCIALS = [
  { label: 'LI', full: 'LinkedIn', href: 'https://linkedin.com/in/siddhant-singh-3b58681a7' },
  { label: 'GH', full: 'GitHub',   href: 'https://github.com/Sid-131' },
  { label: 'EM', full: 'Email',    href: 'mailto:siddhant.singh131@outlook.com' },
];

export const SECTION_IDS = ['hero', 'about', 'work', 'contact'] as const;
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0 (new file compiles; nothing imports it yet).

- [ ] **Step 3: Commit**

```bash
git add src/data.ts
git commit -m "feat(v2): shared data module with case-study project model"
```

---

### Task 2: useReveal hook

**Files:**
- Create: `src/hooks/useReveal.ts`

- [ ] **Step 1: Write `src/hooks/useReveal.ts`**

```ts
import { useEffect, useRef, useState } from 'react';

type Options = { threshold?: number; once?: boolean };

/** Returns [ref, visible]. visible flips true when the element enters the viewport. */
export function useReveal<T extends HTMLElement>({ threshold = 0.2, once = true }: Options = {}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, visible] as const;
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useReveal.ts
git commit -m "feat(v2): useReveal IntersectionObserver hook"
```

---

### Task 3: Effects components (pure moves)

**Files:**
- Create: `src/components/effects/GrainOverlay.tsx`
- Create: `src/components/effects/MeshBlobs.tsx`
- Create: `src/components/effects/CustomCursor.tsx`
- Create: `src/components/effects/Loader.tsx`

Each file is the component copied verbatim from `src/App.tsx` (find by banner comment), with `export` added and constants imported from `../../data` instead of module scope.

- [ ] **Step 1: Create `GrainOverlay.tsx`**

Copy the `GrainOverlay` function from `src/App.tsx` (banner `// ── Grain overlay ──`). File header + export:

```tsx
export function GrainOverlay() {
  // …body copied verbatim from App.tsx (no imports needed — it uses no constants)
}
```

- [ ] **Step 2: Create `MeshBlobs.tsx`**

Copy the `MeshBlobs` function from `src/App.tsx` (banner `// ── Mesh blobs ──`). Header:

```tsx
import { useEffect, useRef } from 'react';
import { ORANGE } from '../../data';

export function MeshBlobs() { /* body verbatim */ }
```

- [ ] **Step 3: Create `CustomCursor.tsx`**

Copy the `CustomCursor` function from `src/App.tsx` (banner `// ── Custom cursor ──`). Header:

```tsx
import { useEffect, useRef } from 'react';
import { EASE } from '../../data';

export function CustomCursor() { /* body verbatim */ }
```

- [ ] **Step 4: Create `Loader.tsx`**

Copy the `Loader` function from `src/App.tsx` (banner `// ── Page loader ──`). Header:

```tsx
import { useState, useEffect, useCallback } from 'react';
import { ORANGE, EASE, cab, monoTag } from '../../data';

export function Loader({ onDone }: { onDone: () => void }) { /* body verbatim */ }
```

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/effects
git commit -m "feat(v2): split effects components out of App"
```

---

### Task 4: Chrome — Header, CircularMenu (anchor navigation), SectionDots

**Files:**
- Create: `src/components/chrome/Header.tsx`
- Create: `src/components/chrome/CircularMenu.tsx`
- Create: `src/components/chrome/SectionDots.tsx`

- [ ] **Step 1: Create `Header.tsx`**

Copy the `Header` function from `src/App.tsx` (banner `// ── Header ──`). Header:

```tsx
import { useState } from 'react';
import { ORANGE, EASE, cab, monoTag } from '../../data';

export function Header({ onMenu }: { onMenu: () => void }) { /* body verbatim */ }
```

- [ ] **Step 2: Create `CircularMenu.tsx`** — signature change: `onGo` now takes a section id string.

Copy the `CircularMenu` function and `NAV_ITEMS` from `src/App.tsx` (banner `// ── Circular nav overlay ──`), then apply these exact changes:

```tsx
import { useState, useEffect } from 'react';
import { ORANGE, EASE, cab, monoTag, SOCIALS } from '../../data';

const NAV_ITEMS = [
  { label: 'HERO',    id: 'hero' },
  { label: 'ABOUT',   id: 'about' },
  { label: 'WORK',    id: 'work' },
  { label: 'CONTACT', id: 'contact' },
];

export function CircularMenu({ open, onClose, onGo }: {
  open: boolean; onClose: () => void; onGo: (id: string) => void;
}) {
  // body verbatim EXCEPT the link button's onClick:
  //   BEFORE: onClick={() => { onGo(item.idx); onClose(); }}
  //   AFTER:  onClick={() => { onGo(item.id); onClose(); }}
}
```

- [ ] **Step 3: Create `SectionDots.tsx`** (replaces SectionProgress; new code)

```tsx
import { useState, useEffect } from 'react';
import { ORANGE, monoTag, SECTION_IDS } from '../../data';

export function SectionDots() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    // Fires when a section crosses the viewport's vertical center.
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setCur(SECTION_IDS.indexOf(e.target.id as typeof SECTION_IDS[number]));
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 'clamp(1.5rem,3vw,3rem)', left: 'clamp(1.5rem,3vw,3rem)',
      display: 'flex', alignItems: 'center', gap: 12, zIndex: 100,
    }}>
      <span style={{ ...monoTag(`0${cur + 1}`, ORANGE), fontSize: 12 }}>0{cur + 1}</span>
      <div style={{ width: 48, height: 1, background: '#27272a' }} />
      <span style={{ ...monoTag(`0${SECTION_IDS.length}`, '#52525b'), fontSize: 12 }}>0{SECTION_IDS.length}</span>
    </div>
  );
}
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/chrome
git commit -m "feat(v2): chrome components — header, anchor menu, section dots"
```

---

### Task 5: Chrome — SnakeGame and FloatingCards (pure moves)

**Files:**
- Create: `src/components/chrome/SnakeGame.tsx`
- Create: `src/components/chrome/FloatingCards.tsx`

- [ ] **Step 1: Create `SnakeGame.tsx`**

Copy from `src/App.tsx` (banner `// ── Snake game ──`) the constants `CELL`, `GCOLS`, `GROWS`, types `Pt`, `Dir`, and the whole `SnakeGame` function. Header:

```tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import { ORANGE, EASE, cab, mono } from '../../data';

// CELL, GCOLS, GROWS, Pt, Dir verbatim…

export function SnakeGame({ open, onClose }: { open: boolean; onClose: () => void }) { /* body verbatim */ }
```

- [ ] **Step 2: Create `FloatingCards.tsx`**

Copy the `MovieCard` and `SnakeCard` functions from `src/App.tsx` (banners `// ── Movie card` and `// ── Snake card`) as private (non-exported) functions, then add the exported wrapper (this markup currently lives inline in App's return):

```tsx
import { useState } from 'react';
import { ORANGE, EASE, sat, mono } from '../../data';

function MovieCard() { /* body verbatim */ }
function SnakeCard({ onOpen }: { onOpen: () => void }) { /* body verbatim */ }

export function FloatingCards({ onSnake }: { onSnake: () => void }) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 'clamp(1.5rem,3vw,3rem)',
      right: 'clamp(1.5rem,3vw,3rem)',
      display: 'flex', flexDirection: 'column', gap: 10,
      zIndex: 150,
    }}>
      <MovieCard />
      <SnakeCard onOpen={onSnake} />
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/chrome/SnakeGame.tsx src/components/chrome/FloatingCards.tsx
git commit -m "feat(v2): move snake game and floating cards to chrome components"
```

---

### Task 6: Hero section with letter-mask reveal

**Files:**
- Create: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Write `Hero.tsx`**

```tsx
import { useState } from 'react';
import { ORANGE, EASE, cab, sat, monoTag } from '../../data';

function MaskLine({ text, delay, active, outline }: {
  text: string; delay: number; active: boolean; outline?: boolean;
}) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <span style={{
        display: 'block', fontFamily: cab, fontWeight: 900,
        fontSize: 'clamp(3.5rem,14vw,180px)', lineHeight: 0.95, letterSpacing: '-0.04em',
        color: outline ? 'transparent' : '#fff',
        WebkitTextStroke: outline ? '1px rgba(255,255,255,0.75)' : undefined,
        fontStyle: outline ? 'italic' : 'normal',
        position: 'relative',
        transform: active ? 'none' : 'translateY(110%)',
        transition: `transform 0.9s ${delay}s ${EASE}`,
      }}>
        {text}
        {outline && (
          <span style={{
            position: 'absolute', right: '0%', bottom: '-10%',
            width: '35%', height: '120%',
            background: `radial-gradient(circle, ${ORANGE} 0%, transparent 70%)`,
            filter: 'blur(60px)', opacity: 0.28,
            mixBlendMode: 'screen', pointerEvents: 'none',
          }} />
        )}
      </span>
    </span>
  );
}

function ScrollCue({ onClick }: { onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        background: 'none', border: 'none', cursor: 'none', padding: 0,
      }}
      data-cur
    >
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        border: `1px solid ${hov ? ORANGE : 'rgba(255,255,255,0.15)'}`,
        background: hov ? 'rgba(255,77,0,0.1)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: `all 0.3s ${EASE}`, flexShrink: 0,
        animation: 'cue-bounce 2.2s ease-in-out infinite',
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v12M2 8l6 6 6-6" stroke={hov ? ORANGE : 'rgba(255,255,255,0.55)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span style={monoTag('SCROLL', 'rgba(255,255,255,0.28)')}>SCROLL</span>
    </button>
  );
}

export function Hero({ active, onNext }: { active: boolean; onNext: () => void }) {
  return (
    <section id="hero" style={{
      minHeight: '100svh', position: 'relative',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(2rem,5vw,8rem)',
      paddingTop: 'calc(clamp(1.5rem,3vw,3rem) + 72px)',
    }}>
      <div style={{
        ...monoTag('// PM · BUILDER · BENGALURU, INDIA', ORANGE),
        marginBottom: 40,
        opacity: active ? 1 : 0,
        transition: `opacity 0.7s 0.15s ${EASE}`,
      }}>
        {'// PM · BUILDER · BENGALURU, INDIA'}
      </div>

      <h1 style={{ margin: 0 }}>
        <MaskLine text="PRODUCT"  delay={0.25} active={active} />
        <MaskLine text="MANAGER." delay={0.4}  active={active} outline />
      </h1>

      <p style={{
        fontFamily: sat, fontSize: '1.2rem', color: 'rgba(255,255,255,0.38)',
        marginTop: 48, maxWidth: '28rem', lineHeight: 1.7,
        opacity: active ? 1 : 0, transform: active ? 'none' : 'translateY(20px)',
        transition: `opacity 0.7s 0.65s ${EASE}, transform 0.7s 0.65s ${EASE}`,
      }}>
        Builds products that turn enterprise chaos into clarity. 1,000+ incidents resolved. 4 tools shipped. Real infrastructure, real research.
      </p>

      <div style={{
        marginTop: 56,
        opacity: active ? 1 : 0,
        transition: `opacity 0.7s 0.85s ${EASE}`,
      }}>
        <ScrollCue onClick={onNext} />
      </div>
    </section>
  );
}
```

Note: the tag div renders its text as children (unlike the old App where the styled div was empty and self-closing — that was a latent bug: the tag text never rendered).

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(v2): hero section with letter-mask reveal and scroll cue"
```

---

### Task 7: About section with count-up stats

**Files:**
- Create: `src/components/sections/About.tsx`

- [ ] **Step 1: Write `About.tsx`**

```tsx
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { ORANGE, EASE, cab, sat, monoTag, STATS, type Stat } from '../../data';
import { useReveal } from '../../hooks/useReveal';

function CountUpStat({ stat, start }: { stat: Stat; start: boolean }) {
  const { end, decimals = 0, prefix = '', suffix = '', label } = stat;
  const [n, setN] = useState(0);
  const ran = useRef(false);

  useEffect(() => {
    if (!start || ran.current) return;
    ran.current = true;
    const t0 = performance.now();
    const DUR = 1100;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / DUR, 1);
      setN(end * (1 - Math.pow(1 - p, 3))); // ease-out cubic
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end]);

  const shown = decimals > 0
    ? n.toFixed(decimals)
    : Math.round(n).toLocaleString('en-US');

  return (
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 16 }}>
      <p style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(1.5rem,3vw,38px)', color: '#fff', letterSpacing: '-0.04em', margin: 0, lineHeight: 1 }}>
        {prefix}{shown}{suffix}
      </p>
      <p style={{ ...monoTag(label, 'rgba(255,255,255,0.22)'), marginTop: 6 }}>{label}</p>
    </div>
  );
}

export function About() {
  const [ref, visible] = useReveal<HTMLElement>();

  const fade = (delay: number): CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : 'translateY(28px)',
    transition: `opacity 0.7s ${delay}s ${EASE}, transform 0.7s ${delay}s ${EASE}`,
  });

  return (
    <section id="about" ref={ref} style={{
      padding: 'clamp(4rem,8vw,10rem) clamp(2rem,5vw,8rem)',
      position: 'relative',
    }}>
      <div className="about-grid">
        {/* Left */}
        <div>
          <div style={{ ...monoTag('// ABOUT', ORANGE), marginBottom: 32, ...fade(0) }}>{'// ABOUT'}</div>
          <h2 style={{ margin: 0, lineHeight: 0.88, letterSpacing: '-0.04em', ...fade(0.1) }}>
            <span style={{ display: 'block', fontFamily: cab, fontWeight: 900, fontSize: 'clamp(2.5rem,7vw,86px)', color: '#fff' }}>
              TSE WHO
            </span>
            <span style={{
              display: 'block', fontFamily: cab, fontWeight: 900,
              fontSize: 'clamp(2.5rem,7vw,86px)',
              color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.75)',
              fontStyle: 'italic',
            }}>
              BUILDS.
            </span>
          </h2>
          <p style={{
            fontFamily: sat, fontSize: '1.05rem', lineHeight: 1.78,
            color: 'rgba(255,255,255,0.42)', marginTop: 28, marginBottom: 48,
            ...fade(0.2),
          }}>
            3.5 years resolving 1,000+ enterprise S1/S2 production incidents at Dell — product failure from the customer's side, under pressure, in real time. Then I built the tools that should've existed: a RAG chatbot, a Windows display manager, a 19-container homelab, and PM teardowns. NextLeap PM Fellowship formalised the product thinking.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, ...fade(0.3) }}>
            {STATS.map(s => <CountUpStat key={s.label} stat={s} start={visible} />)}
          </div>
        </div>

        {/* Right — photo */}
        <div style={{ position: 'relative', ...fade(0.25) }}>
          <div style={{
            aspectRatio: '4/5', borderRadius: '2rem',
            border: '1px solid rgba(255,255,255,0.08)',
            overflow: 'hidden', position: 'relative',
            background: '#111',
          }}>
            <img
              src="/avatar.jpg"
              alt="Siddhant Singh"
              loading="lazy"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
              background: 'linear-gradient(to top, rgba(8,8,8,0.85), transparent)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <p style={{ ...monoTag('SIDDHANT SINGH', 'rgba(255,255,255,0.7)'), margin: 0 }}>SIDDHANT SINGH</p>
              <p style={{ ...monoTag('PRODUCT · BUILDER', ORANGE), margin: 0, opacity: 0.9 }}>PRODUCT · BUILDER</p>
            </div>
            <div style={{
              position: 'absolute', bottom: '-20%', right: '-20%',
              width: '70%', height: '70%',
              background: `radial-gradient(circle, ${ORANGE}, transparent 70%)`,
              filter: 'blur(40px)', opacity: 0.15, pointerEvents: 'none',
            }} />
          </div>
          <div style={{
            position: 'absolute', bottom: '-10%', right: '-10%',
            width: '55%', height: '55%',
            background: ORANGE, filter: 'blur(80px)',
            opacity: 0.1, borderRadius: '50%', zIndex: -1,
          }} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/About.tsx
git commit -m "feat(v2): about section with count-up stats and photo"
```

---

### Task 8: Work section — editorial alternating project rows

**Files:**
- Create: `src/components/sections/Work.tsx`

- [ ] **Step 1: Write `Work.tsx`**

```tsx
import { useState } from 'react';
import { ORANGE, EASE, cab, sat, mono, monoTag, PROJECTS, type Project } from '../../data';
import { useReveal } from '../../hooks/useReveal';

function CaseLine({ label, text }: { label: string; text: string }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ ...monoTag(label, 'rgba(255,255,255,0.28)'), marginBottom: 4 }}>{label}</p>
      <p style={{ fontFamily: sat, fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.5)', margin: 0 }}>{text}</p>
    </div>
  );
}

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const [ref, visible] = useReveal<HTMLDivElement>({ threshold: 0.15 });
  const [hov, setHov] = useState(false);
  const rev = i % 2 === 1; // 02, 04, 06 → visual on the right

  return (
    <div
      ref={ref}
      className={`prow${rev ? ' rev' : ''}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : `translateX(${rev ? 40 : -40}px)`,
        transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
        marginBottom: 'clamp(4rem,8vw,9rem)',
      }}
    >
      {/* Visual panel */}
      <a
        className="pvis"
        href={p.href}
        target={p.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        style={{ textDecoration: 'none', display: 'block' }}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        data-cur
      >
        <div style={{
          aspectRatio: '4/3', borderRadius: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)',
          background: p.bg, position: 'relative', overflow: 'hidden',
          transform: hov ? 'scale(1.02)' : 'none',
          transition: `transform 0.5s ${EASE}`,
        }}>
          {/* Giant index */}
          <span style={{
            position: 'absolute', top: '8%', left: '6%',
            fontFamily: cab, fontWeight: 900,
            fontSize: 'clamp(5rem,10vw,140px)', lineHeight: 1,
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            letterSpacing: '-0.04em', pointerEvents: 'none',
          }}>
            {p.index}
          </span>
          {/* Monogram */}
          <span style={{
            position: 'absolute', bottom: '8%', right: '8%',
            fontFamily: cab, fontWeight: 900, fontSize: 22,
            color: 'rgba(255,255,255,0.35)', letterSpacing: '-0.02em',
          }}>
            {p.name.split(' ')[0].toUpperCase()}
          </span>
          {/* Accent glow — intensifies on hover */}
          <div style={{
            position: 'absolute', bottom: '-30%', right: '-20%',
            width: '80%', height: '80%',
            background: `radial-gradient(circle, ${p.accent}, transparent 70%)`,
            filter: 'blur(50px)',
            opacity: hov ? 0.4 : 0.18,
            transition: `opacity 0.5s ${EASE}`,
            pointerEvents: 'none',
          }} />
        </div>
      </a>

      {/* Story column */}
      <div className="pstory">
        <p style={{ ...monoTag(p.cat, p.accent), marginBottom: 14 }}>{p.cat}</p>
        <h3 style={{
          fontFamily: cab, fontWeight: 900,
          fontSize: 'clamp(1.8rem,3.5vw,44px)',
          color: '#fff', letterSpacing: '-0.03em', lineHeight: 1, margin: '0 0 24px',
        }}>
          {p.name}
        </h3>

        <CaseLine label="PROBLEM" text={p.problem} />
        <CaseLine label="BUILT"   text={p.built} />
        <CaseLine label="RESULT"  text={p.result} />

        {/* Metric callout */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, margin: '26px 0' }}>
          <span style={{ fontFamily: cab, fontWeight: 900, fontSize: 'clamp(2rem,4vw,52px)', color: p.accent, letterSpacing: '-0.04em', lineHeight: 1 }}>
            {p.metric.value}
          </span>
          <span style={monoTag(p.metric.label, 'rgba(255,255,255,0.3)')}>{p.metric.label}</span>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 26 }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 100, padding: '5px 12px',
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={p.href}
          target={p.href.startsWith('http') ? '_blank' : undefined}
          rel="noopener noreferrer"
          style={{ ...monoTag(p.linkLabel, 'rgba(255,255,255,0.55)'), fontSize: 11, textDecoration: 'none', transition: `color 0.2s ${EASE}` }}
          onMouseEnter={e => (e.currentTarget.style.color = ORANGE)}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
          data-cur
        >
          {p.linkLabel}
        </a>
      </div>
    </div>
  );
}

export function Work() {
  const [ref, visible] = useReveal<HTMLDivElement>();

  return (
    <section id="work" style={{ padding: 'clamp(4rem,8vw,10rem) clamp(2rem,5vw,8rem)', position: 'relative' }}>
      <div ref={ref} style={{
        marginBottom: 'clamp(3rem,6vw,6rem)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(28px)',
        transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
      }}>
        <div style={{ ...monoTag('// SELECTED WORK', ORANGE), marginBottom: 16 }}>{'// SELECTED WORK'}</div>
        <h2 style={{ margin: 0, lineHeight: 0.88, letterSpacing: '-0.04em' }}>
          <span style={{ display: 'block', fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,9vw,112px)', color: '#fff' }}>
            SELECTED
          </span>
          <span style={{
            display: 'block', fontFamily: cab, fontWeight: 900, fontSize: 'clamp(3rem,9vw,112px)',
            color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.75)', fontStyle: 'italic',
          }}>
            WORK.
          </span>
        </h2>
      </div>

      {PROJECTS.map((p, i) => <ProjectRow key={p.id} p={p} i={i} />)}
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Work.tsx
git commit -m "feat(v2): editorial alternating project case rows"
```

---

### Task 9: Contact section

**Files:**
- Create: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Write `Contact.tsx`**

Copy the `ContactSection` function from `src/App.tsx` (banner `// ── Contact ──`) with these exact changes — imports, rename, section wrapper, and reveal:

```tsx
import { useState } from 'react';
import { ORANGE, EASE, cab, mono, monoTag, SOCIALS } from '../../data';
import { useReveal } from '../../hooks/useReveal';

export function Contact({ onSnake }: { onSnake: () => void }) {
  const [hov, setHov] = useState(false);
  const [ref, visible] = useReveal<HTMLElement>();

  // Outer element changes:
  //   BEFORE: <div style={{ width: '100%', height: '100%', display: 'flex', … }}>
  //   AFTER:
  return (
    <section id="contact" ref={ref} style={{
      minHeight: '100svh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      padding: 'clamp(2rem,5vw,8rem)',
      position: 'relative',
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : 'translateY(28px)',
      transition: `opacity 0.8s ${EASE}, transform 0.8s ${EASE}`,
    }}>
      {/* …entire inner body verbatim from ContactSection: tag, LET'S/BUILD. link,
          email link, social circles, footer line with © / RESUME ↗ / PLAY ↗ … */}
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Contact.tsx
git commit -m "feat(v2): contact section in scroll flow"
```

---

### Task 10: index.css scroll rules + App.tsx composition rewrite

These land together: the new CSS removes `overflow: hidden`, which the old App.tsx layout depends on.

**Files:**
- Modify: `src/index.css` (full replacement)
- Modify: `src/App.tsx` (full replacement)

- [ ] **Step 1: Replace `src/index.css` with:**

```css
@import "tailwindcss";

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  background: #080808;
  color: #fff;
  font-family: 'Satoshi', ui-sans-serif, system-ui, sans-serif;
  cursor: none;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

/* ── Grain ─────────────────────────────────────────────── */
@keyframes grain {
  0%, 100% { transform: translate(0,    0   ); }
  20%       { transform: translate(-5%, -10%); }
  40%       { transform: translate(-15%, 5% ); }
  60%       { transform: translate(7%,  -25%); }
  80%       { transform: translate(-5%, 25% ); }
}

.grain-overlay {
  position: fixed;
  top: -100%; left: -100%;
  width: 300%; height: 300%;
  pointer-events: none;
  z-index: 9997;
  opacity: 0.05;
  animation: grain 8s steps(5) infinite;
  filter: url(#noise);
}

/* ── Blobs & pulses ────────────────────────────────────── */
@keyframes float-a {
  0%, 100% { transform: translateY(0px)   scale(1);    }
  50%       { transform: translateY(30px)  scale(1.04); }
}
@keyframes float-b {
  0%, 100% { transform: translateY(0px)   scale(1);    }
  50%       { transform: translateY(-30px) scale(0.97); }
}
@keyframes float-c {
  0%, 100% { transform: translateY(0px)   scale(1);    }
  50%       { transform: translateY(20px)  scale(1.02); }
}
@keyframes pulse-orb {
  0%, 100% { transform: scale(1);   opacity: 0.6; }
  50%       { transform: scale(1.5); opacity: 0.8; }
}
@keyframes cue-bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}

/* ── Layout grids ──────────────────────────────────────── */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4vw;
  align-items: center;
}

.prow {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 4vw;
  align-items: center;
}
.prow.rev .pvis { order: 2; }

/* ── Scrollbar ─────────────────────────────────────────── */
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: #080808; }
::-webkit-scrollbar-thumb { background: #FF4D00; border-radius: 100px; }

::selection { background: rgba(255,77,0,0.3); }

@media (max-width: 768px) {
  body { cursor: auto; }
  .about-grid, .prow { grid-template-columns: 1fr; }
  .prow.rev .pvis { order: 0; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Replace `src/App.tsx` with:**

```tsx
import { useState, useEffect } from 'react';
import { GrainOverlay }  from './components/effects/GrainOverlay';
import { MeshBlobs }     from './components/effects/MeshBlobs';
import { CustomCursor }  from './components/effects/CustomCursor';
import { Loader }        from './components/effects/Loader';
import { Header }        from './components/chrome/Header';
import { CircularMenu }  from './components/chrome/CircularMenu';
import { SectionDots }   from './components/chrome/SectionDots';
import { SnakeGame }     from './components/chrome/SnakeGame';
import { FloatingCards } from './components/chrome/FloatingCards';
import { Hero }          from './components/sections/Hero';
import { About }         from './components/sections/About';
import { Work }          from './components/sections/Work';
import { Contact }       from './components/sections/Contact';

export default function App() {
  const [loaded,    setLoaded] = useState(false);
  const [menuOpen,  setMenu]   = useState(false);
  const [snakeOpen, setSnake]  = useState(false);

  // G opens the snake game from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (snakeOpen || menuOpen) return;
      if (e.key === 'g' || e.key === 'G') setSnake(true);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [snakeOpen, menuOpen]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div style={{ position: 'relative', background: '#080808', minHeight: '100vh' }}>
      <CustomCursor />
      <GrainOverlay />
      <MeshBlobs />

      {!loaded && <Loader onDone={() => setLoaded(true)} />}

      <Header onMenu={() => setMenu(true)} />
      <CircularMenu open={menuOpen} onClose={() => setMenu(false)} onGo={go} />
      <SnakeGame open={snakeOpen} onClose={() => setSnake(false)} />

      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero active={loaded} onNext={() => go('about')} />
        <About />
        <Work />
        <Contact onSnake={() => setSnake(true)} />
      </main>

      {loaded && <SectionDots />}
      {loaded && <FloatingCards onSnake={() => setSnake(true)} />}
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: exits 0. If tsc reports unused-identifier errors, they mean a component was left in a new module but never exported/imported — fix the import, don't suppress.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/App.tsx
git commit -m "feat(v2): free-scroll composition — App rewrite and scroll CSS"
```

---

### Task 11: Preview verification

**Files:** none (verification only)

- [ ] **Step 1: Start the preview server** (uses `.claude/launch.json`, name `portfolio` — `npm run dev`, port 5173; create the entry if missing).

- [ ] **Step 2: Console + snapshot checks**
- Console: zero errors after load
- Snapshot: all four sections present (hero type, TSE WHO, SELECTED WORK, LET'S BUILD.), 6 project rows with PROBLEM/BUILT/RESULT text, floating movie + snake cards

- [ ] **Step 3: Interaction checks**
- Menu → click WORK → page scrolls to `#work` (snapshot confirms)
- Snake card click → game overlay opens; ESC closes
- Scroll to About → stat values render non-zero (count-up completed)

- [ ] **Step 4: Mobile check**
- Resize to 375×812: single-column About and project rows, no horizontal scrollbar (`document.documentElement.scrollWidth <= 375`)

- [ ] **Step 5: Fix anything found, re-run failing check, commit fixes**

```bash
git add -A && git commit -m "fix(v2): preview verification fixes"
```

(Skip the commit if nothing needed fixing.)

---

### Task 12: Deploy and push

**Files:** none

- [ ] **Step 1: Build**

Run: `npm run build`
Expected: exits 0; note bundle size (target ≤ ~225KB).

- [ ] **Step 2: Deploy to server**

```bash
scp -r dist/assets platform@192.168.29.217:~/portfolio/dist/
scp dist/index.html platform@192.168.29.217:~/portfolio/dist/
ssh platform@192.168.29.217 "docker restart sidmatrix-portfolio"
```

- [ ] **Step 3: Verify live site**

Run: `ssh platform@192.168.29.217 "curl -s -o /dev/null -w '%{http_code}' http://localhost:3010/"`
Expected: `200`

- [ ] **Step 4: Push**

```bash
git push origin main
```
