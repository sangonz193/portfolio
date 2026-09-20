import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import path from "node:path"

import { siteInfo } from "@/modules/info/site"

export const alt = siteInfo.title
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

async function loadSerif() {
  const css = await fetch(
    "https://fonts.googleapis.com/css?family=Libre+Baskerville",
    { headers: { "User-Agent": "curl" } },
  ).then((response) => response.text())
  const url = css.match(/src: url\(([^)]+\.ttf)\)/)?.[1]
  if (!url) return undefined
  return fetch(url).then((response) => response.arrayBuffer())
}

export default async function Image() {
  const icon = await readFile(path.join(process.cwd(), "app/icon.svg"))
  const iconSrc = `data:image/svg+xml;base64,${icon.toString("base64")}`
  const serif = await loadSerif().catch(() => undefined)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 82% 8%, rgb(122 46 140 / 0.55), transparent 42%), radial-gradient(circle at 12% 90%, rgb(29 111 181 / 0.45), transparent 45%), #0a0f15",
          color: "#f4eee7",
          fontFamily: serif ? "Libre Baskerville" : "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <img src={iconSrc} width={72} height={72} alt="" />
          <div style={{ fontSize: 34, color: "#e9e4dc" }}>{siteInfo.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 88, lineHeight: 1.02, letterSpacing: -3, maxWidth: 900 }}>
            I turn complex product ideas into reliable software.
          </div>
          <div style={{ fontSize: 28, color: "#aeb7b7", fontFamily: "ui-monospace, Menlo, monospace" }}>
            CTO · product architect · builder
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif ? [{ name: "Libre Baskerville", data: serif, weight: 400, style: "normal" }] : undefined,
    },
  )
}
