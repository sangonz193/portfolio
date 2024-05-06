import { PropsWithChildren, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Background } from "./components/background";
import { NavigationBar } from "./components/navigation-bar/navigation-bar";
import { WindowManager } from "./components/windows/window-manager";
import { compactProviders } from "./lib/react/compact-providers";
import { WindowSizeProvider } from "./modules/window-size/provider";
import { SafeAreaProvider } from "./modules/safe-area/provider";

const Providers = compactProviders([
  WindowSizeProvider,
  SafeAreaProvider,
  ({ children }: PropsWithChildren) => (
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
      <div className="h-screen relative overflow-hidden">
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
