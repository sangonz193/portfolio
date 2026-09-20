import { DataLoomIcon, HarnessHubIcon, OpenFingIcon, SecondSponsorIcon } from "@/modules/apps/app-icon"
import { earlierProjects, featuredProjects, getProject } from "@/modules/projects/projects"

import { DocumentIcon, FolderIcon, ImagePreviewIcon, LinkIcon, ProjectFolderIcon } from "./icons"
import { FolderFile, FileSystemItem } from "./schema"

function projectFolder(project: (typeof earlierProjects)[number] | (typeof featuredProjects)[number]): FolderFile {
  const Mark = {
    "second-sponsor": SecondSponsorIcon,
    "harness-hub": HarnessHubIcon,
    "data-loom": DataLoomIcon,
    openfing: OpenFingIcon,
  }[project.slug]
  const Icon = ({ className }: { className?: string }) => <ProjectFolderIcon mark={Mark} className={className} />
  const markSrc = `/project-icons/${project.slug}.svg`

  const children: FileSystemItem[] = [
    {
      id: `${project.slug}-case-study`,
      name: "Case study",
      kind: "document",
      projectSlug: project.slug,
      route: `/work/${project.slug}?window=true`,
      icon: DocumentIcon,
    },
    {
      id: `${project.slug}-mark`,
      name: "Project mark.svg",
      kind: "image",
      src: markSrc,
      alt: `${project.name} project mark`,
      icon: ({ className }) => <ImagePreviewIcon src={markSrc} className={className} />,
    },
  ]

  for (const link of project.links) {
    children.push({
      id: `${project.slug}-${link.label.toLowerCase().replaceAll(" ", "-")}`,
      name: link.label,
      kind: "link",
      href: link.href,
      icon: LinkIcon,
    })
  }

  const archived = project.status.toLowerCase().includes("archived")
  return {
    id: project.slug,
    name: archived ? `${project.name} (${project.status})` : project.name,
    kind: "folder",
    icon: Icon,
    children,
  }
}

export const workFileSystem: FolderFile = {
  id: "work",
  name: "Work",
  kind: "folder",
  icon: FolderIcon,
  children: [
    {
      id: "featured-work",
      name: "Featured Work",
      kind: "folder",
      icon: FolderIcon,
      children: featuredProjects.map(projectFolder),
    },
    {
      id: "earlier-work",
      name: "Earlier Work",
      kind: "folder",
      icon: FolderIcon,
      children: earlierProjects.map(projectFolder),
    },
  ],
}

export function getProjectForFile(file: FileSystemItem) {
  return file.kind === "document" ? getProject(file.projectSlug) : undefined
}
