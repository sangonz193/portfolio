import { RefObject, useEffect, useState } from "react";
import { viewportSizeStore } from "@/modules/viewport-size/store";

export function useElementPosition(ref: RefObject<HTMLElement>) {
  const [position, setPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();

  const { width, height } = viewportSizeStore;

  useEffect(() => {
    // Measure again when the window size changes.
    width;
    height;

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
  }, [height, ref, width]);

  return position;
}
