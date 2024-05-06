import { Application } from "@/apps";
import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { windowsStore } from "./windows-store";
import { observer } from "mobx-react-lite";
import { cva } from "class-variance-authority";
import { RESIZE_HANDLES, ResizeHandleType } from "./resize-handles";
import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useWindowSize } from "@/modules/window-size/context";
import { useSafeArea } from "@/modules/safe-area/context";
import { clamp } from "@/utils/clamp";

export type Window = {
  id: number;
  app: Application;
};

export type Positioning = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export const WindowFrame = observer(({ id }: { id: number }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "window-frame:" + id,
  });
  const { windows } = windowsStore;
  const window = windows.find((window) => window.id === id);
  const viewportSize = useWindowSize();
  const insets = useSafeArea();

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
  }, [viewportSize]);

  useLayoutEffect(() => {
    if (!window?.focused) return;

    windowsStore.moveToTop(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.focused]);

  const topBarClickTimestampRef = useRef<number>(0);
  const onClick = () => {
    const now = Date.now();
    if (now - topBarClickTimestampRef.current < 300) {
      window?.toggleMaximized();
    }

    topBarClickTimestampRef.current = now;
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  if (!window) return null;

  const { order, app, resizing, focused, positioning, maximized, minimized } =
    window;

  const style = {
    transform: transform
      ? `translate3d(${clamp(
          transform.x,
          0 - positioning.x - (positioning.width - 200),
          viewportSize.width - positioning.x - 200
        )}px, ${clamp(
          transform.y,
          0 - positioning.y,
          viewportSize.height - positioning.y - 30 * 4
        )}px, 0)`
      : minimized
      ? `translate3d(${
          navBarItemBounds
            ? navBarItemBounds.x -
              positioning.x -
              positioning.width / 2 +
              navBarItemBounds.width / 2
            : viewportSize.width / 2
        }px, ${
          navBarItemBounds
            ? -positioning.y +
              navBarItemBounds.y -
              positioning.height / 2 +
              navBarItemBounds.height / 2
            : viewportSize.height
        }px, 0) scale(0)`
      : "",
  };

  return (
    <div
      id={window.frameId}
      className={cn(
        "absolute rounded-lg shadow-2xl bg-gray-700 p-0.5 pt-0 touch-manipulation transition-[shadow,top,left,right,bottom,opacity,transform] duration-300",
        (resizing || !transitionInset) && "transition-[shadow]",
        appearIn && "animate-in",
        focused && "shadow-black backdrop-blur-xl bg-background/70",
        maximized && "p-0 rounded-none shadow-none",
        minimized && "opacity-0"
      )}
      {...{ inert: minimized ? "true" : undefined }}
      style={{
        ...(maximized
          ? {
              left: insets.left,
              top: insets.top,
              right: insets.right,
              bottom: insets.bottom,
            }
          : {
              left: positioning.x,
              top: positioning.y,
              right: viewportSize.width - positioning.x - positioning.width,
              bottom: viewportSize.height - positioning.y - positioning.height,
            }),
        zIndex: order,
        ...style,
      }}
      tabIndex={-1}
    >
      {!focused && (
        <div className="absolute inset-0 rounded-md bg-gray-800/10" />
      )}

      <div className="gap-1 h-11 flex-row relative items-center">
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          onMouseUp={onClick}
          className="absolute cursor-default inset-0"
        ></div>

        <div className="pl-3 gap-2 items-center flex-row">
          <img src={app.icon} className="size-4" />
          <span className="font-medium text-sm">{app.name}</span>
        </div>

        <div className="flex-row z-[1] gap-0.5 mr-0.5 ml-auto">
          <Button
            variant="ghost"
            className="cursor-default"
            size="icon"
            title="Minimize"
            onClick={handleMinimize}
          >
            <span className="sr-only">Close</span>
            <MinusIcon className="size-5" />
          </Button>
          <Button
            variant="ghost"
            className="cursor-default"
            size="icon"
            title="Maximize"
            onClick={() => window.toggleMaximized()}
          >
            <span className="sr-only">Maximize</span>
            <SquareIcon className="size-4" />
          </Button>
          <Button
            variant="destructive"
            className="cursor-default bg-transparent shadow-none"
            size="icon"
            onClick={() => {
              windowsStore.closeWindow(id);
            }}
            title="Close"
          >
            <span className="sr-only">Close</span>
            <XIcon className="size-5" />
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "grow rounded-md overflow-hidden",
          maximized && "rounded-none"
        )}
      >
        <iframe
          id={window.iFrameId}
          ref={iframeRef}
          src={app.href}
          className={cn(
            "grow",
            (resizing || transform) && "pointer-events-none"
          )}
        />
      </div>

      <ResizeHandles windowId={id} />
    </div>
  );
});

function ResizeHandles({ windowId }: { windowId: number }) {
  return (
    <>
      {RESIZE_HANDLES.map((handle) => (
        <ResizeHandle key={handle} handle={handle} windowId={windowId} />
      ))}
    </>
  );
}

const resizeHandleClassNames = cva("absolute", {
  variants: {
    handle: {
      n: "h-1 top-0 left-0 right-0 cursor-ns-resize",
      s: "h-1 bottom-0 left-0 right-0 cursor-ns-resize",
      w: "w-1 left-0 top-0 bottom-0 cursor-ew-resize",
      e: "w-1 right-0 top-0 bottom-0 cursor-ew-resize",
      ne: "size-4 top-0 right-0 cursor-nesw-resize",
      se: "size-4 bottom-0 right-0 cursor-nwse-resize",
      sw: "size-4 bottom-0 left-0 cursor-nesw-resize",
      nw: "size-4 top-0 left-0 cursor-nwse-resize",
    } satisfies Record<ResizeHandleType, string>,
  },
});

function ResizeHandle({
  handle,
  windowId,
}: {
  handle: ResizeHandleType;
  windowId: number;
}) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: "resize-handle:" + windowId + ":" + handle,
    data: {
      handle,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={resizeHandleClassNames({ handle })}
    />
  );
}
