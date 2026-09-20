import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { ArrowUpRightIcon, MailIcon, MonitorIcon } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { emailInfo } from "@/modules/info/email"
import { githubInfo } from "@/modules/info/github"
import { linkedInInfo } from "@/modules/info/linked-in"
import { ProjectSummary } from "@/modules/projects/project-summary"
import { earlierProjects, featuredProjects } from "@/modules/projects/projects"

import { SetNoBg } from "./set-no-bg"

type Props = { insideWindow: boolean }

export function MeDocument({ insideWindow }: Props) {
  return (
    <main className="studio-document min-h-screen w-full grow overflow-hidden">
      {insideWindow && <SetNoBg />}

      <div
        className={`mx-auto w-full px-6 pb-20 sm:px-9 ${
          insideWindow ? "max-w-4xl pt-9" : "max-w-6xl pt-8 sm:pt-12"
        }`}
      >
        <nav className="mb-12 flex flex-col items-start gap-3 sm:mb-16 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-editorial text-lg font-semibold text-[#f4eee7]">
            Santiago González
          </p>

          {!insideWindow && (
            <Button
              variant="outline"
              asChild
              className="rounded-md border-white/20 bg-transparent text-[#e9e4dc] shadow-none hover:border-white/35 hover:bg-white/[0.06]"
            >
              <Link href="/os">
                <MonitorIcon className="size-4" />
                Enter desktop
              </Link>
            </Button>
          )}
        </nav>

        <header className="pb-14 sm:pb-20">
          <p className="mb-6 font-mono text-[11px] text-[#f0a0b8]">
            CTO · product architect · builder
          </p>

          <h1 className="font-editorial max-w-[16ch] text-balance text-[clamp(3.2rem,8.5vw,7.2rem)] font-medium leading-[0.91] tracking-[-0.055em] text-[#f4eee7]">
            I turn complex product ideas into reliable software.
          </h1>

          <div className="mt-10 grid gap-8 border-t border-white/12 pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <p className="max-w-2xl text-lg leading-8 text-[#c4cbca] sm:text-xl sm:leading-9">
              CTO and hands-on architect working across AI, mobile, web, and
              infrastructure, from product decisions and system design through
              production.
            </p>

            <div className="flex-row items-center gap-5 text-sm font-medium text-[#e9e4dc]">
              <Link
                href={githubInfo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-row items-center gap-2 underline decoration-[#f0a0b8]/35 underline-offset-4 hover:decoration-[#f0a0b8]"
              >
                <GitHubLogoIcon />
                GitHub
                <ArrowUpRightIcon className="size-3.5" />
              </Link>

              <Link
                href={linkedInInfo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="flex flex-row items-center gap-2 underline decoration-[#f0a0b8]/35 underline-offset-4 hover:decoration-[#f0a0b8]"
              >
                <LinkedInLogoIcon />
                LinkedIn
                <ArrowUpRightIcon className="size-3.5" />
              </Link>

              <Link
                href={emailInfo.url}
                className="flex flex-row items-center gap-2 underline decoration-[#f0a0b8]/35 underline-offset-4 hover:decoration-[#f0a0b8]"
              >
                <MailIcon className="size-4" />
                Email
              </Link>
            </div>
          </div>
        </header>

        <section className="border-t border-white/15 pt-8">
          <div className="mb-3 flex-row items-baseline justify-between gap-4">
            <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#f4eee7] sm:text-4xl">
              Featured work
            </h2>
            <span className="hidden font-mono text-[10px] text-[#aeb7b7] sm:inline">
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

        <section className="mt-14 border-t border-white/15 pt-8">
          <div className="mb-3 flex-row items-baseline justify-between gap-4">
            <h2 className="font-editorial text-3xl font-medium tracking-tight text-[#f4eee7] sm:text-4xl">
              Earlier work
            </h2>
            <span className="hidden font-mono text-[10px] text-[#aeb7b7] sm:inline">
              Long-term stewardship
            </span>
          </div>

          <div>
            {earlierProjects.map((project) => (
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
