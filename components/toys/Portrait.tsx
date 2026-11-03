"use client"

import { useEffect, useRef, useState } from "react"
import { clamp, pointerIn, prefersReducedMotion, sized, whileVisible } from "@/lib/toy"

// My photo drawn in dots. They gather on load, the head turns toward the cursor, and a click scatters them.
// The dots come from public/portrait.bin (see scripts/bake-portrait.py), so the photo itself isn't on the site.
const FACE = { x: 0.509, y: 0.355, rx: 0.3, ry: 0.36 }
const TURN = 15
const SIZE_SCALE = 190
const BLUE_CAP = 0.39

export function Portrait() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    setTouch(window.matchMedia("(hover: none)").matches)
    const c = ref.current!
    const reduced = prefersReducedMotion()
    let stop = () => {}
    let cancelled = false
    let removeListeners = () => {}

    fetch("/portrait.bin")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        if (cancelled) return
        const bytes = new Uint8Array(buffer)
        const cols = bytes[0]
        const rows = bytes[1]
        const n = Math.floor((bytes.length - 2) / 3)
        const f = () => new Float32Array(n)
        const X = f(), Y = f(), R = f(), D = f(), OX = f(), OY = f(), VX = f(), VY = f(), SX = f(), SY = f(), DELAY = f()
        const BLUE = new Uint8Array(n)

        let W = 0, H = 0, born = 0
        let mx = 0, my = 0, tx = 0, ty = 0, lastMove = -1e9, hx = -1e4, hy = -1e4

        function layout(w: number, h: number) {
          W = w
          H = h
          const step = Math.min(w / cols, h / rows)
          const left = (w - cols * step) / 2
          for (let i = 0; i < n; i++) {
            const col = bytes[2 + i * 3], row = bytes[3 + i * 3], packed = bytes[4 + i * 3]
            const blue = packed > 127
            const size = (packed & 127) / SIZE_SCALE
            X[i] = (col + 0.5) * step + left
            Y[i] = (row + 0.5) * step
            R[i] = step * (blue ? Math.min(size, BLUE_CAP) : size)
            BLUE[i] = blue ? 1 : 0
            const u = (col + 0.5) / cols, v = (row + 0.5) / rows
            const fx = (u - FACE.x) / FACE.rx, fy = (v - FACE.y) / FACE.ry
            D[i] = Math.sqrt(Math.max(0, 1 - fx * fx - fy * fy)) + 0.08
            if (!born) {
              const a = Math.random() * 6.283, far = (0.45 + Math.random() * 0.8) * Math.max(w, h)
              SX[i] = Math.cos(a) * far
              SY[i] = Math.sin(a) * far
              DELAY[i] = Math.hypot(u - FACE.x, v - FACE.y) * 700 + Math.random() * 260
            }
          }
          born = born || performance.now()
        }

        const onMove = (e: PointerEvent) => {
          const r = c.getBoundingClientRect()
          tx = clamp((e.clientX - r.left - r.width / 2) / (window.innerWidth * 0.5), -1, 1)
          ty = clamp((e.clientY - r.top - r.height * 0.35) / (window.innerHeight * 0.5), -1, 1)
          hx = e.clientX - r.left
          hy = e.clientY - r.top
          lastMove = performance.now()
        }
        const onClick = (e: MouseEvent) => {
          const p = pointerIn(e, c)
          for (let i = 0; i < n; i++) {
            const dx = X[i] + OX[i] - p.x, dy = Y[i] + OY[i] - p.y
            const d = Math.hypot(dx, dy) || 1, force = Math.max(0, 1 - d / 280) * 34
            VX[i] += (dx / d) * force + (Math.random() - 0.5) * force * 0.5
            VY[i] += (dy / d) * force + (Math.random() - 0.5) * force * 0.5
          }
        }
        window.addEventListener("pointermove", onMove, { passive: true })
        c.addEventListener("click", onClick)
        removeListeners = () => {
          window.removeEventListener("pointermove", onMove)
          c.removeEventListener("click", onClick)
        }

        stop = whileVisible(c, (now) => {
          const { x, w, h } = sized(c)
          if (w !== W || h !== H) layout(w, h)
          if (now - lastMove > 2200 && !reduced) {
            tx = Math.sin(now / 2100) * 0.55
            ty = Math.sin(now / 3300) * 0.22
            hx = hy = -1e4
          }
          mx += (tx - mx) * 0.07
          my += (ty - my) * 0.07

          const reach = 62
          for (let i = 0; i < n; i++) {
            const dx = X[i] + OX[i] - hx, dy = Y[i] + OY[i] - hy, d2 = dx * dx + dy * dy
            if (d2 < reach * reach) {
              const d = Math.sqrt(d2) || 1, force = (1 - d / reach) * 1.5
              VX[i] += (dx / d) * force
              VY[i] += (dy / d) * force
            }
            VX[i] = (VX[i] - OX[i] * 0.055) * 0.85
            VY[i] = (VY[i] - OY[i] * 0.055) * 0.85
            OX[i] += VX[i]
            OY[i] += VY[i]
          }

          x.clearRect(0, 0, W, H)
          for (const blue of [0, 1]) {
            x.beginPath()
            for (let i = 0; i < n; i++) {
              if (BLUE[i] !== blue) continue
              const t = reduced ? 1 : clamp((now - born - DELAY[i]) / 950)
              const e = 1 - Math.pow(1 - t, 3), s = 1 - e
              const px = X[i] + OX[i] + mx * D[i] * TURN + SX[i] * s
              const py = Y[i] + OY[i] + my * D[i] * TURN * 0.6 + SY[i] * s
              const r = R[i] * e
              x.moveTo(px + r, py)
              x.arc(px, py, r, 0, 6.2832)
            }
            x.fillStyle = blue ? "#1616e8" : "#111114"
            x.fill()
          }
        })
      })
      .catch(() => {})

    return () => {
      cancelled = true
      stop()
      removeListeners()
    }
  }, [])

  return (
    <figure className="me">
      <canvas ref={ref} role="img" aria-label="Portrait of Aryaman Goenka, drawn in moving dots" />
      <figcaption>{touch ? "Tap to scatter me." : "Move your cursor. Click to scatter me."}</figcaption>
    </figure>
  )
}
