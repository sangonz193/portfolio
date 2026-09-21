import { RefObject, useLayoutEffect, useRef, useState } from "react"

import { safeAreaStore } from "../../safe-area/store"
import { viewportSizeStore } from "../../viewport/size-store"
import { WindowStore } from "../window-store"

const DURATION_MS = 320
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)"

// Gecko re-rasterizes an iframe on every frame its ancestor scales, so the window never
// scales. It holds the larger of the two layouts for the whole motion and reveals or
// conceals the difference with a translate and a clip, which the compositor handles alone.
// The content lays out exactly once: at the start when maximizing, at the end when restoring.
export function useMaximizeTransition(
  ref: RefObject<HTMLDivElement | null>,
  window: WindowStore,
) {
  const { maximized, minimized } = window
  const previous = useRef(maximized)
  const [shownMaximized, setShownMaximized] = useState(maximized)
  const [transitioning, setTransitioning] = useState(false)
  const latest = useRef<Animation | null>(null)

  useLayoutEffect(() => {
    const changed = previous.current !== maximized
    previous.current = maximized
    const element = ref.current
    if (!changed) return
    if (minimized || !element || globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShownMaximized(maximized)
      return
    }

    const windowed = window.positioning
    const full = {
      x: 0,
      y: 0,
      width: viewportSizeStore.width,
      height: viewportSizeStore.height - safeAreaStore.insets.bottom,
    }
    const small = `translate(${windowed.x}px, ${windowed.y}px)`
    const clipped = `inset(0 ${full.width - windowed.width}px ${full.height - windowed.height}px 0)`
    const frames = maximized
      ? [{ transform: small, clipPath: clipped }, { transform: "none", clipPath: "inset(0)" }]
      : [{ transform: "none", clipPath: "inset(0)" }, { transform: small, clipPath: clipped }]

    setShownMaximized(true)
    setTransitioning(true)
    const animation = element.animate(frames, { duration: DURATION_MS, easing: EASING, fill: "both" })
    latest.current = animation
    const settle = () => {
      if (latest.current !== animation) return
      setShownMaximized(maximized)
      setTransitioning(false)
    }
    animation.addEventListener("finish", settle)
    animation.addEventListener("cancel", settle)
    return () => animation.cancel()
  }, [maximized, minimized, ref, window])

  // The last keyframe is held until the final layout is in the DOM, then released before paint,
  // so no frame shows the frame's base geometry between the motion ending and the class changing.
  useLayoutEffect(() => {
    if (transitioning) return
    latest.current?.cancel()
    latest.current = null
  }, [transitioning, shownMaximized])

  return { shownMaximized, transitioning }
}
