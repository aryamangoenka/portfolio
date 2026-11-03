"use client"

import { useEffect, useRef } from "react"
import { pointerIn, sized, whileVisible } from "@/lib/toy"

// A van reroutes around the streets you flood. Plain BFS and a greedy tour, just for this page.
const COLS = 19
const ROWS = 13
const STEP_MS = 150
const FLOOD_MS = 2400
const STREET = 0, BUILDING = 1, WATER = 2
const WAITING = 0, REACHED = 1, LOST = 2
const NEIGHBORS = [[1, 0], [-1, 0], [0, 1], [0, -1]]
const PEOPLE = [[6, 1], [9, 4], [12, 1], [15, 4], [3, 7], [6, 10], [9, 8], [12, 11], [15, 7], [18, 10], [3, 11]]

const key = (a: number, b: number) => b * COLS + a
const inside = (a: number, b: number) => a >= 0 && b >= 0 && a < COLS && b < ROWS

type Person = { a: number; b: number; state: number }
type Cell = { a: number; b: number }

export function EmberCity() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const readout = useRef<HTMLSpanElement>(null)
  const resetRef = useRef<() => void>(() => {})

  useEffect(() => {
    const c = canvas.current!
    let grid = new Uint8Array(COLS * ROWS)
    let people: Person[] = []
    let van: Cell = { a: 18, b: 0 }
    let route: number[] = []
    let tour: { from: number; path: number[] }[] = []
    let reached = 0, lost = 0, lastStep = 0, lastFlood = 0, planMs = 0, finished = 0
    let hover: Cell | null = null

    function bfs(a: number, b: number) {
      const dist = new Int16Array(COLS * ROWS).fill(-1), from = new Int16Array(COLS * ROWS).fill(-1)
      const queue = [key(a, b)]
      dist[queue[0]] = 0
      for (let i = 0; i < queue.length; i++) {
        const k = queue[i], ka = k % COLS, kb = (k - ka) / COLS
        for (const [da, db] of NEIGHBORS) {
          const na = ka + da, nb = kb + db
          if (!inside(na, nb)) continue
          const n = key(na, nb)
          if (grid[n] !== STREET || dist[n] >= 0) continue
          dist[n] = dist[k] + 1
          from[n] = k
          queue.push(n)
        }
      }
      return { dist, from }
    }

    function plan() {
      const t0 = performance.now()
      route = []
      tour = []
      let at: Cell = van
      let left = people.filter((p) => p.state === WAITING)
      let first = true
      while (left.length) {
        const { dist, from } = bfs(at.a, at.b)
        let best: Person | null = null, nearest = 1e9
        for (const p of left) {
          const v = dist[key(p.a, p.b)]
          if (v >= 0 && v < nearest) {
            nearest = v
            best = p
          }
        }
        if (!best) break
        const path: number[] = []
        for (let k = key(best.a, best.b); k !== key(at.a, at.b); k = from[k]) path.unshift(k)
        if (first) route = path
        tour.push({ from: key(at.a, at.b), path })
        first = false
        at = best
        const done = best
        left = left.filter((p) => p !== done)
      }
      planMs = performance.now() - t0
    }

    function reset() {
      grid = new Uint8Array(COLS * ROWS)
      for (let b = 0; b < ROWS; b++) {
        for (let a = 0; a < COLS; a++) {
          const street = a % 3 === 0 || b % 3 === 0
          grid[key(a, b)] = !street ? BUILDING : a + b * 0.3 < 1.2 ? WATER : STREET
        }
      }
      people = PEOPLE.map(([a, b]) => ({ a, b, state: WAITING }))
      van = { a: 18, b: 0 }
      reached = lost = finished = 0
      plan()
    }
    resetRef.current = reset

    function flood(a: number, b: number) {
      if (a === van.a && b === van.b) return
      grid[key(a, b)] = WATER
      for (const p of people) {
        if (p.state === WAITING && p.a === a && p.b === b) {
          p.state = LOST
          lost++
        }
      }
      plan()
    }

    const cellAt = (e: PointerEvent | MouseEvent): Cell => {
      const r = c.getBoundingClientRect(), p = pointerIn(e, c)
      return { a: Math.floor((p.x / r.width) * COLS), b: Math.floor((p.y / r.height) * ROWS) }
    }
    const onClick = (e: MouseEvent) => {
      const { a, b } = cellAt(e)
      if (inside(a, b) && grid[key(a, b)] === STREET) flood(a, b)
    }
    const onMove = (e: PointerEvent) => {
      hover = cellAt(e)
    }
    const onLeave = () => {
      hover = null
    }
    c.addEventListener("click", onClick)
    c.addEventListener("pointermove", onMove)
    c.addEventListener("pointerleave", onLeave)
    reset()

    const stop = whileVisible(c, (now) => {
      const { x, w, h } = sized(c)
      const s = w / COLS, sy = h / ROWS

      if (now - lastStep > STEP_MS && route.length) {
        lastStep = now
        const k = route.shift()!
        van = { a: k % COLS, b: (k - (k % COLS)) / COLS }
        const hit = people.find((p) => p.state === WAITING && p.a === van.a && p.b === van.b)
        if (hit) {
          hit.state = REACHED
          reached++
        }
        if (hit || !route.length) plan()
      }

      if (now - lastFlood > FLOOD_MS) {
        lastFlood = now
        const edge: Cell[] = []
        for (let b = 0; b < ROWS; b++) {
          for (let a = 0; a < COLS; a++) {
            if (grid[key(a, b)] !== STREET) continue
            if (NEIGHBORS.some(([da, db]) => inside(a + da, b + db) && grid[key(a + da, b + db)] === WATER)) edge.push({ a, b })
          }
        }
        if (edge.length && people.some((p) => p.state === WAITING)) {
          const pick = edge[Math.floor(Math.random() * edge.length)]
          flood(pick.a, pick.b)
        }
      }

      if (!people.some((p) => p.state === WAITING) || (!route.length && !tour.length)) {
        finished = finished || now
        if (now - finished > 4500) reset()
      }

      x.fillStyle = "#26315f"
      x.fillRect(0, 0, w, h)
      for (let b = 0; b < ROWS; b++) {
        for (let a = 0; a < COLS; a++) {
          const v = grid[key(a, b)]
          if (v === BUILDING) {
            x.fillStyle = "#0f1838"
            x.fillRect(a * s + 1, b * sy + 1, s - 2, sy - 2)
          } else if (v === WATER) {
            x.fillStyle = `hsl(214 92% ${56 + Math.sin(now / 420 + a + b) * 5}%)`
            x.fillRect(a * s, b * sy, s + 0.5, sy + 0.5)
          }
        }
      }
      if (hover && inside(hover.a, hover.b) && grid[key(hover.a, hover.b)] === STREET) {
        x.fillStyle = "rgba(47,128,255,.45)"
        x.fillRect(hover.a * s, hover.b * sy, s, sy)
      }

      const mid = (k: number): [number, number] => {
        const a = k % COLS, b = (k - a) / COLS
        return [(a + 0.5) * s, (b + 0.5) * sy]
      }
      tour.forEach((leg, i) => {
        if (!leg.path.length) return
        x.beginPath()
        x.moveTo(...(i === 0 ? mid(key(van.a, van.b)) : mid(leg.from)))
        for (const k of i === 0 ? route : leg.path) x.lineTo(...mid(k))
        x.lineWidth = i === 0 ? 3.5 : 1.5
        x.strokeStyle = i === 0 ? "#ff5a2b" : "rgba(255,90,43,.55)"
        x.setLineDash(i === 0 ? [] : [4, 5])
        x.stroke()
      })
      x.setLineDash([])

      for (const p of people) {
        const px = (p.a + 0.5) * s, py = (p.b + 0.5) * sy, r = s * 0.26
        x.beginPath()
        if (p.state === LOST) {
          x.fillStyle = "rgba(255,255,255,.28)"
          x.arc(px, py, r * 0.7, 0, 7)
          x.fill()
        } else if (p.state === REACHED) {
          x.fillStyle = "#c6f135"
          x.arc(px, py, r * 0.8, 0, 7)
          x.fill()
        } else {
          x.strokeStyle = "rgba(255,176,46,.5)"
          x.lineWidth = 2
          x.arc(px, py, r + 2 + 3 * (Math.sin(now / 300) + 1), 0, 7)
          x.stroke()
          x.beginPath()
          x.fillStyle = "#ffb02e"
          x.arc(px, py, r, 0, 7)
          x.fill()
        }
      }

      const [vx, vy] = mid(key(van.a, van.b)), size = s * 0.62
      x.fillStyle = "#fff"
      x.beginPath()
      x.roundRect(vx - size / 2, vy - size * 0.38, size, size * 0.76, 3)
      x.fill()

      readout.current!.textContent = `reached ${reached}  ·  lost ${lost}  ·  replanned in ${planMs < 0.1 ? "<0.1" : planMs.toFixed(1)} ms`
    })

    return () => {
      stop()
      c.removeEventListener("click", onClick)
      c.removeEventListener("pointermove", onMove)
      c.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div className="toy">
      <canvas ref={canvas} className="ember-canvas" style={{ aspectRatio: "3/2" }} />
      <div className="read" style={{ color: "#fff", fontSize: 13, textShadow: "0 1px 4px #000" }}>
        <span ref={readout} />
      </div>
      <div className="again">
        <button onClick={() => resetRef.current()}>Reset</button>
      </div>
    </div>
  )
}
