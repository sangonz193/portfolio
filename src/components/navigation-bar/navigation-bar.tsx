import { cn } from "@/lib/cn";
import { Button } from "../ui/button";
import { windowsStore } from "../windows/windows-store";
import { observer } from "mobx-react-lite";
import { SystemMenu } from "./system-menu";
import { MaybeBattery } from "./maybe-battery";
import { detachedStore } from "./detached";
import { DateAndTime } from "./date-time";

type Props = {
  className?: string;
};

export const NAVIGATION_BAR_HEIGHT = 16 * 4;

export const NavigationBar = observer(({ className }: Props) => {
  const detached = detachedStore.get();

  return (
    <div
      className={cn("absolute bottom-0 left-0 right-0 h-16 z-[1]", className)}
    >
      <div
        className={cn(
          "backdrop-blur-xl bg-background/70 rounded-md inset-2 top-0 absolute shadow-xl transition-[inset,border-radius]",
          !detached && "inset-0 rounded-none"
        )}
      />

      <div
        className={cn(
          "flex-row items-center grow absolute inset-2 top-0 transition-[inset]",
          !detached && "inset-0"
        )}
      >
        <SystemMenu />

        <div className="flex-row grow shrink self-stretch">
          <div className="overflow-auto gap-1 px-2 grow flex-row self-stretch shrink scrollbar scrollbar-thumb-white/40 scrollbar-track-transparent">
            {windowsStore.windows.map((window) => (
              <Button
                ref={window.navBarItemRef}
                key={window.id}
                variant="ghost"
                className={cn(
                  "h-auto my-auto",
                  window.focused && "bg-white/20"
                )}
                onClick={() => window.requestFocus()}
              >
                <img src={window.app.icon} className="size-6" />
                {window.app.name}
              </Button>
            ))}
          </div>
        </div>

        <MaybeBattery className="px-2 mr-1" />

        <DateAndTime />
      </div>
    </div>
  );
});
