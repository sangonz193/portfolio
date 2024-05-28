import { env } from "@/env/client"

import { Application } from "../app"

export const meApp = {
  name: "me",
  icon: `https://sgonzalez.dev/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  href: "/me?window=true",
} satisfies Application
