"use client"

import {
  Trophy,
  Bot,
  GraduationCap,
  FileText,
  Users,
  Landmark,
  Zap,
  ArrowUpRight,
} from "lucide-react"
import { PROFILE, LINKS, NOW, BADGES } from "@/lib/content"

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
        <span className="dot" /> founders, inc · f26 · san francisco
      </div>

      <h1 className="hero-h1">
        I build agents
        <br />
        that <span className="accent">ship</span>.
      </h1>

      <p className="hero-lede">
        I&apos;m 20, building{" "}
        <a href={LINKS.assemblr} target="_blank" rel="noreferrer">
          Assemblr
        </a>{" "}
        at Founders, Inc. Before this: agentic NLP at ASAPP, a neural-net tool
        500+ students learned on, and LLM research headed to NUTRITION 2026.
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

      <div className="now">
        <div className="grow">
          <span className="tag">
            <span className="dot" /> building now
          </span>
          <div className="now-what">{NOW.what}</div>
          <p className="now-detail">{NOW.detail}</p>
          <p className="now-ctx">{NOW.context}</p>
        </div>
        <a className="btn" href={NOW.url} target="_blank" rel="noreferrer">
          assemblr.net <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="logos">
        founders, inc · asapp · mit · sig · umass · hf0
      </div>
    </div>
  )
}
