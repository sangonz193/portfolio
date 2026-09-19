"use client"

import { ChevronLeftIcon, ChevronRightIcon, Maximize2Icon, MinusIcon, PlusIcon } from "lucide-react"
import { observer } from "mobx-react-lite"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"

import { FolderFile, ImageFile } from "./schema"

type Props = { file: ImageFile; folder: FolderFile }

export const ImageWindow = observer(({ file, folder }: Props) => {
  const images = useMemo(() => folder.children.filter((item): item is ImageFile => item.kind === "image"), [folder])
  const index = images.findIndex((item) => item.id === file.id)
  const [zoom, setZoom] = useState<"fit" | number>("fit")
  const current = images[index] ?? file

  return (
    <div className="flex min-h-0 grow flex-col bg-[#11161b] text-[#e8e2d9]">
      <div className="flex h-11 shrink-0 flex-row items-center gap-1 border-b border-white/[0.08] px-2">
        <Button variant="ghost" size="icon" className="size-8" disabled={index <= 0} onClick={() => openImage(images[index - 1])} aria-label="Previous image"><ChevronLeftIcon className="size-4" /></Button>
        <Button variant="ghost" size="icon" className="size-8" disabled={index === -1 || index >= images.length - 1} onClick={() => openImage(images[index + 1])} aria-label="Next image"><ChevronRightIcon className="size-4" /></Button>
        <span className="ml-2 min-w-0 shrink truncate font-mono text-[10px] text-[#9da7aa]">{current.alt}</span>
        <div className="ml-auto flex shrink-0 flex-row items-center gap-1">
          <Button variant={zoom === "fit" ? "secondary" : "ghost"} size="sm" className="h-8 px-2 text-xs" onClick={() => setZoom("fit")}><Maximize2Icon className="size-3.5" /> Fit</Button>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setZoom((value) => Math.max(25, (value === "fit" ? 100 : value) - 25))} aria-label="Zoom out"><MinusIcon className="size-4" /></Button>
          <span className="w-10 text-center font-mono text-[10px] text-[#b8c0c0]">{zoom === "fit" ? "Fit" : `${zoom}%`}</span>
          <Button variant="ghost" size="icon" className="size-8" onClick={() => setZoom((value) => Math.min(400, (value === "fit" ? 100 : value) + 25))} aria-label="Zoom in"><PlusIcon className="size-4" /></Button>
        </div>
      </div>
      <div className="flex min-h-0 grow flex-row overflow-auto bg-[#151b20] p-6">
        {/* These are repository-owned SVG assets, so the browser can render them without a runtime asset dependency. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={current.src} alt={current.alt} className={cn("object-contain", zoom === "fit" ? "size-full" : "m-auto max-w-none")} style={zoom === "fit" ? undefined : { width: `${zoom}%` }} />
      </div>
    </div>
  )

  function openImage(next: ImageFile | undefined) {
    if (!next) return
    window.dispatchEvent(new CustomEvent("portfolio:open-image", { detail: next.id }))
  }
})
