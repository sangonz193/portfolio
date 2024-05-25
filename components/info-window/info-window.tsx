import { useQuery } from "@tanstack/react-query";
import { getInfoMdx } from "./get-info-mdx";
import { EvaluateOptions, evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MDXComponents } from "mdx/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

type Props = {
  appId: string;
};

export function InfoWindow({ appId }: Props) {
  const { data } = useQuery({
    queryKey: ["info-mdx", appId],
    queryFn: async () => {
      const mdx = await getInfoMdx({ appId });
      if (!mdx) return null;

      return evaluate(mdx, {
        ...(runtime as EvaluateOptions),
      });
    },
  });

  return (
    <div className="p-4 overflow-auto shrink grow prose mx-auto w-full">
      {data?.default && <data.default components={components} />}
    </div>
  );
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
};
