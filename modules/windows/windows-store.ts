import { makeAutoObservable } from "mobx"
import { WindowStore } from "./window-store"
import { WindowConfig } from "./window-config"
import { Application } from "../apps/app"

export const windowsStore = makeAutoObservable({
  windows: [] as WindowStore[],
  openApp(app: Application) {
    const id = app.name

    this.openWindow({
      id,
      name: app.name,
      content: {
        type: "url",
        href: app.href,
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
      const nextWindow = this.windows.find((w) => w.order === window.order - 1)
      nextWindow?.requestFocus()
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
