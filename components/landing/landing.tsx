"use client"

import { ComponentProps, createRef } from "react"
import { Link } from "./link"
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { githubInfo } from "@/modules/info/github"
import { linkedInInfo } from "@/modules/info/linked-in"
import { BlurLinkBox } from "./color-box"
import { ChevronRightIcon } from "lucide-react"

const parentRef = createRef<HTMLDivElement>()

const links: ComponentProps<typeof Link>[] = [
  {
    href: githubInfo.url,
    Icon: GitHubLogoIcon,
    color: "#6a6e73",
    alt: "Santiago's GitHub",
  },
  {
    href: linkedInInfo.url,
    Icon: LinkedInLogoIcon,
    alt: "Santiago's LinkedIn",
    color: "#0762C8",
  },
]

export function Landing() {
  return (
    <div ref={parentRef} className="min-h-screen">
      <div className="relative my-auto gap-14">
        <h1 className="relative px-6 text-center text-7xl font-bold lg:text-8xl">
          Santiago González
        </h1>

        <div className="mx-auto grid grid-cols-[100px_100px] grid-rows-[100px_1fr] gap-5">
          {links.map((link) => (
            <Link key={link.href} {...link} />
          ))}

          <BlurLinkBox
            href="/os"
            color="violet"
            className="col-span-full w-auto"
          >
            <div className="relative my-auto max-w-full grow flex-row items-center px-3 py-1">
              <span className="min-w-0 shrink grow basis-0 font-medium">
                Explore Interactive Portfolio
              </span>
              <ChevronRightIcon className="size-7 transition-transform duration-300 group-hover:translate-x-2" />
            </div>
          </BlurLinkBox>
        </div>

        <div className="h-32" />
      </div>
    </div>
  )
}
