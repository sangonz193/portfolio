import { env } from "@/env/client"

import { App } from "../schema"

export const spendSplitterApp = {
  id: "spend-splitter",
  name: "Spend Splitter",
  icon: `https://sangonz193.github.io/spend-splitter/icon.svg?${env.NEXT_PUBLIC_ICON_QUERY_PARAM}`,
  src: "https://sangonz193.github.io/spend-splitter",
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
} satisfies App
