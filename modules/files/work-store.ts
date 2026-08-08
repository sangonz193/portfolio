import { makeAutoObservable } from "mobx"

import { ROOT_PATH, normalizePath } from "./path"

export const workStore = makeAutoObservable({
  path: ROOT_PATH,
  view: "grid" as "grid" | "list",
  selectedId: undefined as string | undefined,
  setPath(path: string) {
    this.path = normalizePath(path)
    this.selectedId = undefined
  },
  setView(view: "grid" | "list") {
    this.view = view
  },
  select(id: string | undefined) {
    this.selectedId = id
  },
})
