import { Application } from "@/apps";
import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { windowsStore } from "../windows-store";
import { observer } from "mobx-react-lite";
import { cva } from "class-variance-authority";
import { RESIZE_HANDLES, ResizeHandleType } from "../resize-handles";
import { InfoIcon, MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSafeArea } from "@/modules/safe-area/context";
import { clamp } from "@/utils/clamp";
import { viewportSizeStore } from "@/modules/viewport-size/store";

import { WindowFrameContent } from "./content";
import { WindowIcon } from "../window-icon";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  }, [viewportSizeStore]);

  useLayoutEffect(() => {
    if (!window?.focused) return;

    windowsStore.moveToTop(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window?.focused]);

  const topBarClickTimestampRef = useRef<number>(0);
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

  if (!window) return null;

  const {
    order,
    config,
    resizing,
    focused,
    positioning,
    maximized,
    minimized,
  } = window;

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

  const handleOpenInfo = () => {
    if (!config.infoWindow) return;
    windowsStore.openWindow(config.infoWindow);
  };

  return (
    <div
      id={window.frameId}
      className={cn(
        "@container absolute rounded-lg shadow-2xl bg-gray-700 p-0.5 pt-0 touch-manipulation transition-[shadow,top,left,right,bottom,opacity,transform] duration-300",
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
              right:
                viewportSizeStore.width - positioning.x - positioning.width,
              bottom:
                viewportSizeStore.height - positioning.y - positioning.height,
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
          <WindowIcon config={config} className="size-4" />
          <span className="font-medium text-sm">{config.name}</span>
        </div>

        <div className="flex-row z-[1] gap-0.5 mr-0.5 ml-auto">
          {config.infoWindow && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="cursor-default px-2 w-10 @md:w-auto"
                  onClick={handleOpenInfo}
                >
                  <InfoIcon className="size-5" />
                  <span className="sr-only @md:not-sr-only">Info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                Show information about {config.name}
              </TooltipContent>
            </Tooltip>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="cursor-default"
                size="icon"
                onClick={handleMinimize}
              >
                <span className="sr-only">Minimize</span>
                <MinusIcon className="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Minimize</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="cursor-default"
                size="icon"
                onClick={() => window.toggleMaximized()}
              >
                <span className="sr-only">Maximize</span>
                <SquareIcon className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Maximize</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>
            <TooltipContent>Close</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div
        className={cn(
          "grow rounded-md overflow-hidden",
          maximized && "rounded-none"
        )}
      >
        <WindowFrameContent window={window} moving={!!transform} />
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
