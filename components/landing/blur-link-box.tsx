import { cn } from "@/lib/cn";
import { useMousePosition } from "./mouse-position/context";
import React, { ComponentProps } from "react";
import { useElementPosition } from "./use-element-position";
import Link from "next/link";
import { transparentize } from "polished";

interface Props extends ComponentProps<typeof Link> {
  color: string;
}

export function BlurLinkBox({ color, ...props }: Props) {
  const mouseCoords = useMousePosition();

  const containerRef = React.useRef<HTMLAnchorElement>(null);
  const containerPosition = useElementPosition(containerRef, []);

  const blobRef = React.useRef<HTMLDivElement>(null);
  const blobPosition = useElementPosition(blobRef, [!!mouseCoords]);

  return (
    <Link
      {...props}
      ref={containerRef}
      className={cn(
        "relative flex rounded-md p-1.5 shadow-lg overflow-hidden group",
        props.className
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: transparentize(0.9)(color),
        }}
      />

      {mouseCoords && (
        <div
          ref={blobRef}
          className="absolute size-48"
          style={{
            backgroundImage: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
            top:
              mouseCoords.y -
              (containerPosition?.y ?? 0) -
              (blobPosition?.height ?? 0) / 2,
            left:
              mouseCoords.x -
              (containerPosition?.x ?? 0) -
              (blobPosition?.width ?? 0) / 2,
          }}
        />
      )}

      <div className="absolute inset-0 backdrop-blur-2xl" />

      {props.children}
    </Link>
  );
}
