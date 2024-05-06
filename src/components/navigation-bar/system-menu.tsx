import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import { ExternalLinkIcon, GripIcon } from "lucide-react";
import { Button } from "../ui/button";
import { windowsStore } from "../windows/windows-store";
import { applications } from "@/apps";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { linkedInInfo } from "@/modules/info/linked-in";
import { githubInfo } from "@/modules/info/github";

export const SystemMenu = observer(() => {
  const [open, setOpen] = useState(false);
  const { windows } = windowsStore;
  const someWindowMaximized = windows.some((w) => w.maximized);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "group h-auto hover:bg-transparent px-0 py-2 flex-row flex items-stretch mt-0 transition-[margin-top]",
            someWindowMaximized && "mt-2"
          )}
        >
          <div className="flex-row ml-4 group-hover:bg-accent px-4 items-center justify-center rounded-md size-12 my-auto">
            <GripIcon className="size-6" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        alignOffset={8}
        className="backdrop-blur-xl bg-background/70 gap-3"
      >
        <div className="gap-2">
          <span className="text-sm font-medium ml-2">Apps</span>

          {applications.map((app) => (
            <Button
              variant="ghost"
              className="justify-start px-2"
              onClick={() => {
                windowsStore.openWindow(app);
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
