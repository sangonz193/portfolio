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
    <div className="shrink grow overflow-auto">
      <article className="prose mx-auto w-full max-w-3xl px-6 py-7 prose-headings:text-foreground prose-p:text-foreground prose-a:text-foreground prose-strong:text-foreground prose-li:text-foreground">
        {data?.default && <data.default components={components} />}
      </article>
    </div>
  )
}

const components: MDXComponents = {
  a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
}
