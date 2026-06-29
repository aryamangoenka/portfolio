"use client"

import { Trophy, Bot, GraduationCap, FileText, Users, Landmark, Zap } from "lucide-react"
import { BADGES } from "@/lib/content"

function BadgeIcon({ icon }: { icon: string }) {
  const p = { size: 16, className: "pi" }
  switch (icon) {
    case "trophy": return <Trophy {...p} />
    case "bot": return <Bot {...p} />
    case "graduation-cap": return <GraduationCap {...p} />
    case "file-text": return <FileText {...p} />
    case "users": return <Users {...p} />
    case "landmark": return <Landmark {...p} />
    default: return <Zap {...p} />
  }
}

export default function Hero() {
  return (
    <div className="hero">
      <div className="eyebrow">
        <span className="dot" /> builder · agentic ai · san francisco
      </div>

      <h1 className="hero-h1">
        I love pushing AI
        <br />
        to the <span className="accent">frontier</span>.
      </h1>

      <p className="hero-lede">
        I&apos;m 20, building at the edge of AI: agentic systems, LLM evals, and
        applied research. Before this, I shipped agentic NLP at ASAPP, built a
        neural-net tool 500+ students learned on, and co-authored LLM research
        headed to ASN 2026.
      </p>

      <div className="proof">
        {BADGES.map((b) => (
          <div className="proof-cell" key={b.stat}>
            <BadgeIcon icon={b.icon} />
            <span className="stat">{b.stat}</span>
            <span className="plabel">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
