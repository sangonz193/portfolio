import Link from "next/link"

import { Button } from "@/components/ui/button"

import { projects } from "./projects"

type Props = {
  project: (typeof projects)[number]
  insideWindow?: boolean
}

export function ProjectSummary({ project, insideWindow }: Props) {
  return (
    <article className="not-prose rounded-lg border border-foreground/40 p-4">
      <div className="flex-row flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <span className="text-xs text-muted-foreground">{project.status}</span>
      </div>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {project.summary}
      </p>

      <ul className="mt-3 flex flex-row flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {project.metadata.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <Button variant="link" asChild className="mt-3 h-auto px-0">
        <Link
          href={`/work/${project.slug}${insideWindow ? "?window=true" : ""}`}
        >
          Read case study
        </Link>
      </Button>
    </article>
  )
}
