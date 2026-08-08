import { HarnessHubIcon } from "../app-icon"
import { App } from "../schema"

export const harnessHubApp = {
  id: "harness-hub",
  name: "Harness Hub",
  icon: { type: "component", component: HarnessHubIcon },
  src: "/work/harness-hub?window=true",
  initialSize: {
    width: 760,
    height: 780,
  },
} satisfies App
