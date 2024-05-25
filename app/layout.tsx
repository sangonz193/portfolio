import "./globals.css"
import "./reset.css"

import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"

import { cn } from "@/lib/cn"
import { MousePositionListener } from "@/modules/mouse-position/listener"


const inter = Inter({ subsets: ["latin"] })

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
