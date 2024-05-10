import React from "react";
import { WindowStore } from "../window-store";
import { autorun, makeAutoObservable, runInAction } from "mobx";
import { safeAreaStore } from "@/modules/safe-area/store";
import { viewportSizeStore } from "@/modules/viewport-size/store";

type StyleLogicType = "point-and-size" | "force-insets" | "insets-maximized";

export function createWindowFramePositioningStore(window: WindowStore) {
  let timeout: NodeJS.Timeout | null = null;

  return makeAutoObservable({
    styleLogic: "point-and-size" as StyleLogicType,
    get style(): React.CSSProperties {
      if (this.styleLogic === "point-and-size") {
        return {
          top: window.positioning.y,
          left: window.positioning.x,
          width: window.positioning.width,
          height: window.positioning.height,
        };
      }

      if (this.styleLogic === "force-insets") {
        const { positioning } = window;

        return {
          top: positioning.y,
          left: positioning.x,
          right: viewportSizeStore.width - positioning.x - positioning.width,
          bottom: viewportSizeStore.height - positioning.y - positioning.height,
        };
      }

      this.styleLogic satisfies "insets-maximized";
      const { insets } = safeAreaStore;

      return {
        top: insets.top,
        left: insets.left,
        right: insets.right,
        bottom: insets.bottom,
      };
    },

    setStyleLogic(value: StyleLogicType) {
      runInAction(() => {
        this.styleLogic = value;
      });
    },

    autoRun() {
      if (timeout) clearTimeout(timeout);

      if (window.maximized) {
        if (this.styleLogic === "insets-maximized") return;
        this.setStyleLogic("force-insets");
        timeout = setTimeout(() => {
          this.setStyleLogic("insets-maximized");
        });
      } else {
        if (this.styleLogic === "point-and-size") return;
        this.setStyleLogic("force-insets");
        timeout = setTimeout(() => {
          this.setStyleLogic("point-and-size");
        });
      }
    },
  });
}

export function WindowFramePositioningStoreListener({
  store,
}: {
  store: ReturnType<typeof createWindowFramePositioningStore>;
}) {
  React.useEffect(() => {
    const dispose = autorun(() => {
      store.autoRun();
    });

    return () => dispose();
  }, [store]);

  return null;
}
