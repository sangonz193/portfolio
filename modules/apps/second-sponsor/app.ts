import { SecondSponsorIcon } from "../app-icon"
import { App } from "../schema"

export const secondSponsorApp = {
  id: "second-sponsor",
  name: "Second Sponsor",
  icon: { type: "component", component: SecondSponsorIcon },
  src: "/work/second-sponsor?window=true",
  initialSize: {
    width: 760,
    height: 780,
  },
} satisfies App
