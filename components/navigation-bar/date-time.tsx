import { observer } from "mobx-react-lite";
import React from "react";
import { cn } from "@/lib/cn";

export const DateAndTime = observer(() => {
  const date = new Date();

  const [, forceUpdate] = React.useState<object>();
  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={cn("justify-center gap-0.5 pr-6")}>
      <span className="text-white text-sm font-mono text-right">
        {date.toLocaleTimeString()}
      </span>
      <span className="text-white text-xs font-mono ml-2 text-right">
        {date.toLocaleDateString()}
      </span>
    </div>
  );
});
