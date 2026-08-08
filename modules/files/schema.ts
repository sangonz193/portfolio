import { ComponentType } from "react"

export type FileIcon = ComponentType<{ className?: string }>

type BaseFile = {
  id: string
  name: string
  icon: FileIcon
}

export type FolderFile = BaseFile & {
  kind: "folder"
  children: FileSystemItem[]
}

export type DocumentFile = BaseFile & {
  kind: "document"
  projectSlug: string
  route: string
}

export type ImageFile = BaseFile & {
  kind: "image"
  src: string
  alt: string
}

export type LinkFile = BaseFile & {
  kind: "link"
  href: string
  description?: string
}

export type FileSystemItem = FolderFile | DocumentFile | ImageFile | LinkFile
