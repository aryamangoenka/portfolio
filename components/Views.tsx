"use client"

import { ArrowUpRight } from "lucide-react"
import { EXPERIENCE, INTERESTS, STANCE, PROFILE, LINKS } from "@/lib/content"

function Comment({ children }: { children: React.ReactNode }) {
  return <p className="doc-comment">{"// "}{children}</p>
}

export function ExperienceView() {
  return (
    <div className="doc">
      <Comment>where I&apos;ve been</Comment>
      <ol className="xp">
        {EXPERIENCE.map((e) => (
          <li className="xp-item" key={`${e.org}-${e.role}`}>
            <span className="xp-dot" aria-hidden />
            <div className="xp-body">
              <div className="xp-top">
                <span className="xp-org">{e.org}</span>
                <span className="xp-period">{e.period}</span>
              </div>
              <div className="xp-role">
                {e.role}
                {e.location ? ` · ${e.location}` : ""}
              </div>
              <ul className="xp-notes">
                {e.notes.map((n, i) => (
                  <li key={i}>{n}</li>
                ))}
              </ul>
              <div className="chips">
                {e.tags.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function InterestsView() {
  return (
    <div className="doc">
      <Comment>what I&apos;m into right now</Comment>
      <ul className="intr">
        {INTERESTS.map((i) => (
          <li className="intr-row" key={i.area}>
            <span className="intr-area">{i.area}</span>
            <span className="intr-note">{i.note}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AboutView() {
  return (
    <div className="doc">
      <Comment>what I&apos;m about</Comment>
      <ul className="stance">
        {STANCE.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </div>
  )
}

export function ContactView() {
  const rows: { key: string; label: string; href: string; ext?: boolean }[] = [
    { key: "email", label: PROFILE.email, href: LINKS.email },
    { key: "github", label: LINKS.github.replace("https://", ""), href: LINKS.github, ext: true },
    { key: "linkedin", label: LINKS.linkedin.replace("https://www.", ""), href: LINKS.linkedin, ext: true },
    { key: "x", label: LINKS.x.replace("https://", ""), href: LINKS.x, ext: true },
  ]
  return (
    <div className="doc">
      <Comment>say hi. short, specific notes get the fastest reply.</Comment>
      <ul className="contact">
        {rows.map((r) => (
          <li className="contact-row" key={r.key}>
            <span className="contact-key">{r.key}</span>
            <a
              className="contact-link"
              href={r.href}
              target={r.ext ? "_blank" : undefined}
              rel="noreferrer"
            >
              {r.label}
              {r.ext && <ArrowUpRight size={13} />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
