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
    if (isDoubleClick()) window?.toggleMaximized()
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

  const [renderBlur, setRenderBlur] = useState(false)
  const [renderBackgroundColor, setRenderBackgroundColor] = useState(true)

  useLayoutEffect(() => {
    if (!focused) {
      setRenderBackgroundColor(true)

      const timeoutBg = setTimeout(() => {
        setRenderBlur(false)
      }, 300)

      return () => {
        clearTimeout(timeoutBg)
      }
    }

    setRenderBlur(true)

    const timeout = setTimeout(() => {
      setRenderBackgroundColor(false)
    }, 100)

    return () => clearTimeout(timeout)
  }, [focused])

  return (
    <div
      id={window.frameId}
      ref={ref}
      className={cn(
        "window-frame absolute touch-manipulation overflow-hidden rounded-lg border bg-transparent p-0.5 pt-0 shadow-2xl transition-[shadow,opacity] duration-300 @container [backface-visibility:hidden]",
        appearIn && "animate-in",
        maximized && "border-none p-0 shadow-none",
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
      {renderBlur && (
        <div
          className={cn(
            // https://stackoverflow.com/questions/57736567/rendering-flickering-glitch-issue-in-chrome-using-css-backdrop-filterblur
            "[-webkit-transform:translate3d(0,0,0)]",
            "absolute inset-0 bg-background/70 opacity-0 backdrop-blur-md transition-opacity",
            renderBlur && "opacity-100",
          )}
        />
      )}

      <div
        className={cn(
          // https://stackoverflow.com/questions/57736567/rendering-flickering-glitch-issue-in-chrome-using-css-backdrop-filterblur
          "[-webkit-transform:translate3d(0,0,0)]",
          "absolute inset-0 bg-accent opacity-100 transition-opacity duration-300",
          !renderBackgroundColor && !appearIn && "opacity-0",
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
