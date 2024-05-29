import { meApp } from "../me/app"
import { App } from "../schema"

export const vmApp = {
  id: "vm",
  name: "Virtual Machine",
  icon: meApp.icon,
  src: "https://sgonzalez.dev/os?vm=true",
  initialSize: {
    width: 1024,
    height: 768,
  },
} satisfies App
