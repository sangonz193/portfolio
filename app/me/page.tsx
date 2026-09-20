import { Metadata } from "next"

import { MeDocument } from "@/modules/me/me-document"

export const metadata: Metadata = {
  title: "Santiago González",
  description:
    "CTO and hands-on architect working across AI, mobile, web, and infrastructure.",
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
