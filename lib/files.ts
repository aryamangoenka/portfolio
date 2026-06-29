// ─────────────────────────────────────────────────────────────────────────
//  files.ts — the virtual filesystem.
//  The sidebar tree, the editor views, and the terminal (ls/cd/cat/open) all
//  read from FILES, so everything stays in sync from one definition.
// ─────────────────────────────────────────────────────────────────────────

import { PROFILE, LINKS, EXPERIENCE, INTERESTS, STANCE, ABOUT_PS, PROJECTS } from "./content"

export type FileView = "readme" | "project" | "experience" | "interests" | "about" | "contact"

export type FileNode = {
  id: string
  name: string
  dir: string | null
  lang: string
  view: FileView
  icon: string
  slug?: string
  text: string // plaintext for `cat`
}

// ─── plaintext for the terminal `cat` ────────────────────────────────────────

const readmeText = () =>
  [
    PROFILE.name,
    PROFILE.role,
    "",
    PROFILE.tagline,
    "",
    "1st place     HF0 AI hackathon (1 of 30 from 1,000+)",
    "10K @ 95-100% agentic NLP at ASAPP",
    "MIT fellow    Break Through Tech AI",
    "published     LLM research, ASN 2026",
    "500+ taught   NeuroBlock",
    "president     CICSoft, biggest tech org on campus",
    "",
    "tip: type 'help', or 'open projects/coldbrew.md'.",
  ].join("\n")

const experienceText = () =>
  EXPERIENCE.map((e) => `${e.period}  ${e.role}, ${e.org}\n${e.notes.map((n) => "  - " + n).join("\n")}`).join("\n\n")

const interestsText = () => INTERESTS.map((i) => `- ${i.area} (${i.note})`).join("\n")

const aboutText = () => STANCE.join("\n") + "\n\n" + ABOUT_PS

const contactText = () =>
  [
    PROFILE.email,
    LINKS.github.replace("https://", ""),
    LINKS.linkedin.replace("https://www.", ""),
    LINKS.x.replace("https://", ""),
  ].join("\n")

// ─── the filesystem ──────────────────────────────────────────────────────────

const readmeFile: FileNode = {
  id: "README.md",
  name: "README.md",
  dir: null,
  lang: "md",
  view: "readme",
  icon: "readme",
  text: readmeText(),
}

const projectFiles: FileNode[] = PROJECTS.map((p) => ({
  id: `projects/${p.slug}.md`,
  name: `${p.slug}.md`,
  dir: "projects",
  lang: "md",
  view: "project" as FileView,
  icon: "md",
  slug: p.slug,
  text: p.body,
}))

const afterFiles: FileNode[] = [
  { id: "experience.ts", name: "experience.ts", dir: null, lang: "ts", view: "experience", icon: "ts", text: experienceText() },
  { id: "interests.ts", name: "interests.ts", dir: null, lang: "ts", view: "interests", icon: "ts", text: interestsText() },
  { id: "about.ts", name: "about.ts", dir: null, lang: "ts", view: "about", icon: "ts", text: aboutText() },
  { id: "contact.sh", name: "contact.sh", dir: null, lang: "bash", view: "contact", icon: "sh", text: contactText() },
]

// Scroll / narrative order: hook → work → record → interests → self → reach
export const FILES: FileNode[] = [readmeFile, ...projectFiles, ...afterFiles]

export const getFile = (id: string) => FILES.find((f) => f.id === id)

// ─── sidebar tree ────────────────────────────────────────────────────────────

export type TreeFolder = { type: "folder"; name: string; path: string; children: FileNode[] }
export type TreeItem = { type: "file"; node: FileNode } | TreeFolder

export const TREE: TreeItem[] = [
  { type: "file", node: readmeFile },
  { type: "folder", name: "projects", path: "projects", children: projectFiles },
  ...afterFiles.map((node) => ({ type: "file" as const, node })),
]

// ─── helpers for the terminal's mini filesystem ──────────────────────────────

export function listDir(path: string): string[] | null {
  const p = path.replace(/^\.?\/?/, "").replace(/\/$/, "")
  if (p === "" || p === "." || p === "~") {
    const roots = FILES.filter((f) => f.dir === null).map((f) => f.name)
    const dirs = Array.from(new Set(FILES.filter((f) => f.dir).map((f) => f.dir!)))
    return [...dirs.map((d) => d + "/"), ...roots]
  }
  const inDir = FILES.filter((f) => f.dir === p).map((f) => f.name)
  return inDir.length ? inDir : null
}

export function resolveFile(arg: string, cwd: string): FileNode | null {
  let path = arg.trim().replace(/^\.\//, "")
  if (!path.includes("/") && cwd && cwd !== "~" && cwd !== "/") {
    path = `${cwd}/${path}`
  }
  return FILES.find((f) => f.id === path || f.name === arg) ?? null
}

export const DIRS = Array.from(new Set(FILES.filter((f) => f.dir).map((f) => f.dir!)))
