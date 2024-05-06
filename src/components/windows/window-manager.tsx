import { WindowFrame } from "./window-frame";
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
import { ResizeHandleType } from "./resize-handles";
import { observer } from "mobx-react-lite";

type Props = {
  className?: string;
};

export const WindowManager = observer(({ className }: Props) => {
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
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId)
          );
          if (!window) return;

          if (window.maximized) {
            window.toggleMaximized();
          }
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

          window.resize(handle, event.delta);
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

          window.commitResize();
        } else if (dragId.startsWith("window-frame:")) {
          const windowId = dragId.split(":")[1];
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId)
          );
          if (!window) return;

          window.move(event.delta);
        }
      }}
    >
      <div className={cn("relative z-[1] grow", className)} ref={setNodeRef}>
        {windows.map(({ id }) => {
          return <WindowFrame key={id} id={id} />;
        })}
      </div>
    </DndContext>
  );
});
