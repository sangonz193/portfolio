import { MetadataRoute } from "next"

import { siteInfo } from "@/modules/info/site"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/os" },
    sitemap: `${siteInfo.url}/sitemap.xml`,
  }
}
