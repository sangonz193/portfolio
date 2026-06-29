import { Slot } from "@radix-ui/react-slot"
import { PropsWithChildren, useEffect, useRef, useState } from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/cn"

import { DOUBLE_CLICK_DELAY, useDoubleClick } from "../browser/use-double-click"

export function DesktopItem(
  props: PropsWithChildren<{
    className?: string
    selected?: boolean
    asChild?: boolean
    onSelectedChange?: (selected: boolean) => void
    onOpen?: () => void
  }>,
) {
  const { className, children } = props
  const [_selected, setSelected] = useState(props.selected ?? false)

  const selected = props.selected ?? _selected
  const onSelectedChange = props.onSelectedChange ?? setSelected

  const Comp = props.asChild ? Slot : "button"
  const isDoubleClick = useDoubleClick()

  const [tapOrClick, setTapOrClick] = useState<"tap" | "click">()
  const [openTooltip, setOpenTooltip] = useState(false)
  const openTooltipTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    return () => {
      clearTimeout(openTooltipTimeoutRef.current)
    }
  }, [])

  return (
    <Tooltip
      open={openTooltip}
      onOpenChange={(open) => {
        if (!open) {
          setOpenTooltip(false)
        }
      }}
    >
      <TooltipTrigger asChild>
        <Comp
          type={props.asChild ? undefined : "button"}
          className={cn(
            "relative grid size-[104px] cursor-default grid-rows-[62px_34px] gap-0 rounded-md p-1 outline-none",
            selected &&
              "before:absolute before:left-1/2 before:top-1 before:h-[96px] before:w-[100px] before:-translate-x-1/2 before:rounded-md before:bg-primary/15 before:content-['']",
            className,
          )}
          onClick={(e) => {
            e.preventDefault()
            clearTimeout(openTooltipTimeoutRef.current)

            if (isDoubleClick()) props.onOpen?.()
            else
              openTooltipTimeoutRef.current = setTimeout(() => {
                setOpenTooltip(true)
              }, DOUBLE_CLICK_DELAY + 300)
          }}
          onFocus={() => onSelectedChange(true)}
          onBlur={() => onSelectedChange(false)}
          onPointerOver={(e) => {
            const newTapOrClick = e.pointerType === "touch" ? "tap" : "click"
            setTapOrClick(newTapOrClick)
          }}
        >
          {children}
        </Comp>
      </TooltipTrigger>

      <TooltipContent side="right" align="center">
        Double {tapOrClick} to open
      </TooltipContent>
    </Tooltip>
  )
}

function Icon({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        "relative z-[1] flex items-center justify-center self-end pb-1",
        className,
      )}
    >
      {children}
    </div>
  )
}

DesktopItem.Icon = Icon

function Label({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        "relative z-[1] block max-h-[34px] w-full overflow-hidden px-1 text-center text-sm font-normal leading-tight [overflow-wrap:anywhere]",
        className,
      )}
    >
      {children}
    </span>
  )
}

DesktopItem.Label = Label
