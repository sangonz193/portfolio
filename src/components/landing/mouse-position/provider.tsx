import { PropsWithChildren, useEffect, useState } from "react";
import { Context, defaultContextValue } from "./context";

export function MousePositionProvider({ children }: PropsWithChildren) {
  const [mouseCoords, setMouseCoords] = useState<{ x: number; y: number }>(
    defaultContextValue
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <Context.Provider value={mouseCoords}>{children}</Context.Provider>;
}
