import { Application } from "@/apps";
import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { windowsStore } from "./windows-store";
import { observer } from "mobx-react-lite";
import { cva } from "class-variance-authority";
import { RESIZE_HANDLES, ResizeHandleType } from "./resize-handles";
import { MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";

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
  if (!window) return null;

  const { order, app, resizing, focused } = window;
  const { positioning } = window;

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div
      className={cn(
        "absolute rounded-lg shadow-2xl bg-gray-700 p-0.5 pt-0 touch-manipulation transition-shadow duration-75 animate-in",
        focused && "shadow-black backdrop-blur-lg bg-background/50"
      )}
      style={{
        left: positioning.x,
        top: positioning.y,
        width: positioning.width,
        height: positioning.height,
        zIndex: order,
        ...style,
      }}
      onFocus={() => windowsStore.focusWindow(id)}
      onClick={() => windowsStore.focusWindow(id)}
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

        <span className="pl-3 font-medium text-sm">{app.name}</span>

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

      <div className="bg-gray-500 grow rounded-md overflow-hidden">
        <iframe
          ref={iframeRef}
          src="https://data-loom-portfolio.sgonzalez.dev"
          // src="http://localhost:3000"
          className={cn(
            "grow",
            (resizing || transform) && "pointer-events-none"
          )}
        />
        {/* <div className="grow justify-center items-center">
          <span>{app.name}</span>
        </div> */}
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
