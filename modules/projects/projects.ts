export const projects = [
  {
    slug: "second-sponsor",
    name: "Second Sponsor",
    status: "Live",
    summary:
      "An AI companion for people in 12-step recovery, live on iOS and Android since June 2025, with real-time voice, long-term memory, and HIPAA-grade data handling.",
    metadata: ["CTO since 2025", "AI", "Mobile", "Real-time voice", "HIPAA"],
    problem:
      "People in recovery need support at the moment they reach for it, not at the next meeting. Second Sponsor gives them a companion they can text or call that remembers their history, draws on the program's own material, and flags risk signals for follow-up. That has to work on a phone, at 3 a.m., under healthcare privacy rules.",
    role: "CTO since 2025. Santiago owns the architecture and works hands-on across the mobile app, the API server, AI behavior, the voice agent, compliance, releases, and production operations.",
    constraints: [
      "Conversations contain protected health information, so storage, retrieval, and every AI provider in the loop have to sit inside a HIPAA boundary with a signed BAA.",
      "Voice runs through a live speech model, so the call has to stay usable through real phone conditions and reconnect without losing the transcript.",
      "Second Sponsor is one of several branded healthcare apps built from the same codebase, so improvements have to land in a form the other apps can pull in.",
    ],
    decisions: [
      "Build from RagRecall, a template codebase the branded apps fork and keep merging from, so compliance, memory retrieval, and voice are solved once and shared through Git rather than re-implemented per app.",
      "Run the voice agent as its own deployable on LiveKit with Gemini Live inside a Google Cloud Assured Workloads HIPAA folder, and persist transcripts through durable workflows so a dropped call never loses the conversation.",
      "Give the assistant a memory layer and organization-level retrieval so replies come from the person's history and the program's material instead of a generic model.",
      "Keep the shape small enough to operate: five deployable apps, one Fastify server, fifteen shared packages, one shared HIPAA cloud project.",
    ],
    proof: [
      "Second Sponsor v1.0 shipped in June 2025 and is live on the App Store and Google Play.",
      "The same codebase and infrastructure run multiple branded healthcare applications.",
      "Voice, chat, memory retrieval, and risk assessment are all in production, with releases cut through a production workflow Santiago set up.",
    ],
    results: [
      "A shipped, maintained product in a regulated category, with the voice and memory features that define it working on real devices.",
      "A codebase that makes the second and third healthcare app cheaper to build than the first.",
    ],
    currentStatus:
      "Live on the App Store and Google Play. Santiago continues as CTO.",
    links: [
      { label: "Website", href: "https://secondsponsor.ai/" },
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/second-sponsor/id6737695789",
      },
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=com.secondsponsor.secondsponsor",
      },
    ],
  },
  {
    slug: "harness-hub",
    name: "Harness Hub",
    status: "Live",
    summary:
      "The platform behind a marketing agency's client work: AI-generated landing pages for Google Ads, a visual editor, lead capture, reputation management, and billing, serving many client organizations from one codebase.",
    metadata: [
      "CTO",
      "AI",
      "Multi-tenant",
      "Serverless",
      "Durable workflows",
    ],
    problem:
      "A service business buying online marketing ends up with a page, a form, review requests, and an invoice from different vendors, and the agency running it all ends up gluing those together by hand. Harness Hub is that loop in one product: crawl the client's brand, generate and edit the landing page, capture the leads and calls it produces, manage reviews and bookings, and bill for it.",
    role: "CTO and hands-on architect across the product, application architecture, data model, AI generation, background workflows, developer experience, and production operations.",
    constraints: [
      "Every client organization's pages, leads, assets, and billing must stay isolated on a shared platform, across three database instances inherited from earlier products.",
      "Page generation, bulk onboarding, and brief ingestion run for minutes and call several models, so they cannot live inside a web request.",
      "The surface is large, over 150 API routes on serverless, so deploy size and developer feedback loops degrade unless they are managed on purpose.",
      "Account and recovery emails are opened by corporate link scanners before the person sees them.",
    ],
    decisions: [
      "Route every access check through a single membership resolver in the data layer, so tenancy is one piece of code rather than a rule every feature has to remember, and legacy databases are never on the auth path.",
      "Run generation, templatizing, bulk onboarding, and brief ingestion as durable workflows, so closing the tab or a flaky connection resumes work instead of leaving it half done.",
      "Give every client a living brief, maintained by a voice agent from discovery calls, that all other AI features receive as context.",
      "Move single-use tokens out of GET links after finding that email scanners were consuming password-reset and confirmation links before users could.",
      "Treat deploy footprint and typecheck time as maintained properties: traced serverless output was cut by 40% and incremental typechecks by 60% once they started slowing delivery.",
    ],
    proof: [
      "Live at app.harness.cloud, serving the agency's client organizations.",
      "One product surface covering brand crawling, AI page generation, visual editing, lead and call capture, reputation management, ServiceTitan booking, billing, and a public API with MCP support.",
      "Over a thousand pull requests merged since the platform started in late 2025, more than 900 of them authored by Santiago.",
    ],
    results: [
      "A single platform where a client's page, leads, reviews, and billing belong to the same organization record instead of four tools.",
      "Production reliability that accounts for the systems around the app, including the ones that open links on the user's behalf.",
    ],
    currentStatus: "Live. Santiago continues as CTO.",
    links: [
      { label: "Marketing site", href: "https://www.pagestorm.ai/" },
    ],
  },
  {
    slug: "git-nav",
    name: "Git Nav",
    status: "Open source",
    summary:
      "A free, open-source Git client for macOS, Windows and Linux: a commit graph that folds away unreferenced history, diffs between any two references, and branch cleanup that recognises squash merges.",
    metadata: ["Solo", "Tauri", "TypeScript", "MIT", "2026"],
    problem:
      "Git GUIs show every commit whether or not anything points at it, so a busy repository becomes a wall of history, and none of them can tell that a branch was squash-merged, so stale branches pile up. Git Nav is built around those two problems: a graph you can read, and cleanup you can trust.",
    role: "Santiago designs and builds Git Nav alone, from the graph layout and the Git plumbing to the signed installers and the release pipeline.",
    constraints: [
      "It has to run as a native desktop app on three operating systems and two CPU architectures, from one codebase.",
      "Every operation has to be safe on a repository people care about: predict conflicts before running, and report every reference that moved.",
      "Staging and committing have to go through Git's own index so the terminal and the app never disagree.",
    ],
    decisions: [
      "Fold every commit nothing points at into a collapsible run, so the graph shows branches, tags, stashes, worktrees and pull request state without the noise between them.",
      "Detect squash merges by comparing content rather than ancestry, and preview what cleanup would delete, grouped by reason, before deleting anything.",
      "Expose twenty-one Git operations, from checkout and merge to rebase, cherry-pick, revert and reset, each one predicting its conflicts before it runs.",
      "Ship installers for every platform on every release, sign and notarize the macOS build, and let the app update itself from signed releases.",
    ],
    proof: [
      "Installable with one command, npm install --global git-nav, or from signed installers for macOS, Windows and Linux on x64 and arm64.",
      "Eighteen releases since August 2026, with the app updating itself in place.",
      "Public repository under the MIT license.",
    ],
    results: [
      "A Git client that opens in a real repository and stays readable, which is the test most of them fail.",
      "The whole product surface, from Rust-side Git plumbing to a public download page, shipped and maintained by one person.",
    ],
    currentStatus: "Actively developed. Free and open source.",
    links: [
      { label: "Website", href: "https://git-nav.dev" },
      { label: "GitHub repository", href: "https://github.com/sangonz193/git-nav" },
      { label: "Releases", href: "https://github.com/sangonz193/git-nav/releases/latest" },
    ],
  },
  {
    slug: "data-loom",
    name: "Data Loom",
    status: "Rebuilding",
    summary:
      "Designed and built solo in under three weeks, then named runner-up in Supabase's 2024 OSS hackathon for Most technically impressive. Now being rebuilt.",
    metadata: ["WebRTC", "Direct file transfer", "Supabase"],
    problem:
      "Data Loom explored how to move files directly between devices without requiring people to create accounts or sending file contents through an intermediary server.",
    role: "Santiago designed and built the product solo between April 20 and May 6, 2024.",
    constraints: [
      "Pairing had to be temporary and simple enough to enter on another device.",
      "Sessions had to work without an explicit account-registration step.",
      "File data had to travel directly between paired devices.",
    ],
    decisions: [
      "Use WebRTC for direct device-to-device transfer.",
      "Pair devices with temporary numeric codes.",
      "Create anonymous sessions in the background so account setup does not interrupt the transfer flow.",
    ],
    proof: [
      "Built from initial work to completion in under three weeks.",
      "Runner-up in the Most technically impressive category of Supabase's 2024 OSS hackathon.",
      "The implementation remains available in the public repository.",
    ],
    results: [
      "The project demonstrated a complete direct-transfer flow under a short delivery window and received external recognition for its technical execution.",
      "A focused pairing model made peer-to-peer infrastructure approachable without adding a visible account workflow.",
    ],
    currentStatus:
      "The 2024 build is offline. A rebuild is in progress in the same repository: new schema and API layer, streaming transfers, and relay servers so transfers work across networks.",
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/sangonz193/data-loom",
      },
    ],
  },
  {
    slug: "openfing",
    name: "OpenFING",
    status: "2019 to 2023",
    summary:
      "Built a web client for a Universidad de la República project that became the official client and was maintained for about four years.",
    metadata: ["Web client", "Universidad de la República"],
    problem:
      "The OpenFING project at Universidad de la República needed a web client that could serve its users over the long term.",
    role: "Santiago built the web client. After it became the project's official client, he maintained and improved it for about four years.",
    constraints: [
      "The client served an established university project rather than a standalone greenfield product.",
      "It needed to remain maintainable as the official client over several years.",
    ],
    decisions: [
      "Continue maintaining the client after official adoption rather than treating its first release as the endpoint.",
      "Keep the implementation available in a public repository.",
    ],
    proof: [
      "The web client became OpenFING's official client.",
      "Santiago maintained it for about four years.",
      "The source remains available in the public repository.",
    ],
    results: [
      "The web client implementation became official infrastructure for a university project.",
      "Its four-year maintenance period made long-term stewardship as important as the initial implementation.",
    ],
    currentStatus:
      "Earlier work. This web client is no longer live or the project's official client.",
    links: [
      {
        label: "GitHub repository",
        href: "https://github.com/sangonz193/openfing-web",
      },
    ],
  },
] as const

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
