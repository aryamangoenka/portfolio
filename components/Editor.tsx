"use client"

import { ArrowUpRight } from "lucide-react"
import { FILES, type FileNode } from "@/lib/files"
import { PROJECTS } from "@/lib/content"
import { Markdown } from "@/lib/highlight"
import Hero from "./Hero"
import { ExperienceView, StackView, AwardsView, AboutView, ContactView } from "./Views"

function ProjectView({ file }: { file: FileNode }) {
  const p = PROJECTS.find((x) => x.slug === file.slug)
  if (!p) return null
  return (
    <div className="doc">
      <div className="chips">
        {p.stack.map((s) => (
          <span className="chip" key={s}>
            {s}
          </span>
        ))}
      </div>
      <Markdown source={p.body} />
      {p.link && (
        <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
          {p.link.replace("https://", "")} <ArrowUpRight size={14} />
        </a>
      )}
    </div>
  )
}

function View({ file }: { file: FileNode }) {
  switch (file.view) {
    case "readme": return <Hero />
    case "project": return <ProjectView file={file} />
    case "experience": return <ExperienceView />
    case "stack": return <StackView />
    case "awards": return <AwardsView />
    case "about": return <AboutView />
    case "contact": return <ContactView />
  }
}

export default function Editor() {
  return (
    <>
      {FILES.map((file) => (
        <div className="filewrap" id={file.id} data-section={file.id} key={file.id}>
          <div className="section-head">
            <span>aryaman</span>
            <span className="crumb-sep">/</span>
            {file.dir && (
              <>
                <span>{file.dir}</span>
                <span className="crumb-sep">/</span>
              </>
            )}
            <b>{file.name}</b>
          </div>
          <div className="section">
            <View file={file} />
          </div>
        </div>
      ))}
      <div style={{ height: "28vh" }} aria-hidden />
    </>
  )
}
