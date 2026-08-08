"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Metadata } from "next"
import { Suspense, useEffect, useMemo, useRef } from "react"

import { Background } from "@/components/background"
import { NavigationBar } from "@/components/navigation-bar/navigation-bar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { compactProviders } from "@/lib/react/compact-providers"
import { meApp } from "@/modules/apps/me/app"
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
    if (!openedInitialWindow.current && windowsStore.windows.length === 0) {
      openedInitialWindow.current = true
      windowsStore.openApp(meApp)
    }
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
