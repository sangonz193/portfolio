import { PropsWithChildren, useEffect, useRef } from "react";
import { viewportSizeStore } from "./size-store";

export function Viewport({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      viewportSizeStore.setSize({
        width: ref.current?.getBoundingClientRect().width ?? 0,
        height: ref.current?.getBoundingClientRect().height ?? 0,
      });

      ref.current?.style.setProperty(
        "--viewport-width",
        `${viewportSizeStore.width}px`
      );
      ref.current?.style.setProperty(
        "--viewport-height",
        `${viewportSizeStore.height}px`
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={ref} className="h-screen relative overflow-hidden">
      {children}
    </div>
  );
}
