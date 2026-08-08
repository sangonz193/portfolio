import { z } from "zod"

import { meApp } from "./me/app"
import { appSchema } from "./schema"
import { workApp } from "./work/app"

export const applications: z.infer<typeof appSchema>[] = [
  meApp,
  workApp,
]
