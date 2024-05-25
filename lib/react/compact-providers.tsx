import React, { PropsWithChildren } from "react"

import { withWrappers } from "./with-wrappers"

export function compactProviders(wrappers: React.FC<PropsWithChildren>[]) {
  const copy = [...wrappers]
  const last = copy.pop()!

  return withWrappers(copy, last)
}
