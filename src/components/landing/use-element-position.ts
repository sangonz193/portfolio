import { RefObject, useEffect, useState } from "react";
import { useWindowSize } from "../../modules/window-size/context";

export function useElementPosition(ref: RefObject<HTMLElement>) {
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();

  const windowSize = useWindowSize();

  useEffect(() => {
    if (!ref.current) {
      setPosition(undefined);
      return;
    }

    const boundingBox = ref.current.getBoundingClientRect();

    setPosition({
      x: boundingBox.left,
      y: boundingBox.top,
      width: boundingBox.width,
      height: boundingBox.height,
    });
  }, [ref, windowSize]);

  return position;
}
