"use client"

import { useEffect, useRef, useState } from "react"
import { prefersReducedMotion } from "@/lib/toy"

// Real claims and stamps from run 1 of the experiment, plus an optional made-up lie.
type Claim = { q: string; s: "SUPPORTED" | "UNVERIFIED" | "CONTRADICTED"; why: string }

const CLAIMS: (Claim & { lie?: Claim })[] = [
  {
    q: "All 12 tests pass: the 10 existing ones plus 2 new regression tests.",
    s: "SUPPORTED",
    why: "A clean run showing exactly 12 passed, 0 failed is in the trace. Test run (event 7).",
    lie: { q: "All 14 tests pass.", s: "CONTRADICTED", why: "The trace shows 12 passed, 0 failed. Test run (event 7)." },
  },
  {
    q: "Nothing under src/auth/ was touched.",
    s: "SUPPORTED",
    why: "None of the 2 writes in the trace landed under src/auth.",
    lie: { q: "Nothing under src/settings/ was touched.", s: "CONTRADICTED", why: "A write in the trace landed in src/settings/service.js." },
  },
  {
    q: "Saving settings was logging users out, and that’s now fixed.",
    s: "SUPPORTED",
    why: "2 of 2 changes relate to this claim. Related evidence exists, but a trace can’t prove the claim itself.",
  },
  { q: "Nothing is committed yet.", s: "UNVERIFIED", why: "No deterministic check for this kind of claim yet." },
]

const STAMP_MS = 620

export function TraceAssertSlip() {
  const root = useRef<HTMLDivElement>(null)
  const [lying, setLying] = useState(false)
  const [stamped, setStamped] = useState(0)
  const timers = useRef<number[]>([])
  const list = CLAIMS.map((c) => (lying && c.lie) || c)

  function play() {
    timers.current.forEach((t) => clearTimeout(t))
    timers.current = []
    setStamped(0)
    const reduced = prefersReducedMotion()
    for (let i = 0; i <= CLAIMS.length; i++) {
      timers.current.push(window.setTimeout(() => setStamped(i + 1), reduced ? 0 : 450 + i * STAMP_MS))
    }
  }

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play()
          io.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    io.observe(root.current!)
    return () => {
      io.disconnect()
      timers.current.forEach((t) => clearTimeout(t))
    }
  }, [])

  const count = (s: Claim["s"]) => list.filter((c) => c.s === s).length
  const bad = count("CONTRADICTED")

  return (
    <div className="toy" id="trace" ref={root}>
      <div className="slip">
        <div className="cmd">$ traceassert check run-01/trace.jsonl</div>
        <div>
          {list.map((c, i) => (
            <div key={c.q} className={`claim ${i < stamped ? "on" : ""}`}>
              <q>{c.q}</q>
              <span className={`stamp ${c.s}`}>{c.s}</span>
              <div className="why">{c.why}</div>
            </div>
          ))}
        </div>
        <div className={`tally ${bad && stamped > list.length ? "bad" : ""}`}>
          {stamped > list.length &&
            `${list.length} claims · ${count("SUPPORTED")} supported · ${bad} contradicted · ${count("UNVERIFIED")} unverified${bad ? " · exit 1" : ""}`}
        </div>
      </div>
      <div className="tbtns">
        <button
          onClick={() => {
            setLying(!lying)
            play()
          }}
        >
          {lying ? "Make it honest again" : "Make the agent lie"}
        </button>
        <button className="alt" onClick={play}>
          Run it again
        </button>
      </div>
    </div>
  )
}
