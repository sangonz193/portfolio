import { Application } from "@/apps";
import { makeAutoObservable } from "mobx";
import { WindowStore } from "./window-store";

export const windowsStore = makeAutoObservable({
  windows: [] as WindowStore[],
  openWindow(app: Application) {
    const window = new WindowStore({ app });
    this.windows.push(window);
  },
  closeWindow(id: number) {
    const index = this.windows.findIndex((window) => window.id === id);
    if (index === -1) return;

    const window = this.windows[index];
    this.windows.splice(index, 1);

    if (window.focused) {
      const nextWindow = this.windows.find((w) => w.order === window.order - 1);
      nextWindow?.requestFocus();
    }
  },
  moveToTop(id: number) {
    const window = this.windows.find((window) => window.id === id);
    if (!window) return;
    this.windows.forEach((w) => {
      if (w.order > window.order) w.order--;
    });
    window.order = this.windows.length;
  },
});
