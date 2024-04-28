export const RESIZE_HANDLES = [
  "n",
  "s",
  "w",
  "e",
  "ne",
  "se",
  "sw",
  "nw",
] as const;

export type ResizeHandleType = (typeof RESIZE_HANDLES)[number];
