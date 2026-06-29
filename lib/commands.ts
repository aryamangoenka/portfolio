// ─────────────────────────────────────────────────────────────────────────
//  commands.ts — the brain of the working terminal.
//  Pure: run(input, cwd) → result. The Terminal component applies effects.
// ─────────────────────────────────────────────────────────────────────────

import { PROFILE, LINKS, EXPERIENCE, STACK, AWARDS } from "./content"
import { FILES, DIRS, listDir, resolveFile, getFile } from "./files"

export type TermLine = { text: string; cls?: string }
export type TermResult = {
  lines: TermLine[]
  clear?: boolean
  openFile?: string
  setTheme?: "dark" | "light" | "toggle"
  cwd?: string
}

const P = (text = "", cls?: string): TermLine => ({ text, cls })
const ok = (lines: TermLine[], extra: Partial<TermResult> = {}): TermResult => ({ lines, ...extra })

export const COMMANDS = [
  "help", "ls", "cd", "pwd", "cat", "open", "whoami", "about", "projects",
  "experience", "stack", "skills", "awards", "contact", "socials", "neofetch",
  "git", "theme", "date", "echo", "clear", "sudo", "repo", "vim", "exit",
]

function help(): TermResult {
  return ok([
    P("Available commands — or just click a file in the sidebar.", "term-muted"),
    P(""),
    P("  ls [dir]        list files          cat <file>     print a file"),
    P("  cd <dir>        change directory    open <file>    jump to a section"),
    P("  projects        list my work        experience     career history"),
    P("  stack           the tech I use      awards         honors"),
    P("  whoami          the short version   contact        how to reach me"),
    P("  neofetch        the stat card       git log        career as commits"),
    P("  theme           toggle light/dark   clear          clear the screen"),
    P(""),
    P("  pro tip: ↑/↓ for history · Tab to autocomplete · try 'sudo hire-me'", "term-muted"),
  ])
}

function lsCmd(arg: string, cwd: string): TermResult {
  const target = arg || cwd
  const items = listDir(target)
  if (!items) return ok([P(`ls: ${arg}: no such directory`, "term-error")])
  return ok([P(items.join("   "), "term-accent")])
}

function cdCmd(arg: string, cwd: string): TermResult {
  const a = arg.trim()
  if (!a || a === "~" || a === "/") return ok([], { cwd: "~" })
  if (a === "..") return ok([], { cwd: "~" })
  const dir = a.replace(/\/$/, "")
  if (DIRS.includes(dir)) return ok([], { cwd: dir })
  return ok([P(`cd: ${a}: no such directory`, "term-error")])
}

function catCmd(arg: string, cwd: string): TermResult {
  if (!arg) return ok([P("usage: cat <file>", "term-muted")])
  const f = resolveFile(arg, cwd)
  if (!f) return ok([P(`cat: ${arg}: no such file`, "term-error")])
  const body = f.text.replace(/\n$/, "").split("\n").map((l) => P(l))
  return ok([
    ...body,
    P(""),
    P(`→ type 'open ${f.id}' to view it on the page`, "term-muted"),
  ])
}

function openCmd(arg: string, cwd: string): TermResult {
  if (!arg) return ok([P("usage: open <file>", "term-muted")])
  const f = resolveFile(arg, cwd)
  if (!f) return ok([P(`open: ${arg}: no such file`, "term-error")])
  return ok([P(`opening ${f.id} …`, "term-success")], { openFile: f.id })
}

function whoami(): TermResult {
  return ok([
    P(PROFILE.name, "term-accent"),
    P(`${PROFILE.role} · ${PROFILE.location} · ${PROFILE.school}`),
    P(PROFILE.tagline, "term-muted"),
  ])
}

function projects(): TermResult {
  const lines = FILES.filter((f) => f.dir === "projects").map((f) =>
    P(`  projects/${f.name}`, "term-accent")
  )
  return ok([P("Selected work:", "term-muted"), ...lines, P(""), P("  cat any of them, or 'open projects/coldbrew.md'", "term-muted")])
}

function experience(): TermResult {
  const lines: TermLine[] = []
  EXPERIENCE.forEach((e) => {
    lines.push(P(`  ${e.role}  ·  ${e.org}`, "term-accent"))
    lines.push(P(`    ${e.period}`, "term-muted"))
  })
  return ok([P("Where I've been:", "term-muted"), ...lines])
}

function stack(): TermResult {
  const lines = STACK.map((g) =>
    P(`  ${g.label.padEnd(12)} ${g.items.join(", ")}`)
  )
  return ok([P("My stack:", "term-muted"), ...lines])
}

function awards(): TermResult {
  return ok([
    P("Honors:", "term-muted"),
    ...AWARDS.map((a) => P(`  ${a.year}  ${a.award}`, "term-accent")),
  ])
}

function contact(): TermResult {
  return ok([
    P("Let's talk — I read every email.", "term-muted"),
    P(`  email     ${PROFILE.email}`, "term-link"),
    P(`  github    ${LINKS.github.replace("https://", "")}`, "term-link"),
    P(`  linkedin  ${LINKS.linkedin.replace("https://www.", "")}`, "term-link"),
    P(`  x         ${LINKS.x.replace("https://", "")}`, "term-link"),
    P(`  assemblr  ${LINKS.assemblr.replace("https://", "")}`, "term-link"),
  ])
}

