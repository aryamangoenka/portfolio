import type { ComponentType } from "react"
import { EMAIL, EXPERIENCE, FLIGHT, GITHUB, HEADLINE, INTRO, LINKEDIN, PROJECTS, type Project, type ProjectId } from "@/lib/content"
import { AssemblrMiner } from "@/components/toys/AssemblrMiner"
import { ColdBrewCamera } from "@/components/toys/ColdBrewCamera"
import { EmberCity } from "@/components/toys/EmberCity"
import { NeuroBlockNet } from "@/components/toys/NeuroBlockNet"
import { Portrait } from "@/components/toys/Portrait"
import { SentientDots } from "@/components/toys/SentientDots"
import { TraceAssertSlip } from "@/components/toys/TraceAssertSlip"

const TOYS: Record<ProjectId, ComponentType> = {
  ember: EmberCity,
  assemblr: AssemblrMiner,
  sentient: SentientDots,
  traceassert: TraceAssertSlip,
  coldbrew: ColdBrewCamera,
  neuroblock: NeuroBlockNet,
}

function ProjectSection({ project }: { project: Project }) {
  const Toy = TOYS[project.id]
  return (
    <section className="proj" id={project.id}>
      <div className="copy">
        <h2>{project.name}</h2>
        <div className="meta">
          {project.meta}
          {project.links?.map((link, i) => (
            <span key={link.href}>
              {project.meta || i > 0 ? " · " : ""}
              <a href={link.href}>{link.label}</a>
            </span>
          ))}
        </div>
        {project.paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {project.proof && <p className="proof">{project.proof}</p>}
      </div>
      <div>
        <Toy />
        <p className="cap">{project.caption}</p>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <>
      <nav>
        <div className="wrap">
          <b>
            <a href="#top">Aryaman Goenka</a>
          </b>
          <div>
            <a href="#work">Work</a>
            <a href="#experience">Experience</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header id="top" className="wrap">
        <div className="hero">
          <div className="intro">
            <h1>
              {HEADLINE.plain}
              <em>{HEADLINE.accent}</em>
            </h1>
            <p className="lede">{INTRO}</p>
            <div className="btns">
              <a className="btn solid" href="#work">
                See the work
              </a>
              <a className="btn" href={`mailto:${EMAIL}`}>
                Email me
              </a>
              <a className="btn" href={LINKEDIN}>
                LinkedIn
              </a>
            </div>
          </div>
          <Portrait />
        </div>
        <ul className="index" id="work">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                style={{ "--c": p.list.color, "--on": p.list.onColor ?? "#111" } as React.CSSProperties}
              >
                <b>{p.name}</b>
                <span>{p.list.what}</span>
                <span>{p.list.result}</span>
              </a>
            </li>
          ))}
        </ul>
      </header>

      <main className="wrap">
        {PROJECTS.map((p) => (
          <ProjectSection key={p.id} project={p} />
        ))}

        <section id="experience">
          <h2>Experience</h2>
          <div className="xp">
            {EXPERIENCE.map((e) => (
              <div key={e.org}>
                <b>{e.org}</b>
                <span>{e.role}</span>
                <p>{e.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="about">
          <div className="story">
            <h2>The flight</h2>
            <div>
              {FLIGHT.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="wrap">
          <h2>Say hi.</h2>
          <a className="mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="links">
            <a href={GITHUB}>GitHub</a>
            <a href={LINKEDIN}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  )
}
