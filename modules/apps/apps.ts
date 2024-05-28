import { z } from "zod"

import { dataLoomApp } from "./data-loom/app"
import { meApp } from "./me/app"
import { openfingApp } from "./openfing/app"
import { appSchema } from "./schema"

export const applications: z.infer<typeof appSchema>[] = [
  meApp,
  dataLoomApp,
  openfingApp,
]
