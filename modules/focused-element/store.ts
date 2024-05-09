import { makeAutoObservable } from "mobx";

export const focusedElementStore = makeAutoObservable({
  focusedElement: null as HTMLElement | null,
  setFocusedElement(element: HTMLElement | null) {
    this.focusedElement = element;
  },
});

setInterval(() => {
  focusedElementStore.setFocusedElement(document.activeElement as HTMLElement);
}, 100);
