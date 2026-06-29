// ─────────────────────────────────────────────────────────────────────────
//  content.ts — single source of truth for the whole site.
//  Edit anything here; the editor panes, terminal, and sidebar all read from it.
// ─────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Aryaman Goenka",
  handle: "aryamangoenka",
  role: "Founder · Agentic AI",
  tagline: "I build things people actually use.",
  location: "San Francisco, CA",
  school: "CS @ UMass Amherst '28",
  age: 20,
  email: "aryamansgoenka@gmail.com",
  blurb:
    "20-year-old CS student shipping agentic AI pipelines, on-device ML, and full-stack systems that hold up under real users — not just demos.",
}

export const LINKS = {
  github: "https://github.com/aryamangoenka",
  linkedin: "https://www.linkedin.com/in/aryaman-goenka",
  x: "https://x.com/goenka_aryaman",
  assemblr: "https://assemblr.net",
  email: "mailto:aryamansgoenka@gmail.com",
}

// The "now" — what's printed first, what the status bar shows.
export const NOW = {
  label: "Building",
  what: "Assemblr",
  detail: "Workflow intelligence for engineering teams.",
  context: "Founders, Inc. · Canopy F26 · San Francisco",
  url: "https://assemblr.net",
}

// The proof. The first thing a visitor reads. Each one is independently verifiable.
export const BADGES: { icon: string; stat: string; label: string }[] = [
  { icon: "trophy", stat: "1st / 1,000+", label: "HF0 Voice & Video AI Hackathon — won in 12h" },
  { icon: "bot", stat: "10K+ @ 95–100%", label: "Agentic NLP at ASAPP, presented to ML leadership" },
  { icon: "graduation-cap", stat: "MIT Fellow", label: "Break Through Tech AI — competitive, fully funded" },
  { icon: "file-text", stat: "Published", label: "Co-authored LLM-reliability research · NUTRITION 2026" },
  { icon: "users", stat: "500+ taught", label: "NeuroBlock — neural nets for high schoolers" },
  { icon: "landmark", stat: "President", label: "CICSoft — largest tech org at UMass" },
]

export type Experience = {
  org: string
  role: string
  period: string
  location?: string
  notes: string[]
  tags: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    org: "Founders, Inc.",
    role: "Founder — Canopy",
    period: "Mar 2026 — Present",
    location: "San Francisco, CA",
    notes: [
      "Selected for Canopy, Founders, Inc.'s founder program, to build Assemblr.",
      "Invited by Hubert Thieblot to build on-site at the Founders, Inc. campus in SF.",
    ],
    tags: ["Founder", "0→1", "San Francisco"],
  },
  {
    org: "Assemblr",
    role: "Co-Founder",
    period: "Dec 2025 — Present",
    notes: [
      "Workflow intelligence for engineering teams — agents mined from how teams actually work.",
      "Accepted to YC's Startup School; ranked top 10% (SR).",
    ],
    tags: ["Agents", "Product", "YC"],
  },
  {
    org: "ASAPP",
    role: "AI Engineering Fellow",
    period: "Sep 2025 — Dec 2025",
    location: "United States",
    notes: [
      "Built Extractify, an agentic NLP system (LangGraph) extracting structured data from unstructured customer conversations — 10K+ multi-turn dialogues at 95–100% accuracy on key fields.",
      "Hybrid Regex + LLM-agent pipeline on Gemini 2.5 Flash with structured prompting for entities, intent, sentiment, and summaries.",
      "EDA, clustering (PCA, KMeans), and classification (KNN, F1 > 0.85) to benchmark extraction quality; results presented to ASAPP ML leadership.",
    ],
    tags: ["LangGraph", "Gemini 2.5", "Python", "ML"],
  },
  {
    org: "MIT — Break Through Tech AI",
    role: "Fellow",
    period: "Apr 2025 — May 2026",
    notes: [
      "Selected for a competitive, fully-funded AI/ML program: hands-on training, real industry projects, and mentorship.",
    ],
    tags: ["Fellowship", "AI/ML"],
  },
  {
    org: "Susquehanna International Group",
    role: "Discovery Day Fellow",
    period: "Dec 2025",
    notes: [
      "Selected for SIG's Discovery Day — quantitative trading, probability-driven decision making, and engineering problem solving in financial markets.",
    ],
    tags: ["Quant", "Fellowship"],
  },
  {
    org: "UMass — Advanced Learning Technologies Lab",
    role: "Undergraduate Intern",
    period: "Feb 2025 — Jan 2026",
    location: "United States",
    notes: [
      "Built a multi-agent pipeline orchestrating Hugging Face model APIs to generate parallelized insights from K–12 wearable learning data.",
      "Automated CSV-to-prompt generation for behavioral pattern tracking — cut parsing time 60%, accelerating research on metacognition, motivation, and embodied learning.",
    ],
    tags: ["Multi-agent", "Hugging Face", "Research"],
  },
  {
    org: "UMass — ML for Education Lab",
    role: "Undergraduate Research Assistant",
    period: "Sep 2024 — Apr 2025",
    notes: [
      "Evaluated leading LLMs (GPT-4.5, Gemini 2.5, Claude 3.7, DeepSeek-R1) against WCRF/AICR clinical guidelines for accuracy, consistency, and bias in AI dietary guidance.",
      "Co-authored a research abstract accepted to NUTRITION 2026, analyzing how AI guidance diverges from human responses across adolescent, adult, and elderly cohorts.",
    ],
    tags: ["LLM Eval", "Research", "Published"],
  },
  {
    org: "Paktolus",
    role: "Software Engineer Intern",
    period: "May 2025 — Jul 2025",
    location: "Florida, United States",
    notes: [
      "Architected a scalable full-stack User Management System: Django REST + FastAPI + Next.js 15 (TypeScript) with role-based access for admin, manager, and general users.",
      "JWT auth, account-lockout (django-axes), file uploads, responsive UI (shadcn/ui + Tailwind).",
      "Deployed Django + FastAPI microservices with unit/integration tests (Pytest, Uvicorn) — test coverage up 80%+.",
    ],
    tags: ["Django REST", "FastAPI", "Next.js", "TypeScript"],
  },
  {
    org: "telSpiel",
    role: "Software Developer",
    period: "Dec 2024 — Jan 2025",
    location: "Noida, India",
    notes: [
      "Built and deployed an interactive React.js dashboard — cut user navigation time 40% for 2,500–3,000 daily users.",
      "Designed a DLT management tab automating sender/template ID tracking, reducing compliance errors 35%.",
      "Optimized UI for scale — +45% operational efficiency across a system supporting 150M daily interactions.",
    ],
    tags: ["React", "Scale", "Dashboards"],
  },
  {
    org: "CICSoft @ UMass",
    role: "President",
    period: "Feb 2025 — Feb 2026",
    location: "United States",
    notes: [
      "Ran the largest tech organization at UMass — helped peers land roles at exceptional places.",
      "Spent most of my time helping students get into rooms they didn't think they belonged in.",
    ],
    tags: ["Leadership", "Community"],
  },
]

