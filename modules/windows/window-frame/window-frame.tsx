import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { windowsStore } from "../windows-store";
import { observer } from "mobx-react-lite";
import { ResizeHandles } from "./resize-handles";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { clamp } from "@/utils/clamp";
import { viewportSizeStore } from "@/modules/viewport-size/store";

import { WindowFrameContent } from "./content";
import { WindowStore } from "../window-store";
import {
  WindowFramePositioningStoreListener,
  createWindowFramePositioningStore,
} from "./positioning-store";
import { TopBar } from "./top-bar";

type Props = {
  window: WindowStore;
};

export type Positioning = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export const WindowFrame = observer(({ window }: Props) => {
  const id = window.id;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "window-frame:" + id,
  });
  const windowFramePositioningStore = React.useMemo(
    () => createWindowFramePositioningStore(window),
    [window]
  );

  const [appearIn, setAppearIn] = useState(true);
  useEffect(() => {
    window?.requestFocus();

    const timeout = setTimeout(() => setAppearIn(false), 500);
    return () => clearTimeout(timeout);
  }, [window]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window?.move({ x: 0, y: 0 });
    }, 500);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewportSizeStore]);

  useLayoutEffect(() => {
    if (!window?.focused) return;

    windowsStore.moveToTop(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.focused]);

  const topBarClickTimestampRef = useRef(0);
  const onClick = () => {
    const now = Date.now();
    if (now - topBarClickTimestampRef.current < 300) {
      topBarClickTimestampRef.current = 0;
      window?.toggleMaximized();
    }

    topBarClickTimestampRef.current = now;
  };

  const [transitionInset, setTransitionInset] = useState(true);
  const isDragging = !!transform;
  useEffect(() => {
    if (!isDragging) return;

    setTransitionInset(false);

    return () => {
      setTransitionInset(true);
    };
  }, [isDragging]);

  const [navBarItemBounds, setNavBarItemBounds] = useState<DOMRect>();

  function handleMinimize() {
    setNavBarItemBounds(window?.navBarItemRef.current?.getBoundingClientRect());
    window?.toggleMinimized();
  }

  const { order, resizing, focused, positioning, maximized, minimized } =
    window;

  const style = {
    transform: transform
      ? `translate3d(${clamp(
          transform.x,
          0 - positioning.x - (positioning.width - 200),
          viewportSizeStore.width - positioning.x - 200
        )}px, ${clamp(
          transform.y,
          0 - positioning.y,
          viewportSizeStore.height - positioning.y - 30 * 4
        )}px, 0)`
      : minimized
      ? `translate3d(${
          navBarItemBounds
            ? navBarItemBounds.x -
              positioning.x -
              positioning.width / 2 +
              navBarItemBounds.width / 2
            : viewportSizeStore.width / 2
        }px, ${
          navBarItemBounds
            ? -positioning.y +
              navBarItemBounds.y -
              positioning.height / 2 +
              navBarItemBounds.height / 2
            : viewportSizeStore.height
        }px, 0) scale(0)`
      : "",
  };

  return (
    <div
      id={window.frameId}
      className={cn(
        "@container absolute rounded-lg shadow-2xl bg-accent p-0.5 pt-0 touch-manipulation transition-[shadow,top,left,right,bottom,opacity,transform] duration-300",
        (resizing || !transitionInset) && "transition-[shadow]",
        appearIn && "animate-in",
        focused && "shadow-black backdrop-blur-xl bg-background/70",
        maximized && "p-0 rounded-none shadow-none",
        minimized && "opacity-0"
      )}
      {...({ inert: minimized ? "true" : undefined } as object)}
      style={{
        ...windowFramePositioningStore.style,
        zIndex: order,
        ...style,
      }}
      tabIndex={-1}
    >
      <WindowFramePositioningStoreListener
        store={windowFramePositioningStore}
      />

      <TopBar
        setNodeRef={setNodeRef}
        listeners={listeners}
        attributes={attributes}
        onMouseUp={onClick}
        window={window}
        onMinimize={handleMinimize}
      />

      <div
        className={cn(
          "grow rounded-md overflow-hidden",
          maximized && "rounded-none"
        )}
      >
        <WindowFrameContent window={window} moving={!!transform} />
      </div>

      {!focused && <div className="absolute inset-0 rounded-md bg-accent/20" />}

      {!maximized && <ResizeHandles windowId={id} />}
    </div>
  );
});
