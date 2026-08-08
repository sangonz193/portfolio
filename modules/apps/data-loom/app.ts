import { DataLoomIcon } from "../app-icon"
import { App } from "../schema"

export const dataLoomApp = {
  id: "data-loom",
  name: "Data Loom",
  icon: { type: "component", component: DataLoomIcon },
  src: "/work/data-loom?window=true",
  initialSize: {
    width: 760,
    height: 780,
  },
} satisfies App
