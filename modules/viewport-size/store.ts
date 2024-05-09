import { makeAutoObservable } from "mobx";

export const viewportSizeStore = makeAutoObservable({
  width: 0,
  height: 0,
  setSize({ height, width }: { width: number; height: number }) {
    this.width = width;
    this.height = height;
  },
});
