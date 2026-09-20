import { Metadata } from "next"

import { MeDocument } from "@/modules/me/me-document"
import { OsBoot } from "@/modules/os/boot"

export const metadata: Metadata = {
  title: "Santiago González",
  description:
    "CTO and hands-on architect working across AI, mobile, web, and infrastructure.",
  alternates: { canonical: "/" },
}

export default function Page() {
  return (
    <>
      <noscript>
        <style>{`.os-boot-splash { display: none }`}</style>
      </noscript>
      <OsBoot>
        <MeDocument insideWindow={false} />
      </OsBoot>
    </>
  )
}
