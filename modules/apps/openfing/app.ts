import { OpenFingIcon } from "../app-icon"
import { App } from "../schema"

export const openfingApp = {
  id: "openfing",
  name: "OpenFING",
  icon: { type: "component", component: OpenFingIcon },
  src: "/work/openfing?window=true",
  initialSize: {
    width: 760,
    height: 780,
  },
} satisfies App
