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
import { useMaximizeTransition } from "./use-maximize-transition"
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
    disabled: window.fullscreen,
  })

  const [appearIn, setAppearIn] = useState(true)
  useLayoutEffect(() => {
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
    if (isDoubleClick() && !window?.fullscreen) window?.toggleMaximized()
  }

  function handleMinimize() {
    const navBarItemBounds = window?.navBarItemRef
      .get()
      ?.getBoundingClientRect()

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

  const { order, focused, positioning, maximized, minimized, fullscreen } = window

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
  const { shownMaximized, transitioning } = useMaximizeTransition(ref, window)

  return (
    <div
      id={window.frameId}
      ref={ref}
      className={cn(
        "window-frame absolute touch-manipulation overflow-hidden rounded-[14px] bg-[#11161b] shadow-[0_28px_90px_rgb(0_0_0/0.58)] ring-1 ring-white/[0.08] transition-[box-shadow,filter,opacity] duration-300 @container [backface-visibility:hidden]",
        appearIn && "animate-in",
        focused ? "window-frame--focused" : "window-frame--unfocused",
        shownMaximized && "window-frame--maximized",
        transitioning && "window-frame--transitioning",
        (shownMaximized || fullscreen) && "window-frame--edge-to-edge rounded-none shadow-none ring-0",
        "[-webkit-transform:translate3d(0,0,0)]",
        animationClassName,
      )}
      {...({ inert: minimized ? "true" : undefined } as object)}
      style={{
        zIndex: order,
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : `translateZ(0)`,
      }}
      tabIndex={-1}
    >
      <TopBar
        setNodeRef={setNodeRef}
        listeners={listeners}
        attributes={attributes}
        onMouseUp={onClick}
        window={window}
        onMinimize={handleMinimize}
      />

      <div className="window-frame-content shrink grow overflow-hidden animate-in">
        <WindowFrameContent window={window} moving={!!transform} />
      </div>

      {!focused && <div className="window-frame-dim absolute inset-0 top-10" />}

      {!maximized && !fullscreen && <ResizeHandles windowId={id} />}
    </div>
  )
})
