import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

const title = "Aryaman Goenka, builder · agentic AI"
const description =
  "20-year-old builder pushing AI to the frontier. 1st at the HF0 AI hackathon (1 of 30 from 1,000+), agentic NLP at ASAPP (10K conversations at 95-100%), MIT Break Through Tech AI Fellow, LLM research accepted to ASN 2026."

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Aryaman Goenka" }],
  keywords: [
    "Aryaman Goenka",
    "builder",
    "agentic AI",
    "LLM evals",
    "AI engineer",
    "machine learning",
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