export type Project = {
  slug: string
  title: string
  year: string
  one_liner: string
  stack: string[]
  link?: string
  body: string // markdown
}

export const PROJECTS: Project[] = [
  {
    slug: "coldbrew",
    title: "ColdBrew",
    year: "2026",
    one_liner: "Gave warehouse cameras a brain. Built in 12 hours. Won.",
    stack: ["NomadicML Vision", "Real-time CV", "Python", "12-hour build"],
    body: `# ColdBrew — 🥇 1st place, HF0 Voice & Video AI Hackathon

**1,000+ applied. 30 builders selected. I almost didn't go because I couldn't
afford the trip. I went anyway.**

Thursday 9:08 PM — I get the acceptance email. Friday morning — I book a
cross-country flight from Massachusetts. Friday night — I land in San Francisco.
Saturday — my team wins first place.

## What we built

ColdBrew gives warehouse cameras a brain: real-time detection of safety
violations, equipment failures, and shipment anomalies using NomadicML's vision
API. We demoed it to top VCs, founders, and AI engineers in one of the most
exclusive rooms in the Bay Area — the Archbishop's Mansion.

- **12 hours.** Unlimited Anthropic + OpenAI credits. A room full of elite
  engineers building with agent swarms and multimodal pipelines.
- **A team I met that morning.** We shipped a winning product by evening.
- **First place** — out of 30 hand-picked builders from 1,000+ applicants.

> If you're a student who thinks you can't afford to be in these rooms — find a
> way. Book the flight. Figure it out on the way there. The worst thing you can
> do is not show up.

Hosted by HF0, Knowtex, and NomadicML.`,
  },
  {
    slug: "extractify",
    title: "Extractify",
    year: "2025",
    one_liner: "Agentic NLP turning messy customer chats into clean structured data.",
    stack: ["LangGraph", "Gemini 2.5 Flash", "Python", "PCA / KMeans / KNN"],
    body: `# Extractify — agentic NLP at ASAPP

Built during my AI Engineering Fellowship at ASAPP. Extractify pulls clean,
structured data out of messy, unstructured customer conversations.

## The numbers

- **10K+ multi-turn dialogues** processed at **95–100% accuracy** on key fields.
- Hybrid pipeline: **Regex + LLM agents** (LangGraph) on **Gemini 2.5 Flash**.
- Structured prompting (LLM hints) to extract entities, intent, sentiment, and
  summaries with high precision.

## Proving it worked

I didn't just ship it — I measured it. EDA, clustering (**PCA, KMeans**), and
classification (**KNN, F1 > 0.85**) to benchmark extraction quality and guide
system design.

**Results presented to ASAPP's ML leadership.**`,
  },
  {
    slug: "neuroblock",
    title: "NeuroBlock",
    year: "2024 — 2025",
    one_liner: "Drag-and-drop neural networks. 500+ high schoolers learned ML on it.",
    stack: ["React", "Flask", "TensorFlow", "WebSockets"],
    body: `# NeuroBlock — neural networks you can drag and drop

The work I'm proudest of. NeuroBlock lets first-time learners **visually compose,
train, and export** classification, regression, and CNN models right in the
browser — no code, no setup, no intimidation.

- **500+ high school students** have used it to understand how neural networks
  *actually* work.
- Real training loops streamed live over WebSockets so learners watch their model
  improve epoch by epoch.
- Export trained models and keep building.

Most ML education starts with math that scares people off. NeuroBlock starts with
a block you can drag — and earns the math later.`,
  },
  {
    slug: "assemblr",
    title: "Assemblr",
    year: "2025 — Present",
    one_liner: "Workflow intelligence for engineering teams. What I'm building now.",
    stack: ["Agents", "Full-stack", "Founders, Inc.", "YC SR top 10%"],
    link: "https://assemblr.net",
    body: `# Assemblr — what I'm building now

Workflow intelligence for engineering teams: **agents mined from how your teams
actually work.** We're early, building on-site at Founders, Inc. in San Francisco
through the Canopy founder program.

- Accepted to **YC's Startup School** — ranked **top 10%**.
- Invited by **Hubert Thieblot** to build from the Founders, Inc. campus.

→ [assemblr.net](https://assemblr.net)`,
  },
  {
    slug: "research",
    title: "AI vs. Humans — Dietary Guidance",
    year: "2025 — 2026",
    one_liner: "Benchmarking frontier LLMs against clinical cancer-prevention guidelines.",
    stack: ["LLM Eval", "Research", "Python"],
    body: `# How accurately does AI give dietary advice?

Research at the UMass ML for Education Lab, in collaboration with the UMass
Nutrition Department — using colorectal cancer prevention as a case study.

- Benchmarked **GPT-4.5, Gemini 2.5, Claude 3.7, and DeepSeek-R1** against the
  evidence-based **WCRF/AICR** dietary guidelines.
- Compared model outputs to human responses across **adolescent, adult, and
  elderly** cohorts — measuring accuracy, consistency, and bias.
- **Accepted to NUTRITION 2026**, the American Society for Nutrition's flagship
  annual meeting.

Most of my work is agents and developer tooling, so this was a fun stretch into
cross-domain reliability — and the techniques carried over well.`,
  },
]

