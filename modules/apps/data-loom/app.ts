import { InfoWindow } from "@/components/info-window/info-window"
import { Application } from "../app"

export const dataLoomApp = {
  name: "Data Loom",
  icon: "https://data-loom-portfolio.sgonzalez.dev/favicon.ico",
  href: "https://data-loom-portfolio.sgonzalez.dev",
  infoWindow: {
    id: "data-loom-info",
    name: "Data Loom - Info",
    icon: {
      type: "url",
      src: "https://data-loom-portfolio.sgonzalez.dev/favicon.ico",
    },
    content: {
      type: "component",
      component: InfoWindow.bind(null, { appId: "data-loom" }),
    },
    minSize: { width: 300, height: 400 },
  },
} satisfies Application
