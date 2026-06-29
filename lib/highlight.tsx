"use client"

import React from "react"

// ─── tiny zero-dependency tokenizer ─────────────────────────────────────────
// Sticky-regex scanner: at each position, try rules in order, emit the first
// anchored match. Falls back to a single plain char so it can never loop.

type Rule = { type: string; re: RegExp }
type Token = { type: string; value: string }

function tokenize(src: string, rules: Rule[]): Token[] {
  const out: Token[] = []
  let pos = 0
  scan: while (pos < src.length) {
    for (const r of rules) {
      r.re.lastIndex = pos
      const m = r.re.exec(src)
      if (m && m.index === pos && m[0].length > 0) {
        out.push({ type: r.type, value: m[0] })
        pos += m[0].length
        continue scan
      }
    }
    out.push({ type: "plain", value: src[pos] })
    pos += 1
  }
  return out
}

const TS_RULES: Rule[] = [
  { type: "comment", re: /\/\/[^\n]*/y },
  { type: "comment", re: /\/\*[\s\S]*?\*\//y },
  { type: "string", re: /`(?:\\.|[^`\\])*`/y },
  { type: "string", re: /"(?:\\.|[^"\\])*"/y },
  { type: "string", re: /'(?:\\.|[^'\\])*'/y },
  { type: "number", re: /\b\d[\d_]*(?:\.\d+)?\b/y },
  {
    type: "keyword",
    re: /\b(?:const|let|var|function|return|import|export|from|type|interface|as|new|class|extends|implements|async|await|if|else|for|while|of|in|this|default|typeof|readonly)\b/y,
  },
  { type: "boolean", re: /\b(?:true|false|null|undefined)\b/y },
  { type: "property", re: /[A-Za-z_$][\w$]*(?=\s*:)/y },
  { type: "function", re: /[A-Za-z_$][\w$]*(?=\s*\()/y },
  { type: "punctuation", re: /[{}[\]()<>;,.:=+\-*/%!&|?@]/y },
  { type: "plain", re: /[A-Za-z_$][\w$]*/y },
  { type: "space", re: /\s+/y },
]

const JSON_RULES: Rule[] = [
  { type: "property", re: /"(?:\\.|[^"\\])*"(?=\s*:)/y },
  { type: "string", re: /"(?:\\.|[^"\\])*"/y },
  { type: "number", re: /-?\b\d[\d_]*(?:\.\d+)?\b/y },
  { type: "boolean", re: /\b(?:true|false|null)\b/y },
  { type: "punctuation", re: /[{}[\],:]/y },
  { type: "space", re: /\s+/y },
]

const BASH_RULES: Rule[] = [
  { type: "comment", re: /#[^\n]*/y },
  { type: "string", re: /"(?:\\.|[^"\\])*"/y },
  { type: "string", re: /'[^']*'/y },
  { type: "keyword", re: /\b(?:echo|export|cd|ls|cat|open|sudo|then|else|elif|fi|for|do|done|if|while)\b/y },
  { type: "variable", re: /\$\{?[A-Za-z_][\w]*\}?/y },
  { type: "punctuation", re: /[=|&><;()]/y },
  { type: "space", re: /\s+/y },
  { type: "plain", re: /[^\s=|&><;()#"'$]+/y },
]

function rulesFor(lang: string): Rule[] {
  if (lang === "json") return JSON_RULES
  if (lang === "bash" || lang === "sh") return BASH_RULES
  return TS_RULES
}

// Split tokens into lines so we can render a gutter with line numbers.
function toLines(tokens: Token[]): Token[][] {
  const lines: Token[][] = [[]]
  for (const t of tokens) {
    const parts = t.value.split("\n")
    parts.forEach((part, i) => {
      if (i > 0) lines.push([])
      if (part.length) lines[lines.length - 1].push({ type: t.type, value: part })
    })
  }
  return lines
}

export function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const lines = toLines(tokenize(code.replace(/\n$/, ""), rulesFor(lang)))
  return (
    <div className="code-block" aria-label={`${lang} source`}>
      {lines.map((line, i) => (
        <div className="code-line" key={i}>
          <span className="ln" aria-hidden>
            {i + 1}
          </span>
          <span className="lc">
            {line.length === 0 ? (
              "​"
            ) : (
              line.map((t, j) => (
                <span className={`tok-${t.type}`} key={j}>
                  {t.value}
                </span>
              ))
            )}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── minimal markdown renderer (headings, lists, quotes, hr, inline) ─────────

function inline(text: string, keyBase: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  const re = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)]+)\))/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[2] !== undefined) {
      nodes.push(<strong key={`${keyBase}-b${k}`}>{m[2]}</strong>)
    } else if (m[4] !== undefined) {
      nodes.push(
        <code className="md-code" key={`${keyBase}-c${k}`}>
          {m[4]}
        </code>
      )
    } else if (m[6] !== undefined) {
      nodes.push(
        <a
          className="md-link"
          href={m[7]}
          target={m[7]?.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          key={`${keyBase}-a${k}`}
        >
          {m[6]}
        </a>
      )
    }
    last = m.index + m[0].length
    k += 1
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n/g, "\n").split("\n")
  const blocks: React.ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === "") {
      i += 1
      continue
    }
    if (/^---+$/.test(line.trim())) {
      blocks.push(<hr className="md-hr" key={key++} />)
      i += 1
      continue
    }
    const h = /^(#{1,4})\s+(.*)$/.exec(line)
    if (h) {
      const level = h[1].length
      const content = inline(h[2], `h${key}`)
      const cls = `md-h${level}`
      blocks.push(
        level === 1 ? (
          <h1 className={cls} key={key++}>{content}</h1>
        ) : level === 2 ? (
          <h2 className={cls} key={key++}>{content}</h2>
        ) : level === 3 ? (
          <h3 className={cls} key={key++}>{content}</h3>
        ) : (
          <h4 className={cls} key={key++}>{content}</h4>
        )
      )
      i += 1
      continue
    }
    if (/^>\s?/.test(line)) {
      const buf: string[] = []
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""))
        i += 1
      }
      blocks.push(
        <blockquote className="md-quote" key={key++}>
          {inline(buf.join(" "), `q${key}`)}
        </blockquote>
      )
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        let item = lines[i].replace(/^[-*]\s+/, "")
        i += 1
        // fold wrapped continuation lines (indented, not a new block)
        while (i < lines.length && /^\s{2,}\S/.test(lines[i]) && !/^[-*]\s+/.test(lines[i].trim())) {
          item += " " + lines[i].trim()
          i += 1
        }
        items.push(item)
      }
      blocks.push(
        <ul className="md-ul" key={key++}>
          {items.map((it, j) => (
            <li key={j}>{inline(it, `li${key}-${j}`)}</li>
          ))}
        </ul>
      )
      continue
    }
    // paragraph: gather consecutive plain lines
    const para: string[] = []
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^(#{1,4})\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[-*]\s+/.test(lines[i]) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      para.push(lines[i])
      i += 1
    }
    blocks.push(
      <p className="md-p" key={key++}>
        {inline(para.join(" "), `p${key}`)}
      </p>
    )
  }

  return <div className="markdown">{blocks}</div>
}
