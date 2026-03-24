export const profile = {
  name: "Siddhant Singh",
  tagline: "3.5 years at the edge of product failure. 1,000+ enterprise incidents. 4 shipped products. Primary user research. Published teardowns. Most PMs have one of these. I have all of them.",
  shortTagline: "I've spent 3.5 years watching what breaks when product decisions fail — from the customer's side, under pressure. I then built the tools that didn't exist. I don't talk about shipping. I ship.",
  email: "siddhant.singh131@outlook.com",
  phone: "+91 79052 49718",
  linkedin: "https://linkedin.com/in/siddhant-singh-3b58681a7",
  github: "https://github.com/Sid-131",
  location: "Lucknow / Bengaluru, India",
  targetRole: "Associate Product Manager / Product Manager",
  interviewQuote:
    "I didn't study product management. I watched it fail — 1,000 times, in production, with a customer on the phone. Then I built the things that should have existed. That's the job.",
};

export const about = {
  story: [
    "Most PMs learn about customers from research studies. I learned from 1,000+ enterprise production incidents — S1/S2 escalations where systems were down, millions were at risk, and the customer on the phone needed an answer in the next 10 minutes. That's not support. That's product failure playing out in real time, with a human on the other end.",
    "The rest I built. A production RAG chatbot with dual-layer guardrails. A portable Windows display manager shipped as a v1.0 EXE. A 19-container homelab monitored by 1,000 lines of custom Python. Three years of internal tools at Dell that people actually used. I've also done the PM work — user research, PRDs, teardowns, KPI frameworks. I don't pitch decks about things I'd ship someday. I ship.",
  ],
  strengths: [
    "1,000+ S1/S2 incidents — customer empathy from the frontline, not the classroom",
    "4 shipped products — RAG chatbot, Lumynex, homelab, Dell internal tools",
    "Primary research: 45 surveys + 6 interviews — I know how to find the signal",
    "PRDs, KPI trees, product teardowns — PM thinking, fully formalized",
    "Python, FastAPI, Docker, RAG — I build what I design",
    "19-container homelab at $0/month — infrastructure decisions are product decisions",
  ],
  ratings: [
    { label: "Technical Depth", score: 18, max: 20 },
    { label: "Product Thinking", score: 16, max: 20 },
    { label: "User Research", score: 14, max: 20 },
    { label: "Execution & Shipping", score: 14, max: 20 },
    { label: "Visibility & Packaging", score: 6, max: 20 },
    { label: "Network & Referrals", score: 6, max: 20 },
  ],
};

export const experience = {
  company: "Dell Technologies",
  role: "Technical Support Engineer II",
  period: "Jan 2022 – Present",
  location: "Bengaluru, India",
  promotion: "Promoted from TSE-I (Oct 2022 – Mar 2025)",
  bullets: [
    "Owned resolution of 1,000+ enterprise production incidents (S1/S2) — acted as the customer-facing product owner of the resolution experience.",
    "Designed a 7-section automated precheck tool (SyncIQ Healthcheck Script) — reducing pre-failover diagnostic time and eliminating manual checklist blind spots.",
    "Led development of an internal AI-powered 'Next Best Action' tool — defined problem scope, logic pathways, and evaluated output relevance.",
    "Built and deployed an internal support chatbot — designed troubleshooting decision flows, reduced repetitive diagnostic load.",
    "Developed Python/Bash automation scripts reducing recurring incident volume by ~15% and improving MTTR.",
    "Built SSL certificate automation saving 15–30 minutes per incident (est. 200+ engineer-hours/year).",
    "Analyzed customer issue trends across 500+ escalations to identify systemic failure patterns.",
  ],
  awards: [
    { title: "Game Changer Award", description: "Highest Quarterly Recognition at Dell Technologies" },
    { title: "Bravo Award", description: "Top 3% of engineers" },
    { title: "Applause Award", description: "2x recipient" },
    { title: "Promoted to TSE-II", description: "Recognized for consistent impact" },
    { title: "ISM V5 Certified", description: "Professional certification" },
    { title: "Shri Baljit Shastri Award", description: "Academic excellence award" },
  ],
  education: "B.Tech Civil Engineering, Amity University Lucknow (2017–2021)",
  fellowship: "NextLeap Product Management Fellowship (Jan 2026 – Present)",
};

