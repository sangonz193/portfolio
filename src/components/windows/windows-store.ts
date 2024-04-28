import { Application, applications } from "@/apps";
import { makeAutoObservable } from "mobx";
import { WindowStore } from "./window-store";

export const windowsStore = makeAutoObservable({
  windows: [] as WindowStore[],
  openWindow(app: Application) {
    this.windows.push(new WindowStore({ app }));
  },
  closeWindow(id: number) {
    const index = this.windows.findIndex((window) => window.id === id);
    if (index === -1) return;

    this.windows.splice(index, 1);
  },
  focusWindow(id: number) {
    const window = this.windows.find((window) => window.id === id);
    if (!window) return;
    this.windows.forEach((w) => {
      if (w.order > window.order) w.order--;
    });
    window.order = this.windows.length;
  },
});

for (const app of applications) {
  windowsStore.openWindow(app);
}
