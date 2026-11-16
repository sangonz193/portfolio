import { describe, expect, test } from "bun:test"

import { isExternalWebsite } from "./is-external-website"

const config = (content: { type: "url"; src: string } | { type: "component"; component: () => null }) => ({
  id: "test",
  name: "Test",
  content,
  icon: { type: "url" as const, src: "icon.png" },
  minSize: { width: 1, height: 1 },
})

describe("isExternalWebsite", () => {
  test("accepts external HTTP and HTTPS URLs", () => {
    expect(isExternalWebsite(config({ type: "url", src: "https://example.com" }))).toBe(true)
    expect(isExternalWebsite(config({ type: "url", src: "http://example.com" }))).toBe(true)
  })

  test("rejects internal paths and component content", () => {
    expect(isExternalWebsite(config({ type: "url", src: "/os?path=%2FWork" }))).toBe(false)
    expect(isExternalWebsite(config({ type: "component", component: () => null }))).toBe(false)
  })
})
