export const profile = {
  name: "Siddhant Singh",
  tagline: "Product-minded engineer with 3.5 years of enterprise-scale experience at Dell Technologies, a deployed RAG chatbot, a published PM research project, and a deep belief that if you can't clearly diagnose a problem — you can't scale the solution.",
  shortTagline: "Aspiring Product Manager | PM Fellow @ NextLeap | 3+ Years Enterprise Tech @ Dell",
  email: "siddhant.singh131@outlook.com",
  phone: "+91 79052 49718",
  linkedin: "https://linkedin.com/in/siddhant-singh-3b58681a7",
  github: "https://github.com/Sid-131",
  location: "Lucknow / Bengaluru, India",
  targetRole: "Associate Product Manager / Product Manager",
  interviewQuote:
    "Support tickets are an unstructured eval dataset. Escalations are failed product expectations. I spent 3.5 years building intuition for what product failure looks like at scale — now I want to get upstream and prevent it.",
};

export const about = {
  story: [
    "I spent 3.5 years at Dell Technologies solving 1,000+ enterprise production incidents — S1/S2 escalations where systems were down and customers needed answers fast. That experience taught me something most PMs never learn firsthand: what product failure looks like at scale.",
    "Now I'm channeling that into product management. As a PM Fellow at NextLeap, I've shipped user research, written PRDs, built KPI frameworks, and deployed a production RAG chatbot. I bring the rare combination of deep technical depth, real customer empathy, and systematic product thinking.",
  ],
  strengths: [
    "Working RAG system with guardrails and evaluation framework",
    "3+ years of enterprise customer empathy at scale",
    "Primary user research experience (45 surveys + 6 interviews)",
    "Systematic product thinking — KPI trees, non-goals, phase-based architecture",
    "India-specific market insight — voice UX, WhatsApp CX, D2C brands",
    "Built internal tools that got used at Dell — real shipping experience",
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
  ],
  education: "B.Tech Civil Engineering, Amity University Lucknow (2017–2021)",
  fellowship: "NextLeap Product Management Fellowship (Jan 2026 – Present)",
};

export const projects = [
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

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
