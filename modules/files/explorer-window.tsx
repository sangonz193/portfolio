"use client"

import { ArrowLeftIcon, ArrowRightIcon, Grid2X2Icon, ListIcon } from "lucide-react"
import { observer } from "mobx-react-lite"
import { KeyboardEvent, useEffect, useMemo, useRef } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/cn"
import { windowsStore } from "@/modules/windows/windows-store"

import { workFileSystem } from "./filesystem"
import { DocumentIcon, FolderIcon, ImageIcon, LinkIcon } from "./icons"
import { ImageWindow } from "./image-window"
import { findFolder, getItemPath, ROOT_PATH } from "./path"
import { FileSystemItem, FolderFile } from "./schema"
import { updateWorkUrl } from "./url-state"
import { workStore } from "./work-store"

const icons = { folder: FolderIcon, document: DocumentIcon, image: ImageIcon, link: LinkIcon }

export const ExplorerWindow = observer(() => {
  const folder = findFolder(workFileSystem, workStore.path)
  const items = useMemo(() => folder?.children ?? [], [folder])
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  useEffect(() => {
    const handleImage = (event: Event) => {
      const id = (event as CustomEvent<string>).detail
      const image = items.find((item) => item.id === id)
      if (image?.kind === "image" && folder) openFile(image, folder)
    }
    window.addEventListener("portfolio:open-image", handleImage)
    return () => window.removeEventListener("portfolio:open-image", handleImage)
  }, [folder, items])

  if (!folder) return <EmptyState message="This folder is unavailable." />
  const currentFolder = folder

  return (
    <div className="flex min-h-0 grow flex-col bg-[#1a2026] text-[#eee8df]">
      <div className="flex flex-row flex-wrap items-center gap-1 border-b border-white/[0.08] bg-[#222a31] p-2">
        <Button variant="ghost" size="icon" className="size-8" disabled={workStore.path === ROOT_PATH} onClick={() => window.history.back()} aria-label="Back"><ArrowLeftIcon className="size-4" /></Button>
        <Button variant="ghost" size="icon" className="size-8" onClick={() => window.history.forward()} aria-label="Forward"><ArrowRightIcon className="size-4" /></Button>
        <div className="ml-1 flex min-w-0 grow flex-row items-center gap-1 overflow-auto rounded-md border border-white/[0.1] bg-[#171c21] px-2 py-1.5 text-xs text-[#c6c9c7]">
          {workStore.path.split("/").filter(Boolean).map((part, index, parts) => {
            const path = `/${parts.slice(0, index + 1).join("/")}`
            return <button key={path} className="shrink-0 font-medium hover:text-[#f0a0b8]" onClick={() => navigate(path)}>{part}{index < parts.length - 1 && <span className="px-1 text-[#7f8a90]">/</span>}</button>
          })}
        </div>
        <div className="ml-auto flex flex-row gap-1">
          <Button variant={workStore.view === "grid" ? "secondary" : "ghost"} size="icon" className="size-8" onClick={() => workStore.setView("grid")} aria-label="Grid view"><Grid2X2Icon className="size-4" /></Button>
          <Button variant={workStore.view === "list" ? "secondary" : "ghost"} size="icon" className="size-8" onClick={() => workStore.setView("list")} aria-label="List view"><ListIcon className="size-4" /></Button>
        </div>
      </div>
      <div className="flex min-h-0 grow flex-row">
        <aside className="hidden w-40 shrink-0 border-r border-white/[0.08] bg-[#171c21] p-2 sm:block">
          <p className="px-2 pb-2 pt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-[#8f999e]">Locations</p>
          <button className={cn("w-full rounded-md px-2 py-2 text-left text-sm", workStore.path.startsWith("/Work/Featured") ? "bg-[#3a2430] font-medium text-[#fff4ee]" : "text-[#b7bfbe] hover:bg-white/[0.07]")} onClick={() => navigate("/Work/Featured Work")}>Featured Work</button>
          <button className={cn("w-full rounded-md px-2 py-2 text-left text-sm", workStore.path.startsWith("/Work/Earlier") ? "bg-[#3a2430] font-medium text-[#fff4ee]" : "text-[#b7bfbe] hover:bg-white/[0.07]")} onClick={() => navigate("/Work/Earlier Work")}>Earlier Work</button>
        </aside>
        <div className="min-w-0 grow overflow-auto p-3 sm:p-5">
          <div className={cn(workStore.view === "grid" ? "grid grid-cols-[repeat(auto-fill,minmax(92px,1fr))] gap-2" : "flex flex-col gap-1")} role="listbox" aria-label={`${folder.name} contents`}>
            {items.map((item, index) => <FileItem key={item.id} item={item} folder={folder} selected={workStore.selectedId === item.id} setRef={(element) => { itemRefs.current[item.id] = element }} onKeyDown={(event) => onKeyDown(event, index)} />)}
          </div>
          {items.length === 0 && <EmptyState message="This folder is empty." />}
        </div>
      </div>
      <div className="border-t border-white/[0.08] px-4 py-2 font-mono text-[10px] text-[#8f999e]">{items.length} {items.length === 1 ? "item" : "items"}</div>
    </div>
  )

  function navigate(path: string) {
    updateWorkUrl({ path })
    workStore.setPath(path)
  }

  function onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      openFile(items[index], currentFolder)
      return
    }
    const nextIndex = event.key === "ArrowRight" || event.key === "ArrowDown" ? index + 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? index - 1 : -1
    if (nextIndex >= 0 && nextIndex < items.length) {
      event.preventDefault()
      workStore.select(items[nextIndex].id)
      itemRefs.current[items[nextIndex].id]?.focus()
    }
  }
})

