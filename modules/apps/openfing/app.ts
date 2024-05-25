import { env } from "@/env/client"

import { Application } from "../app"

export const openfingApp = {
  name: "OpenFING",
  icon: `https://openfing.sgonzalez.dev/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  href: "https://openfing.sgonzalez.dev",
  // infoWindow: {
  //   id: "spend-splitter-info",
  //   name: "Spend Splitter Info",
  //   icon: {
  //     type: "url",
  //     src: "https://sangonz193.github.io/spend-splitter/vite.svg",
  //   },
  //   content: {
  //     type: "component",
  //     component: DataLoomInfoWindow,
  //   },
  //   minSize: { width: 300, height: 400 },
  // },
} satisfies Application
