import { cn } from "@/lib/cn";
import "./globals.css";
import "./reset.css";

import { MousePositionListener } from "@/modules/mouse-position/listener";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "h-full")}>
        <MousePositionListener />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
