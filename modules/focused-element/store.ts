import { makeAutoObservable } from "mobx"

export const focusedElementStore = makeAutoObservable({
  focusedElement: null as HTMLElement | null,
  setFocusedElement(element: HTMLElement | null) {
    this.focusedElement = element
  },
})
