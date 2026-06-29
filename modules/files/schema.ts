import { MarkdownDocumentId } from "./markdown-documents"
import { WindowConfig } from "../windows/window-config"

type BaseFile = {
  id: string
  name: string
  icon: WindowConfig["icon"]
}

type WindowSizing = {
  initialSize?: WindowConfig["initialSize"]
  minSize: WindowConfig["minSize"]
}

export type FolderFile = BaseFile &
  WindowSizing & {
    type: "folder"
    items: FileSystemItem[]
  }

export type LinkFile = BaseFile & {
  type: "link-file"
  hrefSource:
    | {
        type: "href"
        href: string
      }
    | {
        type: "markdown-link"
        documentId: MarkdownDocumentId
        label: string
      }
}

export type DocumentFile = BaseFile &
  WindowSizing & {
    type: "document-file"
    documentId: MarkdownDocumentId
  }

export type FileSystemItem = FolderFile | LinkFile | DocumentFile
