import { env } from "@/env/client"

import { Application } from "../app"

export const spendSplitterApp = {
  name: "Spend Splitter",
  icon: `https://sangonz193.github.io/spend-splitter/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  href: "https://sangonz193.github.io/spend-splitter",
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
