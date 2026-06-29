// ─────────────────────────────────────────────────────────────────────────
//  content.ts — everything on the site reads from here. Edit this, not the UI.
// ─────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Aryaman Goenka",
  handle: "aryamangoenka",
  role: "founder · agentic ai",
  location: "San Francisco, CA",
  school: "CS @ UMass Amherst '28",
  age: 20,
  email: "aryamansgoenka@gmail.com",
  blurb: "I build things people actually use.",
}

export const LINKS = {
  github: "https://github.com/aryamangoenka",
  linkedin: "https://www.linkedin.com/in/aryaman-goenka",
  x: "https://x.com/goenka_aryaman",
  assemblr: "https://assemblr.net",
  email: "mailto:aryamansgoenka@gmail.com",
}

export const NOW = {
  what: "Assemblr",
  detail: "Workflow intelligence for engineering teams.",
  context: "Founders, Inc. · Canopy F26 · San Francisco",
  url: "https://assemblr.net",
}

// The proof. Short, true, each one stands on its own.
export const BADGES: { icon: string; stat: string; label: string }[] = [
  { icon: "trophy", stat: "1st / 1,000+", label: "won the HF0 AI hackathon in 12 hours" },
  { icon: "bot", stat: "10K @ 95-100%", label: "agentic NLP shipped at ASAPP" },
  { icon: "graduation-cap", stat: "MIT fellow", label: "Break Through Tech AI" },
  { icon: "file-text", stat: "published", label: "LLM research, NUTRITION 2026" },
  { icon: "users", stat: "500+ taught", label: "NeuroBlock, neural nets for high schoolers" },
  { icon: "landmark", stat: "president", label: "CICSoft, biggest tech org at UMass" },
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
    role: "Founder, Canopy",
    period: "Mar 2026 - now",
    location: "San Francisco",
    notes: [
      "Got into Canopy, the Founders, Inc. founder program, to build Assemblr.",
      "Hubert Thieblot brought me on to build on-site in SF.",
    ],
    tags: ["founder", "0→1", "SF"],
  },
  {
    org: "Assemblr",
    role: "Co-Founder",
    period: "Dec 2025 - now",
    notes: [
      "Workflow intelligence for engineering teams. Agents built from how teams actually work.",
      "Top 10% at YC Startup School.",
    ],
    tags: ["agents", "product", "YC"],
  },
  {
    org: "ASAPP",
    role: "AI Engineering Fellow",
    period: "Sep - Dec 2025",
    notes: [
      "Built Extractify: an agentic NLP system on LangGraph + Gemini 2.5 that pulls clean structured data from messy customer chats. 10K+ conversations at 95-100% accuracy.",
      "Hybrid regex + LLM pipeline for entities, intent, sentiment, summaries.",
      "Benchmarked it with PCA, KMeans, KNN (F1 > 0.85). Presented to ML leadership.",
    ],
    tags: ["LangGraph", "Gemini 2.5", "Python", "ML"],
  },
  {
    org: "MIT, Break Through Tech AI",
    role: "Fellow",
    period: "Apr 2025 - May 2026",
    notes: ["Competitive, fully-funded AI/ML fellowship. Real industry projects and mentorship."],
    tags: ["fellowship", "AI/ML"],
  },
  {
    org: "Susquehanna (SIG)",
    role: "Discovery Day Fellow",
    period: "Dec 2025",
    notes: ["Quant trading, probability, and engineering problems in financial markets."],
    tags: ["quant", "fellowship"],
  },
  {
    org: "UMass, Advanced Learning Tech Lab",
    role: "Undergraduate Intern",
    period: "Feb 2025 - Jan 2026",
    notes: [
      "Built a multi-agent pipeline over Hugging Face APIs for K-12 wearable learning data.",
      "Automated CSV-to-prompt generation. Cut parsing time 60%.",
    ],
    tags: ["multi-agent", "Hugging Face", "research"],
  },
  {
    org: "UMass, ML for Education Lab",
    role: "Research Assistant",
    period: "Sep 2024 - Apr 2025",
    notes: [
      "Tested GPT-4.5, Gemini 2.5, Claude 3.7, and DeepSeek-R1 against clinical dietary guidelines for accuracy and bias.",
      "Co-authored a paper accepted to NUTRITION 2026.",
    ],
    tags: ["LLM eval", "research", "published"],
  },
  {
    org: "Paktolus",
    role: "Software Engineer Intern",
    period: "May - Jul 2025",
    location: "Florida",
    notes: [
      "Built a full-stack user management system: Django REST + FastAPI + Next.js 15, with role-based access.",
      "JWT auth, account lockout, file uploads. Test coverage up 80%+.",
    ],
    tags: ["Django REST", "FastAPI", "Next.js", "TypeScript"],
  },
  {
    org: "telSpiel",
    role: "Software Developer",
    period: "Dec 2024 - Jan 2025",
    location: "Noida, India",
    notes: [
      "Built a React dashboard. Cut navigation time 40% for ~3,000 daily users.",
      "Automated DLT tracking, cut compliance errors 35%. On a system handling 150M daily interactions.",
    ],
    tags: ["React", "scale", "dashboards"],
  },
  {
    org: "CICSoft @ UMass",
    role: "President",
    period: "Feb 2025 - Feb 2026",
    notes: [
      "Ran the biggest tech org at UMass.",
      "Spent most of it helping people get into rooms they didn't think they belonged in.",
    ],
    tags: ["leadership", "community"],
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
    one_liner: "Real-time vision for warehouse cameras. Built in 12 hours. Won.",
    stack: ["NomadicML Vision", "real-time CV", "Python", "12-hour build"],
    body: `# ColdBrew

🥇 1st place, HF0 Voice & Video AI Hackathon. 30 builders picked from 1,000+.
I almost skipped it because I couldn't afford the trip. I went anyway.

Thursday 9PM I got in. Friday I flew across the country. Saturday my team won.

We built real-time vision for warehouse cameras: it flags safety violations,
equipment failures, and shipment anomalies live, on NomadicML's vision API.
Twelve hours, with people I met that morning. We demoed it to VCs and founders
at the Archbishop's Mansion.

> If you're a student who thinks you can't afford to be in these rooms: book the
> flight, figure it out on the way. The worst thing you can do is not show up.`,
  },
  {
    slug: "extractify",
    title: "Extractify",
    year: "2025",
    one_liner: "Agentic NLP that turns messy customer chats into clean data.",
    stack: ["LangGraph", "Gemini 2.5 Flash", "Python", "PCA / KMeans / KNN"],
    body: `# Extractify

Agentic NLP I built during my fellowship at ASAPP. It turns messy customer
conversations into clean, structured data.

- 10K+ multi-turn chats, 95-100% accuracy on key fields
- Hybrid regex + LLM pipeline on LangGraph and Gemini 2.5 Flash
- Pulls entities, intent, sentiment, and summaries
- Benchmarked it myself: PCA, KMeans, KNN, F1 > 0.85

Presented the results to ASAPP's ML leadership.`,
  },
  {
    slug: "neuroblock",
    title: "NeuroBlock",
    year: "2024 - 2025",
    one_liner: "Drag-and-drop neural networks. 500+ high schoolers learned on it.",
    stack: ["React", "Flask", "TensorFlow", "WebSockets"],
    body: `# NeuroBlock

The thing I'm proudest of. Drag-and-drop neural networks in the browser: build,
train, and export classification, regression, and CNN models with no code.

500+ high schoolers have used it to actually get how neural nets work. Training
runs stream live over WebSockets, so you watch the model learn.

Most ML lessons open with math that scares people off. This one opens with a
block you drag.`,
  },
  {
    slug: "assemblr",
    title: "Assemblr",
    year: "2025 - now",
    one_liner: "Workflow intelligence for engineering teams. What I'm building now.",
    stack: ["agents", "full-stack", "Founders, Inc.", "YC top 10%"],
    link: "https://assemblr.net",
    body: `# Assemblr

What I'm building now. Workflow intelligence for engineering teams: agents built
from how your team actually works.

Early, on-site at Founders, Inc. in SF through the Canopy program. Top 10% at YC
Startup School. Hubert Thieblot brought me on to build it.

→ [assemblr.net](https://assemblr.net)`,
  },
  {
    slug: "research",
    title: "AI vs. humans on dietary advice",
    year: "2025 - 2026",
    one_liner: "Benchmarking frontier LLMs against clinical guidelines.",
    stack: ["LLM eval", "research", "Python"],
    body: `# AI vs. humans on dietary advice

Research at the UMass ML for Education Lab, using colorectal cancer prevention
as the test case.

- Benchmarked GPT-4.5, Gemini 2.5, Claude 3.7, and DeepSeek-R1 against the
  WCRF/AICR clinical guidelines
- Compared model answers to real human answers across age groups, for accuracy
  and bias
- Accepted to NUTRITION 2026 (American Society for Nutrition)

Most of my work is agents and tooling, so this was a stretch. The methods
carried over.`,
  },
]

