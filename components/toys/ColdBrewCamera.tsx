"use client"

import { useEffect, useRef, useState } from "react"
import { clamp, monoFont, pointerIn, prefersReducedMotion, sized, whileVisible } from "@/lib/toy"

// A simulated camera that flags the trouble you cause. No real model is running here.
const W = 800
const H = 500
const LANE = [[250, 140], [640, 140], [640, 390], [250, 390]]

type Box = { x: number; y: number; w: number; h: number }

export function ColdBrewCamera() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [alerts, setAlerts] = useState<string[]>([])

  useEffect(() => {
    const c = canvas.current!
    const reduced = prefersReducedMotion()
    const font = monoFont()
    const worker: Box = { x: 105, y: 290, w: 34, h: 56 }
    const pallets = [0, 1, 2, 3].map((i) => ({ x: 480 + i * 72, y: 66, w: 58, h: 54, hx: 480 + i * 72, hy: 66 }))
    const lift = { t: 0, x: 0, y: 0, w: 74, h: 96, down: false }
    let grabbed: Box | null = null
    let last = 0
    let shown = ""

    const at = (e: PointerEvent) => {
      const r = c.getBoundingClientRect(), p = pointerIn(e, c)
      return { x: (p.x / r.width) * W, y: (p.y / r.height) * H }
    }
    const hit = (o: Box, p: { x: number; y: number }) => Math.abs(p.x - o.x) < o.w / 2 + 12 && Math.abs(p.y - o.y) < o.h / 2 + 12

    const onDown = (e: PointerEvent) => {
      const p = at(e)
      grabbed = hit(worker, p) ? worker : pallets.find((o) => hit(o, p)) || (hit(lift, p) ? lift : null)
      if (grabbed && grabbed !== lift) c.setPointerCapture(e.pointerId)
    }
    const onMove = (e: PointerEvent) => {
      if (!grabbed || grabbed === lift) return
      const p = at(e)
      grabbed.x = clamp(p.x, 24, W - 24)
      grabbed.y = clamp(p.y, 30, H - 30)
    }
    const onUp = () => {
      if (grabbed === lift) lift.down = !lift.down
      grabbed = null
    }
    c.addEventListener("pointerdown", onDown)
    c.addEventListener("pointermove", onMove)
    c.addEventListener("pointerup", onUp)

    function box(x: CanvasRenderingContext2D, o: Box, label: string, hot: boolean) {
      x.strokeStyle = hot ? "#ff2d46" : "#35f28a"
      x.lineWidth = hot ? 3 : 1.5
      x.strokeRect(o.x - o.w / 2 - 6, o.y - o.h / 2 - 6, o.w + 12, o.h + 12)
      x.font = `600 13px ${font}`
      const tw = x.measureText(label).width + 10
      x.fillStyle = hot ? "#ff2d46" : "#35f28a"
      x.fillRect(o.x - o.w / 2 - 6, o.y - o.h / 2 - 25, tw, 19)
      x.fillStyle = hot ? "#fff" : "#04170c"
      x.fillText(label, o.x - o.w / 2 - 1, o.y - o.h / 2 - 11)
    }

    const stop = whileVisible(c, (now) => {
      const dt = Math.min(50, now - last)
      last = now
      const { x, w } = sized(c)
      const k = w / W
      x.save()
      x.scale(k, k)

      x.fillStyle = "#26262a"
      x.fillRect(0, 0, W, H)
      for (let i = 0; i < 9; i++) {
        x.fillStyle = i % 2 ? "#2a2a2e" : "#242428"
        x.fillRect(i * 100, 0, 100, H)
      }
      x.strokeStyle = "#d9a91a"
      x.setLineDash([18, 12])
      x.lineWidth = 4
      x.strokeRect(205, 95, 480, 340)
      x.setLineDash([])
      x.fillStyle = "#17171a"
      x.fillRect(440, 28, 330, 8)
      for (const ry of [205, 305]) {
        x.fillStyle = "#17171a"
        x.fillRect(320, ry - 22, 300, 44)
        for (let q = 0; q < 7; q++) {
          x.fillStyle = (q * 3 + ry) % 4 ? "#6f4c26" : "#3a3a40"
          x.fillRect(328 + q * 41, ry - 16, 35, 32)
        }
      }

      if (!lift.down && !reduced) lift.t = (lift.t + dt * 0.00012) % 1
      const segments = LANE.map((p, i) => [p, LANE[(i + 1) % 4]])
      const lengths = segments.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1]))
      const total = lengths.reduce((a, b) => a + b)
      let d = lift.t * total, seg = 0
      while (d > lengths[seg]) d -= lengths[seg++]
      const [A, B] = segments[seg], angle = Math.atan2(B[1] - A[1], B[0] - A[0])
      lift.x = A[0] + ((B[0] - A[0]) * d) / lengths[seg]
      lift.y = A[1] + ((B[1] - A[1]) * d) / lengths[seg]

      const inLane =
        worker.x > 205 && worker.x < 685 && worker.y > 95 && worker.y < 435 &&
        (Math.abs(worker.x - 250) < 45 || Math.abs(worker.x - 640) < 45 || Math.abs(worker.y - 140) < 45 || Math.abs(worker.y - 390) < 45)
      const near = Math.hypot(worker.x - lift.x, worker.y - lift.y) < 105 || inLane
      const moved = pallets.map((p) => Math.hypot(p.x - p.hx, p.y - p.hy) > 40)

      pallets.forEach((p, j) => {
        x.fillStyle = "#8a5e2c"
        x.fillRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h)
        x.strokeStyle = "#5c3d1a"
        x.lineWidth = 2
        for (let q = 1; q < 3; q++) {
          x.beginPath()
          x.moveTo(p.x - p.w / 2, p.y - p.h / 2 + (q * p.h) / 3)
          x.lineTo(p.x + p.w / 2, p.y - p.h / 2 + (q * p.h) / 3)
          x.stroke()
        }
        box(x, p, moved[j] ? "pallet out of place" : "pallet", moved[j])
      })

      x.save()
      x.translate(lift.x, lift.y)
      x.rotate(angle + Math.PI / 2)
      x.fillStyle = lift.down ? "#7a6a2a" : "#e8b512"
      x.beginPath()
      x.roundRect(-26, -32, 52, 64, 6)
      x.fill()
      x.fillStyle = "#17171a"
      x.fillRect(-16, -14, 32, 24)
      x.fillStyle = "#aaa"
      x.fillRect(-20, -52, 7, 22)
      x.fillRect(13, -52, 7, 22)
      x.restore()
      if (lift.down) {
        x.fillStyle = "rgba(200,200,200,.35)"
        for (let q = 0; q < 5; q++) {
          x.beginPath()
          x.arc(lift.x + Math.sin(now / 300 + q) * 12, lift.y - 20 - ((now / 14 + q * 22) % 70), 7 + q, 0, 7)
          x.fill()
        }
      }
      box(x, lift, lift.down ? "forklift stopped" : "forklift", lift.down)

      x.fillStyle = "#1c6dd6"
      x.beginPath()
      x.roundRect(worker.x - 15, worker.y - 12, 30, 38, 8)
      x.fill()
      x.fillStyle = "#f2c9a0"
      x.beginPath()
      x.arc(worker.x, worker.y - 20, 11, 0, 7)
      x.fill()
      box(x, worker, near ? "person in forklift path" : "person", near)

      x.fillStyle = "rgba(255,255,255,.035)"
      for (let y = (now / 40) % 4; y < H; y += 4) x.fillRect(0, y, W, 1)
      x.font = `600 14px ${font}`
      x.fillStyle = "#fff"
      x.fillText("CAM 03  DOCK", 16, 26)
      x.fillStyle = Math.floor(now / 600) % 2 ? "#ff2d46" : "#7a1822"
      x.beginPath()
      x.arc(150, 21, 5, 0, 7)
      x.fill()
      x.restore()

      const next = [
        near && "SAFETY VIOLATION: person in forklift path",
        lift.down && "EQUIPMENT FAILURE: forklift stopped",
        moved.some(Boolean) && "SHIPMENT ANOMALY: pallet out of place",
      ].filter(Boolean) as string[]
      const signature = next.join("|")
      if (signature !== shown) {
        shown = signature
        setAlerts(next)
      }
    })

    return () => {
      stop()
      c.removeEventListener("pointerdown", onDown)
      c.removeEventListener("pointermove", onMove)
      c.removeEventListener("pointerup", onUp)
    }
  }, [])

  return (
    <div className="toy">
      <canvas ref={canvas} className="cam-canvas" style={{ aspectRatio: "16/10" }} />
      <div id="camLog">
        {alerts.map((a) => (
          <div key={a}>{a}</div>
        ))}
      </div>
    </div>
  )
}
