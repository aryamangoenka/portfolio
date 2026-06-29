# aryaman-goenka — personal site

My personal site, built as an interactive code editor. The whole page is a
warm-paper IDE: a file tree on the left, syntax-highlighted "files" you can read,
and a **fully working terminal** at the bottom (`ls`, `cd`, `cat`, `open`,
`neofetch`, `git log`, `sudo hire-me`, tab-completion, ↑/↓ history).

It behaves like a normal scrolling site — click a file or just scroll. The
terminal is a bonus for people who want to poke around.

- **Stack:** Next.js 14 (App Router, static export) · TypeScript · Tailwind ·
  zero runtime dependencies for the highlighter/terminal (hand-rolled).
- **Cost to run:** $0. Fully static, deploys anywhere.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build (static export → ./out)

```bash
npm run build
```

Deploy the `out/` folder to Vercel, Netlify, GitHub Pages, Cloudflare Pages, etc.

## Editing content

Everything lives in one place: **`lib/content.ts`**. Edit your profile, projects,
experience, stack, and awards there — the editor panes, the sidebar tree, and the
terminal all read from it, so you never touch the components.

- `lib/content.ts` — all the data (start here)
- `lib/files.ts` — the virtual filesystem (maps content → files)
- `lib/highlight.tsx` — the syntax highlighter + markdown renderer
- `lib/commands.ts` — terminal commands
- `components/` — Hero, Sidebar, Editor, Terminal
- `app/globals.css` — the bespoke warm-paper theme (+ dark variant)

## Terminal commands

`help` lists them. Highlights: `neofetch`, `git log`, `cat projects/coldbrew.md`,
`open <file>`, `theme`, `sudo hire-me`.
