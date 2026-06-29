import { DesktopItem } from "@/modules/desktop/desktop-item"
import { WindowIcon } from "@/modules/windows/window-icon"

import { FileSystemItem } from "./schema"

type Props = {
  file: FileSystemItem
  href?: string | null
  onOpen: (file: FileSystemItem, href?: string) => void
}

export function FileDesktopItem({ file, href, onOpen }: Props) {
  return (
    <DesktopItem onOpen={() => onOpen(file, href ?? undefined)}>
      <DesktopItem.Icon>
        <WindowIcon icon={file.icon} className="size-10" />
      </DesktopItem.Icon>

      <DesktopItem.Label>{file.name}</DesktopItem.Label>
    </DesktopItem>
  )
}
