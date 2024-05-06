import { cn } from "@/lib/cn";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { windowsStore } from "../windows/windows-store";
import { observer } from "mobx-react-lite";
import { SystemMenu } from "./system-menu";
import { MaybeBattery } from "./maybe-battery";

type Props = {
  className?: string;
};

export const NavigationBar = observer(({ className }: Props) => {
  const { windows } = windowsStore;
  const someWindowMaximized = windows.some((w) => w.maximized);
  return (
    <div
      className={cn("absolute bottom-0 left-0 right-0 h-20 z-[1]", className)}
    >
      <div
        className={cn(
          "backdrop-blur-xl bg-background/70 rounded-md inset-2 absolute shadow-xl transition-[inset,border-radius]",
          someWindowMaximized && "inset-0 top-2 rounded-none"
        )}
      />

      <div className="flex-row relative grow">
        <SystemMenu />

        <div
          className={cn(
            "flex-row grow shrink my-2 transition-[margin-bottom]",
            someWindowMaximized && "mb-0"
          )}
        >
          <div className="overflow-auto py-2 gap-1 px-2 grow flex-row shrink scrollbar scrollbar-thumb-white/40 scrollbar-track-transparent">
            {windowsStore.windows.map((window) => (
              <Button
                key={window.id}
                variant="ghost"
                className={cn("h-auto", window.focused && "bg-white/20")}
                onClick={() => window.requestFocus()}
              >
                <img src={window.app.icon} className="size-6" />
                {window.app.name}
              </Button>
            ))}
          </div>
        </div>

        <MaybeBattery className="px-2" />

        <DateAndTime />
      </div>
    </div>
  );
});

const DateAndTime = observer(() => {
  const { windows } = windowsStore;
  const someWindowMaximized = windows.some((w) => w.maximized);

  const date = new Date();

  const [, forceUpdate] = useState<object>();
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "justify-center gap-0.5 pr-6 transition-[margin-top]",
        someWindowMaximized && "mt-2"
      )}
    >
      <span className="text-white text-sm font-mono text-right">
        {date.toLocaleTimeString()}
      </span>
      <span className="text-white text-xs font-mono ml-2 text-right">
        {date.toLocaleDateString()}
      </span>
    </div>
  );
});
