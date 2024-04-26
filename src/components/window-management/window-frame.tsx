import { Application } from "@/apps";
import { useDraggable } from "@dnd-kit/core";

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

export function WindowFrame({
  id,
  app,
  order,
  positioning,
  onFocus,
}: // onPositioningChange, // TODO: implement resize
{
  id: number;
  app: Application;
  order: number;
  positioning: Positioning;
  onFocus: (id: number) => void;
  onPositioningChange: (id: number, positioning: Positioning) => void;
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "window-frame:" + id,
  });

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
      className="absolute rounded-lg shadow-xl bg-background/70 backdrop-blur-xl p-0.5 pt-0 touch-manipulation"
      style={{
        left: positioning.x,
        top: positioning.y,
        width: positioning.width,
        height: positioning.height,
        zIndex: order + 1,
        ...style,
      }}
      onFocus={() => onFocus(id)}
      onClick={() => onFocus(id)}
    >
      <div className="h-11"></div>
      <div className="items-center bg-gray-400 grow rounded-md overflow-hidden justify-center">
        {app.name}
      </div>
    </div>
  );
}
