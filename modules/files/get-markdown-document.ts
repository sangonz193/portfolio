"use server"

import { readFile } from "fs/promises"
import path from "path"

import { markdownDocuments } from "./markdown-documents"

type Params = {
  id: string
}

export async function getMarkdownDocument(params: Params) {
  const document =
    markdownDocuments[params.id as keyof typeof markdownDocuments]

  if (!document) return null

  return readFile(
    path.join(process.cwd(), "content", document.fileName),
    "utf-8",
  ).catch(() => null)
}
