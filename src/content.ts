// All copy and facts for the site live here, so the components stay presentational.

export const LINKS = {
  email: 'siddhant.singh131@outlook.com',
  linkedin: 'https://www.linkedin.com/in/siddhant-singh-3b58681a7',
  github: 'https://github.com/Sid-131',
  resume: '/resume.pdf',
};

export const NAV = [
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'journey', label: 'Journey' },
  { id: 'playground', label: 'Playground' },
];

/* ── Hero: ticket → pattern → tool ─────────────────────────────── */

export type Loop = {
  name: string;
  ticket: string;
  pattern: string;
  tool: string;
  result: string;
};

export const LOOPS: Loop[] = [
  {
    name: 'Failover',
    ticket: 'Customer wants a failover tonight. Is the target cluster ready?',
    pattern: 'Every failover meant the same long list of manual checks, run under pressure.',
    tool: 'A 30-check precheck that ends in a go / no-go summary.',
    result: 'Standard protocol. 1,000+ runs, zero failover incidents since.',
  },
  {
    name: 'Case review',
    ticket: 'Which of this week’s ~300 cases does each L2 reviewer own?',
    pattern: 'Reviews lived in a hand-split spreadsheet, and long cases got re-reviewed every week.',
    tool: 'A review platform that routes cases into seven skill queues.',
    result: 'Case time-to-resolve went from 7 days to 3.',
  },
  {
    name: 'Docs lookup',
    ticket: 'What’s the exact isi command for this? It’s somewhere in 11 guides.',
    pattern: 'Each lookup took about 30 minutes, and generic chatbots invent CLI syntax.',
    tool: 'A local assistant that answers only from Dell’s guides, with citations.',
    result: 'Under 20 seconds per lookup. Piloted with 40+ engineers.',
  },
];

export const BUILT_ACROSS = [
  { org: 'Dell Technologies', what: 'PowerScale / OneFS support' },
  { org: 'NextLeap', what: 'Product Management Fellowship' },
  { org: 'Amity University', what: 'B.Tech, Civil Engineering' },
  { org: 'Sidmatrix homelab', what: 'Where I try things first' },
];

/* ── Signal band ──────────────────────────────────────────────── */

export const SIGNALS = [
  {
    value: '1,000+',
    title: 'Failovers prechecked',
    body: 'Run through the precheck I co-built. Zero failover incidents since it became standard protocol.',
    tag: 'Dell, standard protocol',
  },
  {
    value: '7 → 3',
    title: 'Days to resolve a case',
    body: 'After the L2 Review Platform went live for a 12-person team handling ~300 cases a week.',
    tag: 'Dell, in production',
  },
  {
    value: '<20s',
    title: 'Per documentation lookup',
    body: 'Down from about 30 minutes, in an AI assistant piloted with 40+ support engineers.',
    tag: 'Applied AI, pilot',
  },
];

/* ── Selected work ─────────────────────────────────────────────── */

export type Feature = {
  id: 'assistant' | 'l2';
  kind: string;
  title: string;
  question: string;
  steps: { title: string; body: string }[];
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  note: string;
};

export const FEATURES: Feature[] = [
  {
    id: 'assistant',
    kind: 'Applied AI, internal pilot',
    title: 'PowerScale AI Assistant',
    question: 'What if every OneFS answer came from Dell’s own guides, with the page to prove it?',
    steps: [
      { title: 'Stay in the console', body: 'It lives inside the OneFS WebUI and InsightIQ, scoped to what each console can actually do.' },
      { title: 'Cite or stay quiet', body: 'Answers come from 5,205 passages across 11 official guides, each with its source.' },
      { title: 'Hand back the command', body: 'The exact isi command, ready to copy, instead of a paragraph about it.' },
    ],
    primary: { label: 'Read the deep dive', href: '#case/assistant' },
    secondary: { label: 'View the code', href: 'https://github.com/Sid-131/Admin-Assistant' },
    note: 'Internal pilot, not a Dell product. Dell’s product team is building its own assistant; I’m contributing demos and requirements to it.',
  },
  {
    id: 'l2',
    kind: 'Internal platform, in production',
    title: 'L2 Review Platform',
    question: 'Should a case router that agrees with human reviewers 41% of the time ship at all?',
    steps: [
      { title: 'Route', body: 'The weekly case export lands in seven skill queues, with reviewers auto-assigned and load-capped.' },
      { title: 'Review', body: 'L2s set a verdict in the browser. Anything other than “no action” needs a written reason.' },
      { title: 'Learn', body: 'Every routing correction is saved as labelled data for a better model later.' },
    ],
    primary: { label: 'Read the case study', href: '/l2-case-study/' },
    secondary: { label: 'View the code', href: 'https://github.com/Sid-131/L2-Platform' },
    note: '41% is the real benchmark against 185 human-labelled cases. That’s why it shipped as a triage aid, not an autopilot.',
  },
];

