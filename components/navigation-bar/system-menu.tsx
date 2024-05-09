import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import { ExternalLinkIcon, GripIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { windowsStore } from "@/modules/windows/windows-store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { linkedInInfo } from "@/modules/info/linked-in";
import { githubInfo } from "@/modules/info/github";
import { detachedStore } from "./detached";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { applications } from "@/modules/apps";

export const SystemMenu = observer(() => {
  const [open, setOpen] = useState(false);
  const detached = detachedStore.get();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "peer h-auto px-0 self-stretch hover:bg-transparent absolute left-0 w-12 bottom-0 top-0 focus-visible:ring-0",
                detached && "-bottom-2 -left-2 w-14"
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
          "flex-row ml-2 peer-hover:bg-accent/50 px-4 items-center justify-center rounded-md size-10 my-auto peer-focus-visible:ring-1 ring-ring"
        )}
      >
        <GripIcon className="size-6" />
      </div>

      <PopoverContent
        align="start"
        alignOffset={8}
        className="backdrop-blur-xl bg-background/70 gap-3"
      >
        <div className="gap-2">
          <span className="text-sm font-medium ml-2">Apps</span>

          {applications.map((app, index) => (
            <Button
              key={index}
              variant="ghost"
              className="justify-start px-2"
              onClick={() => {
                windowsStore.openApp(app);
                setOpen(false);
              }}
            >
              <img src={app.icon} className="size-6" />
              {app.name}
            </Button>
          ))}
        </div>

        <div className="gap-2">
          <span className="text-sm font-medium ml-2">Links</span>

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
          />
        </div>
      </PopoverContent>
    </Popover>
  );
});

function Link({
  href,
  title,
  Icon,
  onClose,
}: {
  href: string;
  title: string;
  Icon: typeof LinkedInLogoIcon;
  onClose: () => void;
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
        <Icon className="size-5" />
        <span className="grow">{title}</span>
        <ExternalLinkIcon className="size-4" />
      </a>
    </Button>
  );
}
