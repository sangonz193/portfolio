export const projectArtifacts = {
  "second-sponsor": [
    {
      id: "second-sponsor-release-delivery-performance",
      name: "Release delivery performance.svg",
      src: "/project-artifacts/second-sponsor/release-delivery-performance.svg",
      alt: "Verified Second Sponsor release delivery performance: a clean installation of 4,991 packages improved from roughly two minutes thirty seconds to 0.73 seconds, and a mobile cold installation improved from 42 seconds to 21 seconds.",
    },
  ],
  "harness-hub": [
    {
      id: "harness-hub-delivery-performance",
      name: "Delivery performance.svg",
      src: "/project-artifacts/harness-hub/delivery-performance.svg",
      alt: "Verified Harness Hub engineering metrics: traced serverless output fell from 7,287 megabytes to 4,358 megabytes and incremental typechecking fell from 39 seconds to 15 seconds.",
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
