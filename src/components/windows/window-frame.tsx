import { Application } from "@/apps";
import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { windowsStore } from "./windows-store";
import { observer } from "mobx-react-lite";
import { cva } from "class-variance-authority";
import { RESIZE_HANDLES, ResizeHandleType } from "./resize-handles";
import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "@/modules/window-size/context";
import { useSafeArea } from "@/modules/safe-area/context";

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
    const timeout = setTimeout(() => setAppearIn(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (!window) return null;

  const { order, app, resizing, focused } = window;
  const { positioning, maximized } = window;

  const style = transform && {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  };

  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div
      id={window.frameId}
      className={cn(
        "absolute rounded-lg shadow-2xl bg-gray-700 p-0.5 pt-0 touch-manipulation transition-shadow duration-75",
        appearIn && "animate-in",
        focused && "shadow-black backdrop-blur-lg bg-background/50",
        maximized && "p-0 rounded-none"
      )}
      style={{
        ...(!maximized
          ? {
              left: positioning.x,
              top: positioning.y,
              width: positioning.width,
              height: positioning.height,
            }
          : {
              left: 0,
              top: 0,
              width: viewportSize.width,
              height: viewportSize.height - insets.bottom,
            }),
        zIndex: order,
        ...style,
      }}
      tabIndex={-1}
      onFocus={() => windowsStore.notifyWindowsFocused(id)}
      onClick={() => windowsStore.notifyWindowsFocused(id)}
    >
      {!focused && (
        <div className="absolute inset-0 rounded-md bg-gray-800/10" />
      )}

      <div className="gap-1 h-11 flex-row relative items-center">
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
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
      n: "h-1 top-0 left-0 right-0 cursor-n-resize",
      s: "h-1 bottom-0 left-0 right-0 cursor-s-resize",
      w: "w-1 left-0 top-0 bottom-0 cursor-w-resize",
      e: "w-1 right-0 top-0 bottom-0 cursor-e-resize",
      ne: "size-4 top-0 right-0 cursor-ne-resize",
      se: "size-4 bottom-0 right-0 cursor-se-resize",
      sw: "size-4 bottom-0 left-0 cursor-sw-resize",
      nw: "size-4 top-0 left-0 cursor-nw-resize",
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
