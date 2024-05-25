import { useEffect, useState } from "react"

import { WindowStore } from "../window-store"

export function useFrameAnimationClassName(window: WindowStore) {
  const [animationClass, setAnimationClass] = useState<
    | ""
    | "windowed-to-minimized"
    | "minimized-to-windowed"
    | "windowed-to-maximized"
    | "maximized-to-windowed"
    | "maximized-to-minimized"
    | "minimized-to-maximized"
  >("")

  const { minimized, maximized } = window
  useEffect(() => {
    if (!animationClass && !minimized && !maximized) return

    if (minimized) {
      if (maximized) {
        setAnimationClass("maximized-to-minimized")
      } else {
        setAnimationClass("windowed-to-minimized")
      }
    } else if (maximized) {
      if (animationClass.endsWith("minimized")) {
        setAnimationClass("minimized-to-maximized")
      } else {
        setAnimationClass("windowed-to-maximized")
      }
    } else {
      if (animationClass.endsWith("minimized")) {
        setAnimationClass("minimized-to-windowed")
      } else {
        setAnimationClass("maximized-to-windowed")
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximized, minimized])

  return animationClass
}
