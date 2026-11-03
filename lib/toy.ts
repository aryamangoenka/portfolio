// Shared plumbing for the canvas toys. One animation loop runs them all, and each toy only runs while on screen.

type Frame = (now: number) => void

const active = new Set<Frame>()
let running = false

function tick(now: number) {
  active.forEach((frame) => frame(now))
  if (active.size) requestAnimationFrame(tick)
  else running = false
}

export function whileVisible(el: Element, frame: Frame) {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        active.add(frame)
        if (!running) {
          running = true
          requestAnimationFrame(tick)
        }
      } else {
        active.delete(frame)
      }
    },
    { rootMargin: "60px" },
  )
  io.observe(el)
  return () => {
    io.disconnect()
    active.delete(frame)
  }
}

// Matches the canvas buffer to its size on screen and returns a context that draws in CSS pixels.
export function sized(c: HTMLCanvasElement) {
  const r = c.getBoundingClientRect()
  const d = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.round(r.width * d)
  const h = Math.round(r.height * d)
  const changed = c.width !== w || c.height !== h
  if (changed) {
    c.width = w
    c.height = h
  }
  const x = c.getContext("2d")!
  x.setTransform(d, 0, 0, d, 0, 0)
  return { x, w: r.width, h: r.height, changed }
}

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v))
export const smooth = (t: number) => t * t * (3 - 2 * t)
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

export function pointerIn(e: { clientX: number; clientY: number }, c: Element) {
  const r = c.getBoundingClientRect()
  return { x: e.clientX - r.left, y: e.clientY - r.top }
}

// next/font hashes family names, so canvas text has to read the real one from the CSS variable.
export const monoFont = () => getComputedStyle(document.documentElement).getPropertyValue("--font-mono") || "monospace"
