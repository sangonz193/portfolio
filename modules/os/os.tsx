"use client";

import { createRef, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { compactProviders } from "@/lib/react/compact-providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ViewportSizeProvider } from "@/modules/viewport-size/provider";
import { SafeAreaProvider } from "@/modules/safe-area/provider";
import { Background } from "@/components/background";
import { WindowManager } from "@/modules/windows/window-manager";
import { NavigationBar } from "@/components/navigation-bar/navigation-bar";
import { focusedElementStore } from "@/modules/focused-element/store";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Santiago's OS",
};

const parentRef = createRef<HTMLDivElement>();

const Providers = compactProviders([
  ({ children }) => <TooltipProvider>{children}</TooltipProvider>,
  ({ children }) => (
    <ViewportSizeProvider parentRef={parentRef}>
      {children}
    </ViewportSizeProvider>
  ),
  SafeAreaProvider,
  ({ children }) => (
    <QueryClientProvider client={useMemo(() => new QueryClient(), [])}>
      {children}
    </QueryClientProvider>
  ),
]);

export function OS() {
  useEffect(() => {
    document.title = "Santiago's OS";

    const interval = setInterval(() => {
      focusedElementStore.setFocusedElement(
        document.activeElement as HTMLElement
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <Providers>
      <div ref={parentRef} className="h-screen relative overflow-hidden">
        <div className="bg-background inset-0 absolute justify-center items-center">
          <Background
            className="size-full"
            preserveAspectRatio="xMidYMid slice"
          />
        </div>

        <WindowManager />

        <NavigationBar />
      </div>
    </Providers>
  );
}