function gitLog(): TermResult {
  const hash = (i: number) => (0xa11ce + i * 0x4d2f1).toString(16).slice(0, 7)
  const lines: TermLine[] = []
  EXPERIENCE.forEach((e, i) => {
    lines.push(
      P(
        `* ${hash(i)}${i === 0 ? "  (HEAD -> main)" : ""}  ${e.role} @ ${e.org}`,
        i === 0 ? "term-accent" : undefined
      )
    )
    lines.push(P(`  ${e.period}`, "term-muted"))
  })
  return ok(lines)
}

function neofetch(): TermResult {
  const art = [
    "      ╱╲      ",
    "     ╱  ╲     ",
    "    ╱ AG ╲    ",
    "   ╱______╲   ",
    "   ╲      ╱   ",
    "    ╲    ╱    ",
    "     ╲  ╱     ",
    "      ╲╱      ",
  ]
  const info = [
    `${PROFILE.name}`,
    `─────────────────────`,
    `role     ${PROFILE.role}`,
    `os       ships@v1`,
    `uptime   ${PROFILE.age} years`,
    `host     ${PROFILE.location}`,
    `edu      ${PROFILE.school}`,
    `now      building Assemblr`,
    `wins     HF0 1st/1,000+`,
    `taught   500+ students`,
  ]
  const lines: TermLine[] = []
  const rows = Math.max(art.length, info.length)
  for (let i = 0; i < rows; i++) {
    const left = (art[i] ?? "             ").padEnd(14)
    const right = info[i] ?? ""
    lines.push(P(left + right, i === 0 ? undefined : undefined))
  }
  return ok(lines.map((l, i) => (i <= 1 ? { ...l, cls: "term-accent" } : l)))
}

function sudo(rest: string): TermResult {
  const r = rest.trim().toLowerCase()
  if (r === "hire-me" || r === "hire me") {
    return ok([
      P("Permission granted. ✓", "term-success"),
      P(`Reach the founder directly: ${PROFILE.email}`, "term-link"),
      P("(he replies fastest to short, specific notes.)", "term-muted"),
    ])
  }
  if (r.startsWith("rm")) {
    return ok([P("nice try. this one's staying up. 🙂", "term-muted")])
  }
  return ok([P(`[sudo] password for ${PROFILE.handle}: `, "term-muted"), P("just kidding — try 'sudo hire-me'", "term-muted")])
}

export function run(input: string, cwd: string): TermResult {
  const trimmed = input.trim()
  if (!trimmed) return ok([])
  const [cmd, ...args] = trimmed.split(/\s+/)
  const rest = trimmed.slice(cmd.length).trim()

  switch (cmd) {
    case "help": case "?": case "man": return help()
    case "ls": case "ll": case "dir": return lsCmd(args[0] ?? "", cwd)
    case "cd": return cdCmd(rest, cwd)
    case "pwd": return ok([P(cwd === "~" ? "/home/aryaman" : `/home/aryaman/${cwd}`)])
    case "cat": case "less": case "more": return catCmd(args[0] ?? "", cwd)
    case "open": case "vi": return openCmd(args[0] ?? "", cwd)
    case "whoami": case "id": return whoami()
    case "about": return openCmd("about.ts", cwd)
    case "projects": return projects()
    case "experience": case "work": case "history": return experience()
    case "stack": case "skills": case "tech": return stack()
    case "awards": case "honors": return awards()
    case "contact": case "email": case "reach": return contact()
    case "socials": case "links": return contact()
    case "neofetch": case "fetch": return neofetch()
    case "git": return args[0] === "log" ? gitLog() : ok([P(`git: '${args.join(" ")}' — try 'git log'`, "term-muted")])
    case "theme": {
      const t = args[0]
      if (t === "dark" || t === "light") return ok([P(`theme → ${t}`, "term-success")], { setTheme: t })
      return ok([P("theme → toggled", "term-success")], { setTheme: "toggle" })
    }
    case "date": return ok([P(new Date().toString())])
    case "echo": return ok([P(rest)])
    case "clear": case "cls": return ok([], { clear: true })
    case "sudo": return sudo(rest)
    case "repo": case "source": return ok([P("source lives on GitHub:", "term-muted"), P(`  ${LINKS.github}`, "term-link")])
    case "vim": case "nano": case "emacs": return ok([P(`${cmd}? bold choice. press nothing — you're already in the editor. 🙂`, "term-muted")])
    case "exit": case "quit": case "logout": return ok([P("there's no exit. there's only the next build. 🙂", "term-muted")])
    case "ll-": default:
      return ok([
        P(`command not found: ${cmd}`, "term-error"),
        P("type 'help' to see what's available.", "term-muted"),
      ])
  }
}

// Tab-completion: complete command names or file/dir paths.
export function complete(input: string, cwd: string): string {
  const parts = input.split(/\s+/)
  if (parts.length <= 1) {
    const hits = COMMANDS.filter((c) => c.startsWith(parts[0]))
    return hits.length === 1 ? hits[0] + " " : input
  }
  const last = parts[parts.length - 1]
  const names = [
    ...FILES.map((f) => f.id),
    ...FILES.filter((f) => f.dir === null).map((f) => f.name),
    ...DIRS.map((d) => d + "/"),
  ]
  const hits = Array.from(new Set(names.filter((n) => n.startsWith(last))))
  if (hits.length === 1) {
    parts[parts.length - 1] = hits[0]
    return parts.join(" ")
  }
  return input
}
