import { InfoWindow } from "@/components/info-window/info-window"
import { env } from "@/env/client"

import { App } from "../schema"

export const dataLoomApp = {
  id: "data-loom",
  name: "Data Loom",
  icon: `https://data-loom-portfolio.sgonzalez.dev/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  src: "https://data-loom-portfolio.sgonzalez.dev",
  infoWindow: {
    id: "data-loom-info",
    name: "Data Loom - Info",
    icon: {
      type: "url",
      src: `https://data-loom-portfolio.sgonzalez.dev/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
    },
    content: {
      type: "component",
      component: InfoWindow.bind(null, { appId: "data-loom" }),
    },
    minSize: { width: 300, height: 400 },
  },
  initialSize: {
    width: 1024,
    height: 768,
  },
} satisfies App
