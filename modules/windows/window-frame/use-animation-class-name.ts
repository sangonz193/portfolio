import { useLayoutEffect, useState } from "react"

import { WindowStore } from "../window-store"

export function useFrameAnimationClassName(window: WindowStore) {
  const [animationClass, setAnimationClass] = useState<
    | ""
    | "windowed-to-minimized"
    | "minimized-to-windowed"
    | "maximized-to-minimized"
    | "minimized-to-maximized"
  >("")

  const { minimized, maximized } = window
  useLayoutEffect(() => {
    if (!animationClass && !minimized && !maximized) return

    if (minimized) {
      if (maximized) {
        setAnimationClass("maximized-to-minimized")
      } else {
        setAnimationClass("windowed-to-minimized")
      }
    } else if (animationClass.endsWith("minimized")) {
      setAnimationClass(maximized ? "minimized-to-maximized" : "minimized-to-windowed")
    } else {
      setAnimationClass("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximized, minimized])

  return animationClass
}
