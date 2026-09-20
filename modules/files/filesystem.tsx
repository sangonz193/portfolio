import { DataLoomIcon, GitNavIcon, HarnessHubIcon, OpenFingIcon, SecondSponsorIcon } from "@/modules/apps/app-icon"
import { getProject, projects } from "@/modules/projects/projects"
import { getProjectArtifacts } from "@/project-artifacts"

import { DocumentIcon, FolderIcon, ImagePreviewIcon, LinkIcon, ProjectFolderIcon } from "./icons"
import { FolderFile, FileSystemItem } from "./schema"

function projectFolder(project: (typeof projects)[number]): FolderFile {
  const Mark = {
    "second-sponsor": SecondSponsorIcon,
    "harness-hub": HarnessHubIcon,
    "git-nav": GitNavIcon,
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

  const artifacts = getProjectArtifacts(project.slug)
  if (artifacts.length > 0) {
    children.push({
      id: `${project.slug}-evidence`,
      name: "Evidence",
      kind: "folder",
      icon: FolderIcon,
      children: artifacts.map((artifact) => ({
        ...artifact,
        kind: "image" as const,
        icon: ({ className }) => <ImagePreviewIcon src={artifact.src} className={className} />,
      })),
    })
  }

  for (const link of project.links) {
    children.push({
      id: `${project.slug}-${link.label.toLowerCase().replaceAll(" ", "-")}`,
      name: link.label,
      kind: "link",
      href: link.href,
      icon: LinkIcon,
    })
  }

  return {
    id: project.slug,
    name: project.name,
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
  children: projects.map(projectFolder),
}

export function getProjectForFile(file: FileSystemItem) {
  return file.kind === "document" ? getProject(file.projectSlug) : undefined
}
