"use client"

import React from "react"

import { mousePositionStore } from "./store"

export function MousePositionListener() {
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePositionStore.setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return null
}
