import { useRef } from "react";

export function useDoubleClick() {
  const lastClickRef = useRef(0);

  return function isDoubleClick() {
    const now = Date.now();
    const diff = now - lastClickRef.current;
    lastClickRef.current = now;

    return diff < 300;
  };
}
