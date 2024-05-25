import { WindowConfig } from "../windows/window-config"

export type Application = {
  name: string
  icon: string
  href: string
  infoWindow?: WindowConfig
}
