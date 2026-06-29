// ─────────────────────────────────────────────────────────────────────────
//  files.ts — the virtual filesystem.
//  The sidebar tree, the editor panes, and the terminal (ls/cd/cat/open) all
//  read from FILES, so everything stays in sync from one definition.
// ─────────────────────────────────────────────────────────────────────────

import { PROFILE, LINKS, EXPERIENCE, STACK, AWARDS, CREDO, PROJECTS } from "./content"

export type FileKind = "hero" | "code" | "markdown"

export type FileNode = {
  id: string // full path, e.g. "projects/coldbrew.md"
  name: string // display name, e.g. "coldbrew.md"
  dir: string | null // "projects" or null for root
  lang: string // ts | json | bash | md
  kind: FileKind
  icon: string // lucide-ish hint for the sidebar
  code?: string // for kind === "code"
  md?: string // for kind === "markdown"
  text: string // plaintext for `cat` in the terminal
}

const q = (s: string) => JSON.stringify(s)

// ─── code generators (data → source view) ───────────────────────────────────

function aboutCode(): string {
  return `// who I am, in fewer words than the recruiters want.

const aryaman = {
  name: ${q(PROFILE.name)},
  age: ${PROFILE.age},
  role: ${q(PROFILE.role)},
  location: ${q(PROFILE.location)},
  school: ${q(PROFILE.school)},

  thesis: ${q(PROFILE.tagline)},

  // I care less about how impressive something sounds, and more about
  // whether it actually works for the person on the other end.
  credo: [
${CREDO.map((c) => `    ${q(c)},`).join("\n")}
  ],

  // the worst thing you can do is not show up. so I keep showing up.
  status: "building",
}

export default aryaman
`
}

function experienceCode(): string {
  const entries = EXPERIENCE.map((e) => {
    const notes = e.notes.map((n) => `      ${q(n)},`).join("\n")
    const tags = e.tags.map(q).join(", ")
    return `  {
    org: ${q(e.org)},
    role: ${q(e.role)},
    period: ${q(e.period)},${e.location ? `\n    location: ${q(e.location)},` : ""}
    notes: [
${notes}
    ],
    tags: [${tags}],
  },`
  }).join("\n")
  return `// where I've been. reverse-chronological, lightly compressed.

export const experience = [
${entries}
]
`
}

function stackCode(): string {
  const groups = STACK.map(
    (g) => `  ${g.label}: [${g.items.map(q).join(", ")}],`
  ).join("\n")
  return `// the tools. I reach for whatever ships the thing fastest.

export const stack = {
${groups}
}
`
}

function awardsJson(): string {
  return JSON.stringify(AWARDS, null, 2) + "\n"
}

function contactScript(): string {
  return `#!/bin/bash
# ways to reach me — I read every email.

echo "email     → ${PROFILE.email}"
echo "github    → ${LINKS.github.replace("https://", "")}"
echo "linkedin  → ${LINKS.linkedin.replace("https://www.", "")}"
echo "x         → ${LINKS.x.replace("https://", "")}"
echo "assemblr  → ${LINKS.assemblr.replace("https://", "")}"

# fastest reply to short, specific notes:
#   an intro to a builder, a sharp critique, or a problem you're stuck on.
`
}

// plaintext README for \`cat README.md\` in the terminal
function readmeText(): string {
  return `# ${PROFILE.name}
${PROFILE.role} — ${PROFILE.location}

${PROFILE.tagline}
${PROFILE.blurb}

PROOF
  • 1st / 1,000+   HF0 Voice & Video AI Hackathon (won in 12h)
  • 10K+ @ 95-100% Agentic NLP at ASAPP, shown to ML leadership
  • MIT Fellow     Break Through Tech AI
  • Published      LLM-reliability research, NUTRITION 2026
  • 500+ taught    NeuroBlock — neural nets for high schoolers
  • President      CICSoft, largest tech org at UMass

NOW
  Building Assemblr at Founders, Inc. (Canopy F26), San Francisco.

tip: type 'help' to explore. or 'open projects/coldbrew.md'.
`
}

// ─── the filesystem ──────────────────────────────────────────────────────────

const rootFiles: FileNode[] = [
  {
    id: "README.md",
    name: "README.md",
    dir: null,
    lang: "md",
    kind: "hero",
    icon: "readme",
    text: readmeText(),
  },
]

const projectFiles: FileNode[] = PROJECTS.map((p) => ({
  id: `projects/${p.slug}.md`,
  name: `${p.slug}.md`,
  dir: "projects",
  lang: "md",
  kind: "markdown" as FileKind,
  icon: "md",
  md: p.body,
  text: p.body,
}))

const afterFiles: FileNode[] = [
  {
    id: "experience.ts",
    name: "experience.ts",
    dir: null,
    lang: "ts",
    kind: "code",
    icon: "ts",
    code: experienceCode(),
    text: experienceCode(),
  },
  {
    id: "stack.ts",
    name: "stack.ts",
    dir: null,
    lang: "ts",
    kind: "code",
    icon: "ts",
    code: stackCode(),
    text: stackCode(),
  },
  {
    id: "awards.json",
    name: "awards.json",
    dir: null,
    lang: "json",
    kind: "code",
    icon: "json",
    code: awardsJson(),
    text: awardsJson(),
  },
  {
    id: "about.ts",
    name: "about.ts",
    dir: null,
    lang: "ts",
    kind: "code",
    icon: "ts",
    code: aboutCode(),
    text: aboutCode(),
  },
  {
    id: "contact.sh",
    name: "contact.sh",
    dir: null,
    lang: "bash",
    kind: "code",
    icon: "sh",
    code: contactScript(),
    text: contactScript(),
  },
]

// Scroll / narrative order: hook → work → record → skills → honors → self → reach
export const FILES: FileNode[] = [...rootFiles, ...projectFiles, ...afterFiles]

export const getFile = (id: string) => FILES.find((f) => f.id === id)

// ─── sidebar tree ────────────────────────────────────────────────────────────

export type TreeFolder = { type: "folder"; name: string; path: string; children: FileNode[] }
export type TreeItem = { type: "file"; node: FileNode } | TreeFolder

export const TREE: TreeItem[] = [
  { type: "file", node: rootFiles[0] },
  { type: "folder", name: "projects", path: "projects", children: projectFiles },
  ...afterFiles.map((node) => ({ type: "file" as const, node })),
]

// ─── helpers for the terminal's mini filesystem ──────────────────────────────

// Directory listing for `ls`. "" / "." / "~" = root.
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

// Resolve a user-typed path (relative to cwd) to a FileNode.
export function resolveFile(arg: string, cwd: string): FileNode | null {
  let path = arg.trim().replace(/^\.\//, "")
  if (!path.includes("/") && cwd && cwd !== "~" && cwd !== "/") {
    path = `${cwd}/${path}`
  }
  return FILES.find((f) => f.id === path || f.name === arg) ?? null
}

export const DIRS = Array.from(new Set(FILES.filter((f) => f.dir).map((f) => f.dir!)))
