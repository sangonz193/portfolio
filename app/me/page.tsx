import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"

import iconSvg from "@/app/icon.svg"
import { Button } from "@/components/ui/button"
import { githubInfo } from "@/modules/info/github"
import { linkedInInfo } from "@/modules/info/linked-in"
import { ProjectSummary } from "@/modules/projects/project-summary"
import { archivedProjects, featuredProjects } from "@/modules/projects/projects"

import { SetNoBg } from "./set-no-bg"

export const metadata = {
  title: "Santiago González",
  description:
    "CTO and hands-on architect working across AI, mobile, web, and infrastructure.",
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ window: string }>
}) {
  const insideWindow = (await searchParams).window === "true"

  return (
    <div className="prose mx-auto block w-full max-w-2xl grow px-4">
      {insideWindow && <SetNoBg />}

      <div className="h-10" />

      {!insideWindow && (
        <div>
          <Button variant="link" asChild className="ml-auto px-0 no-underline">
            <Link href="/os">
              <Image src={iconSvg} alt="OS Icon" height={20} width={20} />
              OS Mode
            </Link>
          </Button>
        </div>
      )}

      <p className="mb-2 text-sm font-medium text-muted-foreground">
        Santiago González
      </p>

      <h1 className="mt-0 text-4xl font-bold xs:text-6xl">
        I turn complex product ideas into reliable software.
      </h1>

      <p className="lead !text-foreground/80">
        CTO and hands-on architect working across AI, mobile, web, and
        infrastructure, from product decisions and system design through
        production.
      </p>

      <div className="not-prose mb-4 mt-2 flex-row items-center gap-4">
        <Button variant="link" asChild className="px-0">
          <Link href={githubInfo.url} target="_blank" rel="noreferrer noopener">
            <GitHubLogoIcon />
            GitHub
          </Link>
        </Button>

        <span className="text-muted-foreground/50">●</span>

        <Button variant="link" asChild className="px-0">
          <Link
            href={linkedInInfo.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkedInLogoIcon />
            LinkedIn
          </Link>
        </Button>
      </div>

      <h2>Featured work</h2>
      <div className="not-prose flex flex-col gap-4">
        {featuredProjects.map((project) => (
          <ProjectSummary
            key={project.slug}
            project={project}
            insideWindow={insideWindow}
          />
        ))}
      </div>

      <h2>Earlier work</h2>
      <div className="not-prose flex flex-col gap-4">
        {archivedProjects.map((project) => (
          <ProjectSummary
            key={project.slug}
            project={project}
            insideWindow={insideWindow}
          />
        ))}
      </div>

      <div className={insideWindow ? "h-5" : "h-20"} />
    </div>
  )
}
