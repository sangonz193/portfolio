import { WindowConfig } from "./window-config"

export function isExternalWebsite(config: WindowConfig) {
  if (config.content.type !== "url") return false

  return /^https?:\/\//i.test(config.content.src)
}
