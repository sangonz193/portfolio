import { FileSystemItem, FolderFile } from "./schema"

export const ROOT_PATH = "/Work"

export function normalizePath(path: string) {
  const parts = path.split("/").filter(Boolean)
  return parts.length ? `/${parts.join("/")}` : ROOT_PATH
}

export function pathParts(path: string) {
  return normalizePath(path).slice(1).split("/")
}

export function joinPath(parent: string, child: string) {
  return normalizePath(`${normalizePath(parent)}/${child}`)
}

export function findFolder(root: FolderFile, path: string) {
  const wanted = pathParts(path)
  if (wanted[0] !== root.name) return null

  let folder: FolderFile = root
  for (const name of wanted.slice(1)) {
    const next = folder.children.find(
      (item): item is FolderFile => item.kind === "folder" && item.name === name,
    )
    if (!next) return null
    folder = next
  }
  return folder
}

export function findItem(root: FolderFile, path: string) {
  const parts = pathParts(path)
  if (parts[0] !== root.name) return null

  let current: FileSystemItem = root
  for (const name of parts.slice(1)) {
    if (current.kind !== "folder") return null
    const next: FileSystemItem | undefined = current.children.find((item) => item.name === name)
    if (!next) return null
    current = next
  }
  return current
}

export function getParentPath(path: string) {
  const parts = pathParts(path)
  return parts.length <= 1 ? ROOT_PATH : `/${parts.slice(0, -1).join("/")}`
}

export function getItemPath(folderPath: string, item: FileSystemItem) {
  return joinPath(folderPath, item.name)
}
