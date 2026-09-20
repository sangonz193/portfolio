import "./globals.css"
import "./reset.css"

import { Analytics } from "@vercel/analytics/react"
import { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/cn"
import { siteInfo } from "@/modules/info/site"
import { MousePositionListener } from "@/modules/mouse-position/listener"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(siteInfo.url),
  title: {
    default: siteInfo.title,
    template: `%s · ${siteInfo.name}`,
  },
  description: siteInfo.description,
  openGraph: {
    type: "website",
    siteName: siteInfo.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0f15",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full")}>
        <MousePositionListener />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
