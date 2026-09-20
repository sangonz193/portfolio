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
    <div className="relative h-10 flex-row items-center gap-1 bg-[#11161b] after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/[0.06]">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onMouseUp={onMouseUp}
        className="absolute inset-0 cursor-default"
      ></div>

      <div className="pointer-events-none flex-row items-center gap-2.5 pl-3.5">
        <WindowIcon icon={config.icon} className="size-5" />
        <span className="text-[13px] font-medium tracking-[0.01em] text-[#e8e2d9]">
          {config.name}
        </span>
      </div>

      <div className="z-[1] ml-auto mr-1 flex-row items-center gap-0.5">
        {config.infoWindow && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={
                  windowsStore.windows.some(
                    (w) => w.config.id === config.infoWindow?.id,
                  )
                    ? "outline"
                    : "default"
                }
                size="sm"
                className="h-8 w-10 cursor-default bg-white/[0.035] px-2 @md:w-auto"
                onClick={() => windowsStore.openWindow(config.infoWindow!)}
              >
                <InfoIcon className="size-5" />
                <span className="sr-only @md:not-sr-only">About</span>
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
              className="h-8 w-8 cursor-default rounded-md text-[#aeb6ba]"
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
              className="h-8 w-8 cursor-default rounded-md text-[#aeb6ba]"
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
              className="h-8 w-8 cursor-default rounded-md bg-transparent text-[#aeb6ba] shadow-none hover:bg-[#a6464f] hover:text-white"
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
