import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { observer } from "mobx-react-lite"

import { cn } from "@/lib/cn"

import { ResizeHandleType } from "./resize-handles"
import { WindowFrame } from "./window-frame/window-frame"
import { windowsStore } from "./windows-store"

type Props = {
  className?: string
}

export const WindowManager = observer(({ className }: Props) => {
  const { windows } = windowsStore

  const { setNodeRef } = useDroppable({
    id: "window-manager",
  })

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(event) => {
        const dragId = event.active.id
        if (typeof dragId !== "string") return

        if (dragId.startsWith("window-frame:")) {
          const windowId = dragId.split(":")[1]
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId),
          )
          if (!window) return

          window.requestFocus()
        }
      }}
      onDragMove={(event) => {
        const dragId = event.active.id
        if (typeof dragId !== "string") return

        if (dragId.startsWith("window-frame:")) {
          const windowId = dragId.split(":")[1]
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId),
          )
          if (!window) return

          if (window.maximized && Math.abs(event.delta.y) > 5) {
            window.toggleMaximized()
          }
        }

        if (dragId.startsWith("resize-handle:")) {
          const windowId = dragId.split(":")[1]
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId),
          )
          if (!window) return

          const { handle } = event.active.data.current as {
            handle: ResizeHandleType
          }

          window.resize(handle, event.delta)
        }
      }}
      onDragEnd={(event) => {
        const dragId = event.active.id
        if (typeof dragId !== "string") return

        if (dragId.startsWith("resize-handle:")) {
          const windowId = dragId.split(":")[1]
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId),
          )
          if (!window) return

          window.commitResize()
        } else if (dragId.startsWith("window-frame:")) {
          const windowId = dragId.split(":")[1]
          const window = windowsStore.windows.find(
            (window) => window.id === Number(windowId),
          )
          if (!window) return

          window.move(event.delta)
        }
      }}
    >
      <div
        ref={setNodeRef}
        className={cn(
          "pointer-events-none relative z-[1] grow [&>*]:pointer-events-auto",
          className,
        )}
      >
        {windows.map((window) => {
          return <WindowFrame key={window.id} window={window} />
        })}
      </div>
    </DndContext>
  )
})
