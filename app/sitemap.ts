import { MetadataRoute } from "next"

import { siteInfo } from "@/modules/info/site"
import { projects } from "@/modules/projects/projects"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteInfo.url, priority: 1 },
    { url: `${siteInfo.url}/me`, priority: 0.8 },
    ...projects.map((project) => ({
      url: `${siteInfo.url}/work/${project.slug}`,
      priority: 0.7,
    })),
  ]
}
