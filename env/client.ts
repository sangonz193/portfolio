import { z } from "zod"

const ENV_VARIABLES = ["NEXT_PUBLIC_ICON_QUERY_PARAM"] as const

export const env = z
  .object({
    NEXT_PUBLIC_ICON_QUERY_PARAM: z.string().default(""),
  } satisfies Record<(typeof ENV_VARIABLES)[number], any>)
  .parse({
    NEXT_PUBLIC_ICON_QUERY_PARAM: process.env.NEXT_PUBLIC_ICON_QUERY_PARAM,
  } satisfies Record<(typeof ENV_VARIABLES)[number], any>)
