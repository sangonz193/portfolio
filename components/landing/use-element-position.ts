import { DependencyList, RefObject, useEffect, useState } from "react";

export function useElementPosition(
  ref: RefObject<HTMLElement>,
  deps: DependencyList
) {
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();

  useEffect(() => {
    if (!ref.current) {
      setPosition(undefined);
      return;
    }

    const element = ref.current;

    function updatePosition() {
      const boundingBox = element.getBoundingClientRect();

      setPosition({
        x: boundingBox.left,
        y: boundingBox.top,
        width: boundingBox.width,
        height: boundingBox.height,
      });
    }

    updatePosition();

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [
    ref,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...deps,
  ]);

  return position;
}
