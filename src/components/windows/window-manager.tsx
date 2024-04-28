import { ResizeHandleType, WindowFrame } from "./window-frame";
import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { cn } from "@/lib/cn";
import { windowsStore } from "./windows-store";

type Props = {
  className?: string;
};

export function WindowManager({ className }: Props) {
  const { windows } = windowsStore;

  const { setNodeRef } = useDroppable({
    id: "window-manager",
  });

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        const dragId = event.active.id;
        if (typeof dragId !== "string") return;

        if (dragId.startsWith("window-frame:")) {
          const windowId = dragId.split(":")[1];
          windowsStore.focusWindow(Number(windowId));
        }
      }}
      onDragMove={(event) => {
        const dragId = event.active.id;
        if (typeof dragId !== "string") return;

        if (dragId.startsWith("resize-handle:")) {
          const windowId = dragId.split(":")[1];
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId)
          );
          if (!window) return;

          const { handle } = event.active.data.current as {
            handle: ResizeHandleType;
          };

          switch (handle) {
            case "e":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  width: window.positioning.width + event.delta.x,
                },
              });
              break;
            case "w":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  x: window.positioning.x + event.delta.x,
                  width: window.positioning.width - event.delta.x,
                },
              });
              break;
            case "n":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  y: window.positioning.y + event.delta.y,
                  height: window.positioning.height - event.delta.y,
                },
              });
              break;
            case "s":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  height: window.positioning.height + event.delta.y,
                },
              });
              break;
            case "ne":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  y: window.positioning.y + event.delta.y,
                  width: window.positioning.width + event.delta.x,
                  height: window.positioning.height - event.delta.y,
                },
              });
              break;
            case "se":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  width: window.positioning.width + event.delta.x,
                  height: window.positioning.height + event.delta.y,
                },
              });
              break;
            case "sw":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  x: window.positioning.x + event.delta.x,
                  width: window.positioning.width - event.delta.x,
                  height: window.positioning.height + event.delta.y,
                },
              });
              break;
            case "nw":
              windowsStore.resizeWindow(window.id, {
                ...window.positioning,
                resizing: {
                  ...window.positioning,
                  x: window.positioning.x + event.delta.x,
                  y: window.positioning.y + event.delta.y,
                  width: window.positioning.width - event.delta.x,
                  height: window.positioning.height - event.delta.y,
                },
              });
              break;
          }
        }
      }}
      onDragEnd={(event) => {
        const dragId = event.active.id;
        if (typeof dragId !== "string") return;

        if (dragId.startsWith("resize-handle:")) {
          const windowId = dragId.split(":")[1];
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId)
          );
          if (!window) return;

          windowsStore.resizeWindow(window.id, {
            ...window.positioning,
            ...window.positioning.resizing,
          });
          windowsStore.commitResize(window.id);
        } else if (dragId.startsWith("window-frame:")) {
          const windowId = dragId.split(":")[1];
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId)
          );
          if (!window) return;

          windowsStore.resizeWindow(window.id, {
            ...window.positioning,
            x: window.positioning.x + event.delta.x,
            y: window.positioning.y + event.delta.y,
          });

          windowsStore.commitResize(window.id);
        }
      }}
    >
      <div className={cn("relative z-[1]", className)} ref={setNodeRef}>
        {windows.map(({ id }) => {
          return <WindowFrame key={id} id={id} />;
        })}
      </div>
    </DndContext>
  );
}
