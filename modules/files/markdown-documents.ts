export const markdownDocuments = {
  "second-sponsor": {
    fileName: "secondsponsor.md",
  },
} as const

export type MarkdownDocumentId = keyof typeof markdownDocuments
