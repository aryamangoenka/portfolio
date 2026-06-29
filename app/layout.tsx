import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const title = "Aryaman Goenka, Founder · Agentic AI"
const description =
  "20-year-old founder building agentic AI. 1st of 1,000+ at HF0, agentic NLP at ASAPP (10K conversations at 95-100%), MIT Break Through Tech AI Fellow, published research. Building Assemblr at Founders, Inc."

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Aryaman Goenka" }],
  keywords: [
    "Aryaman Goenka",
    "agentic AI",
    "LLM engineer",
    "founder",
    "Assemblr",
    "Founders Inc",
    "UMass Amherst",
  ],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Aryaman Goenka",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@goenka_aryaman",
  },
  metadataBase: new URL("https://aryamangoenka.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mono.variable}>
      <body>{children}</body>
    </html>
  )
}
