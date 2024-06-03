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
  const openTooltipTimeoutRef = useRef<NodeJS.Timeout>()

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
              "grid cursor-default grid-rows-[1fr_40px] gap-0",
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
        "m-auto mt-4 size-12 items-center justify-center rounded-md",
        selected && "bg-primary/15",
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
        "mx-auto rounded-md p-0.5 px-2 text-center text-sm font-normal leading-tight",
        selected && "bg-primary/15",
        className,
      )}
    >
      {children}
    </span>
  )
}

DesktopItem.Label = Label
