import { FolderIcon } from "@/modules/files/icons"

import { App } from "../schema"

export const workApp = {
  id: "work",
  name: "Work",
  icon: { type: "component", component: FolderIcon },
  src: "/os?path=%2FWork",
  initialSize: { width: 760, height: 560 },
} satisfies App
