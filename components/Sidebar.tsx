"use client"

import { useState } from "react"
import {
  BookText,
  FileCode,
  FileJson,
  FileText,
  SquareTerminal,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { TREE, type FileNode } from "@/lib/files"

function FileIcon({ icon }: { icon: string }) {
  const props = { size: 14, className: "fi" }
  switch (icon) {
    case "readme": return <BookText {...props} />
    case "ts": return <FileCode {...props} />
    case "json": return <FileJson {...props} />
    case "sh": return <SquareTerminal {...props} />
    default: return <FileText {...props} />
  }
}

function Row({
  node,
  active,
  level,
  onOpen,
}: {
  node: FileNode
  active: string
  level: 1 | 2
  onOpen: (id: string) => void
}) {
  return (
    <button
      className={`tree-row l${level}${active === node.id ? " active" : ""}`}
      onClick={() => onOpen(node.id)}
      aria-current={active === node.id ? "true" : undefined}
    >
      <FileIcon icon={node.icon} />
      <span className="fname">{node.name}</span>
    </button>
  )
}

export default function Sidebar({
  active,
  open,
  onOpen,
}: {
  active: string
  open: boolean
  onOpen: (id: string) => void
}) {
  const [foldersOpen, setFoldersOpen] = useState(true)

  return (
    <nav className={`sidebar${open ? " open" : ""}`} aria-label="Files">
      <div className="sb-head">explorer</div>
      <div className="sb-root">
        <FolderOpen size={14} className="fi" />
        <span>aryaman</span>
      </div>

      <div className="tree">
        {TREE.map((item) => {
          if (item.type === "file") {
            return <Row key={item.node.id} node={item.node} active={active} level={1} onOpen={onOpen} />
          }
          return (
            <div key={item.path}>
              <button
                className="tree-row l1 tree-folder"
                onClick={() => setFoldersOpen((v) => !v)}
                aria-expanded={foldersOpen}
              >
                {foldersOpen ? <ChevronDown size={13} className="fi" /> : <ChevronRight size={13} className="fi" />}
                {foldersOpen ? <FolderOpen size={14} className="fi" /> : <Folder size={14} className="fi" />}
                <span className="fname">{item.name}</span>
              </button>
              {foldersOpen &&
                item.children.map((child) => (
                  <Row key={child.id} node={child} active={active} level={2} onOpen={onOpen} />
                ))}
            </div>
          )
        })}
      </div>

      <div className="sb-hint">
        click a file, or scroll. the terminal below works. type <kbd>help</kbd>.
      </div>
    </nav>
  )
}