export const projects = [
  {
    id: "sidmatrix-homelab",
    title: "Sidmatrix Homelab — Self-Hosted Infrastructure",
    tags: ["Docker", "Python", "Linux", "FastAPI", "PostgreSQL", "Nginx", "Ollama", "Cloudflare"],
    problem:
      "Wanted a real production environment to build, deploy, and monitor full-stack applications — without cloud bills, vendor lock-in, or toy setups.",
    solution:
      "Repurposed a single laptop (AMD Ryzen 5, 8GB RAM) into a 19-container homelab running on Fedora 43. Hosts custom-built apps (Expensio), self-hosted services (Nextcloud, Jellyfin, Ollama + Open WebUI), and a full automation stack (Sonarr, Radarr, Prowlarr). Built a custom Python Observability Engine (~1000 lines, zero dependencies) with 13 audit sections and a 9-category weighted health score. Secured with SELinux enforcing, Cloudflare Tunnel (no open ports), SSH key-auth, and firewalld. Runs at $0/month, 35W power draw, 98/100 health score.",
    insight: "Running real infrastructure makes infrastructure decisions feel obvious — reliability, cost, and security stop being tradeoffs and start being design constraints.",
    github: "https://github.com/Sid-131",
    live: null,
    stats: [
      { label: "Containers", value: "19/19" },
      { label: "Health Score", value: "98/100" },
      { label: "Monthly Cost", value: "$0" },
      { label: "Power Draw", value: "~35W" },
    ],
  },
  {
    id: "rag-chatbot",
    title: "RAG-Based Mutual Fund FAQ Chatbot",
    tags: ["Python", "Gemini 2.5 Flash", "ChromaDB", "FastAPI", "Streamlit"],
    problem:
      "Investors using Groww had no reliable, citation-backed way to get factual mutual fund information.",
    solution:
      "Built a 13-phase RAG system: async web scraping (SEBI, AMFI, AMC fact sheets) → 400-token semantic chunking → 3072-dimensional vector embeddings → Top-5 cosine similarity retrieval → Gemini 2.5 Flash generation at temperature=0.0. Includes dual-layer guardrails (regex + LLM intent classification) blocking advisory questions to manage regulatory risk.",
    insight: "Facts-only. No investment advice. — guardrails before features.",
    github: "https://github.com/Sid-131/RAG_chat_bot",
    live: "https://rag-chat-bot-rouge.vercel.app",
  },
  {
    id: "lumynex",
    title: "Lumynex — Self-Healing Display Manager for Windows",
    tags: ["Python", "PyQt5", "WMI", "Windows API", "SetupAPI", "PyInstaller"],
    problem:
      "Windows 11 has persistent, unfixed multi-monitor failures — monitors losing signal after sleep, display layouts resetting on reboot, wrong resolutions on secondary screens. Microsoft's response has been slow and fragmented since 2021. No single tool combines hardware-aware recommendations, automatic rollback safety, and a soft reset in one portable EXE.",
    solution:
      "Built a portable Windows utility that detects GPU (NVIDIA/AMD/Intel via WMI + registry fallback), enumerates all connected monitors, generates per-monitor optimal settings based on GPU tier, and applies them with CDS_TEST validation + automatic rollback. One-click soft reset cycles only the discrete GPU adapter via SetupAPI — Intel adapters never touched, Optimus laptops safe. Real-time monitoring via WM_DISPLAYCHANGE with polling fallback. Zero cables unplugged. Single portable EXE, no installer, no network calls.",
    insight: "Your display fixes itself.",
    github: "https://github.com/Sid-131/lumynex",
    live: null,
    download: "https://github.com/Sid-131/lumynex/releases/tag/v1.0",
    upcoming: true,
  },
  {
    id: "relay-teardown",
    title: "Relay.app — New User Onboarding Teardown",
    tags: ["Product Teardown", "UX Analysis", "PSYCH Framework", "PLG", "Onboarding"],
    problem:
      "Relay.app has a strong top-of-funnel but loses users at a critical moment: after the intent question, users land on a blank canvas with no guidance. Step caps appear only after workflows are built — making users feel trapped, not upgraded.",
    solution:
      "Mapped the full 8-step onboarding journey through personal walkthrough + cross-referenced 60+ verified G2 reviews. Applied the PSYCH framework to 6 key design decisions — 4 smart, 2 costly. Identified the Aha moment (live data preview, not dummy data), two key friction points, and 3 prioritized fixes: intent-matched templates, visible step counter from day 1, and an Advanced Mode toggle for power users.",
    insight: "The blank canvas after the intent question and the hidden step cap aren't bugs — they're gaps in product thinking. Both are fixable in a sprint.",
    github: null,
    live: "/relay_onboarding.pdf",
  },
  {
    id: "voice-prd",
    title: "Recoverable Voice Input for ChatGPT",
    tags: ["PM Research", "User Research", "PRD", "KPI Framework"],
    problem:
      "Voice input on ChatGPT underused for high-stakes tasks because users perceive speech as irreversible — not unfamiliar.",
    solution:
      "Primary research: 45 survey respondents + 6 interviews. Key finding: 80% use voice on WhatsApp/Google Assistant, but 72% prefer typing for interview/learning. Root cause: Lack of recoverability. Solution — 'Voice as Draft': Spoken input stored as temporary draft state with 2–3 second idle delay for edits before AI responds. Zero ASR or LLM changes needed.",
    insight:
      "Voice won't scale through better speech — it will scale through better control.",
    github: null,
    live: null,
  },
  {
    id: "synciq-tool",
    title: "PowerScale SyncIQ Failover Precheck Tool",
    tags: ["Python", "OneFS CLI", "Bash", "Dell Internal"],
    problem:
      "Engineers had no standardized pre-flight check before high-stakes SyncIQ Failover/Failback — manual checklists were incomplete and caused failed operations.",
    solution:
      "Built 7-section automated health check: cluster role detection, /ifs capacity, /var + /var/crash check, SyncIQ job failure reports, per-policy checks, mirror policy association, IOCA-style summary table. Fixed 10 production bugs post-v1.",
    insight: "Building guardrails is a product decision, not an engineering one.",
    github: null,
    live: null,
  },
  {
    id: "toffee-coffee",
    title: "Toffee Coffee Roasters — Product Audit",
    tags: ["Consumer Product", "User Empathy", "D2C", "India Market"],
    problem:
      "As a loyal customer, identified 2 product gaps: (1) No instant order confirmation creating post-purchase anxiety. (2) Website discoverability issues — no search bar, overwhelming hero banner.",
    solution:
      "Applied Hick's Law and Miller's Law to website feedback. Proposed: Instant post-payment confirmation (email + WhatsApp), persistent search icon in header, secondary CTA 'Shop Bestsellers' on hero section.",
    insight:
      "Used customer support background to identify WhatsApp CX gap — India-specific insight most PMs miss.",
    github: null,
    live: null,
  },
];

