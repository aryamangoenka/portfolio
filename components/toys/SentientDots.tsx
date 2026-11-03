"use client"

import { useEffect, useRef } from "react"
import { clamp, prefersReducedMotion, sized, smooth, whileVisible } from "@/lib/toy"

// 21,000 files prune down to 324 as you scroll. 324 is an 18 by 18 grid.
const N = 21000
const KEEP = 324

export function SentientDots() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const counter = useRef<HTMLElement>(null)

  useEffect(() => {
    const c = canvas.current!
    const reduced = prefersReducedMotion()
    const px = new Float32Array(N), py = new Float32Array(N), when = new Float32Array(N)
    for (let i = 0; i < N; i++) {
      const a = Math.random() * 6.283, r = Math.pow(Math.random(), 0.62)
      px[i] = 0.5 + Math.cos(a) * r * 0.47
      py[i] = 0.54 + Math.sin(a) * r * 0.43
      when[i] = 0.08 + Math.random() * 0.62
    }
    let last = -1

    return whileVisible(c, () => {
      const box = c.getBoundingClientRect(), vh = window.innerHeight
      const p = reduced ? 1 : clamp((vh * 0.95 - box.top) / (vh * 0.72))
      const { x, w, h, changed } = sized(c)
      if (Math.abs(p - last) < 0.0008 && !changed) return
      last = p

      x.clearRect(0, 0, w, h)
      let alive = KEEP
      x.fillStyle = "rgba(255,255,255,.58)"
      for (let i = KEEP; i < N; i++) {
        const t = (p - when[i]) / 0.16
        if (t >= 1) continue
        alive++
        const fall = t > 0 ? t * t : 0
        x.fillRect(px[i] * w, py[i] * h + fall * h * 0.9, 1.4, 1.4)
      }

      const s = Math.min(w, h) * 0.046, ox = w / 2 - s * 8.5, oy = h * 0.56 - s * 8.5
      const m = smooth(clamp((p - 0.6) / 0.4))
      x.fillStyle = "#c6f135"
      for (let i = 0; i < KEEP; i++) {
        const gx = ox + (i % 18) * s, gy = oy + Math.floor(i / 18) * s
        const ax = px[i] * w, ay = py[i] * h
        const size = 2 + m * (s * 0.66 - 2)
        x.fillRect(ax + (gx - ax) * m - size / 2, ay + (gy - ay) * m - size / 2, size, size)
      }
      counter.current!.textContent = alive.toLocaleString("en-US")
    })
  }, [])

  return (
    <div className="toy" style={{ background: "#1616e8", color: "#fff" }}>
      <canvas ref={canvas} style={{ aspectRatio: "7/6" }} />
      <div className="read">
        <b ref={counter}>21,000</b>files in Downloads
      </div>
    </div>
  )
}
