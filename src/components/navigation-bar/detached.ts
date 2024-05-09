import { computed } from "mobx";
import { windowsStore } from "@/modules/windows/windows-store";

export const detachedStore = computed(() => {
  const { windows } = windowsStore;

  return windows.every((window) => !window.maximized || window.minimized);
});
