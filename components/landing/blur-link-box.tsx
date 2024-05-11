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
        className="absolute left-0 top-0 w-[200%] h-[200%] opacity-30"
        style={{
          backgroundColor: color,
        }}
      />

      {props.children}
    </Link>
  );
});
