"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Menu, Sun, Moon } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import Editor from "@/components/Editor"
import Terminal from "@/components/Terminal"
import { FILES, getFile } from "@/lib/files"

type Theme = "light" | "dark"

export default function Page() {
  const [active, setActive] = useState<string>(FILES[0].id)
  const [theme, setTheme] = useState<Theme>("light")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [termCollapsed, setTermCollapsed] = useState(false)
  const [clock, setClock] = useState("")

  const scrollRef = useRef<HTMLDivElement>(null)
  const intersecting = useRef<Set<string>>(new Set())

  // theme: load + persist
  useEffect(() => {
    const saved = (typeof localStorage !== "undefined" && localStorage.getItem("theme")) as Theme | null
    if (saved === "dark" || saved === "light") setTheme(saved)
  }, [])
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  // SF clock
  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Los_Angeles",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      )
    }
    tick()
    const id = setInterval(tick, 30_000)
    return () => clearInterval(id)
  }, [])

  // scroll-spy → active file
  useEffect(() => {
    const root = scrollRef.current
    if (!root) return
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-section]"))
    const order = FILES.map((f) => f.id)
    const obs = new IntersectionObserver(
      (records) => {
        records.forEach((r) => {
          const id = (r.target as HTMLElement).dataset.section!
          if (r.isIntersecting) intersecting.current.add(id)
          else intersecting.current.delete(id)
        })
        const top = order.find((id) => intersecting.current.has(id))
        if (top) setActive(top)
      },
      { root, rootMargin: "-6% 0px -85% 0px", threshold: 0 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const goToFile = useCallback((id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: "smooth", block: "start" })
    setActive(id)
    setSidebarOpen(false)
  }, [])

  const setThemeMode = useCallback((mode: "light" | "dark" | "toggle") => {
    setTheme((t) => (mode === "toggle" ? (t === "light" ? "dark" : "light") : mode))
  }, [])

  const activeNode = getFile(active)

  return (
    <div className="app">
      {/* title bar */}
      <header className="titlebar">
        <button className="icon-btn menu-btn" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle files">
          <Menu size={16} />
        </button>
        <div className="lights" aria-hidden>
          <span className="light r" />
          <span className="light y" />
          <span className="light g" />
        </div>
        <div className="file-crumb">
          aryaman
          <span style={{ opacity: 0.5 }}>/</span>
          {activeNode?.dir && (
            <>
              {activeNode.dir}
              <span style={{ opacity: 0.5 }}>/</span>
            </>
          )}
          <b>{activeNode?.name}</b>
        </div>
        <div className="right">
          <span className="clock">SF {clock || "--:--"}</span>
          <button
            className="icon-btn"
            onClick={() => setThemeMode("toggle")}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>
      </header>

      {/* workbench */}
      <div className="workbench">
        <Sidebar active={active} open={sidebarOpen} onOpen={goToFile} />
        <div className={`scrim${sidebarOpen ? " show" : ""}`} onClick={() => setSidebarOpen(false)} />

        <div className="main">
          <div className="editor-scroll grain" ref={scrollRef}>
            <Editor />
          </div>
          <Terminal
            collapsed={termCollapsed}
            onToggle={() => setTermCollapsed((v) => !v)}
            onOpenFile={goToFile}
            onSetTheme={setThemeMode}
          />
        </div>
      </div>

      {/* status bar */}
      <footer className="statusbar">
        <span className="si">
          <span className="pulse" /> Building Assemblr
        </span>
        <span className="si">main</span>
        <span className="si">UMass &apos;28</span>
        <span className="spacer" />
        <span className="si">open to chats ↗</span>
        <span className="si">UTF-8</span>
        <span className="si">{activeNode?.lang.toUpperCase()}</span>
      </footer>
    </div>
  )
}
