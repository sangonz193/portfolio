"use client"

import "./background.css"

import { observer } from "mobx-react-lite"
import { useSearchParams } from "next/navigation"
import { ComponentProps, useEffect, useRef } from "react"

import { cn } from "@/lib/cn"
import { mousePositionStore } from "@/modules/mouse-position/store"
import { viewportSizeStore } from "@/modules/viewport/size-store"
import { windowsStore } from "@/modules/windows/windows-store"
import { clamp } from "@/utils/clamp"

type Props = ComponentProps<"div">

export const Background = observer(({ className, ...props }: Props) => {
  const { position: mousePosition } = mousePositionStore
  const { height, width } = viewportSizeStore
  const { windows } = windowsStore
  const searchParams = useSearchParams()
  const vm = searchParams.get("vm") === "true"
  const anyWindowMaximized = windows.some((window) => window.maximized)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const enabled =
      !vm && (windows.length === 0 || width >= 768) && !anyWindowMaximized

    if (!mousePosition || !enabled) {
      ref.current.style.setProperty("--pointer-x", "0")
      ref.current.style.setProperty("--pointer-y", "0")
      return
    }

    const x = clamp(
      ((mousePosition.x - width / 2) / (width / 2)) * 100,
      -100,
      100,
    )
    const y = clamp(
      ((mousePosition.y - height / 2) / (height / 2)) * 100,
      -100,
      100,
    )

    ref.current.style.setProperty("--pointer-x", `${x}`)
    ref.current.style.setProperty("--pointer-y", `${y}`)
  }, [anyWindowMaximized, height, mousePosition, vm, width, windows.length])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("background", className)}
      {...props}
    >
      <div className="background-body background-body-orchid" />
      <div className="background-body background-body-cobalt" />
      <div className="background-body background-body-ember" />

      <svg className="background-noise">
        <filter id="living-field-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#living-field-noise)" />
      </svg>

      <div className="background-vignette" />
    </div>
  )
})
