import { MeIcon } from "../app-icon"
import { App } from "../schema"

export const meApp = {
  id: "me",
  name: "Me",
  icon: { type: "component", component: MeIcon },
  src: "/me?window=true",
  initialSize: {
    width: 680,
    height: 780,
  },
} satisfies App
