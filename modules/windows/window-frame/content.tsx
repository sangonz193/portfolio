import { observer } from "mobx-react-lite"
import { useState } from "react"

import { cn } from "@/lib/cn"

import { WindowIcon } from "../window-icon"
import { WindowStore } from "../window-store"


type Props = {
  window: WindowStore
  moving: boolean
}

export const WindowFrameContent = observer((props: Props) => {
  const { window, moving } = props
  const { content } = window.config
  const { resizing } = window

  if (content.type === "url") {
    return (
      <IframeContent
        href={content.href}
        moving={moving}
        resizing={resizing}
        window={window}
      />
    )
  }

  const Content = content.component
  return <Content />
})

type IframeContentProps = {
  window: WindowStore
  href: string
  resizing: boolean
  moving: boolean
}

function IframeContent(props: IframeContentProps) {
  const { window, href, resizing, moving } = props
  const [loading, setLoading] = useState(true)

  return (
    <>
      <iframe
        id={window.iFrameId}
        src={href}
        className={cn(
          "grow opacity-0 transition-opacity duration-300",
          (resizing || moving) && "pointer-events-none",
          loading && "absolute",
          !loading && "animate-in",
        )}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />

      {loading && (
        <div className="absolute left-1/2 top-1/2 m-auto size-0 items-center justify-center">
          <WindowIcon
            icon={window.config.icon}
            className="absolute size-12 max-w-none animate-bounce"
          />
        </div>
      )}
    </>
  )
}
