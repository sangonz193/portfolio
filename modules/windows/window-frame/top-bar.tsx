import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WindowIcon } from "../window-icon";
import { WindowStore } from "../window-store";
import { Button } from "@/components/ui/button";
import { InfoIcon, MinusIcon, SquareIcon, XIcon } from "lucide-react";
import { windowsStore } from "../windows-store";
import { useDraggable } from "@dnd-kit/core";

type Props = {
  window: WindowStore;
  onMinimize: () => void;
  onMouseUp: () => void;
  listeners: ReturnType<typeof useDraggable>["listeners"];
  attributes: ReturnType<typeof useDraggable>["attributes"];
  setNodeRef: ReturnType<typeof useDraggable>["setNodeRef"];
};

export function TopBar({
  window,
  onMinimize,
  onMouseUp,
  attributes,
  listeners,
  setNodeRef,
}: Props) {
  const { config } = window;

  return (
    <div className="gap-1 h-11 flex-row relative items-center">
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        onMouseUp={onMouseUp}
        className="absolute cursor-default inset-0"
      ></div>

      <div className="pl-3 gap-2 items-center flex-row">
        <WindowIcon icon={config.icon} className="size-4" />
        <span className="font-medium text-sm">{config.name}</span>
      </div>

      <div className="flex-row z-[1] gap-0.5 mr-0.5 ml-auto">
        {config.infoWindow && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="cursor-default px-2 w-10 @md:w-auto"
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
              className="cursor-default bg-transparent shadow-none text-foreground hover:text-destructive-foreground"
              size="icon"
              onClick={() => {
                windowsStore.closeWindow(window.id);
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
  );
}
