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
import { windowsStore } from "../windows/windows-store";
import { cn } from "@/lib/cn";

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

export function MaybeBattery() {
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

  const someWindowMaximized = windowsStore.windows.some((w) => w.maximized);

  if (!Icon) return null;

  return (
    <div
      className={cn(
        "my-auto pr-1 transition-[padding-top]",
        someWindowMaximized && "pt-2"
      )}
      title={
        data.charging
          ? `Charging (${Math.round(data.level * 100)}%)`
          : `${Math.round(data.level * 100)}%`
      }
    >
      <Icon className={variants({ status: data.status })} />
    </div>
  );
}