function FileItem({ item, folder, selected, setRef, onKeyDown }: { item: FileSystemItem; folder: FolderFile; selected: boolean; setRef: (element: HTMLButtonElement | null) => void; onKeyDown: (event: KeyboardEvent, index: number) => void }) {
  const Icon = icons[item.kind]
  const index = folder.children.indexOf(item)
  return <button ref={setRef} role="option" aria-selected={selected} className={cn("group flex min-w-0 items-center gap-3 p-3 text-left text-[#eee8df] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#e36c9e]/70", selected ? "bg-[#4b2638] ring-1 ring-inset ring-[#e69aae]/70" : "hover:bg-white/[0.07]", workStore.view === "grid" ? "min-h-28 w-full flex-col justify-start text-center" : "min-h-12 w-full flex-row")} onPointerDown={() => workStore.select(item.id)} onClick={() => workStore.select(item.id)} onFocus={() => workStore.select(item.id)} onPointerUp={(event) => { if (event.pointerType === "touch") openFile(item, folder) }} onDoubleClick={() => openFile(item, folder)} onKeyDown={(event) => onKeyDown(event, index)}>
    <Icon className={cn("size-12 shrink-0", workStore.view === "list" && "size-8")} />
    <span className="block min-w-0 w-full max-w-full truncate text-xs font-medium">{item.name}</span>
  </button>
}

function EmptyState({ message }: { message: string }) {
  return <div className="flex grow items-center justify-center p-8 text-center text-sm text-[#8f999e]"><p>{message}</p></div>
}

export function openFile(item: FileSystemItem, folder: FolderFile, updateUrl = true) {
  const path = getItemPath(workStore.path, item)
  if (item.kind === "folder") {
    workStore.setPath(path)
    if (updateUrl) updateWorkUrl({ path })
    return
  }
  if (item.kind === "link") {
    window.open(item.href, "_blank", "noopener,noreferrer")
    return
  }
  if (item.kind === "document") {
    if (updateUrl) updateWorkUrl({ path: workStore.path, file: item.name })
    windowsStore.openWindow({ id: `document:${item.id}`, name: item.name, icon: { type: "component", component: DocumentIcon }, minSize: { width: 340, height: 420 }, initialSize: { width: 760, height: 780 }, content: { type: "url", src: item.route } })
    return
  }
  if (updateUrl) updateWorkUrl({ path: workStore.path, file: item.name })
  windowsStore.openWindow({ id: `image:${item.id}`, name: item.name, icon: { type: "component", component: ImageIcon }, minSize: { width: 340, height: 300 }, initialSize: { width: 620, height: 560 }, content: { type: "component", component: () => <ImageWindow file={item} folder={folder} /> } })
}
