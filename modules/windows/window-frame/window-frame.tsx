import "./window-frame.css"

import { useDraggable } from "@dnd-kit/core"
import { observer } from "mobx-react-lite"
import React, { useEffect, useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/cn"
import { useDoubleClick } from "@/modules/browser/use-double-click"
import { viewportSizeStore } from "@/modules/viewport/size-store"

import { WindowFrameContent } from "./content"
import { ResizeHandles } from "./resize-handles"
import { TopBar } from "./top-bar"
import { useFrameAnimationClassName } from "./use-animation-class-name"
import { WindowStore } from "../window-store"
import { windowsStore } from "../windows-store"

type Props = {
  window: WindowStore
}

export const WindowFrame = observer(({ window }: Props) => {
  const id = window.id
  const ref = useRef<HTMLDivElement>(null)
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "window-frame:" + id,
  })

  // Appear in needs to be removed on mount. Improves performance and avoids weird drag issues.
  const [appearIn, setAppearIn] = useState(true)
  useEffect(() => {
    window?.requestFocus()

    const timeout = setTimeout(() => setAppearIn(false), 500)
    return () => clearTimeout(timeout)
  }, [window])

  useLayoutEffect(() => {
    if (!window?.focused) return

    windowsStore.moveToTop(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.focused])

  const isDoubleClick = useDoubleClick()

  const onClick = () => {
    if (isDoubleClick()) window?.toggleMaximized()
  }

  function handleMinimize() {
    const navBarItemBounds =
      window?.navBarItemRef.current?.getBoundingClientRect()

    ref.current?.style.setProperty(
      "--nav-bar-item-center-x",
      "" +
        (navBarItemBounds
          ? navBarItemBounds.x +
            navBarItemBounds.width / 2 -
            positioning.x -
            positioning.width / 2
          : viewportSizeStore.width / 2),
    )

    ref.current?.style.setProperty(
      "--nav-bar-item-center-y",
      "" +
        (navBarItemBounds
          ? navBarItemBounds.y -
            positioning.y -
            positioning.height / 2 +
            navBarItemBounds.height / 2
          : viewportSizeStore.height / 2),
    )

    window?.toggleMinimized()
  }

  const { order, focused, positioning, maximized, minimized } = window

  useEffect(() => {
    ref.current?.style.setProperty(
      "--window-frame-width",
      `${positioning.width}px`,
    )
    ref.current?.style.setProperty(
      "--window-frame-height",
      `${positioning.height}px`,
    )
    ref.current?.style.setProperty("--window-frame-top", `${positioning.y}px`)
    ref.current?.style.setProperty("--window-frame-left", `${positioning.x}px`)
  }, [positioning.height, positioning.width, positioning.x, positioning.y])

  const animationClassName = useFrameAnimationClassName(window)

  const [deferredFocus, setDeferredFocus] = useState<boolean>(false)
  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setDeferredFocus(focused)
    }, 500)

    return () => clearTimeout(timeout)
  }, [deferredFocus, focused, window])

  return (
    <div
      id={window.frameId}
      ref={ref}
      className={cn(
        "window-frame absolute touch-manipulation overflow-hidden rounded-lg border bg-accent p-0.5 pt-0 shadow-2xl transition-[shadow,opacity,background] duration-300 @container",
        appearIn && "animate-in",
        deferredFocus && "bg-transparent",
        maximized && "border-none p-0 shadow-none",
        animationClassName,
      )}
      {...({ inert: minimized ? "true" : undefined } as object)}
      style={{
        zIndex: order,
        ...(transform && {
          transform: `translate(${transform.x}px, ${transform.y}px)`,
        }),
      }}
      tabIndex={-1}
    >
      {(focused || deferredFocus) && (
        <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />
      )}

      <div
        className={cn(
          "absolute inset-0 bg-accent opacity-0 duration-300 ease-linear",
          !focused && "opacity-100",
        )}
      />

      <TopBar
        setNodeRef={setNodeRef}
        listeners={listeners}
        attributes={attributes}
        onMouseUp={onClick}
        window={window}
        onMinimize={handleMinimize}
      />

      <div
        className={cn(
          "shrink grow overflow-hidden rounded-md animate-in",
          maximized && "rounded-none",
        )}
      >
        <WindowFrameContent window={window} moving={!!transform} />
      </div>

      {!focused && (
        <div className="absolute inset-0 top-11 rounded-md bg-accent/20" />
      )}

      {!maximized && <ResizeHandles windowId={id} />}
    </div>
  )
})
