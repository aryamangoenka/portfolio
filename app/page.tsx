"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Menu } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import Editor from "@/components/Editor"
import Terminal from "@/components/Terminal"
import { FILES } from "@/lib/files"

export default function Page() {
  const [active, setActive] = useState<string>(FILES[0].id)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [termCollapsed, setTermCollapsed] = useState(false)
  const [clock, setClock] = useState("")

  const scrollRef = useRef<HTMLDivElement>(null)
  const intersecting = useRef<Set<string>>(new Set())

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    setActive(id)
    setSidebarOpen(false)
  }, [])

  return (
    <div className="app">
      <header className="titlebar">
        <button className="icon-btn menu-btn" onClick={() => setSidebarOpen((v) => !v)} aria-label="Toggle files">
          <Menu size={16} />
        </button>
        <span className="spacer" />
        <span className="clock">SF {clock || "--:--"}</span>
      </header>

      <div className="workbench">
        <Sidebar active={active} open={sidebarOpen} onOpen={goToFile} />
        <div className={`scrim${sidebarOpen ? " show" : ""}`} onClick={() => setSidebarOpen(false)} />

        <div className="main">
          <div className="editor-scroll" ref={scrollRef}>
            <Editor />
          </div>
          <Terminal
            collapsed={termCollapsed}
            onToggle={() => setTermCollapsed((v) => !v)}
            onOpenFile={goToFile}
          />
        </div>
      </div>
    </div>
  )
}
