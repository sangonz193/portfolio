import { createContext, useContext } from "react";

type Value = {
  x: number;
  y: number;
};

export const Context = createContext<Value | undefined>(undefined);

export function useMousePosition() {
  return useContext(Context);
}
