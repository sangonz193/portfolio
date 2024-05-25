import { createContext, useContext } from "react"

export const defaultContextValue = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}
export const Context =
  createContext<typeof defaultContextValue>(defaultContextValue)

export function useSafeArea() {
  return useContext(Context)
}
