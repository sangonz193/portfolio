"use client"

import dynamic from "next/dynamic"
import { PropsWithChildren, useEffect, useState } from "react"

import { cn } from "@/lib/cn"

import { Splash } from "./splash"

const OS = dynamic(() => import("./os").then((module) => module.OS), {
  ssr: false,
})

const MIN_SPLASH_MS = 1400
const SPLASH_FADE_MS = 500

export function OsBoot({ children }: PropsWithChildren) {
  const [osReady, setOsReady] = useState(false)
  const [minimumElapsed, setMinimumElapsed] = useState(false)
  const [splashGone, setSplashGone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setMinimumElapsed(true), MIN_SPLASH_MS)
    return () => clearTimeout(timeout)
  }, [])

  const booted = osReady && minimumElapsed

  useEffect(() => {
    if (!booted) return
    const timeout = setTimeout(() => setSplashGone(true), SPLASH_FADE_MS)
    return () => clearTimeout(timeout)
  }, [booted])

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true))
    document.documentElement.classList.add("os-active")
    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove("os-active")
    }
  }, [])

  return (
    <>
      <div inert={mounted} aria-hidden={mounted} className="os-boot-page">
        {children}
      </div>

      <OS onReady={() => setOsReady(true)} />

      {!splashGone && (
        <Splash
          className={cn(
            "transition-opacity ease-out",
            booted && "pointer-events-none opacity-0",
          )}
          style={{ transitionDuration: `${SPLASH_FADE_MS}ms` }}
        />
      )}
    </>
  )
}
