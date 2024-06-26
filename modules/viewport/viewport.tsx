import { PropsWithChildren, useEffect, useRef } from "react"

import { NAVIGATION_BAR_HEIGHT } from "@/components/navigation-bar/navigation-bar"

import { viewportSizeStore } from "./size-store"

export function Viewport({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      viewportSizeStore.setSize({
        width: ref.current?.getBoundingClientRect().width ?? 0,
        height: ref.current?.getBoundingClientRect().height ?? 0,
      })

      ref.current?.style.setProperty(
        "--viewport-width",
        `${viewportSizeStore.width}px`,
      )
      ref.current?.style.setProperty(
        "--viewport-height",
        `${viewportSizeStore.height}px`,
      )
      ref.current?.style.setProperty(
        "--nav-bar-height",
        `${NAVIGATION_BAR_HEIGHT}px`,
      )
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div ref={ref} className="relative h-full overflow-hidden">
      {children}
    </div>
  )
}
