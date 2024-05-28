import { GripIcon } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/cn"
import { Application } from "@/modules/apps/app"
import { dataLoomApp } from "@/modules/apps/data-loom/app"
import { meApp } from "@/modules/apps/me/app"
import { openfingApp } from "@/modules/apps/openfing/app"
import { spendSplitterApp } from "@/modules/apps/spend-splitter/app"
import { WindowIcon } from "@/modules/windows/window-icon"
import { windowsStore } from "@/modules/windows/windows-store"

import { detachedStore } from "./detached"

export const applications: Application[] = [
  dataLoomApp,
  openfingApp,
  spendSplitterApp,
]

export const SystemMenu = observer(() => {
  const [open, setOpen] = useState(false)
  const detached = detachedStore.get()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "peer absolute bottom-0 left-0 top-0 h-auto w-12 cursor-default self-stretch px-0 hover:bg-transparent focus-visible:ring-0",
                detached && "-bottom-2 -left-2 w-14",
              )}
            >
              <div className="sr-only">Open System Menu</div>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>System Menu</TooltipContent>
      </Tooltip>

      <div
        className={cn(
          "my-auto ml-2 size-10 flex-row items-center justify-center rounded-md px-4 ring-ring peer-hover:bg-accent/50 peer-focus-visible:ring-1",
        )}
      >
        <GripIcon className="size-6" />
      </div>

      <PopoverContent
        align="start"
        alignOffset={8}
        className="gap-4 bg-background/70 backdrop-blur-xl"
      >
        <div className="gap-2">
          <span className="ml-2 text-sm font-semibold text-muted-foreground">
            About me
          </span>

          {renderApp(meApp)}
        </div>

        <div className="gap-2">
          <span className="ml-2 text-sm font-semibold text-muted-foreground">
            Personal Projects
          </span>

          {applications.map((app) => renderApp(app))}
        </div>
      </PopoverContent>
    </Popover>
  )

  function renderApp(app: Application) {
    return (
      <Button
        key={app.name}
        variant="ghost"
        className="cursor-default justify-start px-2"
        onClick={() => {
          windowsStore.openApp(app)
          setOpen(false)
        }}
      >
        <WindowIcon icon={{ type: "url", src: app.icon }} className="size-6" />
        {app.name}
      </Button>
    )
  }
})
