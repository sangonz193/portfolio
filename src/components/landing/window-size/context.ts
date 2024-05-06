import { createContext, useContext } from "react";

export const defaultContextValue = { width: 0, height: 0 };
export const Context =
  createContext<typeof defaultContextValue>(defaultContextValue);

export function useWindowSize() {
  return useContext(Context);
}
