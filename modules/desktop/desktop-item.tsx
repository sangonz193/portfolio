import { Slot } from "@radix-ui/react-slot"
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/cn"

import { DOUBLE_CLICK_DELAY, useDoubleClick } from "../browser/use-double-click"

type ContextValue = {
  selected: boolean
}

const context = createContext<ContextValue>({
  selected: false,
})

function useDesktopItemContext() {
  return useContext(context)
}

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
      // eslint-disable-next-line react-hooks/exhaustive-deps
      clearTimeout(openTooltipTimeoutRef.current)
    }
  }, [])

  return (
    <context.Provider value={{ selected }}>
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
              "group grid cursor-default grid-rows-[1fr_36px] gap-0 outline-none",
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
            onPointerUp={(e) => {
              if (e.pointerType === "touch") props.onOpen?.()
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                props.onOpen?.()
              }
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
    </context.Provider>
  )
}

function Icon({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  const { selected } = useDesktopItemContext()

  return (
    <div
      className={cn(
        "m-auto mt-1.5 size-16 items-center justify-center rounded-2xl transition-[transform,background-color,box-shadow] group-hover:-translate-y-1",
        selected && "bg-white/[0.08] shadow-[0_10px_30px_rgb(0_0_0/0.24)]",
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
  const { selected } = useDesktopItemContext()
  return (
    <span
      className={cn(
        "mx-auto mt-1 self-start rounded px-1.5 py-0.5 text-center text-[13px] font-medium leading-tight text-[#f1eadf] [text-shadow:0_2px_12px_rgb(0_0_0/0.9)]",
        selected && "bg-white/10 text-white",
        className,
      )}
    >
      {children}
    </span>
  )
}

DesktopItem.Label = Label
