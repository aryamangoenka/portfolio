// ─────────────────────────────────────────────────────────────────────────
//  content.ts — everything on the site reads from here. Edit this, not the UI.
// ─────────────────────────────────────────────────────────────────────────

export const PROFILE = {
  name: "Aryaman Goenka",
  handle: "aryamangoenka",
  role: "builder · agentic ai",
  location: "San Francisco",
  age: 20,
  email: "aryamansgoenka@gmail.com",
  tagline: "I love pushing AI to the frontier.",
}

export const LINKS = {
  github: "https://github.com/aryamangoenka",
  linkedin: "https://www.linkedin.com/in/aryaman-goenka",
  x: "https://x.com/goenka_aryaman",
  email: "mailto:aryamansgoenka@gmail.com",
}

// The proof. Short, true, each one stands on its own.
export const BADGES: { icon: string; stat: string; label: string }[] = [
  { icon: "trophy", stat: "1st place", label: "HF0 AI hackathon. 1 of 30 picked from 1,000+, built in 12h" },
  { icon: "bot", stat: "10K @ 95-100%", label: "agentic NLP shipped at ASAPP" },
  { icon: "graduation-cap", stat: "MIT fellow", label: "Break Through Tech AI" },
  { icon: "file-text", stat: "published", label: "LLM reliability research, ASN 2026" },
  { icon: "users", stat: "500+ taught", label: "NeuroBlock, neural nets for high schoolers" },
  { icon: "landmark", stat: "president", label: "CICSoft, biggest tech org on campus" },
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
    period: "Mar - Jun 2026",
    location: "San Francisco",
    notes: [
      "Selected for Canopy, the Founders, Inc. founder program.",
      "Hubert Thieblot brought me on to build on-site in SF.",
    ],
    tags: ["Canopy", "0→1", "SF"],
  },
  {
    org: "Assemblr",
    role: "Co-Founder",
    period: "Dec 2025 - 2026",
    notes: [
      "Workflow intelligence for engineering teams. Agents built from how teams actually work.",
      "Ranked top 10% at YC. Accepted into Speedrun.",
    ],
    tags: ["agents", "product", "Speedrun"],
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
    org: "Advanced Learning Tech Lab",
    role: "Undergraduate Intern",
    period: "Feb 2025 - Jan 2026",
    notes: [
      "Built a multi-agent pipeline over Hugging Face APIs for K-12 wearable learning data.",
      "Automated CSV-to-prompt generation. Cut parsing time 60%.",
    ],
    tags: ["multi-agent", "Hugging Face", "research"],
  },
  {
    org: "ML for Education Lab",
    role: "Research Assistant",
    period: "Sep 2024 - Apr 2025",
    notes: [
      "Tested GPT-4.5, Gemini 2.5, Claude 3.7, and DeepSeek-R1 against clinical dietary guidelines for accuracy and bias.",
      "Co-authored a paper accepted to ASN 2026.",
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
    org: "CICSoft",
    role: "President",
    period: "Feb 2025 - Feb 2026",
    notes: [
      "Ran the biggest tech org on campus.",
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

🥇 1st place, HF0 Voice & Video AI Hackathon. 1 of 30 builders, picked from
1,000+ applicants. I almost skipped it because I couldn't afford the trip. I
went anyway.

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
]

export type Interest = { area: string; note: string }

export const INTERESTS: Interest[] = [
  { area: "LLM evals & reliability", note: "what models actually get right, measured" },
  { area: "agentic systems", note: "multi-agent pipelines that do real work" },
  { area: "frontier models & reasoning", note: "the edge, before it becomes a trend" },
  { area: "on-device / edge ML", note: "intelligence where the compute isn't" },
  { area: "applied AI research", note: "papers that turn into products" },
]

// about.ts — what I'm actually about. No filler.
export const STANCE = [
  "I don't chase trends. I'd rather be early to the thing that becomes one.",
  "I love the engineering. I love the customer more. ❤",
  "I put my whole heart into everything I build.",
  "I'd rather take a real swing at a huge problem than ship a 24-hour gimmick.",
]
