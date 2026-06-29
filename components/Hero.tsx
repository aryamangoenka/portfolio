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
  const p = { size: 17, className: "pi" }
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
    <div className="hero fade">
      <div className="eyebrow">
        <span className="dot" /> Founders, Inc · F26 · San Francisco
      </div>

      <h1>
        I build agents
        <br />
        that <em>ship</em>.
      </h1>

      <p className="lede">
        I&apos;m {PROFILE.name.split(" ")[0]} — a {PROFILE.age}-year-old founder building{" "}
        <a href={LINKS.assemblr} target="_blank" rel="noreferrer">
          Assemblr
        </a>{" "}
        at Founders, Inc. I ship agentic AI pipelines, on-device ML, and full-stack
        systems that hold up under real users — not just demos. Previously: agentic
        NLP at ASAPP, neural-net education for 500+ students, and AI research headed
        to NUTRITION 2026.
      </p>

      <div className="meta">
        <span>{PROFILE.location}</span>
        <span>{PROFILE.school}</span>
        <span>{PROFILE.role}</span>
      </div>

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
            <span className="dot" /> {NOW.label} now
          </span>
          <h3>{NOW.what}</h3>
          <p>{NOW.detail}</p>
          <p className="ctx">{NOW.context}</p>
        </div>
        <a className="btn" href={NOW.url} target="_blank" rel="noreferrer">
          Visit assemblr.net <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="logos">
        <b>Founders, Inc.</b>
        <span className="sep">✦</span>
        <b>ASAPP</b>
        <span className="sep">✦</span>
        <b>MIT Break Through Tech AI</b>
        <span className="sep">✦</span>
        <b>UMass Amherst</b>
        <span className="sep">✦</span>
        <b>SIG</b>
        <span className="sep">✦</span>
        <b>HF0</b>
      </div>
    </div>
  )
}
