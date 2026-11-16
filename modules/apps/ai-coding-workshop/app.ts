import { env } from "@/env/client"

import { App } from "../schema"

export const aiCodingWorkshopApp = {
  id: "ai-coding-workshop",
  name: "AI Coding Workshop",
  icon: {
    type: "url",
    src: `https://ai-coding-workshop.sgonzalez.dev/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  },
  src: "https://ai-coding-workshop.sgonzalez.dev/",
  initialSize: { width: 960, height: 600 },
} satisfies App