export type StackGroup = { label: string; items: string[] }

export const STACK: StackGroup[] = [
  { label: "agents", items: ["LangGraph", "multi-agent", "tool use", "structured prompting", "RAG"] },
  { label: "llms", items: ["GPT-4.5", "Gemini 2.5", "Claude 3.7", "DeepSeek-R1", "evals"] },
  { label: "ml", items: ["TensorFlow", "scikit-learn", "PCA", "KMeans", "KNN"] },
  { label: "frontend", items: ["React", "Next.js 15", "TypeScript", "Tailwind"] },
  { label: "backend", items: ["Python", "Django REST", "FastAPI", "Node", "JWT", "Pytest"] },
  { label: "data", items: ["Pandas", "NumPy", "Hugging Face", "WebSockets", "Git"] },
]

export const AWARDS: { award: string; detail: string; year: string }[] = [
  { award: "1st, HF0 Voice & Video AI Hackathon", detail: "1 of 30 from 1,000+ · Knowtex, NomadicML", year: "2026" },
  { award: "Founder, Founders, Inc. Canopy (F26)", detail: "building Assemblr on-site in SF", year: "2026" },
  { award: "MIT Break Through Tech AI Fellow", detail: "fully-funded AI/ML program", year: "2025" },
  { award: "SIG Discovery Day Fellow", detail: "Susquehanna International Group", year: "2025" },
  { award: "Paper accepted, NUTRITION 2026", detail: "American Society for Nutrition", year: "2026" },
  { award: "1st, UMass Spring Classic (U1200)", detail: "chess", year: "2025" },
  { award: "School topper", detail: "", year: "2023" },
]

export const CREDO = [
  "build over talk",
  "ship the rough v1",
  "learn from real users",
  "do the work in public",
  "pull people up with you",
]

export const ABOUT_BIO =
  "20, CS at UMass ('28). Most of what I know came from shipping, not class. I care less about how something sounds and more about whether it works for the person using it."
