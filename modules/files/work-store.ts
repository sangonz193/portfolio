import { makeAutoObservable } from "mobx"

import { ROOT_PATH, normalizePath } from "./path"

export const workStore = makeAutoObservable({
  history: [ROOT_PATH],
  historyIndex: 0,
  view: "grid" as "grid" | "list",
  selectedId: undefined as string | undefined,
  get path(): string {
    return this.history[this.historyIndex]
  },
  get canGoBack() {
    return this.historyIndex > 0
  },
  get canGoForward() {
    return this.historyIndex < this.history.length - 1
  },
  setPath(path: string) {
    const next = normalizePath(path)
    this.selectedId = undefined
    if (next === this.path) return
    this.history = [...this.history.slice(0, this.historyIndex + 1), next]
    this.historyIndex = this.history.length - 1
  },
  goBack() {
    if (!this.canGoBack) return
    this.historyIndex -= 1
    this.selectedId = undefined
  },
  goForward() {
    if (!this.canGoForward) return
    this.historyIndex += 1
    this.selectedId = undefined
  },
  setView(view: "grid" | "list") {
    this.view = view
  },
  select(id: string | undefined) {
    this.selectedId = id
  },
})
