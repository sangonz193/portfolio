import "./globals.css";
import "./reset.css";

import { MousePositionListener } from "@/modules/mouse-position/listener";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MousePositionListener />
        {children}
      </body>
    </html>
  );
}
