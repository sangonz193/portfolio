import { cva } from "class-variance-authority"
import { RESIZE_HANDLES, ResizeHandleType } from "../resize-handles"
import { useDraggable } from "@dnd-kit/core"

export function ResizeHandles({ windowId }: { windowId: number }) {
  return (
    <>
      {RESIZE_HANDLES.map((handle) => (
        <ResizeHandle key={handle} handle={handle} windowId={windowId} />
      ))}
    </>
  )
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
})

function ResizeHandle({
  handle,
  windowId,
}: {
  handle: ResizeHandleType
  windowId: number
}) {
  const { setNodeRef, listeners, attributes } = useDraggable({
    id: "resize-handle:" + windowId + ":" + handle,
    data: {
      handle,
    },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={resizeHandleClassNames({ handle })}
    />
  )
}