export const ASSISTANT_CASE = {
  title: 'PowerScale AI Assistant',
  sub: 'A documentation assistant inside the PowerScale consoles that answers only from Dell’s official guides.',
  facts: [
    { k: 'Role', v: 'Problem framing, build and pilot' },
    { k: 'Stack', v: 'Ollama, ChromaDB, Flask, fully local' },
    { k: 'Status', v: 'Pilot with 40+ engineers' },
  ],
  sections: [
    {
      h: 'The problem',
      p: [
        'Answering a OneFS configuration question meant searching 11 admin and CLI guides. That took around 30 minutes per lookup, often mid-call with a customer waiting.',
        'Generic chatbots were faster but couldn’t be trusted: a confident, invented isi flag is worse than no answer on a production storage cluster.',
      ],
    },
    {
      h: 'What I built',
      p: [
        'A retrieval-augmented assistant embedded in the OneFS WebUI and the InsightIQ console. It indexes 5,205 passages from 11 official Dell guides and runs entirely on local models, so nothing leaves the machine.',
      ],
    },
    {
      h: 'Decisions that shaped it',
      list: [
        'Local only. Support conversations involve customer environments, so a cloud API was off the table from day one.',
        'Citations are mandatory. If retrieval finds nothing relevant, the assistant says so instead of guessing.',
        'Scope walls per console. The WebUI assistant doesn’t answer InsightIQ questions, and the reverse, because a right answer in the wrong console is still wrong.',
        'Commands come out copyable. Engineers want the line to paste, not a description of it.',
      ],
    },
    {
      h: 'Results',
      list: [
        'Lookups dropped from about 30 minutes to under 20 seconds.',
        'Piloted with 40+ support engineers at around 75% exact-answer accuracy.',
        'Presented to management, who are working on implementing it.',
      ],
    },
    {
      h: 'What happened next',
      p: [
        'The demo reached Dell’s storage product management team, which already had its own assistant in progress. So I joined that effort: I was invited to demo improvements to its engineers and write the requirements.',
        'Next on my side: a CLI version invoked as isi ai <query>, and a competitive study of storage-vendor assistants and MCP servers.',
      ],
    },
  ],
  links: [
    { label: 'View the code', href: 'https://github.com/Sid-131/Admin-Assistant' },
  ],
};

/* ── In the real world ─────────────────────────────────────────── */

export const RECOGNITION = [
  { title: 'Game Changer', date: 'Jul 2026', note: 'For the SyncIQ failover / failback precheck.' },
  { title: 'Game Changer', date: 'Jan 2026', note: 'Service modernization and support automation.' },
  { title: 'Bravo', date: 'Oct 2025', note: 'Top 3% of engineers.' },
  { title: 'Delight', date: 'Sep 2024', note: '' },
];

/* ── Skills ───────────────────────────────────────────────────── */

export type Skill = {
  id: string;
  label: string;
  summary: string;
  evidence: { title: string; body: string; href?: string }[];
};

