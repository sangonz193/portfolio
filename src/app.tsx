import { createRef, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Background } from "./components/background";
import { NavigationBar } from "./components/navigation-bar/navigation-bar";
import { WindowManager } from "./modules/windows/window-manager";
import { compactProviders } from "./lib/react/compact-providers";
import { ViewportSizeProvider } from "./modules/viewport-size/provider";
import { SafeAreaProvider } from "./modules/safe-area/provider";
import { TooltipProvider } from "./components/ui/tooltip";

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

function App() {
  useEffect(() => {
    document.title = "Santiago's OS";
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

export default App;
