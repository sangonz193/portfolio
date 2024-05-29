import { z } from "zod"

import { windowConfigSchema } from "../windows/window-config"

export const appSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
  src: z.string(),
  infoWindow: windowConfigSchema.optional(),
  initialSize: z
    .object({
      width: z.number(),
      height: z.number(),
    })
    .optional(),
})

export type App = z.infer<typeof appSchema>
