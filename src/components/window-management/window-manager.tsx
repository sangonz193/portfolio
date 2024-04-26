import { Application, applications } from "@/apps";
import { useEffect, useState } from "react";
import { Positioning, WindowFrame } from "./window-frame";
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

type Props = {
  className?: string;
};

export function WindowManager({ className }: Props) {
  const [windows] = useState<{ id: number; app: Application }[]>(
    applications.map((app, index) => ({ app, id: index }))
  );

  const [order, setOrder] = useState(() => windows.map((window) => window.id));

  const [positioningMap, setPositioningMap] = useState(
    () => new Map<number, Positioning>()
  );
  const { setNodeRef } = useDroppable({
    id: "window-manager",
  });

  useEffect(() => {
    windows.forEach(({ id }) => {
      setPositioningMap((positioningMap) => {
        if (!positioningMap.has(id)) {
          return new Map([
            ...positioningMap,
            [id, { x: 0, y: 0, height: 300, width: 300 }],
          ]);
        }
        return positioningMap;
      });
    });
  }, [windows]);

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
          setOrder((order) => {
            const newOrder = order.filter((id) => id !== Number(windowId));
            newOrder.push(Number(windowId));
            return newOrder;
          });
        }
      }}
      onDragEnd={(event) => {
        const dragId = event.active.id;
        if (typeof dragId !== "string") return;

        if (dragId.startsWith("window-frame:")) {
          const windowId = dragId.split(":")[1];
          const positioning = positioningMap.get(Number(windowId));
          if (!positioning) return;

          setPositioningMap((positioningMap) => {
            const newMap = new Map(positioningMap);
            newMap.set(Number(windowId), {
              ...positioning,
              x: positioning.x + event.delta.x,
              y: positioning.y + event.delta.y,
            });
            return newMap;
          });
        }
      }}
    >
      <div className={cn("relative z-[1]", className)} ref={setNodeRef}>
        {windows.map(({ app, id }) => {
          const positioning = positioningMap.get(id);
          if (!positioning) {
            return null;
          }

          return (
            <WindowFrame
              key={id}
              id={id}
              app={app}
              order={order.indexOf(id)}
              positioning={positioning}
              focused={order[order.length - 1] === id}
              onFocus={(id) => {
                setOrder((order) => {
                  const newOrder = order.filter((windowId) => windowId !== id);
                  newOrder.push(id);
                  return newOrder;
                });
              }}
              onPositioningChange={(id, positioning) => {
                setPositioningMap((positioningMap) => {
                  const newMap = new Map(positioningMap);
                  newMap.set(id, positioning);
                  return newMap;
                });
              }}
            />
          );
        })}
      </div>
    </DndContext>
  );
}
