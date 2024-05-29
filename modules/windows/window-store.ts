import { makeAutoObservable, observable } from "mobx"

import { focusedElementStore } from "@/modules/focused-element/store"
import { clamp } from "@/utils/clamp"

import { ResizeHandleType } from "./resize-handles"
import { WindowConfig } from "./window-config"
import { windowsStore } from "./windows-store"
import { safeAreaStore } from "../safe-area/store"
import { viewportSizeStore } from "../viewport/size-store"

type WindowPositioning = {
  x: number
  y: number
  height: number
  width: number
}

export class WindowStore {
  readonly id: number
  readonly config: Readonly<WindowConfig>
  order: number = undefined as never
  _preferredPositioning: WindowPositioning = undefined as never
  _resizing: WindowPositioning | undefined = undefined as never
  maximized = false
  minimized = false
  navBarItemRef = observable.box<HTMLButtonElement | null>(null)

  maxSize: {
    width: number
    height: number
  } | null = null

  minSize = {
    width: 300,
    height: 300,
  }

  constructor({ config }: { config: WindowConfig }) {
    this.config = config
    this.id = Math.max(0, ...windowsStore.windows.map((w) => w.id)) + 1
    this.order = Math.max(0, ...windowsStore.windows.map((w) => w.order)) + 1

    this._preferredPositioning = {
      x: 30,
      y: 30,
      height: config.initialSize?.height || 600,
      width: config.initialSize?.width || 600,
    }

    this._preferredPositioning.width = Math.max(
      config.minSize.width,
      Math.min(this._preferredPositioning.width, window.innerWidth - 2 * 30),
    )

    this._preferredPositioning.height = Math.max(
      config.minSize.height,
      Math.min(
        this._preferredPositioning.height,
        window.innerHeight - 2 * 30 - safeAreaStore.insets.bottom,
      ),
    )

    makeAutoObservable(this)
  }

  get positioning() {
    if (this._resizing) {
      return this._resizing
    }

    const { _preferredPositioning } = this
    const positioning = { ..._preferredPositioning }

    positioning.x = clamp(
      _preferredPositioning.x,
      -_preferredPositioning.width + 200,
      viewportSizeStore.width - 200,
    )
    positioning.y = clamp(
      _preferredPositioning.y,
      -_preferredPositioning.height + 30 * 4,
      viewportSizeStore.height - 30 * 4,
    )

    return positioning
  }

  get resizing() {
    return !!this._resizing
  }

  get frameId() {
    return "window-frame:" + this.id
  }

  get iFrameId() {
    return "window-iframe:" + this.id
  }

  get focused() {
    const frameDiv = document.getElementById(this.frameId)
    if (frameDiv && frameDiv.contains(focusedElementStore.focusedElement))
      return true

    const iFrame = document.getElementById(this.iFrameId)
    if (iFrame === focusedElementStore.focusedElement) return true

    const navBarItem = this.navBarItemRef.get()
    if (navBarItem === focusedElementStore.focusedElement) return true

    return false
  }

  toggleMaximized() {
    this.maximized = !this.maximized
  }

  toggleMinimized() {
    this.minimized = !this.minimized
    if (!this.minimized) return

    const divId = this.frameId
    const div = document.getElementById(divId)
    if (!div) return

    setTimeout(() => {
      focusedElementStore.focusedElement?.blur()
    })
  }

  requestFocus() {
    const divId = this.frameId
    const div = document.getElementById(divId)
    if (!div) return

    this.minimized = false
    setTimeout(() => {
      div.focus({
        preventScroll: true,
      })
    }, 0)
  }

  resize(handle: ResizeHandleType, delta: { x: number; y: number }) {
    const { minSize, _preferredPositioning } = this
    const maxSize = this.maxSize || viewportSizeStore

    const resizing = { ..._preferredPositioning }

    if (handle.includes("n")) {
      resizing.height = clamp(
        _preferredPositioning.height - delta.y,
        minSize.height,
        _preferredPositioning.y + _preferredPositioning.height,
      )
      resizing.y = clamp(
        _preferredPositioning.y + delta.y,
        0,
        _preferredPositioning.y + _preferredPositioning.height - minSize.height,
      )
    }

    if (handle.includes("s")) {
      resizing.height = clamp(
        _preferredPositioning.height + delta.y,
        minSize.height,
        Math.min(maxSize.height, viewportSizeStore.height - resizing.y),
      )
    }

    if (handle.includes("e")) {
      resizing.width = clamp(
        _preferredPositioning.width + delta.x,
        minSize.width,
        Math.min(maxSize.width, viewportSizeStore.width - resizing.x),
      )
    }

    if (handle.includes("w")) {
      resizing.width = clamp(
        _preferredPositioning.width - delta.x,
        minSize.width,
        _preferredPositioning.x + _preferredPositioning.width,
      )
      resizing.x = clamp(
        _preferredPositioning.x + delta.x,
        0,
        _preferredPositioning.x + _preferredPositioning.width - minSize.width,
      )
    }

    this._resizing = resizing
  }

  move(delta: { x: number; y: number }) {
    if (this._resizing) return

    this._preferredPositioning = {
      ...this._preferredPositioning,
      x: clamp(
        this._preferredPositioning.x + delta.x,
        0 - (this._preferredPositioning.width - 200),
        window.innerWidth - 200,
      ),
      y: clamp(
        this._preferredPositioning.y + delta.y,
        0,
        window.innerHeight - 30 * 4,
      ),
    }
  }

  commitResize() {
    if (!this._resizing) return
    this._preferredPositioning = this._resizing
    this._resizing = undefined
  }

  setNavBarItemRef(ref: HTMLButtonElement | null) {
    this.navBarItemRef.set(ref)
  }
}
