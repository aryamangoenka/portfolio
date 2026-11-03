import type { Metadata } from "next"
import { Bricolage_Grotesque, JetBrains_Mono, Newsreader } from "next/font/google"
import "./globals.css"

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-display",
  display: "swap",
})
const serif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
})
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
})

const title = "Aryaman Goenka"
const description =
  "I build AI that does real work, and tools that check what it really did. Every project on this site has something you can play with."

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: "Aryaman Goenka" }],
  openGraph: { title, description, type: "website", siteName: title },
  twitter: { card: "summary", title, description, creator: "@goenka_aryaman" },
  metadataBase: new URL("https://aryamangoenka.com"),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
