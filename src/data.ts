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
