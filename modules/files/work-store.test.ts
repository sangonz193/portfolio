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
    workStore.setPath("/Work/Second Sponsor")
    expect(workStore.path).toBe("/Work/Second Sponsor")
    expect(workStore.canGoBack).toBe(true)
    expect(workStore.canGoForward).toBe(false)
  })

  test("back and forward move through history", () => {
    workStore.setPath("/Work/Second Sponsor")
    workStore.setPath("/Work/Second Sponsor/Evidence")
    workStore.goBack()
    expect(workStore.path).toBe("/Work/Second Sponsor")
    expect(workStore.canGoForward).toBe(true)
    workStore.goForward()
    expect(workStore.path).toBe("/Work/Second Sponsor/Evidence")
    expect(workStore.canGoForward).toBe(false)
  })

  test("navigating after going back drops forward entries", () => {
    workStore.setPath("/Work/Second Sponsor")
    workStore.goBack()
    workStore.setPath("/Work/Git Nav")
    expect(workStore.canGoForward).toBe(false)
    expect(workStore.history).toEqual(["/Work", "/Work/Git Nav"])
  })

  test("navigating to the current path does not add an entry", () => {
    workStore.setPath("/Work")
    expect(workStore.history).toEqual(["/Work"])
  })
})
