import { normalizePath } from "./path"

export type WorkUrlState = { path: string; file?: string }

export function readWorkUrl(search: string): WorkUrlState {
  const params = new URLSearchParams(search)
  return {
    path: normalizePath(params.get("path") ?? "/Work"),
    file: params.get("file") || undefined,
  }
}

export function writeWorkUrl(state: WorkUrlState) {
  const params = new URLSearchParams()
  params.set("path", normalizePath(state.path))
  if (state.file) params.set("file", state.file)
  return `/os?${params.toString()}`
}

export function updateWorkUrl(state: WorkUrlState, mode: "push" | "replace" = "push") {
  const url = writeWorkUrl(state)
  if (mode === "push") window.history.pushState({}, "", url)
  else window.history.replaceState({}, "", url)
}
