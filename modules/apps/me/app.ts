import { App } from "../schema"

export const meApp = {
  id: "me",
  name: "Me",
  icon: "/icon.svg",
  src: "/me?window=true",
  initialSize: {
    width: 542,
    height: 850,
  },
} satisfies App
