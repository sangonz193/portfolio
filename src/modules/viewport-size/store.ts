import { makeAutoObservable } from "mobx";

export const viewportSizeStore = makeAutoObservable({
  width: window.innerWidth,
  height: window.innerHeight,
  setSize({ height, width }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
  },
});
