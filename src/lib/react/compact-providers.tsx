import React from "react";
import { withWrappers } from "./with-wrappers";

export function compactProviders(wrappers: React.FC<object>[]) {
  const copy = [...wrappers];
  const last = copy.pop()!;

  return withWrappers(copy, last);
}
