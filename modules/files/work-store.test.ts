import { beforeEach, describe, expect, test } from "bun:test"

import { workStore } from "./work-store"

function reset() {
  workStore.history = ["/Work"]
  workStore.historyIndex = 0
  workStore.selectedId = undefined
}

describe("workStore history", () => {
  beforeEach(reset)

  test("starts at root with no forward entry", () => {
    expect(workStore.path).toBe("/Work")
    expect(workStore.canGoBack).toBe(false)
    expect(workStore.canGoForward).toBe(false)
  })

  test("navigating records history and enables back", () => {
    workStore.setPath("/Work/Featured Work")
    expect(workStore.path).toBe("/Work/Featured Work")
    expect(workStore.canGoBack).toBe(true)
    expect(workStore.canGoForward).toBe(false)
  })

  test("back and forward move through history", () => {
    workStore.setPath("/Work/Featured Work")
    workStore.setPath("/Work/Featured Work/Second Sponsor")
    workStore.goBack()
    expect(workStore.path).toBe("/Work/Featured Work")
    expect(workStore.canGoForward).toBe(true)
    workStore.goForward()
    expect(workStore.path).toBe("/Work/Featured Work/Second Sponsor")
    expect(workStore.canGoForward).toBe(false)
  })

  test("navigating after going back drops forward entries", () => {
    workStore.setPath("/Work/Featured Work")
    workStore.goBack()
    workStore.setPath("/Work/Earlier Work")
    expect(workStore.canGoForward).toBe(false)
    expect(workStore.history).toEqual(["/Work", "/Work/Earlier Work"])
  })

  test("navigating to the current path does not add an entry", () => {
    workStore.setPath("/Work")
    expect(workStore.history).toEqual(["/Work"])
  })
})
