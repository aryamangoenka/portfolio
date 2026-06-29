"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronUp, SquareTerminal } from "lucide-react"
import { run, complete } from "@/lib/commands"

type Entry =
  | { type: "cmd"; cwd: string; text: string }
  | { type: "out"; text: string; cls?: string }

const WELCOME: Entry[] = [
  { type: "out", text: "aryaman-goenka — interactive shell. © 2026", cls: "term-muted" },
  { type: "out", text: "type 'help' to explore, or 'sudo hire-me'. tab completes, ↑ recalls.", cls: "term-muted" },
  { type: "out", text: "" },
]

export default function Terminal({
  collapsed,
  onToggle,
  onOpenFile,
  onSetTheme,
}: {
  collapsed: boolean
  onToggle: () => void
  onOpenFile: (id: string) => void
  onSetTheme: (mode: "dark" | "light" | "toggle") => void
}) {
  const [entries, setEntries] = useState<Entry[]>(WELCOME)
  const [input, setInput] = useState("")
  const [cwd, setCwd] = useState("~")
  const [hist, setHist] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState<number | null>(null)

  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [entries, collapsed])

  const prompt = (c: string) => `aryaman@sf:${c === "~" ? "~" : "~/" + c}$`

  function submit() {
    const value = input
    const echo: Entry = { type: "cmd", cwd, text: value }
    const res = run(value, cwd)

    if (res.clear) {
      setEntries([])
    } else {
      const out: Entry[] = res.lines.map((l) => ({ type: "out", text: l.text, cls: l.cls }))
      setEntries((prev) => [...prev, echo, ...out])
    }

    if (res.cwd !== undefined) setCwd(res.cwd)
    if (res.openFile) onOpenFile(res.openFile)
    if (res.setTheme) onSetTheme(res.setTheme)

    if (value.trim()) setHist((prev) => [...prev, value])
    setHistIdx(null)
    setInput("")
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault()
      submit()
    } else if (e.key === "Tab") {
      e.preventDefault()
      setInput((v) => complete(v, cwd))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (hist.length === 0) return
      const idx = histIdx === null ? hist.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(idx)
      setInput(hist[idx])
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (histIdx === null) return
      const idx = histIdx + 1
      if (idx >= hist.length) {
        setHistIdx(null)
        setInput("")
      } else {
        setHistIdx(idx)
        setInput(hist[idx])
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setEntries([])
    }
  }

  return (
    <div className={`terminal${collapsed ? " collapsed" : ""}`}>
      <div className="term-bar" onClick={onToggle} role="button" aria-expanded={!collapsed}>
        <span className="tt">
          <SquareTerminal size={14} /> Terminal
        </span>
        <span className="term-muted" style={{ textTransform: "none", letterSpacing: 0 }}>
          bash
        </span>
        <span className="spacer" />
        <span className="term-muted">{collapsed ? "click to open · type help" : "click to collapse"}</span>
        {collapsed ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </div>

      <div
        className="term-body"
        ref={bodyRef}
        onClick={() => inputRef.current?.focus()}
      >
        {entries.map((e, i) =>
          e.type === "cmd" ? (
            <div className="term-line term-cmd" key={i}>
              <span className="prompt">{prompt(e.cwd)}</span> {e.text}
            </div>
          ) : (
            <div className={`term-line${e.cls ? " " + e.cls : ""}`} key={i}>
              {e.text || " "}
            </div>
          )
        )}

        <div className="term-input-row">
          <span className="prompt">{prompt(cwd)}</span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="terminal input"
          />
        </div>
      </div>
    </div>
  )
}
