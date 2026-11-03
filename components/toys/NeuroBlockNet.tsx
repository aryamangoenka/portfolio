"use client"

import { useEffect, useRef, useState } from "react"
import { sized, whileVisible } from "@/lib/toy"

// A real tiny neural network, trained right here on two rings of points. No straight line can separate them,
// so it sits near 50% until a hidden layer goes in.
const GRID = 56
const MAX_LAYERS = 3
const STEPS_PER_FRAME = 180
const LEARNING_RATE = 0.09

type Point = { x: number; y: number; t: number }
type Weights = number[][][]

function makePoints(): Point[] {
  return Array.from({ length: 170 }, (_, i) => {
    const isInner = i % 2 === 0
    const a = Math.random() * 6.283
    const r = isInner ? Math.random() * 0.42 : 0.66 + Math.random() * 0.28
    return { x: Math.cos(a) * r, y: Math.sin(a) * r, t: isInner ? 1 : 0 }
  })
}

function makeWeights(layers: number[]): Weights {
  const sizes = [2, ...layers, 1]
  return sizes.slice(1).map((n, l) =>
    Array.from({ length: n }, () => Array.from({ length: sizes[l] + 1 }, () => (Math.random() - 0.5) * 1.4)),
  )
}

function forward(W: Weights, input: number[]) {
  const acts = [input]
  W.forEach((layer, l) => {
    const prev = acts[l], last = l === W.length - 1
    acts.push(
      layer.map((w) => {
        let s = w[prev.length]
        for (let i = 0; i < prev.length; i++) s += w[i] * prev[i]
        return last ? 1 / (1 + Math.exp(-s)) : Math.tanh(s)
      }),
    )
  })
  return acts
}

function train(W: Weights, p: Point) {
  const acts = forward(W, [p.x, p.y])
  let err = [acts[acts.length - 1][0] - p.t]
  for (let l = W.length - 1; l >= 0; l--) {
    const prev = acts[l], next = new Array<number>(prev.length).fill(0)
    W[l].forEach((w, n) => {
      const out = acts[l + 1][n]
      const g = l === W.length - 1 ? err[n] : err[n] * (1 - out * out)
      for (let i = 0; i < prev.length; i++) {
        w[i] -= LEARNING_RATE * g * prev[i]
        next[i] += g * w[i]
      }
      w[prev.length] -= LEARNING_RATE * g
    })
    err = next
  }
}

export function NeuroBlockNet() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const accuracy = useRef<HTMLDivElement>(null)
  const message = useRef<HTMLDivElement>(null)
  const row = useRef<HTMLDivElement>(null)
  const [layers, setLayers] = useState<number[]>([])
  const [hot, setHot] = useState(false)
  const weights = useRef<Weights>(makeWeights([]))
  const solved = useRef(false)
  const hasLayers = useRef(false)
  const dragged = useRef(false)

  useEffect(() => {
    weights.current = makeWeights(layers)
    solved.current = false
    hasLayers.current = layers.length > 0
  }, [layers])

  useEffect(() => {
    const c = canvas.current!
    const points = makePoints()
    const off = document.createElement("canvas")
    off.width = off.height = GRID
    const ox = off.getContext("2d")!
    const img = ox.createImageData(GRID, GRID)

    return whileVisible(c, () => {
      const W = weights.current
      for (let i = 0; i < STEPS_PER_FRAME; i++) train(W, points[Math.floor(Math.random() * points.length)])

      let right = 0
      for (const p of points) if (forward(W, [p.x, p.y]).pop()![0] > 0.5 === (p.t === 1)) right++
      const acc = right / points.length

      for (let j = 0; j < GRID; j++) {
        for (let i = 0; i < GRID; i++) {
          const v = forward(W, [(i / (GRID - 1)) * 2 - 1, (j / (GRID - 1)) * 2 - 1]).pop()![0]
          const q = (i + j * GRID) * 4
          img.data[q] = 255 - v * 233
          img.data[q + 1] = 255 - v * 233
          img.data[q + 2] = 255 - v * 23 - (1 - v) * 150
          img.data[q + 3] = 255
        }
      }
      ox.putImageData(img, 0, 0)

      const { x, w } = sized(c)
      x.imageSmoothingEnabled = true
      x.drawImage(off, 0, 0, w, w)
      for (const p of points) {
        x.fillStyle = p.t ? "#fff" : "#111114"
        x.strokeStyle = p.t ? "#1616e8" : "#fff"
        x.lineWidth = 1
        x.beginPath()
        x.arc(((p.x + 1) / 2) * w, ((p.y + 1) / 2) * w, 3.3, 0, 7)
        x.fill()
        x.stroke()
      }

      accuracy.current!.innerHTML = `${Math.round(acc * 100)}% <small>of points sorted correctly</small>`
      if (!hasLayers.current) {
        message.current!.textContent = "Right now it can only draw a straight line, and no straight line separates two rings."
      } else if (acc > 0.97) {
        solved.current = true
        message.current!.textContent = "There it is. Hidden neurons let it bend the line into a circle."
      } else if (!solved.current) {
        message.current!.textContent = "Training…"
      }
    })
  }, [])

  const add = (n: number) => setLayers((l) => (l.length >= MAX_LAYERS ? l : [...l, n]))

  function startDrag(e: React.PointerEvent<HTMLButtonElement>, n: number) {
    e.preventDefault()
    const button = e.currentTarget
    const sx = e.clientX, sy = e.clientY
    dragged.current = false
    const ghost = button.cloneNode(true) as HTMLElement
    ghost.classList.add("ghost")
    const place = (x: number, y: number) => {
      ghost.style.left = `${x - 40}px`
      ghost.style.top = `${y - 18}px`
    }
    const overRow = (x: number, y: number) => {
      const r = row.current!.getBoundingClientRect()
      return x > r.left - 12 && x < r.right + 12 && y > r.top - 16 && y < r.bottom + 16
    }
    const move = (ev: PointerEvent) => {
      if (!ghost.isConnected && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 5) document.body.appendChild(ghost)
      place(ev.clientX, ev.clientY)
      setHot(overRow(ev.clientX, ev.clientY))
    }
    const up = (ev: PointerEvent) => {
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      setHot(false)
      if (ghost.isConnected) {
        dragged.current = true
        ghost.remove()
        if (overRow(ev.clientX, ev.clientY)) add(n)
      }
    }
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
  }

  const blockClick = (n: number) => {
    if (dragged.current) dragged.current = false
    else add(n)
  }

  return (
    <div className="toy" id="net">
      <canvas ref={canvas} id="netC" />
      <div className="side">
        <div>
          <h3>Drag a block into the network</h3>
          <div className="tray">
            {[4, 8].map((n) => (
              <button
                key={n}
                className={`blk ${n === 8 ? "b8" : ""}`}
                onPointerDown={(e) => startDrag(e, n)}
                onClick={() => blockClick(n)}
              >
                {n} neurons
              </button>
            ))}
          </div>
        </div>
        <div ref={row} className={`row ${hot ? "hot" : ""}`}>
          <span className="blk fix">in</span>
          {layers.map((n, i) => (
            <button
              key={i}
              className={`blk ${n === 8 ? "b8" : ""}`}
              aria-label={`Remove ${n} neuron layer`}
              onClick={() => setLayers((l) => l.filter((_, k) => k !== i))}
            >
              {n}
            </button>
          ))}
          <span className="blk fix">out</span>
        </div>
        <div id="netAcc" ref={accuracy} />
        <div id="netMsg" ref={message} />
      </div>
    </div>
  )
}
