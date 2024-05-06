import { Application } from "@/apps";
import { windowsStore } from "./windows-store";
import { makeAutoObservable } from "mobx";
import { ResizeHandleType } from "./resize-handles";

type WindowPositioning = {
  x: number;
  y: number;
  height: number;
  width: number;
};

export class WindowStore {
  readonly id: number;
  readonly app: Application;
  order: number = undefined as never;
  _preferredPositioning: WindowPositioning = undefined as never;
  _resizing: WindowPositioning | undefined = undefined as never;
  maximized = false;

  maxSize = {
    width: 600,
    height: 600,
  };

  constructor({ app }: { app: Application }) {
    this.app = app;
    this.id = Math.max(0, ...windowsStore.windows.map((w) => w.id)) + 1;
    this.order = Math.max(0, ...windowsStore.windows.map((w) => w.order)) + 1;

    this._preferredPositioning = {
      x: 50,
      y: 50,
      height: 600,
      width: 600,
    };

    this._updateFirstPosition();
    makeAutoObservable(this);
  }

  get focused() {
    return this.order === windowsStore.windows.length;
  }

  get positioning() {
    const positioning = this._resizing || this._preferredPositioning;
    return positioning;
  }

  get resizing() {
    return !!this._resizing;
  }

  get frameId() {
    return "window-frame:" + this.id;
  }

  toggleMaximized() {
    this.maximized = !this.maximized;
  }

  requestFocus() {
    const divId = this.frameId;
    const div = document.getElementById(divId);
    if (!div) return;

    div.focus();
  }

  resize(handle: ResizeHandleType, delta: { x: number; y: number }) {
    const resizing = { ...this._preferredPositioning };
    if (handle.includes("w")) {
      resizing.x += delta.x;
      resizing.width -= delta.x;
    } else if (handle.includes("e")) {
      resizing.width += delta.x;
    }

    if (handle.includes("n")) {
      resizing.y += delta.y;
      resizing.height -= delta.y;
    } else if (handle.includes("s")) {
      resizing.height += delta.y;
    }

    this._resizing = resizing;
  }

  move(delta: { x: number; y: number }) {
    if (this._resizing) return;

    this._preferredPositioning = {
      ...this._preferredPositioning,
      x: this._preferredPositioning.x + delta.x,
      y: this._preferredPositioning.y + delta.y,
    };
  }

  commitResize() {
    if (!this._resizing) return;
    this._preferredPositioning = this._resizing;
    this._resizing = undefined;
  }

  _updateFirstPosition() {
    const someWindowMatchesPosition = windowsStore.windows.some(
      (window) =>
        window !== this &&
        window.positioning.x === this._preferredPositioning.x &&
        window.positioning.y === this._preferredPositioning.y
    );

    if (!someWindowMatchesPosition) return;

    const shift = 20;
    this._preferredPositioning = {
      ...this._preferredPositioning,
      x: this._preferredPositioning.x + shift,
      y: this._preferredPositioning.y + shift,
    };

    this._updateFirstPosition();
  }
}
