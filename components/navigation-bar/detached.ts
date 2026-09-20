import { computed } from "mobx"

import { viewportSizeStore } from "@/modules/viewport/size-store"
import { FULLSCREEN_MAX_WIDTH } from "@/modules/windows/window-store"
import { windowsStore } from "@/modules/windows/windows-store"

export const detachedStore = computed(() => {
  const { windows } = windowsStore
  if (viewportSizeStore.width < FULLSCREEN_MAX_WIDTH) return false

  return windows.every((window) => !window.maximized || window.minimized)
})
