import { observer } from "mobx-react-lite"
import React from "react"

import { cn } from "@/lib/cn"

export const DateAndTime = observer(() => {
  const date = new Date()

  const [_, forceUpdate] = React.useState<object>()
  React.useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({})
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className={cn(
        "mr-3 grid grid-cols-[0fr] justify-center gap-0.5 border-l border-white/[0.07] pl-4 pr-1 opacity-0 transition-[grid-template-columns,opacity] duration-500 ease-in-out",
        _ && "grid-cols-[1fr] opacity-100",
      )}
    >
      <div className="items-end overflow-hidden">
        <span className="text-nowrap text-right text-xs font-medium tabular-nums text-[#eee8df]">
          {_ && date.toLocaleTimeString(undefined, { timeStyle: "short" })}
        </span>
        <span className="ml-2 text-nowrap text-right text-[10px] tabular-nums text-[#8e989e]">
          {_ && date.toLocaleDateString()}
        </span>
      </div>
    </div>
  )
})
