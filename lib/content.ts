// All of the site's words live here.

export type Link = { label: string; href: string }

export type ProjectId = "ember" | "assemblr" | "sentient" | "traceassert" | "coldbrew" | "neuroblock"

export type Project = {
  id: ProjectId
  name: string
  meta: string
  links?: Link[]
  paragraphs: string[]
  proof?: string
  caption: string
  list: { what: string; result: string; color: string; onColor?: string }
}

export const EMAIL = "aryamansgoenka@gmail.com"
export const GITHUB = "https://github.com/aryamangoenka"
export const LINKEDIN = "https://www.linkedin.com/in/aryaman-goenka/"

export const HEADLINE = {
  plain: "I build AI that does real work, and ",
  accent: "tools that check what it really did.",
}

export const INTRO =
  "I’m Aryaman Goenka, a computer science student at UMass Amherst. I co-founded a company called Assemblr, built in San Francisco through the Founders, Inc. Canopy program, and spent this summer on Sentient OS from YC’s F26 batch. Every project below has something you can play with."

export const PROJECTS: Project[] = [
  {
    id: "ember",
    name: "Ember",
    meta: "Best Voice Agent (Photon), HackHarvard 2026",
    links: [{ label: "GitHub", href: "https://github.com/soham-k-sinha/Ember" }],
    paragraphs: [
      "A flood response agent my team of four built. I wrote the simulator and the planner. It replans in under a second, and in simulation it reached 78 people against a baseline’s 58.",
      "The LLM doesn’t do the planning. A guard blocks any reply that mentions a number or a street the planner never computed.",
    ],
    caption:
      "Click streets to flood them and watch the van reroute. This is a tiny version for this page, not Ember’s real planner.",
    list: { what: "Flood response agent", result: "Best Voice Agent, HackHarvard", color: "#2f80ff" },
  },
  {
    id: "assemblr",
    name: "Assemblr",
    meta: "Co-Founder · Dec 2025 to 2026",
    links: [{ label: "assemblr.net", href: "https://assemblr.net" }],
    paragraphs: [
      "This was the company I co-founded. Every team has small rituals they repeat each week across GitHub, Slack and Linear, and nobody automates them because each one feels too minor to bother with. Assemblr spotted those patterns and turned them into one-click agents that did the work across tools.",
      "Its Public Mirror showed how teams at 35 open-source orgs like OpenAI, Microsoft and Anthropic actually worked, drawn from 155 weeks of their public GitHub activity.",
    ],
    proof: "Top 10% at YC. Top 10 at Speedrun.",
    caption:
      "Find the habit hiding in four weeks of activity, then run it as one agent. This is an illustration with made-up events, not the real product.",
    list: {
      what: "Company I co-founded, agents from how teams work",
      result: "Top 10% at YC, top 10 at Speedrun",
      color: "#ff5a2b",
    },
  },
  {
    id: "sentient",
    name: "Sentient OS",
    meta: "Core Contributor, YC F26 · Jun to Jul 2026 · San Francisco",
    paragraphs: [
      "An on-device AI app with more than 10,000 users. I taught it to read your iMessages and Notes, and I rewrote how it decides which files are worth looking at. One Downloads folder went from 21,000 files to 324.",
      "I also moved its coding agent from Claude Code to Codex CLI, and checked the swap on real output before trusting it.",
    ],
    caption: "Scroll to watch it prune. The dots are an illustration, and the two numbers are real.",
    list: { what: "On-device AI app, YC F26", result: "10,000+ users", color: "#1616e8", onColor: "#fff" },
  },
  {
    id: "traceassert",
    name: "traceassert",
    meta: "Sep 2026",
    links: [{ label: "GitHub", href: "https://github.com/aryamangoenka/traceassert" }],
    paragraphs: [
      "You ask a coding agent to do something and it tells you what it did. traceassert reads the session trace, checks each claim, and stamps it with a receipt.",
      "Across 20 runs it came back with 72 claims supported, 45 unverified and 0 contradicted. It only asks a model about the fuzzy claims, which cost $0.0007 in total.",
    ],
    caption: "Real output from run 1 of my experiment, trimmed. The lies are made up for this page.",
    list: { what: "Checks what coding agents claim", result: "117 claims checked, 20 runs", color: "#ffb5db" },
  },
  {
    id: "coldbrew",
    name: "ColdBrew",
    meta: "1st place, HF0 Voice & Video AI hackathon · Apr 2026",
    paragraphs: [
      "Thirty builders were picked from more than 1,000 applicants. My team met that morning and we had twelve hours.",
      "ColdBrew gives warehouse cameras a brain. It spots safety violations, equipment failures and shipment anomalies live, using NomadicML’s vision API.",
    ],
    caption:
      "Cause some trouble: drag the worker, drag a pallet, or click the forklift. This is a simulated camera, not the real model.",
    list: { what: "Real-time warehouse vision", result: "1st place, HF0 (30 of 1,000+)", color: "#ffd400" },
  },
  {
    id: "neuroblock",
    name: "NeuroBlock",
    meta: "",
    links: [
      { label: "Live", href: "https://dnd-neural-network.vercel.app" },
      { label: "GitHub", href: "https://github.com/aryamangoenka/NeuroBlock" },
    ],
    paragraphs: [
      "Most machine learning lessons open with math that scares people off, so NeuroBlock opens with a block you drag.",
      "More than 500 high schoolers have used it to build and train neural networks in the browser, including students in UMass’s Turing summer program.",
    ],
    caption: "This tiny network really is training in your browser. Click a block in the network to remove it.",
    list: { what: "Neural nets you build by dragging", result: "500+ high schoolers", color: "#c6f135" },
  },
]

