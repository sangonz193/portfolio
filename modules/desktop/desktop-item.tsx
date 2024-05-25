import { Slot } from "@radix-ui/react-slot"
import { PropsWithChildren, createContext, useContext, useState } from "react"

import { cn } from "@/lib/cn"

import { useDoubleClick } from "../browser/use-double-click"

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

  return (
    <context.Provider value={{ selected }}>
      <Comp
        type={props.asChild ? undefined : "button"}
        className={cn("grid grid-rows-[1fr_40px] gap-0", className)}
        onClick={(e) => {
          e.preventDefault()

          if (isDoubleClick()) props.onOpen?.()
        }}
        onFocus={() => onSelectedChange(true)}
        onBlur={() => onSelectedChange(false)}
      >
        {children}
      </Comp>
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
        selected && "bg-primary/20",
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
        "rounded-md p-0.5 text-center text-sm font-normal leading-tight",
        selected && "bg-primary/20",
        className,
      )}
    >
      {children}
    </span>
  )
}

DesktopItem.Label = Label
