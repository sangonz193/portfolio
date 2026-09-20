import { GripIcon, MailIcon } from "lucide-react"
import { observer } from "mobx-react-lite"
import { ReactNode, useState } from "react"

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
import { meApp } from "@/modules/apps/me/app"
import { App } from "@/modules/apps/schema"
import { workApp } from "@/modules/apps/work/app"
import { workFileSystem } from "@/modules/files/filesystem"
import { FolderFile } from "@/modules/files/schema"
import { emailInfo } from "@/modules/info/email"
import { WindowIcon } from "@/modules/windows/window-icon"
import { windowsStore } from "@/modules/windows/windows-store"

import { detachedStore } from "./detached"

const projectFolders = workFileSystem.children.filter((item): item is FolderFile => item.kind === "folder")

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
              <span className="sr-only">Open System Menu</span>
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>

        <TooltipContent>System Menu</TooltipContent>
      </Tooltip>

      <div
        className={cn(
          "my-auto ml-2 size-10 flex-row items-center justify-center rounded-lg px-4 text-[#e9e2d7] ring-ring transition-[background-color,box-shadow] peer-hover:bg-white/[0.06] peer-focus-visible:ring-2",
        )}
      >
        <GripIcon className="size-6" />
      </div>

      <PopoverContent
        align="start"
        alignOffset={8}
        className="mb-2 w-64 gap-2 bg-[#151b21]/95 p-2.5 backdrop-blur-xl"
      >
        <p className="font-editorial px-2 pb-1 pt-1 text-lg text-[#f3eadc]">
          Open
        </p>

        <div className="gap-0.5">
          {[meApp, workApp].map((app) => renderApp(app))}
          {projectFolders.map((folder) => renderFolder(folder))}
          {renderItem("Contact", <MailIcon className="size-6 p-0.5 text-[#f0a0b8]" />, () => window.open(emailInfo.url, "_self"))}
        </div>
      </PopoverContent>
    </Popover>
  )

  function renderApp(app: App) {
    return renderItem(app.name, <WindowIcon icon={app.icon} className="size-6" />, () => windowsStore.openApp(app))
  }

  function renderFolder(folder: FolderFile) {
    const Icon = folder.icon
    return renderItem(folder.name, <Icon className="size-6" />, () => windowsStore.openWorkFolder(`/${workFileSystem.name}/${folder.name}`))
  }

  function renderItem(name: string, icon: ReactNode, open: () => void) {
    return (
      <Button
        key={name}
        variant="ghost"
        className="h-10 cursor-default justify-start rounded-md px-2 text-[#cbd0d2] hover:bg-white/[0.055] hover:text-[#f3eee5]"
        onClick={() => {
          open()
          setOpen(false)
        }}
      >
        {icon}
        {name}
      </Button>
    )
  }
})
