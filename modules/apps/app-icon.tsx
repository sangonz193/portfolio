import Image from "next/image"

import { cn } from "@/lib/cn"

type Props = {
  className?: string
  variant: "me" | "second-sponsor" | "harness-hub" | "data-loom" | "openfing"
}

const iconSources = {
  me: "/icon.svg",
  "second-sponsor": "/project-icons/second-sponsor.svg",
  "harness-hub": "/project-icons/harness-hub.svg",
  "data-loom": "/project-icons/data-loom.svg",
  openfing: "/project-icons/openfing.svg",
}

export function AppIcon({ className, variant }: Props) {
  return (
    <span
      className={cn(
        "relative block overflow-hidden drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]",
        variant === "me" && "rounded-[28%]",
        className,
      )}
    >
      <Image
        src={iconSources[variant]}
        alt=""
        fill
        sizes="64px"
        className="object-contain"
      />
    </span>
  )
}

export function MeIcon({ className }: { className?: string }) {
  return <AppIcon variant="me" className={className} />
}

export function SecondSponsorIcon({ className }: { className?: string }) {
  return <AppIcon variant="second-sponsor" className={className} />
}

export function HarnessHubIcon({ className }: { className?: string }) {
  return <AppIcon variant="harness-hub" className={className} />
}

export function DataLoomIcon({ className }: { className?: string }) {
  return <AppIcon variant="data-loom" className={className} />
}

export function OpenFingIcon({ className }: { className?: string }) {
  return <AppIcon variant="openfing" className={className} />
}
