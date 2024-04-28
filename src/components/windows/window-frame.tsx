import { Application } from "@/apps";
import { cn } from "@/lib/cn";
import { useDraggable } from "@dnd-kit/core";
import { windowsStore } from "./windows-store";
import { observer } from "mobx-react-lite";
import { cva } from "class-variance-authority";

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

  const { order, app, focused } = window;
  const positioning = window.positioning.resizing || window.positioning;

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "absolute rounded-lg shadow-2xl bg-background/70 backdrop-blur-xl p-0.5 pt-0 touch-manipulation transition-shadow duration-75",
        focused && "shadow-black"
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
    >
      <div className="h-11"></div>

      <div className="items-center bg-gray-400 grow rounded-md overflow-hidden justify-center">
        {/* <iframe
          ref={iframeRef}
          src="https://data-loom.vercel.app"
          className="grow"
          onFocusCapture={() => onFocus(id)}
        /> */}
        <span>{app.name}</span>
        <span>{order}</span>
      </div>

      <ResizeHandles windowId={id} />
    </div>
  );
});

function ResizeHandles({ windowId }: { windowId: number }) {
  return (
    <>
      {resizeHandles.map((handle) => (
        <ResizeHandle key={handle} handle={handle} windowId={windowId} />
      ))}
    </>
  );
}

const resizeHandles = ["n", "s", "w", "e", "ne", "se", "sw", "nw"] as const;
export type ResizeHandleType = (typeof resizeHandles)[number];

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
