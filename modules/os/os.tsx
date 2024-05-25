"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Metadata } from "next"
import { useEffect, useMemo } from "react"

import { Background } from "@/components/background"
import { NavigationBar } from "@/components/navigation-bar/navigation-bar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { compactProviders } from "@/lib/react/compact-providers"
import { focusedElementStore } from "@/modules/focused-element/store"
import { SafeAreaProvider } from "@/modules/safe-area/provider"
import { WindowManager } from "@/modules/windows/window-manager"

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
          <Background
            className="size-full"
            preserveAspectRatio="xMidYMid slice"
          />
        </div>

        <DesktopGrid />

        <WindowManager />

        <NavigationBar />
      </Viewport>
    </Providers>
  )
}
