import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { ArrowUpRightIcon, MonitorIcon } from "lucide-react"
import Link from "next/link"

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
  searchParams: Promise<{ window?: string }>
}) {
  const insideWindow = (await searchParams).window === "true"

  return (
    <main className="studio-document min-h-screen w-full grow overflow-hidden">
      {insideWindow && <SetNoBg />}

      <div
        className={`mx-auto w-full px-6 pb-20 sm:px-9 ${
          insideWindow ? "max-w-4xl pt-9" : "max-w-6xl pt-8 sm:pt-12"
        }`}
      >
        <nav className="mb-12 flex flex-col items-start gap-3 sm:mb-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-editorial text-lg font-semibold text-[#1b252c]">
            Santiago González
          </p>

          {!insideWindow && (
            <Button
              variant="outline"
              asChild
              className="rounded-md border-[#26343d]/20 bg-transparent text-[#26343d] shadow-none hover:border-[#26343d]/35 hover:bg-[#26343d]/[0.05]"
            >
              <Link href="/os">
                <MonitorIcon className="size-4" />
                Enter desktop
              </Link>
            </Button>
          )}
        </nav>

        <header className="pb-14 sm:pb-20">
          <p className="mb-6 font-mono text-[11px] text-[#9c4264]">
            CTO · product architect · builder
          </p>

          <h1 className="font-editorial max-w-[16ch] text-balance text-[clamp(3.2rem,8.5vw,7.2rem)] font-medium leading-[0.91] tracking-[-0.055em] text-[#172129]">
            I turn complex product ideas into reliable software.
          </h1>

          <div className="mt-10 grid gap-8 border-t border-[#27343c]/15 pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-2xl text-lg leading-8 text-[#36434a] sm:text-xl sm:leading-9">
              CTO and hands-on architect working across AI, mobile, web, and
              infrastructure, from product decisions and system design through
              production.
            </p>

            <div className="flex-row items-center gap-5 text-sm font-medium text-[#26343d]">
              <Link
                href={githubInfo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-row items-center gap-2 underline decoration-[#9c4264]/35 underline-offset-4 hover:decoration-[#9c4264]"
              >
                <GitHubLogoIcon />
                GitHub
                <ArrowUpRightIcon className="size-3.5" />
              </Link>

              <Link
                href={linkedInInfo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-row items-center gap-2 underline decoration-[#9c4264]/35 underline-offset-4 hover:decoration-[#9c4264]"
              >
                <LinkedInLogoIcon />
                LinkedIn
                <ArrowUpRightIcon className="size-3.5" />
              </Link>
            </div>
          </div>
        </header>

        <section className="border-t border-[#27343c]/20 pt-8">
          <div className="mb-3 flex-row items-baseline justify-between gap-4">
            <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#172129] sm:text-4xl">
              Featured work
            </h2>
            <span className="hidden font-mono text-[10px] text-[#657078] sm:inline">
              01 / 03
            </span>
          </div>

          <div>
            {featuredProjects.map((project) => (
              <ProjectSummary
                key={project.slug}
                project={project}
                insideWindow={insideWindow}
              />
            ))}
          </div>
        </section>

        <section className="mt-14 border-t border-[#27343c]/20 pt-8">
          <div className="mb-3 flex-row items-baseline justify-between gap-4">
            <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#172129] sm:text-4xl">
              Earlier work
            </h2>
            <span className="hidden font-mono text-[10px] text-[#657078] sm:inline">
              Long-term stewardship
            </span>
          </div>

          <div>
            {archivedProjects.map((project) => (
              <ProjectSummary
                key={project.slug}
                project={project}
                insideWindow={insideWindow}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
