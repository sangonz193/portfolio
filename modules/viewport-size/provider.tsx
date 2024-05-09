import { PropsWithChildren, useEffect } from "react";
import { viewportSizeStore } from "./store";

interface Props extends PropsWithChildren {
  parentRef: React.RefObject<HTMLDivElement>;
}

export function ViewportSizeProvider({ children, parentRef }: Props) {
  useEffect(() => {
    const handleResize = () => {
      viewportSizeStore.setSize({
        width: parentRef.current?.getBoundingClientRect().width ?? 0,
        height: parentRef.current?.getBoundingClientRect().height ?? 0,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [parentRef]);

  return <>{children}</>;
}
