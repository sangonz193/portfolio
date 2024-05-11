import { observer } from "mobx-react-lite";
import React from "react";
import { cn } from "@/lib/cn";

export const DateAndTime = observer(() => {
  const date = new Date();

  const [_, forceUpdate] = React.useState<object>();
  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "justify-center grid gap-0.5 pr-6 transition-[grid-template-columns,opacity] duration-500 ease-in-out grid-cols-[0fr] opacity-0",
        _ && "grid-cols-[1fr] opacity-100"
      )}
    >
      <div className="overflow-hidden items-end">
        <span className="text-sm font-mono text-right text-nowrap">
          {_ && date.toLocaleTimeString()}
        </span>
        <span className="text-xs font-mono text-muted-foreground ml-2 text-right text-nowrap">
          {_ && date.toLocaleDateString()}
        </span>
      </div>
    </div>
  );
});
