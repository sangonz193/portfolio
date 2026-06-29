import { DocumentWindow } from "./document-window"
import { FolderWindow } from "./folder-window"
import { FileSystemItem } from "./schema"
import { windowsStore } from "../windows/windows-store"

export function openFile(file: FileSystemItem, href?: string) {
  if (file.type === "link-file") {
    const target = href ?? getStaticHref(file)
    if (!target) return

    window.open(target, "_blank", "noopener,noreferrer")
    return
  }

  if (file.type === "folder") {
    windowsStore.openWindow({
      id: file.id,
      name: file.name,
      icon: file.icon,
      content: {
        type: "component",
        component: FolderWindow.bind(null, {
          folder: file,
          openItem: openFile,
        }),
      },
      minSize: file.minSize,
      initialSize: file.initialSize,
    })
    return
  }

  windowsStore.openWindow({
    id: file.id,
    name: file.name,
    icon: file.icon,
    content: {
      type: "component",
      component: DocumentWindow.bind(null, { file }),
    },
    minSize: file.minSize,
    initialSize: file.initialSize,
  })
}

function getStaticHref(file: FileSystemItem) {
  if (file.type !== "link-file") return null
  if (file.hrefSource.type !== "href") return null

  return file.hrefSource.href
}
