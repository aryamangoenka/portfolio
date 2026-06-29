"use client"

import { ArrowUpRight } from "lucide-react"
import { FILES } from "@/lib/files"
import { PROJECTS } from "@/lib/content"
import { CodeBlock, Markdown } from "@/lib/highlight"
import Hero from "./Hero"

function projectFor(id: string) {
  return PROJECTS.find((p) => `projects/${p.slug}.md` === id)
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
            {file.kind === "hero" && <Hero />}

            {file.kind === "code" && <CodeBlock code={file.code!} lang={file.lang} />}

            {file.kind === "markdown" &&
              (() => {
                const p = projectFor(file.id)
                return (
                  <>
                    {p && (
                      <div className="project-meta">
                        {p.stack.map((s) => (
                          <span className="chip" key={s}>
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    <Markdown source={file.md!} />
                    {p?.link && (
                      <a className="project-link" href={p.link} target="_blank" rel="noreferrer">
                        {p.link.replace("https://", "")} <ArrowUpRight size={14} />
                      </a>
                    )}
                  </>
                )
              })()}
          </div>
        </div>
      ))}
      <div style={{ height: "30vh" }} aria-hidden />
    </>
  )
}
