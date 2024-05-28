import { useDraggable } from "@dnd-kit/core"
import { InfoIcon, MinusIcon, SquareIcon, XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { WindowIcon } from "../window-icon"
import { WindowStore } from "../window-store"
import { windowsStore } from "../windows-store"

type Props = {
  window: WindowStore
  onMinimize: () => void
  onMouseUp: () => void
  listeners: ReturnType<typeof useDraggable>["listeners"]
  attributes: ReturnType<typeof useDraggable>["attributes"]
  setNodeRef: ReturnType<typeof useDraggable>["setNodeRef"]
}

export function TopBar({
  window,
  onMinimize,
  onMouseUp,
  attributes,
  listeners,
  setNodeRef,
}: Props) {
  const { config } = window

  return (
    <div className="relative h-11 flex-row items-center gap-1">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onMouseUp={onMouseUp}
        className="absolute inset-0 cursor-default"
      ></div>

      <div className="flex-row items-center gap-2 pl-3">
        <WindowIcon icon={config.icon} className="size-5" />
        <span className="text-sm font-medium">{config.name}</span>
      </div>

      <div className="z-[1] ml-auto mr-0.5 flex-row gap-0.5">
        {config.infoWindow && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-10 cursor-default px-2 @md:w-auto"
                onClick={() => windowsStore.openWindow(config.infoWindow!)}
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
              onClick={onMinimize}
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
              className="cursor-default bg-transparent text-foreground shadow-none hover:text-destructive-foreground"
              size="icon"
              onClick={() => {
                windowsStore.closeWindow(window.id)
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
  )
}
