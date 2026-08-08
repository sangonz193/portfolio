"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Metadata } from "next"
import { Suspense, useEffect, useMemo, useRef } from "react"

import { Background } from "@/components/background"
import { NavigationBar } from "@/components/navigation-bar/navigation-bar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { compactProviders } from "@/lib/react/compact-providers"
import { meApp } from "@/modules/apps/me/app"
import { workApp } from "@/modules/apps/work/app"
import { openFile } from "@/modules/files/explorer-window"
import { workFileSystem } from "@/modules/files/filesystem"
import { findFolder } from "@/modules/files/path"
import { readWorkUrl } from "@/modules/files/url-state"
import { workStore } from "@/modules/files/work-store"
import { focusedElementStore } from "@/modules/focused-element/store"
import { SafeAreaProvider } from "@/modules/safe-area/provider"
import { WindowManager } from "@/modules/windows/window-manager"
import { windowsStore } from "@/modules/windows/windows-store"

import { DesktopGrid } from "../desktop/grid"
import { Viewport } from "../viewport/viewport"

export const metadata: Metadata = {
  title: "Santiago's OS",
}

const Providers = compactProviders([
  ({ children }) => <TooltipProvider>{children}</TooltipProvider>,
  SafeAreaProvider,
  ({ children }) => (
    <QueryClientProvider client={useMemo(() => new QueryClient(), [])}>
      {children}
    </QueryClientProvider>
  ),
])

export function OS() {
  const openedInitialWindow = useRef(false)

  useEffect(() => {
    const openFromUrl = () => {
      const state = readWorkUrl(window.location.search)
      const isWorkState = new URLSearchParams(window.location.search).has("path")
      if (!isWorkState) return false
      const folder = findFolder(workFileSystem, state.path)
      if (!folder) return false
      windowsStore.openApp(workApp)
      workStore.setPath(state.path)
      if (state.file) {
        const file = folder.children.find((item) => item.name === state.file)
        if (file && file.kind !== "folder") setTimeout(() => openFile(file, folder, false), 0)
      }
      return true
    }

    if (!openedInitialWindow.current && windowsStore.windows.length === 0) {
      openedInitialWindow.current = true
      if (!openFromUrl()) windowsStore.openApp(meApp)
    }

    const handlePopState = () => {
      const state = readWorkUrl(window.location.search)
      const folder = findFolder(workFileSystem, state.path)
      if (!folder) return
      windowsStore.openApp(workApp)
      workStore.setPath(state.path)
      if (state.file) {
        const file = folder.children.find((item) => item.name === state.file)
        if (file && file.kind !== "folder") openFile(file, folder, false)
      } else windowsStore.focusWindow("work-explorer")
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      focusedElementStore.setFocusedElement(
        document.activeElement as HTMLElement,
      )
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <Providers>
      <Viewport>
        <div className="absolute inset-0 items-center justify-center bg-background">
          <Suspense fallback={null}>
            <Background className="size-full" />
          </Suspense>

          <div className="absolute inset-0 bg-black/[0.03]" />
        </div>

        <DesktopGrid />

        <WindowManager />

        <NavigationBar />
      </Viewport>
    </Providers>
  )
}
