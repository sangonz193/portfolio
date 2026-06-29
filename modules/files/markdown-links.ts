export function getMarkdownLinkValue(markdown: string, label: string) {
  const escapedLabel = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const match = markdown.match(
    new RegExp(`^-\\s*${escapedLabel}:\\s*(.+)$`, "im"),
  )

  if (!match) return null

  const value = match[1].trim()
  const markdownLink = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (markdownLink) return markdownLink[2].trim()

  const bracketedValue = value.match(/^\[([^\]]+)\]$/)
  if (bracketedValue) return bracketedValue[1].trim()

  return value
}
