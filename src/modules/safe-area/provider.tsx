import { PropsWithChildren, useState } from "react";
import { Context, defaultContextValue } from "./context";

const navigationBarHeight = 18 * 4;

export function SafeAreaProvider({ children }: PropsWithChildren) {
  const [insets] = useState<typeof defaultContextValue>(() => ({
    top: 0,
    left: 0,
    right: 0,
    bottom: navigationBarHeight,
  }));

  return <Context.Provider value={insets}>{children}</Context.Provider>;
}
