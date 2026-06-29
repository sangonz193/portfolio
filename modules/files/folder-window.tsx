import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

import { FileDesktopItem } from "./file-desktop-item"
import { getMarkdownDocument } from "./get-markdown-document"
import { MarkdownDocumentId } from "./markdown-documents"
import { getMarkdownLinkValue } from "./markdown-links"
import { FileSystemItem, FolderFile, LinkFile } from "./schema"

type Props = {
  folder: FolderFile
  openItem: (file: FileSystemItem, href?: string) => void
}

export function FolderWindow({ folder, openItem }: Props) {
  const documentIds = useMemo(() => {
    return Array.from(new Set(folder.items.flatMap(getMarkdownDocumentIds)))
  }, [folder.items])

  const { data } = useQuery({
    queryKey: ["folder-markdown-documents", folder.id, documentIds],
    queryFn: async () => {
      const entries = await Promise.all(
        documentIds.map(async (id) => [id, await getMarkdownDocument({ id })]),
      )

      return Object.fromEntries(entries)
    },
  })

  return (
    <div className="shrink grow overflow-auto bg-background p-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(104px,104px))] content-start gap-2">
        {folder.items.map((file) => (
          <FileDesktopItem
            key={file.id}
            file={file}
            href={getFileHref(file, data ?? {})}
            onOpen={openItem}
          />
        ))}
      </div>
    </div>
  )
}

function getMarkdownDocumentIds(file: FileSystemItem) {
  const ids: MarkdownDocumentId[] = []
  collectMarkdownDocumentIds(file, ids)

  return ids
}

function collectMarkdownDocumentIds(
  file: FileSystemItem,
  ids: MarkdownDocumentId[],
) {
  if (file.type === "folder") {
    file.items.forEach((item) => collectMarkdownDocumentIds(item, ids))
    return
  }

  if (file.type === "link-file" && file.hrefSource.type === "markdown-link") {
    ids.push(file.hrefSource.documentId)
  }
}

function getFileHref(
  file: FileSystemItem,
  documents: Record<string, string | null>,
) {
  if (file.type !== "link-file") return null

  return getLinkFileHref(file, documents)
}

function getLinkFileHref(
  file: LinkFile,
  documents: Record<string, string | null>,
) {
  if (file.hrefSource.type === "href") return file.hrefSource.href

  const markdown = documents[file.hrefSource.documentId]
  if (!markdown) return null

  return getMarkdownLinkValue(markdown, file.hrefSource.label)
}
