import { NAVIGATION_BAR_HEIGHT } from "@/components/navigation-bar/navigation-bar";
import { makeAutoObservable } from "mobx";

type Insets = {
  top: number;
  left: number;
  right: number;
  bottom: number;
};

export const safeAreaStore = makeAutoObservable({
  insets: {
    top: 0,
    left: 0,
    right: 0,
    bottom: NAVIGATION_BAR_HEIGHT,
  } satisfies Insets,
});
