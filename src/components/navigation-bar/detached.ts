import { computed } from "mobx";
import { windowsStore } from "../windows/windows-store";

export const detachedStore = computed(() => {
  const { windows } = windowsStore;

  return windows.every((window) => !window.maximized || window.minimized);
});
