import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons"
import { observer } from "mobx-react-lite"
import Link from "next/link"
import { lighten } from "polished"

import { DesktopItem } from "./desktop-item"
import { githubInfo } from "../info/github"
import { linkedInInfo } from "../info/linked-in"
import { viewportSizeStore } from "../viewport/size-store"

export const DesktopGrid = observer(() => {
  const { height, width } = viewportSizeStore

  if (!height || !width) {
    return null
  }

  const cellSize = 110
  const gap = 4
  const rows = Math.floor((height - gap) / (cellSize + gap))
  const columns = Math.floor((width - gap) / (cellSize + gap))

  return (
    <div
      className="absolute inset-0 bottom-[var(--nav-bar-height)] grid grid-flow-col animate-in"
      style={{
        gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gap,
        padding: gap,
      }}
    >
      <DesktopItem asChild onOpen={() => window.open(githubInfo.url, "_blank")}>
        <Link href={githubInfo.url}>
          <DesktopItem.Icon>
            <GitHubLogoIcon className="size-10" />
          </DesktopItem.Icon>

          <DesktopItem.Label>Santiago{"'"}s GitHub</DesktopItem.Label>
        </Link>
      </DesktopItem>

      <DesktopItem
        asChild
        onOpen={() => window.open(linkedInInfo.url, "_blank")}
      >
        <Link href={linkedInInfo.url}>
          <DesktopItem.Icon>
            <LinkedInLogoIcon
              className="size-10"
              style={{
                color: lighten(0.15, "#0762C8"),
              }}
            />
          </DesktopItem.Icon>

          <DesktopItem.Label>Santiago{"'"}s LinkedIn</DesktopItem.Label>
        </Link>
      </DesktopItem>
    </div>
  )
})
