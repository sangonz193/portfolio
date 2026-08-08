import { ArrowUpRightIcon } from "lucide-react"
import Link from "next/link"

import {
  DataLoomIcon,
  HarnessHubIcon,
  OpenFingIcon,
  SecondSponsorIcon,
} from "@/modules/apps/app-icon"

import { projects } from "./projects"

type Project = (typeof projects)[number]

type Props = {
  project: Project
  insideWindow?: boolean
}

const projectIcons = {
  "second-sponsor": SecondSponsorIcon,
  "harness-hub": HarnessHubIcon,
  "data-loom": DataLoomIcon,
  openfing: OpenFingIcon,
}

export const projectThemes = {
  "second-sponsor": {
    accent: "bg-[#bd4769]",
    text: "text-[#9d3558]",
  },
  "harness-hub": {
    accent: "bg-[#24688f]",
    text: "text-[#205f82]",
  },
  "data-loom": {
    accent: "bg-[#267b76]",
    text: "text-[#216c68]",
  },
  openfing: {
    accent: "bg-[#8b5b61]",
    text: "text-[#7d4f55]",
  },
}

export function ProjectMark({
  slug,
  className,
}: {
  slug: Project["slug"]
  className?: string
}) {
  const Icon = projectIcons[slug]
  return <Icon className={className} />
}

export function ProjectSummary({ project, insideWindow }: Props) {
  const theme = projectThemes[project.slug]

  return (
    <article className="group relative grid gap-5 border-b border-[#27343c]/15 py-7 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-9">
      <div
        className={`absolute inset-y-0 left-[-1.5rem] w-1 opacity-0 transition-opacity group-hover:opacity-100 sm:left-[-2.25rem] ${theme.accent}`}
      />
      <ProjectMark slug={project.slug} className="size-14 sm:size-16" />

      <div>
        <div className="flex-row flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
          <h3 className="font-editorial text-2xl font-semibold tracking-[-0.025em] text-[#172129] sm:text-3xl">
            {project.name}
          </h3>
          <span className={`font-mono text-[10px] ${theme.text}`}>
            {project.status}
          </span>
        </div>

        <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#455159] sm:text-base">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-row flex-wrap items-center gap-x-2 font-mono text-[10px] leading-5 text-[#687279]">
          {project.metadata.map((item, index) => (
            <li key={item} className="flex flex-row items-center gap-2">
              {index > 0 && <span aria-hidden="true">·</span>}
              {item}
            </li>
          ))}
        </ul>

        <Link
          className={`decoration-current/30 mt-5 flex w-fit flex-row items-center gap-1.5 text-sm font-semibold underline underline-offset-4 transition-[color,text-decoration-color] hover:decoration-current ${theme.text}`}
          href={`/work/${project.slug}${insideWindow ? "?window=true" : ""}`}
        >
          Read case study
          <ArrowUpRightIcon className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}