export const SKILLS: Skill[] = [
  {
    id: 'discovery',
    label: 'Discovery & framing',
    summary: 'I start from the failure someone actually hit, then size it before I solve it.',
    evidence: [
      { title: 'FlowMind capstone', body: '20+ survey responses, review mining across G2, Capterra and Trustpilot, a 17-screen first-hand journey audit, and feedback from a founder, a VC and a designer.', href: '/FlowMind_Deck.pdf' },
      { title: 'Product teardowns', body: 'CRED, Rapido, YONO SBI, Snitch, Digi Yatra and Relay.app, using one framework: users, business model, competitors, metrics, opportunities.', href: '/relay_onboarding.pdf' },
      { title: 'Competitive study', body: 'Storage-vendor assistants and MCP servers, including which ones run writes as infrastructure-as-code.' },
    ],
  },
  {
    id: 'ai',
    label: 'Applied AI',
    summary: 'I use AI where a wrong answer is expensive, so most of my work is guardrails and grounding.',
    evidence: [
      { title: 'Local RAG in a regulated setting', body: '5,205 passages, citations required, nothing sent to a cloud API.', href: '#case/assistant' },
      { title: 'Designing AI hand-offs', body: 'FlowMind maps where Claude’s plans stall for non-technical users, and what to offer at that moment.', href: 'https://flowmind-creator-92.lovable.app/' },
      { title: 'Claude skills in daily use', body: 'Author of four production Claude skills for support and job-search workflows.' },
    ],
  },
  {
    id: 'systems',
    label: 'Systems & investigation',
    summary: 'Four years of high-severity storage escalations: I read logs before I read opinions.',
    evidence: [
      { title: 'Enterprise escalations', body: 'Banking, telecom and media customers on PowerScale: performance, failover, protocols and InfiniBand back-end issues.' },
      { title: 'Performance triage', body: 'Designed a gen_perf analyzer covering CPU, protocol, job engine, write path and disk pool checks.' },
      { title: 'Self-hosted infrastructure', body: 'A Docker stack on a 2019 laptop behind Cloudflare Tunnel, with no open ports. It serves this site.' },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & adoption',
    summary: 'A tool counts when the team runs it without being asked.',
    evidence: [
      { title: 'Shipped at 41%, on purpose', body: 'The L2 router went live as a triage aid with human review, not as an autopilot.', href: '/l2-case-study/' },
      { title: 'Cut a check to keep trust', body: 'One precheck raised false alarms, so it came out. A gate people learn to ignore protects nobody.' },
      { title: 'Production basics', body: 'Role-based access, TLS and automated, verified backups on the L2 platform.' },
    ],
  },
];

/* ── Playground ───────────────────────────────────────────────── */

export type PlayKind = 'Build' | 'Research' | 'Prototype' | 'Game';

export type PlayItem = {
  id: string;
  kind: PlayKind;
  title: string;
  line: string;
  takeaway?: string;
  tags: string[];
  links: { label: string; href: string }[];
  glyph: 'flow' | 'doc' | 'display' | 'wallet' | 'shield' | 'rack' | 'snake';
};

export const PLAYGROUND: PlayItem[] = [
  {
    id: 'flowmind', kind: 'Prototype', title: 'FlowMind', glyph: 'flow',
    line: 'NextLeap capstone: a layer in Claude.ai that helps non-technical users actually start the workflows it designs for them.',
    takeaway: 'The drop-off wasn’t design. It was the moment execution needed a script or an API key.',
    tags: ['User research', 'RICE', 'Lovable'],
    links: [
      { label: 'Try the prototype', href: 'https://flowmind-creator-92.lovable.app/' },
      { label: 'Read the deck', href: '/FlowMind_Deck.pdf' },
    ],
  },
  {
    id: 'relay', kind: 'Research', title: 'Relay.app onboarding', glyph: 'doc',
    line: 'A screen-by-screen onboarding teardown using the PSYCH framework, ending in three concrete fixes.',
    takeaway: 'Users drop before they reach the core value moment, so that moment has to come sooner.',
    tags: ['Onboarding', 'PSYCH'],
    links: [{ label: 'Read the teardown', href: '/relay_onboarding.pdf' }],
  },
  {
    id: 'cube', kind: 'Research', title: 'Cube AI teardown', glyph: 'doc',
    line: 'Six UX problems, five prioritised interventions and a growth audit. Independent work, not commissioned.',
    tags: ['UX audit', 'Growth'],
    links: [{ label: 'Read the teardown', href: '/Cube_AI_Product_Teardown.pdf' }],
  },
  {
    id: 'lumynex', kind: 'Build', title: 'Lumynex v1.0', glyph: 'display',
    line: 'A Windows display manager that notices when a multi-monitor layout breaks after sleep or a dock change, and restores it.',
    takeaway: 'Ships as a standalone EXE. Nothing to install.',
    tags: ['Python', 'PyQt5', 'WMI'],
    links: [{ label: 'Get the release', href: 'https://github.com/Sid-131/lumynex/releases/tag/v1.0' }],
  },
  {
    id: 'expensio', kind: 'Build', title: 'Expensio', glyph: 'wallet',
    line: 'Personal and shared expenses in one place, now going Telegram-first so logging is a single message.',
    takeaway: 'People abandon expense apps at the logging step, so the fix is fewer taps, not more features.',
    tags: ['FastAPI', 'PostgreSQL', 'Telegram'],
    links: [{ label: 'View the code', href: 'https://github.com/Sid-131/Expense-Tracker' }],
  },
  {
    id: 'rag', kind: 'Build', title: 'Mutual fund FAQ bot', glyph: 'shield',
    line: 'A RAG chatbot for fund FAQs with two guardrail layers: input filtering and grounded-answer checks.',
    takeaway: 'In finance, a bot that makes things up is worse than no bot.',
    tags: ['RAG', 'Guardrails', 'Vercel'],
    links: [{ label: 'View the code', href: 'https://github.com/Sid-131/RAG_chat_bot' }],
  },
  {
    id: 'homelab', kind: 'Build', title: 'Sidmatrix homelab', glyph: 'rack',
    line: 'Media server, reverse proxy, monitoring, local LLMs and this site, on one 2019 laptop. No forwarded ports.',
    takeaway: 'Production-grade uptime at $0 a month.',
    tags: ['Docker', 'Nginx', 'Cloudflare Tunnel'],
    links: [],
  },
  {
    id: 'snake', kind: 'Game', title: 'Snake, in this site', glyph: 'snake',
    line: 'A small game hidden in the page. On a keyboard, press G from anywhere.',
    takeaway: 'Every portfolio needs one thing that exists only because it’s fun.',
    tags: ['Canvas', 'Easter egg'],
    links: [{ label: 'Play it', href: '#play' }],
  },
];

/* ── Journey ──────────────────────────────────────────────────── */

export const JOURNEY = [
  {
    when: '2017 – 2021',
    org: 'Amity University, Lucknow',
    role: 'B.Tech, Civil Engineering',
    note: 'Load paths and failure modes. The habit transferred better than the syllabus.',
  },
  {
    when: 'Oct 2022',
    org: 'Dell Technologies',
    role: 'Technical Support Engineer I',
    note: 'PowerScale / OneFS escalations for enterprise customers in banking, telecom and media.',
  },
  {
    when: 'Mar 2025',
    org: 'Dell Technologies',
    role: 'Technical Support Engineer II',
    note: 'Promoted. High-severity escalations, plus the internal tools the team now runs on.',
  },
  {
    when: '2026, alongside work',
    org: 'NextLeap',
    role: 'Product Management Fellowship',
    note: 'Discovery, prioritisation and GTM, capped by the FlowMind capstone.',
  },
];

/* ── The person ───────────────────────────────────────────────── */

export const DEFAULTS = [
  {
    h: 'Find the failure point first.',
    p: 'A ticket says what broke. I want to know who else it hits, how often, and what it costs when it does.',
  },
  {
    h: 'Ship the honest number.',
    p: 'The L2 router agreed with humans 41% of the time. Saying so up front is why the team trusts it as a triage aid.',
  },
  {
    h: 'Adoption is the result.',
    p: 'A demo is a start. The precheck mattered when it became the protocol nobody has to be reminded to run.',
  },
];

export const OFF_CLOCK = [
  'Dancing, more seriously than casually',
  'Long bike rides',
  'Cosmology rabbit holes',
  'Badminton on Saturdays',
  'PC games, most genres',
  'Horror films I regret at 1 a.m.',
];
