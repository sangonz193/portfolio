import { useRef } from "react";
import { useMousePosition } from "./mouse-position/context";
import { useElementPosition } from "./use-element-position";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { transparentize } from "polished";

type Props = {
  href: string;
  Icon: typeof GitHubLogoIcon;
  alt: string;
  color: string;
};

export function Link({ href, Icon, alt, color }: Props) {
  const mouseCoords = useMousePosition();

  const containerRef = useRef<HTMLAnchorElement>(null);
  const containerPosition = useElementPosition(containerRef);

  const blobRef = useRef<HTMLDivElement>(null);
  const blogPosition = useElementPosition(blobRef);

  return (
    <a
      ref={containerRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="relative size-20 flex rounded-md p-1.5 shadow-lg overflow-hidden"
      title={alt}
    >
      <span className="sr-only">{alt}</span>

      <div
        className="absolute inset-0"
        style={{
          backgroundColor: transparentize(0.8)(color),
        }}
      />

      <div
        ref={blobRef}
        className="absolute size-32"
        style={{
          backgroundImage: `radial-gradient(circle at center, ${color} 0, transparent 70%)`,
          top:
            mouseCoords.y -
            (containerPosition?.y ?? 0) -
            (blogPosition?.height ?? 0) / 2,
          left:
            mouseCoords.x -
            (containerPosition?.x ?? 0) -
            (blogPosition?.width ?? 0) / 2,
        }}
      />

      <div className="absolute inset-0 backdrop-blur-2xl" />

      <div className="grow flex rounded-md relative">
        <Icon className="size-9 m-auto" />
      </div>
    </a>
  );
}
