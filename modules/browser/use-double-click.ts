import { useRef } from "react"

export const DOUBLE_CLICK_DELAY = 300

export function useDoubleClick() {
  const lastClickRef = useRef(0)

  return function isDoubleClick() {
    const now = Date.now()
    const diff = now - lastClickRef.current
    lastClickRef.current = now

    return diff < DOUBLE_CLICK_DELAY
  }
}
