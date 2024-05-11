import { cn } from "@/lib/cn";
import React, { ComponentProps } from "react";
import Link from "next/link";
import { observer } from "mobx-react-lite";

interface Props extends ComponentProps<typeof Link> {
  color: string;
}

export const BlurLinkBox = observer(({ color, ...props }: Props) => {
  return (
    <Link
      {...props}
      className={cn(
        "relative flex rounded-md p-1.5 overflow-hidden group",
        props.className
      )}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundColor: color,
        }}
      />

      <div className="absolute inset-0 bg-foreground opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

      {props.children}
    </Link>
  );
});
