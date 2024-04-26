import { Application } from "@/apps";
import { cn } from "@/lib/cn";
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
  focused,
  onFocus,
}: // onPositioningChange, // TODO: implement resize
{
  id: number;
  app: Application;
  order: number;
  focused: boolean;
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
