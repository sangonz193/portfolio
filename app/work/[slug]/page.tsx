import { ArrowLeftIcon, ArrowUpRightIcon, ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import { SetNoBg } from "@/modules/me/set-no-bg"
import { ProjectMark, projectThemes } from "@/modules/projects/project-summary"
import { getProject, projects } from "@/modules/projects/projects"

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const project = getProject((await params).slug)

  if (!project) return {}

  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: { title: project.name, description: project.summary },
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ window?: string }>
}) {
  const project = getProject((await params).slug)
  const insideWindow = (await searchParams).window === "true"

  if (!project) notFound()

  const theme = projectThemes[project.slug]

  return (
    <main className="studio-document min-h-screen w-full grow overflow-hidden">
      {insideWindow && <SetNoBg />}

      <article
        className={`mx-auto w-full px-6 pb-20 sm:px-9 ${
          insideWindow ? "max-w-4xl pt-9" : "max-w-6xl pt-10 sm:pt-14"
        }`}
      >
        {!insideWindow && (
          <Button
            variant="ghost"
            asChild
            className="-ml-3 mb-12 w-fit text-[#e9e4dc] hover:bg-white/[0.06]"
          >
            <Link href="/me">
              <ArrowLeftIcon className="size-4" />
              Santiago González
            </Link>
          </Button>
        )}

        <header className="pb-12 sm:pb-16">
          <div className="mb-8 flex-row items-start justify-between gap-6">
            <ProjectMark slug={project.slug} className="size-16 sm:size-20" />
            <span className={`pt-2 font-mono text-[10px] ${theme.text}`}>
              {project.status}
            </span>
          </div>

          <p className={`mb-4 font-mono text-[11px] ${theme.text}`}>
            Case study
          </p>
          <h1 className="font-editorial text-balance text-[clamp(3.5rem,9vw,7.5rem)] font-medium leading-[0.88] tracking-[-0.055em] text-[#f4eee7]">
            {project.name}
          </h1>
          <p className="mt-8 max-w-4xl text-lg leading-8 text-[#c4cbca] sm:text-2xl sm:leading-10">
            {project.summary}
          </p>

          <ul className="mt-7 flex flex-row flex-wrap items-center gap-x-2 font-mono text-[10px] leading-5 text-[#aeb7b7]">
            {project.metadata.map((item, index) => (
              <li key={item} className="flex flex-row items-center gap-2">
                {index > 0 && <span aria-hidden="true">·</span>}
                {item}
              </li>
            ))}
          </ul>
        </header>

        <div className="divide-y divide-white/12">
          <CaseStudySection index="01" title="Problem and context">
            <p className="text-base leading-8 text-[#c4cbca] sm:text-lg sm:leading-9">
              {project.problem}
            </p>
          </CaseStudySection>

          <CaseStudySection index="02" title="Santiago's role">
            <p className="text-base leading-8 text-[#c4cbca] sm:text-lg sm:leading-9">
              {project.role}
            </p>
          </CaseStudySection>

          <CaseStudySection index="03" title="Constraints">
            <DetailList items={project.constraints} />
          </CaseStudySection>

          <CaseStudySection
            index="04"
            title="Important decisions and tradeoffs"
          >
            <DetailList items={project.decisions} numbered />
          </CaseStudySection>

          <CaseStudySection
            index="05"
            title="Verifiable proof and concrete improvements"
          >
            <DetailList
              items={project.proof}
              emphasized
              accent={theme.accent}
            />
          </CaseStudySection>

          <CaseStudySection index="06" title="Results and lessons">
            <DetailList items={project.results} />
          </CaseStudySection>
        </div>

        <section className="grid gap-4 border-y border-white/15 py-8 sm:grid-cols-[10rem_1fr] sm:gap-10 sm:py-10">
          <h2 className="font-editorial text-xl font-semibold text-[#f4eee7]">
            Current status
          </h2>
          <p className="text-base leading-8 text-[#c4cbca]">
            {project.currentStatus}
          </p>
        </section>

        <section className="pt-10">
          <h2 className="font-editorial text-2xl font-semibold tracking-tight text-[#f4eee7]">
            Links
          </h2>

          {project.links.length > 0 ? (
            <div className="mt-4 flex-row flex-wrap gap-x-6 gap-y-3">
              {project.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`decoration-current/30 flex flex-row items-center gap-1.5 text-sm font-semibold underline underline-offset-4 hover:decoration-current ${theme.text}`}
                >
                  {link.label}
                  <ExternalLinkIcon className="size-4" />
                </Link>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-sm text-[#aeb7b7]">
              No public links are listed.
            </p>
          )}

          <Button
            variant="ghost"
            asChild
            className="-ml-3 mt-10 w-fit text-[#e9e4dc] hover:bg-white/[0.06]"
          >
            <Link href={`/me${insideWindow ? "?window=true" : ""}`}>
              Back to selected work
              <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </section>
      </article>
    </main>
  )
}

function CaseStudySection({
  index,
  title,
  children,
}: {
  index: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="grid gap-6 py-10 sm:grid-cols-[10rem_1fr] sm:gap-10 sm:py-14">
      <div className="gap-2">
        <span className="font-mono text-[10px] text-[#aeb7b7]">{index}</span>
        <h2 className="font-editorial whitespace-normal break-words text-xl font-semibold leading-6 text-[#f4eee7]">
          {title}
        </h2>
      </div>
      <div>{children}</div>
    </section>
  )
}

function DetailList({
  items,
  numbered,
  emphasized,
  accent,
}: {
  items: readonly string[]
  numbered?: boolean
  emphasized?: boolean
  accent?: string
}) {
  return (
    <ul className="divide-white/10 divide-y border-y border-white/12">
      {items.map((item, index) => (
        <li
          key={item}
          className={`relative grid grid-cols-[2rem_1fr] gap-3 py-4 text-[15px] leading-7 text-[#c4cbca] sm:py-5 sm:text-base sm:leading-8 ${
            emphasized ? "pl-4" : ""
          }`}
        >
          {emphasized && (
            <span className={`absolute inset-y-3 left-0 w-0.5 ${accent}`} />
          )}
          <span className="pt-0.5 font-mono text-[10px] text-[#aeb7b7]">
            {numbered ? String(index + 1).padStart(2, "0") : "—"}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}
