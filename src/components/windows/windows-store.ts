import { Application, applications } from "@/apps";
import { computed, makeAutoObservable, makeObservable, observable } from "mobx";

type WindowPositioning = {
  x: number;
  y: number;
  height: number;
  width: number;
  resizing?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const windowsStore = makeAutoObservable({
  windows: [] as Window[],
  openWindow(app: Application) {
    this.windows.push(new Window({ app }));
  },
  closeWindow(id: number) {
    this.windows = this.windows.filter((window) => window.id !== id);
  },
  resizeWindow(id: number, positioning: WindowPositioning) {
    const window = this.windows.find((window) => window.id === id);
    if (!window) return;
    window.positioning.width = positioning.width;
    window.positioning.height = positioning.height;
    window.positioning.x = positioning.x;
    window.positioning.y = positioning.y;
    window.positioning.resizing = positioning.resizing;
  },
  commitResize(id: number) {
    const window = this.windows.find((window) => window.id === id);
    if (!window) return;
    window.positioning.resizing = undefined;
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

export class Window {
  id: number;
  app: Application;
  order: number;
  positioning: WindowPositioning;
  test = { test: "test" };

  constructor({ app }: { app: Application }) {
    this.app = app;
    this.id = Math.max(0, ...windowsStore.windows.map((w) => w.id)) + 1;
    this.order = Math.max(0, ...windowsStore.windows.map((w) => w.order)) + 1;
    this.positioning = {
      x: 50,
      y: 50,
      height: 300,
      width: 300,
      resizing: undefined,
    };

    makeObservable(this, {
      order: observable,
      positioning: observable,
      focused: computed,
    });
  }

  get focused() {
    return this.order === windowsStore.windows.length;
  }
}

for (const app of applications) {
  windowsStore.windows.push(new Window({ app }));
}
