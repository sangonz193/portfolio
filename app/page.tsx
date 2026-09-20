import { Metadata } from "next"

import { siteInfo } from "@/modules/info/site"
import { MeDocument } from "@/modules/me/me-document"
import { OsBoot } from "@/modules/os/boot"

export const metadata: Metadata = {
  title: { absolute: siteInfo.title },
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
