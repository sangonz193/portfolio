import { CSSProperties } from "react"

import { cn } from "@/lib/cn"
import { MeIcon } from "@/modules/apps/app-icon"

type Props = { className?: string; style?: CSSProperties }

export function Splash({ className, style }: Props) {
  return (
    <div
      role="status"
      aria-label="Starting Santiago's OS"
      className={cn(
        "os-boot-splash fixed inset-0 z-[100] items-center justify-center bg-[#0a0f15]",
        className,
      )}
      style={style}
    >
      <div className="items-center gap-7">
        <MeIcon className="size-14 animate-[os-splash-breathe_2.4s_ease-in-out_infinite] motion-reduce:animate-none" />
        <p className="font-editorial text-2xl text-[#f4eee7]">Santiago&apos;s OS</p>
        <div className="h-px w-32 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/3 rounded-full bg-[#e36c9e] animate-[os-splash-sweep_1.4s_ease-in-out_infinite] motion-reduce:animate-none motion-reduce:w-full" />
        </div>
      </div>
    </div>
  )
}
