import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"

import iconSvg from "@/app/icon.svg"
import { Button } from "@/components/ui/button"
import { githubInfo } from "@/modules/info/github"
import { linkedInInfo } from "@/modules/info/linked-in"

import { SetNoBg } from "./set-no-bg"

export const metadata = {
  title: "Santiago González",
  description: "Santiago González's personal website",
}

const webFavorites = [
  //
  "TypeScript",
  "Supabase",
  "Next.js",
  "Tailwind CSS",
]

const appFavorites = [
  //
  "TypeScript",
  "Supabase",
  "Expo",
  "NativeWind",
]

export default function Page({
  searchParams,
}: {
  searchParams: { window: string }
}) {
  const insideWindow = searchParams.window === "true"

  return (
    <div className="prose mx-auto block w-full max-w-2xl grow px-4">
      {insideWindow && <SetNoBg />}

      <div className="h-10" />

      {!insideWindow && (
        <div>
          <Button variant="link" asChild className="ml-auto px-0 no-underline">
            <Link href="/os">
              <Image {...iconSvg} alt="OS Icon" height={20} width={20} />
              OS Mode
            </Link>
          </Button>
        </div>
      )}

      <span className="xs:text-7xl flex flex-col text-4xl font-bold">
        <span>Santiago</span>
        <span>González</span>
      </span>

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

      <p>
        Full Stack Engineer with startup experience. Quick to adopt new tech and
        optimize processes. Detail-oriented, user-focused.
      </p>

      <span className="font-semibold">
        Web tools I{"'"}m currently enjoying:
      </span>
      <ul>
        {webFavorites.map((favorite) => (
          <li key={favorite}>{favorite}</li>
        ))}
      </ul>

      <span className="font-semibold">
        Mobile tools I{"'"}m currently enjoying:
      </span>
      <ul>
        {appFavorites.map((favorite) => (
          <li key={favorite}>{favorite}</li>
        ))}
      </ul>

      <div className={insideWindow ? "h-5" : "h-20"} />
    </div>
  )
}
