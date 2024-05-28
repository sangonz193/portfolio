"use client"

import { useEffect } from "react"

export function SetNoBg() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)

    if (searchParams.get("noBg") !== "true") {
      return
    }

    document.body.classList.add("bg-transparent")
  }, [])

  return null
}
