import { observer } from "mobx-react-lite"
import { useLayoutEffect, useRef, useState } from "react"

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
        href={content.src}
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
  const ref = useRef<HTMLIFrameElement>(null)

  // Reflowing the document on every pointer move is what makes resizing stutter, so the
  // iframe keeps the size it had when the drag started, is hidden behind the window's icon,
  // and lays out once on release.
  useLayoutEffect(() => {
    const iframe = ref.current
    if (!iframe) return
    if (!resizing) {
      iframe.style.width = ""
      iframe.style.height = ""
      iframe.style.flex = ""
      return
    }
    const { width, height } = iframe.getBoundingClientRect()
    iframe.style.width = `${width}px`
    iframe.style.height = `${height}px`
    iframe.style.flex = "none"
  }, [resizing])

  return (
    <>
      <iframe
        ref={ref}
        id={window.iFrameId}
        src={href}
        className={cn(
          "grow opacity-0 transition-opacity duration-300",
          (resizing || moving) && "pointer-events-none",
          resizing && "invisible",
          loading && "absolute",
          !loading && "animate-in",
        )}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        allow="fullscreen"
      />

      {(loading || resizing) && (
        <div className="absolute left-1/2 top-1/2 m-auto size-0 items-center justify-center">
          <WindowIcon
            icon={window.config.icon}
            className={cn("absolute size-12 max-w-none", loading ? "animate-bounce" : "opacity-60")}
          />
        </div>
      )}
    </>
  )
}
