import { observer } from "mobx-react-lite"

import { AppDesktopItem } from "./app-desktop-item"
import { dataLoomApp } from "../apps/data-loom/app"
import { openfingApp } from "../apps/openfing/app"
import { spendSplitterApp } from "../apps/spend-splitter/app"
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
      <AppDesktopItem app={dataLoomApp} />
      <AppDesktopItem app={openfingApp} />
      <AppDesktopItem app={spendSplitterApp} />
    </div>
  )
})
