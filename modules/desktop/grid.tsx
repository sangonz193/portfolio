import { observer } from "mobx-react-lite"

import { AppDesktopItem } from "./app-desktop-item"
import { applications } from "../apps"
import { dataLoomApp } from "../apps/data-loom/app"
import { meApp } from "../apps/me/app"
import { openfingApp } from "../apps/openfing/app"
import { safeAreaStore } from "../safe-area/store"
import { viewportSizeStore } from "../viewport/size-store"
import { WindowIcon } from "../windows/window-icon"

export const DesktopGrid = observer(() => {
  const { height, width } = viewportSizeStore
  const { insets } = safeAreaStore

  if (!height || !width) {
    return null
  }

  const cellSize = 110
  const gap = 4
  const rows = Math.floor(
    (height - gap - insets.bottom - insets.top) / (cellSize + gap),
  )
  const columns = Math.floor(
    (width - gap - insets.right - insets.left) / (cellSize + gap),
  )

  return (
    <div
      className="absolute inset-0 bottom-[var(--nav-bar-height)] grid grid-flow-col bg-red-300 animate-in"
      style={{
        gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        gap,
        padding: gap,
        animationDelay: "0.5s",
      }}
    >
      <div className="sr-only">
        {applications.map((app) => (
          <WindowIcon
            icon={{
              type: "url",
              src: app.icon,
            }}
            className=""
            key={app.name}
          />
        ))}
      </div>
      <AppDesktopItem app={meApp} />
      <AppDesktopItem app={dataLoomApp} />
      <AppDesktopItem app={openfingApp} />
    </div>
  )
})
