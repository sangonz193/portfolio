import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { ExternalLinkIcon, GripIcon } from "lucide-react"
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
import { applications } from "@/modules/apps"
import { githubInfo } from "@/modules/info/github"
import { linkedInInfo } from "@/modules/info/linked-in"
import { WindowIcon } from "@/modules/windows/window-icon"
import { windowsStore } from "@/modules/windows/windows-store"


import { detachedStore } from "./detached"


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
                "peer absolute bottom-0 left-0 top-0 h-auto w-12 self-stretch px-0 hover:bg-transparent focus-visible:ring-0",
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
        className="gap-3 bg-background/70 backdrop-blur-xl"
      >
        <div className="gap-2">
          <span className="ml-2 text-sm font-medium">Apps</span>

          {applications.map((app, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start px-2"
              onClick={() => {
                windowsStore.openApp(app)
                setOpen(false)
              }}
            >
              <WindowIcon
                icon={{ type: "url", src: app.icon }}
                className="size-6"
              />
              {app.name}
            </Button>
          ))}
        </div>

        <div className="gap-2">
          <span className="ml-2 text-sm font-medium">Links</span>

          <Link
            href={githubInfo.url}
            title="GitHub Profile"
            Icon={GitHubLogoIcon}
            onClose={() => setOpen(false)}
          />

          <Link
            href={linkedInInfo.url}
            title="LinkedIn Profile"
            Icon={LinkedInLogoIcon}
            onClose={() => setOpen(false)}
            iconClassName="text-[#0762C8]"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
})

function Link({
  href,
  title,
  Icon,
  iconClassName,
  onClose,
}: {
  href: string
  title: string
  Icon: typeof LinkedInLogoIcon
  iconClassName?: string
  onClose: () => void
}) {
  return (
    <Button
      variant="ghost"
      className="justify-start px-2"
      asChild
      onClick={onClose}
    >
      <a
        className="cursor-pointer"
        href={href}
        target="_blank"
        rel="noreferrer noopener"
      >
        <Icon className={cn("size-6", iconClassName)} />
        <span className="grow">{title}</span>
        <ExternalLinkIcon className="size-4" />
      </a>
    </Button>
  )
}
