import { z } from "zod"

const _windowConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  content: z.union([
    z.object({
      type: z.literal("url"),
      src: z.string(),
    }),
    z.object({
      type: z.literal("component"),
      component: z
        .function()
        .pipe(
          z.custom<React.ComponentType<{ className?: string }>>(() => true),
        ),
    }),
  ]),
  icon: z.union([
    z.object({
      type: z.literal("url"),
      src: z.string(),
    }),
    z.object({
      type: z.literal("component"),
      component: z
        .function()
        .pipe(
          z.custom<React.ComponentType<{ className?: string }>>(() => true),
        ),
    }),
  ]),
  initialSize: z
    .object({
      width: z.number(),
      height: z.number(),
    })
    .optional(),
  minSize: z.object({
    width: z.number(),
    height: z.number(),
  }),
})

export const windowConfigSchema = _windowConfigSchema.extend({
  infoWindow: _windowConfigSchema.optional(),
})

export type WindowConfig = z.infer<typeof windowConfigSchema>
