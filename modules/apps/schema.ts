import { z } from "zod"

import { windowConfigSchema, windowIconSchema } from "../windows/window-config"

export const appSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: windowIconSchema,
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
