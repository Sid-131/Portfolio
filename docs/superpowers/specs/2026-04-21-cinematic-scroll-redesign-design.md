# sidmatrix.xyz v2 — Cinematic Scroll Portfolio

**Date:** 2026-04-21
**Status:** Approved design, pending implementation plan
**Stack:** React 19 + TypeScript + Vite 7, no new dependencies

## Goals

1. **Visual polish / wow-factor** — richer micro-interactions, staggered reveals, count-up stats, letter-mask hero reveal.
2. **Content & storytelling** — each project becomes an editorial case block with problem → built → result copy instead of a small hover card.

Non-goals: new color scheme, new fonts, new content, analytics, CMS.

## Decisions Made

| Decision | Choice |
|---|---|
| Site flow | Hybrid — full-screen cinematic hero, then free natural scroll |
| Project presentation | Editorial alternating rows (visual panel + story column, sides alternate) |
| Animation approach | Vanilla: IntersectionObserver + CSS transitions + requestAnimationFrame. No GSAP, no Lenis, no Framer Motion |
| Content | Identical identity and details to current site (projects, stats, bio, photo, socials, movie + snake cards) |

## What Stays Unchanged

- `#080808` background, `#FF4D00` accent, Cabinet Grotesk / Satoshi / JetBrains Mono
- Loader with 00→100 counter and glowing orb
- Grain overlay (SVG feTurbulence)
- 3 mesh blobs with mouse parallax (rAF)
- Custom 12px cursor, mix-blend-mode: difference, 6× scale on hover
- Circular clip-path menu (now scrolls to anchors instead of switching sections)
- Movie card (Jellyfin link) + Snake card, stacked bottom-right; snake game overlay with G shortcut
- All 6 projects, 4 stats, bio copy, avatar photo, socials, resume link

## What Changes

- **Navigation:** wheel-hijack and fixed sections removed. `overflow: hidden` on body removed; page scrolls naturally. Menu links use `scrollIntoView({ behavior: 'smooth' })` on section anchors.
- **Section indicator:** `01 ——— 04` bottom-left stays, driven by an IntersectionObserver that tracks which section is most in view.
- **Work section:** 2-col hover-card grid replaced by 6 full-width editorial rows.

## Page Structure (top → bottom)

### 1. Hero (`#hero`, 100svh)
- Same PRODUCT / *MANAGER.* type at clamp(3.5rem, 14vw, 180px)
- Letter-mask reveal: each line wrapped in `overflow: hidden`, inner span translates up after loader completes (CSS transition, staggered delays)
- Orange radial glow behind outline text (unchanged)
- Subtitle + tag (unchanged copy)
- Bouncing scroll cue (replaces "SCROLL OR NAVIGATE" button; clicking scrolls to About)

### 2. About (`#about`)
- Two-column ≥768px: bio left, photo right (single column below)
- Photo container unchanged (avatar.jpg, gradient overlay, name tag, orange glow)
- 4 stats count up from 0 when scrolled into view (rAF, ~1s, ease-out; strings parsed: "1,000+" → animate 0→1000 then append "+")
- Section reveals with stagger (heading → copy → stats → photo)

### 3. Work (`#work`)
- Heading: `// SELECTED WORK` + PROJECTS (outline italic second line style consistent with other sections)
- 6 editorial rows, alternating: odd-numbered projects (01, 03, 05) visual-left/story-right; even-numbered (02, 04, 06) reversed. Single column stacked on mobile (visual above story)
- **Visual panel:** aspect 4/3, project gradient bg (existing per-project gradients), giant index number (01–06) in Cabinet Grotesk outline, project monogram, accent glow that intensifies on hover, subtle scale(1.02) on hover
- **Story column:** category tag (mono, accent color) → title (Cabinet 900) → case copy (problem → built → result, Satoshi, ~60 words) → metric callout (large Cabinet number + mono label) → tech tags (mono pills) → link CTA (VIEW PROJECT ↗ / READ TEARDOWN ↗)
- Rows reveal on scroll: slide in from their visual-panel side + fade, staggered children

### 4. Contact (`#contact`, min-height 100svh)
- Unchanged: LET'S / *BUILD.* outline-fill hover, email link, 3 social circles, footer line (© / location / resume / play)

## Case-Study Copy (draft — review these)

**01 · Sidmatrix Homelab — Infrastructure · 2024**
Problem: Cloud hosting for personal projects costs money and teaches you nothing about infrastructure. Built: A 19-container Docker stack on home hardware — media server, reverse proxy, monitoring, this portfolio — exposed via Cloudflare Tunnel with zero port-forwarding. Result: Production-grade uptime at $0/month.
Metric: **19** containers · $0/mo. Tags: Docker, Nginx, Cloudflare Tunnel, Linux. Link: GitHub.