export const skills = {
  "Product Skills": [
    "Product Strategy", "Roadmap Planning", "PRD Writing", "KPI/OKR Definition",
    "User Research", "Feature Prioritization", "A/B Testing", "Stakeholder Management",
  ],
  "Technical": [
    "Python", "SQL", "Bash", "Linux", "REST APIs", "Docker", "FastAPI", "Streamlit", "ChromaDB",
  ],
  "AI / ML": [
    "RAG Systems", "LLM Prompting", "Vector Embeddings", "Guardrail Design", "Eval Frameworks",
  ],
  "Infrastructure": [
    "Dell EMC PowerScale", "NAS/SAN", "Distributed Storage", "SyncIQ", "Cluster Operations",
  ],
  "Tools": [
    "Git", "MySQL", "Docker", "Vercel", "Tailscale", "Cloudflare",
  ],
};

export const openSource = [
  {
    name: "RAG_chat_bot",
    description: "Production RAG chatbot for mutual fund FAQs — async scraping, semantic chunking, ChromaDB, Gemini 2.5 Flash, dual-layer guardrails blocking advisory questions.",
    tags: ["Python", "ChromaDB", "FastAPI", "Streamlit", "Gemini"],
    stars: null,
    href: "https://github.com/Sid-131/RAG_chat_bot",
    live: "https://rag-chat-bot-rouge.vercel.app",
    highlight: "Deployed to Vercel · 13-phase RAG pipeline",
  },
  {
    name: "SyncIQ Healthcheck Script",
    description: "7-section automated pre-failover diagnostic tool for Dell PowerScale clusters. Reduced engineer checklist time and eliminated manual blind spots in production.",
    tags: ["Python", "Bash", "OneFS CLI", "Dell Internal"],
    stars: null,
    href: null,
    live: null,
    highlight: "Internal tool · Fixed 10 production bugs post-v1",
  },
  {
    name: "SSL Certificate Automation",
    description: "Automated SSL cert renewal workflow for enterprise support environments — saved 15–30 minutes per incident, est. 200+ engineer-hours/year across the team.",
    tags: ["Python", "Bash", "Linux"],
    stars: null,
    href: null,
    live: null,
    highlight: "200+ engineer-hours saved/year",
  },
];

export const navItems = [
  { label: "Game", href: "#game" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Open Source", href: "#opensource" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
