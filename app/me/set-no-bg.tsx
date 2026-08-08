"use client"

import { useEffect } from "react"

export function SetNoBg() {
  useEffect(() => {
    document.documentElement.classList.add("window-content-transparent")
    document.body.classList.add("window-content-transparent")

    return () => {
      document.documentElement.classList.remove("window-content-transparent")
      document.body.classList.remove("window-content-transparent")
    }
  }, [])

  return null
}
