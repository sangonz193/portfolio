import { Metadata } from "next"

import { OS } from "@/modules/os/os"

export const metadata: Metadata = {
  title: "Santiago's OS",
  robots: { index: false, follow: true },
}

export default OS