export type StackGroup = { label: string; items: string[] }

export const STACK: StackGroup[] = [
  { label: "agentic_ai", items: ["LangGraph", "Multi-agent orchestration", "Tool use", "Structured prompting", "RAG"] },
  { label: "llms", items: ["GPT-4.5", "Gemini 2.5", "Claude 3.7", "DeepSeek-R1", "Evals"] },
  { label: "ml", items: ["TensorFlow", "scikit-learn", "PCA", "KMeans", "KNN", "EDA"] },
  { label: "frontend", items: ["React", "Next.js 15", "TypeScript", "Tailwind", "shadcn/ui"] },
  { label: "backend", items: ["Python", "Django REST", "FastAPI", "Node", "JWT / auth", "Pytest"] },
  { label: "data_infra", items: ["Pandas", "NumPy", "Hugging Face", "WebSockets", "Git"] },
]

export const AWARDS: { award: string; detail: string; year: string }[] = [
  { award: "1st Place — HF0 Voice & Video AI Hackathon", detail: "1 of 30 from 1,000+ applicants · Knowtex, NomadicML", year: "2026" },
  { award: "Founder — Founders, Inc. Canopy (F26)", detail: "Invited to build on-site in San Francisco", year: "2026" },
  { award: "MIT Break Through Tech AI Fellow", detail: "Competitive, fully-funded AI/ML program", year: "2025" },
  { award: "SIG Discovery Day Fellow", detail: "Susquehanna International Group", year: "2025" },
  { award: "Research accepted — NUTRITION 2026", detail: "American Society for Nutrition annual meeting", year: "2026" },
  { award: "1st Place — UMass Spring Classic (U1200)", detail: "Chess", year: "2025" },
  { award: "School Topper", detail: "Academic distinction", year: "2023" },
]

// The "build over talk" credo — used in about.ts.
export const CREDO = [
  "Build over talk.",
  "Ship the rough v1.",
  "Learn from real users.",
  "Do the work in public.",
  "Pull people up with you.",
]
