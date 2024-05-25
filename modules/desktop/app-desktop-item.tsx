import { DesktopItem } from "./desktop-item"
import { Application } from "../apps/app"
import { WindowIcon } from "../windows/window-icon"
import { windowsStore } from "../windows/windows-store"

type Props = {
  app: Application
}

export function AppDesktopItem({ app }: Props) {
  return (
    <DesktopItem onOpen={() => windowsStore.openApp(app)}>
      <DesktopItem.Icon>
        <WindowIcon icon={{ type: "url", src: app.icon }} className="size-10" />
      </DesktopItem.Icon>

      <DesktopItem.Label>{app.name}</DesktopItem.Label>
    </DesktopItem>
  )
}
