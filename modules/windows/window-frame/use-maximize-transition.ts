import { RefObject, useLayoutEffect, useRef, useState } from "react"

import { safeAreaStore } from "../../safe-area/store"
import { viewportSizeStore } from "../../viewport/size-store"
import { WindowStore } from "../window-store"

const DURATION_MS = 300

// Gecko re-rasterizes an iframe on every frame its ancestor is animated, whether the
// box or a transform changes. The final geometry is applied at once, the motion is a
// transform from the old box to the new one, and the iframe stays hidden until it ends.
export function useMaximizeTransition(
  ref: RefObject<HTMLDivElement | null>,
  window: WindowStore,
) {
  const { maximized, minimized } = window
  const previous = useRef(maximized)
  const [transitioning, setTransitioning] = useState(false)
  const latest = useRef<Animation | null>(null)

  useLayoutEffect(() => {
    const changed = previous.current !== maximized
    previous.current = maximized
    const element = ref.current
    if (!changed || minimized || !element) return
    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const windowed = window.positioning
    const full = {
      x: 0,
      y: 0,
      width: viewportSizeStore.width,
      height: viewportSizeStore.height - safeAreaStore.insets.bottom,
    }
    const [from, to] = maximized ? [windowed, full] : [full, windowed]
    const inverse = `translate(${from.x - to.x}px, ${from.y - to.y}px) scale(${from.width / to.width}, ${from.height / to.height})`

    // The iframe keeps its previous size until the motion ends so its relayout does not stall the first frame.
    const iframe = element.querySelector("iframe")
    if (iframe) {
      const previous = iframe.getBoundingClientRect()
      element.style.setProperty("--iframe-width", `${previous.width}px`)
      element.style.setProperty("--iframe-height", `${previous.height}px`)
    }

    setTransitioning(true)
    const animation = element.animate(
      [
        { transform: inverse, transformOrigin: "0 0" },
        { transform: "none", transformOrigin: "0 0" },
      ],
      { duration: DURATION_MS, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
    )
    latest.current = animation
    const settle = () => {
      if (latest.current === animation) setTransitioning(false)
    }
    animation.addEventListener("finish", settle)
    animation.addEventListener("cancel", settle)
    return () => animation.cancel()
  }, [maximized, minimized, ref, window])

  return transitioning
}
