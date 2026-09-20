import { makeAutoObservable } from "mobx"

import { WindowConfig } from "./window-config"
import { WindowStore } from "./window-store"
import { App } from "../apps/schema"
import { workApp } from "../apps/work/app"
import { ExplorerWindow } from "../files/explorer-window"
import { FolderIcon } from "../files/icons"
import { ROOT_PATH } from "../files/path"
import { updateWorkUrl } from "../files/url-state"
import { workStore } from "../files/work-store"

export const windowsStore = makeAutoObservable({
  windows: [] as WindowStore[],
  openApp(app: App) {
    if (app.id === "work") {
      if (!this.windows.some((window) => window.config.id === "work-explorer")) {
        workStore.setPath(ROOT_PATH)
      }
      this.openWindow({
        id: "work-explorer",
        name: "Work",
        icon: { type: "component", component: FolderIcon },
        minSize: { width: 340, height: 320 },
        initialSize: { width: 760, height: 560 },
        content: { type: "component", component: ExplorerWindow },
      })
      return
    }
    const id = app.name

    this.openWindow({
      id,
      name: app.name,
      content: {
        type: "url",
        src: app.src,
      },
      icon: app.icon,
      minSize: {
        width: 300,
        height: 300,
      },
      infoWindow: app.infoWindow,
      initialSize: app.initialSize || {
        width: 600,
        height: 600,
      },
    })
  },
  openWorkFolder(path: string) {
    this.openApp(workApp)
    workStore.setPath(path)
    updateWorkUrl({ path })
  },
  openWindow(config: WindowConfig) {
    const existingWindow = this.windows.find(
      (window) => window.config.id === config.id,
    )
    if (existingWindow) {
      existingWindow.requestFocus()
      return
    }

    const window = new WindowStore({ config })
    this.windows.push(window)
  },
  focusWindow(id: string) {
    this.windows.find((window) => window.config.id === id)?.requestFocus()
  },
  closeWindow(id: number) {
    const index = this.windows.findIndex((window) => window.id === id)
    if (index === -1) return

    const window = this.windows[index]
    this.windows.splice(index, 1)

    if (window.focused) {
      const openedWindows = this.windows.filter((w) => !w.minimized)
      const nextWindow = openedWindows
        .sort((w1, w2) => w1.order - w2.order)
        .pop()

      setTimeout(() => {
        nextWindow?.requestFocus()
      })
    }
  },
  moveToTop(id: number) {
    const window = this.windows.find((window) => window.id === id)
    if (!window) return
    this.windows.forEach((w) => {
      if (w.order > window.order) w.order--
    })
    window.order = this.windows.length
  },
})
