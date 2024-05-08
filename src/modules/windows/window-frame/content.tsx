import { cn } from "@/lib/cn";
import { WindowStore } from "../window-store";
import { observer } from "mobx-react-lite";

type Props = {
  window: WindowStore;
  moving: boolean;
};

export const WindowFrameContent = observer((props: Props) => {
  const { window, moving } = props;
  const { content } = window.config;
  const { resizing } = window;

  if (content.type === "url") {
    return (
      <iframe
        id={window.iFrameId}
        src={content.href}
        className={cn("grow", (resizing || moving) && "pointer-events-none")}
      />
    );
  }

  const Content = content.component;
  return <Content />;
});
