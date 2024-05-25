import { cn } from "@/lib/cn"
import React, { ComponentProps } from "react"
import Link from "next/link"
import { observer } from "mobx-react-lite"

interface Props extends ComponentProps<typeof Link> {
  color: string
}

export const BlurLinkBox = observer(({ color, ...props }: Props) => {
  return (
    <Link
      {...props}
      className={cn(
        "group relative flex overflow-hidden rounded-md p-1.5",
        props.className,
      )}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundColor: color,
        }}
      />

      <div className="absolute inset-0 bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-10" />

      {props.children}
    </Link>
  )
})
