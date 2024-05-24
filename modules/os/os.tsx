"use client";

import { useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { compactProviders } from "@/lib/react/compact-providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SafeAreaProvider } from "@/modules/safe-area/provider";
import { Background } from "@/components/background";
import { WindowManager } from "@/modules/windows/window-manager";
import { NavigationBar } from "@/components/navigation-bar/navigation-bar";
import { focusedElementStore } from "@/modules/focused-element/store";
import { Metadata } from "next";
import { Viewport } from "../viewport/viewport";
import { DesktopGrid } from "../desktop/grid";

export const metadata: Metadata = {
  title: "Santiago's OS",
};

const Providers = compactProviders([
  ({ children }) => <TooltipProvider>{children}</TooltipProvider>,
  SafeAreaProvider,
  ({ children }) => (
    <QueryClientProvider client={useMemo(() => new QueryClient(), [])}>
      {children}
    </QueryClientProvider>
  ),
]);

export function OS() {
  useEffect(() => {
    const interval = setInterval(() => {
      focusedElementStore.setFocusedElement(
        document.activeElement as HTMLElement
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Providers>
      <Viewport>
        <div className="bg-background inset-0 absolute justify-center items-center">
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
  );
}
