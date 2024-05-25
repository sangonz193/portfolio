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
        "grid grid-cols-[0fr] justify-center gap-0.5 pr-6 opacity-0 transition-[grid-template-columns,opacity] duration-500 ease-in-out",
        _ && "grid-cols-[1fr] opacity-100",
      )}
    >
      <div className="items-end overflow-hidden">
        <span className="text-nowrap text-right font-mono text-sm">
          {_ && date.toLocaleTimeString(undefined, { timeStyle: "short" })}
        </span>
        <span className="ml-2 text-nowrap text-right font-mono text-xs text-muted-foreground">
          {_ && date.toLocaleDateString()}
        </span>
      </div>
    </div>
  )
})
