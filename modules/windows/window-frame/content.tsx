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
  const [appeared, setAppeared] = useState(false)
  const [concealed, setConcealed] = useState(false)
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
      // The fade back in starts one frame later, once the document has laid out at the new size.
      const frame = requestAnimationFrame(() => requestAnimationFrame(() => setConcealed(false)))
      return () => cancelAnimationFrame(frame)
    }
    const { width, height } = iframe.getBoundingClientRect()
    iframe.style.width = `${width}px`
    iframe.style.height = `${height}px`
    iframe.style.flex = "none"
    setConcealed(true)
  }, [resizing])

  return (
    <>
      <iframe
        ref={ref}
        id={window.iFrameId}
        src={href}
        className={cn(
          "grow opacity-0 transition-opacity duration-200",
          (resizing || moving) && "pointer-events-none",
          loading && "absolute",
          !loading && !appeared && "animate-in",
          appeared && (concealed ? "opacity-0" : "opacity-100"),
        )}
        onAnimationEnd={() => setAppeared(true)}
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
        allow="fullscreen"
      />

      {loading && (
        <div className="absolute left-1/2 top-1/2 m-auto size-0 items-center justify-center">
          <WindowIcon
            icon={window.config.icon}
            className="absolute size-12 max-w-none animate-bounce"
          />
        </div>
      )}

      {!loading && (
        <div
          className={cn(
            "pointer-events-none absolute left-1/2 top-1/2 m-auto size-0 items-center justify-center transition-opacity duration-200",
            concealed ? "opacity-60" : "opacity-0",
          )}
        >
          <WindowIcon icon={window.config.icon} className="absolute size-12 max-w-none" />
        </div>
      )}
    </>
  )
}
