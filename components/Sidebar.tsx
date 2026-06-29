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
  nested,
  onOpen,
}: {
  node: FileNode
  active: string
  nested?: boolean
  onOpen: (id: string) => void
}) {
  return (
    <button
      className={`tree-row${nested ? " nested" : ""}${active === node.id ? " active" : ""}`}
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
      <div className="sb-head">
        <span>Explorer</span>
      </div>
      <div className="sb-root">
        <FolderOpen size={14} className="fi" />
        <span>aryaman/</span>
      </div>

      <div className="tree">
        {TREE.map((item, i) => {
          if (item.type === "file") {
            return <Row key={item.node.id} node={item.node} active={active} nested onOpen={onOpen} />
          }
          return (
            <div key={item.path}>
              <button
                className="tree-row nested tree-folder"
                onClick={() => setFoldersOpen((v) => !v)}
                aria-expanded={foldersOpen}
              >
                {foldersOpen ? <ChevronDown size={13} className="fi" /> : <ChevronRight size={13} className="fi" />}
                {foldersOpen ? <FolderOpen size={14} className="fi" /> : <Folder size={14} className="fi" />}
                <span className="fname">{item.name}/</span>
              </button>
              {foldersOpen &&
                item.children.map((child) => (
                  <Row
                    key={child.id}
                    node={child}
                    active={active}
                    nested
                    onOpen={onOpen}
                  />
                ))}
            </div>
          )
        })}
      </div>

      <div className="sb-hint">
        <kbd>↑</kbd> click a file, or just scroll. <br />
        try the <kbd>terminal</kbd> below — type <kbd>help</kbd>.
      </div>
    </nav>
  )
}
