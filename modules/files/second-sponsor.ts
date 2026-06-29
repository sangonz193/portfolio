import { ExternalLinkIcon, FileTextIcon, FolderIcon } from "lucide-react"

import { FolderFile } from "./schema"

const documentId = "second-sponsor"

export const secondSponsorFolder = {
  id: "second-sponsor",
  name: "Second Sponsor",
  type: "folder",
  icon: {
    type: "component",
    component: FolderIcon,
  },
  minSize: { width: 320, height: 260 },
  initialSize: { width: 520, height: 380 },
  items: [
    {
      id: "second-sponsor-site",
      name: "Site",
      type: "link-file",
      icon: {
        type: "component",
        component: ExternalLinkIcon,
      },
      hrefSource: {
        type: "markdown-link",
        documentId,
        label: "Site",
      },
    },
    {
      id: "second-sponsor-app-store",
      name: "App Store",
      type: "link-file",
      icon: {
        type: "component",
        component: ExternalLinkIcon,
      },
      hrefSource: {
        type: "markdown-link",
        documentId,
        label: "App Store",
      },
    },
    {
      id: "second-sponsor-google-play",
      name: "Google Play",
      type: "link-file",
      icon: {
        type: "component",
        component: ExternalLinkIcon,
      },
      hrefSource: {
        type: "markdown-link",
        documentId,
        label: "Google Play",
      },
    },
    {
      id: "second-sponsor-experience",
      name: "Experience.md",
      type: "document-file",
      documentId,
      icon: {
        type: "component",
        component: FileTextIcon,
      },
      minSize: { width: 340, height: 420 },
      initialSize: { width: 720, height: 760 },
    },
  ],
} satisfies FolderFile
