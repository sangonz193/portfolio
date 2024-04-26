import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn";
import { GripIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  className?: string;
};

export function NavigationBar({ className }: Props) {
  return (
    <div
      className={cn("absolute bottom-0 left-0 right-0 h-20 z-[1]", className)}
    >
      <div className="backdrop-blur-xl bg-background/70 rounded-md inset-2 absolute shadow-xl" />

      <div className="flex-row relative grow">
        <SystemMenu />

        <div className="grow" />

        <DateAndTime />
      </div>
    </div>
  );
}

function SystemMenu() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="group h-auto py-2 flex-row flex items-stretch">
          <div className="flex-row ml-4 group-hover:bg-accent/50 px-4 items-center justify-center rounded-md size-12 my-auto">
            <GripIcon className="size-6" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" alignOffset={8}>
        Place content for the popover here.
      </PopoverContent>
    </Popover>
  );
}

function DateAndTime() {
  const date = new Date();

  const [, forceUpdate] = useState<object>();
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="justify-center gap-0.5 pl-2 pr-6">
      <span className="text-white text-sm font-mono text-right">
        {date.toLocaleTimeString()}
      </span>
      <span className="text-white text-xs font-mono ml-2 text-right">
        {date.toLocaleDateString()}
      </span>
    </div>
  );
}
