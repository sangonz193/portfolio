import { observer } from "mobx-react-lite"

import { cn } from "@/lib/cn"
import { WindowIcon } from "@/modules/windows/window-icon"
import { windowsStore } from "@/modules/windows/windows-store"

import { DateAndTime } from "./date-time"
import { detachedStore } from "./detached"
import { MaybeBattery } from "./maybe-battery"
import { SystemMenu } from "./system-menu"
import { Button } from "../ui/button"

type Props = {
  className?: string
}

export const NAVIGATION_BAR_HEIGHT = 16 * 4

export const NavigationBar = observer(({ className }: Props) => {
  const detached = detachedStore.get()

  return (
    <div
      className={cn("absolute bottom-0 left-0 right-0 z-[1] h-16", className)}
    >
      <div
        className={cn(
          "absolute inset-2 top-0 rounded-md bg-background/70 shadow-xl backdrop-blur-xl transition-[inset,border-radius]",
          !detached && "inset-0 rounded-none",
        )}
      />

      <div
        className={cn(
          "absolute inset-2 top-0 grow flex-row items-center transition-[inset]",
          !detached && "inset-0",
        )}
      >
        <SystemMenu />

        <div className="shrink grow flex-row self-stretch">
          <div className="shrink grow flex-row gap-1 self-stretch overflow-auto px-2">
            {windowsStore.windows.map((window) => (
              <Button
                ref={window.navBarItemRef}
                key={window.id}
                variant="ghost"
                className={cn(
                  "my-auto h-auto cursor-default px-3",
                  window.focused && "bg-white/20",
                )}
                onClick={() => window.requestFocus()}
              >
                <WindowIcon icon={window.config.icon} className="size-6" />
                {window.config.name}
              </Button>
            ))}
          </div>
        </div>

        <MaybeBattery className="mr-1 px-2" />

        <DateAndTime />
      </div>
    </div>
  )
})
