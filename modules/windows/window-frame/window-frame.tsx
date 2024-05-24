import "./window-frame.css";

import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { windowsStore } from "../windows-store";
import { observer } from "mobx-react-lite";
import { ResizeHandles } from "./resize-handles";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { viewportSizeStore } from "@/modules/viewport/size-store";

import { WindowFrameContent } from "./content";
import { WindowStore } from "../window-store";
import { TopBar } from "./top-bar";
import { useFrameAnimationClassName } from "./use-animation-class-name";
import { useDoubleClick } from "@/modules/browser/use-double-click";

type Props = {
  window: WindowStore;
};

export const WindowFrame = observer(({ window }: Props) => {
  const id = window.id;
  const ref = useRef<HTMLDivElement>(null);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "window-frame:" + id,
  });

  // Appear in needs to be removed on mount. Improves performance and avoids weird drag issues.
  const [appearIn, setAppearIn] = useState(true);
  useEffect(() => {
    window?.requestFocus();

    const timeout = setTimeout(() => setAppearIn(false), 500);
    return () => clearTimeout(timeout);
  }, [window]);

  useLayoutEffect(() => {
    if (!window?.focused) return;

    windowsStore.moveToTop(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.focused]);

  const isDoubleClick = useDoubleClick();

  const onClick = () => {
    if (isDoubleClick()) window?.toggleMaximized();
  };

  function handleMinimize() {
    const navBarItemBounds =
      window?.navBarItemRef.current?.getBoundingClientRect();

    ref.current?.style.setProperty(
      "--nav-bar-item-center-x",
      "" +
        (navBarItemBounds
          ? navBarItemBounds.x +
            navBarItemBounds.width / 2 -
            positioning.x -
            positioning.width / 2
          : viewportSizeStore.width / 2)
    );

    ref.current?.style.setProperty(
      "--nav-bar-item-center-y",
      "" +
        (navBarItemBounds
          ? navBarItemBounds.y -
            positioning.y -
            positioning.height / 2 +
            navBarItemBounds.height / 2
          : viewportSizeStore.height / 2)
    );

    window?.toggleMinimized();
  }

  const { order, focused, positioning, maximized, minimized } = window;

  useEffect(() => {
    ref.current?.style.setProperty(
      "--window-frame-width",
      `${positioning.width}px`
    );
    ref.current?.style.setProperty(
      "--window-frame-height",
      `${positioning.height}px`
    );
    ref.current?.style.setProperty("--window-frame-top", `${positioning.y}px`);
    ref.current?.style.setProperty("--window-frame-left", `${positioning.x}px`);
  }, [positioning.height, positioning.width, positioning.x, positioning.y]);

  const animationClassName = useFrameAnimationClassName(window);

  return (
    <div
      id={window.frameId}
      ref={ref}
      className={cn(
        "@container window-frame absolute rounded-lg shadow-2xl bg-accent p-0.5 pt-0 touch-manipulation transition-[shadow,opacity] duration-300",
        appearIn && "animate-in",
        focused && "shadow-black backdrop-blur-xl bg-background/70",
        maximized && "p-0 shadow-none",
        animationClassName
      )}
      {...({ inert: minimized ? "true" : undefined } as object)}
      style={{
        zIndex: order,
        ...(transform && {
          transform: `translate(${transform.x}px, ${transform.y}px)`,
        }),
      }}
      tabIndex={-1}
    >
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

      {!focused && (
        <div className="absolute inset-0 top-11 rounded-md bg-accent/20" />
      )}

      {!maximized && <ResizeHandles windowId={id} />}
    </div>
  );
});
