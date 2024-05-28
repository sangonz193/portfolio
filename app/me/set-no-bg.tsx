"use client"

import { useEffect } from "react"

export function SetNoBg() {
  useEffect(() => {
    document.body.classList.add("bg-transparent")

    return () => {
      document.body.classList.remove("bg-transparent")
    }
  }, [])

  return null
}
