import { observer } from "mobx-react-lite"
import { useEffect, useRef } from "react"

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

  const taskbarRef = useRef<HTMLDivElement>(null)
  const windowCount = windowsStore.windows.length
  const prevWindowCount = useRef(windowCount)
  useEffect(() => {
    const opened = windowCount > prevWindowCount.current
    prevWindowCount.current = windowCount
    if (!opened) return

    const taskbar = taskbarRef.current
    if (taskbar) taskbar.scrollLeft = taskbar.scrollWidth
  }, [windowCount])

  return (
    <div
      className={cn("absolute bottom-0 left-0 right-0 z-50 h-16", className)}
    >
      <div
        className={cn(
          "absolute inset-2 top-0 rounded-[14px] bg-[#11171d]/90 shadow-[0_18px_55px_rgb(0_0_0/0.44),inset_0_1px_0_rgb(255_255_255/0.07)] ring-1 ring-white/[0.07] backdrop-blur-xl transition-[inset,border-radius]",
          !detached &&
            "inset-0 rounded-none ring-0 before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-white/10",
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
          <div
            ref={taskbarRef}
            className="shrink grow flex-row gap-0.5 self-stretch overflow-auto px-2"
          >
            {windowsStore.windows.map((window) => (
              <Button
                ref={(r) => window.setNavBarItemRef(r)}
                key={window.id}
                variant="ghost"
                className={cn(
                  "relative my-auto h-10 cursor-default gap-2.5 rounded-md px-3 text-[#cbd0d2] hover:bg-white/[0.045]",
                  window.focused &&
                    "bg-transparent text-[#f3eee5] after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-[#e36c9e]",
                )}
                onClick={() => window.requestFocus()}
              >
                <WindowIcon icon={window.config.icon} className="size-6" />
                <span className="hidden xs:inline">{window.config.name}</span>
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
