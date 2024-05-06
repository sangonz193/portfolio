import { PropsWithChildren, useEffect, useState } from "react";
import { Context } from "./context";

export function WindowSizeProvider({ children }: PropsWithChildren) {
  const [size, setSize] = useState(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  }));

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <Context.Provider value={size}>{children}</Context.Provider>;
}