**02 · RAG Chatbot — AI · Production · 2024**
Problem: Mutual fund FAQs are repetitive, but a hallucinating bot in finance is worse than no bot. Built: A retrieval-augmented chatbot with dual-layer guardrails — input filtering and grounded-answer validation — deployed to production. Result: Answers stay pinned to source documents.
Metric: **2** guardrail layers. Tags: Python, RAG, LLM, FastAPI. Link: GitHub repo.

**03 · Lumynex v1.0 — Windows · Shipped · 2025**
Problem: Windows multi-monitor setups silently break after sleep, driver updates, or dock changes. Built: A self-healing display manager that detects and restores broken layouts automatically — shipped as a standalone EXE, no install. Result: v1.0 released publicly.
Metric: **v1.0** shipped. Tags: Windows, C#, Win32 API. Link: GitHub release.

**04 · Relay.app Teardown — PM Work · 2025**
Problem: Relay.app loses users during onboarding before they reach the core value moment. Built: A full onboarding teardown using the PSYCH framework — mapped every screen, identified friction points, proposed three concrete fixes. Result: A structured case study in product thinking.
Metric: **3** fixes proposed. Tags: PM, Onboarding, PSYCH. Link: PDF.

**05 · Cube AI Teardown — PM Work · 2026**
Problem: Cube AI's growth is capped by UX friction the team is too close to see. Built: A product teardown covering six identified UX problems, five prioritised interventions, and a growth audit. Result: An actionable improvement roadmap.
Metric: **6** UX problems found. Tags: PM, UX Audit, Growth. Link: PDF.

**06 · SyncIQ Precheck Tool — Dell · Internal · 2023**
Problem: Manual prechecks before PowerScale SyncIQ failover were slow and error-prone under incident pressure. Built: An automated seven-section precheck that validates cluster state before failover. Result: Adopted internally by Dell support engineers.
Metric: **7** sections automated. Tags: PowerScale, Python, Automation. Link: GitHub.

## Code Structure

```
src/
  main.tsx
  index.css              # grain/blob/pulse keyframes; overflow rules updated for scroll
  data.ts                # PROJECTS (with case fields), STATS, SOCIALS, constants (ORANGE, EASE, fonts)
  hooks/
    useReveal.ts         # IntersectionObserver hook → [ref, visible]; options: threshold, once
  components/
    effects/
      GrainOverlay.tsx
      MeshBlobs.tsx
      CustomCursor.tsx
      Loader.tsx
    chrome/
      Header.tsx
      CircularMenu.tsx   # now: scroll-to-anchor
      SectionDots.tsx    # 01——04 indicator, IO-driven
      FloatingCards.tsx  # MovieCard + SnakeCard stack
      SnakeGame.tsx
    sections/
      Hero.tsx
      About.tsx          # includes CountUpStat
      Work.tsx           # includes ProjectRow
      Contact.tsx
  App.tsx                # composition only (~80 lines)
```

**PROJECTS data model:**

```ts
type Project = {
  id: string; index: string;            // '01'…'06'
  name: string; cat: string;
  problem: string; built: string; result: string;
  metric: { value: string; label: string };
  tags: string[];
  href: string; linkLabel: string;      // 'VIEW PROJECT ↗' | 'READ TEARDOWN ↗'
  accent: string; bg: string;           // existing gradients
};
```

**useReveal contract:** `const [ref, visible] = useReveal<T extends HTMLElement>({ threshold = 0.2, once = true })`. Components apply `opacity/transform` transitions keyed on `visible`. One observer instance per hook call; disconnects after first trigger when `once`.

## Mobile & Performance

- Breakpoint 768px: single column everywhere, cursor: auto (existing), project rows stack visual-above-story, hero type already clamps
- 100svh (not 100vh) for hero/contact to avoid mobile URL-bar jump
- All listeners passive; IO instead of scroll handlers; images `loading="lazy"` below the fold
- `prefers-reduced-motion` media rule already zeroes animations (kept); reveals fall back to visible
- Bundle target: ≤ current 225KB (no new deps; splitting is free)

## Error Handling

- avatar.jpg missing → container keeps #111 bg and name tag (no broken-image icon: `onError` hides img element)
- IO unsupported (ancient browsers) → useReveal defaults `visible = true`
- Snake game and menu behavior unchanged (ESC closes, capture-phase keys)

## Verification

1. `npm run build` clean (tsc + vite)
2. Preview server: console clean, snapshot shows all 4 sections, click-through menu anchors, stats count up, project links resolve (PDFs 200)
3. Mobile viewport (375px): single column, no horizontal scroll
4. Deploy: existing deploy.bat flow (scp dist + docker restart), verify sidmatrix.xyz
5. Commit + push to GitHub

## Rollback

Previous build remains in git history (`8d0ee30`); redeploying old dist restores the site in one command.
