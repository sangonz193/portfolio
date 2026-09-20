import { describe, expect, test } from "bun:test"

import { workFileSystem } from "./filesystem"
import { findFolder, findItem, getParentPath, normalizePath } from "./path"
import { readWorkUrl, writeWorkUrl } from "./url-state"

describe("virtual filesystem paths", () => {
  test("normalizes and resolves nested folders", () => {
    const path = normalizePath("//Work//Second Sponsor/")
    const folder = findFolder(workFileSystem, path)

    expect(path).toBe("/Work/Second Sponsor")
    expect(folder?.name).toBe("Second Sponsor")
    expect(findItem(workFileSystem, `${path}/Case study`)?.kind).toBe("document")
    expect(getParentPath(path)).toBe("/Work")
  })

  test("round trips deep-link state without duplicating the path", () => {
    const href = writeWorkUrl({ path: "/Work/Second Sponsor", file: "Case study" })
    const state = readWorkUrl(href.slice(href.indexOf("?")))

    expect(state).toEqual({ path: "/Work/Second Sponsor", file: "Case study" })
  })

  test("registers ordered evidence only for projects with verified artifacts", () => {
    const dataLoomEvidencePath = "/Work/Data Loom/Evidence"
    const dataLoomEvidence = findFolder(workFileSystem, dataLoomEvidencePath)

    expect(dataLoomEvidence?.children.map((item) => item.name)).toEqual([
      "Pairing and transfer flow.svg",
      "Hackathon recognition.svg",
    ])
    expect(findFolder(workFileSystem, "/Work/OpenFING/Evidence")).toBe(null)
    expect(findItem(workFileSystem, `${dataLoomEvidencePath}/Hackathon recognition.svg`)?.kind).toBe("image")
  })
})
