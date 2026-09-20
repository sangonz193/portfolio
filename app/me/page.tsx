import { Metadata } from "next"

import { siteInfo } from "@/modules/info/site"
import { MeDocument } from "@/modules/me/me-document"

export const metadata: Metadata = {
  title: { absolute: siteInfo.title },
  alternates: { canonical: "/me" },
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ window?: string }>
}) {
  const insideWindow = (await searchParams).window === "true"
  return <MeDocument insideWindow={insideWindow} />
}
