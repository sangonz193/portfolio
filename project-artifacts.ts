export const projectArtifacts = {
  "second-sponsor": [],
  "harness-hub": [],
  "git-nav": [
    {
      id: "git-nav-graph-collapsed",
      name: "Commit graph, collapsed.png",
      src: "/project-artifacts/git-nav/graph-collapsed.png",
      alt: "Git Nav showing Git's own repository, with runs of unreferenced commits collapsed into single rows.",
    },
    {
      id: "git-nav-collapse-before",
      name: "Every commit listed.png",
      src: "/project-artifacts/git-nav/collapse-before.png",
      alt: "Git's own history with every commit listed, one topic branch per lane.",
    },
    {
      id: "git-nav-collapse-after",
      name: "Same history, collapsed.png",
      src: "/project-artifacts/git-nav/collapse-after.png",
      alt: "The same history with every unreferenced commit collapsed into a run.",
    },
    {
      id: "git-nav-diff",
      name: "Diff between two tags.png",
      src: "/project-artifacts/git-nav/diff.png",
      alt: "A diff between two tags, with a file tree and a split view.",
    },
    {
      id: "git-nav-working-tree",
      name: "Working tree.png",
      src: "/project-artifacts/git-nav/working-tree.png",
      alt: "The working tree tab, with two staged files, one unstaged file and a commit message.",
    },
    {
      id: "git-nav-commit-menu",
      name: "Commit operations.png",
      src: "/project-artifacts/git-nav/commit-menu.png",
      alt: "The commit menu, listing the operations available for the selected commit.",
    },
    {
      id: "git-nav-selection",
      name: "Branch details.png",
      src: "/project-artifacts/git-nav/selection.png",
      alt: "The selection sheet for a branch, listing its tip, upstream, pull request, the commits it is ahead and behind, and its actions.",
    },
    {
      id: "git-nav-cleanup",
      name: "Branch cleanup.png",
      src: "/project-artifacts/git-nav/cleanup.png",
      alt: "The branch cleanup dialog, listing the branches that match each signal.",
    },
  ],
  "data-loom": [
    {
      id: "data-loom-pairing-and-transfer-flow",
      name: "Pairing and transfer flow.svg",
      src: "/project-artifacts/data-loom/pairing-and-transfer-flow.svg",
      alt: "Conceptual Data Loom flow: anonymous session, temporary numeric pairing code, a second device entering the code, and direct WebRTC transfer between paired devices.",
    },
    {
      id: "data-loom-hackathon-recognition",
      name: "Hackathon recognition.svg",
      src: "/project-artifacts/data-loom/hackathon-recognition.svg",
      alt: "Data Loom was runner-up in the Most technically impressive category of the Supabase Open Source Hackathon 2024.",
    },
  ],
  openfing: [],
} as const

export function getProjectArtifacts(slug: keyof typeof projectArtifacts) {
  return projectArtifacts[slug]
}
