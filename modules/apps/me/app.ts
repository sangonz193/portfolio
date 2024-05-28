import { env } from "@/env/client"

import { App } from "../schema"

export const meApp = {
  id: "me",
  name: "Me",
  icon: `https://sgonzalez.dev/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  src: "/me?window=true",
} satisfies App
