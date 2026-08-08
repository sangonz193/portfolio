import { z } from "zod"

import { dataLoomApp } from "./data-loom/app"
import { harnessHubApp } from "./harness-hub/app"
import { meApp } from "./me/app"
import { openfingApp } from "./openfing/app"
import { appSchema } from "./schema"
import { secondSponsorApp } from "./second-sponsor/app"

export const applications: z.infer<typeof appSchema>[] = [
  meApp,
  secondSponsorApp,
  harnessHubApp,
  dataLoomApp,
  openfingApp,
]
