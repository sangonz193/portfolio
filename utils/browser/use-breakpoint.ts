import { useMediaQuery } from "./use-media-query"

export type Breakpoint = keyof typeof screens

const screens = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const

export function useBreakpoint(breakpoint: Breakpoint, initialValue = false) {
  const match = useMediaQuery(
    `(min-width: ${screens[breakpoint]}px)`,
    initialValue,
  )
  return match
}
