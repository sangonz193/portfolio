import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

import { SetNoBg } from "@/app/me/set-no-bg"
import { Button } from "@/components/ui/button"
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
    title: `${project.name} | Santiago González`,
    description: project.summary,
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

  return (
    <main className="prose mx-auto block w-full max-w-2xl grow px-4">
      {insideWindow && <SetNoBg />}

      <div className="h-8" />

      {!insideWindow && (
        <Button variant="link" asChild className="px-0 no-underline">
          <Link href="/me">
            <ArrowLeftIcon className="size-4" />
            Santiago González
          </Link>
        </Button>
      )}

      <div className="not-prose mt-4 flex-row flex-wrap items-baseline justify-between gap-2">
        <h1 className="text-4xl font-bold xs:text-5xl">{project.name}</h1>
        <span className="text-sm text-muted-foreground">{project.status}</span>
      </div>

      <p className="lead !text-foreground/80">{project.summary}</p>

      <ul className="not-prose flex flex-row flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
        {project.metadata.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Problem and context</h2>
      <p>{project.problem}</p>

      <h2>Santiago&apos;s role</h2>
      <p>{project.role}</p>

      <h2>Constraints</h2>
      <ul>
        {project.constraints.map((constraint) => (
          <li key={constraint}>{constraint}</li>
        ))}
      </ul>

      <h2>Important decisions and tradeoffs</h2>
      <ul>
        {project.decisions.map((decision) => (
          <li key={decision}>{decision}</li>
        ))}
      </ul>

      <h2>Verifiable proof and concrete improvements</h2>
      <ul>
        {project.proof.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Results and lessons</h2>
      <ul>
        {project.results.map((result) => (
          <li key={result}>{result}</li>
        ))}
      </ul>

      <h2>Current status</h2>
      <p>{project.currentStatus}</p>

      <h2>Links</h2>
      {project.links.length > 0 ? (
        <div className="not-prose flex-row flex-wrap gap-2">
          {project.links.map((link) => (
            <Button key={link.href} variant="secondary" asChild>
              <Link href={link.href} target="_blank" rel="noreferrer noopener">
                {link.label}
                <ExternalLinkIcon className="size-4" />
              </Link>
            </Button>
          ))}
        </div>
      ) : (
        <p>No public links are listed.</p>
      )}

      <div className={insideWindow ? "h-8" : "h-20"} />
    </main>
  )
}
