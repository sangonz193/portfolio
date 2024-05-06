import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { VariantProps, cva } from "class-variance-authority";
import {
  BatteryChargingIcon,
  BatteryFullIcon,
  BatteryLowIcon,
  BatteryMediumIcon,
  BatteryWarningIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import { detachedStore } from "./detached";
import { observer } from "mobx-react-lite";

const variants = cva("", {
  variants: {
    status: {
      charging: "",
      full: "",
      low: "text-orange-500",
      medium: "",
      warning: "text-red-500",
    },
  },
});

type Props = {
  className?: string;
};

export const MaybeBattery = observer(({ className }: Props) => {
  const detached = detachedStore.get();

  const { data } = useQuery({
    queryKey: ["battery"],
    queryFn: async () => {
      if (
        !("getBattery" in navigator) ||
        typeof navigator.getBattery !== "function"
      )
        return null;

      const battery = z
        .object({
          charging: z.boolean(),
          level: z.number(),
        })
        .parse(await navigator.getBattery());

      let status: VariantProps<typeof variants>["status"] = "medium";
      if (battery.charging) status = "charging";
      else if (battery.level <= 0.1) status = "warning";
      else if (battery.level <= 0.2) status = "low";
      else if (battery.level >= 0.8) status = "full";

      return {
        status,
        level: battery.level,
        charging: battery.charging,
      };
    },
  });

  const Icon =
    data?.status &&
    (
      {
        charging: BatteryChargingIcon,
        full: BatteryFullIcon,
        low: BatteryLowIcon,
        medium: BatteryMediumIcon,
        warning: BatteryWarningIcon,
      } satisfies Record<
        VariantProps<typeof variants>["status"] & string,
        typeof BatteryChargingIcon
      >
    )[data.status];

  if (!Icon) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className={cn(
            "my-auto pr-1 transition-[padding-top] hover:bg-transparent",
            !detached && "pt-4",
            className
          )}
        >
          <span className="sr-only">Battery</span>
          <Icon className={variants({ status: data.status })} />
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        {data.charging
          ? `Charging (${Math.round(data.level * 100)}%)`
          : `${Math.round(data.level * 100)}%`}
      </TooltipContent>
    </Tooltip>
  );
});
