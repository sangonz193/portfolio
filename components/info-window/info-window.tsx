import { EvaluateOptions, evaluate } from "@mdx-js/mdx"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"
import { ExternalLinkIcon } from "lucide-react"
import { MDXComponents } from "mdx/types"
import Link from "next/link"
import * as runtime from "react/jsx-runtime"

import { getInfoMdx } from "./get-info-mdx"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

type Props = {
  appId: string
}

export function InfoWindow({ appId }: Props) {
  const { data } = useQuery({
    queryKey: ["info-mdx", appId],
    queryFn: async () => {
      const mdx = await getInfoMdx({ appId })
      if (!mdx) return null

      return evaluate(mdx, {
        ...(runtime as EvaluateOptions),
      })
    },
  })

  return (
    <div className="shrink grow overflow-auto p-4">
      <div className="prose mx-auto block w-full">
        {data?.default && <data.default components={components} />}
      </div>
    </div>
  )
}

const components: MDXComponents = {
  Tabs: Tabs,
  TabsList: TabsList,
  TabsTrigger: TabsTrigger,
  TabsContent: TabsContent,
  Button: Button,
  Link: Link,
  ExternalLinkIcon: ExternalLinkIcon,
  GitHubLogoIcon: GitHubLogoIcon,
}
