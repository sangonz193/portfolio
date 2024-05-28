import { InfoWindow } from "@/components/info-window/info-window"
import { env } from "@/env/client"

import { Application } from "../app"

export const openfingApp = {
  name: "OpenFING",
  icon: `https://openfing.sgonzalez.dev/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  href: "https://openfing.sgonzalez.dev",
  infoWindow: {
    id: "openfing-info",
    name: "OpenFING - Info",
    icon: {
      type: "url",
      src: "https://openfing.sgonzalez.dev/icon.svg",
    },
    content: {
      type: "component",
      component: InfoWindow.bind(null, { appId: "openfing" }),
    },
    minSize: { width: 300, height: 400 },
  },
} satisfies Application
