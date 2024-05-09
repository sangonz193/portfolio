import { PropsWithChildren, useState } from "react";
import { Context, defaultContextValue } from "./context";
import { NAVIGATION_BAR_HEIGHT } from "@/components/navigation-bar/navigation-bar";

export function SafeAreaProvider({ children }: PropsWithChildren) {
  const [insets] = useState<typeof defaultContextValue>(() => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: NAVIGATION_BAR_HEIGHT,
  }));

  return <Context.Provider value={insets}>{children}</Context.Provider>;
}
