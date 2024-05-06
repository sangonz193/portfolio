import { createContext, useContext } from "react";

export const defaultContextValue = { x: 0, y: 0 };
export const Context =
  createContext<typeof defaultContextValue>(defaultContextValue);

export function useMousePosition() {
  return useContext(Context);
}
