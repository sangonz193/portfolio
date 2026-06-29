import { EvaluateOptions, evaluate } from "@mdx-js/mdx"
import { useQuery } from "@tanstack/react-query"
import { MDXComponents } from "mdx/types"
import * as runtime from "react/jsx-runtime"

import { getMarkdownDocument } from "./get-markdown-document"
import { DocumentFile } from "./schema"

type Props = {
  file: DocumentFile
}

export function DocumentWindow({ file }: Props) {
  const { data } = useQuery({
    queryKey: ["markdown-document", file.documentId],
    queryFn: async () => {
      const markdown = await getMarkdownDocument({ id: file.documentId })
      if (!markdown) return null

      return evaluate(markdown, {
        ...(runtime as EvaluateOptions),
      })
    },
  })

  return (
    <div className="shrink grow overflow-auto bg-background">
      <div className="sticky top-0 z-10 h-9 flex-row items-center border-b bg-background/90 px-3 font-mono text-xs text-muted-foreground backdrop-blur">
        {file.name}
      </div>

      <article className="prose prose-neutral mx-auto w-full max-w-3xl px-6 py-7 dark:prose-invert prose-a:text-foreground">
        {data?.default && <data.default components={components} />}
      </article>
    </div>
  )
}

const components: MDXComponents = {
  a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
}
