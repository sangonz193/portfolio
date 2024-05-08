import { Application } from "@/apps";
import { windowsStore } from "./windows-store";
import { makeAutoObservable } from "mobx";
import { ResizeHandleType } from "./resize-handles";
import { focusedElementStore } from "@/modules/focused-element/store";
import { clamp } from "@/utils/clamp";
import { RefObject } from "react";
import { viewportSizeStore } from "@/modules/viewport-size/store";

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
  minimized = false;
  navBarItemRef: RefObject<HTMLButtonElement> = {
    current: null,
  };

  maxSize: {
    width: number;
    height: number;
  } | null = null;

  minSize = {
    width: 300,
    height: 300,
  };

  constructor({ app }: { app: Application }) {
    this.app = app;
    this.id = Math.max(0, ...windowsStore.windows.map((w) => w.id)) + 1;
    this.order = Math.max(0, ...windowsStore.windows.map((w) => w.order)) + 1;

    this._preferredPositioning = {
      x: 30,
      y: 30,
      height: 600,
      width: 600,
    };

    this._updateFirstPosition();
    this.move({
      x: 0,
      y: 0,
    });
    this._preferredPositioning.width = clamp(
      this._preferredPositioning.width,
      300,
      Math.max(window.innerWidth - this._preferredPositioning.x * 2, 300)
    );
    makeAutoObservable(this);
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

  get iFrameId() {
    return "window-iframe:" + this.id;
  }

  get focused() {
    const frameDiv = document.getElementById(this.frameId);
    if (frameDiv && frameDiv.contains(focusedElementStore.focusedElement))
      return true;

    const iFrame = document.getElementById(this.iFrameId);
    return iFrame === focusedElementStore.focusedElement;
  }

  toggleMaximized() {
    this.maximized = !this.maximized;
  }

  toggleMinimized() {
    this.minimized = !this.minimized;
    if (!this.minimized) return;

    const divId = this.frameId;
    const div = document.getElementById(divId);
    if (!div) return;

    setTimeout(() => {
      focusedElementStore.focusedElement?.blur();
    });
  }

  requestFocus() {
    const divId = this.frameId;
    const div = document.getElementById(divId);
    if (!div) return;

    this.minimized = false;
    setTimeout(() => {
      div.focus();
    }, 0);
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
    this._resizing.width = clamp(
      this._resizing.width,
      this.minSize.width,
      this.maxSize?.width ?? viewportSizeStore.width
    );
    this._resizing.height = clamp(
      this._resizing.height,
      this.minSize.height,
      this.maxSize?.height ?? viewportSizeStore.height
    );
  }

  move(delta: { x: number; y: number }) {
    if (this._resizing) return;

    this._preferredPositioning = {
      ...this._preferredPositioning,
      x: clamp(
        this._preferredPositioning.x + delta.x,
        0 - (this._preferredPositioning.width - 200),
        window.innerWidth - 200
      ),
      y: clamp(
        this._preferredPositioning.y + delta.y,
        0,
        window.innerHeight - 30 * 4
      ),
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