export const EXPERIENCE = [
  { org: "CICSoft", role: "President, since Jan 2026", text: "I run the largest tech organization at UMass Amherst." },
  {
    org: "Sentient OS (YC F26)",
    role: "Core Contributor, Jun to Jul 2026",
    text: "Worked in San Francisco on an on-device AI app with more than 10,000 users.",
  },
  {
    org: "Founders, Inc.",
    role: "Canopy program, Mar to Jun 2026",
    text: "I was selected for Canopy, the Founders, Inc. founder program, and built on-site in San Francisco.",
  },
  {
    org: "Assemblr",
    role: "Co-Founder, Dec 2025 to 2026",
    text: "I co-founded a company that turned the workflows teams repeat into one-click agents.",
  },
  {
    org: "ASAPP",
    role: "AI Studio Fellow, Aug to Dec 2025",
    text: "I built Extractify, an agent that pulled the fields that mattered out of more than 10,000 real customer service conversations, at 95 to 97 percent accuracy.",
  },
  {
    org: "Paktolus",
    role: "Software Engineering Intern, May to Jul 2025",
    text: "I built a FastAPI and Next.js backend with three-tier access control and activity logging, which cut onboarding time by 50 percent.",
  },
  {
    org: "Machine Learning for Education Lab",
    role: "Research Assistant, Sep 2024 to Apr 2025",
    text: "I benchmarked four AI models on diet guidelines, and all of them overstated the risk of red meat and heme iron. I co-authored an abstract for ASN 2026.",
  },
  {
    org: "Programs",
    role: "MIT and Y Combinator",
    text: "I’m an MIT Break Through Tech AI Fellow, and I was at Y Combinator’s Startup School in 2026.",
  },
]

export const FLIGHT = [
  "Thursday at 9:08 PM I got an email saying I’d been accepted to a hackathon in San Francisco. I almost didn’t go because I couldn’t afford the trip.",
  "Friday morning I booked the flight anyway. Saturday my team won.",
  "If you’re a student who thinks you can’t afford to be in these rooms, book the flight and figure it out on the way.",
]
