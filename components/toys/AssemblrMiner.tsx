"use client"

import { useEffect, useRef, useState } from "react"
import { prefersReducedMotion, monoFont, sized, whileVisible } from "@/lib/toy"

// Find a repeated habit in four weeks of made-up activity, then run it as one agent.
const LANES = ["GitHub", "Slack", "Linear"]
const WEEKS = 4
const RITUALS: { name: string; at: number; steps: [number, string][] }[] = [
  {
    name: "The Friday release note",
    at: 0.68,
    steps: [[0, "Collect the week’s merged pull requests"], [2, "Match them to Linear tickets"], [1, "Post the notes in Slack"]],
  },
  {
    name: "The Monday triage",
    at: 0.08,
    steps: [[2, "Pull in new Linear tickets"], [0, "Link the related GitHub issues"], [1, "Send the summary to Slack"]],
  },
  {
    name: "The stale review nudge",
    at: 0.38,
    steps: [[0, "Find pull requests waiting on review"], [2, "Check their Linear tickets"], [1, "Nudge the reviewers in Slack"]],
  },
]

type Dot = { x: number; l: number }

function scatter(ritual: number) {
  return {
    noise: Array.from({ length: 62 }, (): Dot => ({ x: Math.random(), l: Math.floor(Math.random() * 3) })),
    hits: Array.from({ length: WEEKS }, (_, w) =>
      RITUALS[ritual].steps.map(([l], i): Dot => ({ l, x: (w + RITUALS[ritual].at + i * 0.07 + Math.random() * 0.015) / WEEKS })),
    ),
  }
}

export function AssemblrMiner() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [ritual, setRitual] = useState(0)
  const [found, setFound] = useState(false)
  const [done, setDone] = useState(0)
  const scene = useRef<ReturnType<typeof scatter> | null>(null)
  const want = useRef(0)
  const progress = useRef(0)
  const timers = useRef<number[]>([])

  const clearTimers = () => {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
  }

  useEffect(() => {
    const c = canvas.current!
    const reduced = prefersReducedMotion()
    const font = `600 13px ${monoFont()}`
    scene.current = scatter(0)
    const ink = "#140702"

    const stop = whileVisible(c, () => {
      progress.current += (want.current - progress.current) * (reduced ? 1 : 0.06)
      const p = progress.current
      const { x, w, h } = sized(c)
      const left = 66, top = 30, W = w - left - 14, laneH = (h - top - 12) / 3
      const X = (v: number) => left + v * W
      const Y = (l: number) => top + laneH * (l + 0.5)

      x.clearRect(0, 0, w, h)
      x.font = font
      x.textBaseline = "middle"
      x.lineWidth = 1
      LANES.forEach((name, l) => {
        x.fillStyle = ink
        x.fillText(name, 10, Y(l))
        x.strokeStyle = "rgba(20,7,2,.25)"
        x.beginPath()
        x.moveTo(left, Y(l))
        x.lineTo(w - 14, Y(l))
        x.stroke()
      })
      for (let i = 0; i < WEEKS; i++) {
        x.fillStyle = ink
        x.fillText(`week ${i + 1}`, X(i / WEEKS) + 4, 15)
        x.strokeStyle = "rgba(20,7,2,.16)"
        x.beginPath()
        x.moveTo(X(i / WEEKS), 24)
        x.lineTo(X(i / WEEKS), h - 8)
        x.stroke()
      }

      const { noise, hits } = scene.current!
      x.fillStyle = `rgba(20,7,2,${0.78 - p * 0.6})`
      for (const n of noise) {
        x.beginPath()
        x.arc(X(n.x), Y(n.l), 4.2, 0, 7)
        x.fill()
      }
      for (const week of hits) {
        x.strokeStyle = `rgba(255,255,255,${p})`
        x.lineWidth = 3.5
        x.lineJoin = "round"
        x.beginPath()
        week.forEach((d, i) => (i ? x.lineTo(X(d.x), Y(d.l)) : x.moveTo(X(d.x), Y(d.l))))
        x.stroke()
        for (const d of week) {
          x.fillStyle = p > 0.5 ? "#fff" : ink
          x.beginPath()
          x.arc(X(d.x), Y(d.l), 4.2 + p * 3.4, 0, 7)
          x.fill()
          if (p > 0.5) {
            x.strokeStyle = ink
            x.lineWidth = 1.5
            x.stroke()
          }
        }
      }
    })

    return () => {
      stop()
      clearTimers()
    }
  }, [])

  function toggle() {
    clearTimers()
    setDone(0)
    if (!found) {
      want.current = 1
      setFound(true)
    } else {
      want.current = 0
      progress.current = 0
      const next = (ritual + 1) % RITUALS.length
      scene.current = scatter(next)
      setRitual(next)
      setFound(false)
    }
  }

  function run() {
    clearTimers()
    setDone(0)
    const reduced = prefersReducedMotion()
    RITUALS[ritual].steps.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setDone(i + 1), reduced ? 0 : 350 + i * 520))
    })
  }

  return (
    <div className="toy" id="miner">
      <canvas ref={canvas} id="mine" style={{ aspectRatio: "7/4" }} />
      <div id="agent" className={found ? "on" : ""}>
        <b>{RITUALS[ritual].name}</b>
        {RITUALS[ritual].steps.map(([, text], i) => (
          <div key={text} className={i < done ? "done" : ""}>
            <i>{i < done ? "✓" : ""}</i>
            {text}
          </div>
        ))}
      </div>
      <div className="tbtns">
        <button onClick={toggle}>{found ? "Find another" : "Find the ritual"}</button>
        {found && (
          <button className="alt" onClick={run}>
            Run the agent
          </button>
        )}
      </div>
    </div>
  )
}
