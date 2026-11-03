# aryamangoenka.com

My personal site: one scrolling page where every project has something you can play with.

- **Stack:** Next.js 14 (App Router, static export) and TypeScript. The toys are plain canvas, with no animation or UI libraries.
- **Words:** everything is in `lib/content.ts`.
- **Toys:** `components/toys/`, sharing one animation loop in `lib/toy.ts`.
- **Portrait:** drawn from `public/portrait.bin`, which only holds dots. Regenerate it with
  `python3 scripts/bake-portrait.py path/to/photo.jpg` on a Mac. The original photo is never committed.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```
