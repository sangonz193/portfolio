import { makeAutoObservable } from "mobx"

type Point = {
  x: number
  y: number
}

export const mousePositionStore = makeAutoObservable({
  position: undefined as Point | undefined,
  setMousePosition(point: Point) {
    this.position = point
  },
})
