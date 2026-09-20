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
})
