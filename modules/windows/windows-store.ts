import { makeAutoObservable } from "mobx"

import { WindowConfig } from "./window-config"
import { WindowStore } from "./window-store"
import { App } from "../apps/schema"

export const windowsStore = makeAutoObservable({
  windows: [] as WindowStore[],
  openApp(app: App) {
    const id = app.name

    this.openWindow({
      id,
      name: app.name,
      content: {
        type: "url",
        src: app.src,
      },
      icon: {
        type: "url",
        src: app.icon,
      },
      minSize: {
        width: 300,
        height: 300,
      },
      infoWindow: app.infoWindow,
    })
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
